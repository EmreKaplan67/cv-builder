// This component will have Education, Experience, and Skills components
import EducationCard from "../Cards/EducationCard";
import PersonalCard from "../Cards/PersonalCard";
import ExperienceCard from "../Cards/ExperienceCard";

export default function ContentEditor({ personal, setPersonal, education, setEducation, experience, setExperience }){
    return (
        <div className="w-1/2 p-6 space-y-6 overflow-y-scroll border-r">
            <PersonalCard personal={personal} setPersonal={setPersonal} />
            <EducationCard education={education} setEducation={setEducation} />
            <ExperienceCard experience={experience} setExperience={setExperience} />
        </div>
    );
}