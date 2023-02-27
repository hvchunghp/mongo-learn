import mongoose from "mongoose";
import User from "./UserModels/user.schema";
const bcrypt = require("bcrypt");
import jwt from "jsonwebtoken";

const hashPassword = (password) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};
const handleCreateNewUserService = async (body) => {
  const response = {
    statusCode: 200,
    message: "Create user success",
    data: {},
  };
  try {
    const existUSer = await User.findOne({
      phoneNumber: body.phoneNumber,
    });
    if (existUSer) {
      return {
        statusCode: 404,
        message: "Phone number already exist in system",
      };
    }

    const user = await new User({
      _id: mongoose.Types.ObjectId(),
      name: body.name,
      age: body.age,
      phoneNumber: body.phoneNumber,
      password: hashPassword(body.password),
      address: body.address,
    });
    await User.create(user);
    const { name, age, phoneNumber, address } = user;
    response.data = {
      user: {
        name,
        age,
        phoneNumber,
        address,
      },
    };
  } catch (error) {
    response.statusCode = 500;
    response.message = "error";
  }
  return response;
};
const handleLoginService = async (body) => {
  const { phoneNumber, password } = body;
  const res = {
    statusCode: 200,
    message: "Login success",
  };
  try {
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return { statusCode: 404, message: "user not exist" };
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return {
        statusCode: 404,
        message: "Wrong passowrd",
      };
    }

    const jwtToken = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        phoneNumber: user.phoneNumber,
        address: user.address,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: 60,
      }
    );
    res.data = {
      accessToken: jwtToken,
      user: {
        name: user.name,
        phoneNumber,
        age: user.age,
        address: user.address,
      },
    };
  } catch (error) {
    res.statusCode = 500;
    res.message = error.message;
  }
  return res;
};
const handleChangePasswordService = async (req) => {
  const res = {
    statusCode: 200,
    message: "change password success",
    data: {},
  };

  try {
    let { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);
    if (user && !bcrypt.compareSync(oldPassword, user.password)) {
      return {
        statusCode: 500,
        message: "Old password incorrect",
      };
    }

    const newData = await User.findOneAndUpdate(
      {
        _id: req.user._id,
      },
      {
        $set: {
          password: hashPassword(newPassword),
        },
      }
    );
    const { name, age, phoneNumber, address, isDeleted } = newData;
    res.data = {
      name,
      age,
      phoneNumber,
      address,
      isDeleted,
    };
  } catch (error) {
    res.statusCode = 500;
    res.message = error.message;
  }
  return res;
};
const handleDeleteUserService = async (body) => {
  const res = {
    statusCode: 200,
    message: "Delete user success",
  };
  try {
    await User.findOneAndUpdate(
      {
        _id: body.userId,
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
      message: "Delete user error",
    };
  }
  return res;
};

const handleGetAllUserService = async () => {
  const res = {
    statusCode: 200,
    message: "Get user success",
  };
  try {
    const users = await User.find({
      isDeleted: false,
    }).select("-password");
    res.data = users;
  } catch (error) {
    res = {
      statusCode: 500,
      message: "Get user error",
    };
  }
  return res;
};
module.exports = {
  handleCreateNewUserService,
  handleLoginService,
  handleChangePasswordService,
  handleDeleteUserService,
  handleGetAllUserService,
};
