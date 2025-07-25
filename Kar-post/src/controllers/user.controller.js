
import { User } from "../model/user.model.js ";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const options = {
  httpOnly: true,
  secure: true,
};

const generateTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(401, "user not fetched successfully");
    }
    const refreshToken = user.generateRefreshToken();
    const accessToken = user.generateAccessToken();
    //adding genereated ref token to database
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { refreshToken, accessToken };
  } catch (error) {
    console.log(`error in generating the tokens ${error}`);
  }
};
const userRegister = asyncHandler(async (req, res) => {
  try {
    const { email, username, password } = req.body;
    if (!(email || username || password)) {
      throw new ApiError(401, "user need fill all  required data!");
    }
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      throw new ApiError(401, "user already existed !");
    }

    const createdUser = await User.create({
      email,
      username,
      password,
    });
    if (!createdUser) {
      throw new ApiError(401, "user is not created successfully");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, createdUser, "user created successfully!!"));
  } catch (error) {
    console.log(`error in register controller ${error}`);
  }
});

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
}
  const logedInUser =await User.findOne({ email });
  if (!logedInUser) {
    throw new ApiError(401, " user is not registered !!");
  }
  const isValidPass = await logedInUser.isPasswordCorrect(password);
  if (!isValidPass) {
    throw new ApiError(401, "incorrect password !!");
  }

  const { accessToken, refreshToken } = await generateTokens(logedInUser._id);
  const finalUser = await User.findById(logedInUser._id).select(
    "-password -refreshToken"
  );
  if (!finalUser) {
    throw new ApiError(402, "user is not available!");
  }
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: finalUser,
          accessToken,
          refreshToken,
        },
        "User logged In Successfully"
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

   

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})

export { userRegister, userLogin,logoutUser };
