import { ShoppingBag } from "lucide-react";
import { useTotalItems } from "@/stores/cart-store";
import { useEffect, useState } from "react";

type ShoppingProps = {
    setCartOpen: (value: boolean) => void
}

const CartButton = ( {setCartOpen}:ShoppingProps ) => {
    const totalItems = useTotalItems();
    const [displayItems, setDisplayItems] = useState(totalItems)

    useEffect(() => {
        const timer = setTimeout(() => {
            setDisplayItems(totalItems)
        },1000)

        return () => clearTimeout(timer);
    }, [totalItems])
    
    return(
        <>
            <button onClick={() => setCartOpen(true)} className="relative cursor-pointer">
                <ShoppingBag/>
                {displayItems > 0 &&
                    <span className="absolute top-[-10px] right-[-10px] items-center text-white bg-black rounded-full w-[18px] h-[18px] text-[10px] font-bold">{displayItems}</span>
                    
                }
                
            </button>
        </>
    )
}

export default CartButton;