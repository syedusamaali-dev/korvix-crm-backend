import app from "../app.js";
import connectDB from "../config/database.js";

export default async function handler(req, res) {
  // 1. Ensure DB connects on serverless requests
  await connectDB();

  // 2. Pass request to Express app
  return app(req, res);
}