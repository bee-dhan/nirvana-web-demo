import { Link } from "react-router";
import  { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { useCartActions } from "@/hooks/useCartActions";

export default function Cart() {
    const { items, getTotalItems, getFormattedTotal, updateItemQuantity, removeItem } = useCartActions();
	const totalItems = getTotalItems();
    
    return 	<Sheet>
    <SheetTrigger asChild>
        <Button size="icon" variant="ghost" className="flex items-center gap-1 relative">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
            </svg>
            {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                </span>
            )}
        </Button>
    </SheetTrigger>
    <SheetContent side="right" className="w-[350px] sm:w-[450px]">
        <SheetHeader>
            <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        <div className="mt-8 p-4">
            {items.length === 0 ? (
                <p className="text-center text-gray-500">Your cart is empty</p>
            ) : (
                <div className="flex flex-col gap-6">
                    {items.map((item) => (
                        <div key={item.id} className="flex gap-4">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-20 h-20 object-cover rounded"
                            />
                            <div className="flex-1">
                                <h3 className="font-medium">{item.name}</h3>
                                <p className="text-sm text-gray-500">
                                    ${item.price.toFixed(2)}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                                    >
                                        <span className="material-symbols-outlined">remove</span>
                                    </Button>
                                    <span className="w-8 text-center">{item.quantity}</span>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                                    >
                                        <span className="material-symbols-outlined">add</span>
                                    </Button>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeItem(item.id)}
                                className="self-start"
                            >
                                <span className="material-symbols-outlined">delete</span>
                            </Button>
                        </div>
                    ))}
                    <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between items-center mb-4">
                            <span className="font-medium">Total</span>
                            <span className="font-bold">{getFormattedTotal()}</span>
                        </div>
                       <Link to="/checkout"> <Button className="w-full">Checkout</Button></Link>
                    </div>
                </div>
            )}
        </div>
    </SheetContent>
</Sheet>
}