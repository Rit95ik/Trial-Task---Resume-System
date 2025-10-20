const ModernTemplate = ({ resumeData }) => {
  const { personalInfo, education, experience, projects, skills, summary } = resumeData;

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-8 max-w-3xl mx-auto">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg mb-6">
        <h1 className="text-3xl font-bold mb-2">
          {personalInfo.name || 'Your Name'}
        </h1>
        <div className="flex flex-wrap gap-3 text-sm opacity-90">
          {personalInfo.email && <span>✉ {personalInfo.email}</span>}
          {personalInfo.phone && <span>📱 {personalInfo.phone}</span>}
          {personalInfo.linkedin && <span>💼 LinkedIn</span>}
          {personalInfo.github && <span>💻 GitHub</span>}
        </div>
      </div>

      {/* Summary with accent */}
      {summary && (
        <div className="mb-6 bg-white p-4 rounded-lg border-l-4 border-blue-600 shadow-sm">
          <p className="text-gray-700 leading-relaxed italic">
            {summary}
          </p>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-blue-600 mb-3 flex items-center">
            <span className="mr-2">🎓</span> Education
          </h2>
          {education.map((edu, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm mb-3">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                  <p className="text-gray-600">{edu.institution}</p>
                </div>
                <div className="text-right">
                  <p className="text-blue-600 font-medium">{edu.year}</p>
                  {edu.gpa && <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-blue-600 mb-3 flex items-center">
            <span className="mr-2">💼</span> Experience
          </h2>
          {experience.map((exp, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm mb-3">
              <div className="flex justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900">{exp.role}</h3>
                  <p className="text-gray-600">{exp.company}</p>
                </div>
                <p className="text-blue-600 font-medium text-sm">{exp.duration}</p>
              </div>
              {exp.description && (
                <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-blue-600 mb-3 flex items-center">
            <span className="mr-2">🚀</span> Projects
          </h2>
          {projects.map((project, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm mb-3">
              <h3 className="font-semibold text-gray-900 mb-1">{project.title}</h3>
              {project.description && (
                <p className="text-gray-700 text-sm leading-relaxed mb-2">{project.description}</p>
              )}
              {project.techUsed && (
                <div className="flex flex-wrap gap-2">
                  {project.techUsed.split(',').map((tech, i) => (
                    <span key={i} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                      {tech.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-blue-600 mb-3 flex items-center">
            <span className="mr-2">⚡</span> Skills
          </h2>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModernTemplate;
