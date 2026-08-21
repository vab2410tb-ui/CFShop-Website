import { formatText } from "@/lib/utils";
import { TechSpecs } from "@/generated/prisma/client";

interface TechSpecsTableProps {
  techSpecs: TechSpecs; 
}

// TechSpecsTable
export const TechSpecsTable = ({ techSpecs }: TechSpecsTableProps) => {
  if (!techSpecs) return null;

  return (
    <ul className="grid grid-cols-2">
      {Object.entries(techSpecs).map(([key, value]) => {
        if (
          value === null ||
          value === undefined ||
          (typeof value === "string" && value.trim() === "")
        ) {
          return null;
        }

        return (
          <li key={key} className="contents">
            <span className="flex items-center border-b border-r border-white border-2 pl-5 py-3">
              {formatText(key)}
            </span>
            <span className="flex items-center border-b border-white border-2 pl-5 py-3">
              {typeof value === "boolean" ? (value ? "Yes" : "No") : String(value)}
            </span>
          </li>
        );
      })}
    </ul>
  );
};

// Installation & Usage Instructions
export const Installation = () => {
    return (
        <div className="pl-5 py-5" >
            <ul className="list-disc px-5 text-[14px] lg:text-[16px] grid gap-2.5 space-y-2">
                <li>
                    Download the product&#39;s user and installation manual file here - Download.
                </li>
                <li>
                    If you still have questions about the product, please visit Help Desk for more details.
                </li>
            </ul>
        </div>
    );
}

// Pick up time
export const PickUpTime = () => {
    return (
        <div className="pl-5 py-5" >
            <ul className="list-disc px-5 text-[14px] lg:text-[16px] grid gap-2.5 space-y-2">
                <li>
                    Inner City of Hanoi & Ho Chi Minh City: Delivery in 1-2 working days.
                </li>
                <li>
                    Suburban and other provinces: Delivery in 3-5 working days.
                </li>
                <li>
                    Other information: Please contact us or visit Delivery Policy.
                </li>
            </ul>
        </div>
    );
}

// Policy
export const Policy = () => {
    return (
        <div className="pl-5 py-5" >
            <ul className="list-disc px-5 text-[14px] lg:text-[16px] grid gap-2.5 space-y-2">
                <li>
                    Allow customers to exchange/return within 3 days of receipt if they are not satisfied or the product is not as expected.
                </li>
                <li>
                    Depending on the applicable conditions, guests can refund or exchange to another product at no cost.
                </li>
                <li>
                    Please visit NABcoffeeshop. Easy for more details.
                </li>
            </ul>
        </div>
    );
}