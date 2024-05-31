import express from "express";
import { config } from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import blogRoutes from "./routes/blogRoutes.js";
import { connectDB } from "./data/database.js";
config({
    path: "./.env",
});
const app = express();
//using middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
const corsOptions = {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
};
app.use(cors(corsOptions));
// using Routes
app.use("/api/blogs", blogRoutes);
//for initial testing
app.get("/", (req, res) => {
    res.send("Hey server working good on 5001");
});
await connectDB();
const Port = process.env.PORT;
app.listen(Port, () => {
    console.log(`Server is working in port: ${Port}`);
});
