import CategoryUsaha from "../models/CategoryUsahaModel.js";
import Usaha from "../models/UsahaModel.js";

export const getCategoriesUsaha = async (req, res) => {
  try {
    const response = await CategoryUsaha.find()
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCategoryUsahaById = async (req, res) => {
  try {
    const response = await CategoryUsaha.findById(req.params.id).populate({
      path: "usahaId",
      select: "id name image description rating",
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCategoryUsaha = async (req, res) => {
  try {
    const { name } = req.body;
    await CategoryUsaha.create({ name });
    res.status(201).json({ message: "Category usaha berhasil ditambahkan" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateCategoryUsaha = async (req, res) => {
  const { name } = req.body;
  const categoryUsaha = await CategoryUsaha.findById(req.params.id);
  if (!categoryUsaha)
    return res.status(404).json({ message: "Category Usaha tidak ditemukan" });
  try {
    categoryUsaha.name = name;
    await categoryUsaha.save();
    res.status(201).json({ message: "Category Usaha telah di-update!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCategoryUsaha = async (req, res) => {
  try {
    const categoryUsaha = await CategoryUsaha.findById(req.params.id);
    if (!categoryUsaha)
      return res
        .status(404)
        .json({ message: "Category usaha tidak ditemukan" });
    await categoryUsaha.remove();
    res.status(201).json({ message: "Category usaha telah berhasil dihapus!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
