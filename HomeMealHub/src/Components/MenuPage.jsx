import React, { useEffect, useState } from "react";
import axios from "axios";
import VegBowl from "../Images/VegBowl.jpg";
import AvocadoSalad from "../Images/Avocado-Tuna-Salad.jpg";
import keto from "../Images/keto.jpg";
import tomatosoup from "../Images/tomato-soup.jpg";
import VeganProteinBowl from "../Images/veganProteinbowl.jpg";
import smoothies from "../Images/smoothies.jpg";

const staticItems = [
  { id: "s1", name: "Healthy Veggie Bowl", price: 120, img: VegBowl, dis: "A vibrant blend of fresh veggies and herb-infused dressing." },
  { id: "s2", name: "Avocado Tuna Salad", price: 109, img: AvocadoSalad, dis: "Creamy avocado meets protein-rich tuna in this refreshing, nutritious salad." },
  { id: "s3", name: "Keto Bowl", price: 145, img: keto, dis: "A low-carb, high-protein bowl packed with healthy fats and bold flavors." },
  { id: "s4", name: "Tomato Soup", price: 130, img: tomatosoup, dis: "Rich, velvety tomato soup with a hint of basil and a touch of cream." },
  { id: "s5", name: "Vegan Protein Bowl", price: 175, img: VeganProteinBowl, dis: "Plant-based perfection loaded with proteins, grains, and fresh greens." },
  { id: "s6", name: "Smoothies", price: 175, img: smoothies, dis: "Refreshing, nutrient-packed smoothies for a healthy boost of energy." },
];

const VENDOR_IMAGE_BASE_URL = "http://localhost:8000/";

const MenuPage = () => {
  const [vendorItems, setVendorItems] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/vendor/data")
      .then(res => {
        console.log("Vendor data from API:", res.data); // debug log
        const processed = res.data.map((item, index) => ({
          id: `v${index}`,
          name: item.name || "No Name",
          price: item.price || 250,
          img: item.dishImage ? `${VENDOR_IMAGE_BASE_URL}${item.dishImage}` : null,
          dis: item.description || "No description",
        }));
        setVendorItems(processed);
      })
      .catch(err => {
        console.error("Error loading vendor submissions:", err);
      });
  }, []);

  const allItems = [...staticItems, ...vendorItems];

  return (
    <div className="px-8 md:px-16 lg:px-24 py-12 min-h-screen bg-white flex flex-col items-center">
      <h1 className="text-4xl font-serif font-bold text-[#F17228] mb-4 text-center">
        For Quick Healthy Meals 🍱
      </h1>
      <p className="text-gray-600 sm:text-sm text-center max-w-xl">
        Busy schedule? Our ready-to-eat meals are healthy, hearty, and ready in minutes.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12">
        {allItems.length === 0 && <p>No menu items to display.</p>}
        {allItems.map((item) => (
          <div key={item.id} className="w-64 bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative w-full h-64">
              {item.img ? (
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-gray-100 text-gray-400">
                  No Image Available
                </div>
              )}
            </div>
            <div className="p-4 text-center">
              <h2 className="text-xl font-bold">{item.name}</h2>
              <p className="text-gray-600 text-sm mt-2">{item.dis}</p>
              <p className="text-[#F17228] font-semibold text-lg mt-3">₹{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
