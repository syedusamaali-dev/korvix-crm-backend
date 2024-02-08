import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import authRoutes from "./routes/auth.routes.js";
import customerRoutes from "./routes/customer.routes.js";
const app = express();

app.use(cors());

app.use(helmet());

app.use(compression());

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);

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