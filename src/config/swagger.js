import swaggerJsdoc from "swagger-jsdoc";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routesPath = path.join(__dirname, "../routes");

console.log("🔥 SWAGGER CONFIG LOADED");
console.log("📁 Routes folder:", routesPath);

const routeFiles = fs
  .readdirSync(routesPath)
  .filter((file) => file.endsWith(".js"))
  .map((file) => path.join(routesPath, file));

console.log("📄 Route files:", routeFiles);

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

  apis: routeFiles,
};

const swaggerSpec = swaggerJsdoc(options);

console.log(
  "📚 Swagger paths:",
  Object.keys(swaggerSpec.paths || {})
);

export default swaggerSpec;