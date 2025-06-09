import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../AuthContext/CartContext";

// Your existing static meals data
import Oats from "../Images/Oats-with-Yogurt.jpg";
import Toast from "../Images/Soft-BoiledEgg.jpg";
import Smoothie from "../Images/vegan-smoothie-bowl.jpg";
import Chilla from "../Images/Chilla.jpg";
import chicken from "../Images/Grilled-Chicken.jpg";
import Quinoa from "../Images/quinoa-bowl.jpg";
import khichdi from "../Images/Khichdi.jpg";
import Rice from "../Images/Rice.jpg";
import VegetableSoup from "../Images/Soup.jpg";
import MoongDal from "../Images/MoongDal.jpg";
import Noodles from "../Images/Noodles.jpg";
import CauliflowerRice from "../Images/cauliflowerRice.jpg";

const meals = {
  Breakfast: [
    {
      title: "Oats & Yogurt Bowl",
      desc: "Rolled oats, topped with unsweetened yogurt, blueberries, chia seeds.",
      price: 100,
      img: Oats,
    },
    {
      title: "Avocado Toast & Egg",
      desc: "Whole grain bread, mashed avocado, sliced boiled egg, sprinkle of seeds.",
      price: 150,
      img: Toast,
    },
    {
      title: "Smoothie Bowl",
      desc: "Spinach, banana, almond milk, protein powder, topped with nuts and seeds.",
      price: 140,
      img: Smoothie,
    },
    {
      title: "Boiled Moong Dal Chilla",
      desc: "Moong dal (lentils), herbs, served with mint chutney.",
      price: 100,
      img: Chilla,
    },
  ],
  Lunch: [
    {
      title: "Grilled Chicken / Tofu Salad",
      desc: "Mixed greens, cherry tomatoes, cucumber, olive oil vinaigrette.",
      price: 170,
      img: chicken,
    },
    {
      title: "Quinoa Bowl",
      desc: "Quinoa, roasted veggies, chickpeas, tahini dressing.",
      price: 200,
      img: Quinoa,
    },
    {
      title: "Millet Khichdi",
      desc: "Foxtail millet with lentils and veggies, tempered with ghee.",
      price: 100,
      img: khichdi,
    },
    {
      title: "Brown Rice with Stir-Fried Veggies & Paneer",
      desc: "High-fiber rice with colorful veggies and light spices.",
      price: 150,
      img: Rice,
    },
  ],
  Dinner: [
    {
      title: "Vegetable Soup + Grilled Tofu",
      desc: "Light broth with veggies and a protein side.",
      price: 150,
      img: VegetableSoup,
    },
    {
      title: "Steamed Veggies + Moong Dal",
      desc: "Light dal with steamed carrots, broccoli, beans.",
      price: 100,
      img: MoongDal,
    },
    {
      title: "Zucchini / Carrot Noodles with Stir-fry Veggies",
      desc: "Gluten-free spiral noodles tossed in olive oil and garlic.",
      price: 250,
      img: Noodles,
    },
    {
      title: "Cauliflower Rice Bowl",
      desc: "Cauliflower rice with sautéed mushrooms, spinach, and a poached egg.",
      price: 200,
      img: CauliflowerRice,
    },
  ],
};

const categories = ["All", "Breakfast", "Lunch", "Dinner"];

const IMAGE_BASE_URL = "http://localhost:8000/";

