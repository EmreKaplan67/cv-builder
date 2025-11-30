import { useState, memo } from "react";
import ContentCard from "../UI/ContentCard";
import PersonalForm from "../Forms/PersonalForm";
import { UserPen } from "lucide-react";

const PersonalCard = memo(({ personal, setPersonal }) => {
  const [editing, setEditing] = useState(false);

  return (
    <ContentCard
      title="Personal Info"
      icon={<UserPen size={26} />}
      defaultOpen={true}
    >
      {editing ? (
        <PersonalForm
          entry={personal}
          onSave={(data) => {
            setPersonal(data);
            setEditing(false);
          }}
          onCancel={() => setEditing(false)}
        />
      ) : (
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                {personal.firstName} {personal.lastName}
              </h2>
              {personal.title && (
                <span className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full font-medium">
                  {personal.title}
                </span>
              )}
            </div>
            
            <div className="space-y-2 text-sm text-gray-600">
              {personal.email && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">📧</span>
                  <span>{personal.email}</span>
                </div>
              )}
              
              {personal.phone && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">📱</span>
                  <span>{personal.phone}</span>
                </div>
              )}
              
              {personal.website && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">🌐</span>
                  <a 
                    href={personal.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                  >
                    {personal.website}
                  </a>
                </div>
              )}
              
              {personal.location && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">📍</span>
                  <span>{personal.location}</span>
                </div>
              )}
            </div>
            
            {personal.about && (
              <div className="pt-3 border-t border-gray-200">
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap wrap-break-word max-w-full">{personal.about}</p>
              </div>
            )}
          </div>
          
          <button
            onClick={() => setEditing(true)}
            className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 active:scale-95 transition-all duration-150 font-medium shadow-sm flex items-center gap-2"
          >
            <span>✏️</span>
            Edit
          </button>
        </div>
      )}
    </ContentCard>
  );
});

export default PersonalCard;
