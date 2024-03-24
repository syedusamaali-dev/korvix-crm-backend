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

const app = express();

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
  res.json({
    success: true,
    message: "Welcome to Korvix CRM API",
  });
});

export default app;
