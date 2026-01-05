
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
  RSA_COSTS: { NORTH: 3500, SOUTH: 2500 },
  CAREGIVERS_ITALY: 7000000
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

export const ZURICH_REGULATION_DATA = [
  { art: 'Art. 2', content: 'Prestazione in caso di decesso dell\'Aderente prima del pensionamento.', category: 'PRESTAZIONI' },
  { art: 'Art. 11', content: 'Tassazione agevolata sulle prestazioni pensionistiche (15% - 9%).', category: 'FISCALITÀ' },
  { art: 'Art. 12', content: 'Esenzione totale dall\'imposta di successione per i beneficiari.', category: 'SUCCESSIONE' },
  { art: 'Art. 1923', content: 'Impignorabilità e insequestrabilità delle somme dovute dall\'assicuratore.', category: 'PROTEZIONE' }
];

export const ZURICH_REMUNERATION_DATA = {
  EDITION: '10/2025',
  SALES_PAYOUT: [
    { tier: '0 - 4 Mln', rate: 0.60 },
    { tier: '4 - 6.5 Mln', rate: 0.60 },
    { tier: '6.5 - 10 Mln', rate: 0.62 },
    { tier: '10 - 20 Mln', rate: 0.65 },
    { tier: 'Oltre 20 Mln', rate: 0.70 }
  ],
  MANAGEMENT_PAYOUT: [
    { rate: 0.45 },
    { rate: 0.45 },
    { rate: 0.45 },
    { rate: 0.45 },
    { rate: 0.45 }
  ],
  RETROCESSIONS_ZB: {
    RECURRING_WITH_LTC: 0.03,
    RECURRING_NO_LTC: 0.02,
    ADDITIONAL: 0.02,
    TRANSFER_TFR: 0.02
  }
};

