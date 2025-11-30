// Preview of the CV
export default function Preview({ personal, education, experience }) {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const [year, month] = dateString.split("-");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  return (
    <div className="border p-8 rounded-lg bg-white shadow-lg max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="border-b-2 border-gray-200 pb-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          {personal.firstName} {personal.lastName}
        </h1>
        {personal.title && (
          <p className="text-xl text-gray-600 mt-2">{personal.title}</p>
        )}
        
        {/* Contact Info */}
        <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
          {personal.email && (
            <div className="flex items-center gap-1">
              <span>📧</span>
              <span>{personal.email}</span>
            </div>
          )}
          {personal.phone && (
            <div className="flex items-center gap-1">
              <span>📱</span>
              <span>{personal.phone}</span>
            </div>
          )}
          {personal.location && (
            <div className="flex items-center gap-1">
              <span>📍</span>
              <span>{personal.location}</span>
            </div>
          )}
          {personal.website && (
            <div className="flex items-center gap-1">
              <span>🌐</span>
              <a href={personal.website} className="text-blue-600 hover:underline">
                {personal.website}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* About Section */}
      {personal.about && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
            About
          </h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {personal.about}
          </p>
        </div>
      )}

      {/* Experience Section */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-300 pb-1">
            Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="relative">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">
                      {exp.position}
                    </h3>
                    <p className="text-sm text-gray-700 font-medium">
                      {exp.company}
                    </p>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <div>{formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : "Present"}</div>
                    {exp.location && (
                      <div className="text-xs">{exp.location}</div>
                    )}
                  </div>
                </div>
                {exp.description && (
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap ml-0">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education Section */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-300 pb-1">
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="relative">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">
                      {edu.school}
                    </h3>
                    <p className="text-sm text-gray-700 font-medium">
                      {edu.degree}
                    </p>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <div>{formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : "Present"}</div>
                    {edu.location && (
                      <div className="text-xs">{edu.location}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
