import { useState, useMemo } from "react";
import ContentInput from "../UI/ContentInput";

export default function EducationForm({ entry, onSave, onCancel, onDelete }) {
  const [form, setForm] = useState(entry);
  const [errors, setErrors] = useState({});

  // Get current year-month (YYYY-MM)
  const today = new Date();
  const maxMonth = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}`;

  // Define fields with memoization so UUIDs are stable across renders
  const fields = useMemo(
    () => [
      {
        key: crypto.randomUUID(),
        label: "School",
        name: "school",
        type: "text",
        placeholder: "Enter school name",
        required: true,
      },
      {
        key: crypto.randomUUID(),
        label: "Degree",
        name: "degree",
        type: "text",
        placeholder: "Enter degree or title of study",
        required: true,
      },
      {
        key: crypto.randomUUID(),
        label: "Start Date",
        name: "startDate",
        type: "month",
        placeholder: "Select start date",
        required: true,
      },
      {
        key: crypto.randomUUID(),
        label: "End Date",
        name: "endDate",
        type: "month",
        placeholder: "Select end date",
        required: false,
      },
      {
        key: crypto.randomUUID(),
        label: "Location (optional)",
        name: "location",
        type: "text",
        placeholder: "Enter location",
        required: false,
      },
    ],
    []
  );

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));

    // Inline validation
    const field = fields.find((f) => f.name === name);
    if (field.required && !value.trim()) {
      setErrors((prev) => ({ ...prev, [name]: `${field.label} is required` }));
    } else if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }

    // Prevent future months
    if (field.type === "month" && value > maxMonth) {
      setErrors((prev) => ({
        ...prev,
        [name]: "Date cannot be in the future",
      }));
    } else if (errors[name] === "Date cannot be in the future") {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }

    // Validate the relationship Start <= End
    if (name === "startDate" && form.endDate && form.endDate < value) {
      setErrors((prev) => ({
        ...prev,
        endDate: "End date cannot be before start date",
      }));
    } else if (name === "endDate" && value < form.startDate) {
      setErrors((prev) => ({
        ...prev,
        endDate: "End date cannot be before start date",
      }));
    } else {
      setErrors((prev) => ({ ...prev, endDate: null }));
    }
  };

  const handleSave = () => {
    const newErrors = {};

    // Validate required and date fields
    fields.forEach(({ name, label, required, type }) => {
      const value = form[name] || "";
      if (required && !value.trim()) newErrors[name] = `${label} is required`;
      if (type === "month" && value > maxMonth)
        newErrors[name] = "Date cannot be in the future";
    });

    // Ensure EndDate >= StartDate
    if (form.startDate && form.endDate && form.endDate < form.startDate) {
      newErrors.endDate = "End date cannot be before start date";
    }

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
        <button onClick={onCancel} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 active:scale-95 transition-all duration-150 font-medium shadow-sm">
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
