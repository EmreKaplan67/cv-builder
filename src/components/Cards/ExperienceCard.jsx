// A section to add your work experience (company, position, dates, and description)
import { useState, memo } from "react";

import ContentCard from "../UI/ContentCard";
import ExperienceForm from "../Forms/ExperienceForm";

import { Pencil, Briefcase } from "lucide-react";

const ExperienceCard = memo(({ experience, setExperience }) => {
  const [editingId, setEditingId] = useState(null);

  const handleAdd = () => {
    setEditingId("new");
  };

  const handleSave = (entry) => {
    if (editingId === "new") {
      // Add new entry
      setExperience([...experience, { ...entry, id: crypto.randomUUID() }]);
    } else {
      // Edit existing entry
      setExperience((prev) =>
        prev.map((exp) => (exp.id === editingId ? entry : exp))
      );
    }

    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleDelete = (id) => {
    setExperience(experience.filter((e) => e.id !== id));
    setEditingId(null);
  };

  // Entry for editing (if editing an existing one)
  const currentEntry =
    editingId === "new"
      ? { company: "", position: "", startDate: "", endDate: "", location: "", description: "" }
      : experience.find((e) => e.id === editingId);

  // Truncate description for display
  const truncateDescription = (description, maxLength = 100) => {
    if (!description) return "";
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + "...";
  };

  return (
    <ContentCard
      title="Experience"
      icon={<Briefcase size={26} />}
      defaultOpen={false}
    >
      {editingId ? (
        <ExperienceForm
          entry={currentEntry}
          onSave={handleSave}
          onCancel={handleCancel}
          onDelete={handleDelete}
        />
      ) : (
        <>
          <ul className="space-y-4">
            {experience.map((exp) => (
              <li
                key={exp.id}
                className="flex items-start justify-between rounded-xl border-2 p-4 shadow-lg transition-all hover:shadow-xl"
              >
                <div className="flex flex-col flex-1">
                  <h2 className="text-lg font-semibold text-gray-900">{exp.company}</h2>
                  <p className="text-sm text-gray-700 font-medium mt-1">
                    {exp.position}
                  </p>
                  <span className="text-xs text-gray-500 mt-2">
                    {exp.startDate} - {exp.endDate || "Present"}
                  </span>
                  {exp.location && (
                    <span className="text-xs text-gray-500 mt-1">
                      📍 {exp.location}
                    </span>
                  )}
                  {exp.description && (
                    <p className="text-sm text-gray-600 mt-3 leading-relaxed whitespace-pre-wrap wrap-break-word">
                      {truncateDescription(exp.description)}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setEditingId(exp.id)}
                  aria-label={`Edit ${exp.company}`}
                  className="ml-4 shrink-0"
                >
                  <Pencil size={18} className="text-gray-600 cursor-pointer hover:text-blue-600 transition-colors"/>
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={handleAdd}
            className="mt-4 rounded-xl bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 transition-all duration-150 shadow-sm hover:shadow-md"
          >
            + Add Experience
          </button>
        </>
      )}
    </ContentCard>
  );
});

export default ExperienceCard;