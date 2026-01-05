
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
    return "Errore nel servizio di consulenza. Verifica la connessione o la configurazione della chiave API.";
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
  rawText?: string;
}

export const fetchFundPerformance = async (query: string): Promise<FundPerformanceResponse> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Recupera i dati ufficiali COVIP aggiornati al 2024 per il fondo pensione: "${query}". 
      Fornisci i rendimenti netti (1 anno, 5 anni, 10 anni).
      Tenta di formattare i dati finali in questo modo JSON alla fine del testo:
      {"company": "Nome", "name": "Fondo", "type": "FPA", "category": "AZIONARIO", "y1": 10.5, "y5": 5.2, "y10": 4.8}`,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });

    const text = response.text || "";
    let data = { company: 'AI Search', name: query, type: 'FPA' as const, category: 'AZIONARIO' as const, y1: 0, y5: 0, y10: 0 };
    
    // Tenta di estrarre JSON se presente, altrimenti usa il testo
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[0]);
        data = { ...data, ...parsed };
      } catch (e) {
        console.warn("Could not parse JSON from search result");
      }
    }
    
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    const sources = chunks ? chunks.filter((c: any) => c.web).map((c: any) => ({ title: c.web.title, uri: c.web.uri })) : [];
    
    return {
      id: `AI_${Date.now()}`,
      ...data,
      sources,
      rawText: text
    };
  } catch (error) {
    console.error("AI Search Error:", error);
    throw error;
  }
};

export interface HistoricalReturnsResponse {
  data: Record<number, number>;
  sources: Array<{ title: string; uri: string }>;
  explanation?: string;
}

export const fetchHistoricalReturns = async (query: string): Promise<HistoricalReturnsResponse> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Recupera i rendimenti annuali dal 2000 al 2024 per: "${query}". 
      Restituisci i dati in un oggetto JSON finale: {"2024": 5.5, "2023": -2.1, ...}`,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });

    const text = response.text || "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const data = jsonMatch ? JSON.parse(jsonMatch[0]) : {};
    
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    const sources = chunks ? chunks.filter((c: any) => c.web).map((c: any) => ({ title: c.web.title, uri: c.web.uri })) : [];
    
    return { data, sources, explanation: text };
  } catch (error) {
    console.error("Error fetching historical data:", error);
    throw error;
  }
};
