// pages/CollectionPage.tsx
import { useParams, Link } from "react-router";
import { useState } from "react";
// data/products.ts


const products = [
    {
      "id": "1",
      "name": "Essential Crewneck T-Shirt",
      "brand": "Modern Basics",
      "description": "A lightweight and breathable cotton t-shirt perfect for everyday wear.",
      "image": "https://images.unsplash.com/photo-1602810317283-957c9fd944f1?auto=format&fit=crop&w=500&q=80",
      "price": 19.99,
      "colors": [
        {
          "name": "White",
          "class": "bg-white",
          "image": "https://images.unsplash.com/photo-1585386959984-a41552261f5c?auto=format&fit=crop&w=500&q=80"
        },
        {
          "name": "Black",
          "class": "bg-black",
          "image": "https://images.unsplash.com/photo-1578685720588-1b462a4b0156?auto=format&fit=crop&w=500&q=80"
        }
      ],
      "isNewArrival": true,
      "bestseller": false,
      "rating": 4.5,
      "reviewCount": 87,
      "complimentaryGiftWrap": false,
      "link": "/products/essential-crewneck-tshirt"
    },
    {
      "id": "2",
      "name": "EcoFlex Joggers",
      "brand": "GreenFit",
      "description": "Eco-friendly joggers made with recycled materials. Slim fit and stretchable.",
      "image": "https://images.unsplash.com/photo-1618354691373-9d91e9ac3b0c?auto=format&fit=crop&w=500&q=80",
      "price": 39.99,
      "colors": [
        {
          "name": "Olive",
          "class": "bg-green-700",
          "image": "https://images.unsplash.com/photo-1627322413465-412ff3b3b253?auto=format&fit=crop&w=500&q=80"
        },
        {
          "name": "Gray",
          "class": "bg-gray-400",
          "image": "https://images.unsplash.com/photo-1598970434795-0c54fe7c0642?auto=format&fit=crop&w=500&q=80"
        },
        {
          "name": "Navy",
          "class": "bg-blue-900",
          "image": "https://images.unsplash.com/photo-1585386959984-a41552261f5c?auto=format&fit=crop&w=500&q=80"
        }
      ],
      "isNewArrival": false,
      "bestseller": true,
      "rating": 4.8,
      "reviewCount": 142,
      "complimentaryGiftWrap": true,
      "link": "/products/ecoflex-joggers"
    },
    {
      "id": "3",
      "name": "Minimalist Canvas Backpack",
      "brand": "Urban Pack",
      "description": "Durable and stylish backpack for urban commuting and weekend getaways.",
      "image": "https://images.unsplash.com/photo-1518546305927-5f7160d4dfaf?auto=format&fit=crop&w=500&q=80",
      "price": 59.95,
      "colors": [
        {
          "name": "Beige",
          "class": "bg-yellow-200",
          "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80"
        },
        {
          "name": "Charcoal",
          "class": "bg-gray-800",
          "image": "https://images.unsplash.com/photo-1592503254549-29f04a78c1f5?auto=format&fit=crop&w=500&q=80"
        }
      ],
      "isNewArrival": true,
      "bestseller": true,
      "rating": 4.2,
      "reviewCount": 56,
      "complimentaryGiftWrap": true,
      "link": "/products/minimalist-backpack"
    }
  ];

const subCategories = ["Shoes", "Current Sales", "New Arrivals"];

function CollectionPage() {
  const { category } = useParams(); // mens, womens, all
  const [filter, setFilter] = useState("All");

  const filteredProducts = products.filter(
    (p) => category === "all" || p.category === category
  );

  return (
    <div className="p-6 space-y-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500">
        <Link to="/" className="hover:underline">Home</Link>
        {" / "}
        <span className="capitalize">{category}</span>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full h-[300px] bg-cover bg-center rounded-xl shadow" style={{
        backgroundImage: `url(/images/hero-${category}.jpg)`
      }}>
        <div className="absolute bottom-4 left-6 text-white text-3xl font-bold capitalize">
          {category} Collection
        </div>
      </section>

      {/* Subcategories */}
      <div className="flex gap-4">
        {subCategories.map((sub) => (
          <button
            key={sub}
            className={`px-4 py-2 rounded-full ${
              filter === sub ? "bg-black text-white" : "bg-gray-100"
            }`}
            onClick={() => setFilter(sub)}
          >
            {sub}
          </button>
        ))}
      </div>
      <FilterComponent/>

     <ProductGrid/>
    </div>
  );

}

export default CollectionPage;
// components/ProductGrid.tsx
import { Star } from "lucide-react"; // or use any star icon (e.g. Heroicons)
import FilterComponent from "../Filters/Filter";
import ProductCard from "../ProductList/ProductCard";


function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center justify-center">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={16}
          className={i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
        />
      ))}
    </div>
  );
}

function ProductGrid() {
  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
//             <div
//               key={product.id}
//               className="bg-white border border-gray-200 rounded-lg p-4 text-center shadow-sm hover:shadow-md transition"
//             >
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="w-full h-52 object-contain mx-auto mb-4"
//               />
//               <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
// {/* 
//               <div className="mt-1 flex items-center justify-center text-sm text-gray-500">
//                 <RatingStars rating={product.rating} />
//                 <span className="ml-2">{product.reviews} reviews</span>
//               </div> */}

//               <p className="mt-2 text-lg font-semibold text-gray-900">${product.price}</p>
//             </div>
<ProductCard product={product}/>
          ))}
        </div>
      </div>
    </div>
  );
}