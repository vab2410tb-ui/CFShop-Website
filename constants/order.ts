export const paymentMethodLabel = {
    COD: "Pay on delivery (COD)",
    ZALOPAY: "ZaloPay",
    VNPAY: "VNPay",
};

export const paymentStatusContent = {
    UNPAID: {
        title: "Payment pending",
        description: "Your payment has not been completed.",
    },

    PAID: {
        title: "Payment successful",
        description: "Your payment has been received.",
    },

    FAILED: {
        title: "Payment canceled",
        description: "You were not charged.",
    },

    REFUNDED: {
        title: "Payment refunded",
        description: "Your payment has been refunded.",
    },
};

export const orderStatusContent = {
    PENDING: {
        title: "Order placed",
        description: "Your order has been received.",
    },

    PROCESSING: {
        title: "Processing",
        description: "Your order is being prepared.",
    },

    SHIPPED: {
        title: "Shipped",
        description: "Your order is on the way.",
    },

    DELIVERED: {
        title: "Delivered",
        description: "Your order has been delivered.",
    },

    CANCELLED: {
        title: "Canceled",
        description: "Your order was canceled.",
    },
};