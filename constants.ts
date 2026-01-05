
import { RegulationItem, HistoricalDataPoint, CovipProduct, TaxRateInfo } from './types';

export const SYSTEM_INSTRUCTION = "Sei un esperto consulente finanziario e previdenziale del Gruppo Vomero. Il tuo obiettivo è fornire consulenza tecnica e commerciale basata sulla normativa italiana aggiornata alla Legge di Bilancio 2026. Sii professionale, accurato e persuasivo.";

export const BUDGET_2026_PARAMS = {
  IRPEF_2026: [
    { from: 0, to: 28000, rate: 0.23, label: "Fino a 28.000€" },
    { from: 28001, to: 50000, rate: 0.33, label: "28.001€ - 50.000€" },
    { from: 50001, to: 999999, rate: 0.43, label: "Oltre 50.000€" }
  ],
  DEDUCTIBILITY_LIMIT: 5300.00,
  EXTRA_DEDUCTIBILITY_BONUS: 2650.00, 
  MAX_TOTAL_DEDUCTION: 7950.00, 
  CAPITAL_WITHDRAWAL_LIMIT: 0.60, 
  TREASURY_OBLIGATION_2026: 60, 
  TREASURY_OBLIGATION_2032: 40,
  TAX_NEW_BENEFITS: {
    START_RATE: 0.20,
    MIN_RATE: 0.15,
    REDUCTION_PER_YEAR: 0.0025, 
    MAX_REDUCTION_POINTS: 0.05
  }
};

export const PENSION_COEFFICIENTS = {
  FULL_DM_TABLE_2025: [
    { age: 57, coeff: 4.270 }, { age: 58, coeff: 4.375 }, { age: 59, coeff: 4.485 },
    { age: 60, coeff: 4.603 }, { age: 61, coeff: 4.726 }, { age: 62, coeff: 4.856 },
    { age: 63, coeff: 4.992 }, { age: 64, coeff: 5.138 }, { age: 65, coeff: 5.352 },
    { age: 66, coeff: 5.535 }, { age: 67, coeff: 5.723 }, { age: 68, coeff: 5.932 },
    { age: 69, coeff: 6.154 }, { age: 70, coeff: 6.395 }, { age: 71, coeff: 6.655 }
  ],
  HISTORY: [
    { period: '1996 - 2009', v57: 4.720, v60: 5.163, v65: 6.136, v67: 6.612, v70: 7.420 },
    { period: '2010 - 2012', v57: 4.416, v60: 4.834, v65: 5.744, v67: 6.195, v70: 6.953 },
    { period: '2013 - 2015', v57: 4.304, v60: 4.711, v65: 5.594, v67: 6.035, v70: 6.772 },
    { period: '2016 - 2018', v57: 4.246, v60: 4.646, v65: 5.507, v67: 5.940, v70: 6.666 },
    { period: '2019 - 2020', v57: 4.200, v60: 4.519, v65: 5.245, v67: 5.604, v70: 6.208 },
    { period: '2021 - 2022', v57: 4.186, v60: 4.515, v65: 5.220, v67: 5.575, v70: 6.175 },
    { period: '2023 - 2025', v57: 4.270, v60: 4.603, v65: 5.352, v67: 5.723, v70: 6.395 }
  ]
};

export const COVIP_MARKET_DATA: CovipProduct[] = [
  { id: 'Z_PIP_AZN', company: 'ZURICH', name: 'Pension ESG Azionario', type: 'PIP', category: 'AZIONARIO', y1: 15.37, y5: 7.15, y10: 6.43, isCore: true },
  { id: 'A_FPA_C25', company: 'ANIMA', name: 'Arti & Mestieri - Crescita 25+', type: 'FPA', category: 'AZIONARIO', y1: 13.66, y5: 6.79, y10: 6.00, isCore: true }
];

