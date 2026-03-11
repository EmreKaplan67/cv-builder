import { useState, memo } from "react";
import ContentCard from "../UI/ContentCard";
import LanguagesForm from "../Forms/LanguagesForm";
import { Pencil, Languages } from "lucide-react";

const LanguagesCard = memo(({ languages, setLanguages }) => {
  const [editingId, setEditingId] = useState(null);

  const handleAdd = () => {
    setEditingId("new");
  };

  const handleSave = (entry) => {
    if (editingId === "new") {
      setLanguages([...languages, { ...entry, id: crypto.randomUUID() }]);
    } else {
      setLanguages((prev) =>
        prev.map((lang) => (lang.id === editingId ? entry : lang))
      );
    }
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleDelete = (id) => {
    setLanguages(languages.filter((l) => l.id !== id));
    setEditingId(null);
  };

  const currentEntry =
    editingId === "new"
      ? { language: "", proficiency: "Intermediate" }
      : languages.find((l) => l.id === editingId);

  return (
    <ContentCard
      title="Languages"
      icon={<Languages size={26} />}
      defaultOpen={false}
    >
      {editingId ? (
        <LanguagesForm
          entry={currentEntry}
          onSave={handleSave}
          onCancel={handleCancel}
          onDelete={handleDelete}
        />
      ) : (
        <>
          <ul className="space-y-4">
            {languages.map((lang) => (
              <li
                key={lang.id}
                className="flex items-start justify-between rounded-xl border-2 p-4 shadow-lg transition-all"
              >
                <div className="flex flex-col">
                  <h2 className="text-lg font-semibold">{lang.language}</h2>
                  <p className="text-sm text-gray-600 font-medium">
                    {lang.proficiency}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingId(lang.id)}
                  aria-label={`Edit ${lang.language}`}
                >
                  <Pencil size={18} className="text-gray-600 cursor-pointer" />
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={handleAdd}
            className="mt-4 rounded-xl bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 transition"
          >
            + Add Language
          </button>
        </>
      )}
    </ContentCard>
  );
});

export default LanguagesCard;
