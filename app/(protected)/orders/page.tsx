
import { getOrdersByUserId } from "@/data/order"
import { currentUser } from "@/lib/auth/auth";
import { OrderList } from "@/app/(protected)/_components/orders/order-list";

const OrdersPage = async () => {
    const user = await currentUser()
    if(!user) {
        return null;
    }

    const orders = await getOrdersByUserId(user.id)

    return (
        <div className="mx-[20px] mx:m-auto mt-[72px] mb-[92px] w-full max-w-[660px]">
            <OrderList orders={orders} />
        </div>
    );
};
 
export default OrdersPage;