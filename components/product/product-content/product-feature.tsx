import { Product } from "@/generated/prisma/client";
import { CollapsibleSection } from "@/components/ui/collapsible-section"; 
import { Installation, PickUpTime, TechSpecsTable, Policy } from "@/components/product/product-content/tech-specs-table"; 

interface Props {
  product: Product;
  openFeature: string | null;
  setOpenFeature: React.Dispatch<React.SetStateAction<string | null>>;
}

const ProductFeature = ({ product, openFeature, setOpenFeature }: Props) => {
  const handleOpenFeature = (id: string) => {
    setOpenFeature((prev) => (prev === id ? null : id));
  };

  const sections = [
    {
      id: "technical",
      title: "Technical Specifications",
      content: <TechSpecsTable techSpecs={product.techSpecs} />,
    },
    {
      id: "installation",
      title: "Installation & Usage Instructions",
      content: <Installation/>,
    },
    {
      id:"pickup",
      title: "Pick-up time",
      content: <PickUpTime/>
    },
    {
      id:"policy",
      title: "Policy",
      content: <Policy/>
    },

  ];

  return (
    <div className="mt-5">
      <ul className="list-disc pl-5 text-[14px] lg:text-[16px] grid gap-2.5">
        {product.description?.productFeatures?.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>

      <div className="flex flex-col mt-5 gap-2.5">
        {sections.map((section) => (
          <CollapsibleSection
            key={section.id}
            id={section.id}
            title={section.title}
            isOpen={openFeature === section.id}
            onToggle={handleOpenFeature}
          >
            {section.content}
          </CollapsibleSection>
        ))}
      </div>
    </div>
  );
};

export default ProductFeature;