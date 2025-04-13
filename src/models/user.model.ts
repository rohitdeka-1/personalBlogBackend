import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import { Iuser } from "../types/dbTypes/userModel.types";
import jwt, { SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
      index: true,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    avatar: {
      type: String,
    },
    accessToken: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware
UserSchema.pre(
  "save",
  async function (
    this: mongoose.Document & Iuser,
    next: mongoose.CallbackWithoutResultAndOptionalError
  ) {
    if (!this.isModified("password")) {
      return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
  }
);

// mongoose instance methods

UserSchema.methods.isPasswordCorrect = async function (
  this: mongoose.Document & Iuser,
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateAccessToken = function () {
  console.log("Generating access token with:", {
    secret: process.env.ACCESS_TOKEN_SECRET,
    expiry: process.env.ACCESS_TOKEN_EXPIRY,
  });
  try {
    jwt.sign(
      {
        _id: this._id,
        email: this.email,
        userName: this.userName,
        fullName: this.fullName,
      },
      process.env.ACCESS_TOKEN_SECRET!,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY!,
      } as jwt.SignOptions
    );
  } catch (error) {
    console.error("Error generating access token:", error);
    throw error;
  }
};

UserSchema.methods.generateRefreshToken = function () {
  try {
    jwt.sign(
      {
        _id: this._id,
      },
      process.env.REFRESH_TOKEN_SECRET!,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY!,
      } as jwt.SignOptions
    );
  } catch (error) {
    console.error("Error generating refresh token:", error);
    throw error;
  }
};

export const User = mongoose.model<Iuser>("User", UserSchema);