export const HISTORICAL_DATA_20Y: HistoricalDataPoint[] = [
  { year: 2000, inflation: 2.5, tfrRate: 3.38, ftseMib: 4.5, jpmGlobal: 3.2, jpmIta35: 3.5, jpmIta57: 4.1, jpmIta10: 5.2, msciWorldEur: -2.1, event: 'Bolla DotCom' },
  { year: 2001, inflation: 2.8, tfrRate: 3.60, ftseMib: -25.0, jpmGlobal: 2.5, jpmIta35: 3.1, jpmIta57: 3.8, jpmIta10: 4.5, msciWorldEur: -15.4, event: '11 Settembre / Euro Fisico' },
  { year: 2002, inflation: 2.5, tfrRate: 3.38, ftseMib: -26.0, jpmGlobal: 1.8, jpmIta35: 2.9, jpmIta57: 3.5, jpmIta10: 4.2, msciWorldEur: -32.1, event: 'Introduzione Euro' },
  { year: 2003, inflation: 2.7, tfrRate: 3.53, ftseMib: 14.0, jpmGlobal: 3.5, jpmIta35: 3.8, jpmIta57: 4.2, jpmIta10: 5.0, msciWorldEur: 15.8, event: 'Guerra in Iraq' },
  { year: 2004, inflation: 2.2, tfrRate: 3.15, ftseMib: 18.0, jpmGlobal: 4.2, jpmIta35: 4.0, jpmIta57: 4.5, jpmIta10: 5.3, msciWorldEur: 9.5, event: 'Allargamento UE' },
  { year: 2005, inflation: 1.9, tfrRate: 2.93, ftseMib: 15.5, jpmGlobal: 3.8, jpmIta35: 3.6, jpmIta57: 4.1, jpmIta10: 4.8, msciWorldEur: 26.2, event: 'Protocollo Kyoto' },
  { year: 2006, inflation: 2.1, tfrRate: 3.08, ftseMib: 19.0, jpmGlobal: 2.9, jpmIta35: 3.2, jpmIta57: 3.6, jpmIta10: 4.1, msciWorldEur: 7.4, event: 'Riforma D.Lgs 252/05' },
  { year: 2007, inflation: 1.8, tfrRate: 2.85, ftseMib: -7.0, jpmGlobal: 4.5, jpmIta35: 4.2, jpmIta57: 4.7, jpmIta10: 5.2, msciWorldEur: -1.7, event: 'Inizio Crisi Subprime' },
  { year: 2008, inflation: 3.3, tfrRate: 3.98, ftseMib: -48.0, jpmGlobal: 6.8, jpmIta35: 5.5, jpmIta57: 6.2, jpmIta10: 7.5, msciWorldEur: -37.6, event: 'Lehman Brothers' },
  { year: 2009, inflation: 0.8, tfrRate: 2.10, ftseMib: 19.5, jpmGlobal: 5.2, jpmIta35: 4.8, jpmIta57: 5.4, jpmIta10: 6.5, msciWorldEur: 25.9, event: 'Grande Recessione' },
  { year: 2010, inflation: 1.5, tfrRate: 2.63, ftseMib: -13.0, jpmGlobal: 4.1, jpmIta35: 4.3, jpmIta57: 4.8, jpmIta10: 5.8, msciWorldEur: 19.5, event: 'Crisi Debito Greco' },
  { year: 2011, inflation: 2.8, tfrRate: 3.60, ftseMib: -25.0, jpmGlobal: 3.5, jpmIta35: 4.5, jpmIta57: 5.2, jpmIta10: 6.8, msciWorldEur: -2.4, event: 'Crisi Spread / Gov. Monti' },
  { year: 2012, inflation: 3.0, tfrRate: 3.75, ftseMib: 8.0, jpmGlobal: 6.2, jpmIta35: 5.8, jpmIta57: 6.5, jpmIta10: 7.2, msciWorldEur: 14.1, event: 'Whatever it takes (BCE)' },
  { year: 2013, inflation: 1.2, tfrRate: 2.40, ftseMib: 16.5, jpmGlobal: -1.5, jpmIta35: 2.2, jpmIta57: 3.5, jpmIta10: 4.8, msciWorldEur: 17.5, event: 'Recessione Tripla' },
  { year: 2014, inflation: 0.2, tfrRate: 1.65, ftseMib: 0.5, jpmGlobal: 8.5, jpmIta35: 4.2, jpmIta57: 5.8, jpmIta10: 7.5, msciWorldEur: 19.5, event: 'Quantitative Easing' },
  { year: 2015, inflation: 0.0, tfrRate: 1.50, ftseMib: 12.0, jpmGlobal: 1.5, jpmIta35: 1.8, jpmIta57: 2.5, jpmIta10: 3.2, msciWorldEur: 8.2, event: 'Expo Milano' },
  { year: 2016, inflation: -0.1, tfrRate: 1.50, ftseMib: -10.0, jpmGlobal: 3.8, jpmIta35: 2.1, jpmIta57: 2.8, jpmIta10: 3.5, msciWorldEur: 10.7, event: 'Brexit / Trump' },
  { year: 2017, inflation: 1.2, tfrRate: 2.40, ftseMib: 14.0, jpmGlobal: -0.5, jpmIta35: 1.5, jpmIta57: 2.1, jpmIta10: 2.8, msciWorldEur: 7.5, event: 'Ripresa Area Euro' },
  { year: 2018, inflation: 1.1, tfrRate: 2.33, ftseMib: -16.0, jpmGlobal: 0.2, jpmIta35: 0.8, jpmIta57: 1.2, jpmIta10: 1.8, msciWorldEur: -4.1, event: 'Tensioni USA-Cina' },
  { year: 2019, inflation: 0.6, tfrRate: 1.95, ftseMib: 28.0, jpmGlobal: 5.8, jpmIta35: 2.5, jpmIta57: 3.5, jpmIta10: 4.5, msciWorldEur: 30.0, event: 'Rallentamento Globale' },
  { year: 2020, inflation: -0.2, tfrRate: 1.50, ftseMib: -5.0, jpmGlobal: 7.2, jpmIta35: 1.2, jpmIta57: 1.8, jpmIta10: 2.5, msciWorldEur: 6.3, event: 'Pandemia COVID-19' },
  { year: 2021, inflation: 1.9, tfrRate: 2.93, ftseMib: 23.0, jpmGlobal: -2.1, jpmIta35: -0.5, jpmIta57: -1.2, jpmIta10: -2.5, msciWorldEur: 31.1, event: 'PNRR / Crisi Energetica' },
  { year: 2022, inflation: 8.1, tfrRate: 7.58, ftseMib: -12.0, jpmGlobal: -12.5, jpmIta35: -8.5, jpmIta57: -10.2, jpmIta10: -15.8, msciWorldEur: -12.8, event: 'Guerra Ucraina / Shock Inflazione' },
  { year: 2023, inflation: 5.7, tfrRate: 5.78, ftseMib: 28.0, jpmGlobal: 4.5, jpmIta35: 5.2, jpmIta57: 6.8, jpmIta10: 8.5, msciWorldEur: 19.6, event: 'Rialzo Tassi BCE' },
  { year: 2024, inflation: 1.2, tfrRate: 2.40, ftseMib: 18.0, jpmGlobal: 5.5, jpmIta35: 3.2, jpmIta57: 4.5, jpmIta10: 5.8, msciWorldEur: 14.2, event: 'Normalizzazione / AI Boom' }
];

