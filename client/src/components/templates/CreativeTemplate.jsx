const CreativeTemplate = ({ resumeData }) => {
  const { personalInfo, education, experience, projects, skills, summary } = resumeData;

  return (
    <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-8 max-w-3xl mx-auto">
      {/* Header - Bold and creative */}
      <div className="relative mb-6">
        <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20"></div>
        <div className="relative z-10 pl-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            {personalInfo.name || 'Your Name'}
          </h1>
          <div className="flex flex-wrap gap-3 text-sm text-gray-600">
            {personalInfo.email && (
              <span className="flex items-center gap-1">
                <span className="text-purple-500">✉</span> {personalInfo.email}
              </span>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-1">
                <span className="text-pink-500">📱</span> {personalInfo.phone}
              </span>
            )}
            {personalInfo.linkedin && (
              <span className="flex items-center gap-1">
                <span className="text-blue-500">💼</span> LinkedIn
              </span>
            )}
            {personalInfo.github && (
              <span className="flex items-center gap-1">
                <span className="text-orange-500">💻</span> GitHub
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Summary - Eye-catching box */}
      {summary && (
        <div className="mb-6 relative">
          <div className="absolute -left-2 top-0 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-r-xl shadow-lg ml-2">
            <p className="text-gray-700 leading-relaxed italic font-medium">
              {summary}
            </p>
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-lg flex items-center justify-center text-white mr-3">
              🎓
            </span>
            Education
          </h2>
          {education.map((edu, index) => (
            <div key={index} className="bg-white/70 backdrop-blur-sm p-4 rounded-xl shadow-md mb-3 border-l-4 border-blue-400">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                  <p className="text-gray-700">{edu.institution}</p>
                </div>
                <div className="text-right">
                  <p className="text-purple-600 font-semibold">{edu.year}</p>
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
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="w-10 h-10 bg-gradient-to-br from-green-400 to-teal-400 rounded-lg flex items-center justify-center text-white mr-3">
              💼
            </span>
            Experience
          </h2>
          {experience.map((exp, index) => (
            <div key={index} className="bg-white/70 backdrop-blur-sm p-4 rounded-xl shadow-md mb-3 border-l-4 border-green-400">
              <div className="flex justify-between mb-2">
                <div>
                  <h3 className="font-bold text-gray-900">{exp.role}</h3>
                  <p className="text-gray-700">{exp.company}</p>
                </div>
                <p className="text-teal-600 font-semibold text-sm">{exp.duration}</p>
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
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-400 rounded-lg flex items-center justify-center text-white mr-3">
              🚀
            </span>
            Projects
          </h2>
          {projects.map((project, index) => (
            <div key={index} className="bg-white/70 backdrop-blur-sm p-4 rounded-xl shadow-md mb-3 border-l-4 border-orange-400">
              <h3 className="font-bold text-gray-900 mb-1">{project.title}</h3>
              {project.description && (
                <p className="text-gray-700 text-sm leading-relaxed mb-2">{project.description}</p>
              )}
              {project.techUsed && (
                <div className="flex flex-wrap gap-2">
                  {project.techUsed.split(',').map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gradient-to-r from-orange-400 to-pink-400 text-white rounded-full text-xs font-semibold shadow-sm"
                    >
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
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-400 rounded-lg flex items-center justify-center text-white mr-3">
              ⚡
            </span>
            Skills
          </h2>
          <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl shadow-md">
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => {
                const gradients = [
                  'from-purple-400 to-pink-400',
                  'from-blue-400 to-cyan-400',
                  'from-green-400 to-teal-400',
                  'from-orange-400 to-red-400',
                ];
                const gradient = gradients[index % gradients.length];
                return (
                  <span
                    key={index}
                    className={`px-4 py-2 bg-gradient-to-r ${gradient} text-white rounded-lg text-sm font-semibold shadow-md transform hover:scale-105 transition-transform`}
                  >
                    {skill}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreativeTemplate;
