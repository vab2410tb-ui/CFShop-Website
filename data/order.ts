import { prisma } from "@/lib/prisma";

export const getOrdersByUserId = async (userId: string) => {
    return prisma.order.findMany({
        where: {
            userId
        },
        select: {
            orderId: true,
            orderItems: true, 
            paymentMethod: true,
            totalPrice: true, 
            status: true,
            createdAt: true, 
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}

export const getOrderById = async (userId: string, orderId: string ) => {
    return prisma.order.findFirst({
        where: {
            userId,
            orderId,
        },
        select: {
            orderId: true,
            orderItems: true,
            shippingInfo: true, 
            paymentStatus: true,
            paymentMethod: true,
            totalPrice: true,
            status: true,
            createdAt: true,    
        }
    })
}