import Usaha from "../models/UsahaModel.js";
import User from "../models/UserModel.js";
import Category from "../models/CategoryModel.js";
import fs from "fs-extra";
import path from "path";

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

export const updateUsaha = async (req, res) => {
  try {
    const { name, noWhatsapp, description } = req.body;
    const usaha = await Usaha.findById(req.params.id);
    const user = await User.findOne({ _id: req.session.userId });
    if (req.file == undefined) {
      usaha.name = name;
      usaha.noWhatsapp = noWhatsapp;
      usaha.description = description;
      await usaha.save();
    } else {
      await fs.unlink(path.join(`public/${usaha.image}`));
      usaha.name = name;
      usaha.noWhatsapp = noWhatsapp;
      usaha.description = description;
      usaha.image = `images/${req.file.filename}`;
      await usaha.save();
    }
    res.status(201).json({ message: "Usaha telah di-update!" });
  } catch {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUsaha = async (req, res) => {
  try {
    const usaha = await Usaha.findById(req.params.id);
    await fs.unlink(path.join(`public/${usaha.image}`));
    if (!usaha)
      return res.status(404).json({ message: "Usaha tidak ditemukan" });
    await usaha.remove();
    res.status(201).json({ message: "Usaha telah berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
