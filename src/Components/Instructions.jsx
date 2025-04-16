import React from 'react';

const Instructions = () => {
  const steps = [
    {
      id: 1,
      title: 'Select Your Location',
      description: 'Choose the location where your food will be delivered.',
      image: './location.jpeg'
    },
    {
      id: 2,
      title: 'Choose Order',
      description: 'Check over hundreds of menus to pick your favorite food',
      image: './order.jpeg'
    },
    {
      id: 3,
      title: 'Pay Given Amount',
      description: "It's quick, safe, and simple. Select several methods of payment",
      image: './payment.jpeg'
    },
    {
      id: 4,
      title: 'Enjoy Your Meals',
      description: 'Food is made and delivered directly to your home.',
      image: './meal.jpeg'
    }
  ];

  return (
    <div className=" bg-gray-50 py-12 px-4 sm:px-6 lg:px-20">
      <div className="text-center mb-0 lg:mb-16">
        <h1 className="text-4xl font-serif font-bold text-[#F17228] mb-4">How Does It Work?</h1>
        <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
          Get fresh, healthy meals in just 4 simple steps
        </p>
      </div>

      <div className="max-w-7xl mx-auto p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.id} className="bg-white rounded-4xl shadow-lg shadow-gray-500 overflow-hidden hover:shadow-lg hover:shadow-gray-800 transition-shadow flex flex-col cursor-pointer">
              <div className="flex flex-row h-full">
                <div className="w-1/2 aspect-square">
                  <img 
                    src={step.image} 
                    alt={step.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                
                <div className="w-1/2 p-2 flex flex-col justify-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Instructions;