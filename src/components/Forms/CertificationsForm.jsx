import { useState, useMemo } from "react";
import ContentInput from "../UI/ContentInput";

export default function CertificationsForm({ entry, onSave, onCancel, onDelete }) {
  const [form, setForm] = useState(entry);
  const [errors, setErrors] = useState({});

  const today = new Date();
  const maxMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;

  const fields = useMemo(
    () => [
      {
        key: crypto.randomUUID(),
        label: "Certification Name",
        name: "name",
        type: "text",
        placeholder: "e.g. AWS Certified Developer",
        required: true,
      },
      {
        key: crypto.randomUUID(),
        label: "Issuer",
        name: "issuer",
        type: "text",
        placeholder: "e.g. Amazon Web Services",
        required: true,
      },
      {
        key: crypto.randomUUID(),
        label: "Date (optional)",
        name: "date",
        type: "month",
        placeholder: "Select date",
        required: false,
      },
      {
        key: crypto.randomUUID(),
        label: "Credential URL (optional)",
        name: "url",
        type: "url",
        placeholder: "https://...",
        required: false,
      },
    ],
    []
  );

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    const field = fields.find((f) => f.name === name);
    if (field?.required && !value.trim()) {
      setErrors((prev) => ({ ...prev, [name]: `${field.label} is required` }));
    } else if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
    if (field?.type === "month" && value > maxMonth) {
      setErrors((prev) => ({ ...prev, [name]: "Date cannot be in the future" }));
    } else if (errors[name] === "Date cannot be in the future") {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSave = () => {
    const newErrors = {};
    fields.forEach(({ name, label, required, type }) => {
      const value = form[name] || "";
      if (required && !value.trim()) newErrors[name] = `${label} is required`;
      if (type === "month" && value > maxMonth)
        newErrors[name] = "Date cannot be in the future";
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onSave(form);
  };

  return (
    <div className="space-y-4 border border-gray-200 bg-white shadow-sm rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
      {fields.map(({ key, label, name, type, placeholder, required }) => (
        <div key={key}>
          <ContentInput
            label={label}
            type={type}
            placeholder={placeholder}
            required={required}
            value={form[name] || ""}
            onChange={(e) => handleChange(name, e.target.value)}
            max={type === "month" ? maxMonth : undefined}
          />
          {errors[name] && (
            <p className="text-red-500 text-xs mt-1 bg-red-50 border border-red-200 rounded px-2 py-1">
              {errors[name]}
            </p>
          )}
        </div>
      ))}

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
