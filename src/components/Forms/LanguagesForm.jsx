import { useState } from "react";
import ContentInput from "../UI/ContentInput";

const PROFICIENCY_OPTIONS = [
  "Native",
  "Fluent",
  "Professional",
  "Intermediate",
  "Basic",
];

export default function LanguagesForm({ entry, onSave, onCancel, onDelete }) {
  const [form, setForm] = useState(entry);
  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "language" && !value.trim()) {
      setErrors((prev) => ({ ...prev, [name]: "Language is required" }));
    } else if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSave = () => {
    const newErrors = {};
    if (!form.language?.trim()) newErrors.language = "Language is required";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onSave(form);
  };

  return (
    <div className="space-y-4 border border-gray-200 bg-white shadow-sm rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
      <div>
        <ContentInput
          label="Language"
          type="text"
          placeholder="e.g. English"
          required={true}
          value={form.language || ""}
          onChange={(e) => handleChange("language", e.target.value)}
        />
        {errors.language && (
          <p className="text-red-500 text-xs mt-1 bg-red-50 border border-red-200 rounded px-2 py-1">
            {errors.language}
          </p>
        )}
      </div>

      <div className="flex flex-col mb-4">
        <label className="mb-1 font-medium">Proficiency</label>
        <select
          value={form.proficiency || "Intermediate"}
          onChange={(e) => handleChange("proficiency", e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {PROFICIENCY_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 active:scale-95 transition-all duration-150 font-medium shadow-sm"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 active:scale-95 transition-all duration-150 font-medium shadow-sm"
        >
          Cancel
        </button>
        <button
          onClick={() => onDelete(form.id)}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 active:scale-95 transition-all duration-150 font-medium shadow-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
