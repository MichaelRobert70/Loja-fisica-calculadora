import React, { useState, useEffect } from 'react';
import CalculatorInputs from './components/CalculatorInputs';
import ResultCard from './components/ResultCard';
import UnitCostCalculator from './components/UnitCostCalculator';
import { UserInputs, CalculationContext } from './types';
import { calculateResults } from './utils/calculations';

const App: React.FC = () => {
  // Removido estado 'method' pois agora é fixo em Lucro/Preço
  
  const [inputs, setInputs] = useState<UserInputs>({
    productCost: 30.00,
    testPrice: 79.90,
    mpMakeupForce100Percent: false,
  });

  const [results, setResults] = useState<CalculationContext | null>(null);

  useEffect(() => {
    const calculation = calculateResults(inputs);
    setResults(calculation);
  }, [inputs]);

  const handleApplyUnitCost = (cost: number) => {
    setInputs(prev => ({
      ...prev,
      productCost: cost.toFixed(2)
    }));
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[#f8fafc]">
      
      {/* Header Compacto */}
      <header className="bg-white border-b border-gray-200 z-50 shadow-sm h-12 flex-none">
        <div className="max-w-[1400px] mx-auto px-4 h-full flex items-center justify-between">
          <div className="flex items-center space-x-2">
             <div className="bg-gradient-to-br from-pink-500 to-rose-600 w-6 h-6 rounded-md flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-sm">M</span>
             </div>
             <h1 className="text-lg font-bold text-gray-900 tracking-tight">MP Makeup <span className="text-pink-600">Calc</span></h1>
          </div>
        </div>
      </header>

      {/* Main Content - Sem scroll na página inteira se possível */}
      <main className="flex-1 overflow-y-auto p-4 max-w-[1200px] mx-auto w-full">
        
        <div className="flex flex-col gap-4 h-full">
          
          {/* Inputs Section - Barra Superior Compacta */}
          <div className="w-full flex-none">
               <CalculatorInputs 
                  inputs={inputs} 
                  setInputs={setInputs} 
               />
          </div>

          {/* Results Section - Grid Compacto */}
          <div className="flex-1 min-h-0">
             {results ? (
                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
                    {/* Main Result Card */}
                    <div className="lg:col-span-2 h-full">
                        <ResultCard 
                            result={results.mpMakeup} 
                            colorTheme="pink" 
                        />
                    </div>
                    
                    {/* Unit Cost Calculator Side Section */}
                    <div className="lg:col-span-1 h-full">
                        <UnitCostCalculator onApplyCost={handleApplyUnitCost} />
                    </div>
                 </div>
             ) : (
                <div className="bg-gray-50 border border-gray-200 border-dashed rounded-xl h-64 flex items-center justify-center text-gray-500">
                    Calculando...
                </div>
             )}
          </div>
          
        </div>

      </main>
    </div>
  );
};

export default App;