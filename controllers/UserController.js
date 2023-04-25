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

export const updateUser = async (req, res) => {
  const { name, email, password, confirmPassword, role } = req.body;
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User tidak ditemukan" });
  let hashPassword;
  if (password === "" || password === null) {
    hashPassword = user.password;
  } else {
    hashPassword = await argon2.hash(password);
  }
  if (password !== confirmPassword)
    return res
      .status(400)
      .json({ message: "Password dan confirm password tidak cocok" });
  try {
    user.name = name;
    user.email = email;
    user.password = hashPassword;
    user.role = role;
    await user.save();
    res.status(201).json({ message: "User telah di-update!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });
    await user.remove();
    res.status(201).json({ message: "User telah berhasil dihapus!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
