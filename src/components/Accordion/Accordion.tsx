import { useState } from "react";
import { Typography } from "../../components/Typography";

interface AccordionGroupProps {
  items: Array<{
    title: string;
    description: string;
  }>;
  allowMultiple?: boolean;
}

export const AccordionGroup = ({
  items,
  allowMultiple = false,
}: AccordionGroupProps) => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    if (allowMultiple) {
      setOpenIndexes((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index],
      );
    } else {
      setOpenIndexes((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndexes.includes(index);

        return (
          <div key={index} className="w-full">
            <div
              onClick={() => toggleItem(index)}
              className={`
                w-full rounded-2xl p-4 cursor-pointer
                transition-all duration-300 ease-in-out
                bg-white-primary 
              `}
            >
              <div className="flex items-center justify-between">
                <Typography type="body-md" className="text-brown-primary">
                  {item.title}
                </Typography>
                <svg
                  className={`w-5 h-5 text-brown-secondary transform transition-transform duration-300
                             ${isOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              <div
                className={`
                  overflow-hidden transition-all duration-300 ease-in-out
                  ${isOpen ? "opacity-100 mt-4" : "max-h-0 opacity-0"}
                `}
              >
                <Typography type="body-md" className="text-brown-secondary whitespace-pre-line">
                  {item.description}
                </Typography>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
