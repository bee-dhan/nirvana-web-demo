import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

interface OrderSummaryProps {
	className?: string;
}

export function OrderSummary({ className }: OrderSummaryProps) {
	const { state, updateQuantity, removeItem } = useCart();
	const [discountCode, setDiscountCode] = useState("");

	const handleQuantityChange = (id: number, change: number) => {
		const item = state.items.find((item) => item.id === id);
		if (item) {
			const newQuantity = Math.max(1, item.quantity + change);
			updateQuantity(id, newQuantity);
		}
	};

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(price);
	};

	return (
		<div className={cn("flex flex-col h-full", className)}>
			<div className="px-6 py-4 border-b">
				<h2 className="text-lg font-semibold">Order Summary</h2>
			</div>
			<ScrollArea className="flex-1 px-6">
				{state.items.map((item) => (
					<div key={item.id} className="flex py-6 space-x-4">
						<img
							src={item.image}
							alt={item.name}
							className="h-24 w-24 flex-none rounded-md object-cover object-center"
						/>
						<div className="flex-1 flex flex-col">
							<div className="flex justify-between">
								<div>
									<h3 className="text-sm font-medium">{item.name}</h3>
									<p className="mt-1 text-sm text-gray-500">
										{item.variant.color}
									</p>
									<p className="mt-1 text-sm text-gray-500">
										Size {item.variant.size}
									</p>
								</div>
								<p className="text-sm font-medium">
									{formatPrice(item.price * item.quantity)}
								</p>
							</div>
							<div className="flex items-center justify-between mt-4">
								<div className="flex items-center space-x-2">
									<Button
										variant="outline"
										size="icon"
										className="h-8 w-8"
										onClick={() => handleQuantityChange(+item.id, -1)}
									>
										-
									</Button>
									<span className="text-sm">{item.quantity}</span>
									<Button
										variant="outline"
										size="icon"
										className="h-8 w-8"
										onClick={() => handleQuantityChange(+item.id, 1)}
									>
										+
									</Button>
								</div>
								<Button
									variant="ghost"
									size="sm"
									className="text-red-600"
									onClick={() => removeItem(item.id)}
								>
									Remove
								</Button>
							</div>
						</div>
					</div>
				))}
			</ScrollArea>
			<div className="p-6 border-t space-y-4">
				<div className="space-y-1">
					<label htmlFor="discount" className="text-sm font-medium">
						Discount code
					</label>
					<div className="flex space-x-2">
						<Input
							id="discount"
							placeholder="Enter code"
							value={discountCode}
							onChange={(e) => setDiscountCode(e.target.value)}
						/>
						<Button variant="secondary">Apply</Button>
					</div>
				</div>
				<Separator />
				<div className="space-y-2">
					<div className="flex justify-between text-sm">
						<span>Subtotal</span>
						<span>{formatPrice(state.subtotal)}</span>
					</div>
					<div className="flex justify-between text-sm">
						<span>Shipping</span>
						<span>{formatPrice(state.shipping)}</span>
					</div>
					<div className="flex justify-between text-sm">
						<span>Tax</span>
						<span>{formatPrice(state.tax)}</span>
					</div>
					<Separator />
					<div className="flex justify-between font-medium">
						<span>Total</span>
						<span>{formatPrice(state.total)}</span>
					</div>
				</div>
			</div>
		</div>
	);
}
