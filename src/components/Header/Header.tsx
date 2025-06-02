import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import Cart from "../Cart/Cart";

const Header = () => {
	return (
		<header className="bg-white text-gray-700 p-4 flex items-center justify-between shadow-sm sticky top-0 z-50">
			{/* Logo & Main Nav */}
			<div className="flex items-center gap-4 lg:gap-8">
				{/* Mobile Menu Button with Sheet */}
				<Sheet>
					<SheetTrigger asChild>
						<Button variant="ghost" size="icon" className="lg:hidden">
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
									d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
								/>
							</svg>
						</Button>
					</SheetTrigger>
					<SheetContent side="left" className="w-[250px] px-5">
						{/* <SheetHeader>
							<SheetTitle className="text-left text-lg font-bold text-blue-600">
								Categories
							</SheetTitle>
						</SheetHeader> */}
						<nav className="mt-4 flex flex-col gap-4">
							<Link to="/collections/womens" className="hover:text-blue-600">
								Women
							</Link>
							<Link to="/collections/mens" className="hover:text-blue-600">
								Men
							</Link>
						</nav>
					</SheetContent>
				</Sheet>

				{/* Logo */}
				<div className="flex items-center gap-2">
					<img src="/vite.svg" alt="Company Logo" className="h-8 w-8" />
					<span className="font-bold text-xl text-blue-600">Nirvana</span>
				</div>

				{/* Desktop Navigation */}
				<nav className="hidden lg:flex gap-6">
					<Link to="/collections/womens" className="hover:text-blue-600">
						Women
					</Link>
					<Link to="/collections/mens" className="hover:text-blue-600">
						Men
					</Link>
				</nav>
			</div>

			{/* User Actions */}
			<div className="flex items-center gap-2 lg:gap-6">
				<div className="hidden lg:flex items-center gap-4">
					<Link to="/login">
						<Button>Sign in</Button>
					</Link>
					<Link to="/register">
						<Button variant="outline">Create account</Button>
					</Link>
				</div>

				<Button size="icon" variant="ghost">
					{/* Search Icon */}
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
							d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
						/>
					</svg>
				</Button>

				{/* Cart Button with Sheet */}

				{/* Mobile Profile Icon */}
				<Button size="icon" variant="ghost" className="lg:hidden">
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
							d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
						/>
					</svg>
				</Button>
			</div>
			<Cart />
		</header>
	);
};

export default Header;
