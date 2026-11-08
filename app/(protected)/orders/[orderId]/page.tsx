import { getOrderById } from "@/data/order";
import { currentUser } from "@/lib/auth/auth";
import { OrderDetail } from "../../_components/orders/order-detail";
import { notFound } from "next/navigation";

interface OrderDetailPageProps {
    params: Promise<{orderId:string}>
}

const OrderDetailPage = async ( {params}:OrderDetailPageProps) => {
    const user = await currentUser();
    
    const { orderId } = await params;

    const order = await getOrderById(user.id ,orderId)

    if (!order) {
        notFound();
    }

    return (
        <div className="w-full max-w-[640px] my-[50px] min-h-screen">
            <OrderDetail order={order} />
        </div>
    );
}

export default OrderDetailPage