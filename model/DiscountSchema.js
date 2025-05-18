const mongoos = require("mongoose");

const DiscountSchema = new mongoos.Schema({
  discountName: {
    type: String,
    required: true,
  },
  percentage: {
    type: Number,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  lastUpdate: {
    type: Date,
  },
});

module.exports = mongoos.model("discounts", DiscountSchema);
