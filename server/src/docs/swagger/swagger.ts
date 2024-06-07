import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Blackticles ",
      version: "1.0.0",
      description: "A Blog App API Description",
    },
    servers: [
      {
        apis: "http://localhost:5001/",
      },
    ],
  },
  apis: ["../routes/blogRoutes"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
