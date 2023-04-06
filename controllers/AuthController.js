import User from "../models/UserModel.js";
import argon2 from "argon2";

export const Login = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });
  
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  const match = await argon2.verify(user.password, req.body.password);
  
  if (!match) return res.status(400).json({ msg: "Wrong Password!" });
  req.session.userId = user._id;
  
  const _id = user._id;
  const name = user.name;
  const email = user.email;
  const role = user.role;
  res.status(200).json({ _id, name, email, role });
};

export const Me = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Mohon login ke akun anda" });
  }
  const user = await User.findOne(
    {
      _id: req.session.userId,
    },
    {
      _id: 1,
      name: 1,
      email: 1,
      role: 1,
    }
  );
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  res.status(200).json(user);
};

export const LogOut = (req, res) => {
    req.session.destroy((err) => {
        if(err) return res.status(400).json({ msg: "Tidak dapat logout" });
        res.status(200).json({ msg: "Anda telah logout" });
    });
}
