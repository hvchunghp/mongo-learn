import mongoose from "mongoose";
import Category from "../Category/CategoryModels/category.schema";

const handleCreateNewCategoryService = async (body) => {
  const res = {
    statusCode: 201,
    message: "create category success",
  };
  try {
    const existCategory = await Category.findOne({
      name: body.name,
    });
    if (existCategory) {
      return {
        statusCode: 500,
        message: "Category existed",
      };
    }
    const category = new Category({
      _id: mongoose.Types.ObjectId(),
      name: body.name,
      description: body.description,
    });
    Category.create(category);
    res.data = {
      category,
    };
  } catch (error) {
    res = {
      statusCode: 500,
      message: error.message,
    };
  }
  return res;
};
const handleGetAllCategoryService = async () => {
  const res = {
    statusCode: 200,
    message: "get category success",
  };
  try {
    const category = await Category.find({
      isDeleted: false,
    });
    res.data = category;
  } catch (error) {
    res = {
      statusCode: 500,
      message: error.message,
    };
  }
  return res;
};
const handleUpdateCategoryService = async (body) => {
  const res = {
    statusCode: 201,
    message: "Update category success",
  };
  const { _id, name, description } = body;
  try {
    const category = await Category.findOneAndUpdate(
      {
        _id,
      },
      {
        $set: {
          name,
          description,
        },
      }
    );
    res.data = {
      _id,
      name,
      description,
    };
  } catch (error) {
    res = {
      statusCode: 500,
      message: error.message,
    };
  }
  return res;
};
const handleDeleteCategoryService = async (body) => {
  const res = {
    statusCode: 201,
    message: "delete category success",
  };
  try {
    await Category.findOneAndUpdate(
      {
        _id: body._id,
      },
      {
        $set: {
          isDeleted: true,
        },
      }
    );
  } catch (error) {
    res = {
      statusCode: 500,
      message: "delete category error",
    };
  }
  return res;
};
module.exports = {
  handleCreateNewCategoryService,
  handleGetAllCategoryService,
  handleUpdateCategoryService,
  handleDeleteCategoryService,
};
