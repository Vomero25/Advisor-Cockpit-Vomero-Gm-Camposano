
import { GoogleGenAI, Type } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

export const generateAssistantResponse = async (userMessage: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });
    return response.text || "Mi dispiace, non sono riuscito a elaborare una risposta.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Errore nel servizio di consulenza.";
  }
};

export interface FundPerformanceResponse {
  id: string;
  company: string;
  name: string;
  type: 'FPA' | 'PIP';
  category: 'AZIONARIO' | 'BILANCIATO' | 'PRUDENTE_OBB' | 'GARANTITO';
  y1: number;
  y5: number;
  y10: number;
  sources: Array<{ title: string; uri: string }>;
}

/**
 * Recupera i rendimenti di un fondo specifico via Google Search Grounding.
 */
export const fetchFundPerformance = async (query: string): Promise<FundPerformanceResponse> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    // Fix: Removed responseMimeType and responseSchema because they are incompatible with search grounding.
    // Updated prompt to request structured JSON for manual extraction.
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Recupera i dati ufficiali COVIP per il seguente fondo pensione o società: "${query}". 
      Mi servono i seguenti dati in formato JSON:
      {
        "company": string,
        "name": string,
        "type": "FPA" | "PIP",
        "category": "AZIONARIO" | "BILANCIATO" | "PRUDENTE_OBB" | "GARANTITO",
        "y1": number,
        "y5": number,
        "y10": number
      }
      Usa solo fonti ufficiali (COVIP, Morningstar, Sole 24 Ore). Restituisci esclusivamente il blocco JSON senza altro testo.`,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });

    // Fix: Extract JSON from potentially conversational response text
    const text = response.text || "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const data = jsonMatch ? JSON.parse(jsonMatch[0]) : {};
    
    // Fix: Extract grounding sources as required by mandatory guidelines
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    const sources = chunks ? chunks.filter((c: any) => c.web).map((c: any) => ({ title: c.web.title, uri: c.web.uri })) : [];
    
    return {
      id: `AI_${Date.now()}`,
      ...data,
      sources
    };
  } catch (error) {
    console.error("AI Search Error:", error);
    throw error;
  }
};

export interface HistoricalReturnsResponse {
  data: Record<number, number>;
  sources: Array<{ title: string; uri: string }>;
}

export const fetchHistoricalReturns = async (query: string): Promise<HistoricalReturnsResponse> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    // Fix: Added googleSearch tool to fetchHistoricalReturns for real-time market accuracy.
    // Removed JSON mode to prevent grounding metadata from causing parsing errors.
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Analizza e recupera i rendimenti percentuali annuali (Total Return) dal 2000 al 2024 per lo strumento finanziario o indice: "${query}". 
      I dati devono essere storicamente accurati. Consulta il tuo database interno e fonti finanziarie web.
      Restituisci esclusivamente un oggetto JSON con gli anni come chiavi e i rendimenti come valori numerici.
      Esempio: {"2000": 5.2, "2001": -3.5, ...}`,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });

    // Fix: Extract JSON block from response text
    const text = response.text || "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const data = jsonMatch ? JSON.parse(jsonMatch[0]) : {};
    
    // Fix: Mandatory grounding sources extraction
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    const sources = chunks ? chunks.filter((c: any) => c.web).map((c: any) => ({ title: c.web.title, uri: c.web.uri })) : [];
    
    return { data, sources };
  } catch (error) {
    console.error("Error fetching certified data:", error);
    throw error;
  }
};
