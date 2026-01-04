
import { RegulationItem, HistoricalDataPoint, CovipProduct } from './types';

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
  },
  TAX_NEW_BENEFITS_EXTRA: {
    REDUCTION_PER_YEAR: 0.0025
  },
  TAX_OLD_BENEFITS: {
    START_RATE: 0.15,
    MIN_RATE: 0.09,
    REDUCTION_PER_YEAR: 0.003
  }
};

export const COVIP_MARKET_DATA: CovipProduct[] = [
  { id: 'Z_PIP_AZN', company: 'ZURICH', name: 'Pension ESG Azionario', type: 'PIP', category: 'AZIONARIO', y1: 15.37, y5: 7.15, y10: 6.43, isCore: true },
  { id: 'Z_PIP_BIL8', company: 'ZURICH', name: 'Pension ESG Flex 8', type: 'PIP', category: 'BILANCIATO', y1: 7.82, y5: 0.75, y10: 1.83, isCore: true },
  { id: 'A_FPA_C25', company: 'ANIMA', name: 'Arti & Mestieri - Crescita 25+', type: 'FPA', category: 'AZIONARIO', y1: 13.66, y5: 6.79, y10: 6.00, isCore: true },
  { id: 'A_FPA_R10', company: 'ANIMA', name: 'Arti & Mestieri - Rivalutazione 10+', type: 'FPA', category: 'BILANCIATO', y1: 7.44, y5: 2.30, y10: 2.76, isCore: true },
  { id: 'P_PIP_VAL', company: 'POSTE VITA', name: 'Postaprevidenza Valore', type: 'PIP', category: 'GARANTITO', y1: 2.10, y5: 1.80, y10: 1.90 },
  { id: 'G_PIP_INV', company: 'GENERALI', name: 'Generali Global', type: 'PIP', category: 'BILANCIATO', y1: 5.40, y5: 2.10, y10: 1.50 },
  { id: 'AL_PIP_PREV', company: 'ALLEANZA', name: 'Alleanza Previdenza', type: 'PIP', category: 'AZIONARIO', y1: 8.20, y5: 3.50, y10: 2.80 },
  { id: 'AVG_FPA_AZN', company: 'MEDIA FPA', name: 'FPA Azionario Nazionale', type: 'BENCH', category: 'AZIONARIO', y1: 10.40, y5: 5.20, y10: 4.70 },
  { id: 'AVG_PIP_AZN', company: 'MEDIA PIP', name: 'PIP Azionario Nazionale', type: 'BENCH', category: 'AZIONARIO', y1: 13.00, y5: 5.50, y10: 4.70 },
  { id: 'TFR_BENCH', company: 'AZIENDA', name: 'Rivalutazione TFR (L. 297)', type: 'BENCH', category: 'GARANTITO', y1: 1.90, y5: 2.40, y10: 2.40 }
];

export const LTC_DATA = {
  INDENNITA_ACCOMPAGNAMENTO_2025: 531.76,
  ZURICH_OPTION_F_MULTIPLIER: 2.0,
  MARKET_RSA_COST_AVG: 3200,
  CAREGIVER_COST_MONTHLY: 1650
};

export const LTC_MARKET_INSIGHTS = {
  COST_RSA_NORTH: 3500,
  COST_RSA_SOUTH: 2200,
  CAREGIVERS_TOTAL: 7000000
};

export const SUCCESSION_DATA = {
  TAX_RATES: {
    SPOUSE_CHILDREN: { label: 'Coniuge e Parenti in linea retta', rate: 0.04, exemption: 1000000 },
    SIBLINGS: { label: 'Fratelli e Sorelle', rate: 0.06, exemption: 100000 },
    OTHER_KIN: { label: 'Altri Parenti fino al 4° grado', rate: 0.06, exemption: 0 },
    OTHERS: { label: 'Altri Soggetti', rate: 0.08, exemption: 0 },
    DISABLED: { label: 'Soggetto Portatore di Handicap Grave', rate: 0.00, exemption: 1500000 }
  },
  LEGAL_PILLARS: [
    { tag: 'CIVILE', focus: 'Legittima', ref: 'Art. 536 c.c.', text: 'La quota di legittima è la parte di patrimonio che deve essere riservata per legge ai familiari stretti.' },
    { tag: 'FISCALE', focus: 'Esenzione', ref: 'Art. 12 D.Lgs 346/90', text: 'Le somme corrisposte ai beneficiari di polizze vita sono esenti dall\'imposta di successione.' },
    { tag: 'PROPRIETÀ', focus: 'Iure Proprio', ref: 'Art. 1923 c.c.', text: 'Il diritto del beneficiario della polizza è un diritto proprio derivante dal contratto, non dalla successione.' }
  ]
};

