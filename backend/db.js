import { connect } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const mongoURI = process.env.MONGO_URI;

const connectToMongo = () => {
    connect(mongoURI)
    console.log("connected to MongoDB successfully");
}


export default connectToMongo; 