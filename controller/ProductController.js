const Product = require("../models/ProductModel");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Features = require("../utils/Features");

// Create Product
const createProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    res
      .status(404)
      .json({ error: error.message, message: "Can't create product" });
  }
});

// Get All Products
const getAllProducts = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 8;

  const productCount = await Product.countDocuments();

  const feature = new Features(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await feature.query;
  res.status(200).json({
    success: true,
    TotalProduct: products.length,
    products,
  });
});

// Update Product ---Admin
const updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("No product with this id ", 404));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useUnified: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

// Delete Product ---Admin
const deleteProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("No product with this id ", 404));
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product Deleted Successfullly",
  });
});

// Single Product Details
const getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("No product with this id ", 404));
  }

  res.status(200).json({
    success: true,
    product,
    productCount,
  });
});

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
};
