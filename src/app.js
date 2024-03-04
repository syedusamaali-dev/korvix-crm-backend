import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import authRoutes from "./routes/auth.routes.js";
import customerRoutes from "./routes/customer.routes.js";
import companyRoutes from "./routes/company.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import leadRoutes from "./routes/lead.routes.js";
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
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to Korvix CRM API'
    });
});

export default app;