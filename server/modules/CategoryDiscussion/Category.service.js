import mongoose from "mongoose";
import Category from "./Category.schema";

const handleCreateNewCategoryService = async (body) => {
  const res = {
    statusCode: 201,
    message: "Create category success",
  };
  try {
    const checkExist = await Category.findOne({
      name: body.name,
    });
    if (checkExist) {
      return {
        statusCode: 500,
        message: "Create category error",
      };
    }
    const category = await new Category({
      _id: mongoose.Types.ObjectId(),
      name: body.name,
      isPinned: body.isPinned,
    });
    Category.create(category);
    res.data = { category };
  } catch (error) {
    res = {
      statusCode: 500,
      message: "Create category error",
    };
  }
  return res;
};

const handleGetAllCategoryService = async () => {
  const res = {
    statusCode: 200,
    message: "Get all category success",
  };
  try {
    const categories = await Category.find({
      isDeleted: false,
    });
    res.data = { categories };
  } catch (error) {
    res = {
      statusCode: 500,
      message: "Get all category error",
    };
  }
  return res;
};

const handleDeleteCategoryService = async (body) => {
  const res = {
    statusCode: 200,
    message: "Delete category success",
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
      message: "Delete category error",
    };
  }
  return res;
};

const handleUpdateCategoryService = async (body) => {
  const res = {
    statusCode: 200,
    message: "Update category success",
  };
  try {
    await Category.findOneAndUpdate(
      {
        _id: body._id,
      },
      {
        $set: {
          name: body.name,
        },
      }
    );
    const category = await Category.findById(body._id);
    res.data = { category };
  } catch (error) {
    res = {
      statusCode: 500,
      message: "Update category error",
    };
  }
  return res;
};

module.exports = {
  handleCreateNewCategoryService,
  handleGetAllCategoryService,
  handleDeleteCategoryService,
  handleUpdateCategoryService,
};
