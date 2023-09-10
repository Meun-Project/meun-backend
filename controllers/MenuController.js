import Menu from "../models/MenuModel.js";
import Category from "../models/CategoryModel.js";
import Usaha from "../models/UsahaModel.js";
import fs from "fs-extra";
import path from "path";

export const getMenu = async (req, res) => {
  try {
    const response = await Menu.find().populate({
      path: "categoryId",
      select: "id name",
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMenuById = async (req, res) => {
  try {
    const response = await Menu.findById(req.params.id).populate({
      path: "categoryId",
      select: "id name",
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createMenu = async (req, res) => {
  try {
    const { name, price, categoryId, description } = req.body;
    const usaha = await Usaha.findById(req.params.id);
    const category = await Category.findOne({ _id: categoryId });
    const menu = await Menu.create({
      name,
      price,
      description,
      categoryId: category._id,
      image: `images/${req.file.filename}`,
    });
    usaha.menuId.push({ _id: menu._id });
    category.menuId.push({ _id: menu._id });
    await usaha.save();
    await category.save();
    res.status(201).json({ message: "Menu berhasil ditambahkan" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateMenu = async (req, res) => {
  try {
    const { name, price, categoryId, description } = req.body;
    const menu = await Menu.findById(req.params.id);
    const category = await Category.findById(categoryId);
    const oldCategory = await Category.findById(menu.categoryId);

    if (!menu.categoryId) {
      menu.categoryId = categoryId;
      category.menuId.push({ _id: menu._id });
      await category.save();
      // console.log("!menu.categoryId");
    }
    if (oldCategory._id.toString() !== categoryId) {
      menu.categoryId = categoryId;
      const updateMenu = oldCategory.menuId.filter(
        (id) => id.toString() !== menu._id.toString()
      );
      await oldCategory.updateOne({ menuId: updateMenu });
      category.menuId.push({ _id: menu._id });
      await category.save();
      // console.log("oldCategory._id.toString()");
    }

    if (req.file == undefined) {
      menu.name = name;
      menu.description = description;
      menu.price = price;
      await menu.save();
    } else {
      await fs.unlink(path.join(`public/${menu.image}`));
      menu.name = name;
      menu.description = description;
      menu.price = price;
      menu.image = `images/${req.file.filename}`;
      await menu.save();
    }
    res.status(201).json({ message: "Menu telah di-update!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteMenu = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    await fs.unlink(path.join(`public/${menu.image}`));
    if (!menu) return res.status(404).json({ message: "Menu tidak ditemukan" });
    await menu.remove();
    res.status(201).json({ message: "Menu telah berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
