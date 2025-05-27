import React, { useState, useRef } from "react";
import { X } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TailSpin } from "react-loader-spinner";

const Vendorsection = () => {
	const [selectedImage, setSelectedImage] = useState(null);
	const [selectedFile, setSelectedFile] = useState(null);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [description, setDescription] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const fileInputRef = useRef();

	const showToast = (type, message) => {
		if (type === "success") toast.success(message);
		else if (type === "error") toast.error(message);
		else toast.info(message);
	};

	const handleImageChange = (event) => {
		const file = event.target.files[0];
		if (file && file.type.startsWith("image/") && file.size < 5 * 1024 * 1024) {
			setSelectedImage(URL.createObjectURL(file));
			setSelectedFile(file);
		} else {
			showToast("error", "Please upload a valid image under 5MB.");
		}
	};

	const handleRemoveImage = () => {
		setSelectedImage(null);
		setSelectedFile(null);
		fileInputRef.current.value = null;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		const formData = new FormData();
		formData.append("name", name);
		formData.append("email", email);
		formData.append("phone", phone);
		formData.append("description", description);
		formData.append("dishImage", selectedFile);

		try {
			const res = await fetch("https://homemealhub-backend.onrender.com/api/vendor/vendordata", {
				method: "POST",
				body: formData,
			});

			const data = await res.json();

			if (res.ok) {
				showToast("success", "Form submitted successfully!");

				setName("");
				setEmail("");
				setPhone("");
				setDescription("");
				handleRemoveImage();
			} else {
				showToast("error", data.message || "Submission failed.");
			}
		} catch (error) {
			console.error("Error:", error);
			showToast("error", "Something went wrong. Try again later.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex flex-col lg:flex-row items-center justify-center min-h-screen px-4 sm:px-6 py-12 md:py-16 bg-white text-black">
			<ToastContainer position="top-right" autoClose={3000} />

			<div className="lg:w-1/2 flex flex-col md:flex-row items-center mb-10 lg:mb-0">
				<div className="relative w-full max-w-[320px] sm:max-w-[420px] h-[380px] sm:h-[500px] md:ml-[-30px] lg:ml-[-60px] mb-8 md:mb-0">
					<img
						src="./chef3.jpg"
						className="w-full h-full object-cover rounded-xl shadow-2xl cursor-pointer transition-transform hover:scale-105 duration-300"
						alt="Chef cooking"
					/>
				</div>
				<div className="md:ml-6 lg:ml-12 max-w-md text-center md:text-left px-4 sm:px-0">
					<h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F17228] mb-4 leading-tight">
						Join Our Culinary Family & Earn with Your Passion!
					</h1>
					<p className="text-gray-700 sm:text-lg leading-relaxed">
						Love cooking? Turn your homemade meals into a rewarding opportunity!
						Share your delicious creations with customers and earn on every
						order.
					</p>
					<p className="text-gray-700 sm:text-lg leading-relaxed mt-4">
						We offer a platform for talented home chefs to showcase their
						skills, spread joy through food, and build a thriving home-based
						business.
					</p>
				</div>
			</div>

			<div className="lg:w-1/2 bg-white bg-opacity-10 backdrop-blur-lg p-6 sm:p-8 md:p-10 rounded-xl shadow-2xl max-w-md w-full border border-gray-300 mx-4 sm:mx-0">
				<h2 className="text-2xl sm:text-3xl font-extrabold text-center text-black mb-6">
					Join Us Today
				</h2>
				<form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
					<input
						name="name"
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Full Name"
						className="w-full p-3 sm:p-4 border border-gray-500 rounded-lg bg-transparent text-black placeholder-gray-500 focus:ring-2 focus:ring-[#d65e1d]"
						required
					/>
					<input
						name="email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Email Address"
						className="w-full p-3 sm:p-4 border border-gray-500 rounded-lg bg-transparent text-black placeholder-gray-500 focus:ring-2 focus:ring-[#d65e1d]"
						required
					/>
					<input
						name="phone"
						type="text"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						placeholder="Phone Number"
						className="w-full p-3 sm:p-4 border border-gray-500 rounded-lg bg-transparent text-black placeholder-gray-500 focus:ring-2 focus:ring-[#d65e1d]"
						required
					/>
					<textarea
						name="description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder="Tell us about your special dish"
						rows="3"
						className="w-full p-3 sm:p-4 border border-gray-500 rounded-lg bg-transparent text-black placeholder-gray-500 focus:ring-2 focus:ring-[#d65e1d]"
						required
					></textarea>

					<div className="w-full">
						<label className="block text-black mb-2 text-sm sm:text-base">
							Upload Dish Image
						</label>
						<input
							ref={fileInputRef}
							name="dishImage"
							type="file"
							accept="image/*"
							onChange={handleImageChange}
							className="w-full p-2 sm:p-3 border cursor-pointer border-gray-500 rounded-lg bg-transparent text-black focus:ring-2 focus:ring-[#F17228] text-sm sm:text-base"
							required
						/>
					</div>

					{selectedImage && (
						<div className="relative mt-4">
							<p className="text-gray-600 text-sm sm:text-base">Preview:</p>
							<div className="relative inline-block mt-2">
								<img
									src={selectedImage}
									alt="Dish Preview"
									className="w-full h-40 sm:h-48 object-cover rounded-lg shadow-lg border-2 border-gray-500"
								/>
								<button
									type="button"
									onClick={handleRemoveImage}
									className="absolute top-2 right-2 bg-black bg-opacity-70 text-white p-1 rounded-full hover:bg-opacity-100 transition-all"
								>
									<X size={15} />
								</button>
							</div>
						</div>
					)}

					<button
						type="submit"
						disabled={isLoading}
						className="w-full bg-[#F17228] cursor-pointer text-white font-bold py-3 sm:py-4 rounded-lg hover:bg-[#d65e1d] transition-all shadow-lg hover:shadow-[#F17228]/50 text-sm sm:text-base flex items-center justify-center"
					>
						{isLoading ? (
							<TailSpin
								height="28"
								width="28"
								color="#ffffff"
                ariaLabel="loading"
                wrapperClass=""
								radius="1"
								visible={true}
							/>
						) : (
							"Become a Partner"
						)}
					</button>
				</form>
			</div>
		</div>
	);
};

export default Vendorsection;
