
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTransition, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    X,
    LockKeyhole,
    Plus,
    Minus,
    Loader2,
    ShoppingBag,
} from "lucide-react";
import {
    useCartStore,
    useTotalItems,
    useTotalPrice,
} from "@/stores/cart-store";

type ShoppingProps = {
    cartOpen: boolean;
    onClose: (value: boolean) => void;
};

const formatPrice = (price: number) => {
    return `${(Number(price) || 0).toLocaleString("vi-VN")} đ`;
};

export const CartDrawer = ({
    cartOpen,
    onClose,
}: ShoppingProps) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const items = useCartStore((state) => state.items);
    const incrementItem = useCartStore(
        (state) => state.incrementItem
    );
    const decrementItem = useCartStore(
        (state) => state.decrementItem
    );
    const removeItem = useCartStore(
        (state) => state.removeItem
    );

    const totalItems = useTotalItems();

    const totalPrice = useTotalPrice();

    useEffect(() => {
        if (!cartOpen) return;

        const originalOverflow = document.body.style.overflow;

        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, [cartOpen]);

    /* Checkout */
    const handleCheckout = () => {
        if (isPending || items.length === 0) return;
        
        onClose(false);

        startTransition(() => {
            router.push("/pages/order");
        });
    };

    return (
        <>
            {/* OVERLAY */}
            <div
                aria-hidden={!cartOpen}
                onClick={() => onClose(false)}
                className={`
                    fixed inset-0 z-40
                    bg-black/50
                    transition-opacity duration-300
                    ${
                        cartOpen
                            ? "visible opacity-100"
                            : "invisible opacity-0"
                    }
                `}
            />

            {/* DRAWER */}
            <aside
                role="dialog"
                aria-modal="true"
                aria-label="Shopping cart"
                className={`
                    fixed z-50
                    flex flex-col
                    overflow-hidden
                    bg-white

                    /* Mobile */
                    inset-0
                    rounded-none
                    transition-transform duration-300 ease-out

                    ${
                        cartOpen
                            ? "translate-y-0"
                            : "-translate-y-full"
                    }

                    /* Desktop */
                    mb:left-auto
                    mb:right-[10px]
                    mb:top-[10px]
                    mb:bottom-[10px]
                    mb:w-[650px]
                    mb:rounded-xl
                    mb:shadow-2xl
                    mb:translate-y-0

                    ${
                        cartOpen
                            ? "mb:translate-x-0"
                            : "mb:translate-x-[110%]"
                    }
                `}
            >
                {/* HEADER */}
                <header className="flex shrink-0 items-center justify-between border-b px-5 py-4 mb:px-6">
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg font-semibold text-neutral-900">
                            Cart
                        </h2>

                        <span
                            className="
                                flex h-6 min-w-6
                                items-center justify-center
                                rounded-full
                                bg-black
                                px-1.5
                                text-xs
                                font-medium
                                text-white
                            "
                        >
                            {totalItems}
                        </span>
                    </div>

                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => onClose(false)}
                        aria-label="Close shopping cart"
                        className="rounded-full"
                    >
                        <X className="h-5 w-5 cursor-pointer" />
                    </Button>
                </header>

                {/* Body Cart */}
                <div className="min-h-0 flex-1 overflow-y-auto">
                    {items.length === 0 ? (
                        <EmptyCart />
                    ) : (
                        <div className="flex flex-col gap-5 px-5 py-5 mb:px-6">
                            {items.map((item) => {
                                const isMaxStock =
                                    item.quantity >= item.stock;

                                const hasColor =
                                    Boolean(item.color) &&
                                    item.color !== "Default";

                                return (
                                    <div
                                        key={`${item.id}-${item.color || "default"}`}
                                        className="
                                            flex
                                            gap-3
                                            border-b
                                            pb-5
                                            last:border-b-0
                                            last:pb-0
                                            mb:gap-4
                                        "
                                    >
                                        {/* PRODUCT IMAGE */}
                                        <div
                                            className="
                                                relative
                                                h-24
                                                w-24
                                                shrink-0
                                                overflow-hidden
                                                rounded-xl
                                                bg-neutral-100
                                                mb:h-28
                                                mb:w-28
                                            "
                                        >
                                            <Image
                                                src={
                                                    item.image ||
                                                    "/placeholder.png"
                                                }
                                                alt={item.name}
                                                fill
                                                sizes="
                                                    (max-width: 767px) 96px,
                                                    112px
                                                "
                                                className="object-contain"
                                            />
                                        </div>

                                        {/* PRODUCT INFO */}
                                        <div className="flex min-w-0 flex-1 flex-col">
                                            <div className="flex items-start justify-between gap-2">
                                                <h3
                                                    className="
                                                        line-clamp-2
                                                        text-sm
                                                        font-medium
                                                        leading-5
                                                        text-neutral-900
                                                    "
                                                >
                                                    {item.name}
                                                </h3>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeItem(
                                                            item.id,
                                                            item.color
                                                        )
                                                    }
                                                    aria-label={`Remove ${item.name}`}
                                                    className="
                                                        shrink-0
                                                        text-neutral-400
                                                        transition-colors
                                                        hover:text-red-500
                                                    "
                                                >
                                                    <X className="h-4 w-4 cursor-pointer" />
                                                </button>
                                            </div>

                                            {hasColor && (
                                                <p className="mt-1 text-xs text-neutral-500">
                                                    Color:{" "}
                                                    <span className="text-neutral-700">
                                                        {item.color}
                                                    </span>
                                                </p>
                                            )}

                                            <p className="mt-1 text-sm font-medium text-neutral-700">
                                                {formatPrice(item.price)}
                                            </p>

                                            {/* QUANTITY */}
                                            <div className="mt-auto flex items-end justify-between gap-3 pt-3">
                                                <div
                                                    className="
                                                        flex
                                                        h-8
                                                        items-center
                                                        overflow-hidden
                                                        rounded-lg
                                                        border
                                                        border-neutral-200
                                                    "
                                                >
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        disabled={
                                                            item.quantity <=
                                                            1
                                                        }
                                                        onClick={() =>
                                                            decrementItem(
                                                                item.id,
                                                                item.color
                                                            )
                                                        }
                                                        aria-label="Decrease quantity"
                                                        className="
                                                            h-8
                                                            w-8
                                                            rounded-none
                                                            hover:bg-neutral-100
                                                        "
                                                    >
                                                        <Minus className="h-3.5 w-3.5" />
                                                    </Button>

                                                    <span
                                                        className="
                                                            flex
                                                            h-full
                                                            min-w-8
                                                            items-center
                                                            justify-center
                                                            border-x
                                                            border-neutral-200
                                                            px-2
                                                            text-sm
                                                            font-medium
                                                        "
                                                    >
                                                        {item.quantity}
                                                    </span>

                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        disabled={
                                                            isMaxStock
                                                        }
                                                        onClick={() =>
                                                            incrementItem(
                                                                item
                                                            )
                                                        }
                                                        aria-label="Increase quantity"
                                                        className="
                                                            h-8
                                                            w-8
                                                            rounded-none
                                                            hover:bg-neutral-100
                                                        "
                                                    >
                                                        <Plus className="h-3.5 w-3.5" />
                                                    </Button>
                                                </div>

                                            </div>

                                            {/* stock message */}
                                            {isMaxStock && (
                                                <p className="mt-2 text-xs text-red-500">
                                                    Maximum available stock
                                                    reached.
                                                </p>
                                            )}

                                            <span className="text-sm font-semibold text-neutral-900 text-end">
                                                {formatPrice(
                                                    item.price *
                                                        item.quantity
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Footer Cart */}
                {items.length > 0 && (
                    <footer
                        className="
                            shrink-0
                            border-t
                            bg-white
                            px-5
                            py-5
                            mb:px-6
                            mb:py-6
                        "
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-base font-medium text-neutral-600">
                                Total
                            </span>

                            <span className="text-lg font-bold text-neutral-900">
                                {formatPrice(totalPrice)}
                            </span>
                        </div>

                        <Button
                            type="button"
                            onClick={handleCheckout}
                            disabled={
                                isPending ||
                                status === "loading"
                            }
                            className="
                                mt-5
                                h-12
                                w-full
                                rounded-xl
                                bg-black
                                text-base
                                font-semibold
                                text-white
                                hover:bg-neutral-900
                            "
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <LockKeyhole className="mr-2 h-4 w-4" />
                                    Checkout
                                </>
                            )}
                        </Button>

                        <p className="mt-3 text-center text-xs text-neutral-400">
                            Secure checkout · Your information is protected
                        </p>
                    </footer>
                )}
            </aside>
        </>
    );
};

// Empty Cart
const EmptyCart = () => {
    return (
        <div className="flex h-full min-h-[400px] flex-col items-center justify-center px-6 text-center">
            <div
                className="
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-full
                    bg-neutral-100
                "
            >
                <ShoppingBag className="h-7 w-7 text-neutral-400" />
            </div>

            <h3 className="mt-5 text-base font-semibold text-neutral-900">
                Your cart is empty
            </h3>
        </div>
    );
};

