import logger from "../logger/logger.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import dayjs from "dayjs";
import {generateTokenAndSetCookie} from "../utils/generateToken.js";
export const signup = async (req, res) => {
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords dont't match" });
    }

    const user = await User.findOne({ userName });

    if (user) {
      logger.warn(` User ${userName}  already exists`);
      return res.status(400).json({ error: "UserName already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    const newUser = new User({
      fullName,
      userName,
      password: hasedPassword,
      gender,
      profilePic: gender == "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
        generateTokenAndSetCookie(newUser._id,res)
      newUser.save();
      logger.info(
        ` User ${userName} signup at  ${dayjs(newUser.createdAt).format(
          "YYYY-MM-DD HH:mm:ss"
        )}`
      );
      return res.status(201).json({
        id: newUser._id,
        fullName: newUser.fullName,
        userName: newUser.userName,
        profilePic: newUser.profilePic,
      });
    } else {
        return res.status(400).json({ error:"Invalid user data" });
    }

    
  } catch (error) {
    logger.error(`Signup Route [${error.message}]`);
    res.status(500).json({ error: "internal server error" });
  }
};

export const login =async (req, res) => {
  try {
    const {userName,password} = req.body;

    const user= await User.findOne({userName})
    
    const isPasswordCorrect = await bcrypt.compare(password,user?.password || "")

    if(!user || !isPasswordCorrect){
      logger.warn(`Invalid login ${userName} ${password}`);
      return res.status(400).json({ error: "Invalid username or password" });
    }

    generateTokenAndSetCookie(user._id,res);

    return res.status(200).json({
      id:user._id,
      fullName:user.fullName,
      userName:user.userName,
      profilePic:user.profilePic
    })

    
  } catch (error) {
    logger.error(`Login Route [${error.message},${error.stack}]`);
    res.status(500).json({ error: "internal server error" });
  }
};

export const logout = (req, res) => {
  try {
    
    res.cookie("jwt","",{maxAge:0})
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    logger.error(`Login Route [${error.message},${error.stack}]`);
    res.status(500).json({ error: "internal server error" });
  }
};
