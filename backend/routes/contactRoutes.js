const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const Meeting = require('../models/Meeting');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');

// Initialize Google OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

if (process.env.GOOGLE_REFRESH_TOKEN) {
  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN
  });
}

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

// Email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Configure EJS
const templateDir = path.join(__dirname, '../views/email-templates');

// Helper function to render EJS templates
const renderTemplate = async (templateName, data) => {
  const templatePath = path.join(templateDir, `${templateName}.ejs`);
  const template = fs.readFileSync(templatePath, 'utf-8');
  return ejs.render(template, data);
};

// Contact form submission with validation
router.post('/', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('message').notEmpty().withMessage('Message is required')
], async (req, res) => {
  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const firstError = errors.array()[0];
      
        return res.status(400).json({
          success: false,
          errors: [{
            param: firstError.param,
            msg: firstError.msg,
            location: firstError.location
          }]
        });
      }

    const { name, email, message } = req.body;

    // Save to database
    const contact = new Contact({ name, email, message });
    await contact.save();

    // Render email templates
    const adminEmailHtml = await renderTemplate('contact-admin', { name, email, message });
    const userEmailHtml = await renderTemplate('contact-user', { name, message });

    // Email options
    const adminEmail = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Form Submission from ${name}`,
      html: adminEmailHtml
    };

    const userEmail = {
      from: `"Digital Agency" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Thank you for contacting us',
      html: userEmailHtml
    };

    // Send emails in parallel
    await Promise.all([
      transporter.sendMail(adminEmail),
      transporter.sendMail(userEmail)
    ]);

    res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully' 
    });

  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({ 
      success: false,
      errors: [{
        param: 'general',
        msg: error.message || 'Failed to send message'
      }]
    });
  }
});


// Meeting scheduler endpoint
router.post('/schedule-meeting', [
  body('date').isISO8601().withMessage('Valid ISO8601 date required (YYYY-MM-DD)'),
  body('time').matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Time must be HH:MM format'),
  body('duration').isIn(['15', '30', '45', '60']).withMessage('Duration must be 15, 30, 45, or 60 minutes'),
  body('topic').trim().notEmpty().withMessage('Meeting topic required'),
  body('attendeeEmail').isEmail().normalizeEmail().withMessage('Valid email required')
], async (req, res) => {
  // Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array()[0];
    
    return res.status(400).json({ 
      success: false,
      error: {
        param: firstError.param,
        msg: firstError.msg,
        location: firstError.location
      }
    });
  }

  const { date, time, duration, topic, attendeeEmail } = req.body;

  try {
    // Create time objects
    const startDateTime = new Date(`${date}T${time}`);
    const endDateTime = new Date(startDateTime.getTime() + parseInt(duration) * 60000);

    // Google Calendar Event
    const event = {
      summary: topic,
      description: `Scheduled meeting with ${attendeeEmail}`,
      start: { dateTime: startDateTime.toISOString(), timeZone: 'UTC' },
      end: { dateTime: endDateTime.toISOString(), timeZone: 'UTC' },
      attendees: [
        { email: attendeeEmail, responseStatus: 'accepted' },
        { email: process.env.ADMIN_EMAIL || 'rgrakesh519@gmail.com', responseStatus: 'accepted' }
      ],
      guestsCanInviteOthers: false,
      guestsCanModify: false,
      conferenceData: {
        createRequest: {
          requestId: `meet-${Date.now()}`,
          conferenceSolutionKey: { type: 'hangoutsMeet' }
        }
      },
      visibility: 'private'
    };

    // Create event
    const calendarResponse = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
      conferenceDataVersion: 1,
      sendUpdates: 'all'
    });

    // Save to database
    const meeting = new Meeting({
      date: startDateTime,
      time,
      duration: parseInt(duration),
      topic,
      attendeeEmail,
      adminEmail: process.env.ADMIN_EMAIL,
      googleEventId: calendarResponse.data.id,
      meetingLink: calendarResponse.data.hangoutLink
    });
    await meeting.save();

    // Render email templates
    const attendeeEmailHtml = await renderTemplate('meeting-attendee', {
      topic,
      startDateTime,
      duration,
      meetingLink: calendarResponse.data.hangoutLink
    });

    const adminEmailHtml = await renderTemplate('meeting-admin', {
      topic,
      startDateTime,
      duration,
      attendeeEmail,
      meetingLink: calendarResponse.data.hangoutLink,
      eventId: calendarResponse.data.id
    });

    // Email options
    const attendeeEmailContent = {
      from: `"Meeting Scheduler" <${process.env.EMAIL_USER}>`,
      to: attendeeEmail,
      subject: `Meeting Confirmation: ${topic}`,
      html: attendeeEmailHtml
    };

    const adminEmailContent = {
      from: `"Meeting Scheduler" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL || 'rgrakesh519@gmail.com',
      subject: `[ADMIN] New Meeting Scheduled: ${topic}`,
      html: adminEmailHtml
    };

    // Send emails
    await Promise.all([
      transporter.sendMail(attendeeEmailContent),
      transporter.sendMail(adminEmailContent)
    ]);

    res.status(201).json({
      success: true,
      meetingLink: calendarResponse.data.hangoutLink,
      eventId: calendarResponse.data.id
    });

  } catch (error) {
    console.error('Meeting scheduling error:', error);
    res.status(500).json({
      success: false,
      errors: [{
        param: 'general',
        msg: error.message || 'Failed to schedule meeting'
      }]
    });
  }
});

// Admin Meeting Access Endpoint
router.get('/admin/meetings', async (req, res) => {
  try {
    const meetings = await Meeting.find({})
      .sort({ date: 1 })
      .select('-__v -_id');
      
    res.status(200).json({ success: true, meetings });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch meetings',
      error: error.message 
    });
  }
});

module.exports = router;