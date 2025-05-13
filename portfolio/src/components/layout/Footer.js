import { motion } from 'framer-motion';
import React from 'react';
import { contactInfo } from '../../data/contact';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialPlatforms = [
    { name: 'Twitter', url: contactInfo.socialLinks.twitter, icon: 'T' },
    { name: 'GitHub', url: contactInfo.socialLinks.github, icon: 'G' },
    { name: 'LinkedIn', url: contactInfo.socialLinks.linkedin, icon: 'L' },
    { name: 'Instagram', url: contactInfo.socialLinks.instagram, icon: 'I' }
  ];

  return (
    <footer className="py-12 px-4 md:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <motion.div 
              className="text-2xl font-mono text-accent mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              PORTFOLIO<span className="text-secondary">.</span>
            </motion.div>
            <p className="text-gray-400 mb-6">
              Creating futuristic and immersive web experiences that blend cutting-edge design with flawless functionality.
            </p>
            <div className="flex space-x-4">
              {socialPlatforms.map((platform) => (
                <motion.a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-accent text-accent hover:bg-accent hover:text-dark transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {platform.icon}
                </motion.a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-white font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'Projects', 'About', 'Contact', 'Blog'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-400 hover:text-accent transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info - Using imported data */}
          <div>
            <h4 className="text-white font-medium mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-gray-400">
                <span className="text-accent">Email:</span> {contactInfo.email}
              </li>
              <li className="text-gray-400">
                <span className="text-accent">Phone:</span> {contactInfo.phone}
              </li>
              <li className="text-gray-400">
                <span className="text-accent">Location:</span> {contactInfo.location}
              </li>
            </ul>
          </div>
        </div>
        
        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-30 mb-6"></div>
        
        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm">
          &copy; {currentYear} Your Name. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;