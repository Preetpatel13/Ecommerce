import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiErrors.js"
import { User} from "../models/user.models.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        // Set refreshToken in the user object
        user.refreshToken = refreshToken;

        // Save the user object to the database
        await user.save({ validateBeforeSave: false }); // Corrected typo here

        return { accessToken, refreshToken };
    } catch (error) {
        // Handle errors
        throw new ApiError(500, "Failed to generate access and refresh token");
    }
};


const registerUser = asyncHandler( async (req, res) => {
    console.log('Request Body:', req.body);
console.log('Uploading')
    const {fullName,email,username,password } = req.body
    console.log('Request Body:', req.body);


    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }
console.log("hi..")
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }
    
    const user = await User.create({
        fullName,
        email, 
        password,
        username: username ? username.toLowerCase() : ""
    })

    console.log('Created User:', user);

    const createdUser = await User.findById(user._id).select(
        "-password "
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

} )

const loginUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
  console.log("hi" ,req.body)
    if (  !email || !password) {
      throw new ApiError(403, "Invalid username, email, or password");
    }
  
    const user = await User.findOne({ $or: [{ username }, { email }] });
  
    if (!user) {
      throw new ApiError(400, "User does not exist");
    }
  
    const isPasswordValid = await user.isPasswordValid(password); // Fix method name to isPasswordValid
  
    if (!isPasswordValid) {
      throw new ApiError(400, "Incorrect password");
    }
  
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id); // Call the correct function for generating tokens
  
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
  
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
            user: loggedInUser,
            accessToken,
            refreshToken,
          },
          "User logged in successfully"
        )
      );
  });
const logoutUser = asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})

export {
  
  registerUser,
  loginUser,
  logoutUser

}