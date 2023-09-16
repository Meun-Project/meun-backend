import User from "../models/UserModel.js";
import Transaction from "../models/TransactionModel.js";
import Usaha from "../models/UsahaModel.js";

export const getTransactions = async (req, res) => {
  try {
    const response = await Transaction.find();
    console.log(Date());
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTransactionById = async (req, res) => {
  try {
    const response = await Transaction.findById(req.params.id).populate({
      path: "userId",
      select: "id name",
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTransaction = async (req, res) => {
  try {
    const { date, total_price_transaction, transactions } = req.body;
    const user = await User.findOne({ _id: req.session.userId });
    const usaha = await Usaha.findById(req.params.id);
    const response = await Transaction.create({
      date,
      total_price_transaction,
      transactions,
      usahaId: usaha._id,
      userId: user._id,
    });
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
