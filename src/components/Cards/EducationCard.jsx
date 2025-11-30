// A section to add your educational experience (school name, title of study and date of study)
import { useState, memo } from "react";

import ContentCard from "../UI/ContentCard";
import EducationForm from "../Forms/EducationForm";

import { Pencil, GraduationCap } from "lucide-react";

const EducationCard = memo(({ education, setEducation }) => {
  const [editingId, setEditingId] = useState(null);

  const handleAdd = () => {
    setEditingId("new");
  };

  const handleSave = (entry) => {
    if (editingId === "new") {
      // Add new entry
      setEducation([...education, { ...entry, id: crypto.randomUUID() }]);
    } else {
      // Edit existing entry
      setEducation((prev) =>
        prev.map((edu) => (edu.id === editingId ? entry : edu))
      );
    }

    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleDelete = (id) => {
    setEducation(education.filter((e) => e.id !== id));
    setEditingId(null);
  };

  // Entry for editing (if editing an existing one)
  const currentEntry =
    editingId === "new"
      ? { school: "", degree: "", startDate: "", endDate: "", location: "" }
      : education.find((e) => e.id === editingId);

  return (
    <ContentCard
      title="Education"
      icon={<GraduationCap size={26} />}
      defaultOpen={false}
    >
      {editingId ? (
        <EducationForm
          entry={currentEntry}
          onSave={handleSave}
          onCancel={handleCancel}
          onDelete={handleDelete}
        />
      ) : (
        <>
          <ul className="space-y-4">
            {education.map((edu) => (
              <li
                key={edu.id}
                className="flex items-start justify-between rounded-xl border-2 p-4 shadow-lg transition-all"
              >
                <div className="flex flex-col">
                  <h2 className="text-lg font-semibold">{edu.school}</h2>
                  <p className="text-sm text-gray-600 font-medium">
                    {edu.degree}
                  </p>
                  <span className="text-xs text-gray-500 mt-1">
                    {edu.startDate} - {edu.endDate || "Present"}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingId(edu.id)}
                  aria-label={`Edit ${edu.school}`}
                >
                  <Pencil size={18} className="text-gray-600 cursor-pointer"/>
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={handleAdd}
            className="mt-4 rounded-xl bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 transition"
          >
            + Add Education
          </button>
        </>
      )}
    </ContentCard>
  );
});

export default EducationCard;
