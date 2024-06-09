import express from "express";
import { config } from "dotenv";
import cors from "cors";
import blogRoutes from "./routes/blogRoutes.js";
import { connectDB } from "./data/database.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./docs/swagger/swagger.js";
import errorMiddleware from "./middlewares/error-middleware.js";

config({
  path: "./.env",
});

const app = express();
await connectDB();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));

//using middlewares
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/blogs", blogRoutes);
app.use(errorMiddleware);

const Port = process.env.PORT || 5000;

app.listen(Port, () => {
  console.log(`Server is working in port: ${Port}`);
});
