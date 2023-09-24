import Category from "../models/CategoryModel.js";
import Usaha from "../models/UsahaModel.js";

export const getCategories = async (req, res) => {
  try {
    const response = await Category.find().populate({
      path: "menuId",
      select: "id name price discount discountPrice image soldQty",
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const response = await Category.findById(req.params.id).populate({
      path: "menuId",
      select: "id name price discount discountPrice image soldQty",
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCategoriesByUsahaId = async (req, res) => {
  try {
    const response = await Category.find().populate({
      path: "menuId",
      select: "id name price discount discountPrice image soldQty",
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name, usahaId } = req.body;
    const usaha = await Usaha.findById(usahaId);
    const category = await Category.create({ name });
    usaha.categoryId.push({ _id: category._id });
    await usaha.save();
    res.status(201).json({ message: "Category berhasil ditambahkan" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateCategory = async (req, res) => {
  const { name } = req.body;
  const category = await Category.findById(req.params.id);
  if (!category)
    return res.status(404).json({ message: "Category tidak ditemukan" });
  try {
    category.name = name;
    await category.save();
    res.status(201).json({ message: "Category telah di-update!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category tidak ditemukan" });
    await category.remove();
    res.status(201).json({ message: "Category telah berhasil dihapus!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
