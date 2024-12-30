const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

// Define Stock Schema
const stockSchema = new mongoose.Schema({
  symbol: String,
  quantity: Number,
  purchasePrice: Number,
});

const Stock = mongoose.model("Stock", stockSchema);

// API Routes
app.get("/api/stocks", async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/stocks", async (req, res) => {
  const stock = new Stock({
    symbol: req.body.symbol,
    quantity: req.body.quantity,
    purchasePrice: req.body.purchasePrice,
  });

  try {
    const newStock = await stock.save();
    res.status(201).json(newStock);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put("/api/stocks/:id", async (req, res) => {
  try {
    const stock = await Stock.findById(req.params.id);
    if (stock) {
      stock.symbol = req.body.symbol || stock.symbol;
      stock.quantity = req.body.quantity || stock.quantity;
      stock.purchasePrice = req.body.purchasePrice || stock.purchasePrice;
      const updatedStock = await stock.save();
      res.json(updatedStock);
    } else {
      res.status(404).json({ message: "Stock not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete("/api/stocks/:id", async (req, res) => {
  try {
    const result = await Stock.findByIdAndDelete(req.params.id);
    if (result) {
      res.json({ message: "Stock deleted" });
    } else {
      res.status(404).json({ message: "Stock not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get real-time stock price
app.get("/api/price/:symbol", async (req, res) => {
  try {
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${req.params.symbol}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`
    );

    const price = response.data["Global Quote"]["05. price"];
    res.json({ price });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
