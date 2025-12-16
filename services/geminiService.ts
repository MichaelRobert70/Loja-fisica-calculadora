import { GoogleGenAI } from "@google/genai";
import { UserInputs, PlatformResult, CalculationMethod } from "../types";
import { formatCurrency, formatPercent } from "../utils/currency";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
};

const getNumber = (value: number | string): number => {
  if (typeof value === 'number') return value;
  if (!value) return 0;
  return parseFloat(value.toString().replace(',', '.')) || 0;
};

export const generatePricingAnalysis = async (
  inputs: UserInputs,
  mpMakeupResult: PlatformResult,
  method: CalculationMethod
): Promise<string> => {
  const client = getClient();
  if (!client) {
    return "API Key não configurada. Configure process.env.API_KEY para usar a IA.";
  }

  const methodText = method === CalculationMethod.TARGET_MARGIN 
    ? "Definição de Preço por Markup Alvo (Sobre Custo)" 
    : "Análise de Lucro Real";
  
  const productCost = getNumber(inputs.productCost);
  const targetMargin = getNumber(inputs.targetMargin);
  const testPrice = getNumber(inputs.testPrice);

  const prompt = `
    Atue como um estrategista financeiro de Varejo Físico e E-commerce.
    Analise os dados abaixo para a "Loja Física MP Makeup" e forneça uma resposta com EXCELENTE ESPAÇAMENTO e legibilidade.
    
    **Dados do Cenário (${methodText}):**
    - Custo Produto: ${formatCurrency(productCost)}
    ${method === CalculationMethod.TARGET_MARGIN ? `- Markup Alvo: ${targetMargin}%` : `- Preço Testado: ${formatCurrency(testPrice)}`}
    ${inputs.mpMakeupForce100Percent ? '- **Modo 100% Lucro Ativado**' : ''}

    **Resultados Apurados:**
    **Loja Física MP Makeup:** 
    - Preço Venda: ${formatCurrency(mpMakeupResult.sellingPrice)} 
    - Lucro Líquido: ${formatCurrency(mpMakeupResult.netProfit)} 
    - Markup Real: ${formatPercent(mpMakeupResult.netProfitMargin)}

    **Instruções de Resposta (Formato Visual):**

    ### 📊 Análise de Rentabilidade
    [Comente se o preço está competitivo e se a margem é saudável para loja física]

    ### 💡 Dica Estratégica
    [Uma sugestão tática para melhorar vendas ou margem neste produto]

    **Regras Importantes de Estilo:**
    - Use Markdown.
    - **IMPORTANTE:** Pule SEMPRE uma linha em branco entre cada item de lista e cada parágrafo. O texto deve ser arejado.
    - Seja conciso e direto.
    - Use emojis para guiar a leitura.
  `;

  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "Não foi possível gerar a análise no momento.";
  } catch (error) {
    console.error("Erro ao chamar Gemini:", error);
    return "Erro ao conectar com a inteligência artificial. Tente novamente.";
  }
};