export const PENSION_COEFFICIENTS = {
  FULL_DM_TABLE_2025: [
    { age: 57, coeff: 4.270 }, { age: 58, coeff: 4.375 }, { age: 59, coeff: 4.485 },
    { age: 60, coeff: 4.603 }, { age: 61, coeff: 4.726 }, { age: 62, coeff: 4.856 },
    { age: 63, coeff: 4.992 }, { age: 64, coeff: 5.138 }, { age: 65, coeff: 5.352 },
    { age: 66, coeff: 5.535 }, { age: 67, coeff: 5.723 }, { age: 68, coeff: 5.932 },
    { age: 69, coeff: 6.154 }, { age: 70, coeff: 6.395 }, { age: 71, coeff: 6.655 }
  ],
  COMPARISON_AGES: [
    { age: 57, label: "Età Minima", val1996: 4.720, val2025: 4.270 },
    { age: 65, label: "Standard Dini", val1996: 6.136, val2025: 5.352 },
    { age: 67, label: "Vecchiaia Oggi", val1996: 6.612, val2025: 5.723 }
  ],
  HISTORY_AGE_65: [
    { period: '1996-2009', value: 6.136 },
    { period: '2023-2025', value: 5.352 }
  ]
};

export const ZURICH_PRODUCT_DATA = {
  FUNDS_DETAILS: [
    { id: 'Z_AZIONARIO', name: 'Pension ESG Azionario', strategy: 'Global Equity ESG', risk: 'Alto', cost: '2,10%', perf2024: '+15,37%', returns: { y3: '+5,20%', y5: '+7,15%', y10: '+6,43%' }, composition: { equity: 95, debt: 5 } },
    { id: 'Z_FLEX8', name: 'Pension ESG Flex 8', strategy: 'Multi-Asset Active', risk: 'Medio', cost: '1,80%', perf2024: '+7,82%', returns: { y3: '+1,20%', y5: '+0,75%', y10: '+1,83%' }, composition: { equity: 60, debt: 40 } },
    { id: 'Z_GS_TREND', name: 'Gestione Separata Zurich Trend', strategy: 'Capital Protection', risk: 'Basso', cost: '1,20%', perf2024: '+2,87%', returns: { y3: '+2,50%', y5: '+2,60%', y10: '+2,80%' }, composition: { equity: 0, debt: 100 } }
  ],
  LIFE_CYCLE_SERIES: [
    { age: 25, azionario: 90, flex8: 10, flex4: 0, gs: 0 },
    { age: 45, azionario: 40, flex8: 30, flex4: 20, gs: 10 },
    { age: 65, azionario: 0, flex8: 0, flex4: 20, gs: 80 }
  ],
  USP: [
    { icon: 'UserCheck', color: 'bg-blue-50', title: 'Personalizzazione', desc: 'Strategia Life Cycle adattiva basata sull\'età.' },
    { icon: 'ShieldPlus', color: 'bg-purple-50', title: 'Opzione F', desc: 'Raddoppio della rendita in caso di LTC.' }
  ],
  COSTS: { loading_recurring: '3,00%' }
};

export const ANIMA_PRODUCT_DATA = {
  FUNDS_DETAILS: [
    { id: 'A_C25', name: 'Arti & Mestieri - Crescita 25+', strategy: 'Equity Focus', risk: 'Alto', cost: '1,35%', perf2024: '+13,66%', returns: { y3: '+4,80%', y5: '+6,79%', y10: '+6,00%' }, composition: { equity: 90, debt: 10 } },
    { id: 'A_R10', name: 'Arti & Mestieri - Rivalutazione 10+', strategy: 'Balanced', risk: 'Medio', cost: '1,20%', perf2024: '+7,44%', returns: { y3: '+1,90%', y5: '+2,30%', y10: '+2,76%' }, composition: { equity: 50, debt: 50 } }
  ],
  USP: [
    { icon: 'PieChart', color: 'bg-red-50', title: 'Efficienza', desc: 'Uno dei fondi aperti con i costi più bassi del mercato.' },
    { icon: 'ShieldCheck', color: 'bg-emerald-50', title: 'Istituzionale', desc: 'Classe I dedicata ai consulenti professionali.' }
  ],
  COSTS: { entry: '0 €', annual: '10 €', rita: '30 €', switch: '0 €', transfer: '0 €', loading: '0%' }
};

export const ZURICH_REGULATION_DATA = [
  { art: 'Art. 2', category: 'PRESTAZIONI', content: 'Decesso prima del pensionamento: maggiorazione 1% capitale.' },
  { art: 'Art. 11', category: 'FISCALE', content: 'Tassazione 15% ridotta fino al 9% dopo 35 anni.' },
  { art: 'Art. 22', category: 'RENDITE', content: 'Opzione F: Raddoppio rendita in caso di perdita autosufficienza (ADL).' }
];

