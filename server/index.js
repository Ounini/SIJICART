require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const helment = require("helmet");
const fs = require("fs");
const path = require("path");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 2468;
const app = express();

const logStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});
app.use((req, res, next) => {
  const now = new Date().toISOString();
  const log = `[${now}] ${req.method} ${req.originalUrl}\n`;
  logStream.write(log);
  console.log(log.trim());
  next();
});

//Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "https://sijicart.vercel.app/",
    ],
    credentials: true,
  })
);
app.use(helment());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.log("Connection Error:", err.message);
    process.exit(1);
  }
};
connectDB();

const productRoutes = require("./routes/product");
const userRoutes = require("./routes/user");
const orderRoutes = require("./routes/order");
const authRoutes = require("./routes/auth");

app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/orders", orderRoutes);
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
