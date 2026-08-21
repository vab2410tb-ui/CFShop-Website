import { X, LockKeyhole, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore, useTotalItems, useTotalPrice } from "@/store/cart-store";
import Image from "next/image";


type ShoppingProps = {
    cartOpen: boolean;
    onClose: (value: boolean) => void
}

export const CartDrawer = ( {cartOpen, onClose}:ShoppingProps ) => {
    const items = useCartStore((state) => state.items);
    const incrementItems = useCartStore((state) => state.incrementItem)
    const decrementItems = useCartStore((state) => state.decrementItem)
    const removeItems = useCartStore((state) => state.removeItem)
    
    const totalItems = useTotalItems();
    const totalPrice = useTotalPrice();

    const CartContent = (
        <>
            <div className="flex flex-col justify-around m-[40px] pb-1 bg-white h-auto">
                {/* Header Cart */}
                <div>
                    <div className="flex justify-between items-center pb-[32px]">
                        <div className="text-[20px] flex gap-2 items-center">
                            Cart
                            <div className="flex w-[25px] h-[25px]  items-center justify-center rounded-full bg-black text-[12px] text-white">
                                {totalItems}
                            </div>
                        </div>
                        <Button 
                            onClick={()=>onClose(false)}
                            variant="ghost"
                        >
                            <X/>
                        </Button>
                    </div>
                    {/* Body Cart */}
                    <div className="flex flex-col flex-1 gap-5 max-h-[200px] overflow-y-auto pr-2 mb:min-h-[600px]">
                        {items.length === 0 ? (
                            <p>Your cart is empty</p>
                        ) : (
                            items.map((item) => (
                                <div key={`${item.id}-${item.color}`} className="flex justify-between h-[auto]">
                                    <div className="flex gap-5">
                                        <div className="relative w-[96px] h-[96px] md:w-[128px] md:h-[128px] rounded-[10px]">
                                            <Image 
                                                src={item.image || "/placeholder.png"} 
                                                alt={item.name} 
                                                fill
                                                priority={Boolean(item.image)}
                                                className="object-contain"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <h3 className="text-[14px] text-[#333333B3]">{item.name}</h3>
                                            <span>Color: {item.color}</span>
                                            <p className="text-[14px] text-[#333333B3]">{(item.price || 0).toLocaleString("vi-VN")} đ</p>
                                            {item.quantity >= item.stock && (
                                            <p className="mt-1 text-[14px] text-red-500">
                                                Only {item.quantity} item(s) added due to stock availability.
                                            </p>
                                        )}
                                        </div>
                                        
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex gap-2 items-center">
                                            <Button 
                                                disabled={item.quantity <= 1}
                                                onClick={() => decrementItems(item.id, item.color)}
                                                className="w-7 h-8"
                                            >
                                                <Minus className="w-5 h-5"/>
                                            </Button>
                                            
                                            <div>
                                                <p className="border-[1px] px-5 py-2 rounded-[10px]">{item.quantity}</p>
                                            </div>
                                            <Button 
                                                disabled={item.quantity >= item.stock}
                                                onClick={() => incrementItems(item)}
                                                className="w-7 h-8"
                                            >
                                                <Plus className="w-5 h-5"/>
                                            </Button>
                                        </div>
                                        <Button 
                                            variant="ghost"
                                            onClick={()=>removeItems(item.id, item.color)}
                                            className="bg-white text-[#333]  hover:text-gray-400 transform ease-in-out"
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                    
                                </div>
                            ))
                        )}
                    </div>
                </div>
                {/* Footer Cart */}
                <div className="border-t-1 ">
                    <div className=" flex flex-col gap-10 mt-[24px] mb-[40px]">
                        <div className=" flex justify-between font-bold mb:text-[20px]">
                            <span>Total:</span>
                            {(Number(totalPrice) || 0).toLocaleString("vi-VN")} đ
                        </div>
                        <Button className="w-full h-[50px] rounded-[20px] text-[16px] font-bold">
                            <LockKeyhole/>
                            Checkout
                        </Button>
                    </div>
                </div>
            </div>    
        </>
    )
    return(
        <>
            <div 
                className={`fixed inset-0 bg-black/50 z-10 ${cartOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
                onClick={() => onClose(false)}    
            />
            <div
                className={`
                    mb:hidden
                    h-[full]
                    fixed inset-0
                    z-50
                    bg-white
                    transition-transform
                    duration-500
                    ease-in-out
                    ${cartOpen ? "translate-y-0" : "-translate-y-full"}
                `}
            >
                {CartContent}
            </div>
            <div className= {`hidden mb:block fixed overflow-hidden left-auto right-[10px] top-[10px] h-[calc(100dvh-20px)] w-[650px] rounded-[10px] z-50 bg-white transition-transform duration-500 ease-in-out ${cartOpen ? "translate-x-0" : "translate-x-[110%]"} `}>
               {CartContent}
            </div>
            
        </>
    )
}