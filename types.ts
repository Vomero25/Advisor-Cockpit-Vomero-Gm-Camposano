

export enum PageView {
  DASHBOARD = 'DASHBOARD',
  INTERVIEW = 'INTERVIEW', 
  VANTAGGI_LAVORATORI = 'VANTAGGI_LAVORATORI',
  VANTAGGI_AZIENDE = 'VANTAGGI_AZIENDE',
  SIMULATOR = 'SIMULATOR',
  RITA_SIMULATOR = 'RITA_SIMULATOR',
  CORPORATE_SIMULATOR = 'CORPORATE_SIMULATOR',
  TFM_SIMULATOR = 'TFM_SIMULATOR',
  AI_ASSISTANT = 'AI_ASSISTANT',
  NEGOTIATION = 'NEGOTIATION',
  MULTINVEST_ANALYSIS = 'MULTINVEST_ANALYSIS',
  ASSET_PROTECTION = 'ASSET_PROTECTION', 
  FISCAL_CALCULATOR = 'FISCAL_CALCULATOR',
  SNOWBALL_EFFECT = 'SNOWBALL_EFFECT',
  LTC_ANALYSIS = 'LTC_ANALYSIS',
  SUCCESSION_ANALYSIS = 'SUCCESSION_ANALYSIS',
  REAL_ESTATE_TAX = 'REAL_ESTATE_TAX',
  REAL_ESTATE_SUCCESSION = 'REAL_ESTATE_SUCCESSION',
  PAC_SIMULATOR = 'PAC_SIMULATOR',
  COVIP_BENCHMARK = 'COVIP_BENCHMARK',
  PROTECTION_PARADOX = 'PROTECTION_PARADOX',
  WEALTH_PROTECTION_MASTERCLASS = 'WEALTH_PROTECTION_MASTERCLASS',
  COMPARATORE = 'COMPARATORE',
  MARKET_DIMENSIONS = 'MARKET_DIMENSIONS',
  BEHAVIORAL_FINANCE = 'BEHAVIORAL_FINANCE',
  PENSION_EROSION = 'PENSION_EROSION',
  PENSION_GEOGRAPHY = 'PENSION_GEOGRAPHY',
  BUDGET_2026 = 'BUDGET_2026',
  COVIP_ANALYTICS_2024 = 'COVIP_ANALYTICS_2024',
  COVIP_INTELLIGENCE_2024 = 'COVIP_INTELLIGENCE_2024',
  METHODOLOGY = 'METHODOLOGY',
  PRODUCT_ANALYSIS = 'PRODUCT_ANALYSIS',
  ZURICH_SMART_PROTECTION = 'ZURICH_SMART_PROTECTION',
  ANIMA_ANALYSIS = 'ANIMA_ANALYSIS',
  NORMATIVA = 'NORMATIVA',
  EXTRA_DEDUCTIBILITY = 'EXTRA_DEDUCTIBILITY',
  ZURICH_SPAZIO_PREVIDENZA = 'ZURICH_SPAZIO_PREVIDENZA',
  FISCAL_ARBITRAGE = 'FISCAL_ARBITRAGE',
  REGULATIONS_FONDI = 'REGULATIONS_FONDI',
  COEFFICIENTS_EVOLUTION = 'COEFFICIENTS_EVOLUTION'
}

export interface CovipProduct {
  id: string;
  company: string;
  name: string;
  type: 'FPA' | 'PIP' | 'BENCH';
  category: 'AZIONARIO' | 'BILANCIATO' | 'PRUDENTE_OBB' | 'GARANTITO';
  y1: number;
  y5: number;
  y10: number;
  isCore?: boolean;
}

export interface HistoricalDataPoint {
  year: number;
  inflation: number;
  tfrRate: number;
  ftseMib: number;
  jpmGlobal: number;
  jpmIta35: number;
  jpmIta57: number;
  jpmIta10: number;
  msciWorldEur: number;
  event: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isError?: boolean;
}

export type RegulationCategory = 'DECRETO' | 'CIRCOLARE' | 'RISOLUZIONE' | 'GUIDA' | 'PRODOTTO' | 'ALTRO';

export interface RegulationItem {
  id: string;
  title: string;
  category: RegulationCategory;
  content: string;
  reference: string; 
  date?: string;
}

export interface BenefitItem {
  title: string;
  description: string;
  icon: string;
  highlight?: string;
}

// Add TaxRateInfo interface
export interface TaxRateInfo {
  label: string;
  rate: number;
  exemption: number;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_KEY: string;
      [key: string]: string | undefined;
    }
  }
}