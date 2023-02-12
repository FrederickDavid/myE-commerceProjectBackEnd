const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a name for the product"],
    trim: true,
    maxlength: [20, "Product name can not exceed 20 characters"],
  },

  description: {
    type: String,
    required: [true, "Please add a description of your product"],
    maxlength: [4000, "Description can not exceed more than 4000 characters"],
  },

  price: {
    type: Number,
    required: [true, "Please add the price of your product"],
    maxlength: [8, "Price can not exceed 8 characters"],
  },

  discountPrice: {
    type: String,
    maxlength: [4, "Price can not exceed 4 characters"],
  },

  color: {
    type: String,
  },

  size: {
    type: String,
  },

  ratings: {
    type: Number,
  },

  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],

  category: {
    type: String,
    required: [true, "Please add the category of your product"],
  },

  stock: {
    type: Number,
    required: [true, "Please add some stock of your product"],
    maxlength: [3, "Stock can not exceed 3 characters"],
  },

  numOfReviews: {
    type: Number,
    default: 0,
  },

  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        // required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
      },
      time: {
        type: Date,
        default: Date.now(),
      },
    },
  ],

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    // required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Product", productSchema);
