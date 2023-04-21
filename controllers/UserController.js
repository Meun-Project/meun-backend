import argon2 from "argon2";
import User from "../models/UserModel.js";

export const getUsers = async (req, res) => {
  try {
    const response = await User.find({}, "_id name email role usahaId");
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const response = await User.findById(req.params.id, "_id name email role");
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const { name, email, password, confirmPassword, role } = req.body;
  if (password !== confirmPassword)
    return res
      .status(400)
      .json({ message: "Password dan Confirm Password tidak cocok" });
  const hashPassword = await argon2.hash(password);
  try {
    await User.create({
      name: name,
      email: email,
      password: hashPassword,
      role: role,
    });
    res.status(201).json({ message: "Hore Register Berhasil!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
