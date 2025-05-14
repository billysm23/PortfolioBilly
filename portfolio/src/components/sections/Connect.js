import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { contactInfo } from '../../data/contact';

const Connect = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0);

  // Validate email format
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Validate form data
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.subject) {
      errors.subject = 'Please select a project type';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters long';
    }
    
    return errors;
  };
  
  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
    
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors({
        ...formErrors,
        [field]: ''
      });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prevent double submit with rate limiting
    const currentTime = Date.now();
    if (currentTime - lastSubmissionTime < 3000) { // 3 second cooldown
      console.log('Submission blocked - too soon after last attempt');
      return;
    }
    
    // Check if already submitting
    if (isSubmitting) {
      console.log('Submission blocked - already submitting');
      return;
    }
    
    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('');
    setLastSubmissionTime(currentTime);
    
    try {
      const serviceId = 'service_o61ugfe';
      const templateId = 'template_knqe6fn';
      const publicKey = 'xFz2l9hcqN9ZULH2w';
      
      // Create unique identifier to prevent duplicates
      const submissionId = `${currentTime}-${Math.random().toString(36).substr(2, 9)}`;
      
      // Email template params
      const templateParams = {
        user_name: formData.name,
        user_email: formData.email,
        subject: formData.subject,
        user_message: formData.message,
        to_email: contactInfo.email,
        reply_to: formData.email,
        submission_id: submissionId,
        timestamp: new Date().toISOString()
      };
      
      // Debug logging
      console.log('Sending email with params:', templateParams);
      
      // Send email using EmailJS
      const result = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );
      
      console.log('Email sent successfully:', result);
      
      // Success
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('');
      }, 5000);
      
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section id="connect" className="py-20 px-4 md:px-8 bg-gradient-to-b from-black to-dark">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-3xl md:text-5xl font-bold mb-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Let's <span className="text-accent">Connect</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Quick Contact Actions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-black bg-opacity-50 backdrop-blur-sm rounded-xl p-8 border border-accent border-opacity-20"
          >
            <h3 className="text-2xl font-bold mb-6 text-white">Get In Touch</h3>
            <p className="text-gray-300 mb-8">
              Ready to bring your ideas to life? Let's start a conversation about your next project.
            </p>
            
            {/* Quick Action Buttons */}
            <div className="space-y-4">
              <motion.a
                href={`mailto:${contactInfo.email}`}
                aria-label="Send email to Billy"
                className="flex items-center p-4 bg-secondary bg-opacity-20 rounded-lg text-white hover:bg-secondary hover:bg-opacity-30 transition-all group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="w-12 h-12 flex items-center justify-center bg-secondary bg-opacity-30 rounded-lg mr-4 group-hover:bg-opacity-50 transition-all">
                  <svg className="w-6 h-6" fill="white" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                </span>
                <div>
                  <div className="font-medium">Send an Email</div>
                  <div className="text-sm text-gray-400">Quick response guaranteed</div>
                </div>
              </motion.a>
              
              <motion.a
                href={`tel:${contactInfo.phone}`}
                aria-label="Call Billy"
                className="flex items-center p-4 bg-accent bg-opacity-20 rounded-lg text-white hover:bg-accent hover:bg-opacity-30 transition-all group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="w-12 h-12 flex items-center justify-center bg-accent bg-opacity-30 rounded-lg mr-4 group-hover:bg-opacity-50 transition-all">
                  <svg className="w-6 h-6" fill="white" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                </span>
                <div>
                  <div className="font-medium">Call Me</div>
                  <div className="text-sm text-gray-400">Let's talk directly</div>
                </div>
              </motion.a>
              
              <motion.a
                href={contactInfo.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect with Billy on LinkedIn"
                className="flex items-center p-4 bg-secondary bg-opacity-20 rounded-lg text-white hover:bg-secondary hover:bg-opacity-30 transition-all group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="w-12 h-12 flex items-center justify-center bg-secondary bg-opacity-30 rounded-lg mr-4 group-hover:bg-opacity-50 transition-all">
                  <svg className="w-6 h-6" fill="white" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd"/>
                  </svg>
                </span>
                <div>
                  <div className="font-medium">Connect on LinkedIn</div>
                  <div className="text-sm text-gray-400">Professional networking</div>
                </div>
              </motion.a>
            </div>
            
            {/* Response Promise */}
            <div className="mt-8 p-4 bg-accent bg-opacity-10 rounded-lg">
              <div className="flex items-center">
                <span className="text-accent text-sm font-medium">I typically respond within 24 hours</span>
              </div>
            </div>
          </motion.div>
          
          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-white">Start a Project</h3>
            
            {/* Success/Error Messages */}
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-green-900 bg-opacity-50 border border-green-500 rounded-lg"
              >
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-green-500 font-medium">Message sent successfully!</span>
                </div>
                <p className="text-green-400 text-sm mt-1">I'll get back to you within 24 hours.</p>
              </motion.div>
            )}
            
            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-900 bg-opacity-50 border border-red-500 rounded-lg"
              >
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-red-500 font-medium">Failed to send message</span>
                </div>
                <p className="text-red-400 text-sm mt-1">Please try again or contact me directly via email.</p>
              </motion.div>
            )}
            
            <form ref={form} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-accent mb-2 text-sm">Your Name *</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-4 py-3 bg-black bg-opacity-50 border rounded-lg text-white focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors ${
                      formErrors.name ? 'border-red-500' : 'border-accent border-opacity-30'
                    }`}
                    placeholder="Your full name"
                  />
                  {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                </div>
                <div>
                  <label className="block text-accent mb-2 text-sm">Your Email *</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-4 py-3 bg-black bg-opacity-50 border rounded-lg text-white focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors ${
                      formErrors.email ? 'border-red-500' : 'border-accent border-opacity-30'
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                </div>
              </div>
              
              <div>
                <label className="block text-accent mb-2 text-sm">Project Type *</label>
                <select 
                  id="project-type"
                  name="subject"
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  className={`w-full px-4 py-3 bg-black bg-opacity-50 border rounded-lg text-white focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors ${
                    formErrors.subject ? 'border-red-500' : 'border-accent border-opacity-30'
                  }`}
                >
                  <option value="">Select a project type</option>
                  <option value="web-development">Web Development</option>
                  <option value="mobile-app">Mobile App</option>
                  <option value="ui-ux-design">UI/UX Design</option>
                  <option value="data-visualization">Data Visualization</option>
                  <option value="consultation">Consultation</option>
                  <option value="other">Other</option>
                </select>
                {formErrors.subject && <p className="text-red-500 text-xs mt-1">{formErrors.subject}</p>}
              </div>
              
              <div>
                <label className="block text-accent mb-2 text-sm">Project Description *</label>
                <textarea 
                  rows="6" 
                  name="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className={`w-full px-4 py-3 bg-black bg-opacity-50 border rounded-lg text-white focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent resize-none transition-colors ${
                    formErrors.message ? 'border-red-500' : 'border-accent border-opacity-30'
                  }`}
                  placeholder="Tell me about your project, goals, and timeline..."
                />
                {formErrors.message && <p className="text-red-500 text-xs mt-1">{formErrors.message}</p>}
              </div>
              
              <motion.button 
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 font-medium rounded-lg transition-all ${
                  isSubmitting 
                    ? 'bg-gray-600 cursor-not-allowed opacity-50' 
                    : 'bg-gradient-to-r from-secondary to-accent hover:opacity-90'
                } text-white`}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                // Prevent double click during submission
                onClick={isSubmitting ? (e) => e.preventDefault() : undefined}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </div>
                ) : (
                  'Send Message'
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Connect;