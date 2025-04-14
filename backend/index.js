const express = require("express");
const { PORT } = require("./constants");
const { connectDB } = require("./config/db");
const { userRouter } = require("./routes/user.route");

const cors = require("cors");
const { placeRouter } = require("./routes/place.route");
const { messageRouter } = require("./routes/message.route");
const { hotelRouter } = require("./routes/hotel.route");
const { paymentRouter } = require("./routes/paymentRoutes");
const { bookingRouter } = require("./routes/booking.route");
const { flightRouter } = require("./routes/flight.route");

const app = express();

app.use(express.json());

// Configure CORS
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

// Use CORS with options
app.use(cors(corsOptions));

// app.use(redisMiddleware);

app.get("/", (req, res) => {
  return res.json({ message: "Welcome to the world of Voyawander backend!" });
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/places", placeRouter);
app.use("/api/v1/hotels", hotelRouter);
app.use("/api/v1/flights", flightRouter);
app.use("/api/v1/booking", bookingRouter);
app.use("/api/v1/messages", messageRouter);
app.use("/api/v1/payments", paymentRouter);

app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`\n Server is running on port: http://localhost:${PORT}`);
  } catch (error) {
    console.error("Database connection failed:", error.message);
  }
});
