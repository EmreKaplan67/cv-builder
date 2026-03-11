import { useState, memo } from "react";
import ContentCard from "../UI/ContentCard";
import CertificationsForm from "../Forms/CertificationsForm";
import { Pencil, Award } from "lucide-react";

const CertificationsCard = memo(({ certifications, setCertifications }) => {
  const [editingId, setEditingId] = useState(null);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const [year, month] = dateString.split("-");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  const handleAdd = () => {
    setEditingId("new");
  };

  const handleSave = (entry) => {
    if (editingId === "new") {
      setCertifications([...certifications, { ...entry, id: crypto.randomUUID() }]);
    } else {
      setCertifications((prev) =>
        prev.map((cert) => (cert.id === editingId ? entry : cert))
      );
    }
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleDelete = (id) => {
    setCertifications(certifications.filter((c) => c.id !== id));
    setEditingId(null);
  };

  const currentEntry =
    editingId === "new"
      ? { name: "", issuer: "", date: "", url: "" }
      : certifications.find((c) => c.id === editingId);

  return (
    <ContentCard
      title="Certifications"
      icon={<Award size={26} />}
      defaultOpen={false}
    >
      {editingId ? (
        <CertificationsForm
          entry={currentEntry}
          onSave={handleSave}
          onCancel={handleCancel}
          onDelete={handleDelete}
        />
      ) : (
        <>
          <ul className="space-y-4">
            {certifications.map((cert) => (
              <li
                key={cert.id}
                className="flex items-start justify-between rounded-xl border-2 p-4 shadow-lg transition-all"
              >
                <div className="flex flex-col">
                  <h2 className="text-lg font-semibold">{cert.name}</h2>
                  <p className="text-sm text-gray-600 font-medium">{cert.issuer}</p>
                  {cert.date && (
                    <span className="text-xs text-gray-500 mt-1">
                      {formatDate(cert.date)}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setEditingId(cert.id)}
                  aria-label={`Edit ${cert.name}`}
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
            + Add Certification
          </button>
        </>
      )}
    </ContentCard>
  );
});

export default CertificationsCard;
