import Usaha from "../models/UsahaModel.js";

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
  const newUsaha = new Usaha(req.body);
  try {
    const response = await newUsaha.save();
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
