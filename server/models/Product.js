const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: [{ type: String, required: true }],
    price: { type: Number, required: true },
    images: [{ type: String, required: true }],
    category: {
      type: String,
      required: true,
    },
    subCategory: { type: String, required: true },
    countInStock: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0 },
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: Number,
        comment: String,
        userName: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
    numReviews: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    timesCarted: { type: Number, default: 0 },
    colors: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
