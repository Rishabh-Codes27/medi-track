import User from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";

export const createUser = async (req, res, next) => {
  try {
    const { username, email, fullname, password } = req.body;

    // 1. Validate input
    if (!username || !email || !fullname || !password || !avatar) {
      throw new ApiError(400, "All fields are required");
    }

    // 2. Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(409, "User already exists with this email");
    }

    // 3. Create user
    const user = await User.create({ username, email, fullname, password });

    // 4. Validate creation success
    if (!user || !user._id) {
      throw new ApiError(500, "User creation failed");
    }

    res
      .status(201)
      .json(new ApiResponse(201, user, "User registered successfully"));
  } catch (error) {
    next(error);
  }
};

// LOGIN USER
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // 1. Validate
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await User.findOne({ email }).select("password");
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid password");
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  res
      .status(201)
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        samesite: "strict",
        maxAge: 1000 * 60 *15,
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
    .json(new ApiResponse(200, user, "Login successful"));
});

// LOGOUT USER
export const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { refreshToken: "" });

  res
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .status(200)
    .json(new ApiResponse(200, null, "Logout successful"));
});

// REFRESH ACCESS TOKEN
export const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies?.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Refresh token missing");
  }

  try {
    const decoded = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_KEY
    );
    const user = await User.findById(decoded._id);

    if (!user || user.refreshToken !== incomingRefreshToken) {
      throw new ApiError(401, "Invalid refresh token");
    }

    const newAccessToken = user.generateAccessToken();
    const newRefreshToken = user.generateRefreshToken();

    user.refreshToken = newRefreshToken;
    await user.save({ validateBeforeSave: false });

    res
      .status(201)
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        samesite: "strict",
        maxAge: 1000 * 60 *15,
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json(new ApiResponse(200, null, "Access token refreshed"));
  } catch (err) {
    throw new ApiError(401, "Invalid or expired refresh token");
  }
});

// Get all users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json(new ApiResponse(200, users));
  } catch (error) {
    next(new ApiError(500, "Failed to fetch users", [error.message]));
  }
};

// Get user by ID
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    // Check if user exists
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return res.status(200).json(new ApiResponse(200, user));
  } catch (error) {
    next(error);
  }
};

// Update user by ID
export const updateUser = async (req, res, next) => {
  try {
    const updates = req.body;

    // Avoid updating with empty body
    if (!updates || Object.keys(updates).length === 0) {
      throw new ApiError(400, "No update data provided");
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });

    if (!updatedUser) {
      throw new ApiError(404, "User not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, updatedUser, "User updated successfully"));
  } catch (error) {
    next(error);
  }
};

// Delete user by ID
export const deleteUser = async (req, res, next) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);

    if (!deleted) {
      throw new ApiError(404, "User not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, deleted, "User deleted successfully"));
  } catch (error) {
    next(error);
  }
};
