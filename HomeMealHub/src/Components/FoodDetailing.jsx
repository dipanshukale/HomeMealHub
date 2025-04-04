import React from 'react';

const FoodDetailing = () => {
  const sections = [
    {
      id: 1,
      title: "Aunties' Kitchen Wisdom",
      description: "Authentic family recipes passed down through generations, cooked with patience and pride. Our home chefs prepare each meal with the same care they would for their own families.",
      image: "./food.jpeg",
      reverse: false
    },
    {
      id: 2,
      title: "More Than a Meal - It's a Hug on a Plate",
      description: "Every dish carries the warmth and care of our home chefs' hands. Taste the difference that love and tradition make in every bite of our home-style cooking.",
      image: "./food1.jpeg",
      reverse: true
    }
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 text-cente">
      <div className="text-center mb-12">
        <h1 className=" text-2xl lg:text-4xl font-serif font-bold text-[#F17228] mb-4">Taste the Love in Every Bite</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Home-cooked meals prepared with mother's love, just like your family kitchen
        </p>
      </div>

      <div className="bg-[#FFF1D5] rounded-3xl p-6 sm:p-8 lg:p-12 max-w-6xl mx-auto">
        {sections.map((section) => (
          <div 
            key={section.id} 
            className={`flex flex-col ${section.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 mb-16 last:mb-0`}
          >
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold text-[#F17228] mb-4">{section.title}</h2>
              <p className="text-gray-700">{section.description}</p>
            </div>
            
            <div className="md:w-1/2">
              <img 
                src={section.image} 
                alt={section.title}
                className="rounded-xl shadow-lg w-96 h-96 object-cover cursor-pointer"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodDetailing;