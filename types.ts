
export interface UserInputs {
  productCost: number | string; // CP
  testPrice: number | string; // Preço Teste (Preço de Venda)
  mpMakeupForce100Percent?: boolean; // Checkbox para forçar 100% de lucro na MP Makeup
}

export interface PlatformResult {
  platformName: string;
  sellingPrice: number;
  netProfit: number;
  netProfitMargin: number;
  totalFixedCosts: number;
  totalVariableCosts: number;
  feesBreakdown: {
    commission: number;
    transactionFee: number;
    fixedFee: number;
    affiliate?: number;
  };
}

export interface CalculationContext {
  mpMakeup: PlatformResult; // Only Physical Store remaining
}