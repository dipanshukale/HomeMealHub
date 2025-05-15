import mongoose from "mongoose";
import { config } from "dotenv";


config({ path: "./config.env" });

const url = process.env.ATLAS_DB;


const connectDB = async () => {
	try {
        const mongoURL ="mongodb+srv://dipanshukale2003:gnjOZdfwtznrZNnw@cluster0.yyzjzkw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
		if (!mongoURL) {
			throw new Error(
				"MongoDB URL is undefined. Check your environment variables."
			);
		}
		await mongoose.connect(mongoURL);
		console.log("Connected to MongoDB successfully");
	} catch (error) {
		console.error("MongoDB connection error:", error.message);
		process.exit(1);
	}
};

export default connectDB;
