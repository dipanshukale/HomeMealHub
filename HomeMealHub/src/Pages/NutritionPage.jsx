import React, {useEffect} from "react";
import { FiMessageSquare } from "react-icons/fi";
import NutritionChatbot from "../Components/NutritionChatbot";

const NutritionPage = () => {
useEffect(() => {
  window.scrollTo(0, 0);
}, []);
	return (
		<div className="min-h-screen bg-[rgb(255,241,213)]">
			<div className="bg-[#F17228] text-white py-16 px-6 text-center relative">
				<div className="max-w-4xl mx-auto">
					<h1 className="text-4xl md:text-5xl font-bold mb-4">
						Personalized Nutrition Guidance
					</h1>
					<p className="text-xl mb-8 max-w-2xl mx-auto">
						Get expert dietary advice tailored to your health goals
					</p>

					<div className="absolute right-8 bottom-8 flex items-center space-x-2 bg-white text-[#F17228] px-4 py-2 rounded-full shadow-lg animate-pulse">
						<FiMessageSquare className="text-xl" />
						<span className="font-medium">Try our Nutrition Bot</span>
					</div>
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-6 py-12">
				<div className="flex flex-col lg:flex-row gap-12">
					<div className="lg:w-2/3">
						<div className="mb-12">
							<h2 className="text-3xl font-bold text-[#F17228] mb-6">
								Your Nutrition Companion
							</h2>
							<p className="text-lg text-gray-700 mb-6">
								Our AI nutritionist is available 24/7 to answer your dietary
								questions, suggest meal plans, and help you make healthier food
								choices. Simply click the chat icon to start your personalized
								nutrition journey.
							</p>

							<div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-[#F17228]">
								<h3 className="text-xl font-semibold text-[#F17228] mb-3">
									How it works:
								</h3>
								<ol className="list-decimal pl-5 space-y-2">
									<li>Click the chat icon in the bottom right</li>
									<li>Ask any nutrition-related question</li>
									<li>Get instant, science-backed advice</li>
									<li>Save your favorite recommendations</li>
								</ol>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
							<div className="bg-white p-6 rounded-xl shadow-md">
								<h3 className="text-2xl font-bold text-[#F17228] mb-3">
									Daily Nutrition Tips
								</h3>
								<ul className="space-y-3">
									<li className="flex items-start">
										<span className="text-[#F17228] mr-2">•</span>
										<span>
											Start your day with protein for sustained energy
										</span>
									</li>
									<li className="flex items-start">
										<span className="text-[#F17228] mr-2">•</span>
										<span>Include colorful vegetables in every meal</span>
									</li>
									<li className="flex items-start">
										<span className="text-[#F17228] mr-2">•</span>
										<span>
											Choose whole foods over supplements when possible
										</span>
									</li>
								</ul>
							</div>

							<div className="bg-white p-6 rounded-xl shadow-md">
								<h3 className="text-2xl font-bold text-[#F17228] mb-3">
									Common Questions
								</h3>
								<ul className="space-y-3">
									<li className="flex items-start">
										<span className="text-[#F17228] mr-2">•</span>
										<span>How can I improve my gut health?</span>
									</li>
									<li className="flex items-start">
										<span className="text-[#F17228] mr-2">•</span>
										<span>What are the best plant-based proteins?</span>
									</li>
									<li className="flex items-start">
										<span className="text-[#F17228] mr-2">•</span>
										<span>How much water should I drink daily?</span>
									</li>
								</ul>
							</div>
						</div>
					</div>

					<div className="lg:w-1/3 space-y-8">
						<div className="bg-white rounded-xl shadow-md overflow-hidden">
							<img
								src="./nutrition.jpeg"
								alt="Nutritionist giving advice"
								className="w-full h-48 object-cover"
							/>
							<div className="p-6">
								<h3 className="text-xl font-bold text-[#F17228] mb-2">
									Expert-Backed Advice
								</h3>
								<p className="text-gray-700">
									Our nutrition bot provides recommendations based on the latest
									dietary guidelines
								</p>
							</div>
						</div>

						<div className="bg-white rounded-xl shadow-md overflow-hidden">
							<img
								src="./nutriton1.jpeg"
								alt="Healthy food choices"
								className="w-full h-48 object-cover"
							/>
							<div className="p-6">
								<h3 className="text-xl font-bold text-[#F17228] mb-2">
									Personalized Suggestions
								</h3>
								<p className="text-gray-700">
									Get meal ideas tailored to your dietary preferences and health
									goals
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<NutritionChatbot />
		</div>
	);
};

export default NutritionPage;
