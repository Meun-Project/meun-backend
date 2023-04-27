import Category from "../models/CategoryModel.js";

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

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    await Category.create({ name });
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
