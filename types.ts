
export enum CalculationMethod {
  TARGET_MARGIN = 'TARGET_MARGIN',
  REAL_PROFIT = 'REAL_PROFIT'
}

export interface UserInputs {
  productCost: number | string; // CP
  targetMargin: number | string; // Margem Alvo % (0-100)
  testPrice: number | string; // Preço Teste
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
