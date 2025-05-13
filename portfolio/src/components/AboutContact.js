import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { contactInfo } from '../data/contact';

const About = () => {  
  return (
    <section id="about" className="py-20 px-4 md:px-8 bg-dark">
      {/* Akaan disesuaikan lagi letaknya karena sudah ada di scroll animations */}
    </section>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };
  
  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', subject: '', message: '' });
    alert('Message sent successfully!');
  };
  
  const contactItems = [
    { icon: '✉️', title: 'Email', value: contactInfo.email },
    { icon: '📱', title: 'Phone', value: contactInfo.phone },
    { icon: '📍', title: 'Location', value: contactInfo.location }
  ];
  
  const socialPlatforms = [
    { name: 'Twitter', url: contactInfo.socialLinks.twitter, initial: 'T' },
    { name: 'LinkedIn', url: contactInfo.socialLinks.linkedin, initial: 'L' },
    { name: 'Instagram', url: contactInfo.socialLinks.instagram, initial: 'I' },
    { name: 'Github', url: contactInfo.socialLinks.github, initial: 'G' }
  ];
  
  return (
    <section id="contact" className="py-20 px-4 md:px-8 bg-gradient-to-b from-black to-dark">
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
                className="flex items-center p-4 bg-secondary bg-opacity-20 rounded-lg text-white hover:bg-secondary hover:bg-opacity-30 transition-all group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="w-12 h-12 flex items-center justify-center bg-secondary bg-opacity-30 rounded-lg mr-4 group-hover:bg-opacity-50 transition-all">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
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
                className="flex items-center p-4 bg-accent bg-opacity-20 rounded-lg text-white hover:bg-accent hover:bg-opacity-30 transition-all group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="w-12 h-12 flex items-center justify-center bg-accent bg-opacity-30 rounded-lg mr-4 group-hover:bg-opacity-50 transition-all">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
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
                className="flex items-center p-4 bg-secondary bg-opacity-20 rounded-lg text-white hover:bg-secondary hover:bg-opacity-30 transition-all group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="w-12 h-12 flex items-center justify-center bg-secondary bg-opacity-30 rounded-lg mr-4 group-hover:bg-opacity-50 transition-all">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
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
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-accent mb-2 text-sm">Your Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 bg-black bg-opacity-50 border border-accent border-opacity-30 rounded-lg text-white focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent" 
                  />
                </div>
                <div>
                  <label className="block text-accent mb-2 text-sm">Your Email</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 bg-black bg-opacity-50 border border-accent border-opacity-30 rounded-lg text-white focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent" 
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-accent mb-2 text-sm">Project Type</label>
                <select className="w-full px-4 py-3 bg-black bg-opacity-50 border border-accent border-opacity-30 rounded-lg text-white focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent">
                  <option value="">Select a project type</option>
                  <option value="web-development">Web Development</option>
                  <option value="mobile-app">Mobile App</option>
                  <option value="ui-ux-design">UI/UX Design</option>
                  <option value="consultation">Consultation</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-accent mb-2 text-sm">Project Description</label>
                <textarea 
                  rows="6" 
                  className="w-full px-4 py-3 bg-black bg-opacity-50 border border-accent border-opacity-30 rounded-lg text-white focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent resize-none" 
                  placeholder="Tell me about your project, goals, and timeline..."
                ></textarea>
              </div>
              
              <motion.button 
                className="w-full py-4 bg-gradient-to-r from-secondary to-accent text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export { About, Contact };
