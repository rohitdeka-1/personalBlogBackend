import express from "express";
import { registerUser,loginUser } from "../controllers/user.controller";
import { authLimiter } from "../app";
import asyncHandler from "../utils/asynchandler";

const authRoute = express.Router(); 
//authRoute = Router() , if import {Router}


// authRoute.route("/register").post(
//     authLimiter,registerUser
// )

authRoute.post("/register", authLimiter ,asyncHandler(registerUser))   // Simple 

// authRoute.route("/register").post(
//     authLimiter,
//     registerUser      // Chainable with other HTTP Methods, not usefull at the moment.
// )



authRoute.post("/login",authLimiter,asyncHandler(loginUser));




export default authRoute;