export const REGULATIONS: RegulationItem[] = [
  { id: '1', title: 'D.Lgs. 252/05', category: 'DECRETO', content: 'La norma fondamentale sulla previdenza complementare in Italia.', reference: 'D.Lgs. 252/2005' },
  { id: '2', title: 'Circolare AdE 19/E 2024', category: 'CIRCOLARE', content: 'Chiarimenti sulla tassazione delle polizze vita e successione.', reference: 'Circolare 19/E', date: '2024' }
];

export const ZURICH_REMUNERATION_DATA = {
  EDITION: '2025.1',
  SALES_PAYOUT: [{ tier: '< 10M', rate: 0.70 }, { tier: '> 50M', rate: 0.875 }],
  MANAGEMENT_PAYOUT: [{ tier: '< 10M', rate: 0.40 }, { tier: '> 50M', rate: 0.55 }],
  RETROCESSIONS_ZB: { RECURRING_WITH_LTC: 0.04, RECURRING_NO_LTC: 0.035, ADDITIONAL: 0.02, TRANSFER_TFR: 0.01 }
};

export const ZURICH_MULTINVEST_DATA = {
  FEE_STRUCTURE: {
    A: { label: "Classe A", min: 50000, gs: 0.015, line: 0.025 },
    B: { label: "Classe B", min: 10000, gs: 0.018, line: 0.028 },
    C: { label: "Classe C", min: 0, gs: 0.02, line: 0.03 }
  }
};

export const ASSET_PROTECTION_DATA = {
  STRESS_TEST_SCENARIOS: {
    CIVILE_PROF: { 
      title: "Responsabilità Civile / Prof.", 
      legal_ref: "Art. 1923 c.c.", 
      bank: 0, 
      policy_standard: 50, 
      policy_90gs: 90, 
      pip: 100, 
      impact: "ALTO", 
      hook: "Dottore, i premi in polizza sono protetti per legge da creditori e pignoramenti.", 
      case_history: "Amministratore pignorato ha salvato il fondo perché considerato mezzo di sussistenza.",
      legal_deep: "L'impignorabilità delle polizze vita è sancita dall'Art. 1923 del Codice Civile."
    }
  },
  COMPARISON_MATRIX: [
    { asset: "CONTO CORRENTE", shield: "NULLO", risk: "100%", detail: "Pignorabile istantaneamente." },
    { asset: "FONDO PENSIONE", shield: "MASSIMO", risk: "NULLO", detail: "Segregazione patrimoniale speciale." }
  ]
};

export const ZURICH_SMART_CONSTANTS = {
  TARGET_ADVISORY: [{ title: 'Neo-Genitori', hook: 'Proteggi il loro futuro', need: 'Protezione reddito' }],
  PRICING_TABLE_100K: {
    NON_SMOKER: [{ age: 30, y5: 120, y10: 150, y15: 180, y20: 210 }, { age: 40, y5: 220, y10: 280, y15: 350, y20: 420 }],
    SMOKER: [{ age: 30, y5: 180, y10: 220, y15: 270, y20: 330 }, { age: 40, y5: 350, y10: 450, y15: 580, y20: 720 }]
  },
  INJURIES: [{ name: 'Frattura femore', level: 1, amount: 2500, category: 'FRATTURE' }],
  EXCLUSIONS: { TCM_SPECIFIC: [{ title: 'Dolo', desc: 'Atto volontario' }], GENERAL: [{ title: 'Guerra', desc: 'Eventi bellici' }], SPORTS: ['Pugilato'] }
};

export const ZURICH_SMART_TECHNICAL_DATA = {
  ACCUMULATION_LIMITS: [{ maxAge: 40, limit: 300000 }, { maxAge: 55, limit: 200000 }],
  WAITING_PERIOD: { EXCEPTIONS_DISEASES: ['Infarto', 'Ictus'] }
};

export const ZURICH_SMART_COMMISSION_DATA = {
  FIXED_PRACTICE_COST: 40,
  PAYIN_RATES: { DUR_5Y: 0.40, DUR_10_15_20Y: 0.80, RECURRING_AFTER_Y1: 0.10 },
  FIXED_PAYOUT: { NEW_BUSINESS: 0.875, RECURRING: 0.50 }
};

export const PROTECTION_PARADOX_DATA = {
  PIL_PROTECTION: { italy: 1.9, oecd_avg: 5.1 },
  HEALTH_OUT_OF_POCKET: { italy: 22, oecd_avg: 14 },
  PROFILES: { 
    SMALL: { tag: 'Retail', focus: 'Sicurezza', risk_economic: 'Alto', risk_health: 'Medio', risk_legacy: 'Basso' },
    LARGE: { tag: 'Wealth', focus: 'Protezione', risk_economic: 'Basso', risk_health: 'Alto', risk_legacy: 'Alto' }
  }
};

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

