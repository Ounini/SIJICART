const Product = require("../models/Product");
const User = require("../models/User");
const { cloudinary } = require("../middlewares/cloudinaryMiddleware");

const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      category,
      subCategory,
      countInStock,
      rating,
      formerPrice,
    } = req.body;

    const description = JSON.parse(req.body.description);
    const colors = JSON.parse(req.body.colors);

    const uploadToCloudinary = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "auto" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url);
          }
        );
        stream.end(fileBuffer);
      });
    };

    // Upload all files
    const uploadedImages = await Promise.all(
      req.files.map((file) => uploadToCloudinary(file.buffer))
    );

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      subCategory,
      countInStock,
      images: uploadedImages,
      rating,
      colors,
      formerPrice,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const updateProduct = async (req, res) => {
  const id = req.params.id;
  console.log(id, req.body);
  try {
    const {
      name,
      description,
      category,
      subCategory,
      price,
      formerPrice,
      countInStock,
      rating,
    } = req.body;

    console.log(req.body);
    const colors = JSON.parse(req.body.colors);

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        category,
        subCategory,
        price,
        formerPrice,
        colors,
        countInStock,
        rating,
      },
      { new: true }
    );
    res.status(200).json("Product Successfully updated", updatedProduct);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getProductByCategory = async (req, res) => {
  try {
    const { category, subCategory } = req.query;

    let filter = {};
    if (category)
      filter.category = { $regex: new RegExp(`^${category}$`, "i") };
    if (subCategory)
      filter.subCategory = { $regex: new RegExp(`^${subCategory}$`, "i") };

    const products = await Product.find(filter);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

const incrementCarted = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndUpdate(
      id,
      { $inc: { timesCarted: 1 } },
      { new: true }
    );
    res.status(200).json("Carted Increased");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const incrementView = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true });
    res.status(200).json("View Added");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPopularProducts = async (req, res) => {
  try {
    const popular = await Product.find().sort({ timesCarted: -1 }).limit(4);

    res.status(200).json(popular);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getViewedProducts = async (req, res) => {
  try {
    const viewed = await Product.find().sort({ views: -1 });

    res.status(200).json(viewed);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addReviewsToProduct = async (req, res) => {
  const { rating, comment, userId } = req.body;
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) return res.status(404).json({ message: "Product not found" });

  const alreadyReviewed = product.reviews.find(
    (r) => r.user.toString() === userId.toString()
  );
  if (alreadyReviewed)
    return res.status(400).json({ message: "Already Reviewed" });

  const userName = await User.findById(userId);

  const review = {
    user: userId,
    userName: userName.name,
    rating: Number(rating),
    comment,
  };
  product.reviews.push(review);

  product.numReviews = product.reviews.length;
  product.rating =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save();
  res.status(201).json({ message: "Review added", product });
};

module.exports = {
  createProduct,
  getProducts,
  deleteProduct,
  getProductById,
  getProductByCategory,
  updateProduct,
  incrementCarted,
  incrementView,
  getViewedProducts,
  getPopularProducts,
  addReviewsToProduct,
};
