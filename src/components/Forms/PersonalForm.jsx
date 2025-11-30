import { useState, useMemo } from "react";
import ContentInput from "../UI/ContentInput";

export default function PersonalForm({ entry, onSave, onCancel }) {
  const [form, setForm] = useState(entry);
  const [errors, setErrors] = useState({});

  // Define fields similar to EducationForm
  const fields = useMemo(() => [
    {
      key: crypto.randomUUID(),
      label: "First Name",
      name: "firstName",
      type: "text",
      required: true,
      placeholder: "Enter your first name",
    },
    {
      key: crypto.randomUUID(),
      label: "Last Name",
      name: "lastName",
      type: "text",
      required: true,
      placeholder: "Enter your last name",
    },
    {
      key: crypto.randomUUID(),
      label: "Email",
      name: "email",
      type: "email",
      required: true,
      placeholder: "Enter your email",
    },
    {
      key: crypto.randomUUID(),
      label: "Phone (optional)",
      name: "phone",
      type: "text",
      required: false,
      placeholder: "Enter phone number",
    },
    {
      key: crypto.randomUUID(),
      label: "Website (optional)",
      name: "website",
      type: "url",
      required: false,
      placeholder: "https://example.com",
    },
    {
      key: crypto.randomUUID(),
      label: "Location (optional)",
      name: "location",
      type: "text",
      required: false,
      placeholder: "e.g. New York, USA",
    },
    {
      key: crypto.randomUUID(),
      label: "Professional Title (optional)",
      name: "title",
      type: "text",
      required: false,
      placeholder: "e.g. Frontend Developer",
    },
    {
      key: crypto.randomUUID(),
      label: "About (optional)",
      name: "about",
      type: "textarea",
      required: false,
      placeholder: "Write a short summary about yourself",
      maxLength: 500,
      rows: 4,
    },
  ], []);

  const handleChange = (name, value) => {
    setForm(prev => ({ ...prev, [name]: value }));

    const field = fields.find(f => f.name === name);

    if (field.required && !value.trim()) {
      setErrors(prev => ({ ...prev, [name]: `${field.label} is required` }));
      return;
    }

    // Email validation
    if (name === "email" && value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value))
        return setErrors(prev => ({ ...prev, email: "Invalid email format" }));
    }

    // Clear errors
    setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSave = () => {
    const newErrors = {};

    fields.forEach(({ name, label, required }) => {
      const value = form[name] || "";
      if (required && !value.trim())
        newErrors[name] = `${label} is required`;
    });

    // Email validation on submit
    if (form.email?.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email))
        newErrors.email = "Invalid email format";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave(form);
  };

  return (
    <div className="space-y-4 border border-gray-200 bg-white shadow-sm rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
      {fields.map(({ key, label, name, type, required, placeholder, maxLength, rows }) => (
        <div key={key}>
          <ContentInput
            label={label}
            type={type}
            placeholder={placeholder}
            required={required}
            value={form[name] || ""}
            onChange={(e) => handleChange(name, e.target.value)}
            maxLength={maxLength}
            rows={rows}
          />
          {errors[name] && (
            <p className="text-red-500 text-xs mt-1 bg-red-50 border border-red-200 rounded px-2 py-1">{errors[name]}</p>
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
      </div>
    </div>
  );
}
