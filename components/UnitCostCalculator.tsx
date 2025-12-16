import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/currency';

interface UnitCostCalculatorProps {
  onApplyCost: (cost: number) => void;
}

const UnitCostCalculator: React.FC<UnitCostCalculatorProps> = ({ onApplyCost }) => {
  const [boxCost, setBoxCost] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [unitCost, setUnitCost] = useState<number>(0);

  const parseInput = (val: string) => parseFloat(val.replace(',', '.')) || 0;

  useEffect(() => {
    const c = parseInput(boxCost);
    const q = parseInput(quantity);
    if (c > 0 && q > 0) {
      setUnitCost(c / q);
    } else {
      setUnitCost(0);
    }
  }, [boxCost, quantity]);

  const handleApply = () => {
    if (unitCost > 0) {
      onApplyCost(unitCost);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-pink-100 overflow-hidden h-full flex flex-col">
      <div className="bg-gradient-to-r from-pink-50 to-rose-50 px-4 py-2 border-b border-pink-100 flex items-center justify-between shrink-0">
        <h3 className="font-bold text-gray-800 text-sm">Calculadora de Box</h3>
        <span className="text-[9px] bg-pink-100 text-pink-700 px-1.5 py-0.5 rounded-full font-bold">Auxiliar</span>
      </div>

      <div className="p-4 flex flex-col flex-1 gap-3 overflow-y-auto">
        <div className="space-y-3">
          <div>
            <label className="block text-[10px] font-bold text-gray-500 mb-1">Custo do Box (R$)</label>
            <input
              type="number"
              inputMode="decimal"
              placeholder="0,00"
              value={boxCost}
              onChange={(e) => setBoxCost(e.target.value)}
              className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded focus:ring-1 focus:ring-pink-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-gray-500 mb-1">Quantidade</label>
            <input
              type="number"
              inputMode="numeric"
              placeholder="0"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded focus:ring-1 focus:ring-pink-500 outline-none"
            />
          </div>
        </div>

        <div className="bg-gray-50 rounded p-3 text-center border border-gray-100 mt-auto mb-auto">
          <p className="text-[10px] text-gray-500 uppercase tracking-wide">Custo Unitário</p>
          <p className="text-xl font-bold text-gray-800">{formatCurrency(unitCost)}</p>
        </div>

        <button
          onClick={handleApply}
          disabled={unitCost <= 0}
          className={`w-full py-2 px-3 rounded font-semibold text-xs transition-all flex items-center justify-center gap-2 shrink-0 ${
            unitCost > 0
              ? 'bg-pink-600 hover:bg-pink-700 text-white shadow-sm'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          <span>Aplicar Custo</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default UnitCostCalculator;