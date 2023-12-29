const express = require("express");
const userRouter = express.Router();
const authControllers = require("../controller/auth.controller");
const { verifyToken } = require("../middleware/auth.middleware");
const {
  validateRegisterSchema,
  validateLoginSchema,
} = require("../middleware/validtion.middleware");

userRouter.route("/refresh-token").get(authControllers.refreshToken);
userRouter
  .route("/register")
  .post(validateRegisterSchema, authControllers.register);
userRouter.route("/login").post(validateLoginSchema, authControllers.login);
userRouter.route("/user").get(verifyToken, authControllers.userDetails);
userRouter.route("/logout").delete(authControllers.logout);

module.exports = userRouter;
