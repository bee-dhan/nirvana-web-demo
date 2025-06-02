import { useEffect, useState } from "react";
import TrendingProducts from "./components/ProductList/TrendingProducts";
import { Button } from "./components/ui/button";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "./components/ui/carousel";

const slides = [
	{
		image:
			"https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80",
		title: "$100 & under",
		subtitle: "Men's jackets",
		link: "#mens-jackets",
		button: "Shop now",
	},
	{
		image:
			"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80",
		title: "$50 & under",
		subtitle: "Women's dresses",
		link: "#womens-dresses",
		button: "Shop now",
	},
	{
		image:
			"https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=900&q=80",
		title: "New Arrivals",
		subtitle: "Accessories",
		link: "#accessories",
		button: "Shop now",
	},
];

const categories = [
	{
		name: "Women",
		image:
			"https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		link: "#women",
	},
	{
		name: "Men",
		image:
			"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		link: "#men",
	},
	{
		name: "Kids",
		image:
			"https://images.unsplash.com/photo-1554342321-0776d282ceac?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		link: "#kids",
	},
	{
		name: "Shoes",
		image:
			"https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		link: "#shoes",
	},
];

function Slideshow() {
	const [api, setApi] = useState<
		import("./components/ui/carousel").CarouselApi | null
	>(null);
	const [isPlaying, setIsPlaying] = useState(true);
	const [currentSlide, setCurrentSlide] = useState(0);
	const [isHovering, setIsHovering] = useState(false);
	const slideCount = slides.length;

	useEffect(() => {
		if (!api) return;

		const onSelect = () => {
			setCurrentSlide(api.selectedScrollSnap());
		};

		api.on("select", onSelect);

		let interval: NodeJS.Timeout | undefined;
		if (isPlaying && !isHovering) {
			interval = setInterval(() => {
				if (api) {
					const nextIdx = (api.selectedScrollSnap() + 1) % slideCount;
					api.scrollTo(nextIdx);
				}
			}, 4000);
		} else {
			clearInterval(interval);
		}

		return () => {
			api.off("select", onSelect);
			clearInterval(interval);
		};
	}, [api, slideCount, isPlaying, isHovering]);

	const togglePlayPause = () => {
		setIsPlaying(!isPlaying);
	};

	const goToSlide = (index: number) => {
		api?.scrollTo(index);
	};

	return (
		<div
			className="w-full flex flex-col items-center"
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
		>
			<Carousel
				setApi={setApi}
				className=" w-[95vw] h-[66vh] max-h-[700px] rounded-xs shadow-lg overflow-hidden relative"
			>
				<CarouselContent>
					{slides.map((slide, idx) => (
						<CarouselItem key={idx} className="relative w-full h-[66vh]">
							<img
								src={slide.image}
								alt={slide.title}
								className="object-cover w-full h-full"
							/>
							<div className="absolute inset-0 flex flex-col justify-center items-center gap-4 text-white bg-black/50 p-8">
								<a href={slide.link}>
									<Button
										size={"lg"}
										variant={"outline"}
										className="border-2 bg-transparent text-white cursor-pointer px-12 py-6 text-lg"
									>
										{slide.button}
									</Button>
								</a>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				{/* Controls Container */}
				<div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-3">
					{/* <CarouselPrevious className="static text-white bg-black/50 hover:bg-black/70" /> */}
					<Button
						variant={"ghost"}
						size={"icon"}
						onClick={togglePlayPause}
						className="p-2 rounded-full text-white transition-colors"
						aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
					>
						<span className="material-symbols-outlined">
							{isPlaying ? "pause" : "play_arrow"}
						</span>
					</Button>
					{/* Dot Indicators */}
					<div className="flex space-x-2">
						{slides.map((_, index) => (
							<Button
								variant={"ghost"}
								size={"icon"}
								key={index}
								onClick={() => goToSlide(index)}
								className={`w-3 h-3 rounded-full ${
									currentSlide === index ? "bg-white" : "bg-white/50"
								} hover:bg-white transition-colors`}
								aria-label={`Go to slide ${index + 1}`}
							/>
						))}
					</div>

					{/* <CarouselNext className="static text-white bg-black/50 hover:bg-black/70" /> */}

					{/* Play/Pause Button */}
				</div>
			</Carousel>
		</div>
	);
}

function ShopByCategory() {
	return (
		<div className="py-12 px-4">
			<h2 className="text-4xl font-bold text-center mb-10">
				What are you shopping for today?
			</h2>
			<div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
				{categories.map((category) => (
					<a
						key={category.name}
						href={category.link}
						className="flex flex-col   items-center text-center group"
					>
						<div className="w-60 h-60 rounded-full  overflow-hidden shadow-lg mb-3 transition-transform duration-300 group-hover:scale-105 ">
							<img
								src={category.image}
								alt={category.name}
								className="w-full h-full object-cover"
							/>
						</div>
						<span className="  inset-0 text-lg font-semibold text-gray-800 group-hover:text-blue-600">
							{category.name}
						</span>
					</a>
				))}
			</div>
		</div>
	);
}

function App() {
	return (
		<>
			<div className="flex justify-center">
				<Slideshow />
			</div>
			<ShopByCategory />
			<TrendingProducts />
			{/* <ProductList /> */}
			<WhatsAppFloat />
			<Footer />
		</>
	);
}

const Footer = () => {
	return (
		<footer className="bg-gray-800 text-white p-4 mt-4">
			<p className="text-center">© 2023 My Application</p>
		</footer>
	);
};
function WhatsAppFloat() {
	return (
		<a
			href="https://wa.me/1234567890"
			target="_blank"
			rel="noopener noreferrer"
			className="fixed left-4 bottom-4 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center p-3 transition-colors duration-200"
			title="Chat on WhatsApp"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 32 32"
				fill="currentColor"
				className="w-7 h-7"
			>
				<path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.832 4.584 2.236 6.37L4 29l7.824-2.05A12.94 12.94 0 0016 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22.917c-1.97 0-3.89-.52-5.56-1.5l-.396-.23-4.65 1.22 1.24-4.52-.26-.41A9.93 9.93 0 016 15c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10zm5.13-7.47c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.28.7-.9.86-1.08.16-.18.32.2.6.07.28-.14 1.18-.43 2.25-1.37.83-.74 1.39 1.65 1.55 1.93.16.28.02.43.12.57.13.13.28.34.42.51.14.17.18.29.28.48.09.19.05.36.02.5.07.14.61 1.47.84 2.01.22.53.45.46.61.47.16.01.35.01.54.01.19 0 .5-.07.76-.36.26-.29 1-1 .97-2.43-.03-1.43-1.03-2.81-1.18-3.01-.15-.2-2.03-3.1-5.02-4.22-.7-.24-1.25-.38-1.68-.49-.71-.18-1.36-.16-1.87-.1-.57.07-1.65.67-1.88 1.32-.23.65-.23 1.2.16 1.32.07.12.25.19.53.33z" />
			</svg>
			<span className="ml-2 font-semibold hidden sm:inline sr-only">
				WhatsApp
			</span>
		</a>
	);
}

export default App;
