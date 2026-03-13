// Preview of the CV
export default function Preview({ personal, education, experience, certifications = [], languages = [] }) {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const [year, month] = dateString.split("-");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  const sectionDivider = "pt-6 mt-6 border-t border-gray-200";
  const sectionTitle = "text-xs font-semibold mb-3 uppercase tracking-widest text-gray-500 pl-3 border-l-2 border-slate-400";

  return (
    <div className="bg-white max-w-[210mm] mx-auto py-12 px-14 text-[11pt] leading-relaxed shadow-sm" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Header Section */}
      <div
        className="pb-6 flex gap-6 flex-wrap border-b border-gray-200"
        data-cv-header="true"
      >
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            {personal.firstName} {personal.lastName}
          </h1>
          {personal.title && (
            <p className="text-sm text-gray-500 mt-1 font-medium">{personal.title}</p>
          )}
          
          {/* Contact Info */}
          <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3 text-[10pt] text-gray-500">
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
        {personal.photo && (
          <img
            src={personal.photo}
            alt={`${personal.firstName} ${personal.lastName}`}
            className="w-20 h-20 rounded-full object-cover shrink-0"
            data-cv-photo="true"
          />
        )}
      </div>

      {/* About Section */}
      {personal.about && (
        <div className="pt-6 mt-6">
          <h2 className={sectionTitle}>
            About
          </h2>
          <p
            className="text-gray-700 leading-relaxed whitespace-pre-wrap text-[10pt]"
            data-cv-block="avoid-break"
          >
            {personal.about}
          </p>
        </div>
      )}

      {/* Experience Section */}
      {experience.length > 0 && (
        <div className={sectionDivider}>
          <h2 className={sectionTitle}>
            Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="relative">
                <div className="flex justify-between items-start gap-4 mb-1">
                  <div>
                    <h3 className="text-[11pt] font-semibold text-gray-900">
                      {exp.position}
                    </h3>
                    <p className="text-[10pt] text-gray-700 font-medium">
                      {exp.company}
                    </p>
                  </div>
                  <div className="text-right text-[10pt] text-gray-600 shrink-0">
                    <div>{formatDate(exp.startDate)} – {exp.endDate ? formatDate(exp.endDate) : "Present"}</div>
                    {exp.location && (
                      <div className="text-[9pt]">{exp.location}</div>
                    )}
                  </div>
                </div>
                {exp.description && (
                  <p
                    className="text-[10pt] text-gray-700 leading-relaxed whitespace-pre-wrap"
                    data-cv-block="avoid-break"
                  >
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
        <div className={sectionDivider}>
          <h2 className={sectionTitle}>
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="relative">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="text-[11pt] font-semibold text-gray-900">
                      {edu.school}
                    </h3>
                    <p className="text-[10pt] text-gray-700 font-medium">
                      {edu.degree}
                    </p>
                  </div>
                  <div className="text-right text-[10pt] text-gray-600 shrink-0">
                    <div>{formatDate(edu.startDate)} – {edu.endDate ? formatDate(edu.endDate) : "Present"}</div>
                    {edu.location && (
                      <div className="text-[9pt]">{edu.location}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications Section */}
      {certifications.length > 0 && (
        <div className={sectionDivider}>
          <h2 className="text-xs font-semibold mb-3 uppercase tracking-widest text-gray-500 pl-3 border-l-2 border-gray-300">
            Certifications
          </h2>
          <div className="space-y-4">
            {certifications.map((cert) => (
              <div key={cert.id} className="relative">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-[11pt] font-semibold text-gray-900">
                      {cert.url ? (
                        <a href={cert.url} className="text-blue-600 hover:underline">
                          {cert.name}
                        </a>
                      ) : (
                        cert.name
                      )}
                    </h3>
                    <p className="text-[10pt] text-gray-700 font-medium">
                      {cert.issuer}
                    </p>
                    {cert.date && (
                      <span className="text-[9pt] text-gray-600">
                        {formatDate(cert.date)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages Section */}
      {languages.length > 0 && (
        <div className={sectionDivider}>
          <h2 className={sectionTitle}>
            Languages
          </h2>
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            {languages.map((lang) => (
              <div key={lang.id} className="flex items-center gap-2">
                <span className="text-[11pt] font-semibold text-gray-900">
                  {lang.language}
                </span>
                <span className="text-[10pt] text-gray-600">— {lang.proficiency}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
