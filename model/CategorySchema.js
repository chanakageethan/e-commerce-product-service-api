const mongoos = require("mongoose");

const CaregorySchema = new mongoos.Schema({
  categoryName: {
    type: String,
    required: true,
  },
  icon: {
    type: Object,
  },
  availableCountries: {
    type: Array,
  },
});

module.exports = mongoos.model('category',CaregorySchema);
