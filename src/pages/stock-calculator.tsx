import { useState } from 'react';

function StockCalculator() {
  const [originalShares, setOriginalShares] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [targetPrice, setTargetPrice] = useState(0);

  const [requiredShares, setRequiredShares] = useState<number | null>(null);
  const [newTotalCost, setNewTotalCost] = useState<number | null>(null);
  const [newTotalShares, setNewTotalShares] = useState<number | null>(null);
  const [newAveragePrice, setNewAveragePrice] = useState<number | null>(null);

  const calculate = () => {
    const originalCost = originalShares * originalPrice;
    const numerator = originalCost - targetPrice * originalShares;
    const denominator = targetPrice - currentPrice;

    if (denominator === 0) {
      setRequiredShares(null);
      setNewTotalCost(null);
      setNewTotalShares(null);
      setNewAveragePrice(null);
      return;
    }

    const sharesToBuy = numerator / denominator;

    if (sharesToBuy < 0) {
      setRequiredShares(null);
      setNewTotalCost(null);
      setNewTotalShares(null);
      setNewAveragePrice(null);
    } else {
      const buyShares = Math.ceil(sharesToBuy);
      const totalCost = originalCost + buyShares * currentPrice;
      const totalShares = originalShares + buyShares;
      const averagePrice = totalCost / totalShares;

      setRequiredShares(buyShares);
      setNewTotalCost(totalCost);
      setNewTotalShares(totalShares);
      setNewAveragePrice(averagePrice);
    }
  };
  return (
    <div className="p-4 max-w-md mx-auto rounded-xl shadow-md space-y-4 border mt-5">
      <h2 className="text-xl font-bold text-center">目標均價計算器</h2>

      <div className="space-y-2">
        <label className="block">
          原持股數量：
          <input
            type="number"
            value={originalShares}
            onChange={(e) => setOriginalShares(+e.target.value)}
            className="w-full border rounded p-1"
          />
        </label>

        <label className="block">
          原平均價格：
          <input
            type="number"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(+e.target.value)}
            className="w-full border rounded p-1"
          />
        </label>

        <label className="block">
          現在股價：
          <input
            type="number"
            value={currentPrice}
            onChange={(e) => setCurrentPrice(+e.target.value)}
            className="w-full border rounded p-1"
          />
        </label>

        <label className="block">
          目標均價：
          <input
            type="number"
            value={targetPrice}
            onChange={(e) => setTargetPrice(+e.target.value)}
            className="w-full border rounded p-1"
          />
        </label>
      </div>

      <button
        onClick={calculate}
        className="w-full bg-cyan-700 text-white rounded p-2 hover:bg-cyan-800 cursor-pointer transition-all duration-150"
      >
        計算
      </button>

      {requiredShares !== null && (
        <div className="text-green-700 space-y-2">
          <p className="text-center">
            ✅ 你需要加碼 <strong>{requiredShares}</strong> 股 ,成本：
            <strong>
              {requiredShares !== null && currentPrice !== null
                ? (requiredShares * currentPrice).toLocaleString()
                : 'N/A'}
            </strong>{' '}
            元
          </p>
          <p className="text-center"></p>
          <div className="border-t pt-2 text-sm space-y-1">
            <p>
              🧮 新總股數：<strong>{newTotalShares}</strong> 股
            </p>

            <p>
              💰 總成本：<strong>{newTotalCost?.toLocaleString()}</strong> 元
            </p>
            <p>
              📊 新均價：<strong>{newAveragePrice?.toFixed(2)}</strong> 元
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default StockCalculator;
