const { request, response } = require("express");
const CategorySchema = require("../model/CategorySchema");

//Save (POST)
const createCategory = async (request, response) => {
  try {
    const { categoryName, availableCountries } = request.body;

    if (!categoryName || !availableCountries) {
      return response
        .status(400)
        .json({ code: 400, message: "Some fields are missing", data: null });
    }

    const category = new CategorySchema({
      categoryName: categoryName,
      icon: {
        hash: "Temp Hash",
        resourceUrl:
          "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fprofile&psig=AOvVaw1dL2XK2h1UXCRNO8mBCy_R&ust=1746686162496000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJjNsJXfkI0DFQAAAAAdAAAAABAE",
        fileName: "Temp File Name",
        directory: "Temp Directory",
      },
      availableCountries: availableCountries,
    });

    const saveData = await category.save();

    return response.status(201).json({
      code: 201,
      message: "customer has been saved...",
      data: saveData,
    });
  } catch (e) {
    response
      .status(500)
      .json({ code: 500, message: "something went wrong", data: e });
  }
};

//update(PUT)
const updateCategory = async (request, response) => {
  try {
    const { categoryName, availableCountries } = request.body;

    if (!categoryName) {
      return response
        .status(400)
        .json({ code: 400, message: "Some fields are missing", data: null });
    }

    const updateData = await CategorySchema.findOneAndUpdate(
      { _id: request.params.id },
      {
        $set: {
          categoryName: categoryName,
        },
      },
      {new:true}
    );

    return response.status(200).json({
      code: 200,
      message: "customer has been updated...",
      data: updateData,
    });
  } catch (e) {
    response
      .status(500)
      .json({ code: 500, message: "something went wrong", data: e });
  }
};

//delete (DELETE)
const deleteCategory = async (request, response) => {
  try {
    

    if (!request.params.id) {
      return response
        .status(400)
        .json({ code: 400, message: "Some fields are missing", data: null });
    }

    const deletedData = await CategorySchema.findOneAndDelete(
      { _id: request.params.id },
    
    );

    return response.status(204).json({  // 204 means No content
      code: 204,
      message: "customer has been deleted...",
      data: deletedData,
    });
  } catch (e) {
    response
      .status(500)
      .json({ code: 500, message: "something went wrong", data: e });
  }
};

//find by id (GET)
const findCategoryById = (request, response) => {
  console.log(request.body);
};

//find all (GET)
const findAllCategories = (request, response) => {
  console.log(request.body);
};

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  findCategoryById,
  findAllCategories,
};
