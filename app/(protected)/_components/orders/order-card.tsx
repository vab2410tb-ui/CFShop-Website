import Link from "next/link";
import { getOrdersByUserId } from "@/data/order";
import Image from "next/image";

type Orders = Awaited<
    ReturnType<typeof getOrdersByUserId>
>;

type Order = Orders[number];

interface OrderCardProps {
    order: Order;
}

export const OrderCard = ({
    order,
}: OrderCardProps) => {
    return (
        <Link
            href={`/orders/${order.orderId}`}
            className="block rounded-[20px] shadow-lg border p-5 bg-white group"
        >
            <div className="flex gap-5">
                {order.orderItems.map((item) => (
                   <div key={item.productId} >
                     <Image
                        src={item.image}
                        width={145}
                        height={145}
                        alt={item.name}
                    />
                   </div>
                ))}
            </div>

            <div className="mt-4">
                <p className="font-bold">{order.status}</p>
                <div className="flex justify-between">
                    <div className="flex flex-col lg:flex-row gap-1 text-[14px]">
                        <p className="break-all">{order.orderId}</p>
                        <p className="hidden lg:block">·</p>
                        <p>{order.totalPrice.toLocaleString("vi-VN")}₫ VND</p>
                    </div>
                    <span 
                        className="
                            relative cursor-pointer text-[#6f7eff] whitespace-nowrap text-[12px] md:text-[14px]
                            lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 
                            after:absolute after:left-0 after:bottom-0
                            after:h-[1px] after:w-0
                            after:bg-[#6f7eff]
                            after:transition-all after:duration-400
                            lt:group-hover:after:w-full    
                        ">
                            View detail
                    </span>
                </div>
            </div>
        </Link>
    );
};