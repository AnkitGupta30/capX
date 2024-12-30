// function PortfolioSummary({ stocks, portfolioValue }) {
//   const topPerformingStock = stocks.reduce(
//     (prev, current) => {
//       const prevValue = prev.quantity * prev.purchasePrice;
//       const currentValue = current.quantity * current.purchasePrice;
//       return currentValue > prevValue ? current : prev;
//     },
//     { symbol: "", quantity: 0, purchasePrice: 0 }
//   );

//   const portfolioDistribution = stocks.reduce((acc, stock) => {
//     const stockValue = stock.quantity * stock.currentValue;
//     acc[stock.symbol] = ((stockValue / portfolioValue) * 100).toFixed(2);
//     return acc;
//   }, {});

//   return (
//     <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//       <h2 className="text-2xl font-bold mb-4">Portfolio Summary</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <p className="text-gray-700 text-sm font-bold mb-2">Total Value:</p>
//           <p className="text-3xl font-bold text-green-600">
//             ${portfolioValue.toFixed(2)}
//           </p>
//         </div>
//         <div>
//           <p className="text-gray-700 text-sm font-bold mb-2">
//             Top Performing Stock:
//           </p>
//           <p className="text-xl font-semibold">{topPerformingStock.symbol}</p>
//         </div>
//       </div>
//       <div className="mt-6">
//         <h3 className="text-lg font-semibold mb-2">Portfolio Distribution:</h3>
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {Object.entries(portfolioDistribution).map(([symbol, percentage]) => (
//             <div key={symbol} className="bg-gray-100 rounded p-2">
//               <p className="font-semibold">{symbol}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PortfolioSummary;

import PropTypes from "prop-types";

function PortfolioSummary({ stocks, portfolioValue }) {
  // Handle empty stocks array gracefully
  const topPerformingStock =
    stocks.length > 0
      ? stocks.reduce(
          (prev, current) => {
            const prevValue = prev.quantity * prev.purchasePrice;
            const currentValue = current.quantity * current.purchasePrice;
            return currentValue > prevValue ? current : prev;
          },
          { symbol: "", quantity: 0, purchasePrice: 0 }
        )
      : { symbol: "N/A", quantity: 0, purchasePrice: 0 };

  const portfolioDistribution =
    portfolioValue > 0
      ? stocks.reduce((acc, stock) => {
          const stockValue = stock.quantity * stock.currentValue;
          acc[stock.symbol] = ((stockValue / portfolioValue) * 100).toFixed(2);
          return acc;
        }, {})
      : {};

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Portfolio Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-gray-700 text-sm font-bold mb-2">Total Value:</p>
          <p className="text-3xl font-bold text-green-600">
            ${portfolioValue > 0 ? portfolioValue.toFixed(2) : "0.00"}
          </p>
        </div>
        <div>
          <p className="text-gray-700 text-sm font-bold mb-2">
            Top Performing Stock:
          </p>
          <p className="text-xl font-semibold">{topPerformingStock.symbol}</p>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Portfolio Distribution:</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Object.entries(portfolioDistribution).map(([symbol]) => (
            <div key={symbol} className="bg-gray-100 rounded p-2">
              <p className="font-semibold">{symbol}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// PropType validation
PortfolioSummary.propTypes = {
  stocks: PropTypes.arrayOf(
    PropTypes.shape({
      symbol: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      purchasePrice: PropTypes.number.isRequired,
      currentValue: PropTypes.number.isRequired,
    })
  ).isRequired,
  portfolioValue: PropTypes.number.isRequired,
};

export default PortfolioSummary;
