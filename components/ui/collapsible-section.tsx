import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export interface CollapsibleSectionProps {
  id: string;
  title: string;
  isOpen: boolean;
  onToggle: (id: string) => void;
  children: React.ReactNode;
}

export const CollapsibleSection = ({ 
  id, 
  title, 
  isOpen, 
  onToggle, 
  children 
}: CollapsibleSectionProps) => {
  return (
    <div className="w-full">
      <Button
        variant="ghost"
        onClick={() => onToggle(id)}
        className="w-full justify-between h-15 rounded-[15px] bg-[#F2F2F2] px-5 hover:bg-[#F2F2F2] transition-none"
      >
        <h3 className="text-[16px] lg:text-[20px] text-[#333333]">{title}</h3>
        <ChevronDown
          className={`mr-4 transition-transform duration-300 text-black ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </Button>

      <div
        className={`grid mt-2.5 bg-[#F2F2F2] transition-[grid-template-rows] duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
};