const MealData = ({ option, location }) => {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [vendorMeals, setVendorMeals] = useState([]);
  const { cartItems, addToCart, totalAmount } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchVendorMeals();
  }, []);

  const fetchVendorMeals = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/vendor/data");
      if (!res.ok) throw new Error("Failed to fetch vendor meals");
      const data = await res.json();

      const formatted = data.map((item) => ({
		title: item.dishName || "Vendor Dish", 
		desc: item.description || "No description",
		price: item.price || 0,
		img: item.dishImage
			? item.dishImage.startsWith("http")
			? item.dishImage
			: `${IMAGE_BASE_URL}${item.dishImage}`
			: null,
		category: "Vendor",
		}));

      setVendorMeals(formatted);
    } catch (err) {
      console.error(err);
    }
  };

  const combinedMeals =
    activeTab === "All"
      ? [
          ...Object.values(meals).flat(),
          ...vendorMeals,
        ]
      : meals[activeTab] || [];

  const filteredMeals = combinedMeals.filter((meal) =>
    meal.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (meal) => {
    addToCart({ ...meal, quantity: 1 });
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#1f1f1f]">
      <main className="flex-grow pb-36">
        <div
          className="relative w-full h-70 bg-cover bg-center mb-10 mt-2 flex items-center justify-center"
          style={{ backgroundImage: `url("./mealbg1.jpg")` }}
        >
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="absolute top-6 w-full flex justify-center z-20 px-4">
            <div className="relative w-[80%] sm:w-[60%] md:w-[40%] pt-6">
              <input
                type="text"
                placeholder="Search delicious meals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-5 py-3 rounded-full shadow-xl outline-none bg-white text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-[#F17228] transition"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 pt-6">
                🔍
              </div>
            </div>
          </div>
          <div className="relative z-10 text-white text-center pt-12">
            <h2 className="text-4xl font-bold">
              <span className="font-light">Our Recipes</span>
            </h2>
          </div>
        </div>

        {option && location && (
          <div className="max-w-4xl mx-auto bg-white px-6 py-4 rounded-xl shadow-xs shadow-gray-600 mb-8">
            <p className="text-lg text-black mb-2">
              <strong>Delivery Option : </strong> {option}
            </p>
            <p className="text-lg text-black">
              <strong>Location :</strong> {location}
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-4 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-5 py-2 rounded-full font-semibold transition overflow-hidden shadow-md cursor-pointer hover:scale-105 duration-300 ${
                activeTab === cat
                  ? "bg-yellow-400 text-black"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}
          
        </div>

        <div className="p-6 lg:p-28">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 px-4 sm:px-6 md:px-12 mb-8">
            {filteredMeals.length === 0 && (
              <p className="text-center col-span-full text-gray-500 text-lg">
                No meals found matching your search.
              </p>
            )}
            {filteredMeals.map((item, index) => (
              <div
                key={index}
                className="bg-white cursor-pointer rounded-xl shadow-2xs overflow-hidden transition transform shadow-gray-600 hover:shadow-2xl hover:-translate-y-1"
              >
                {item.img ? (
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-48 sm:h-52 md:h-60 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 sm:h-52 md:h-60 bg-gray-200 flex items-center justify-center text-gray-400 text-lg font-semibold">
                    No Image
                  </div>
                )}
                <div className="pt-4 px-4 pb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1 mb-2">{item.desc}</p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-[#F17228] font-bold text-lg">
                      ₹{item.price}
                    </span>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="bg-[#F17228] cursor-pointer text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-[#e65c11] transition"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#F17228] text-white z-50 px-6 py-3 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] flex items-center justify-between md:justify-center gap-4">
          <div className="flex items-center gap-2 text-sm sm:text-base font-medium">
            <img
              src="./cooking.png"
              alt="cart"
              className="w-6 h-6 sm:w-8 sm:h-8"
            />
            <span>
              {cartItems.reduce((acc, item) => acc + item.quantity, 0)} item(s)
            </span>
            <span className="hidden sm:inline">|</span>
            <span className="font-semibold hidden sm:inline">₹{totalAmount}</span>
          </div>
          <Link
            to="/cart"
            className="bg-white text-[#F17228] font-semibold px-4 py-2 rounded-full text-sm sm:text-base shadow hover:shadow-lg transition"
          >
            View Cart
          </Link>
        </div>
      )}
    </div>
  );
};

export default MealData;
