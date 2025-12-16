import React from 'react';
import { UserInputs, CalculationMethod } from '../types';

interface CalculatorInputsProps {
  inputs: UserInputs;
  setInputs: React.Dispatch<React.SetStateAction<UserInputs>>;
  method: CalculationMethod;
  setMethod: (m: CalculationMethod) => void;
}

const CalculatorInputs: React.FC<CalculatorInputsProps> = ({ inputs, setInputs, method, setMethod }) => {
  
  const handleChange = (field: keyof UserInputs, value: string | boolean) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const handleClear = () => {
    setInputs({
      productCost: '',
      targetMargin: '',
      testPrice: '',
      mpMakeupForce100Percent: false,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
      {/* Desktop Layout: Single Row */}
      <div className="flex flex-col lg:flex-row lg:items-end gap-3 lg:gap-6">
        
        {/* Método de Cálculo */}
        <div className="min-w-[180px] shrink-0">
           <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 block">Método</label>
           <div className="flex p-0.5 bg-gray-100 rounded-md">
            <button
              onClick={() => setMethod(CalculationMethod.TARGET_MARGIN)}
              className={`flex-1 py-1.5 text-xs font-semibold rounded transition-all px-2 ${
                method === CalculationMethod.TARGET_MARGIN
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              🎯 Markup
            </button>
            <button
              onClick={() => setMethod(CalculationMethod.REAL_PROFIT)}
              className={`flex-1 py-1.5 text-xs font-semibold rounded transition-all px-2 ${
                method === CalculationMethod.REAL_PROFIT
                  ? 'bg-white text-emerald-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              💰 Lucro
            </button>
          </div>
        </div>

        {/* Inputs Container */}
        <div className="flex-1 grid grid-cols-2 lg:flex lg:items-end gap-3 lg:gap-4">
            
            <div className="lg:w-32">
                <label className="block text-[10px] font-bold text-gray-500 mb-1">Custo Produto (R$)</label>
                <input
                id="productCost"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={inputs.productCost}
                onFocus={handleFocus}
                onChange={(e) => handleChange('productCost', e.target.value)}
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-indigo-500 outline-none bg-white text-gray-900 font-medium"
                />
            </div>

            <div className="lg:w-32">
                {method === CalculationMethod.TARGET_MARGIN ? (
                    <>
                        <label className="block text-[10px] font-bold text-indigo-900 mb-1">Markup Alvo (%)</label>
                        <input
                        id="targetMargin"
                        type="number"
                        inputMode="decimal"
                        min="0"
                        max="100"
                        step="1"
                        placeholder="Ex: 100"
                        value={inputs.targetMargin}
                        onFocus={handleFocus}
                        onChange={(e) => handleChange('targetMargin', e.target.value)}
                        className="w-full px-2 py-1.5 text-sm border border-indigo-200 rounded focus:ring-1 focus:ring-indigo-500 outline-none text-indigo-900 font-bold bg-indigo-50"
                        />
                    </>
                ) : (
                    <>
                        <label className="block text-[10px] font-bold text-emerald-900 mb-1">Preço Teste (R$)</label>
                        <input
                        id="testPrice"
                        type="number"
                        inputMode="decimal"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        value={inputs.testPrice}
                        onFocus={handleFocus}
                        onChange={(e) => handleChange('testPrice', e.target.value)}
                        className="w-full px-2 py-1.5 text-sm border border-emerald-200 rounded focus:ring-1 focus:ring-emerald-500 outline-none text-emerald-900 font-bold bg-emerald-50"
                        />
                    </>
                )}
            </div>

            {/* Checkbox Force 100% - Compact */}
            <div className="col-span-2 lg:col-span-1 lg:pb-2 lg:pl-2">
                <label className="flex items-center space-x-2 cursor-pointer select-none">
                    <input 
                        type="checkbox" 
                        checked={inputs.mpMakeupForce100Percent || false} 
                        onChange={(e) => handleChange('mpMakeupForce100Percent', e.target.checked)}
                        className="w-4 h-4 text-pink-600 rounded border-gray-300 focus:ring-pink-500 cursor-pointer accent-pink-500"
                    />
                    <div className="leading-tight">
                        <span className="block text-xs font-bold text-pink-800">Forçar 100% Lucro</span>
                        <span className="block text-[9px] text-pink-500">Dobra o investimento</span>
                    </div>
                </label>
            </div>
        </div>

        {/* Action Button */}
        <div className="hidden lg:block pb-0.5">
           <button
            onClick={handleClear}
            className="flex items-center justify-center p-2 border border-gray-200 text-gray-400 rounded hover:bg-gray-50 hover:text-red-500 hover:border-red-200 transition-all"
            title="Limpar Dados"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </button>
        </div>

      </div>

      {/* Mobile Clear Button */}
      <div className="mt-3 pt-3 border-t border-gray-100 lg:hidden">
        <button
          onClick={handleClear}
          className="w-full flex items-center justify-center space-x-2 py-2 border border-gray-200 text-gray-500 rounded hover:bg-gray-50 transition-all text-xs font-medium"
        >
          <span>Limpar Tudo</span>
        </button>
      </div>
    </div>
  );
};

export default CalculatorInputs;