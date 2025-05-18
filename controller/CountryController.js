const { request, response } = require("express");
const CountrySchema = require("../model/CountrySchema");

//Save (POST)
const createCountry = async (request, response) => {
  try {
    const { countryName, countryCode , file } = request.body;

    if (!countryName || !countryCode) {
      return response
        .status(400)
        .json({ code: 400, message: "Some fields are missing", data: null });
    }

    const country = new CountrySchema({
      countryName: countryName,
      flag: {
        hash: "Temp Hash",
        resourceUrl:
          "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fprofile&psig=AOvVaw1dL2XK2h1UXCRNO8mBCy_R&ust=1746686162496000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJjNsJXfkI0DFQAAAAAdAAAAABAE",
        fileName: "Temp File Name",
        directory: "Temp Directory",
      },
      countryCode: countryCode,
    });

    const saveData = await country.save();

    return response.status(201).json({
      code: 201,
      message: "Country has been saved...",
      data: saveData,
    });
  } catch (e) {
    response
      .status(500)
      .json({ code: 500, message: "something went wrong", data: e });
  }
};

//update(PUT)
const updateCountry = async (request, response) => {
  try {
    const { countryName, countryCode } = request.body;

    if (!countryName || !countryCode) {
      return response
        .status(400)
        .json({ code: 400, message: "Some fields are missing", data: null });
    }

    const updateData = await CountrySchema.findOneAndUpdate(
      { _id: request.params.id },
      {
        $set: {
          countryName: countryName,
          countryCode:countryCode
        },
      },
      { new: true }
    );

    return response.status(200).json({
      code: 200,
      message: "Country has been updated...",
      data: updateData,
    });
  } catch (e) {
    response
      .status(500)
      .json({ code: 500, message: "something went wrong", data: e });
  }
};

//delete (DELETE)
const deleteCountry = async (request, response) => {
  try {
    if (!request.params.id) {
      return response
        .status(400)
        .json({ code: 400, message: "Some fields are missing", data: null });
    }

    const deletedData = await CountrySchema.findOneAndDelete({
      _id: request.params.id,
    });

    return response.status(204).json({
      // 204 means No content
      code: 204,
      message: "Country has been deleted...",
      data: deletedData,
    });
  } catch (e) {
    response
      .status(500)
      .json({ code: 500, message: "something went wrong", data: e });
  }
};

//find by id (GET)
const findCountryById = async (request, response) => {
  try {
    if (!request.params.id) {
      return response
        .status(400)
        .json({ code: 400, message: "Some fields are missing", data: null });
    }

    const countryData = await CountrySchema.findById({
      _id: request.params.id,
    });

    if (countryData) {
      return response.status(200).json({
        code: 200,
        message: "Country data found",
        data: countryData,
      });
    }

    return response.status(404).json({
      code: 404,
      message: "Country data not found",
      data: null,
    });
  } catch (e) {
    response
      .status(500)
      .json({ code: 500, message: "something went wrong", data: e });
  }
};

//find all (GET)
const findAllCountries = async(request, response) => {
  try {
    const { searchText, page = 1, size = 10 } = request.query;
    const pageIndex = parseInt(page);
    const pageSize = parseInt(size);

    const query = {};

    if (searchText) {
      query.$text = { $search: searchText };
    }

    const skip = (pageIndex - 1) * pageSize;
    const countryList = await CountrySchema.find(query).limit(pageSize).skip(skip);

    const countryListCount = await CountrySchema.countDocuments(query);

    return response.status(200).json({
      code: 200,
      message: "country data ..",
      data: { list: countryList, dataCount: countryListCount },
    });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ code: 500, message: "something went wrong", data: error });
  }
};

module.exports = {
  createCountry,
  updateCountry,
  deleteCountry,
  findCountryById,
  findAllCountries,
};
