import React from "react";
import VegBowl from "../Images/VegBowl.jpg";
import AvocadoSalad from "../Images/Avocado-Tuna-Salad.jpg";
import keto from "../Images/keto.jpg";
import tomatosoup from "../Images/tomato-soup.jpg";
import VeganProteinBowl from "../Images/veganProteinbowl.jpg";
import smoothies from "../Images/smoothies.jpg";

const menuItems = [
  { id: 1, name: "Healthy Veggie Bowl", price: "₹120", img: VegBowl, dis: "A vibrant blend of fresh veggies and herb-infused dressing." },
  { id: 2, name: "Avocado Tuna Salad", price: "₹109", img: AvocadoSalad, dis: "Creamy avocado meets protein-rich tuna in this refreshing, nutritious salad." },
  { id: 3, name: "Keto Bowl", price: "₹145", img: keto, dis: "A low-carb, high-protein bowl packed with healthy fats and bold flavors." },
  { id: 4, name: "Tomato Soup", price: "₹130", img: tomatosoup, dis: "Rich, velvety tomato soup with a hint of basil and a touch of cream." },
  { id: 5, name: "Vegan Protein Bowl", price: "₹175", img: VeganProteinBowl, dis: "Plant-based perfection loaded with proteins, grains, and fresh greens." },
  { id: 6, name: "Smoothies", price: "₹175", img: smoothies, dis: "Refreshing, nutrient-packed smoothies for a healthy boost of energy." },
];

const MenuPage = () => {
  return (
    <div className="px-8 md:px-16 lg:px-24 py-12 min-h-screen bg-white flex flex-col items-center">
      <h1 className="text-xl sm:text-2xl lg:text-4xl font-serif font-bold text-[#F17228] mb-4 flex justify-center items-center gap-2 flex-wrap">For Quick Healthy Meals <span><img className="w-10 h-10 object-contain" src="./fried-rice.png"/></span></h1>
      <p className="mt-4 text-gray-600 sm:text-sm text-center">Busy schedule? Our ready-to-eat meals are healthy, hearty, and ready in minutes.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-15 mt-12 justify-center">
        {menuItems.map((item) => (
          <div key={item.id} className="w-64">

            <div className="relative w-full h-64 overflow-hidden rounded-lg">
              <img src={item.img} alt={item.name} className="w-full h-full object-cover cursor-pointer transition-transform transform hover:scale-105 duration-300" /> 
            </div>
           
            <div className="text-center mt-3">
              <h2 className="text-xl font-bold text-black">{item.name}</h2>
              <p className="text-gray-600 text-sm">{item.dis}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;