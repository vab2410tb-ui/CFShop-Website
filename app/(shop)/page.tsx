import  Category  from "@/components/home/category";
import  Expolore  from "@/components/home/expolore";
import  HeroBanner  from "@/components/home/hero-banner";
import  ProductCard  from "@/components/home/recommend-products";

const HomePage = () => { 
  return (
    <div className="w-full relative overflow-x-hidden">
      <HeroBanner/>
      <Category/>
      <ProductCard/>
      <Expolore/>
    </div>
  );
}

export default HomePage;