export const ASSET_PROTECTION_DATA = {
  STRESS_TEST_SCENARIOS: {
    CIVILE_PROF: { title: "Resp. Civile / Prof", impact: "ALTO", legal_ref: "Art. 2043 c.c.", hook: "La polizza professionale copre il danno, ma non protegge i suoi risparmi bancari dal sequestro preventivo.", bank: 0, policy_standard: 60, policy_90gs: 90, pip: 100 },
    CULPA_EDUCANDO: { title: "Culpa in Educando", impact: "CRITICO", legal_ref: "Art. 2048 c.c.", hook: "Se suo figlio causasse un danno milionario a scuola, lei ne risponderebbe col suo intero patrimonio liquido.", bank: 0, policy_standard: 40, policy_90gs: 85, pip: 100 },
    CULPA_VIGILANDO: { title: "Culpa in Vigilando", impact: "MEDIO", legal_ref: "Art. 2049 c.c.", hook: "Come imprenditore o committente, risponde dei danni causati dai suoi collaboratori. Solo il fondo pensione è un'isola inattaccabile.", bank: 0, policy_standard: 50, policy_90gs: 80, pip: 100 },
    FALLIMENTARE: { title: "Resp. Amministratore (D&O)", impact: "MASSIMO", legal_ref: "Art. 150 CCII", hook: "In caso di liquidazione giudiziale, le somme in previdenza complementare sono escluse dalla massa fallimentare.", bank: 0, policy_standard: 30, policy_90gs: 80, pip: 100 },
    FAMILIARE: { title: "Controversie Familiari", impact: "MEDIO", legal_ref: "Art. 1923 c.c.", hook: "In caso di separazione o liti ereditarie, il fondo pensione è un patrimonio autonomo che segue regole speciali.", bank: 10, policy_standard: 70, policy_90gs: 90, pip: 100 },
    COSE_IN_CUSTODIA: { title: "Cose in Custodia", impact: "ALTO", legal_ref: "Art. 2051 c.c.", hook: "Un incendio nella sua seconda casa? La responsabilità è presunta. Lo scudo Zurich protegge il capitale dalla pignorabilità.", bank: 0, policy_standard: 55, policy_90gs: 88, pip: 100 },
    RESP_SOCIETARIA: { title: "Resp. Societaria", impact: "CRITICO", legal_ref: "Art. 2476 c.c.", hook: "Le azioni dei creditori contro il socio amministratore per mala gestio non varcano la soglia del Fondo Pensione.", bank: 0, policy_standard: 45, policy_90gs: 82, pip: 100 }
  },
  COMPARISON_MATRIX: [
    { asset: "Conto Corrente", shield: "NULLO", risk: "Pignorabile 100%", detail: "Soggetto a blocco immediato presso terzi." },
    { asset: "Immobili", shield: "BASSO", risk: "Ipotecabile", detail: "Soggetto a ipoteca giudiziale e pignoramento immobiliare." },
    { asset: "Fondo Pensione", shield: "MASSIMO", risk: "Impignorabile 100%", detail: "Tutela costituzionale Art. 38 e Art. 2117 c.c. Inattaccabile." },
    { asset: "Polizza Multiramo", shield: "ALTO", risk: "Protetto Art. 1923", detail: "Escluso dalle azioni esecutive se ha finalità previdenziale." }
  ]
};

