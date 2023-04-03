import Usaha from "../models/UsahaModel.js";
import User from "../models/UserModel.js";

export const getUsaha = async (req, res) => {
  try {
    const response = await Usaha.find();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUsahaById = async (req, res) => {
  try {
    const response = await Usaha.findById(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createUsaha = async (req, res) => {
  try {
    const { name, logo } = req.body;
    const user = await User.findById(req.params.id);
    const newUsaha = {
      userId: user._id,
      name,
      logo,
    };
    const usaha = await Usaha.create(newUsaha);
    console.log(user.usahaId)
    user.usahaId.push(usaha._id);
    await user.save();
    res.status(201).json(usaha);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