export const ZURICH_MULTINVEST_DATA = {
  FEE_STRUCTURE: {
    A: { label: 'Classe A', gs: 0.012, line: 0.018, min: 50000 },
    B: { label: 'Classe B', gs: 0.010, line: 0.015, min: 250000 },
    C: { label: 'Classe C', gs: 0.008, line: 0.012, min: 500000 }
  }
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

export const ZURICH_SMART_CONSTANTS = {
  TARGET_ADVISORY: [
    { title: 'Genitori / Famiglie', hook: 'Proteggi il futuro dei tuoi figli', need: 'Capitale per decesso' },
    { title: 'Professionisti', hook: 'Il valore del tuo tempo e fisico', need: 'Indennizzo per lesioni' },
    { title: 'Adulti & Senior', hook: 'Tutela il patrimonio investito', need: 'Liquidità per successione' }
  ],
  PRICING_TABLE_100K: {
    NON_SMOKER: [
      { age: 30, y5: 182, y10: 191, y15: 203, y20: 225 },
      { age: 40, y5: 238, y10: 267, y15: 302, y20: 361 },
      { age: 50, y5: 395, y10: 479, y15: 571, y20: 723 },
      { age: 60, y5: 896, y10: 1129, y15: 1376, y20: 0 },
      { age: 70, y5: 2100, y10: 0, y15: 0, y20: 0 }
    ],
    SMOKER: [
      { age: 30, y5: 216, y10: 231, y15: 252, y20: 289 },
      { age: 40, y5: 312, y10: 364, y15: 422, y20: 523 },
      { age: 50, y5: 585, y10: 726, y15: 883, y20: 1140 },
      { age: 60, y5: 1447, y10: 1843, y15: 2253, y20: 0 }
    ]
  },
  INJURIES: [
    { name: 'Frattura scomposta massiccio facciale', level: 1, amount: 2500, category: 'SCHELETRICO' },
    { name: 'Trauma cranico commotivo con lesione', level: 1, amount: 2500, category: 'SCHELETRICO' },
    { name: 'Frattura corpo vertebra cervicale', level: 1, amount: 2500, category: 'COLONNA' },
    { name: 'Frattura femore', level: 1, amount: 2500, category: 'FEMORE' },
    { name: 'Frattura gomito scomposta', level: 1, amount: 2500, category: 'ARTO SUPERIORE' },
    { name: 'Frattura femore con protesi d’anca', level: 2, amount: 7500, category: 'FEMORE' },
    { name: 'Sordità unilaterale non protesizzabile', level: 2, amount: 7500, category: 'SENSITIVO' },
    { name: 'Perdita anatomica globo oculare', level: 3, amount: 15000, category: 'SENSITIVO' },
    { name: 'Amputazione piede dalla linea metatarsale', level: 3, amount: 15000, category: 'AMPUTAZIONI' },
    { name: 'Cecità completa', level: 4, amount: 25000, category: 'SENSITIVO' },
    { name: 'Sordità bilaterale non protesizzabile', level: 4, amount: 25000, category: 'SENSITIVO' },
    { name: 'Amputazione mano o tutte le dita', level: 4, amount: 25000, category: 'AMPUTAZIONI' },
    { name: 'Amputazione arto superiore al terzo prossimale', level: 4, amount: 25000, category: 'AMPUTAZIONI' }
  ],
  EXCLUSIONS: {
    TCM_SPECIFIC: [
      { title: 'Dolo del contraente/assicurato', desc: 'Esclusi atti volontari volti a frodare la compagnia.' },
      { title: 'Suicidio (primi 2 anni)', desc: 'Copertura sospesa per suicidio nei primi 24 mesi di polizza.' },
      { title: 'Uso stupefacenti / Alcolismo', desc: 'Eventi causati da abuso cronico o acuto di sostanze.' }
    ],
    GENERAL: [
      { title: 'Guerra e Terrorismo', desc: 'Eventi bellici o insurrezioni popolari.' },
      { title: 'Armi nucleari', desc: 'Radiazioni provocate da fissione nucleare.' },
      { title: 'Guida senza patente', desc: 'Assenza di abilitazione legale alla guida.' }
    ],
    SPORTS: ['Pugilato', 'Paracadutismo', 'Speleologia', 'Rugby Professionale', 'Motociclismo Agonistico', 'Attività Subacquee > 40m', 'Alpinismo > 4000m']
  }
};

export const ZURICH_SMART_TECHNICAL_DATA = {
  ACCUMULATION_LIMITS: [
    { maxAge: 45, limit: 400000 },
    { maxAge: 55, limit: 300000 },
    { maxAge: 99, limit: 200000 }
  ],
  WAITING_PERIOD: {
    EXCEPTIONS_DISEASES: ['Tifo', 'Colera', 'Meningite', 'Infarto', 'Shock anafilattico', 'Peste', 'Vaiolo', 'Tubercolosi']
  }
};

export const ZURICH_SMART_COMMISSION_DATA = {
  FIXED_PRACTICE_COST: 40,
  PAYIN_RATES: {
    DUR_5Y: 0.40,
    DUR_10_15_20Y: 0.80,
    RECURRING_AFTER_Y1: 0.10
  },
  FIXED_PAYOUT: {
    NEW_BUSINESS: 0.875,
    RECURRING: 0.50
  }
};

export const ASSET_PROTECTION_DATA = {
  STRESS_TEST_SCENARIOS: {
    CIVILE_PROF: { title: 'Resp. Civile Professionale', impact: 'ALTO', legal_ref: 'Art. 2236 c.c.', bank: 0, policy_standard: 80, policy_90gs: 95, pip: 100, hook: 'Un errore tecnico o medico può bloccare i conti per anni. Il fondo resta intoccabile.' },
    CULPA_VIGILANDO: { title: 'Culpa in Vigilando/Educando', impact: 'ELEVATO', legal_ref: 'Art. 2047-48 c.c.', bank: 0, policy_standard: 70, policy_90gs: 90, pip: 100, hook: 'Danni causati da figli minori o collaboratori? Rispondi col tuo patrimonio liquido. Salva il tuo futuro.' },
    FALLIMENTARE: { title: 'Procedura Fallimentare / CCII', impact: 'CRITICO', legal_ref: 'Art. 150 CCII', bank: 0, policy_standard: 70, policy_90gs: 90, pip: 100, hook: 'Se l\'azienda affonda, il fondo pensione è l\'unica scialuppa legale che il curatore non può toccare.' },
    AMMINISTRATORE: { title: 'Responsabilità Amministratore', impact: 'CRITICO', legal_ref: 'Art. 2392 c.c.', bank: 0, policy_standard: 75, policy_90gs: 85, pip: 100, hook: 'Azioni di responsabilità contro il CDA? I tuoi risparmi personali sono nel mirino. Proteggili.' },
    FORNITORI: { title: 'Aggressione Fornitori / Terzi', impact: 'MEDIO', legal_ref: 'Art. 1923 c.c.', bank: 0, policy_standard: 100, policy_90gs: 100, pip: 100, hook: 'Controversie commerciali? I soldi in banca sono i primi a sparire. Quelli nel fondo sono blindati.' }
  },
  COMPARISON_MATRIX: [
    { asset: 'Conto Corrente', shield: 'NULLO', risk: '100%', detail: 'Interamente pignorabile.' },
    { asset: 'Polizza Vita (Ramo I)', shield: 'MASSIMO', risk: '0%', detail: 'Art. 1923 c.c. - Impignorabile.' },
    { asset: 'Fondo Pensione', shield: 'MASSIMO', risk: '0%', detail: 'Art. 2117 c.c. - Segregazione totale.' }
  ]
};

export const PROTECTION_PARADOX_DATA = {
  PIL_PROTECTION: { italy: 1.9, oecd_avg: 5.1 },
  HEALTH_OUT_OF_POCKET: { italy: 22, oecd_avg: 15 },
  PROFILES: {
    SMALL: { tag: 'Piccolo Risparmiatore', focus: 'Sicurezza', risk_economic: 'Erosione inflazione', risk_health: 'Costi RSA imprevisti', risk_legacy: 'Debiti ereditari' },
    LARGE: { tag: 'HNWI / Private', focus: 'Protezione', risk_economic: 'Aggressione creditori', risk_health: 'Continuità aziendale', risk_legacy: 'Imposta successione' }
  }
};

export const REGULATIONS: RegulationItem[] = [
  { id: '1', title: 'D.Lgs. 252/05', category: 'DECRETO', content: 'La norma fondamentale sulla previdenza complementare in Italia.', reference: 'D.Lgs. 252/2005' },
  { id: '2', title: 'Circolare AdE 19/E 2024', category: 'CIRCOLARE', content: 'Chiarimenti sulla tassazione delle polizze vita e successione.', reference: 'Circolare 19/E', date: '2024' },
  { id: '3', title: 'DIP Smart Protection 03/2025', category: 'PRODOTTO', content: 'Set informativo per la protezione decesso e lesioni.', reference: 'DIP 03.2025', date: '2025' }
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

export const HISTORICAL_DATA_20Y: HistoricalDataPoint[] = [
  { year: 2000, inflation: 2.5, tfrRate: 3.38, ftseMib: 4.5, jpmGlobal: 3.2, event: 'Bolla DotCom' },
  { year: 2024, inflation: 1.2, tfrRate: 2.40, ftseMib: 18.0, jpmGlobal: 5.5, event: 'Normalizzazione Inflazione' }
];

export const COMPANY_BENCHMARKS = [{ id: 'jpmGlobal', name: 'JPM Global Govt Bond' }];
