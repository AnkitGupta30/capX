// import React, { useState } from "react";
// import axios from "axios";
// import StockForm from "./StockForm";

// const API_BASE_URL = "http://localhost:5000/api";

// function StockList({ stocks, onEdit, onDelete }) {
//   const [editingId, setEditingId] = useState(null);

//   const handleEdit = (stock) => {
//     setEditingId(stock._id);
//   };

//   const handleUpdate = (updatedStock) => {
//     onEdit(editingId, updatedStock);
//     setEditingId(null);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${API_BASE_URL}/stocks/${id}`);
//       onDelete(id); // Update the parent component's state
//     } catch (error) {
//       console.error("Error deleting stock:", error);
//     }
//   };

//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full bg-white">
//         <thead>
//           <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
//             <th className="py-3 px-6 text-left">Symbol</th>
//             <th className="py-3 px-6 text-left">Quantity</th>
//             <th className="py-3 px-6 text-left">Purchase Price</th>
//             <th className="py-3 px-6 text-center">Actions</th>
//           </tr>
//         </thead>
//         <tbody className="text-gray-600 text-sm font-light">
//           {stocks.map((stock) => (
//             <tr
//               key={stock._id}
//               className="border-b border-gray-200 hover:bg-gray-100"
//             >
//               {editingId === stock._id ? (
//                 <td colSpan="4" className="py-3 px-6">
//                   <StockForm onSubmit={handleUpdate} initialValues={stock} />
//                 </td>
//               ) : (
//                 <>
//                   <td className="py-3 px-6 text-left whitespace-nowrap">
//                     {stock.symbol}
//                   </td>
//                   <td className="py-3 px-6 text-left">{stock.quantity}</td>
//                   <td className="py-3 px-6 text-left">
//                     ${stock.purchasePrice.toFixed(2)}
//                   </td>
//                   <td className="py-3 px-6 text-center">
//                     <button
//                       onClick={() => handleEdit(stock)}
//                       className="text-blue-500 hover:text-blue-700 mr-2"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(stock._id)}
//                       className="text-red-500 hover:text-red-700"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </>
//               )}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default StockList;

import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import StockForm from "./StockForm";

const API_BASE_URL = "http://localhost:5000/api";
// const API_BASE_URL = "https://backend-uej6.onrender.com/api";

function StockList({ stocks, onEdit, onDelete }) {
  const [editingId, setEditingId] = useState(null);

  const handleEdit = (stock) => {
    setEditingId(stock._id);
  };

  const handleUpdate = async (updatedStock) => {
    try {
      await axios.put(`${API_BASE_URL}/stocks/${editingId}`, updatedStock);
      onEdit(editingId, updatedStock);
      setEditingId(null);
    } catch (error) {
      console.error("Error updating stock:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/stocks/${id}`);
      onDelete(id);
    } catch (error) {
      console.error("Error deleting stock:", error);
    }
  };

  if (!stocks || stocks.length === 0) {
    return (
      <p className="text-gray-600 text-center">
        No stocks available to display.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Symbol</th>
            <th className="py-3 px-6 text-left">Quantity</th>
            <th className="py-3 px-6 text-left">Purchase Price</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {stocks.map((stock) => (
            <tr
              key={stock._id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              {editingId === stock._id ? (
                <td colSpan="4" className="py-3 px-6">
                  <StockForm
                    onSubmit={handleUpdate}
                    initialValues={{
                      symbol: stock.symbol,
                      quantity: stock.quantity,
                      purchasePrice: stock.purchasePrice,
                    }}
                  />
                </td>
              ) : (
                <>
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {stock.symbol}
                  </td>
                  <td className="py-3 px-6 text-left">{stock.quantity}</td>
                  <td className="py-3 px-6 text-left">
                    ${stock.purchasePrice.toFixed(2)}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <button
                      onClick={() => handleEdit(stock)}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(stock._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// PropTypes for validation
StockList.propTypes = {
  stocks: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      symbol: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      purchasePrice: PropTypes.number.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default StockList;
