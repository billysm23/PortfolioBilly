import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { education } from '../../data/education';
import { experience } from '../../data/experience';
import { skills } from '../../data/skills';
import { AnimatedSection, StaggeredContainer } from '../animations/ScrollAnimations';

const About = () => {
  const [activeTab, setActiveTab] = useState('skills');
  
  const tabs = [
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' }
  ];
  
  return (
    <AnimatedSection 
      id="about" 
      className="py-20 px-4 md:px-8 bg-dark"
      animationType="fadeZoom"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-3xl md:text-5xl font-bold mb-16 text-center"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.8,
            ease: "easeOut"
          }}
        >
          About <span className="text-accent">Me</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column with Staggered Animation */}
          <AnimatedSection animationType="slideUp">
            <h3 className="text-2xl font-bold mb-6 text-white">Who am I?</h3>
            <StaggeredContainer staggerDelay={0.2}>
              <p className="text-gray-300 mb-6 leading-relaxed">
                I'm a passionate full-stack developer, mobile developer, UI/UX designer, and data analyst 
                dedicated to creating innovative, user-centric web experiences. With expertise spanning from 
                frontend development to data visualization, I specialize in building scalable applications 
                that seamlessly blend cutting-edge functionality with compelling design.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                My journey began during my studies in Information Systems and Technology at ITB, where I 
                discovered my passion for technology and problem-solving. Since then, I've been developing 
                diverse projects using modern technologies like React, Node.js, TypeScript, React Native, 
                and Figma, while leveraging cloud platforms like Firebase and AWS to build robust solutions.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                When I'm not coding, you'll find me exploring the latest frameworks, experimenting with new 
                design trends, exploring game development, or diving into data visualizations. I'm always eager to 
                take on new challenges and collaborate on projects that push creative and technical boundaries.
              </p>
              
              <div className="mt-8 flex space-x-4">
                {['GitHub', 'LinkedIn', 'Twitter'].map((platform) => (
                  <motion.a
                    key={platform}
                    href="#"
                    className="custom-hover-button px-4 py-2 border border-accent text-accent rounded-full text-sm hover:bg-accent hover:text-dark transition-colors cursor-hover"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {platform}
                  </motion.a>
                ))}
              </div>
            </StaggeredContainer>
          </AnimatedSection>
          
          {/* Right Column */}
          <AnimatedSection 
            animationType="scaleRotate"
            className="bg-black bg-opacity-50 backdrop-blur-sm rounded-xl p-6 border border-accent border-opacity-20"
          >
            <div className="flex border-b border-gray-800 mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    activeTab === tab.id ? 'text-accent border-b-2 border-accent' : 'text-gray-400'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            
            <div className="min-h-[300px]">
              <AnimatePresence mode="wait">
                {activeTab === 'skills' && (
                  <motion.div 
                    key="skills"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <StaggeredContainer staggerDelay={0.1}>
                      {skills.map((skill, index) => (
                        <div key={index} className="mb-4">
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
                    </StaggeredContainer>
                  </motion.div>
                )}

                {activeTab === 'experience' && (
                  <motion.div 
                    key="experience"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <StaggeredContainer staggerDelay={0.1}>
                      {experience.map((job, index) => (
                        <div key={index} className="mb-4">
                          <motion.div 
                            key={job.id}
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
                            {job.description && (
                              <p className="text-gray-300 text-sm mt-2">{job.description}</p>
                            )}
                            {job.technologies && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {job.technologies.map((tech, techIndex) => (
                                  <span 
                                    key={techIndex}
                                    className="px-2 py-1 bg-accent bg-opacity-20 text-accent text-xs rounded"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            )}
                          </motion.div>
                        </div>
                      ))}
                    </StaggeredContainer>
                  </motion.div>
                )}
                
                {activeTab === 'education' && (
                  <motion.div 
                    key="education"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <StaggeredContainer staggerDelay={0.1}>
                      {education.map((edu, index) => (
                        <div key={index} className="mb-4">
                          <motion.div 
                            key={edu.id}
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
                            {edu.description && (
                              <p className="text-gray-300 text-sm mt-2">{edu.description}</p>
                            )}
                            {edu.gpa && (
                              <p className="text-secondary text-sm mt-1">GPA: {edu.gpa}</p>
                            )}
                            {edu.achievements && (
                              <div className="mt-2">
                                <p className="text-white text-xs mb-1">Achievements:</p>
                                <ul className="text-gray-300 text-xs">
                                  {edu.achievements.map((achievement, achIndex) => (
                                    <li key={achIndex} className="before:content-['•'] before:text-accent before:mr-1">
                                      {achievement}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </motion.div>
                        </div>
                      ))}
                    </StaggeredContainer>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default About;