export const HISTORICAL_DATA_20Y: HistoricalDataPoint[] = [
  { year: 2000, inflation: 2.5, tfrRate: 3.38, ftseMib: 4.5, jpmGlobal: 3.2, event: 'Bolla DotCom' },
  { year: 2001, inflation: 2.8, tfrRate: 3.60, ftseMib: -25.0, jpmGlobal: 4.1, event: 'Attacco Torri Gemelle' },
  { year: 2002, inflation: 2.5, tfrRate: 3.38, ftseMib: -20.0, jpmGlobal: 5.5, event: 'Passaggio all\'Euro' },
  { year: 2003, inflation: 2.7, tfrRate: 3.53, ftseMib: 12.0, jpmGlobal: 3.8, event: 'Guerra Iraq' },
  { year: 2004, inflation: 2.2, tfrRate: 3.15, ftseMib: 15.0, jpmGlobal: 4.2, event: 'Recupero Economico' },
  { year: 2005, inflation: 1.9, tfrRate: 2.93, ftseMib: 13.0, jpmGlobal: 3.5, event: 'Fase Espansiva' },
  { year: 2006, inflation: 2.1, tfrRate: 3.08, ftseMib: 18.0, jpmGlobal: 2.8, event: 'Mondiali Germania' },
  { year: 2007, inflation: 1.8, tfrRate: 2.85, ftseMib: -5.0, jpmGlobal: 3.1, event: 'Riforma TFR (D.Lgs 252)' },
  { year: 2008, inflation: 3.3, tfrRate: 3.98, ftseMib: -49.0, jpmGlobal: 7.2, event: 'Crisi Lehman Brothers' },
  { year: 2009, inflation: 0.8, tfrRate: 2.10, ftseMib: 20.0, jpmGlobal: 2.5, event: 'Inizio Quantitative Easing' },
  { year: 2010, inflation: 1.5, tfrRate: 2.63, ftseMib: -10.0, jpmGlobal: 1.8, event: 'Crisi Debiti Sovrani' },
  { year: 2011, inflation: 2.8, tfrRate: 3.60, ftseMib: -25.0, jpmGlobal: 4.5, event: 'Governo Monti / Salva Italia' },
  { year: 2012, inflation: 3.0, tfrRate: 3.75, ftseMib: 8.0, jpmGlobal: 6.2, event: 'Whatever it takes (Draghi)' },
  { year: 2013, inflation: 1.2, tfrRate: 2.40, ftseMib: 16.0, jpmGlobal: 1.2, event: 'Elezioni Politiche IT' },
  { year: 2014, inflation: 0.2, tfrRate: 1.65, ftseMib: 0.5, jpmGlobal: 8.5, event: 'Inflazione Zero' },
  { year: 2015, inflation: 0.0, tfrRate: 1.50, ftseMib: 14.0, jpmGlobal: 2.1, event: 'Jobs Act' },
  { year: 2016, inflation: -0.1, tfrRate: 1.50, ftseMib: -10.0, jpmGlobal: 3.4, event: 'Brexit / Referendum Cost.' },
  { year: 2017, inflation: 1.2, tfrRate: 2.40, ftseMib: 15.0, jpmGlobal: 0.8, event: 'Introduzione PIR' },
  { year: 2018, inflation: 1.1, tfrRate: 2.33, ftseMib: -14.0, jpmGlobal: 1.5, event: 'Guerra Dazi USA/Cina' },
  { year: 2019, inflation: 0.6, tfrRate: 1.95, ftseMib: 28.0, jpmGlobal: 6.0, event: 'Rally Mercati' },
  { year: 2020, inflation: -0.2, tfrRate: 1.50, ftseMib: -5.0, jpmGlobal: 5.2, event: 'Pandemia COVID-19' },
  { year: 2021, inflation: 1.9, tfrRate: 2.93, ftseMib: 23.0, jpmGlobal: -1.5, event: 'Ripresa Post-Pandemica' },
  { year: 2022, inflation: 8.1, tfrRate: 7.58, ftseMib: -12.0, jpmGlobal: -15.0, event: 'Guerra Ucraina / Iperinflazione' },
  { year: 2023, inflation: 5.7, tfrRate: 5.78, ftseMib: 28.0, jpmGlobal: 4.5, event: 'Fine Rialzi Tassi BCE' },
  { year: 2024, inflation: 1.2, tfrRate: 2.40, ftseMib: 18.0, jpmGlobal: 5.5, event: 'Normalizzazione Inflazione' }
];

export const COMPANY_BENCHMARKS = [{ id: 'jpmGlobal', name: 'JPM Global Govt Bond' }];