export const REGULATIONS: RegulationItem[] = [
  { id: '1', title: 'D.Lgs. 252/05', category: 'DECRETO', content: 'La norma fondamentale sulla previdenza complementare in Italia.', reference: 'D.Lgs. 252/2005' }
];

export const MARKET_INSIGHTS_2025 = {
  INTERNATIONAL_RANKING: [{ country: 'Italia', gdp_pct: 11.1 }, { country: 'Media OCSE', gdp_pct: 85 }],
  MEMBERSHIP_STATS: { NON_PAYERS_PCT: 27.7, TFR_SHARE_PCT: 42 },
  GLOBAL_GIANTS: [{ name: 'USA', value: 1500, color: '#4f46e5' }],
  TAXATION_HISTORY: [{ year: 2011, rate: 11 }, { year: 2014, rate: 20 }],
  UE_EMPLOYMENT_COMPARISON: [{ name: 'Italia', label: 'PMI', pmi_pct: 95 }],
  ASSET_DISTRIBUTION: [
    { name: 'Fondi Negoziali', value: 33 },
    { name: 'Fondi Aperti', value: 25 },
    { name: 'PIP', value: 42 }
  ],
  ITALIAN_PMI_STRUCTURE: [
    { name: 'Micro (0-9)', value: 95 },
    { name: 'Piccole (10-49)', value: 4 },
    { name: 'Medie (50-249)', value: 0.8 },
    { name: 'Grandi (250+)', value: 0.2 }
  ]
};

export const COMPANY_BENCHMARKS = [
  { id: 'jpmGlobal', name: 'JPM Global Bond' },
  { id: 'jpmIta35', name: 'JPM Italy 3-5Y' },
  { id: 'jpmIta57', name: 'JPM Italy 5-7Y' },
  { id: 'jpmIta10', name: 'JPM Italy 10Y' },
  { id: 'msciWorldEur', name: 'MSCI World EUR' },
  { id: 'ftseMib', name: 'FTSE MIB' }
];

