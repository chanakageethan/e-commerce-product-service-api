const { request, response } = require("express");
const CountrySchema = require("../model/CountrySchema");
const productSchema = require("../model/productSchema");

//Save (POST)
const createProduct = async (request, response) => { 
  try {
    const {
      productName,
      file,
      actualPrice,
      oldPrice,
      qty,
      description,
      discount,
      categoryId,
    } = request.body;

    if (
      !productName ||
      !file ||
      !actualPrice ||
      !oldPrice ||
      !qty ||
      !description ||
      !discount ||
      !categoryId
    ) {
      return response
        .status(400)
        .json({ code: 400, message: "Some fields are missing", data: null });
    }

    const country = new productSchema({
      productName: productName,
      images: [
        {
          hash: "Temp Hash",
          resourceUrl:
            "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fprofile&psig=AOvVaw1dL2XK2h1UXCRNO8mBCy_R&ust=1746686162496000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJjNsJXfkI0DFQAAAAAdAAAAABAE",
          fileName: "Temp File Name",
          directory: "Temp Directory",
        },
      ],
      actualPrice: actualPrice,
      oldPrice: oldPrice,
      qty: qty,
      description: description,
      discount: discount,
      categoryId: categoryId,
    });

    const saveData = await country.save();

    return response.status(201).json({
      code: 201,
      message: "Product has been saved...",
      data: saveData,
    });
  } catch (e) {
    response
      .status(500)
      .json({ code: 500, message: "something went wrong", data: e });
  }
};

//update(PUT)
const updateProduct = async (request, response) => {
  try {
    const {
      productName,
      actualPrice,
      oldPrice,
      qty,
      description,
      discount,
      categoryId,
    } = request.body;

    if (
      !productName ||
      !actualPrice ||
      !oldPrice ||
      !qty ||
      !description ||
      !discount ||
      !categoryId
    ) {
      return response
        .status(400)
        .json({ code: 400, message: "Some fields are missing", data: null });
    }

    const updateData = await   productSchema.findOneAndUpdate(
      { _id: request.params.id },
      {
        $set: {
          productName:productName,
          countryName: countryName,
          actualPrice: actualPrice,
          oldPrice: oldPrice,
          qty: qty,
          description: description,
          discount: discount,
          categoryId: categoryId,
        },
      },
      { new: true }
    );

    return response.status(200).json({
      code: 200,
      message: "Product has been updated...",
      data: updateData,
    });
  } catch (e) {
    response
      .status(500)
      .json({ code: 500, message: "something went wrong", data: e });
  }
};

//delete (DELETE)
const deleteProduct = async (request, response) => {
  try {
    if (!request.params.id) {
      return response
        .status(400)
        .json({ code: 400, message: "Some fields are missing", data: null });
    }

    const deletedData = await productSchema.findOneAndDelete({
      _id: request.params.id,
    });

    return response.status(204).json({
      // 204 means No content
      code: 204,
      message: "Product has been deleted...",
      data: deletedData,
    });
  } catch (e) {
    response
      .status(500)
      .json({ code: 500, message: "something went wrong", data: e });
  }
};

//find by id (GET)
const findProductById = async (request, response) => {
  try {
    if (!request.params.id) {
      return response
        .status(400)
        .json({ code: 400, message: "Some fields are missing", data: null });
    }

    const productData = await productSchema.findById({
      _id: request.params.id,
    });

    if (productData) {
      return response.status(200).json({
        code: 200,
        message: "Product data found",
        data: productData,
      });
    }

    return response.status(404).json({
      code: 404,
      message: "Product data not found",
      data: null,
    });
  } catch (e) {
    response
      .status(500)
      .json({ code: 500, message: "something went wrong", data: e });
  }
};

//find all (GET)
const findAllProducts = async (request, response) => {
  try {
    const { searchText, page = 1, size = 10 } = request.query;
    const pageIndex = parseInt(page);
    const pageSize = parseInt(size);

    const query = {};

    if (searchText) {
      query.$text = { $search: searchText };
    }

    const skip = (pageIndex - 1) * pageSize;
    const productList = await productSchema.find(query)
      .limit(pageSize)
      .skip(skip);

    const productListCount = await productSchema.countDocuments(query);

    return response.status(200).json({
      code: 200,
      message: "product data ..",
      data: { list: productList, dataCount: productListCount },
    });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ code: 500, message: "something went wrong", data: error });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  findProductById,
  findAllProducts,
};
