let io;

export const initializeSocket = (socketIO) => {
  io = socketIO;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.IO has not been initialized.");
  }

  return io;
};

export const emitToUser = (userId, event, data) => {
  if (!io) {
    throw new Error("Socket.IO has not been initialized.");
  }

  io.to(`user:${userId}`).emit(event, data);
};