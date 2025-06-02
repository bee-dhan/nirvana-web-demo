import { useRef } from 'react';
import ProductCard from './ProductCard';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Using the same products data structure
const trendingProducts = [
  {
    id: "4",
    name: "Limited Edition Sneakers",
    brand: "UrbanKicks",
    description: "Premium leather sneakers with unique design",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=3270",
    price: 159.99,
    colors: [
      { 
        name: "White", 
        class: "bg-white border border-gray-300",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=3270",
        variantId: "4-white"
      },
      { 
        name: "Black", 
        class: "bg-black",
        image: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?q=80&w=3270",
        variantId: "4-black"
      },
      { 
        name: "Red", 
        class: "bg-red-600",
        image: "https://images.unsplash.com/photo-1542219550-37153d387c27?q=80&w=3270",
        variantId: "4-red"
      }
    ],
    isNewArrival: true,
    rating: 4.9,
    reviewCount: 328,
  },
  {
    id: "5",
    name: "Crossbody Bag",
    brand: "LuxLeather",
    description: "Elegant leather crossbody bag",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=3270",
    price: 89.99,
    colors: [
      { 
        name: "Tan", 
        class: "bg-yellow-700",
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=3270",
        variantId: "5-tan"
      },
      { 
        name: "Black", 
        class: "bg-black",
        image: "https://images.unsplash.com/photo-1524498250077-390f9e378fc0?q=80&w=3270",
        variantId: "5-black"
      }
    ],
    isNewArrival: true,
    rating: 4.7,
    reviewCount: 156,
  },
  {
    id: "6",
    name: "Crossbody Bag",
    brand: "LuxLeather",
    description: "Elegant leather crossbody bag",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=3270",
    price: 89.99,
    colors: [
      { 
        name: "Tan", 
        class: "bg-yellow-700",
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=3270",
        variantId: "5-tan"
      },
      { 
        name: "Black", 
        class: "bg-black",
        image: "https://images.unsplash.com/photo-1524498250077-390f9e378fc0?q=80&w=3270",
        variantId: "5-black"
      }
    ],
    isNewArrival: true,
    rating: 4.7,
    reviewCount: 156,
  },
  {
    id: "8",
    name: "Crossbody Bag",
    brand: "LuxLeather",
    description: "Elegant leather crossbody bag",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=3270",
    price: 89.99,
    colors: [
      { 
        name: "Tan", 
        class: "bg-yellow-700",
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=3270",
        variantId: "5-tan"
      },
      { 
        name: "Black", 
        class: "bg-black",
        image: "https://images.unsplash.com/photo-1524498250077-390f9e378fc0?q=80&w=3270",
        variantId: "5-black"
      }
    ],
    isNewArrival: true,
    rating: 4.7,
    reviewCount: 156,
  },
  {
    id: "9",
    name: "Crossbody Bag",
    brand: "LuxLeather",
    description: "Elegant leather crossbody bag",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=3270",
    price: 89.99,
    colors: [
      { 
        name: "Tan", 
        class: "bg-yellow-700",
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=3270",
        variantId: "5-tan"
      },
      { 
        name: "Black", 
        class: "bg-black",
        image: "https://images.unsplash.com/photo-1524498250077-390f9e378fc0?q=80&w=3270",
        variantId: "5-black"
      }
    ],
    isNewArrival: true,
    rating: 4.7,
    reviewCount: 156,
  },
  // Add more trending products as needed
];

export default function TrendingProducts() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300; // Adjust this value based on your needs
      const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Trending Now</h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('left')}
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('right')}
              className="rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {trendingProducts.map((product) => (
            <div key={product.id} className="flex-none w-[300px]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 