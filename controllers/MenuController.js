import Menu from "../models/MenuModel.js";
import fs from "fs-extra";
import path from "path";

export const getMenu = async (req, res) => {
  try {
    const response = await Menu.find();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMenuById = async (req, res) => {
  try {
    const response = await Menu.findById(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createMenu = async (req, res) => {
  try {
    const { name, price } = req.body;
    await Menu.create({
      name,
      price,
      image: `images/${req.file.filename}`,
    });
    res.status(201).json({ message: "Menu  berhasil ditambahkan" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateMenu = async (req, res) => {
  try {
    const { name, price } = req.body;
    const menu = await Menu.findById(req.params.id);
    if (req.file == undefined) {
      menu.name = name;
      menu.price = price;
      await menu.save();
    } else {
      await fs.unlink(path.join(`public/${menu.image}`));
      menu.name = name;
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
