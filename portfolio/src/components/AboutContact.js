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
          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-black bg-opacity-50 backdrop-blur-sm rounded-xl p-8 border border-accent border-opacity-20"
          >
            <h3 className="text-2xl font-bold mb-6 text-white">Contact Information</h3>
            
            <div className="space-y-6">
              {contactItems.map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-12 h-12 flex items-center justify-center bg-secondary bg-opacity-20 rounded-lg mr-4">
                    <span className="text-xl">{item.icon}</span>
                  </div>
                  <div>
                    <h4 className="text-accent text-sm font-medium">{item.title}</h4>
                    <p className="text-white">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8">
              <h4 className="text-white font-medium mb-4">Follow Me:</h4>
              <div className="flex space-x-4">
                {socialPlatforms.map((platform) => (
                  <motion.a
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-accent text-accent hover:bg-accent hover:text-dark transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {platform.initial}
                  </motion.a>
                ))}
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
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-accent mb-2 text-sm">Your Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-3 bg-black bg-opacity-50 border border-accent border-opacity-30 rounded-lg text-white focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent" 
                  />
                </div>
                <div>
                  <label className="block text-accent mb-2 text-sm">Your Email</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 bg-black bg-opacity-50 border border-accent border-opacity-30 rounded-lg text-white focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent" 
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-accent mb-2 text-sm">Subject</label>
                <input 
                  type="text" 
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  className="w-full px-4 py-3 bg-black bg-opacity-50 border border-accent border-opacity-30 rounded-lg text-white focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent" 
                />
              </div>
              
              <div>
                <label className="block text-accent mb-2 text-sm">Your Message</label>
                <textarea 
                  rows="6" 
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className="w-full px-4 py-3 bg-black bg-opacity-50 border border-accent border-opacity-30 rounded-lg text-white focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent resize-none" 
                ></textarea>
              </div>
              
              <motion.button 
                onClick={handleSubmit}
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
