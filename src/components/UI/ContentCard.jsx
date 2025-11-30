import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const ContentCard = ({ title, icon, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-white shadow-sm transition-all">
      <div className="flex p-5 justify-between cursor-pointer" onClick={toggleOpen}>
        <div className="flex gap-4">
          {icon}
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </div>
      {isOpen && <div className="p-5">{children}</div>}
    </div>
  );
};
export default ContentCard;
