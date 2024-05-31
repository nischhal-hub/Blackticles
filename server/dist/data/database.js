import mongoose from "mongoose";
export const connectDB = async () => {
    const mongoUrl = process.env.MONGO_URL;
    mongoose
        .connect(mongoUrl, {
        dbName: "BlackTickles",
    })
        .then(() => {
        console.log("Database Connected Successfully");
    })
        .catch((err) => {
        console.log(err);
    });
};
