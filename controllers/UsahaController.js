import Usaha from "../models/UsahaModel.js";
import User from "../models/UserModel.js";
import Category from "../models/CategoryModel.js";
import fs from "fs-extra";
import path from "path";
import CategoryUsaha from "../models/CategoryUsahaModel.js";

export const getUsaha = async (req, res) => {
  try {
    const response = await Usaha.find().populate({
      path: "categoryUsahaId",
      select: "id name",
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUsahaById = async (req, res) => {
  try {
    const response = await Usaha.findById(req.params.id)
      .populate({
        path: "userId",
        select: "id name",
      })
      .populate({
        path: "categoryId",
        select: "id name",
      })
      .populate({
        path: "menuId",
        select: "id name price description",
      });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createUsaha = async (req, res) => {
  try {
    const { name, noWhatsapp, description, categoryUsahaId } = req.body;
    const user = await User.findOne({ _id: req.session.userId });
    const categoryUsaha = await CategoryUsaha.findOne({ _id: categoryUsahaId });
    const usaha = await Usaha.create({
      name,
      noWhatsapp,
      description,
      image: `images/${req.file.filename}`,
      categoryUsahaId: categoryUsahaId,
      userId: user._id,
    });
    categoryUsaha.usahaId.push({ _id: usaha._id });
    user.usahaId.push({ _id: usaha._id });
    await categoryUsaha.save();
    await user.save();
    res.status(201).json({ message: "Usaha berhasil ditambahkan" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateUsaha = async (req, res) => {
  try {
    const { name, noWhatsapp, description, categoryUsahaId } = req.body;
    const usaha = await Usaha.findById(req.params.id);
    // const user = await User.findOne({ _id: req.session.userId });
    if (req.file == undefined) {
      usaha.name = name;
      usaha.noWhatsapp = noWhatsapp;
      usaha.description = description;
      usaha.categoryUsahaId = categoryUsahaId;
      await usaha.save();
    } else {
      await fs.unlink(path.join(`public/${usaha.image}`));
      usaha.name = name;
      usaha.noWhatsapp = noWhatsapp;
      usaha.description = description;
      usaha.categoryUsahaId = categoryUsahaId;
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
