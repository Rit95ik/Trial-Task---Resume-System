const MinimalTemplate = ({ resumeData }) => {
  const { personalInfo, education, experience, projects, skills, summary } = resumeData;

  return (
    <div className="bg-white p-8 max-w-3xl mx-auto font-sans">
      {/* Header - Ultra minimal */}
      <div className="mb-8">
        <h1 className="text-4xl font-light text-gray-900 mb-3">
          {personalInfo.name || 'Your Name'}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.linkedin && <span>LinkedIn</span>}
          {personalInfo.github && <span>GitHub</span>}
        </div>
      </div>

      {/* Summary - Clean and simple */}
      {summary && (
        <div className="mb-8">
          <p className="text-gray-600 leading-relaxed font-light">
            {summary}
          </p>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Education
          </h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline">
                <div>
                  <h3 className="font-medium text-gray-900">{edu.degree}</h3>
                  <p className="text-gray-600 text-sm">{edu.institution}</p>
                </div>
                <div className="text-right text-sm text-gray-500">
                  {edu.year}
                  {edu.gpa && <span className="ml-2">• {edu.gpa}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Experience
          </h2>
          {experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline mb-1">
                <div>
                  <h3 className="font-medium text-gray-900">{exp.role}</h3>
                  <p className="text-gray-600 text-sm">{exp.company}</p>
                </div>
                <p className="text-gray-500 text-sm">{exp.duration}</p>
              </div>
              {exp.description && (
                <p className="text-gray-600 text-sm leading-relaxed font-light mt-2">
                  {exp.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Projects
          </h2>
          {projects.map((project, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-medium text-gray-900">{project.title}</h3>
              {project.description && (
                <p className="text-gray-600 text-sm leading-relaxed font-light mt-1">
                  {project.description}
                </p>
              )}
              {project.techUsed && (
                <p className="text-gray-500 text-sm mt-1">{project.techUsed}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Skills
          </h2>
          <p className="text-gray-600 font-light">{skills.join(' · ')}</p>
        </div>
      )}
    </div>
  );
};

export default MinimalTemplate;
