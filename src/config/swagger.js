import swaggerJsdoc from "swagger-jsdoc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Korvix CRM API",
      version: "1.0.0",
      description:
        "REST API documentation for Korvix CRM - an enterprise CRM platform.",
    },

    servers: [
      {
        url: "http://localhost:5000",
        description: "Local development server",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },

  apis: [
    path.join(__dirname, "../routes/auth.routes.js"),
    path.join(__dirname, "../routes/activity.routes.js"),
    path.join(__dirname, "../routes/company.routes.js"),
    path.join(__dirname, "../routes/contact.routes.js"),
    path.join(__dirname, "../routes/customer.routes.js"),
    path.join(__dirname, "../routes/dashboard.routes.js"),
    path.join(__dirname, "../routes/deal.routes.js"),
    path.join(__dirname, "../routes/lead.routes.js"),
    path.join(__dirname, "../routes/notification.routes.js"),
    path.join(__dirname, "../routes/task.routes.js"),
  ],
};

const swaggerSpec = swaggerJsdoc(options);

console.log("Swagger paths:", Object.keys(swaggerSpec.paths || {}));

export default swaggerSpec;
