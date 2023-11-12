const User = require("../models/user.model");
const mongoose = require("mongoose");
const config = require("../config");
const ApiError = require("../api-error");
exports.register = async (req, res, next) => {
  try {   
    const { phoneNumber,name,  address, password } = req.body;
    if (!(name && phoneNumber && password && address)) {
      return res.status(401).send({ error: "Nhập đầy đủ thong tin " });
    }
    const phoneValid = await User.findOne({ phoneNumber });
    if (phoneValid) {
      return res.status(401).send({ error: "Tài khoản đã tồn tại" });
    }
    const user = new User(req.body);
    await user.save();
    res.status(201).send({ user });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { phoneNumber, password } = req.body;
    if (!(phoneNumber && password)) {
      return res
        .status(401)
        .send({ error: "Nhập đầy đủ tài khoản và mật khẩu" });
    }
    const user = await User.login(phoneNumber, password);
    if (user == "error") {
      return res
        .status(401)
        .send({ error: "Tài khoản hoặc mật khẩu không chính xác" });
    }
    const token = await user.generateAuthToken(user);
    res.send( token );
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.loginAd = async (req, res, next) => {
  try {
    const { phoneNumber, password } = req.body;
    if (!(phoneNumber && password)) {
      return res
        .status(401)
        .send({ error: "Nhập đầy đủ tài khoản và mật khẩu" });
    }
    const user = await User.loginAd(phoneNumber, password);
    if (user == "error") {
      return res
        .status(401)
        .send({ error: "Tài khoản hoặc mật khẩu không chính xác" });
    }
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.listUsers = async(req, res, next) => {
  try{
    if(req.query.page){
      const limit = 10;
      const page = req.query.page;
      const users = await User.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
      const count = await User.countDocuments()
      const totalPages = Math.ceil( count/limit);
      res.status(200).send({users, totalPages:totalPages, currentPage:page });
    }
    else{
      const users = await User.find()
      res.status(200).send(users);
    }
  } catch(error) {
      return next( new ApiError(400,error))
  }
};


