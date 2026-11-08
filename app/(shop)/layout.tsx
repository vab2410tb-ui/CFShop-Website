import Navigation  from "@/components/navigation/navigation"
import Footer from "@/components/footer/footer"

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