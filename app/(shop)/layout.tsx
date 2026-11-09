import Navigation  from "@/components/navigation/navigation"
import Footer from "@/components/footer/footer"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NAB Coffee | Coffee Equipment",
  description: "Modern Machines for Classic Taste",
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) { 
    return (
    <>
      <div className="z-20">
        <Navigation  />
      </div>
      <main className="mt-22.5 z-10">{children}</main>
      <Footer/>
    </>
  );

}