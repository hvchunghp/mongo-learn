import express from "express";
import UserController from "../server/modules/User/user.controller";
import authToken from "../server/modules/middleware/authToken";
import CategoryController from "../server/modules/Category/category.controller";
import ProductController from "../server/modules/Product/product.controller";
import OrderController from "../server/modules/Order/order.controller";
import promotionController from "../server/modules/Promotion/promotion.controller";
import CategoryDiscussionController from "../server/modules/CategoryDiscussion/Category.controller";

const router = express.Router();

const initWebRoutes = (app) => {
  // router.post("/courses", UserController.handleCreateCourse);
  // router.get("/courses", UserController.handleGetCourse);
  // router.post("/singleCourse", UserController.handleGetSingleCourse);
  // router.put("/updateCourse", UserController.handleUpdateCourse);
  // // user
  // router.post("/user", UserController.handleCreateNewUser);
  // router.get("/user", UserController.handleGetSingleUser);
  // // class
  // router.post("/class", ClassController.handleCreateClass);
  // router.put("/deleteClass", ClassController.handleDeleteClass);
  // router.get("/class", ClassController.handleGetClass);

  // user
  router.post("/user/register", UserController.handleCreateNewUser);
  router.post("/user/login", UserController.handleLogin);
  router.put(
    "/user/change-password",
    authToken.verifyToken,
    UserController.handleChangePassword
  );
  router.put("/user/deleteUser", UserController.handleDeleteUser);
  router.get("/user", UserController.handleGetAllUser);

  // category
  router.post("/category/create", CategoryController.handleCreateNewCategory);
  router.get("/category", CategoryController.handleGetAllCategory);
  router.put(
    "/category/updateCategory",
    CategoryController.handleUpdateCategory
  );
  router.put(
    "/category/deleteCategory",
    CategoryController.handleDeleteCategory
  );

  // product
  router.post("/product/create", ProductController.handleCreateProduct);
  router.get("/product", ProductController.handleGetAllProduct);

  //order
  router.post(
    "/order",
    authToken.verifyToken,
    OrderController.handleCreateNewOrder
  );

  //promotion
  router.post("/promotion", promotionController.handleCreateNewPromotion);

  //discussion
  //create category discussion
  router.post(
    "/create-category-discussion",
    CategoryDiscussionController.handleCreateNewCategory
  );
  router.get(
    "/get-category-discussion",
    CategoryDiscussionController.handleGetAllCategory
  );
  router.put(
    "/delete-category-discussion",
    CategoryDiscussionController.handleDeleteCategory
  );

  router.put(
    "/update-category-discussion",
    CategoryDiscussionController.handleUpdateCategory
  );

  return app.use("/api", router);
};

module.exports = initWebRoutes;
