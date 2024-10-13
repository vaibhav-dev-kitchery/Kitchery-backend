import mongoose from "mongoose";
import { UserCredentials } from "../models/userCredentials.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {ApiResponse } from "../utils/ApiResponse.js";

//fucntion to verify auth token and retrieve details


const registerUser = asyncHandler( async(req,res) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // create user object - create entry in db
    // check for user creation
    // return res

    const {userName, firstName, lastName, email, about} = req.body

    if ([userName, firstName, lastName, email].some((field) => field?.trim() === "")) 
    {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await UserCredentials.findOne({
        $or: [{ userName }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }

    const user = await UserCredentials.create({
        userName: userName.toLowerCase(),
        firstName,
        lastName,
        about,
        email
    })

    const createdUser = await UserCredentials.findById(user._id).select(firstName);
    debugger;
    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user")
    }
    else{
        return res.status(201).json(
            new ApiResponse(200, user, "User registered successfully")
        )
    }

})


const changeUserName =  asyncHandler( async(req,res) => {
    //get username from body
    //check if it is not empty
    //check if it exist in table
    //update username


    const { existingUserName, newUserName } = req.body

    if([existingUserName, newUserName].some((field) => field?.trim() === "")){
        throw new ApiError(400, "All fields are required")
    }
debugger;
    const existingUser = await UserCredentials.findOne({ userName: existingUserName });
    
    if(!existingUser){
        throw new ApiError(404,"User does not exists")
    }
    const existingNewUsername = await UserCredentials.findOne({userName : newUserName})

    if(existingNewUsername){
        throw new ApiError(406,"Username already exists")
    }
    else{
        const result = await UserCredentials.updateOne(
            { _id : existingUser._id },
            { $set : {userName : newUserName.toLowerCase(), lastActiveOn : Date.now()}}
        )

        if(result.modifiedCount > 0){
            return res.status(201).json(
                new ApiResponse(200, existingUser, "UserName updated successfully")
            )
        }
        else{
            throw new ApiError(500,"Something went wrong while updating the username")
        }
    }
})


const updateAvatarLink =  asyncHandler( async (req, res) => {
    //get userName and avatarlink from body
    //check if userName and avatarlink is not empty
    //check if user exist
    //update avatar link

    const { userName, avatarLink } =  req.body

    if([userName, avatarLink].some((field) => field?.trim() === "")){
        throw new ApiError(400,"All fields are required")
    }

    const user = await UserCredentials.findOne({userName : userName})
    
    if(user==null){
        throw new ApiError(404, "User not found")
    }

    const result = await UserCredentials.updateOne(
        { _id : user._id},
        { $set : { avatar : avatarLink, lastActiveOn : Date.now()}}
    )

    if(result.modifiedCount > 0){
        return res.status(201).json(
            new ApiResponse(200, existingUser, "Avatar updated successfully")
        )
    }
    else{
        throw new ApiError(500,"Something went wrong while updating the username")
    }
})

export {registerUser, changeUserName, updateAvatarLink}
