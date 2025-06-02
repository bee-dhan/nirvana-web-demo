import ProductCard from "./ProductCard";

const sampleProducts = [
	{
		id: "1",
		name: "Classic Polo Shirt",
		brand: "Polo Ralph Lauren",
		description: "Men's Classic Fit Soft Cotton Polo",
		image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?fm=jpg&q=60&w=3000",
		price: 110.0,
		colors: [
			{ 
				name: "Navy", 
				class: "bg-blue-900",
				image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?fm=jpg&q=60&w=3000",
				variantId: "1-navy"
			},
			{ 
				name: "White", 
				class: "bg-white border border-gray-300",
				image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?fm=jpg&q=60&w=3000",
				variantId: "1-white"
			},
			{ 
				name: "Gray", 
				class: "bg-gray-500",
				image: "https://images.unsplash.com/photo-1578681994506-b8f463449011?fm=jpg&q=60&w=3000",
				variantId: "1-gray"
			},
			{ 
				name: "Black", 
				class: "bg-black",
				image: "https://images.unsplash.com/photo-1583743814966-892bacefd3f2?fm=jpg&q=60&w=3000",
				variantId: "1-black"
			},
			{ 
				name: "Red", 
				class: "bg-red-600",
				image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?fm=jpg&q=60&w=3000",
				variantId: "1-red"
			},
		],
		isNewArrival: true,
		rating: 4.5,
		reviewCount: 512,
		complimentaryGiftWrap: true,
	},
	{
		id: "2",
		name: "Women's V-Neck Scrub Top",
		brand: "Ecoflex",
		description: "Comfortable and durable medical scrub top",
		image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=3270",
		price: 39.99,
		colors: [
			{ 
				name: "Navy", 
				class: "bg-blue-800",
				image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=3270",
				variantId: "2-navy"
			},
			{ 
				name: "Maroon", 
				class: "bg-red-800",
				image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=3270",
				variantId: "2-maroon"
			},
			{ 
				name: "Gray", 
				class: "bg-gray-600",
				image: "https://images.unsplash.com/photo-1576009976088-c0bc6fa6c833?q=80&w=3270",
				variantId: "2-gray"
			},
			{ 
				name: "Black", 
				class: "bg-black",
				image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?q=80&w=3270",
				variantId: "2-black"
			},
			{ 
				name: "Teal", 
				class: "bg-teal-500",
				image: "https://images.unsplash.com/photo-1578681994506-b8f463449011?q=80&w=3270",
				variantId: "2-teal"
			},
		],
		isNewArrival: false,
		bestseller: true,
		rating: 4.8,
		reviewCount: 1024,
	},
	{
		id: "3",
		name: "Modern Hoodie",
		description: "Unisex Cotton Blend Hoodie",
		image: "https://images.unsplash.com/photo-1554342321-0776d282ceac?fm=jpg&q=60&w=3000",
		price: 75.0,
		colors: [
			{ 
				name: "Charcoal", 
				class: "bg-gray-700",
				image: "https://images.unsplash.com/photo-1554342321-0776d282ceac?fm=jpg&q=60&w=3000",
				variantId: "3-charcoal"
			},
			{ 
				name: "Olive", 
				class: "bg-green-700",
				image: "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?fm=jpg&q=60&w=3000",
				variantId: "3-olive"
			},
			{ 
				name: "Beige", 
				class: "bg-yellow-200",
				image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?fm=jpg&q=60&w=3000",
				variantId: "3-beige"
			},
		],
		isNewArrival: true,
	},
];

function ProductList() {
	return (
		<div className="bg-white py-12">
			<div className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8">
				<h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
					Featured Products
				</h2>

				<div className="-mx-px gap-2  grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
					{sampleProducts.map((product) => (
					
							<ProductCard product={product} key={product.id} />
						
					))}
				</div>
			</div>
		</div>
	);
}

export default ProductList