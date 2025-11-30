import { useState } from "react";
import ContentEditor from "./components/ContentEditor/ContentEditor";
import Preview from "./components/Preview/Preview";

export default function App() {
  // Personal info state
  const [personal, setPersonal] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    website: "https://johndoe.dev",
    location: "New York, USA",
    title: "Full Stack Developer",
    about: "Passionate software developer with 5+ years of experience building web applications. Specialized in React, TypeScript, and Node.js. Love creating intuitive user interfaces and solving complex problems.",
  });

  // Education state
  const [education, setEducation] = useState([
    {
      id: crypto.randomUUID(),
      school: "Harvard University",
      degree: "BSc Computer Science",
      startDate: "2018-09",
      endDate: "2022-06",
      location: "Cambridge, MA",
    },
  ]);

  // Experience state
  const [experience, setExperience] = useState([
    {
      id: crypto.randomUUID(),
      company: "Tech Corp",
      position: "Frontend Developer",
      startDate: "2022-07",
      endDate: "2024-06",
      location: "San Francisco, CA",
      description: "Developed responsive web applications using React and TypeScript. Collaborated with cross-functional teams to deliver high-quality user experiences.",
    },
  ]);

  return (
    <div className="flex h-screen">
      {/* Left Side: Input Editor */}
      <ContentEditor
        personal={personal}
        setPersonal={setPersonal}
        education={education}
        setEducation={setEducation}
        experience={experience}
        setExperience={setExperience}
      />

      {/* Right Side: Preview */}
      <div className="w-1/2 p-4 overflow-y-auto">
        <Preview
          personal={personal}
          education={education}
          experience={experience}
        />
      </div>
    </div>
  );
}
