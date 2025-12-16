import { UserInputs, PlatformResult, CalculationMethod } from '../types';

// Loja Física MP Makeup Constants
const MP_MAKEUP_COMMISSION_RATE = 0.05; // 5% Mercado Pago
const MP_MAKEUP_FIXED_FEE = 0.50; // Taxa fixa de 0.50 (Aluguel + Inter)

// Helper to safely convert input to number
const getNumber = (value: number | string): number => {
  if (typeof value === 'number') return value;
  if (!value) return 0;
  // Replace comma with dot just in case, though input type=number usually handles it or returns empty
  return parseFloat(value.toString().replace(',', '.')) || 0;
};

export const calculateResults = (inputs: UserInputs, method: CalculationMethod): { mpMakeup: PlatformResult } => {
  
  // Calculate MP Makeup (Physical Store)
  const mpMakeupResult = calculateMpMakeup(inputs, method);

  return { mpMakeup: mpMakeupResult };
};

const calculateMpMakeup = (inputs: UserInputs, method: CalculationMethod): PlatformResult => {
  const productCost = getNumber(inputs.productCost);
  const targetMargin = getNumber(inputs.targetMargin);
  const testPrice = getNumber(inputs.testPrice);

  // 5% Mercado Pago Fee (No Tax)
  const totalVariableRate = MP_MAKEUP_COMMISSION_RATE;
  
  // Costs = Product + Fixed Fee (0.50).
  const totalFixedCosts = productCost + MP_MAKEUP_FIXED_FEE;

  let sellingPrice = 0;

  if (inputs.mpMakeupForce100Percent) {
    // CHECKED: Force 100% Markup (Profit = Cost)
    // Formula: Price = (2*Cost + FixedFee) / (1 - Rate)
    const numerator = (productCost * 2) + MP_MAKEUP_FIXED_FEE;
    const denominator = 1 - totalVariableRate;
    
    if (denominator <= 0) {
        sellingPrice = 0;
    } else {
        sellingPrice = numerator / denominator;
    }
  } else {
    // UNCHECKED:
    // If Target Margin: Treat input as MARKUP % (Profit on Cost), not Margin on Price.
    if (method === CalculationMethod.TARGET_MARGIN) {
        const marginDecimal = targetMargin / 100; // e.g., 0.30 for 30% markup
        // Formula derived from Price = Cost + (Cost*Margin) + Fixed + (Price*Rate)
        // Price = (Cost * (1 + Margin) + Fixed) / (1 - Rate)
        const numerator = (productCost * (1 + marginDecimal)) + MP_MAKEUP_FIXED_FEE;
        const denominator = 1 - totalVariableRate;
        
        if (denominator <= 0) {
            sellingPrice = 0;
        } else {
            sellingPrice = numerator / denominator;
        }
    } else {
        // Real Profit: User inputs price
        sellingPrice = testPrice;
    }
  }

  const commissionValue = sellingPrice * MP_MAKEUP_COMMISSION_RATE;
  const totalPlatformFees = commissionValue;
  
  // Net Profit = Selling Price - Total Fixed Costs (Prod + Fee) - Commissions
  const netProfit = sellingPrice - totalFixedCosts - totalPlatformFees;
  
  // MARGIN DISPLAY LOGIC: MARKUP (Profit / Product Cost).
  let netProfitMargin = 0;
  if (productCost > 0) {
    netProfitMargin = (netProfit / productCost) * 100;
  }

  // If checked, force visual 100% just to be cleaner (math should match anyway)
  if (inputs.mpMakeupForce100Percent) {
    netProfitMargin = 100;
  }

  return {
    platformName: 'Loja Física MP Makeup',
    sellingPrice,
    netProfit,
    netProfitMargin,
    totalFixedCosts: totalFixedCosts,
    totalVariableCosts: totalPlatformFees,
    feesBreakdown: {
      commission: commissionValue, // Using commission field for MP Fee
      transactionFee: 0,
      fixedFee: MP_MAKEUP_FIXED_FEE,
    }
  };
};