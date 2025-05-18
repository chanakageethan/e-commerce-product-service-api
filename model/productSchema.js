const mongoos = require("mongoose");

const ProductsSchema = new mongoos.Schema({
  productName: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
  },
  actualPrice: {
    type: Number,
  },
  oldPrice: {
    type: Number,
  },
  qty: {
    type: Number,
  },
  description: {
    type: String,
  },
  discount: {
    type: Object,
  },
  categoryId: {
    type: Object,
  },
});

module.exports = mongoos.model('products',ProductsSchema);
