
import React, { useState, useMemo } from 'react';
import { SUCCESSION_DATA } from '../constants';
import { 
  Scale, ShieldCheck, AlertTriangle, Coins, Info, 
  Calculator, Gavel, Lock, CheckCircle2, BookOpen, 
  ScrollText, ArrowRight, Zap, Clock, Sparkles, HelpCircle,
  TrendingUp, MessageCircle, AlertOctagon, HeartPulse,
  Gift, Wallet, Landmark, ArrowDownToLine, MousePointer2,
  Lightbulb, ShieldAlert, Ban, HandHelping, History, Globe,
  Settings2, ChevronRight, Siren, Timer, Briefcase, FileText,
  UserPlus, Table as TableIcon, Crown, Percent, Unlock,
  Skull, UserMinus, FileSignature, ArrowDownNarrowWide,
  Quote, ShieldPlus, Share2, Layers, Users, UserX,
  Building2, MapPin, Key, HeartOff,
  // Added missing AlertCircle icon import
  AlertCircle
} from 'lucide-react';

const formatCurrency = (val: number) => 
  new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);

// Database analitico quote successorie esteso (Art. 536 e segg. c.c.)
const QUOTA_SCENARIOS = [
  {
    id: 'S1',
    label: 'Solo Coniuge',
    description: 'Nessun figlio, nessun genitore in vita.',
    legittima: [
      { label: 'Coniuge', value: 100, color: 'bg-indigo-600', text: 'Tutto' }
    ],
    testamentaria: [
      { label: 'Legittima Coniuge', value: 50, color: 'bg-indigo-600', text: '1/2' },
      { label: 'Quota Disponibile', value: 50, color: 'bg-emerald-500', text: '1/2' }
    ],
    ref: 'Art. 540 e 583 c.c.',
    tip: 'Il coniuge ha sempre il diritto di abitazione sulla casa coniugale (Art. 540 c.2).'
  },
  {
    id: 'S2',
    label: 'Coniuge + 1 Figlio',
    description: 'Nucleo familiare standard.',
    legittima: [
      { label: 'Coniuge', value: 50, color: 'bg-indigo-600', text: '1/2' },
      { label: 'Figlio', value: 50, color: 'bg-indigo-400', text: '1/2' }
    ],
    testamentaria: [
      { label: 'Legittima Coniuge', value: 33.33, color: 'bg-indigo-600', text: '1/3' },
      { label: 'Legittima Figlio', value: 33.33, color: 'bg-indigo-400', text: '1/3' },
      { label: 'Quota Disponibile', value: 33.34, color: 'bg-emerald-500', text: '1/3' }
    ],
    ref: 'Art. 542 c.1 c.c.',
    tip: 'Rischio di comproprietà forzata: gestire gli immobili con Zurich evita liti future.'
  },
  {
    id: 'S3',
    label: 'Coniuge + 2 o più Figli',
    description: 'Famiglia numerosa o ricostituita.',
    legittima: [
      { label: 'Coniuge', value: 33.33, color: 'bg-indigo-600', text: '1/3' },
      { label: 'Figli (Totale)', value: 66.67, color: 'bg-indigo-400', text: '2/3' }
    ],
    testamentaria: [
      { label: 'Legittima Coniuge', value: 25, color: 'bg-indigo-600', text: '1/4' },
      { label: 'Legittima Figli', value: 50, color: 'bg-indigo-400', text: '1/2' },
      { label: 'Quota Disponibile', value: 25, color: 'bg-emerald-500', text: '1/4' }
    ],
    ref: 'Art. 542 c.2 c.c.',
    tip: 'La quota libera è minima (25%). Usare Multinvest per premiare un erede senza ledere la legittima.'
  },
  {
    id: 'S4',
    label: 'Solo Figli (No Coniuge)',
    description: 'Genitore single o vedovo.',
    legittima: [
      { label: 'Figli (Totale)', value: 100, color: 'bg-indigo-400', text: 'Tutto' }
    ],
    testamentaria: [
      { label: 'Legittima Figli', value: 66.67, color: 'bg-indigo-400', text: '2/3' },
      { label: 'Quota Disponibile', value: 33.33, color: 'bg-emerald-500', text: '1/3' }
    ],
    ref: 'Art. 537 c.c.',
    tip: 'Lo Stato "blindando" i 2/3 riduce la libertà di scelta. La polizza è lo strumento di riequilibrio.'
  },
  {
    id: 'S5',
    label: 'Coniuge + Ascendenti',
    description: 'Nessun figlio, genitori del de cuius in vita.',
    legittima: [
      { label: 'Coniuge', value: 66.67, color: 'bg-indigo-600', text: '2/3' },
      { label: 'Ascendenti', value: 33.33, color: 'bg-indigo-300', text: '1/3' }
    ],
    testamentaria: [
      { label: 'Legittima Coniuge', value: 50, color: 'bg-indigo-600', text: '1/2' },
      { label: 'Legittima Ascendenti', value: 25, color: 'bg-indigo-300', text: '1/4' },
      { label: 'Quota Disponibile', value: 25, color: 'bg-emerald-500', text: '1/4' }
    ],
    ref: 'Art. 544 c.c.',
    tip: 'Sorpresa: i genitori hanno diritto a una quota anche se c\'è il coniuge.'
  },
  {
    id: 'S6',
    label: 'Solo Ascendenti',
    description: 'Nessun coniuge, nessun figlio.',
    legittima: [
      { label: 'Ascendenti', value: 100, color: 'bg-indigo-300', text: 'Tutto' }
    ],
    testamentaria: [
      { label: 'Legittima Ascendenti', value: 33.33, color: 'bg-indigo-300', text: '1/3' },
      { label: 'Quota Disponibile', value: 66.67, color: 'bg-emerald-500', text: '2/3' }
    ],
    ref: 'Art. 538 c.c.',
    tip: 'Massima quota disponibile per premiare amici, enti o altri parenti.'
  },
  {
    id: 'S7',
    label: 'Fratelli e Sorelle (No Legittimari)',
    description: 'Nessun coniuge, prole o genitori.',
    legittima: [
      { label: 'Fratelli/Sorelle', value: 100, color: 'bg-indigo-200', text: 'Tutto' }
    ],
    testamentaria: [
      { label: 'Quota Disponibile', value: 100, color: 'bg-emerald-500', text: 'TOTALE' }
    ],
    ref: 'Art. 457 c.2 c.c.',
    tip: 'I fratelli NON sono eredi necessari. Puoi disporre del 100% con testamento o polizza.'
  }
];

