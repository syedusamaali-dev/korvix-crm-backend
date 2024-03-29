import dotenv from "dotenv";
dotenv.config();

import http from "http";
import { Server } from "socket.io";

import app from "./app.js";
import connectDB from "./config/database.js";
import { socketAuth } from "./middlewares/socketAuth.middleware.js";
import { initializeSocket } from "./utils/socket.js";
const PORT = process.env.PORT || 5000;

await connectDB();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:4200",
    credentials: true,
  },
});
initializeSocket(io);
// Socket authentication
io.use(socketAuth);

// Socket connection
io.on("connection", (socket) => {
  console.log("🔌 Socket connected:", socket.id);
  console.log("👤 User:", socket.user.firstName, socket.user.lastName);

  // Join user's private room
  const userRoom = `user:${socket.user._id}`;

  socket.join(userRoom);

  console.log(`🏠 User joined room: ${userRoom}`);

  socket.on("disconnect", () => {
    console.log("🔌 Socket disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Korvix CRM running on port ${PORT}`);
});
