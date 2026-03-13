// This component will have Education, Experience, Certifications, and Languages components
import EducationCard from "../Cards/EducationCard";
import PersonalCard from "../Cards/PersonalCard";
import ExperienceCard from "../Cards/ExperienceCard";
import CertificationsCard from "../Cards/CertificationsCard";
import LanguagesCard from "../Cards/LanguagesCard";
import PrivacyNotice from "../PrivacyNotice/PrivacyNotice";

export default function ContentEditor({
  personal,
  setPersonal,
  education,
  setEducation,
  experience,
  setExperience,
  certifications,
  setCertifications,
  languages,
  setLanguages,
}) {
  return (
    <div className="lg:w-1/2 w-full p-6 space-y-6 overflow-y-scroll border-r-0 lg:border-r">
      <PersonalCard personal={personal} setPersonal={setPersonal} />
      <EducationCard education={education} setEducation={setEducation} />
      <ExperienceCard experience={experience} setExperience={setExperience} />
      <CertificationsCard
        certifications={certifications}
        setCertifications={setCertifications}
      />
      <LanguagesCard languages={languages} setLanguages={setLanguages} />
      <div className="pt-4 mt-2 border-t border-gray-200">
        <PrivacyNotice />
      </div>
    </div>
  );
}