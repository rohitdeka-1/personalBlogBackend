import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();

// Body parser middleware - must be before routes
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Security middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(helmet());

// Global rate limiter for all routes
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later",
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Stricter limiter for authentication routes
const authLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // limit each IP to 5 requests per hour
    message: "Too many login attempts, please try again later",
    standardHeaders: true,
    legacyHeaders: false,
});

// Apply rate limiters
app.use(globalLimiter); // Apply to all routes

// Export the authLimiter for use in auth routes
export { authLimiter };

import authRoute from "./routes/user.routes";
app.use("/api/v1/auth",authRoute);


export default app;
