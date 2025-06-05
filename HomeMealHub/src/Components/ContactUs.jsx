import React, { useEffect,useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";

const ContactUs = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		const formData = new FormData(e.target);
		const formParams = new URLSearchParams(formData).toString();

		try {
			const res = await fetch("http://localhost:8000/api/contacts", {
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: formParams,
			});

			const result = await res.json();
			console.log(result);

			if (res.ok) {
				toast.success(
					"Your Message Has been sent. Our Team will Contact You Soon!"
				);
				e.target.reset();
			} else {
				toast.error("Failed To send Message. Please Try Again later");
			}
		} catch (error) {
			console.error("Submission Error:", error);
			toast.error("Something went wrong while sending your message ");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<section className="bg-[#FFF4ED]">
			<div className="bg-[#F17228] text-white text-center py-20 px-6 shadow-md">
				<ToastContainer
					position="top-right"
					autoClose={3000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="dark"
				/>
				<h2 className="text-5xl font-extrabold tracking-tight">
					Get <span className="text-yellow-300">In Touch</span>
				</h2>
				<p className="mt-4 text-lg max-w-xl mx-auto text-white">
					Drop us a line — whether it's a question, idea, or just to say hi.
					We're all ears.
				</p>
			</div>

			<div className="max-w-6xl mx-auto px-6 py-16">
				<div className="flex flex-col lg:flex-row gap-10 bg-white rounded-2xl p-10 shadow-lg border border-gray-200">
					<div className="flex-1">
						<h3 className="text-2xl font-bold text-[#F17228] mb-6">
							Send Us a Message
						</h3>
						<form className="space-y-6" onSubmit={handleSubmit}>
							<div>
								<label className="block text-gray-700 font-medium mb-1">
									Your Name
								</label>
								<input
									name="name"
									type="text"
									placeholder="John Doe"
									className="w-full border-b border-gray-300 p-2 bg-transparent focus:outline-none focus:border-[#F17228] placeholder:text-gray-500"
									required
								/>
							</div>
							<div>
								<label className="block text-gray-700 font-medium mb-1">
									Your Email
								</label>
								<input
									name="email"
									type="email"
									placeholder="john@example.com"
									className="w-full border-b border-gray-300 p-2 bg-transparent focus:outline-none focus:border-[#F17228] placeholder:text-gray-500"
									required
								/>
							</div>
							<div>
								<label className="block text-gray-700 font-medium mb-1">
									Subject
								</label>
								<input
									name="subject"
									type="text"
									placeholder="Subject"
									className="w-full border-b border-gray-300 p-2 bg-transparent focus:outline-none focus:border-[#F17228] placeholder:text-gray-500"
									required
								/>
							</div>
							<div>
								<label className="block text-gray-700 font-medium mb-1">
									Message
								</label>
								<textarea
									name="message"
									rows="5"
									placeholder="Write your message here ✍️"
									className="w-full border-b border-gray-300 p-2 bg-transparent focus:outline-none focus:border-[#F17228] placeholder:text-gray-500 resize-none"
									required
								></textarea>
							</div>
							<button
								type="submit"
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
									"Send Message"
								)}
							</button>
						</form>
					</div>

					<div className="flex-1 bg-[#FFE2D3] rounded-xl p-5">
						<h3 className="text-2xl font-bold text-[#F17228] mb-4">
							Contact Information
						</h3>
						<p className="text-[#5A341A] mb-6">
							We’d love to hear from you. Reach us anytime!
						</p>
						<div className="space-y-9 text-[#3A1D0F]">
							<div className="flex items-center gap-6">
								<FaPhone className="text-[#F17228]" />
								<span>+91 77777 77777</span>
							</div>
							<div className="flex items-center gap-6">
								<FaEnvelope className="text-[#F17228]" />
								<span>support@homemealhub.com</span>
							</div>
							<div className="flex items-center gap-6">
								<FaMapMarkerAlt className="text-[#F17228]" />
								<span>Nagpur, India</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ContactUs;
