import React, { useState, useEffect } from "react";
import { useCart } from "../AuthContext/CartContext";
import { FiArrowRightCircle } from "react-icons/fi";
import { BsFillGearFill } from "react-icons/bs";
import { useNavigate} from "react-router-dom";
import axios from "axios";
import CustomMealChatbot from "../Components/CustomMealChatbot";

const CartPage = () => {
	const { cartItems, changeQuantity, totalAmount, updateCartItem } = useCart();
	const [isCustomizing, setIsCustomizing] = useState(false);
	const [customMeal, setCustomMeal] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		window.scrollTo(0, 0);
		fetchCartItems();
	}, []);

	const fetchCartItems = async () => {
		try {
		  const response = await axios.get("http://localhost:8000/api/cart"); 
		  console.log(response.data); 
		} catch (error) {
		  console.error("Error fetching cart items:", error);
		}
	  };

	  const handleUpdateCart = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/cart/update", {
        title: "Meal Name", 
        quantity: 2,
      });
      console.log("Updated Cart Item:", response.data);
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };


	const handleCustomizeMeal = (item) => {
		setCustomMeal(item);
		setIsCustomizing(true);
	};

	const handleSaveCustomizations = (customOptions) => {
		updateCartItem(customMeal.title, customOptions);
		setIsCustomizing(false);
	};

	const handleCancelCustomization = () => setIsCustomizing(false);

	if (cartItems.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-orange-100 to-white mb-10">
				<div className="bg-white rounded-3xl shadow-2xl p-6 mt-42 sm:p-10 text-center animate-fade-in-up w-full max-w-md">
					<div className="text-6xl mb-4">🧺</div>
					<h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-2">
						Oops, your cart is empty!
					</h2>
					<p className="text-gray-500 mb-6 text-sm sm:text-base">
						Looks like you're hungry. Let’s fix that! 🍽️
					</p>
					<button
						onClick={() => navigate("/MealData")}
						className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#F17228] to-[#f38b34] text-white rounded-full font-semibold text-sm sm:text-lg shadow-lg hover:scale-105 transition"
					>
						🍔 <span>Explore Meals</span>
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-gradient-to-b from-white  to-orange-50 lg:p-10 font-sans">
			<main className="flex-grow py-10 px-4 sm:px-6 lg:px-10">
				<div className="flex flex-col sm:flex-row items-center justify-between mb-10">
					<div className="flex items-center gap-4">
            <img src="./cart.png" className="w-10 h-10 object-contain"/>
						<h1 className="text-3xl sm:text-5xl tracking-wideset drop-shadow-xl font-light text-black">
							Your Cart
						</h1>
					</div>
					<button
						onClick={() => setIsCustomizing((prev) => !prev)}
						className="mt-4 sm:mt-0 cursor-pointer flex items-center gap-2 bg-gradient-to-r from-[#F17228] to-[#f38b34] text-white px-4 sm:px-5 py-2 rounded-full font-medium shadow-md hover:scale-105 transition"
					>
						<BsFillGearFill className="text-lg sm:text-xl" />
						Let’s Customize
					</button>
				</div>

				{isCustomizing && (
					<div className="fixed bottom-28 right-4 sm:right-10 z-50">
						<CustomMealChatbot
							item={customMeal}
							onSave={handleSaveCustomizations}
							onClose={handleCancelCustomization}
						/>
					</div>
				)}

				<div className="flex flex-col lg:flex-row gap-10">
					{/* Desktop Table */}
					<div className="hidden lg:block flex-1 bg-white rounded-3xl border border-gray-200  sm:p-8 shadow-xs shadow-black hover:shadow-2xl transition overflow-x-auto">
						<table className="w-full text-left min-w-[500px]">
							<thead className="border-b">
								<tr className="text-gray-600 text-xs sm:text-sm uppercase tracking-wide">
									<th className="pb-4">Product</th>
									<th className="pb-4 text-center">Quantity</th>
									<th className="pb-4 text-right">Total</th>
								</tr>
							</thead>
							<tbody>
								{cartItems.map((item, idx) => (
									<tr
										key={idx}
										className="border-b hover:bg-orange-50 transition cursor-pointer"
									>
										<td className="py-6 flex items-center gap-4">
											<img
												src={item.img}
												alt={item.title}
												className="w-14 h-14 sm:w-16 sm:h-16 rounded-md object-cover shadow"
											/>
											<div>
												<p className="font-bold text-base sm:text-lg">
													{item.title}
												</p>
												<p className="text-xs text-gray-400">
													Set • {item.desc || "Custom Option"}
												</p>
											</div>
										</td>
										<td className="text-center">
											<div className="flex items-center justify-center gap-2 border rounded-full px-3 py-1 w-fit mx-auto bg-gray-100">
												<button
													onClick={() => changeQuantity(item.title, -1)}
													className="text-base cursor-pointer font-bold px-2 hover:text-[#F17228]"
												>
													-
												</button>
												<span className="font-medium">{item.quantity}</span>
												<button
													onClick={() => changeQuantity(item.title, 1)}
													className="text-base cursor-pointer font-bold px-2 hover:text-[#F17228]"
												>
													+
												</button>
											</div>
										</td>
										<td className="text-right font-semibold text-[#F17228] text-sm sm:text-base">
											₹{item.price * item.quantity}
										</td>
									</tr>
								))}
							</tbody>
						</table>

						<div className="mt-8 flex justify-start">
							<button
								onClick={handleUpdateCart}
								className="inline-flex cursor-pointer items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-gray-600 to-black text-white rounded-full font-semibold text-sm sm:text-lg shadow-md hover:scale-105 transition"
							>
								<FiArrowRightCircle className="text-base sm:text-xl" />
								Update Cart
							</button>
						</div>
					</div>

					{/* Mobile Cards */}
					<div className="lg:hidden flex flex-col gap-6">
						{cartItems.map((item, idx) => (
							<div
								key={idx}
								className="bg-white p-4 rounded-xl shadow-md border"
							>
								<div className="flex gap-4">
									<img
										src={item.img}
										alt={item.title}
										className="w-20 h-20 object-cover rounded-md"
									/>
									<div className="flex-1">
										<h4 className="font-semibold text-lg">{item.title}</h4>
										<p className="text-sm text-gray-500">
											{item.desc || "Custom Option"}
										</p>
										<div className="mt-2 flex items-center gap-3">
											<button
												onClick={() => changeQuantity(item.title, -1)}
												className="px-2 py-1 bg-gray-200 rounded-full text-sm font-bold"
											>
												-
											</button>
											<span>{item.quantity}</span>
											<button
												onClick={() => changeQuantity(item.title, 1)}
												className="px-2 py-1 bg-gray-200 rounded-full text-sm font-bold"
											>
												+
											</button>
										</div>
										<p className="mt-2 font-semibold text-[#F17228]">
											₹{item.price * item.quantity}
										</p>
									</div>
								</div>
							</div>
						))}
						<button
							onClick={handleUpdateCart}
							className="inline-flex cursor-pointer w-40 items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r
    from-gray-500 to-black text-white rounded-full font-semibold text-sm sm:text-lg shadow-md hover:scale-105 transition"
						>
							<FiArrowRightCircle className="text-base sm:text-xl" />
							update cart
						</button>
					</div>

					<div className="w-full lg:w-1/3 bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-xs shadow-black sticky top-20 h-fit">
						<h3 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800">
							Order Summary
						</h3>

						<div className="mb-4">
							<input
								type="text"
								placeholder="Discount voucher"
								className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#F17228]"
							/>
							<button className="mt-2 cursor-pointer w-full bg-[#F17228] text-white py-2 rounded-lg font-semibold hover:bg-[#e9611d] transition">
								Apply
							</button>
						</div>

						{(() => {
							const shipping = totalAmount > 0 ? 40 : 0;
							const gst = totalAmount * 0.05;
							const grandTotal = totalAmount + shipping + gst;

							return (
								<div className="space-y-3 text-gray-700 text-sm">
									<div className="flex justify-between">
										<span>Sub Total</span>
										<span>₹{totalAmount.toFixed(2)}</span>
									</div>
									<div className="flex justify-between">
										<span>Shipping</span>
										<span>₹{shipping.toFixed(2)}</span>
									</div>
									<div className="flex justify-between">
										<span>GST (5%)</span>
										<span>₹{gst.toFixed(2)}</span>
									</div>
									<div className="flex justify-between">
										<span>Discount</span>
										<span>-₹0.00</span>
									</div>
									<div className="flex justify-between font-bold text-base sm:text-lg text-black">
										<span>Total</span>
										<span>₹{grandTotal.toFixed(2)}</span>
									</div>
								</div>
							);
						})()}

						<button onClick={() => navigate("/checkout")} className="mt-6 cursor-pointer w-full bg-gradient-to-r from-[#F17228] to-[#f38b34] text-white py-3 rounded-full font-bold hover:scale-105 transition shadow-md">
							Proceed to Checkout 
						</button>
					</div>
				</div>
			</main>
		</div>
	);
};

export default CartPage;
