
import { Watch } from '../models/watch.models.js'
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"

const generateAccessAndRefreshToken=async(userId)=>{
    try {
       
        const user=await User.findById(userId)
        
        const accessToken=user.generateAccessToken()
        const refreshToken=user.generateRefreshToken()

        
        user.refreshToken=refreshToken
        
        await user.save({validateBeforeSave: false})

        return {accessToken,refreshToken}

    } catch (error) {
        throw new ApiError(500,"Something went wrong while generating the refresh and access token")
    }
}



const registerUser=asyncHandler(async (req,res)=>{

    console.log("Body data : ",req.body);
    const {username,email,password}=req.body
    console.log("email : ",email );    

    if (
        [username,password,email].some((field)=>field?.trim()==="")
    ) {
        throw new ApiError(400,"All fields is required")  
    }
    
    const existedUser=await User.findOne({
        $or: [{username},{email}] 
    })

    
    if (existedUser) {
        throw new ApiError(409,"User with email or username is already exists")   
    }

    
    const user=await User.create({
        
        username:username.toLowerCase(),
        email,
        password,
    })

    const createdUser=await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if (!createdUser) {
        throw new ApiError(500,"Something went wrong while registering the user.")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered Successfully")
    )
})




const loginUser=asyncHandler(async(req,res)=>{
    
    
    
    const {email,username,password}=req.body
    
    if(!(username || email)){
        throw new ApiError(400,"username or email is required")
    }

    
    const user = await User.findOne({
        $or:[{username},{email}]
    })

   
    if (!user) {
        throw new ApiError(404,"user doesn't exists")
    }

   
    const isUserValid=await user.isPasswordCorrect(password)
    if(!isUserValid){
        throw new ApiError(401,"Incorrect Password Credentials")
    }

   
    const {accessToken,refreshToken}=await generateAccessAndRefreshToken(user._id)


    
    const loggedInUser=await User.findById(user._id).select("-password -refreshToken")

    
    const options={
        httpOnly:true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser,accessToken,refreshToken
            },
            "User Loggedin Successfully"
        )
    )
})


const logOutUser=asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                refreshToken:undefined
            },
            
        },
        {
            new:true
        }
    )

    const options={
        httpOnly:true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200,{},"user logged out"))
})


const refreshAccessToken=asyncHandler(async(req,res)=>{
    const incomingRefreshToken=req.cookies.refreshToken || req.body.refreshToken
    if (!incomingRefreshToken) {
        throw new ApiError(401,"unauthorized request")
    }

try {
        const decodedToken=jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
       const user=await User.findById(decodedToken?._id)
       if (!user) {
        throw new ApiError(401,"Invalid refresh token")
       }
    if (incomingRefreshToken !== user?.refreshToken) {
        throw new ApiError(401,"refresh is expired")
    }
    
    const options={
        httpOnly:true,
        secure:true
    }
    const {accessToken,newRefreshToken}=await generateAccessAndRefreshToken(user._id)
    
    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",newRefreshToken,options)
    .json(
        new ApiResponse(
            200,
            {accessToken,refreshToken:newRefreshToken},
            "Access token refreshed successfully"
        )
    )
} 
catch (error) {
       throw new ApiError(401,error?.message || "invalid refresh token") 
}

})


const getCurrentUser=asyncHandler(async(req,res)=>{
    return res
    .status(200)
    .json(
        new ApiResponse(200,req.user,"Current user is fetched successfully")
    )
})



