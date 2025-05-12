import { motion } from 'framer-motion';
import React, { useState } from 'react';

const About = () => {
  const [activeTab, setActiveTab] = useState('skills');
  
  const tabs = [
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' }
  ];
  
  const skills = [
    { name: 'React', level: 90 },
    { name: 'Three.js', level: 85 },
    { name: 'Node.js', level: 80 },
    { name: 'UI/UX Design', level: 85 },
    { name: 'TypeScript', level: 75 },
  ];
  
  return (
    <section id="about" className="py-20 px-4 md:px-8 bg-dark">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-3xl md:text-5xl font-bold mb-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          About <span className="text-accent">Me</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-white">Who am I?</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              I'm a passionate full-stack developer and UI designer with a focus on creating futuristic and 
              immersive web experiences. With over 5 years of experience in the industry,
              I specialize in building cutting-edge web applications that blend functionality with striking visuals.
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              My approach combines technical expertise with a keen eye for design, allowing me to create
              websites that not only perform flawlessly but also captivate users with their aesthetic appeal.
            </p>
            
            <div className="mt-8 flex space-x-4">
              {['GitHub', 'LinkedIn', 'Twitter'].map((platform) => (
                <motion.a
                  key={platform}
                  href="#"
                  className="px-4 py-2 border border-accent text-accent rounded-full text-sm hover:bg-accent hover:text-dark transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {platform}
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-black bg-opacity-50 backdrop-blur-sm rounded-xl p-6 border border-accent border-opacity-20"
          >
            <div className="flex border-b border-gray-800 mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === tab.id ? 'text-accent border-b-2 border-accent' : 'text-gray-400'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            
            <div className="min-h-[300px]">
              {activeTab === 'skills' && (
                <div className="space-y-6">
                  {skills.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-white">{skill.name}</span>
                        <span className="text-accent">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-secondary to-accent h-2 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {activeTab === 'experience' && (
                <div className="space-y-6">
                  {[
                    { role: 'Senior Frontend Developer', company: 'Tech Innovators', period: '2022 - Present' },
                    { role: 'UI Developer', company: 'Creative Studios', period: '2020 - 2022' },
                    { role: 'Junior Web Developer', company: 'Digital Solutions', period: '2018 - 2020' }
                  ].map((job, index) => (
                    <motion.div 
                      key={index}
                      className="relative pl-8 border-l border-accent"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-accent" />
                      <h4 className="text-white font-medium">{job.role}</h4>
                      <p className="text-accent text-sm">{job.company}</p>
                      <p className="text-gray-400 text-xs">{job.period}</p>
                    </motion.div>
                  ))}
                </div>
              )}
              
              {activeTab === 'education' && (
                <div className="space-y-6">
                  {[
                    { degree: 'Master in Computer Science', school: 'Tech University', year: '2016 - 2018' },
                    { degree: 'Bachelor in Information Technology', school: 'Digital Institute', year: '2012 - 2016' }
                  ].map((edu, index) => (
                    <motion.div 
                      key={index}
                      className="relative pl-8 border-l border-accent"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-accent" />
                      <h4 className="text-white font-medium">{edu.degree}</h4>
                      <p className="text-accent text-sm">{edu.school}</p>
                      <p className="text-gray-400 text-xs">{edu.year}</p>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
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
    // Handle form submission here (e.g., API call)
    console.log('Form submitted:', formData);
    // Reset form after submission
    setFormData({ name: '', email: '', subject: '', message: '' });
    // Show success message
    alert('Message sent successfully!');
  };
  
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
              {[
                { icon: '✉️', title: 'Email', value: 'your.email@example.com' },
                { icon: '📱', title: 'Phone', value: '+62 123 456 7890' },
                { icon: '📍', title: 'Location', value: 'Bandung, Indonesia' }
              ].map((item, index) => (
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
                {['Twitter', 'LinkedIn', 'Instagram', 'Dribbble'].map((platform) => (
                  <motion.a
                    key={platform}
                    href="#"
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-accent text-accent hover:bg-accent hover:text-dark transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {platform[0]}
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