const SuccessionView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'STRESS_TEST' | 'QUOTAS' | 'LIQUIDITY' | 'LEGAL'>('STRESS_TEST');
  const [successionMode, setSuccessionMode] = useState<'LEGITTIMA' | 'TESTAMENTARIA'>('LEGITTIMA');
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('S2');
  
  // Fiscal Audit States
  const [estateValue, setEstateValue] = useState<number>(500000); // Asset liquidi/bancari
  const [realEstateValue, setRealEstateValue] = useState<number>(1000000); // Valore di mercato
  const [renditaCatastale, setRenditaCatastale] = useState<number>(1500); // Per calcolo tasse
  const [kinship, setKinship] = useState<keyof typeof SUCCESSION_DATA.TAX_RATES>('SPOUSE_CHILDREN');
  const [numHeirs, setNumHeirs] = useState<number>(2);

  const taxRules = SUCCESSION_DATA.TAX_RATES[kinship];
  const activeScenario = QUOTA_SCENARIOS.find(s => s.id === selectedScenarioId) || QUOTA_SCENARIOS[0];
  const currentQuotas = successionMode === 'LEGITTIMA' ? activeScenario.legittima : activeScenario.testamentaria;

  const simulation = useMemo(() => {
    // 1. Calcolo Base Imponibile Fiscale (Valore Catastale rivalutato)
    const cadastralTaxBase = renditaCatastale * 1.05 * 126; // Moltiplicatore standard
    const totalMarketValue = estateValue + realEstateValue;
    
    // 2. Calcolo Imposte Ipo-Catastali (3% sul valore catastale per successione)
    const ipoCatastali = cadastralTaxBase * 0.03;
    
    // 3. Calcolo Imposta di Successione (Sul valore totale di mercato - franchigie)
    const totalFranchigia = taxRules.exemption * numHeirs;
    const taxableAmount = Math.max(0, totalMarketValue - totalFranchigia);
    const inheritanceTax = taxableAmount * taxRules.rate;

    // 4. Totale Cash Necessario immediato
    const totalCashNeeded = ipoCatastali + inheritanceTax + 3500; // +3.5k per costi notarili/perizie
    
    // 5. Verifica Rischio Blocco (Liquidità disponibile su C/C vs Cash Needed)
    const liquidityDeficit = Math.max(0, totalCashNeeded - estateValue);
    const riskLevel = liquidityDeficit > 0 ? 'ALTO' : 'MEDIO';

    return { 
      inheritanceTax,
      ipoCatastali,
      totalCashNeeded,
      liquidityDeficit,
      riskLevel,
      cadastralTaxBase,
      totalMarketValue
    };
  }, [estateValue, realEstateValue, renditaCatastale, kinship, numHeirs, taxRules]);

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-fade-in pb-24">
      
      {/* 1. HERO EXECUTIVE */}
      <div className="bg-[#0f172a] rounded-[3.5rem] p-12 text-white shadow-2xl relative border-b-8 border-amber-500 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-amber-600/10 to-transparent"></div>
        <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
           <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                 <div className="bg-amber-50 p-3 rounded-2xl shadow-xl shadow-amber-600/20"><Scale size={32} className="text-slate-900"/></div>
                 <span className="text-[11px] font-black uppercase tracking-[0.4em] text-amber-400 italic">Estate Audit Unit - Gruppo Vomero Strategy</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
                Successione <br/> <span className="text-amber-500">A Zero Euro</span>
              </h1>
              <p className="text-slate-400 text-xl font-medium max-w-2xl leading-relaxed">
                "Dottore, il problema non è quanto lascia ai figli, ma quanto contante i suoi figli dovranno **versare allo Stato** prima di poter toccare la loro eredità."
              </p>
           </div>
           <div className="lg:col-span-4 bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 text-center relative group">
              <p className="text-[10px] font-black uppercase text-amber-400 mb-2 tracking-widest italic">Rischio Blocco Patrimoniale</p>
              <p className={`text-6xl font-black tracking-tighter ${simulation.riskLevel === 'ALTO' ? 'text-rose-500' : 'text-emerald-500'}`}>{simulation.riskLevel}</p>
              <p className="text-[10px] text-slate-400 font-black uppercase mt-4 italic">Analisi su {formatCurrency(simulation.totalMarketValue)}</p>
           </div>
        </div>
      </div>

      {/* 2. NAVIGATION SUB-TABS */}
      <div className="flex flex-wrap gap-2 bg-slate-100 p-1.5 rounded-2xl w-full md:w-fit mx-auto shadow-inner border border-slate-200">
         <button onClick={() => setActiveTab('STRESS_TEST')} className={`px-8 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'STRESS_TEST' ? 'bg-white text-slate-900 shadow-md border-b-2 border-amber-500' : 'text-slate-500 hover:text-slate-800'}`}>
            <Zap size={16} /> Stress Test Fiscale
         </button>
         <button onClick={() => setActiveTab('QUOTAS')} className={`px-8 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'QUOTAS' ? 'bg-indigo-600 text-white shadow-md border-b-2 border-amber-500' : 'text-slate-500 hover:text-slate-800'}`}>
            <Share2 size={16} /> Quote Legittime & Disponibili
         </button>
         <button onClick={() => setActiveTab('LIQUIDITY')} className={`px-8 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'LIQUIDITY' ? 'bg-white text-slate-900 shadow-md border-b-2 border-amber-500' : 'text-slate-500 hover:text-slate-800'}`}>
            <Unlock size={16} /> Cronistoria Blocco
         </button>
         <button onClick={() => setActiveTab('LEGAL')} className={`px-8 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'LEGAL' ? 'bg-white text-slate-900 shadow-md border-b-2 border-amber-500' : 'text-slate-500 hover:text-slate-800'}`}>
            <Gavel size={16} /> Fondamenti Giuridici
         </button>
      </div>

      <div className="min-h-[600px]">
        
        {/* --- TAB 1: STRESS TEST FISCALE (POTENZIATO) --- */}
        {activeTab === 'STRESS_TEST' && (
          <div className="grid lg:grid-cols-12 gap-8 animate-fade-in">
             <div className="lg:col-span-4 space-y-6">
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8">
                   <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 italic">
                      <Settings2 size={14} className="text-amber-500" /> Parametri del Patrimonio
                   </h4>
                   <div className="space-y-6">
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                         <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">Asset Bancari (Liquidità) (€)</label>
                         <input type="number" value={estateValue} onChange={(e) => setEstateValue(Number(e.target.value))} className="w-full bg-transparent font-black text-xl outline-none text-slate-900" />
                         <p className="text-[9px] text-rose-500 mt-1 font-bold italic uppercase">A rischio blocco Mod. 240</p>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                         <label className="text-[10px] font-black text-slate-400 uppercase block mb-1">Valore Mercato Immobili (€)</label>
                         <input type="number" value={realEstateValue} onChange={(e) => setRealEstateValue(Number(e.target.value))} className="w-full bg-transparent font-black text-xl outline-none text-slate-900" />
                      </div>
                      <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200">
                         <label className="text-[10px] font-black text-amber-700 uppercase block mb-1">Rendita Catastale Totale (€)</label>
                         <input type="number" value={renditaCatastale} onChange={(e) => setRenditaCatastale(Number(e.target.value))} className="w-full bg-transparent font-black text-xl outline-none text-amber-900" />
                         <p className="text-[9px] text-amber-600 mt-1 font-bold italic uppercase">Base calcolo Tasse Ipo-Catastali</p>
                      </div>
                      <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-200">
                         <label className="text-[10px] font-black text-indigo-700 uppercase block mb-2">Eredi & Franchigie</label>
                         <select value={kinship} onChange={(e) => setKinship(e.target.value as any)} className="w-full bg-transparent font-bold text-slate-800 outline-none text-sm mb-3">
                            {Object.entries(SUCCESSION_DATA.TAX_RATES).map(([k, v]) => (
                               <option key={k} value={k}>{v.label}</option>
                            ))}
                         </select>
                         <div className="flex justify-between items-center">
                            <span className="text-[10px] font-black text-indigo-400 uppercase">Num. Eredi:</span>
                            <div className="flex items-center gap-3">
                               <button onClick={() => setNumHeirs(Math.max(1, numHeirs - 1))} className="text-indigo-600"><UserMinus size={16}/></button>
                               <span className="font-black text-indigo-900">{numHeirs}</span>
                               <button onClick={() => setNumHeirs(numHeirs + 1)} className="text-indigo-600"><UserPlus size={16}/></button>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
                
                <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden border-b-8 border-rose-500 group">
                   <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform"><Skull size={150} /></div>
                   <h4 className="text-rose-400 text-[10px] font-black uppercase mb-4 tracking-widest italic flex items-center gap-2"><Siren size={14}/> Allerta Liquidità Erredi</h4>
                   <p className="text-sm text-slate-300 leading-relaxed font-medium italic">
                      "Dottore, il conto corrente di {formatCurrency(estateValue)} verrà congelato dalla banca. I suoi figli dovranno anticipare di tasca propria **{formatCurrency(simulation.totalCashNeeded)}** allo Stato per sbloccarlo."
                   </p>
                </div>
             </div>

             <div className="lg:col-span-8 space-y-8">
                <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden">
                   <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic mb-10 flex items-center gap-3">
                      <TrendingUp className="text-amber-500" /> Diagnosi della Trasmissione
                   </h3>
                   
                   <div className="grid md:grid-cols-2 gap-8">
                      <div className="p-8 bg-rose-50 rounded-[2.5rem] border-2 border-rose-100 flex flex-col justify-between">
                         <div>
                            <div className="flex justify-between items-start mb-4">
                               <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Passività vs Erario</p>
                               <Clock size={18} className="text-rose-400" />
                            </div>
                            <p className="text-4xl font-black text-slate-900">{formatCurrency(simulation.totalCashNeeded)}</p>
                            <p className="text-[9px] text-slate-500 font-bold uppercase mt-2 italic">Cash da versare entro 12 mesi</p>
                         </div>
                         <div className="mt-8 pt-4 border-t border-rose-200 space-y-3">
                            <div className="flex justify-between text-[10px] font-bold text-rose-600 uppercase">
                               <span>Imposta di Successione ({taxRules.rate * 100}%):</span>
                               <span>{formatCurrency(simulation.inheritanceTax)}</span>
                            </div>
                            <div className="flex justify-between text-[10px] font-bold text-rose-600 uppercase">
                               <span>Imposte Ipo-Catastali (3%):</span>
                               <span>{formatCurrency(simulation.ipoCatastali)}</span>
                            </div>
                         </div>
                      </div>

                      <div className={`p-8 rounded-[2.5rem] border-2 relative shadow-xl ${simulation.liquidityDeficit > 0 ? 'bg-rose-950 text-white border-rose-500' : 'bg-emerald-50 text-emerald-900 border-emerald-500'}`}>
                         <div className="absolute top-4 right-4">
                            {simulation.liquidityDeficit > 0 ? <AlertOctagon className="text-rose-500" size={32} /> : <CheckCircle2 className="text-emerald-500" size={32} />}
                         </div>
                         <div>
                            <p className={`text-[10px] font-black uppercase tracking-widest ${simulation.liquidityDeficit > 0 ? 'text-rose-400' : 'text-emerald-600'}`}>
                               {simulation.liquidityDeficit > 0 ? 'Deficit di Liquidità' : 'Capacità di Sblocco'}
                            </p>
                            <p className="text-5xl font-black tracking-tighter mt-2">
                               {simulation.liquidityDeficit > 0 ? formatCurrency(simulation.liquidityDeficit) : 'COPERTO'}
                            </p>
                            <p className="text-[10px] opacity-70 font-bold uppercase mt-4 italic">Analisi su asse ereditario ordinario</p>
                         </div>
                      </div>
                   </div>

                   <div className="mt-10 p-8 bg-[#0a0f1d] rounded-[3.5rem] text-white flex flex-col md:flex-row items-center gap-10 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-8 opacity-10"><Sparkles size={200} /></div>
                      <div className="bg-amber-500 p-5 rounded-3xl text-slate-900 shadow-xl shrink-0">
                         <ShieldPlus size={40} />
                      </div>
                      <div className="space-y-4">
                         <h4 className="text-xl font-black italic uppercase tracking-tighter text-amber-500 leading-none">La Soluzione Zurich: Iure Proprio</h4>
                         <p className="text-sm font-medium italic opacity-90 leading-relaxed">
                            "Dottore, spostando il valore del deficit ({formatCurrency(simulation.totalCashNeeded)}) in una polizza Multinvest, lei crea un **Assegno Circolare esente da tasse** che i figli incassano in 20 giorni. Questi soldi non entrano in successione e servono proprio a pagare lo Stato per sbloccare il resto del suo patrimonio."
                         </p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* --- TAB 2: QUOTE LEGALI & CONFIGURATORE NUCLEO (EXPANDED) --- */}
        {activeTab === 'QUOTAS' && (
          <div className="grid lg:grid-cols-12 gap-8 animate-fade-in">
             <div className="lg:col-span-4 space-y-6">
                <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm space-y-8">
                   <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 italic">
                      <Users size={14} className="text-indigo-600" /> Configura Nucleo
                   </h4>
                   <div className="space-y-4 max-h-[550px] overflow-y-auto pr-2 custom-scrollbar">
                      {QUOTA_SCENARIOS.map(s => (
                        <button 
                          key={s.id} 
                          onClick={() => setSelectedScenarioId(s.id)}
                          className={`w-full text-left p-5 rounded-2xl border-2 transition-all ${selectedScenarioId === s.id ? 'border-indigo-600 bg-indigo-50 shadow-md ring-4 ring-indigo-500/5' : 'border-slate-100 hover:bg-slate-50'}`}
                        >
                           <div className="flex justify-between items-center mb-1">
                              <h5 className={`font-black text-xs uppercase ${selectedScenarioId === s.id ? 'text-indigo-900' : 'text-slate-700'}`}>{s.label}</h5>
                              {selectedScenarioId === s.id && <CheckCircle2 size={14} className="text-indigo-600" />}
                           </div>
                           <p className="text-[10px] text-slate-400 font-bold uppercase italic leading-tight">{s.description}</p>
                        </button>
                      ))}
                   </div>
                </div>
             </div>

             <div className="lg:col-span-8 space-y-8">
                <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden">
                   <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                      <div>
                         <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic flex items-center gap-3 leading-none">
                            <Share2 className="text-indigo-600" /> Architettura delle Quote
                         </h3>
                         <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2 italic">Riferimento normativo: {activeScenario.ref}</p>
                      </div>
                      <div className="flex bg-slate-100 p-1.5 rounded-2xl shadow-inner border border-slate-200">
                         <button onClick={() => setSuccessionMode('LEGITTIMA')} className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${successionMode === 'LEGITTIMA' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500'}`}>Senza Testamento</button>
                         <button onClick={() => setSuccessionMode('TESTAMENTARIA')} className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${successionMode === 'TESTAMENTARIA' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500'}`}>Con Testamento</button>
                      </div>
                   </div>

                   <div className="space-y-12">
                      <div className="relative">
                         {/* Barra visuale delle quote */}
                         <div className="h-16 w-full flex rounded-2xl overflow-hidden shadow-2xl border-4 border-white mb-10">
                            {currentQuotas.map((q, i) => (
                               <div 
                                  key={i} 
                                  style={{ width: `${q.value}%` }} 
                                  className={`${q.color} flex flex-col items-center justify-center text-white relative group transition-all duration-700`}
                               >
                                  <span className="text-lg font-black italic leading-none">{q.text}</span>
                                  <div className="absolute -bottom-10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-slate-900 text-white text-[9px] font-black px-3 py-1 rounded-full z-20">
                                     {q.label}: {q.value.toFixed(1)}%
                                  </div>
                               </div>
                            ))}
                         </div>

                         <div className="grid md:grid-cols-2 gap-4">
                            {currentQuotas.map((q, i) => (
                               <div key={i} className="flex items-center gap-4 bg-slate-50 p-5 rounded-3xl border border-slate-100 group hover:bg-white hover:shadow-xl transition-all">
                                  <div className={`w-3 h-10 rounded-full ${q.color}`}></div>
                                  <div>
                                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{q.label}</p>
                                     <p className="text-xl font-black text-slate-800 leading-none mt-1">{q.text} <span className="text-[10px] text-slate-400">({q.value.toFixed(1)}%)</span></p>
                                  </div>
                               </div>
                            ))}
                         </div>
                      </div>

                      <div className="p-8 bg-[#0a0f1d] rounded-[3rem] text-white shadow-2xl relative overflow-hidden group border-l-8 border-amber-500">
                         <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform"><Lightbulb size={150} /></div>
                         <h5 className="text-amber-500 text-[10px] font-black uppercase mb-4 italic tracking-[0.2em] flex items-center gap-2"><Sparkles size={14}/> Advisor Executive Strategy</h5>
                         <p className="text-lg font-medium italic leading-relaxed text-slate-200 mb-6">
                            "{activeScenario.tip}"
                         </p>
                         <div className="bg-white/10 p-5 rounded-2xl border border-white/10">
                            <p className="text-[10px] font-black text-amber-500 uppercase mb-2">The Closing Hook:</p>
                            <p className="text-xs font-bold text-blue-100 italic leading-relaxed">
                               "Dottore, il patrimonio in polizza **non rientra nell'asse ereditario**. Se vuole destinare capitali fuori da questo schema rigido dello Stato, la polizza è l'unico modo legale per bilanciare l'asse ereditario senza ledere le legittime."
                            </p>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* --- TAB 3: LIQUIDITY & BLOCCO --- */}
        {activeTab === 'LIQUIDITY' && (
          <div className="animate-fade-in space-y-10">
             <div className="bg-white rounded-[3rem] p-10 border border-slate-200 shadow-sm overflow-hidden">
                <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic mb-12 flex items-center gap-4">
                   <Timer className="text-indigo-600" /> Il Percorso del Blocco Patrimoniale
                </h3>
                
                <div className="relative">
                   <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-slate-100 -translate-x-1/2 hidden md:block"></div>
                   <div className="space-y-12">
                      {[
                        { time: "GIORNO 1", title: "L'Evento", desc: "La banca viene informata. Scatta il blocco cautelativo di conti, titoli e cassette di sicurezza.", type: "DANGER", icon: Skull },
                        { time: "GIORNI 15-30", title: "Zurich Payout", desc: "I beneficiari ricevono il 100% della polizza direttamente. Liquidità immediata Iure Proprio.", type: "SAFE", icon: Zap },
                        { time: "MESI 3-6", title: "Adempimenti AdE", desc: "Dichiarazione di Successione e pagamento anticipato delle imposte (F24). Senza contanti non si procede.", type: "NEUTRAL", icon: Landmark },
                        { time: "MESI 9+", title: "Modello 240", desc: "Solo dopo il certificato di pagamento dello Stato (Mod. 240), la banca sblocca i conti ereditari.", type: "DANGER", icon: Unlock }
                      ].map((step, i) => (
                        <div key={i} className={`flex flex-col md:flex-row items-center gap-8 relative ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                           <div className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
                              <span className={`text-[10px] font-black px-4 py-1.5 rounded-full mb-3 uppercase tracking-widest shadow-sm ${step.type === 'SAFE' ? 'bg-emerald-100 text-emerald-700' : step.type === 'DANGER' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-600'}`}>
                                 {step.time}
                              </span>
                              <h4 className="text-2xl font-black text-slate-800 uppercase tracking-tight italic">{step.title}</h4>
                              <p className="text-sm text-slate-500 font-medium italic mt-2 leading-relaxed">{step.desc}</p>
                           </div>
                           <div className="absolute left-1/2 -translate-x-1/2 w-14 h-14 rounded-3xl bg-white border-4 border-slate-100 flex items-center justify-center z-10 shadow-xl hidden md:flex">
                              <step.icon size={24} className={step.type === 'SAFE' ? 'text-emerald-600' : 'text-slate-400'} />
                           </div>
                           <div className="md:w-1/2"></div>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* --- TAB 4: FONDAMENTI --- */}
        {activeTab === 'LEGAL' && (
          <div className="animate-fade-in space-y-12">
             <div className="grid md:grid-cols-3 gap-8">
                {SUCCESSION_DATA.LEGAL_PILLARS.map((p, idx) => (
                   <div key={idx} className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-xl relative overflow-hidden group flex flex-col justify-between border-t-4 border-amber-500">
                      <div className="absolute -top-10 -right-10 opacity-5 group-hover:rotate-12 transition-transform"><BookOpen size={200} /></div>
                      <div>
                         <div className="flex justify-between items-start mb-8 relative z-10">
                            <div className="bg-amber-500 p-3 rounded-2xl text-slate-900 shadow-xl"><Gavel size={24} /></div>
                            <span className="text-[9px] font-black bg-white/10 px-3 py-1 rounded-full uppercase text-amber-400 border border-amber-500/30">{p.tag}</span>
                         </div>
                         <h4 className="text-2xl font-black text-amber-500 mb-2 uppercase italic leading-tight relative z-10">{p.focus}</h4>
                         <p className="text-[10px] font-black text-slate-500 mb-6 tracking-widest">{p.ref}</p>
                         <p className="text-sm text-slate-400 font-medium leading-relaxed italic relative z-10">"{p.text}"</p>
                      </div>
                   </div>
                ))}
             </div>
             
             <div className="bg-white p-12 rounded-[4rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 opacity-[0.02] group-hover:scale-110 transition-transform"><UserX size={300} /></div>
                <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic mb-8 flex items-center gap-3 leading-none">
                   <AlertCircle className="text-rose-600" /> Focus: Parenti NON Legittimari
                </h4>
                <div className="grid md:grid-cols-2 gap-12">
                   <div className="space-y-4">
                      <p className="text-sm text-slate-600 font-medium italic leading-relaxed">
                         "Molti clienti credono erroneamente che fratelli e sorelle abbiano diritto alla legittima. **Falso.** Fratelli, sorelle e nipoti collaterali possono essere esclusi totalmente dal testamento."
                      </p>
                      <div className="p-4 bg-rose-50 rounded-2xl border border-rose-100 flex items-center gap-3">
                         <HeartOff className="text-rose-600" size={20}/>
                         <span className="text-[10px] font-black uppercase text-rose-800">Nessun vincolo di riserva</span>
                      </div>
                   </div>
                   <div className="space-y-4">
                      <p className="text-sm text-slate-600 font-medium italic leading-relaxed">
                         "In mancanza di parenti entro il 6° grado, l'asse ereditario finisce interamente allo **Stato**. La polizza Zurich permette di bypassare questo rischio nominando beneficiari terzi in modo riservato."
                      </p>
                      <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-3">
                         <ShieldCheck className="text-emerald-600" size={20}/>
                         <span className="text-[10px] font-black uppercase text-emerald-800">Tutela contro la devoluzione</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}
      </div>

      {/* FOOTER EXECUTIVO */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
         <div className="flex items-center gap-6">
            <div className="bg-[#0f172a] p-4 rounded-[1.5rem] text-white shadow-lg"><FileSignature size={32} /></div>
            <div>
               <p className="text-lg font-black text-slate-800 uppercase tracking-tighter leading-none mb-1">Estate Legacy Intelligence Certification</p>
               <p className="text-xs text-slate-500 font-bold italic">Rif. Tecnico: Art. 12 D.Lgs 346/90 | Art. 1923 c.c. | Revisione Strategica Gruppo Vomero 2025</p>
            </div>
         </div>
      </div>

    </div>
  );
};

export default SuccessionView;
