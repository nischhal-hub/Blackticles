import express from "express";
import { config } from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import blogRoutes from "./routes/blogRoutes.js";
import { connectDB } from "./data/database.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./docs/swagger/swagger.js";

config({
  path: "./.env",
});

const app = express();

//using middlewares
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));

// using Routes
app.use("/api/blogs", blogRoutes);

await connectDB();

const Port = process.env.PORT || 5000;

app.listen(Port, () => {
  console.log(`Server is working in port: ${Port}`);
});
