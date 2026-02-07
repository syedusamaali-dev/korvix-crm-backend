import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import customerRoutes from "./routes/customer.routes.js";
import companyRoutes from "./routes/company.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import leadRoutes from "./routes/lead.routes.js";

import dealRoutes from "./routes/deal.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import taskRoutes from "./routes/task.routes.js";
import activityRoutes from "./routes/activity.routes.js";
import notificationRoutes from "./routes/notification.routes.js";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
const app = express();
// Options to load Swagger UI CSS/JS from CDN for Vercel compatibility
const swaggerOptions = {
  customCssUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.18.3/swagger-ui.min.css",
  customJs: [
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.18.3/swagger-ui-bundle.js",
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.18.3/swagger-ui-standalone-preset.js",
  ],
};
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerOptions));

app.use(cors());

app.use(helmet());

app.use(compression());

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/deals", dealRoutes);

app.use("/api/dashboard", dashboardRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/notifications", notificationRoutes);

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Korvix CRM API</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
      <style>
        body { background: #0f172a; color: #f8fafc; font-family: system-ui, sans-serif; min-height: 100vh; display: flex; align-items: center; }
        .card { background: #1e293b; border: 1px solid #334155; border-radius: 12px; }
        .badge-status { background: #10b981; color: #022c22; font-weight: 600; }
        .badge-tech { background: #334155; color: #38bdf8; margin-right: 6px; font-weight: 500; }
        .btn-swagger { background: #6366f1; color: #fff; font-weight: 600; border: none; }
        .btn-swagger:hover { background: #4f46e5; color: #fff; }
      </style>
    </head>
    <body>
      <div class="container my-5">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="card p-4 p-md-5 shadow-lg">
              
              <!-- Header -->
              <div class="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h1 class="h2 fw-bold text-white mb-1">🚀 Korvix CRM API</h1>
                  <p class="text-secondary mb-0">Modern Enterprise CRM System</p>
                </div>
                <span class="badge badge-status px-3 py-2 rounded-pill">● System Operational</span>
              </div>

              <p class="lead text-light fs-6">
                A scalable, enterprise-grade Customer Relationship Management platform built with Angular and Node.js. Designed around modular clean architecture, high performance, and enterprise security standards.
              </p>

              <!-- Tech Stack Badges -->
              <div class="my-3">
                <span class="badge badge-tech py-2 px-3">Node.js</span>
                <span class="badge badge-tech py-2 px-3">Express</span>
                <span class="badge badge-tech py-2 px-3">MongoDB</span>
                <span class="badge badge-tech py-2 px-3">Angular</span>
                <span class="badge badge-tech py-2 px-3">Vercel Serverless</span>
              </div>

              <hr class="border-secondary my-4">

              <!-- Module Overview Grid -->
              <h5 class="fw-bold mb-3 text-white">Active Backend Modules</h5>
              <div class="row g-2 mb-4 fs-7 text-secondary">
                <div class="col-6 col-md-4">✓ Authentication</div>
                <div class="col-6 col-md-4">✓ Customer Management</div>
                <div class="col-6 col-md-4">✓ Company Directory</div>
                <div class="col-6 col-md-4">✓ Contacts & Leads</div>
                <div class="col-6 col-md-4">✓ Deals & Pipeline</div>
                <div class="col-6 col-md-4">✓ Dashboard Analytics</div>
                <div class="col-6 col-md-4">✓ Tasks & Activities</div>
                <div class="col-6 col-md-4">✓ Notifications</div>
                <div class="col-6 col-md-4">✓ Swagger Specs</div>
              </div>

              <!-- Action Callouts -->
              <div class="d-flex flex-column flex-sm-row gap-3 mt-2">
                <a href="/api-docs" class="btn btn-swagger px-4 py-2 rounded-3 text-center">
                  📖 Explore Interactive Swagger Docs
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `);
});

export default app;
