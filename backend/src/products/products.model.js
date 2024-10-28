const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: String,
    description: String,
    price: {
      // Đã sửa thành "price"
      type: Number,
      required: true,
    },
    oldPrice: Number,
    image: String,
    color: String,
    rating: {
      type: Number,
      default: 0,
    },
    author: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
); // Kích hoạt timestamps để tạo createdAt và updatedAt

const Products = mongoose.model('Products', ProductSchema);

module.exports = Products;
