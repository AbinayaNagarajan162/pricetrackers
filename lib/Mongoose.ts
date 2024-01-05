import mongoose from 'mongoose';
let isConnected = false;

export const connectTodb = async ()=> {
    mongoose. set('strictQuery', true);
    if(!process. env.MONGODB_URL ) return console.log("Mongo DB URL is not defined");

    if(isConnected) return console.log("Using existing database connection");

    try {
        await mongoose.connect(process.env.MONGODB_URL);
        isConnected = true;
        console.log("Mongo Db is connected");

        
    } catch (error) {
        console.log(error);
        
    }

}

