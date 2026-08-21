import { getProductBySlug } from "@/lib/db/product";
import { ProductDetail } from "@/components/product/product-detail";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

const ProductsDetails = async ({params}:ProductPageProps) => {
    const { slug } = await params;
    const products = await getProductBySlug({slug})

    return (
        <div className="px-[max(20px,calc(50%-700px))] my-[64px]">
            <ProductDetail product={products}/>
        </div>
    )
}

export default ProductsDetails;