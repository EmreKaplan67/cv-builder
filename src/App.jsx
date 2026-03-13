import { useState, useEffect, useRef } from "react";
import html2pdf from "html2pdf.js";
import ContentEditor from "./components/ContentEditor/ContentEditor";
import Preview from "./components/Preview/Preview";

const STORAGE_KEY = "cv-editor-data";

function DownloadButton({ onClick, isDownloading }) {
  return (
    <button
      onClick={onClick}
      disabled={isDownloading}
      className="flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-500 disabled:cursor-not-allowed text-white font-semibold px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg active:scale-[0.98] transition-all duration-200 border border-emerald-700/30"
      aria-label="Download CV as PDF"
    >
      {isDownloading ? (
        <>
          <svg className="w-5 h-5 animate-spin shrink-0" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span>Generating PDF…</span>
        </>
      ) : (
        <>
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          <span>Download PDF</span>
        </>
      )}
    </button>
  );
}

export default function App() {
  const savedData =
    typeof window !== "undefined"
      ? (() => {
          try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : null;
          } catch (e) {
            console.error("Failed to parse saved CV data:", e);
            return null;
          }
        })()
      : null;

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

  const previewRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPDF = async () => {
    const element = previewRef.current;
    if (!element) return;
    setIsDownloading(true);
    try {
      element.scrollIntoView({ behavior: "instant", block: "start" });
      await new Promise((r) => setTimeout(r, 150));

      const name = `${personal.firstName}_${personal.lastName}`.replace(/\s+/g, "_");
      const opt = {
        margin: 10,
        filename: `${name}_CV.pdf`,
        image: { type: "png", quality: 1 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff",
          logging: false,
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      await html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  // Personal info state (photo is in-memory only, lost on refresh)
  const [personal, setPersonal] = useState(
    savedData?.personal || {
      firstName: "John",
      lastName: "Doe",
      photo: null,
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      website: "https://johndoe.dev",
      location: "New York, USA",
      title: "Full Stack Developer",
      about:
        "Passionate software developer with 5+ years of experience building web applications. Specialized in React, TypeScript, and Node.js. Love creating intuitive user interfaces and solving complex problems.",
    }
  );

  // Education state
  const [education, setEducation] = useState(
    savedData?.education || [
      {
        id: crypto.randomUUID(),
        school: "Harvard University",
        degree: "BSc Computer Science",
        startDate: "2018-09",
        endDate: "2022-06",
        location: "Cambridge, MA",
      },
    ]
  );

  // Experience state
  const [experience, setExperience] = useState(
    savedData?.experience || [
      {
        id: crypto.randomUUID(),
        company: "Tech Corp",
        position: "Frontend Developer",
        startDate: "2022-07",
        endDate: "2024-06",
        location: "San Francisco, CA",
        description:
          "Developed responsive web applications using React and TypeScript. Collaborated with cross-functional teams to deliver high-quality user experiences.",
      },
    ]
  );

  // Certifications state
  const [certifications, setCertifications] = useState(
    savedData?.certifications || [
      {
        id: crypto.randomUUID(),
        name: "AWS Certified Developer",
        issuer: "Amazon Web Services",
        date: "2024-01",
        url: "",
      },
    ]
  );

  // Languages state
  const [languages, setLanguages] = useState(
    savedData?.languages || [
      { id: crypto.randomUUID(), language: "English", proficiency: "Native" },
      { id: crypto.randomUUID(), language: "Spanish", proficiency: "Intermediate" },
    ]
  );

  // Persist CV data to localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const dataToSave = { personal, education, experience, certifications, languages };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (e) {
      console.error("Failed to save CV data:", e);
    }
  }, [personal, education, experience, certifications, languages]);

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
          certifications={certifications}
          setCertifications={setCertifications}
          languages={languages}
          setLanguages={setLanguages}
        />

        {/* Right Side: Preview */}
        <div className="w-1/2 flex flex-col overflow-hidden">
          <div className="flex-1 p-4 overflow-y-auto">
            <div ref={!isMobile ? previewRef : null}>
              <Preview
                personal={personal}
                education={education}
                experience={experience}
                certifications={certifications}
                languages={languages}
              />
            </div>
          </div>
          <div className="flex justify-start p-3 border-t border-gray-200 bg-white shrink-0">
            <DownloadButton onClick={handleDownloadPDF} isDownloading={isDownloading} />
          </div>
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
            certifications={certifications}
            setCertifications={setCertifications}
            languages={languages}
            setLanguages={setLanguages}
          />
        ) : (
          <div className="w-full flex flex-col h-screen overflow-hidden">
            <div className="flex-1 p-4 overflow-y-auto">
              <div ref={isMobile ? previewRef : null}>
                <Preview
                  personal={personal}
                  education={education}
                  experience={experience}
                  certifications={certifications}
                  languages={languages}
                />
              </div>
            </div>
            <div className="flex justify-start p-3 border-t border-gray-200 bg-white shrink-0">
              <DownloadButton onClick={handleDownloadPDF} isDownloading={isDownloading} />
            </div>
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
