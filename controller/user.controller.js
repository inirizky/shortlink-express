import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import authenticateToken from "../middleware/auth.js";

const prisma = new PrismaClient({});

export const userLogin = async (req, res) => {
  const { username, password } = req.body;

  if (!username && !password) {
    return res
      .status(400)
      .json({ message: "Username and Password are required!" });
  }
  try {
    const usernameExists = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!usernameExists) {
      return res.status(400).json({ message: "Username doesn't exists" });
    }

    const match = await bcrypt.compare(password, usernameExists.password);

    if (!match) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    const user = {
      id: usernameExists.id,
      fullname: usernameExists.fullname,
      username: usernameExists.username,
      role: usernameExists.role,
    };

    const token = jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Simpan token di HTTP Only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // hanya HTTPS di production
      maxAge: 24 * 60 * 60 * 1000, // 1 hari
      sameSite: "strict",
    });

    res.status(200).json({
      message: "Success Signin",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error", error: error });
  }
};

export const userRegister = async (req, res) => {
  const { username, password, fullname } = req.body;

  if (!username || !password || !fullname) {
    return res.status(400).json({ message: "Field are required" });
  }

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    const usernameExists = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (usernameExists) {
      return res.status(400).json({ message: "Username already taken" });
    }

    await prisma.user.create({
      data: {
        username: username,
        password: hashPassword,
        fullname,
      },
    });

    return res.json({ message: "Signup success", status: 200 });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Error", error: error, status: 403 });
  }
};

export const Me = (req, res) => {
  res.status(200).json({
    id: req.user.id,
    fullname: req.user.fullname,
    username: req.user.username,
    role: req.user.role,
  });
};

export const userLogout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
  });

  res.status(200).json({ message: "Logout successful" });
};
