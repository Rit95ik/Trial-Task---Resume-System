import { useState } from 'react';

const ResumeForm = ({ resumeData, setResumeData, onGenerateSummary, onSave }) => {
  const [activeSection, setActiveSection] = useState('personal');

  const handlePersonalInfoChange = (e) => {
    setResumeData({
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleArrayChange = (section, index, field, value) => {
    const updatedArray = [...resumeData[section]];
    updatedArray[index] = {
      ...updatedArray[index],
      [field]: value,
    };
    setResumeData({
      ...resumeData,
      [section]: updatedArray,
    });
  };

  const addArrayItem = (section, defaultItem) => {
    setResumeData({
      ...resumeData,
      [section]: [...resumeData[section], defaultItem],
    });
  };

  const removeArrayItem = (section, index) => {
    setResumeData({
      ...resumeData,
      [section]: resumeData[section].filter((_, i) => i !== index),
    });
  };

  const handleSkillsChange = (value) => {
    const skillsArray = value.split(',').map(s => s.trim()).filter(s => s);
    setResumeData({
      ...resumeData,
      skills: skillsArray,
    });
  };

  const sections = [
    { id: 'personal', label: 'Personal Info', icon: '👤' },
    { id: 'education', label: 'Education', icon: '🎓' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'projects', label: 'Projects', icon: '🚀' },
    { id: 'skills', label: 'Skills', icon: '⚡' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 h-full overflow-y-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Build Your Resume</h2>

      {/* Section Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b pb-4">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              activeSection === section.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className="mr-2">{section.icon}</span>
            {section.label}
          </button>
        ))}
      </div>

      {/* Personal Info Section */}
      {activeSection === 'personal' && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Personal Information</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
            <input
              type="text"
              name="name"
              value={resumeData.personalInfo.name}
              onChange={handlePersonalInfoChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input
              type="email"
              name="email"
              value={resumeData.personalInfo.email}
              onChange={handlePersonalInfoChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              value={resumeData.personalInfo.phone}
              onChange={handlePersonalInfoChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+1 234 567 8900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
            <input
              type="url"
              name="linkedin"
              value={resumeData.personalInfo.linkedin}
              onChange={handlePersonalInfoChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="linkedin.com/in/johndoe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">GitHub</label>
            <input
              type="url"
              name="github"
              value={resumeData.personalInfo.github}
              onChange={handlePersonalInfoChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="github.com/johndoe"
            />
          </div>
        </div>
      )}

      {/* Education Section */}
      {activeSection === 'education' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-700">Education</h3>
            <button
              onClick={() => addArrayItem('education', { degree: '', institution: '', year: '', gpa: '' })}
              className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
            >
              + Add Education
            </button>
          </div>

          {resumeData.education.map((edu, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3 relative">
              <button
                onClick={() => removeArrayItem('education', index)}
                className="absolute top-2 right-2 text-red-600 hover:text-red-800"
              >
                ✕
              </button>

              <input
                type="text"
                value={edu.degree}
                onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Degree (e.g., Bachelor of Science in Computer Science)"
              />

              <input
                type="text"
                value={edu.institution}
                onChange={(e) => handleArrayChange('education', index, 'institution', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Institution Name"
              />

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  value={edu.year}
                  onChange={(e) => handleArrayChange('education', index, 'year', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Year (e.g., 2020-2024)"
                />
                <input
                  type="text"
                  value={edu.gpa}
                  onChange={(e) => handleArrayChange('education', index, 'gpa', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="GPA (optional)"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Experience Section */}
      {activeSection === 'experience' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-700">Work Experience</h3>
            <button
              onClick={() => addArrayItem('experience', { role: '', company: '', duration: '', description: '' })}
              className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
            >
              + Add Experience
            </button>
          </div>

          {resumeData.experience.map((exp, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3 relative">
              <button
                onClick={() => removeArrayItem('experience', index)}
                className="absolute top-2 right-2 text-red-600 hover:text-red-800"
              >
                ✕
              </button>

              <input
                type="text"
                value={exp.role}
                onChange={(e) => handleArrayChange('experience', index, 'role', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Job Title (e.g., Software Engineer)"
              />

              <input
                type="text"
                value={exp.company}
                onChange={(e) => handleArrayChange('experience', index, 'company', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Company Name"
              />

              <input
                type="text"
                value={exp.duration}
                onChange={(e) => handleArrayChange('experience', index, 'duration', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Duration (e.g., Jan 2023 - Present)"
              />

              <textarea
                value={exp.description}
                onChange={(e) => handleArrayChange('experience', index, 'description', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                rows="3"
                placeholder="Describe your responsibilities and achievements..."
              />
            </div>
          ))}
        </div>
      )}

      {/* Projects Section */}
      {activeSection === 'projects' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-700">Projects</h3>
            <button
              onClick={() => addArrayItem('projects', { title: '', description: '', techUsed: '', link: '' })}
              className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
            >
              + Add Project
            </button>
          </div>

          {resumeData.projects.map((project, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3 relative">
              <button
                onClick={() => removeArrayItem('projects', index)}
                className="absolute top-2 right-2 text-red-600 hover:text-red-800"
              >
                ✕
              </button>

              <input
                type="text"
                value={project.title}
                onChange={(e) => handleArrayChange('projects', index, 'title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Project Title"
              />

              <textarea
                value={project.description}
                onChange={(e) => handleArrayChange('projects', index, 'description', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                rows="3"
                placeholder="Project Description"
              />

              <input
                type="text"
                value={project.techUsed}
                onChange={(e) => handleArrayChange('projects', index, 'techUsed', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Technologies Used (e.g., React, Node.js, MongoDB)"
              />

              <input
                type="url"
                value={project.link}
                onChange={(e) => handleArrayChange('projects', index, 'link', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Project Link (optional)"
              />
            </div>
          ))}
        </div>
      )}

      {/* Skills Section */}
      {activeSection === 'skills' && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Skills</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter your skills (separated by commas)
            </label>
            <textarea
              value={resumeData.skills.join(', ')}
              onChange={(e) => handleSkillsChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="4"
              placeholder="e.g., JavaScript, React, Node.js, Python, Machine Learning"
            />
          </div>

          {resumeData.skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {resumeData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-8 space-y-3">
        <button
          onClick={onGenerateSummary}
          className="w-full py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
        >
          ✨ Generate AI Summary
        </button>

        <button
          onClick={onSave}
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          💾 Save Resume
        </button>
      </div>
    </div>
  );
};

export default ResumeForm;