const createNewUser = asyncHandler(async (req, res) => {
    const { username, email, firstName, lastName } = req.body;

    if ([username, email, firstName, lastName].some(field => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existingUser = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (existingUser) {
        throw new ApiError(409, "User with this email or username already exists");
    }

    const newUser = await User.create({
        username,
        email,
        firstName,
        lastName,
        createdBy: req.user._id
    });

    req.user.createdUsers.push(newUser._id);
    await req.user.save();
    
    return res.status(201).json(
        new ApiResponse(201, newUser, "New user created successfully")
    );
});

const getUsersCreatedByUser = asyncHandler(async (req, res) => {
    const users = await User.find({ createdBy: req.user._id });

    return res.status(200).json(
        new ApiResponse(200, users, "Users fetched successfully")
    );
});

export {
    registerUser,
    loginUser,
    logOutUser,
    refreshAccessToken,
    getCurrentUser,
    createNewUser,
    getUsersCreatedByUser
}


// const generateAccessAndRefreshTokens = async (userId) => {
//     try {
//         const user = await User.findById(userId);
//         const accessToken = user.generateAccessToken();
//         const refreshToken = user.generateRefreshToken();

//         // Set refreshToken in the user object
//         user.refreshToken = refreshToken;

//         // Save the user object to the database
//         await user.save({ validateBeforeSave: false }); // Corrected typo here

//         return { accessToken, refreshToken };
//     } catch (error) {
//         // Handle errors
//         throw new ApiError(500, "Failed to generate access and refresh token");
//     }
// };


// // const registerUser = asyncHandler( async (req, res) => {
// //     console.log('Request Body:', req.body);
// // console.log('Uploading')
// //     const {fullName,email,username,password } = req.body
// //     console.log('Request Body:', req.body);


// //     if (
// //         [fullName, email, username, password].some((field) => field?.trim() === "")
// //     ) {
// //         throw new ApiError(400, "All fields are required")
// //     }
// // console.log("hi..")
// //     // const existedUser = await User.findOne({
// //     //     $or: [{ username }, { email }]
// //     // })

// //     if (existedUser) {
// //         throw new ApiError(409, "User with email or username already exists")
// //     }
    
// //     const user = await new User({
// //         fullName,
// //         email, 
// //         password,
// //         username
// //     })

// //     console.log('Created User:', user);

// //     const createdUser = await User.findById(user._id).select(
// //         "-password "
// //     )

// //     if (!createdUser) {
// //         throw new ApiError(500, "Something went wrong while registering the user")
// //     }

// //     return res.status(201).json(
// //         new ApiResponse(200, createdUser, "User registered Successfully")
// //     )

// // } )
// const registerUser = asyncHandler(async (req, res) => {
//   console.log('Request Body:', req.body);

//   const { fullName, email, username, password } = req.body;

//   if ([fullName, email, username, password].some((field) => field?.trim() === "")) {
//       throw new ApiError(400, "All fields are required");
//   }

//   console.log("hi..");

//   const existedUser = await User.findOne({
//       $or: [{ username }, { email }]
//   });

//   if (existedUser) {
//       throw new ApiError(409, "User with email or username already exists");
//   }

//   const user = new User({
//       fullName,
//       email,
//       password,
//       username
//   });

//   await user.save();
//   console.log('Created User:', user);

//   const createdUser = await User.findById(user._id).select("-password");

//   if (!createdUser) {
//       throw new ApiError(500, "Something went wrong while registering the user");
//   }

//   return res.status(201).json(
//       new ApiResponse(200, createdUser, "User registered successfully")
//   );
// })

// const loginUser = asyncHandler(async (req, res) => {
//     const { username, email, password } = req.body;
//   console.log("hi" ,req.body)
//     if (!email || !password) {
//       throw new ApiError(403, "Invalid  email, or password");
//     }
  
//     const user = await User.findOne({ email  });
//   console.log(user);
//     if (!user) {
//       throw new ApiError(400, "User does not exist");
//     }
  
    
//     // if (!isPasswordValid) {
//     //   throw new ApiError(400, "Incorrect password");
//     // }
  
//     // const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id); // Call the correct function for generating tokens
  
//     // const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
  
//     const options = {
//       httpOnly: true,
//       secure: true,
//     };
  
//     res
//       .status(200)
//             .json(
//         new ApiResponse(
//           200,
//           {
//             user
//              },
//           "User logged in successfully"
//         )
//       );
//   });
// const logoutUser = asyncHandler(async(req, res) => {
//     await User.findByIdAndUpdate(
//         req.user._id,
//         {
//             $unset: {
//                 refreshToken: 1 // this removes the field from document
//             }
//         },
//         {
//             new: true
//         }
//     )

//     const options = {
//         httpOnly: true,
//         secure: true
//     }

//     return res
//     .status(200)
//     .clearCookie("accessToken", options)
//     .clearCookie("refreshToken", options)
//     .json(new ApiResponse(200, {}, "User logged Out"))
// })

// // for buying the watch
// const buyWatch = async (req, res) => {
//     try {
//       const { name, price } = req.body; // Assuming the request contains the name and price of the watch
  
//       // Create a new watch object
//       const watch = new Watch({
//         name,
//         price,
//         // Add any other fields you need for the watch
//       });
  
//       // Save the watch object to the database
//       const savedWatch = await watch.save();
  
//       res.status(201).json({
//         success: true,
//         data: savedWatch,
//       });
//     } catch (error) {
//       res.status(500).json({
//         success: false,
//         error: 'Failed to add watch',
//       });
//     }
//   };

// export {
  
//   registerUser,
//   loginUser,
//   logoutUser,
//   buyWatch

// }