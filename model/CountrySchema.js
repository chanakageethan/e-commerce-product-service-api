const mongoos = require("mongoose");

const CountrySchema = new mongoos.Schema({
  countryName: {
    type: String,
    required: true,
  },
  countryCode: {
    type: String,
  },
  flag: {
    type: Object,
  },
});

module.exports = mongoos.model('countries',CountrySchema);
