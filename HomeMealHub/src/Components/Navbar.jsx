import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useCart } from "../AuthContext/CartContext";

const Navbar = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const location = useLocation();
	const { cartItems } = useCart();

	const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 10);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		setMenuOpen(false);
	}, [location]);

	const navLinks = [
		{ path: "/", name: "Home" },
		{ path: "/MealData", name: "Meals" },
		{ path: "/AboutUs", name: "About" },
		{ path: "/nutrition", name: "Nutrition" },
		{ path: "/ContactUs", name: "Contact" },
	];

	return (
		<nav
			className={`sticky top-0 z-50 transition-all duration-300 ${
				scrolled ? "bg-white shadow-md" : "bg-white"
			}`}
		>
			<div className="container mx-auto flex justify-between items-center p-4 lg:p-2 lg:px-36">
				{/* Logo */}
				<Link
					to="/"
					className="flex items-center space-x-2 text-2xl font-bold tracking-wide text-[#F17228]"
				>
					<img
						className="w-6 h-6 object-contain"
						src="./Homemeal.png"
						alt="Logo"
					/>
					<span className="font-normal">HomeMeal Hub</span>
				</Link>

				{/* Desktop Nav Links */}
				<div className="hidden md:flex gap-6 items-center">
					{navLinks.map((link) => (
						<Link
							key={link.path}
							to={link.path}
							className={`px-3 py-2 rounded-md text-sm font-medium ${
								location.pathname === link.path
									? "text-[#F17228] border-b-2 border-[#F17228]"
									: "text-gray-800 hover:text-[#F17228]"
							}`}
						>
							{link.name}
						</Link>
					))}

					<Link to="/cart" className="relative flex items-center">
						<img
							src="/cart.png"
							alt="Cart"
							className="w-6 h-6 object-contain"
						/>
						{totalQuantity > 0 && (
							<span className="absolute -top-2 -right-4 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-semibold">
								{totalQuantity}
							</span>
						)}
					</Link>
				</div>

				<Link
					to="/cart"
					className="md:hidden relative flex items-center"
				>
					<img
						src="/cart.png"
						alt="Cart"
						className="w-6 h-6 object-contain ml-2"
					/>
					{totalQuantity > 0 && (
						<span className="absolute -top-1 -right-4 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-semibold">
							{totalQuantity}
						</span>
					)}
				</Link>

				<div className="md:hidden ml-4" onClick={() => setMenuOpen(!menuOpen)}>
					{menuOpen ? <X size={28} /> : <Menu size={28} />}
				</div>

				{menuOpen && (
					<div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg p-4">
						{navLinks.map((link) => (
							<Link
								key={link.path}
								to={link.path}
								className={`block px-4 py-3 rounded-md text-base font-medium ${
									location.pathname === link.path
										? "bg-[#FFF1D5] text-[#F17228]"
										: "text-gray-800 hover:bg-[#FFF1D5]"
								}`}
								onClick={() => setMenuOpen(false)}
							>
								{link.name}
							</Link>
						))}
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
