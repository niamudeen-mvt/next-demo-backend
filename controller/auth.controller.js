const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const TOKEN_DETAILS = require("../config/index");

const register = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    } else {
      const { username, email, phone, password, isAdmin } = req.body;

      const userExist = await User.findOne({ email });

      if (userExist) {
        return res.status(400).send({ message: "email already exists" });
      }

      const userCreated = await User.create({
        username,
        email,
        phone,
        password,
        isAdmin,
      });

      res.status(201).send({
        success: true,
        data: userCreated,
        message: "user registred successfully",
      });
    }
  } catch (error) {
    console.log(error, "error");
    res.status(500).send({ msg: error });
  }
};

const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    } else {
      const { email, password } = req.body;

      const userExist = await User.findOne({ email });
      if (!userExist) {
        return res.status(400).send({
          message: "Invalid Credentials",
        });
      }

      const isPasswordMatch = await bcrypt.compare(
        password,
        userExist.password
      );

      const payload = {
        userId: userExist._id.toString(),
      };

      // json web token
      const token = jwt.sign(payload, TOKEN_DETAILS.JWT_SECRET_KEY, {
        expiresIn: TOKEN_DETAILS.ACCESS_TOKEN_EXPIRATION_TIME,
      });

      // refresh token

      const refresh_token = jwt.sign(
        payload,
        TOKEN_DETAILS.REFRESH_SECRET_KEY,
        {
          expiresIn: TOKEN_DETAILS.REFRESH_TOKEN_EXPIRATION_TIME,
        }
      );

      // setting refresh token in cookie
      res.cookie("refresh_token", refresh_token, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        expire: 7 * 24 * 60 * 60 * 1000,
      });

      if (isPasswordMatch) {
        res.status(200).send({
          success: true,
          access_token: token,
          message: "user login successfully",
          userId: userExist._id.toString(),
        });
      } else {
        return res.status(401).send({
          message: "Invalid email or passoword",
        });
      }
    }
  } catch (error) {
    res.status(500).send({ msg: error });
  }
};

const userDetails = async (req, res) => {
  try {
    const userExist = await User.findById({ _id: req.user.userId });
    if (!userExist) {
      return res.status(400).send({
        message: "User not found",
      });
    } else {
      res.status(200).send({
        success: true,
        user: userExist,
        message: "user found successfully",
      });
    }
  } catch (error) {
    console.log(error, "error");
    res.status(500).send({ msg: error });
  }
};

const refreshToken = async (req, res) => {
  try {
    const cookies = req.cookies;

    if (!cookies?.refresh_token)
      return res.status(401).json({ message: "Unauthorized" });

    const refreshToken = cookies.refresh_token;

    jwt.verify(
      refreshToken,
      TOKEN_DETAILS.REFRESH_SECRET_KEY,
      async (err, decoded) => {
        if (err) return res.status(403).json({ message: "Forbidden" });

        // generating new access token if refresh token is valid

        const accessToken = jwt.sign(
          {
            userId: decoded.userId.toString(),
          },
          TOKEN_DETAILS.JWT_SECRET_KEY,
          {
            expiresIn: TOKEN_DETAILS.ACCESS_TOKEN_EXPIRATION_TIME,
          }
        );

        // setting new cookie
        res.cookie("refresh_token", refreshToken, {
          httpOnly: true,
          sameSite: "None",
          secure: true,
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
          access_token: accessToken,
          message: "new token generated successfully",
        });
      }
    );
  } catch (error) {
    return res.status(400).send({ message: "invalid token" });
  }
};

const logout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies.refresh_token) return res.sendStatus(204);

  res.clearCookie("refresh_token", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });

  res.json({ message: "cookie cleared" });
};

module.exports = { login, register, userDetails, refreshToken, logout };
