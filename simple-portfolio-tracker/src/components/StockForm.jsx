// import { useState } from "react";

// function StockForm({ onSubmit, initialValues = {} }) {
//   const [symbol, setSymbol] = useState(initialValues.symbol || "");
//   const [quantity, setQuantity] = useState(initialValues.quantity || "");
//   const [purchasePrice, setPurchasePrice] = useState(
//     initialValues.purchasePrice || ""
//   );
//   const [error, setError] = useState("");

//   const validateForm = () => {
//     if (!symbol) return "Symbol is required.";
//     if (quantity <= 0) return "Quantity must be a positive number.";
//     if (purchasePrice <= 0) return "Purchase Price must be a positive number.";
//     return "";
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const validationError = validateForm();
//     if (validationError) {
//       setError(validationError);
//       return;
//     }
//     onSubmit({
//       symbol,
//       quantity: Number(quantity),
//       purchasePrice: Number(purchasePrice),
//     });
//     setSymbol("");
//     setQuantity("");
//     setPurchasePrice("");
//     setError("");
//   };

//   return (
//     <form onSubmit={handleSubmit} className="mb-8">
//       {error && <p className="text-red-500 mb-4">{error}</p>}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <input
//           type="text"
//           placeholder="Symbol"
//           value={symbol}
//           onChange={(e) => setSymbol(e.target.value)}
//           required
//           className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
//         />
//         <input
//           type="number"
//           placeholder="Quantity"
//           value={quantity}
//           onChange={(e) => setQuantity(e.target.value)}
//           required
//           min="0.01"
//           step="any"
//           className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
//         />
//         <input
//           type="number"
//           placeholder="Purchase Price"
//           value={purchasePrice}
//           onChange={(e) => setPurchasePrice(e.target.value)}
//           required
//           min="0.01"
//           step="any"
//           className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
//         />
//       </div>
//       <button
//         type="submit"
//         className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
//       >
//         {initialValues.symbol ? "Update Stock" : "Add Stock"}
//       </button>
//     </form>
//   );
// }

// export default StockForm;

import { useState } from "react";
import PropTypes from "prop-types";

function StockForm({ onSubmit, initialValues = {} }) {
  const [symbol, setSymbol] = useState(initialValues.symbol || "");
  const [quantity, setQuantity] = useState(initialValues.quantity || "");
  const [purchasePrice, setPurchasePrice] = useState(
    initialValues.purchasePrice || ""
  );
  const [error, setError] = useState("");

  // Validate form inputs
  const validateForm = () => {
    if (!symbol.trim()) return "Symbol is required.";
    if (!quantity || quantity <= 0)
      return "Quantity must be a positive number.";
    if (!purchasePrice || purchasePrice <= 0)
      return "Purchase Price must be a positive number.";
    return "";
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    onSubmit({
      symbol: symbol.trim(),
      quantity: parseFloat(quantity),
      purchasePrice: parseFloat(purchasePrice),
    });

    // Reset form inputs
    resetForm();
  };

  // Reset form inputs
  const resetForm = () => {
    setSymbol("");
    setQuantity("");
    setPurchasePrice("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Symbol Input */}
        <input
          type="text"
          placeholder="Symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
          required
        />

        {/* Quantity Input */}
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min="0.01"
          step="0.01"
          className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
          required
        />

        {/* Purchase Price Input */}
        <input
          type="number"
          placeholder="Purchase Price"
          value={purchasePrice}
          onChange={(e) => setPurchasePrice(e.target.value)}
          min="0.01"
          step="0.01"
          className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        {initialValues.symbol ? "Update Stock" : "Add Stock"}
      </button>
    </form>
  );
}

// PropTypes for validation
StockForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    symbol: PropTypes.string,
    quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    purchasePrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};

export default StockForm;
