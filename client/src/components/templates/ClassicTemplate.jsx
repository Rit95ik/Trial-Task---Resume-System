const ClassicTemplate = ({ resumeData }) => {
  const { personalInfo, education, experience, projects, skills, summary } = resumeData;

  return (
    <div className="bg-white p-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center border-b-2 border-gray-800 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {personalInfo.name || 'Your Name'}
        </h1>
        <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>•</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.linkedin && <span>•</span>}
          {personalInfo.linkedin && <span>LinkedIn</span>}
          {personalInfo.github && <span>•</span>}
          {personalInfo.github && <span>GitHub</span>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-6">
          <p className="text-gray-700 leading-relaxed text-justify">
            {summary}
          </p>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 uppercase border-b border-gray-400 pb-1 mb-3">
            Education
          </h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                  <p className="text-gray-700 text-sm">{edu.institution}</p>
                </div>
                <div className="text-right text-sm">
                  <p className="text-gray-600">{edu.year}</p>
                  {edu.gpa && <p className="text-gray-600">GPA: {edu.gpa}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 uppercase border-b border-gray-400 pb-1 mb-3">
            Experience
          </h2>
          {experience.map((exp, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between mb-1">
                <div>
                  <h3 className="font-semibold text-gray-900">{exp.role}</h3>
                  <p className="text-gray-700 text-sm">{exp.company}</p>
                </div>
                <p className="text-gray-600 text-sm">{exp.duration}</p>
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
          <h2 className="text-lg font-bold text-gray-800 uppercase border-b border-gray-400 pb-1 mb-3">
            Projects
          </h2>
          {projects.map((project, index) => (
            <div key={index} className="mb-3">
              <h3 className="font-semibold text-gray-900">{project.title}</h3>
              {project.description && (
                <p className="text-gray-700 text-sm leading-relaxed">{project.description}</p>
              )}
              {project.techUsed && (
                <p className="text-gray-600 text-sm">
                  <span className="font-medium">Tech:</span> {project.techUsed}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 uppercase border-b border-gray-400 pb-1 mb-3">
            Skills
          </h2>
          <p className="text-gray-700">{skills.join(' • ')}</p>
        </div>
      )}
    </div>
  );
};

export default ClassicTemplate;
