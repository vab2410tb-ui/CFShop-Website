import { getOrderById } from "@/data/order";
import Image from "next/image";
import { formatText } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { paymentMethodLabel, paymentStatusContent, orderStatusContent } from "@/constants/order";
type Order = NonNullable<
    Awaited<ReturnType<typeof getOrderById>>
>;

interface OrderDetailProps {
    order: Order;

}


export const OrderDetail = ( {order}: OrderDetailProps ) => {
    
    const shippingFee: number  = 0;
    const subTotalPrice = order.totalPrice - shippingFee;
    const totalItem = order.orderItems.reduce(
        (total, item) => total + item.quantity, 0
    );
    
    const paymentContent = paymentStatusContent[order.paymentStatus];
    const statusContent = orderStatusContent[order.status];

    return(
        <div className="flex flex-col gap-5 p-[16px]">
            {/* Btn back */}
            <div className=" flex gap-2">
                <Link href="/orders">
                    <ArrowLeft/>
                </Link>
                <div className="flex flex-col">
                    <span>Order {order.orderId}</span>
                    <span className="text-sm text-gray-500">
                        Confrimed on &nbsp; 
                        {order.createdAt.toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                        })}
                    </span>
                </div>
            </div>

            <div className="bg-white pt-2.5 pb-4 px-4 flex flex-col gap-2 border rounded-[20px] shadow-sm h-full">
                {paymentContent  && (
                    <div>
                        <h3 className="text-black text-[14px] font-bold">{paymentContent.title}</h3>
                        <p className="text-[14px] text-[#0000008F]">{paymentContent.description}</p>
                    </div>
                )}
            </div>

            <div className="bg-white pt-2.5 pb-4 px-4 flex flex-col gap-2 border rounded-[20px] shadow-sm h-full">
                 {statusContent  && (
                    <div>
                        <h3 className="text-black text-[14px] font-bold">{statusContent.title}</h3>
                        <p className="text-[14px] text-[#0000008F]">{statusContent.description}</p>
                    </div>
                )}
            </div>
            
            {/* Orders */}
            <div className="bg-white pt-2.5 pb-4 px-4 flex flex-col gap-2 border rounded-[20px] shadow-sm h-full">
                {order.orderItems.map((item) => (
                    <div key={item.productId} className="py-2.5">
                        <div className="flex justify-between">
                            <div className="flex gap-5 ">
                                <div className="border rounded-[15px] overflow-hidden p-[3px]">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        width={64}
                                        height={64}
                                        className="object-contain rounded-[15px]"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className="text-[14px]">{formatText(item.name)}</span>
                                    <span>x                                                                                                                                                                                                                             {item.quantity}</span>
                                </div>
                            </div>
                            <span className="text-[14px]">{item.price.toLocaleString("vi-VN")} ₫</span>
                        </div>
                    </div>
                ))}
                {/*-- Sub Total Price */}
                <div className="flex justify-between text-[14px]">
                    <span>Subtotals · {totalItem} items</span>
                    <span>{subTotalPrice.toLocaleString("vi-VN")} ₫</span>
                </div>
                  {/*-- Sub Total Price */}
                <div className="flex justify-between text-[14px]">
                    <span>Shipping fee</span>
                    <span>
                        {shippingFee === 0
                            ? "FREE"
                            : `${shippingFee.toLocaleString("vi-VN")} ₫`
                        }
                    </span>
                </div>
                {/* -- Total Price */}
                <div className="flex justify-between">
                    <span className=" text-[18px] font-bold"> Total </span>
                    <div className="flex gap-2 items-center"> 
                        <span className="text-[13px] text-[#0000008F] font-medium">VND</span>
                        <span className=" text-[18px] font-bold">{order.totalPrice.toLocaleString("vi-VN")} ₫ </span>
                    </div>
                </div>
            </div>

            {/* Customer Information */}
            <div className="bg-white flex flex-col gap-2 border rounded-[20px] shadow-sm h-full text-[14px]">
                <div className="grid grid-cols-[max-content_1fr] gap-x-[40px]">
                    <div className="col-span-full grid grid-cols-subgrid p-[16px]">
                        <span className="text-[#0000008F]">Contact</span>
                        <span className="text-black">
                            {order.shippingInfo.email}
                        </span>
                    </div>

                    <div className="col-span-full grid grid-cols-subgrid p-[16px]">
                        <span className="text-[#0000008F]">Shipping to</span>
                        <div className="flex flex-col">
                            <span>{order.shippingInfo.fullName}</span>
                            <span>{order.shippingInfo.address}</span>
                            <span>{order.shippingInfo.ward}</span>
                            <span>{order.shippingInfo.province}</span>
                            <span>{order.shippingInfo.phone}</span>
                        </div>
                    </div>

                    <div className="col-span-full grid grid-cols-subgrid p-[16px]">
                        <span className="text-[#0000008F]">Method</span>
                        <span className="text-black">
                            Standard Shipping (Ship in 24h)
                        </span>
                    </div>

                    <div className="col-span-full grid grid-cols-subgrid p-[16px]">
                        <span className="text-[#0000008F]">Payment</span>
                        <div className="flex flex-col">
                            <span className="text-black">
                                {paymentMethodLabel[order.paymentMethod]}
                            </span>

                            <span className="text-[#0000008F]">
                                {order.totalPrice.toLocaleString("vi-VN")} ₫ VND
                                &nbsp; · &nbsp;
                                {order.createdAt.toLocaleDateString("en-GB", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                })}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 