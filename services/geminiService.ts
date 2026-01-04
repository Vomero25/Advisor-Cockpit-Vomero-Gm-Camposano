
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
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Recupera i dati ufficiali COVIP per il seguente fondo pensione o società: "${query}". 
      Mi servono: 
      1. Rendimento netto 2024 (y1)
      2. Media annua 5 anni (y5)
      3. Media annua 10 anni (y10)
      4. Tipologia (PIP o FPA)
      5. Categoria (AZIONARIO, BILANCIATO, PRUDENTE_OBB, GARANTITO).
      Usa solo fonti ufficiali (COVIP, Morningstar, Sole 24 Ore).`,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            company: { type: Type.STRING },
            name: { type: Type.STRING },
            type: { type: Type.STRING, enum: ['FPA', 'PIP'] },
            category: { type: Type.STRING, enum: ['AZIONARIO', 'BILANCIATO', 'PRUDENTE_OBB', 'GARANTITO'] },
            y1: { type: Type.NUMBER },
            y5: { type: Type.NUMBER },
            y10: { type: Type.NUMBER }
          },
          required: ['company', 'name', 'type', 'category', 'y1']
        }
      }
    });

    const data = JSON.parse(response.text || "{}");
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
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Analizza e recupera i rendimenti percentuali annuali (Total Return) dal 2000 al 2024 per lo strumento finanziario o indice: "${query}". 
      I dati devono essere storicamente accurati. Consulta il tuo database interno di dati finanziari (Morningstar, Bloomberg).
      Restituisci esclusivamente un oggetto JSON con gli anni come chiavi e i rendimenti come valori numerici.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            "2000": { type: Type.NUMBER }, "2001": { type: Type.NUMBER }, "2002": { type: Type.NUMBER },
            "2003": { type: Type.NUMBER }, "2004": { type: Type.NUMBER }, "2005": { type: Type.NUMBER },
            "2006": { type: Type.NUMBER }, "2007": { type: Type.NUMBER }, "2008": { type: Type.NUMBER },
            "2009": { type: Type.NUMBER }, "2010": { type: Type.NUMBER }, "2011": { type: Type.NUMBER },
            "2012": { type: Type.NUMBER }, "2013": { type: Type.NUMBER }, "2014": { type: Type.NUMBER },
            "2015": { type: Type.NUMBER }, "2016": { type: Type.NUMBER }, "2017": { type: Type.NUMBER },
            "2018": { type: Type.NUMBER }, "2019": { type: Type.NUMBER }, "2020": { type: Type.NUMBER },
            "2021": { type: Type.NUMBER }, "2022": { type: Type.NUMBER }, "2023": { type: Type.NUMBER },
            "2024": { type: Type.NUMBER }
          }
        }
      }
    });

    const data = JSON.parse(response.text || "{}");
    const sources: Array<{ title: string; uri: string }> = [];
    
    return { data, sources };
  } catch (error) {
    console.error("Error fetching certified data:", error);
    throw error;
  }
};
