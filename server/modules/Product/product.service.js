import mongoose from "mongoose";
import Product from "./ProductModels/product.schema";
import Category from "../Category/CategoryModels/category.schema";

const handleCreateProductService = async (body) => {
  const res = {
    statusCode: 201,
    message: "create product success",
    data: {},
  };
  try {
    const { name, category, cost, description } = body;
    const product = new Product({
      _id: mongoose.Types.ObjectId(),
      name,
      category,
      cost,
      description,
    });
    await Product.create(product);
    const result = await Product.findById(product._id).populate("category");

    res.data = {
      product: result,
    };
  } catch (error) {
    res = {
      statusCode: 500,
      message: "Create product error",
    };
  }
  return res;
};
const handleGetAllProductService = async (req) => {
  const res = {
    statusCode: 200,
    message: "get all product success",
    data: {},
  };
  try {
    let products;
    if (!req.query.categoryId) {
      products = await Category.aggregate([
        { $match: { isDeleted: false } },
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "category",
            as: "productDetail",
          },
        },
      ]);
    }
    if (req.query.categoryId) {
      products = await Category.aggregate([
        {
          $match: {
            isDeleted: false,
            _id: mongoose.Types.ObjectId(req.query.categoryId),
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "category",
            as: "productDetail",
          },
        },
      ]);
    }
    res.data = {
      products,
    };
  } catch (error) {
    res = {
      statusCode: 500,
      message: error.message,
    };
  }
  return res;
};
module.exports = {
  handleCreateProductService,
  handleGetAllProductService,
};
