import { getOrdersByUserId } from "@/data/order";
import { OrderCard } from "./order-card";

type Orders = Awaited <ReturnType<typeof getOrdersByUserId>>

interface OrderListProps {
    orders: Orders
}

export const OrderList = ({orders}:OrderListProps) => {
    if(orders.length === 0) {
        return(
            <div>
                You don&apos;t have any orders yet.
            </div>
        )
    }
    return(
        <div className="space-y-4">
            {orders.map((order) => (
                <OrderCard
                    key={order.orderId}
                    order={order}
                />
            ))}
        </div>
    );
}