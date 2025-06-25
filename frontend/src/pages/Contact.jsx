import { useState, useEffect } from "react";
import {
  Calendar,
  MapPin,
  Phone,
  Mail,
  Clock,
  Video,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const [meetingData, setMeetingData] = useState({
    date: "",
    time: "",
    duration: "30",
    topic: "",
    attendeeEmail: "",
  });
  const [isScheduling, setIsScheduling] = useState(false);
  const [scheduleStatus, setScheduleStatus] = useState(null);
  const [meetingErrors, setMeetingErrors] = useState({});

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleMeetingChange = (e) => {
    const { name, value } = e.target;
    setMeetingData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (meetingErrors[name]) {
      setMeetingErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setFormErrors({});

    try {
      const response = await fetch("http://localhost:3000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle both field-specific and general errors
        const errors = {};
        if (data.errors && Array.isArray(data.errors)) {
          data.errors.forEach((error) => {
            if (error.param) {
              errors[error.param] = error.msg;
            } else if (error.msg) {
              errors.general = error.msg;
            }
          });
        } else if (data.message) {
          errors.general = data.message;
        } else {
          errors.general = "Request failed";
        }
        setFormErrors(errors);
        return;
      }

      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Contact form error:", error);
      setSubmitStatus("error");
      setFormErrors({
        general: error.message || "Failed to send message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleScheduleMeeting = async (e) => {
    e.preventDefault();
    setIsScheduling(true);
    setScheduleStatus(null);
    setMeetingErrors({});

    try {
      const response = await fetch(
        "http://localhost:3000/contact/schedule-meeting",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(meetingData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        const errors = {};
      
        // Handle when the backend sends: { success: false, errors: [{ param, msg, location }] }
        if (data.errors && Array.isArray(data.errors) && data.errors.length > 0) {
          const error = data.errors[0]; // Only first error is sent from backend now
      
          if (error.param) {
            errors[error.param] = error.msg;
          } else if (error.msg) {
            errors.general = error.msg;
          }
        } else if (data.error && data.error.msg) {
          // In case backend sends as: { success: false, error: { param, msg, location } }
          if (data.error.param) {
            errors[data.error.param] = data.error.msg;
          } else {
            errors.general = data.error.msg;
          }
        } else if (data.message) {
          errors.general = data.message;
        } else {
          errors.general = "Request failed";
        }
      
        setMeetingErrors(errors);
        return;
      }
      

      setScheduleStatus("success");
      setMeetingData({
        date: "",
        time: "",
        duration: "30",
        topic: "",
        attendeeEmail: "",
      });
    } catch (error) {
      console.error("Meeting scheduling error:", error);
      setScheduleStatus("error");
      setMeetingErrors({ general: error.message });
    } finally {
      setIsScheduling(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center px-4 pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm"></div>
        <div className={`relative z-10 text-center max-w-6xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-8 inline-block">
            <span className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold rounded-full shadow-lg animate-bounce">
              Get In Touch
            </span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight">
            Let's Talk About
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Your Project
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            Have questions or ready to start your digital transformation? Reach out to our team—we're here to help you grow.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
              <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Send Us a Message
              </h2>

              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white/5 backdrop-blur-sm border ${
                      formErrors.name ? "border-red-500" : "border-white/20"
                    } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300`}
                    placeholder="John Doe"
                    required
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-400">
                      {formErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white/5 backdrop-blur-sm border ${
                      formErrors.email ? "border-red-500" : "border-white/20"
                    } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300`}
                    placeholder="you@example.com"
                    required
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-400">
                      {formErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-gray-300 mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className={`w-full px-4 py-3 bg-white/5 backdrop-blur-sm border ${
                      formErrors.message ? "border-red-500" : "border-white/20"
                    } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none`}
                    placeholder="Tell us about your project..."
                    required
                  />
                  {formErrors.message && (
                    <p className="mt-1 text-sm text-red-400">
                      {formErrors.message}
                    </p>
                  )}
                </div>

                {(submitStatus || formErrors.general) && (
                <div className={`mt-6 p-4 rounded-lg ${
                    submitStatus === "success" 
                    ? "bg-green-500/20 border border-green-500/30 text-green-200" 
                    : "bg-red-500/20 border border-red-500/30 text-red-200"
                }`}>
                    <div className="flex items-center space-x-2">
                    {submitStatus === "success" ? (
                        <CheckCircle className="h-5 w-5" />
                    ) : (
                        <AlertCircle className="h-5 w-5" />
                    )}
                    <span>
                        {submitStatus === "success" 
                        ? "Message sent successfully!"
                        : formErrors.general || "Failed to send message. Please try again."}
                    </span>
                    </div>
                </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full group relative px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    {isSubmitting ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>

            {/* Contact Info & Other Components */}
            <div className="space-y-8">
              {/* Contact Information */}
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Contact Information
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="text-blue-400 mr-4 mt-1">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-1">
                        Phone
                      </h4>
                      <a
                        href="tel:+15551234567"
                        className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                      >
                        +1 (555) 123-4567
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="text-blue-400 mr-4 mt-1">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-1">
                        Email
                      </h4>
                      <a
                        href="mailto:hello@digitalagency.com"
                        className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                      >
                        hello@digitalagency.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="text-blue-400 mr-4 mt-1">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-1">
                        Office
                      </h4>
                      <p className="text-gray-300">
                        123 Digital Lane
                        <br />
                        Tech City, TC 10001
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="text-blue-400 mr-4 mt-1">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-1">
                        Hours
                      </h4>
                      <p className="text-gray-300">
                        Monday - Friday: 9am - 6pm
                        <br />
                        Saturday - Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Map */}
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 aspect-video">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215209179042!2d-73.98784492452545!3d40.74844047138985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1689872276855!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps Embed"
                />
              </div>

              {/* Google Meet Scheduler */}
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="text-red-400">
                    <Video className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Schedule a Meeting
                  </h3>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="date"
                        className="block text-gray-300 mb-2"
                      >
                        Date
                      </label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={meetingData.date}
                        onChange={handleMeetingChange}
                        required
                        min={new Date().toISOString().split("T")[0]}
                        className={`w-full px-4 py-3 bg-white/5 backdrop-blur-sm border ${
                          meetingErrors.date
                            ? "border-red-500"
                            : "border-white/20"
                        } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300`}
                      />
                      {meetingErrors.date && (
                        <p className="mt-1 text-sm text-red-400">
                          {meetingErrors.date}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="time"
                        className="block text-gray-300 mb-2"
                      >
                        Time
                      </label>
                      <input
                        type="time"
                        id="time"
                        name="time"
                        value={meetingData.time}
                        onChange={handleMeetingChange}
                        required
                        className={`w-full px-4 py-3 bg-white/5 backdrop-blur-sm border ${
                          meetingErrors.time
                            ? "border-red-500"
                            : "border-white/20"
                        } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300`}
                      />
                      {meetingErrors.time && (
                        <p className="mt-1 text-sm text-red-400">
                          {meetingErrors.time}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="duration"
                      className="block text-gray-300 mb-2"
                    >
                      Duration
                    </label>
                    <select
                      id="duration"
                      name="duration"
                      value={meetingData.duration}
                      onChange={handleMeetingChange}
                      className={`
                        w-full px-4 py-3 
                        bg-gray-800/90 backdrop-blur-sm 
                        border ${meetingErrors.duration ? "border-red-500" : "border-gray-600"} 
                        rounded-lg 
                        text-white 
                        focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent 
                        transition-all duration-300 
                        appearance-none
                        hover:bg-gray-700/90
                        `}
                    >
                      <option
                        value="15"
                        className="bg-gray-800 text-white hover:bg-gray-700"
                      >
                        15 minutes
                      </option>
                      <option
                        value="30"
                        className="bg-gray-800 text-white hover:bg-gray-700"
                      >
                        30 minutes
                      </option>
                      <option
                        value="45"
                        className="bg-gray-800 text-white hover:bg-gray-700"
                      >
                        45 minutes
                      </option>
                      <option
                        value="60"
                        className="bg-gray-800 text-white hover:bg-gray-700"
                      >
                        1 hour
                      </option>
                    </select>
                    {meetingErrors.duration && (
                      <p className="mt-1 text-sm text-red-400">
                        {meetingErrors.duration}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="attendeeEmail"
                      className="block text-gray-300 mb-2"
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="attendeeEmail"
                      name="attendeeEmail"
                      value={meetingData.attendeeEmail}
                      onChange={handleMeetingChange}
                      required
                      className={`w-full px-4 py-3 bg-white/5 backdrop-blur-sm border ${
                        meetingErrors.attendeeEmail
                          ? "border-red-500"
                          : "border-white/20"
                      } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300`}
                      placeholder="you@example.com"
                    />
                    {meetingErrors.attendeeEmail && (
                      <p className="mt-1 text-sm text-red-400">
                        {meetingErrors.attendeeEmail}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="topic" className="block text-gray-300 mb-2">
                      Meeting Topic
                    </label>
                    <input
                      type="text"
                      id="topic"
                      name="topic"
                      value={meetingData.topic}
                      onChange={handleMeetingChange}
                      required
                      className={`w-full px-4 py-3 bg-white/5 backdrop-blur-sm border ${
                        meetingErrors.topic
                          ? "border-red-500"
                          : "border-white/20"
                      } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300`}
                      placeholder="Project Discussion"
                    />
                    {meetingErrors.topic && (
                      <p className="mt-1 text-sm text-red-400">
                        {meetingErrors.topic}
                      </p>
                    )}
                  </div>

                  {(scheduleStatus || meetingErrors.general) && (
                    <div className={`mt-6 p-4 rounded-lg ${
                        scheduleStatus === "success" 
                        ? "bg-green-500/20 border border-green-500/30 text-green-200" 
                        : "bg-red-500/20 border border-red-500/30 text-red-200"
                    }`}>
                        <div className="flex items-center space-x-2">
                        {scheduleStatus === "success" ? (
                            <CheckCircle className="h-5 w-5" />
                        ) : (
                            <AlertCircle className="h-5 w-5" />
                        )}
                        <span>
                            {scheduleStatus === "success" 
                            ? "Meeting scheduled successfully! Check your email for details."
                            : meetingErrors.general || "Failed to schedule meeting. Please try again."}
                        </span>
                        </div>
                    </div>
                    )}

                  <button
                    onClick={handleScheduleMeeting}
                    disabled={isScheduling}
                    className="w-full group relative px-6 py-4 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <span className="relative z-10 flex items-center justify-center space-x-2">
                      {isScheduling ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                      ) : (
                        <>
                          <Calendar className="h-5 w-5" />
                          <span>Schedule Meeting</span>
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