export const ZURICH_PRODUCT_DATA = {
  USP: [
    { title: "Efficienza", desc: "Gestione attiva per massimizzare i rendimenti nel tempo.", icon: "UserCheck", color: "bg-blue-50" },
    { title: "Flessibilità", desc: "Possibilità di variare i versamenti in base alle necessità.", icon: "Wallet", color: "bg-green-50" },
    { title: "Protezione", desc: "Garanzie integrate per la tutela della persona e del patrimonio.", icon: "ShieldPlus", color: "bg-purple-50" },
    { title: "Trasparenza", desc: "Costi competitivi e rendicontazione chiara.", icon: "PieChart", color: "bg-indigo-50" }
  ],
  COSTS: { loading_recurring: "3,00%" },
  FUNDS_DETAILS: [
    { name: "Pension ESG Azionario", strategy: "Azionaria Internazionale", cost: "2,10%", risk: "Alto", perf2024: "15,37%", composition: { equity: 95, debt: 5 } },
    { name: "Pension ESG Bilanciato", strategy: "Bilanciata", cost: "1,80%", risk: "Medio", perf2024: "8,50%", composition: { equity: 50, debt: 50 } }
  ],
  LIFE_CYCLE_SERIES: [
    { age: 30, gs: 0, flex4: 20, flex8: 20, azionario: 60 },
    { age: 40, gs: 20, flex4: 20, flex8: 30, azionario: 30 },
    { age: 50, gs: 40, flex4: 20, flex8: 20, azionario: 20 },
    { age: 60, gs: 70, flex4: 15, flex8: 15, azionario: 0 },
    { age: 65, gs: 80, flex4: 10, flex8: 10, azionario: 0 }
  ]
};

export const ZURICH_REGULATION_DATA = [
  { art: "Art. 1", category: "PRESTAZIONI", content: "Regolamentazione delle prestazioni pensionistiche." },
  { art: "Art. 5", category: "COSTI", content: "Dettaglio delle spese di gestione e dei caricamenti sui premi." },
  { art: "Art. 12", category: "SUCCESSIONE", content: "Esclusione dall'asse ereditario per le somme liquidate ai beneficiari." },
  { art: "Art. 15", category: "ANTICIPAZIONI", content: "Requisiti per la richiesta di anticipo per acquisto prima casa." }
];

export const ZURICH_REMUNERATION_DATA = {
  EDITION: "2025",
  SALES_PAYOUT: [
    { tier: "0-4M", rate: 0.60 },
    { tier: "4-6.5M", rate: 0.60 },
    { tier: "6.5-10M", rate: 0.62 },
    { tier: "10-20M", rate: 0.65 },
    { tier: "20M+", rate: 0.70 }
  ],
  MANAGEMENT_PAYOUT: [
    { tier: "0-4M", rate: 0.40 },
    { tier: "4-6.5M", rate: 0.42 },
    { tier: "6.5-10M", rate: 0.45 },
    { tier: "10M+", rate: 0.50 }
  ],
  RETROCESSIONS_ZB: { 
    RECURRING_WITH_LTC: 0.03, 
    RECURRING_NO_LTC: 0.02, 
    ADDITIONAL: 0.01, 
    TRANSFER_TFR: 0.02 
  }
};

export const ANIMA_PRODUCT_DATA = {
  USP: [
    { title: "Efficienza Istituzionale", desc: "Costi competitivi grazie alla Classe I dedicata.", icon: "PieChart", color: "bg-red-50" },
    { title: "Sostenibilità ESG", desc: "Investimenti focalizzati su criteri ambientali e sociali.", icon: "ShieldCheck", color: "bg-emerald-50" }
  ],
  COSTS: { entry: "0€", annual: "10€", rita: "50€", switch: "0€", transfer: "0€", loading: "0%" },
  FUNDS_DETAILS: [
    { name: "Arti & Mestieri - Crescita 25+", strategy: "Azionaria", cost: "1,35%", perf2024: "13,66%", returns: { y3: "12,5%", y5: "6,79%", y10: "6,00%" }, composition: { equity: 85, debt: 15 } },
    { name: "Arti & Mestieri - Bilanciata", strategy: "Bilanciata", cost: "1,10%", perf2024: "7,80%", returns: { y3: "5,5%", y5: "3,8%", y10: "3,5%" }, composition: { equity: 40, debt: 60 } }
  ]
};

