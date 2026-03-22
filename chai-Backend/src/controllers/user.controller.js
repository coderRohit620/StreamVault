import { asyncHandler } from "../utils/asyncHandler.js";


const registerUser = asyncHandler( async(req,res) => {
    res.status(200).json({
        message:"Rohit padh rha h Cahi aur code se"
    })
})


export {registerUser,}

