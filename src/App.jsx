import { useState, useEffect } from "react";
import ContentEditor from "./components/ContentEditor/ContentEditor";
import Preview from "./components/Preview/Preview";

export default function App() {
  // Mobile view state
  const [showEditor, setShowEditor] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size and set mobile state
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
      // Load preference from localStorage
      const savedPreference = localStorage.getItem('cv-editor-view');
      if (savedPreference && window.innerWidth < 1024) {
        setShowEditor(savedPreference === 'editor');
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Save preference to localStorage
  useEffect(() => {
    if (isMobile) {
      localStorage.setItem('cv-editor-view', showEditor ? 'editor' : 'preview');
    }
  }, [showEditor, isMobile]);

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
    <div className="flex h-screen relative">
      {/* Desktop: Side by side layout */}
      <div className="hidden lg:flex lg:w-full">
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

      {/* Mobile: Single view with toggle */}
      <div className="lg:hidden w-full">
        {showEditor ? (
          <ContentEditor
            personal={personal}
            setPersonal={setPersonal}
            education={education}
            setEducation={setEducation}
            experience={experience}
            setExperience={setExperience}
          />
        ) : (
          <div className="w-full p-4 overflow-y-auto">
            <Preview
              personal={personal}
              education={education}
              experience={experience}
            />
          </div>
        )}
      </div>

      {/* Mobile Toggle Button */}
      {isMobile && (
        <button
          onClick={() => setShowEditor(!showEditor)}
          className="lg:hidden fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-colors duration-200"
          aria-label={showEditor ? "Switch to preview" : "Switch to editor"}
        >
          {showEditor ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
}
