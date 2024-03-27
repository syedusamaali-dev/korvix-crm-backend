import dotenv from "dotenv";
dotenv.config();

import http from "http";
import { Server } from "socket.io";

import app from "./app.js";
import connectDB from "./config/database.js";
import { socketAuth } from "./middleware/socketAuth.middleware.js";

const PORT = process.env.PORT || 5000;

await connectDB();

// Create HTTP server
const server = http.createServer(app);

// Create Socket.IO server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:4200",
    credentials: true,
  },
});

// Socket authentication
io.use(socketAuth);


// Socket connection
io.on("connection", (socket) => {
  console.log("🔌 Socket connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔌 Socket disconnected:", socket.id);
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Korvix CRM running on port ${PORT}`);
});