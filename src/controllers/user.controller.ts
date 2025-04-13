import { User } from "../models/user.model";
import { Request, Response } from "express";
import { ApiError } from "../utils/ApiErrors";
import { ApiResponse } from "../utils/ApiResponse";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = async (userId: any): Promise<any> => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token"
    );
  }
};

const registerUser = async (req: Request, res: Response) => {
  // Check if request body exists
  if (!req.body) {
    throw new ApiError(400, "Request body is required");
  }

  const { fullName, userName, email, password } = req.body;

  // Check if all required fields are present
  if (!fullName || !userName || !email || !password) {
    throw new ApiError(
      400,
      "All fields (fullName, userName, email, password) are required"
    );
  }

  // Trim and validate fields
  if (
    [fullName, userName, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields must not be empty");
  }

  const existedUser = await User.findOne({
    $or: [{ userName }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  const user = await User.create({
    //creates and saves
    fullName,
    userName: userName.toLowerCase(),
    email: email.toLowerCase(),
    password,
  });

  const createdUser = {
    fullName,
    userName: user.userName,
    email: user.email,
  };

  res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
};

const loginUser = async (req: Request, res: Response) => {
  //req body -> data
  //username or email
  //find the user
  //password check
  //access and refresh token
  //send cookie
  const { userName, email, password } = req.body;

  if (!userName || !email) {
    throw new ApiError(400, "Username or email is required");
  }

  const user = await User.findOne({
    $or: [{ email }, { userName }],
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const parsedUser = {
    _id: user._id,
    fullName: user.fullName,
    userName: user.userName,
    email: user.email,
    avatar: user.avatar,
  };

  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: parsedUser,
          accessToken,
          refreshToken
        },
        "User logged in successfully"
      )
    );
};

export { registerUser, loginUser };
