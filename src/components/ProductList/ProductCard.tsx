import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useCartActions } from "@/hooks/useCartActions";
import { Link } from "react-router";
import { Star, Plus, Minus } from "lucide-react";
import type { CartItem } from "@/context/CartContext";

interface ProductColor {
	name: string;
	class: string;
	image?: string;
	variantId?: string;
}

interface Product {
	id: string;
	name: string;
	brand?: string;
	description?: string;
	image: string;
	price: number;
	colors?: ProductColor[];
	isNewArrival?: boolean;
	bestseller?: boolean;
	rating?: number;
	reviewCount?: number;
	complimentaryGiftWrap?: boolean;
}

function ProductCard({ product }: { product: Product }) {
	const [selectedColor, setSelectedColor] = useState(0);
	const { addItemToCart, getItemQuantity, updateItemQuantity } =
		useCartActions();
	const quantity = getItemQuantity(product.id);

	const currentVariant = product.colors?.[selectedColor];
	const currentImage = currentVariant?.image || product.image;
	const variantId = currentVariant?.variantId
		? parseInt(currentVariant.variantId, 10)
		: product.id;
	const productUrl = `/product/${product.id}?variant=${variantId}`;

	const handleAddToCart = () => {
		const cartItem: CartItem = {
			id: variantId,
			name: `${product.name}${
				currentVariant ? ` - ${currentVariant.name}` : ""
			}`,
			price: product.price,
			image: currentImage,
			quantity: 1,
			variant: {
				color: currentVariant?.name || "",
				size: "",
			},
		};
		addItemToCart(cartItem);
	};

	return (
		<Card className="p-4 border-none sm:p-6">
			<div className="relative">
				<Link to={productUrl}>
					<img
						src={currentImage}
						alt={`${product.name} - ${currentVariant?.name || ""}`}
						className="aspect-square rounded-lg bg-gray-200 object-cover group-hover:opacity-75 w-full"
					/>
				</Link>
				{product.isNewArrival && (
					<span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
						New Arrival
					</span>
				)}
				{product.bestseller && (
					<span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
						Bestseller
					</span>
				)}
			</div>

			<div className="pt-10 pb-4 text-center">
				{/* Color Swatches */}
				{product.colors && product.colors.length > 0 && (
					<div className="flex items-center justify-center gap-2 mb-4">
						{product.colors.slice(0, 5).map((color, idx) => (
							<Button
								key={color.name}
								size="icon"
								variant={selectedColor === idx ? "default" : "outline"}
								className={`border-2 ${
									selectedColor === idx ? "border-blue-600" : "border-gray-200"
								} w-8 h-8 rounded-full flex items-center justify-center p-0`}
								onClick={() => setSelectedColor(idx)}
								aria-label={color.name}
							>
								<span
									className={`block w-5 h-5 rounded-full ${color.class}`}
									title={color.name}
								></span>
							</Button>
						))}
						{product.colors.length > 5 && (
							<span className="ml-2 text-gray-500 text-sm font-medium">
								+{product.colors.length - 5}
							</span>
						)}
					</div>
				)}

				{/* Product Info */}
				{product.brand && (
					<h3 className="text-sm text-gray-500 mb-1 font-medium">
						{product.brand}
					</h3>
				)}
				<h3 className="text-sm font-medium text-gray-900">
					<Link to={productUrl}>
						<span className="absolute inset-0" />
						{product.name}
						{currentVariant && ` - ${currentVariant.name}`}
					</Link>
				</h3>

				{product.rating && product.reviewCount && (
					<div className="mt-3 flex flex-col items-center">
						<p className="sr-only">{product.rating} out of 5 stars</p>
						<div className="flex items-center">
							{[0, 1, 2, 3, 4].map((idx) => (
								<Star
									key={idx}
									className={`h-5 w-5 shrink-0 ${
										product.rating && idx < Math.floor(product.rating)
											? "text-yellow-400 fill-yellow-400"
											: "text-gray-200"
									}`}
								/>
							))}
						</div>
						<p className="mt-1 text-sm text-gray-500">
							{product.reviewCount} reviews
						</p>
					</div>
				)}

				<p className="mt-4 text-base font-medium text-gray-900">
					${product.price.toFixed(2)}
				</p>

				{/* Add to Cart Section */}
				<div className="mt-4">
					{quantity === 0 ? (
						<Button
							onClick={handleAddToCart}
							className="w-full bg-blue-600 hover:bg-blue-700 text-white"
						>
							Add to Cart
						</Button>
					) : (
						<div className="flex items-center gap-2 w-full">
							<Button
								variant="outline"
								size="icon"
								onClick={() => updateItemQuantity(variantId, quantity - 1)}
							>
								<Minus className="h-4 w-4" />
							</Button>
							<span className="flex-1 text-center font-medium">
								{quantity} in cart
							</span>
							<Button
								variant="outline"
								size="icon"
								onClick={() => updateItemQuantity(variantId, quantity + 1)}
							>
								<Plus className="h-4 w-4" />
							</Button>
						</div>
					)}
				</div>
			</div>
		</Card>
	);
}

export default ProductCard;
