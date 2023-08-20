import Usaha from "../models/UsahaModel.js";
import User from "../models/UserModel.js";
import Category from "../models/CategoryModel.js";

export const getUsaha = async (req, res) => {
  try {
    const response = await Usaha.find()
      .populate({
        path: "userId",
        select: "id name",
      })
      .populate({
        path: "categoryId",
        select: "id name",
      });
    console.log();
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
    const { name, noWhatsapp, description } = req.body;
    const user = await User.findOne({ _id: req.session.userId });
    const usaha = await Usaha.create({
      name,
      noWhatsapp,
      description,
      image: `images/${req.file.filename}`,
      userId: user._id,
    });
    user.usahaId.push({ _id: usaha._id });
    await user.save();
    res.status(201).json({ message: "Usaha berhasil ditambahkan" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
