import { useState, useEffect } from "react";
import axios from "axios";
import StockForm from "./components/StockForm";
import StockList from "./components/StockList";
import PortfolioSummary from "./components/PortfolioSummary";

const API_BASE_URL = "http://localhost:5000/api";
// const API_BASE_URL = "https://backend-uej6.onrender.com/api";

function App() {
  const [stocks, setStocks] = useState([]);
  const [portfolioValue, setPortfolioValue] = useState(0);

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/stocks`);
      setStocks(response.data);
      // console.log(response.data);
      updatePortfolioValue(response.data);
    } catch (error) {
      console.error("Error fetching stocks:", error);
    }
  };

  const updatePortfolioValue = async (stocksData) => {
    try {
      // Fetch stock prices for each symbol
      const pricePromises = stocksData.map(
        async (stock) =>
          await axios.get(`${API_BASE_URL}/price/${stock.symbol}`)
      );
      const priceResponses = await Promise.all(pricePromises);

      // Calculate total portfolio value
      const totalValue = stocksData.reduce((sum, stock, index) => {
        const currentPrice = parseFloat(priceResponses[index].data.price || 0);
        return sum + currentPrice * stock.quantity;
      }, 0);

      setPortfolioValue(totalValue);
    } catch (error) {
      console.error("Error updating portfolio value:", error);
    }
  };

  const addStock = async (newStock) => {
    try {
      await axios.post(`${API_BASE_URL}/stocks`, newStock);
      fetchStocks();
    } catch (error) {
      console.error("Error adding stock:", error);
    }
  };

  const editStock = async (id, updatedStock) => {
    try {
      await axios.put(`${API_BASE_URL}/stocks/${id}`, updatedStock);
      fetchStocks();
    } catch (error) {
      console.error("Error editing stock:", error);
    }
  };

  const deleteStock = (id) => {
    setStocks(stocks.filter((stock) => stock._id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
            Simple Portfolio Tracker
          </h1>
          <StockForm onSubmit={addStock} />
          <PortfolioSummary stocks={stocks} portfolioValue={portfolioValue} />
          <StockList
            stocks={stocks}
            onEdit={editStock}
            onDelete={deleteStock}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
