import React from 'react';
import { PlatformResult } from '../types';
import { formatCurrency, formatPercent } from '../utils/currency';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface ResultCardProps {
  result: PlatformResult;
  colorTheme: 'pink';
}

const ResultCard: React.FC<ResultCardProps> = ({ 
  result, 
  colorTheme, 
}) => {
  
  const themeClasses = {
    pink: { 
      border: 'border-pink-200', 
      bg: 'bg-white', 
      header: 'bg-gradient-to-r from-pink-500 to-rose-500', 
      text: 'text-pink-600', 
      fill: '#f472b6' 
    }
  };

  const currentTheme = themeClasses[colorTheme];

  const totalFees = result.totalVariableCosts + 
                    result.feesBreakdown.fixedFee + 
                    (result.feesBreakdown.affiliate || 0);

  const productCostOnly = result.totalFixedCosts - result.feesBreakdown.fixedFee;
  const totalSaleCost = productCostOnly + totalFees;

  const chartData = [
    { name: 'Produto', value: productCostOnly, color: '#9CA3AF' },
    { name: 'Taxas', value: totalFees, color: '#EF4444' },
    { name: 'Lucro', value: result.netProfit > 0 ? result.netProfit : 0, color: '#10B981' },
  ];
  
  return (
    <div className={`rounded-lg shadow-sm overflow-hidden border ${currentTheme.border} ${currentTheme.bg} flex flex-col h-full`}>
      <div className={`${currentTheme.header} text-white px-4 py-2 flex justify-between items-center shrink-0`}>
        <h3 className="font-bold text-base">{result.platformName}</h3>
      </div>

      <div className="p-4 flex-1 flex flex-col min-h-0">
        
        {/* Top: Price */}
        <div className="mb-4 text-center shrink-0">
          <p className="text-xs text-gray-500 mb-0.5">Preço de Venda Final</p>
          <div className={`text-4xl font-bold ${currentTheme.text} tracking-tight`}>
            {formatCurrency(result.sellingPrice)}
          </div>
        </div>

        {/* Middle: Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4 shrink-0">
           <div className="bg-emerald-50 py-2 px-3 rounded border border-emerald-100 text-center">
              <p className="text-[10px] text-emerald-700 font-bold uppercase tracking-wide mb-0.5">Lucro</p>
              <p className="text-2xl font-bold text-emerald-600 leading-none">{formatCurrency(result.netProfit)}</p>
           </div>
           <div className="bg-emerald-50 py-2 px-3 rounded border border-emerald-100 text-center">
              <p className="text-[10px] text-emerald-700 font-bold uppercase tracking-wide mb-0.5">Markup</p>
              <p className="text-2xl font-bold text-emerald-600 leading-none">{formatPercent(result.netProfitMargin)}</p>
           </div>
        </div>

        {/* Chart Area - Flexible height */}
        <div className="flex-1 min-h-[100px] relative w-full mb-3">
           <ResponsiveContainer width="100%" height="100%">
             <PieChart>
               <Pie
                 data={chartData}
                 cx="50%"
                 cy="50%"
                 innerRadius={40}
                 outerRadius={55}
                 paddingAngle={2}
                 dataKey="value"
               >
                 {chartData.map((entry, index) => (
                   <Cell key={`cell-${index}`} fill={entry.color} />
                 ))}
               </Pie>
               <Tooltip formatter={(value: number) => formatCurrency(value)} />
             </PieChart>
           </ResponsiveContainer>
           <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
             <span className="text-[10px] text-gray-400 font-medium">Gráfico</span>
           </div>
        </div>

        {/* Footer: Breakdown */}
        <div className="space-y-1.5 text-xs border-t border-gray-100 pt-3 shrink-0">
          <div className="flex justify-between">
             <span className="text-gray-500">Custo Produto:</span>
            <span className="font-medium text-gray-700">{formatCurrency(productCostOnly)}</span>
          </div>
          <div className="flex justify-between">
             <span className="text-gray-500">Comissão (MP):</span>
             <span className="font-medium text-red-500">-{formatCurrency(result.feesBreakdown.commission)}</span>
          </div>
           <div className="flex justify-between">
              <span className="text-gray-500">Taxa Fixa (0.50):</span>
              <span className="font-medium text-red-500">-{formatCurrency(result.feesBreakdown.fixedFee)}</span>
            </div>

            <div className="flex justify-between font-bold text-gray-800 pt-1.5 border-t border-gray-100 mt-1.5">
              <span>Custo Total:</span>
              <span>-{formatCurrency(totalSaleCost)}</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;