export const LTC_DATA = {
  INDENNITA_ACCOMPAGNAMENTO_2025: 531.76
};

export const LTC_MARKET_INSIGHTS = {
  RSA_MONTHLY_COST: 3000,
  CAREGIVERS_COUNT: 7000000
};

export const SUCCESSION_DATA = {
  TAX_RATES: {
    SPOUSE_CHILDREN: { label: "Coniuge e Figli", rate: 0.04, exemption: 1000000 },
    BROTHERS_SISTERS: { label: "Fratelli e Sorelle", rate: 0.06, exemption: 100000 },
    OTHER_RELATIVES: { label: "Altri Parenti (fino 4°)", rate: 0.06, exemption: 0 },
    OTHERS: { label: "Altri Soggetti", rate: 0.08, exemption: 0 }
  } as Record<string, TaxRateInfo>,
  LEGAL_PILLARS: [
    { tag: "Fiscale", focus: "Esenzione Art. 12", ref: "D.Lgs 346/90", text: "Le somme corrisposte ai beneficiari di polizze vita sono escluse dall'attivo ereditario." },
    { tag: "Civile", focus: "Impignorabilità", ref: "Art. 1923 c.c.", text: "Le somme dovute dall'assicuratore non possono essere sequestrate o pignorate." },
    { tag: "Successorio", focus: "Iure Proprio", ref: "Diritto Civile", text: "Il capitale viene liquidato direttamente ai beneficiari senza passare per la successione." }
  ]
};

export const ZURICH_SMART_CONSTANTS = {
  INJURIES: [
    { category: "Fratture", name: "Frattura Femore", level: 2, amount: 7500 },
    { category: "Organi", name: "Perdita un occhio", level: 4, amount: 25000 }
  ],
  PRICING_TABLE_100K: { 
    SMOKER: [
      { age: 30, y5: 120, y10: 180, y15: 250, y20: 320 },
      { age: 40, y5: 200, y10: 300, y15: 420, y20: 550 },
      { age: 50, y5: 450, y10: 650, y15: 880, y20: 1100 }
    ], 
    NON_SMOKER: [
      { age: 30, y5: 80, y10: 120, y15: 170, y20: 220 },
      { age: 40, y5: 140, y10: 210, y15: 290, y20: 380 },
      { age: 50, y5: 320, y10: 460, y15: 620, y20: 800 }
    ]
  }
};

export const ZURICH_SMART_TECHNICAL_DATA = {};

export const ZURICH_SMART_COMMISSION_DATA = {
  FIXED_PRACTICE_COST: 40,
  PAYIN_RATES: { 
    DUR_5Y: 0.40, 
    DUR_10_15_20Y: 0.80 
  },
  FIXED_PAYOUT: { 
    NEW_BUSINESS: 0.875 
  }
};

export const ZURICH_MULTINVEST_DATA = {
  FEE_STRUCTURE: {
    A: { label: "Patrimoni < 250k", min: 0, gs: 0.012, line: 0.018 },
    B: { label: "Patrimoni 250k-500k", min: 250000, gs: 0.010, line: 0.015 },
    C: { label: "Patrimoni > 500k", min: 500000, gs: 0.008, line: 0.012 }
  }
};

export const PROTECTION_PARADOX_DATA = {
  PIL_PROTECTION: { italy: 1.9, oecd_avg: 5.1 },
  HEALTH_OUT_OF_POCKET: { italy: 22, oecd_avg: 18 },
  PROFILES: {
    SMALL: { tag: "Nucleo Standard", focus: "Protezione Reddito", risk_economic: "Elevato", risk_health: "Medio", risk_legacy: "Basso" },
    LARGE: { tag: "Nucleo Wealth", focus: "Protezione Asset", risk_economic: "Basso", risk_health: "Elevato", risk_legacy: "Critico" }
  }
};
