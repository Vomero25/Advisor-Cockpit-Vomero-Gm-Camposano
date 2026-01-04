
import React, { useState, useMemo } from 'react';
import { GoogleGenAI } from "@google/genai";
import { ZURICH_MULTINVEST_DATA } from '../constants';
import { 
  ShieldCheck, TrendingUp, Layers, Coins, Calculator, 
  Crown, CheckCircle2, CalendarClock, 
  BarChart3, Percent, Info, BookOpen, 
  Zap, Lock, Landmark, History, ChevronRight,
  ShieldAlert, Gavel, Sparkles, Building2, UserCheck,
  Calendar, Timer, ArrowUpRight, Target, Briefcase,
  Gift, Scale, PieChart as PieChartIcon, FileSignature,
  AlertTriangle, ArrowDownToLine, Receipt, Loader2, Globe,
  ShieldPlus, Activity, Gem, FileText, HeartPulse, Settings2, 
  AlertCircle, ShieldX, LifeBuoy, Banknote, PiggyBank,
  UserPlus, Umbrella, AlertOctagon, Quote,
  HandCoins, Handshake, TrendingDown, PlusCircle,
  CalendarDays, Wallet, ReceiptEuro, RefreshCw,
  SearchCheck, Globe2, Microscope,
  RefreshCcw, MinusCircle, 
  ChevronDown, ArrowUpCircle, Flame, ArrowRightCircle,
  Plus, Minus, ArrowDownCircle, Binary,
  ArrowRight, ScrollText, HeartHandshake,
  Skull, Clock, BadgePercent,
  ArrowDownNarrowWide, ShieldHalf,
  Lightbulb, MessagesSquare, UserSearch, 
  Trophy, Siren, Eye, Users, Send, Bot, LineChart
} from 'lucide-react';

const salesStrategies = [
  {
    target: "Investitore Conservativo",
    hook: "Scudo M103F",
    pain: "Bassi rendimenti dei conti deposito e rischio inflazione sui risparmi fermi.",
    script: "Dottore, la campagna M103F di MultInvest è progettata per chi cerca stabilità. Garantiamo l'accesso alla Gestione Separata Zurich Trend fino al 90% del capitale, con rendimenti certificati e un bonus immediato dell'1% che azzera i costi iniziali."
  },
  {
    target: "Pianificazione Successoria",
    hook: "Esenzione Art. 12",
    pain: "L'impatto fiscale e i tempi di sblocco della successione ordinaria possono penalizzare gli eredi.",
    script: "MultInvest non è solo un investimento, è un atto di amore e protezione. Il capitale liquidato in caso di decesso è totalmente esente dalle imposte di successione e non rientra nella massa ereditaria, permettendo un passaggio di ricchezza immediato e protetto."
  }
];

// ============================================================================
// 🔥 CORE_ALGORITHM: MOTORE DI CALCOLO CERTIFICATO M103F 🔥
// ============================================================================
const frozenM103FCampaignEngine = (
  className: 'A' | 'B' | 'C', 
  amount: number, 
  gsPct: number, 
  hypoGsYield: number, 
  hypoLineYield: number
) => {
  const fees = ZURICH_MULTINVEST_DATA.FEE_STRUCTURE[className];
  const gsRatio = gsPct / 100;
  const lineRatio = 1 - gsRatio;

  const premioGS = amount * gsRatio;
  const premioLinea = amount * lineRatio;

  const bonusT0_GS = premioGS * 0.01;
  const bonusT0_Total = amount * 0.01;

  const netYieldGs = (hypoGsYield / 100) - fees.gs;
  const netYieldLine = (hypoLineYield / 100) - fees.line;

  const valueGsY1_pre = (premioGS + bonusT0_GS) * (1 + netYieldGs);
  const valueLineY1 = (premioLinea + (premioLinea * 0.01)) * (1 + netYieldLine);

  const bonusT1 = (premioGS) * 0.005; 
  const montanteY1 = valueGsY1_pre + valueLineY1 + bonusT1;

  const startGsY2 = montanteY1 * (valueGsY1_pre / (valueGsY1_pre + valueLineY1));
  const startLineY2 = montanteY1 * (valueLineY1 / (valueGsY1_pre + valueLineY1));

  const valueGsY2_pre = startGsY2 * (1 + netYieldGs);
  const valueLineY2 = startLineY2 * (1 + netYieldLine);

  const bonusT2 = (premioGS) * 0.01;
  const montanteFinal = valueGsY2_pre + valueLineY2 + bonusT2;

  const totalBonusEuro = bonusT0_Total + bonusT1 + bonusT2;
  const totalProfitEuro = montanteFinal - amount;
  const totalProfitPct = (totalProfitEuro / amount) * 100;

  return {
    className,
    bonusT0_Total,
    bonusT1,
    bonusT2,
    totalBonusEuro,
    montanteY1,
    montanteFinal,
    totalProfitEuro,
    totalProfitPct,
    fees,
    weightedFee: ((gsRatio * fees.gs) + (lineRatio * fees.line)) * 100,
    premioGS,
    premioLinea,
    valueGsY2_pre,
    valueLineY2
  };
};

const formatCurrency = (val: number) => 
  new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);

const MultInvestAnalysisView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'SHIELD' | 'DEATH' | 'ANNUITY' | 'SALES_KIT'>('SHIELD');
  const [investmentAmount, setInvestmentAmount] = useState<number>(500000);
  const [gsPercentage, setGsPercentage] = useState<number>(90); 
  const [activeClass, setActiveClass] = useState<'A' | 'B' | 'C'>('A');
  const [hypoGsYield, setHypoGsYield] = useState<number>(2.87); 
  const [hypoLineYield, setHypoLineYield] = useState<number>(6.50); 
  
  // Parametri Decesso
  const [ageAtDeath, setAgeAtDeath] = useState<number>(64);
  const [yearsSinceInception, setYearsSinceInception] = useState<number>(3);

  // Parametri Rendita
  const [hypoAnnuityCoeff, setHypoAnnuityCoeff] = useState<number>(3.50);

  // Stato AI
  const [aiInput, setAiInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const results = useMemo(() => 
    frozenM103FCampaignEngine(activeClass, investmentAmount, gsPercentage, hypoGsYield, hypoLineYield), 
  [investmentAmount, gsPercentage, activeClass, hypoGsYield, hypoLineYield]);

  const deathAnalysis = useMemo(() => {
    const baseGS = results.valueGsY2_pre;
    const premiumGS = results.premioGS;
    const effectiveGS = Math.max(baseGS, premiumGS);
    const baseLine = results.valueLineY2;
    const totalCurrentValue = baseGS + baseLine; 

    let multiplier = 0;
    if (ageAtDeath <= 65) multiplier = 0.10;
    else if (ageAtDeath <= 70) multiplier = 0.05;
    else multiplier = 0.01;

    const maggiorazioneEffettiva = Math.min(totalCurrentValue * multiplier, 200000);
    const capitaleRivalutato = effectiveGS + baseLine + maggiorazioneEffettiva;

    let finalLiquidation = capitaleRivalutato;
    let isMinPremiumRuleApplied = false;

    if (yearsSinceInception <= 5 && ageAtDeath <= 70) {
      if (investmentAmount > capitaleRivalutato) {
        finalLiquidation = investmentAmount;
        isMinPremiumRuleApplied = true;
      }
    }

    return {
      totalCurrentValue,
      multiplier,
      maggiorazioneEffettiva,
      finalLiquidation,
      isMinPremiumRuleApplied,
      gsGapProtection: Math.max(0, premiumGS - baseGS)
    };
  }, [results, ageAtDeath, yearsSinceInception, investmentAmount]);

  const annuityAnalysis = useMemo(() => {
    const grossAnnual = (results.montanteFinal * (hypoAnnuityCoeff / 100));
    return {
      annual: grossAnnual,
      monthly: grossAnnual / 13
    };
  }, [results, hypoAnnuityCoeff]);

  const handleAiConsult = async () => {
    if (!aiInput.trim()) return;
    setIsAiLoading(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: aiInput,
        config: {
          systemInstruction: `Sei l'assistente d'elite del Gruppo Vomero per MultInvest. 
          Conosci a memoria: M103F (Bonus 1%, 0.5%, 1%), Art. 2 (Decesso), Art. 22 (Rendite), Art. 1923 (Impignorabilità).
          Sii tecnico ma con piglio commerciale.`
        }
      });
      setAiResponse(response.text || '');
    } catch (e) {
      setAiResponse("Errore di connessione.");
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-fade-in pb-24">
      
      {/* HEADER EXECUTIVE */}
      <div className="bg-[#0a0f1d] rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden border-b-8 border-amber-500">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-amber-500/10 to-transparent"></div>
        <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
           <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                 <div className="bg-amber-50 p-3 rounded-2xl shadow-xl shadow-amber-600/20"><Binary size={32} className="text-[#233D7B]"/></div>
                 <span className="text-[11px] font-black uppercase tracking-[0.4em] text-amber-400 italic">Vomero Advisor Suite V11.2025</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
                MultInvest <br/> <span className="text-amber-500 text-6xl">Intelligence</span>
              </h1>
              <p className="text-slate-400 text-xl font-medium max-w-2xl leading-relaxed">
                Strumenti di analisi tecnica per: **M103F Shield**, **Art. 2 Decesso** e **Art. 22 Rendita**.
              </p>
           </div>
           <div className="lg:col-span-4 bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 text-center">
              <p className="text-[10px] font-black uppercase text-amber-500 mb-2 tracking-widest italic">Asset a 24 mesi</p>
              <p className="text-5xl font-black text-white tracking-tighter">{formatCurrency(results.montanteFinal)}</p>
              <p className={`text-xl font-black mt-2 ${results.totalProfitPct >= 0 ? 'text-emerald-400' : 'text-rose-500'}`}>
                {results.totalProfitPct >= 0 ? '+' : ''}{results.totalProfitPct.toFixed(2)}%
              </p>
           </div>
        </div>
      </div>

      {/* TABS NAVIGATION */}
      <div className="flex flex-wrap gap-2 bg-slate-100 p-1.5 rounded-2xl w-full md:w-fit mx-auto shadow-inner border border-slate-200">
         <button onClick={() => setActiveTab('SHIELD')} className={`px-8 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'SHIELD' ? 'bg-[#233D7B] text-white shadow-lg' : 'text-slate-500 hover:text-slate-800'}`}>
            <Crown size={16} /> M103F Shield
         </button>
         <button onClick={() => setActiveTab('DEATH')} className={`px-8 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'DEATH' ? 'bg-[#233D7B] text-white shadow-lg' : 'text-slate-500 hover:text-slate-800'}`}>
            <Skull size={16} /> Decesso (Art. 2)
         </button>
         <button onClick={() => setActiveTab('ANNUITY')} className={`px-8 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'ANNUITY' ? 'bg-[#233D7B] text-white shadow-lg' : 'text-slate-500 hover:text-slate-800'}`}>
            <ScrollText size={16} /> Rendita (Art. 22)
         </button>
         <button onClick={() => setActiveTab('SALES_KIT')} className={`px-8 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'SALES_KIT' ? 'bg-amber-500 text-slate-900 shadow-lg' : 'text-slate-500 hover:text-slate-800'}`}>
            <Sparkles size={16} /> Sales Toolkit
         </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* SIDEBAR SETUP */}
        <div className="lg:col-span-4 space-y-6 no-print">
           <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm space-y-8 sticky top-8">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                 <Settings2 size={14} className="text-[#233D7B]" /> Setup Simulazione
              </h4>
              <div className="space-y-4">
                 <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">Capitale Investito (€)</label>
                    <input type="number" value={investmentAmount} onChange={(e) => setInvestmentAmount(Number(e.target.value))} className="w-full bg-transparent font-black text-2xl outline-none text-slate-900" />
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase block italic tracking-widest">Classe Prodotto & Costo Medio Ponderato</label>
                    <div className="grid grid-cols-1 gap-2">
                       {(Object.entries(ZURICH_MULTINVEST_DATA.FEE_STRUCTURE) as [string, any][]).map(([key, tier]) => {
                          const gsRatio = gsPercentage / 100;
                          const lineRatio = 1 - gsRatio;
                          const weightedClassFee = ((gsRatio * tier.gs) + (lineRatio * tier.line)) * 100;
                          return (
                            <button key={key} onClick={() => setActiveClass(key as any)} className={`p-4 rounded-2xl border-2 transition-all text-left relative overflow-hidden ${activeClass === key ? 'border-[#233D7B] bg-indigo-50 shadow-md' : 'border-slate-100 hover:bg-slate-50'}`}>
                               <div className="flex justify-between items-center mb-1">
                                  <span className={`text-[10px] font-black uppercase ${activeClass === key ? 'text-[#233D7B]' : 'text-slate-500'}`}>{tier.label}</span>
                                  {activeClass === key && <CheckCircle2 size={14} className="text-[#233D7B]" />}
                               </div>
                               <div className="flex justify-between items-end">
                                  <p className="text-[9px] text-slate-400 font-bold uppercase">Minimo: {formatCurrency(tier.min)}</p>
                                  <p className={`text-[11px] font-black uppercase tracking-tight ${activeClass === key ? 'text-[#233D7B]' : 'text-slate-600'}`}>Costo: {weightedClassFee.toFixed(2)}%</p>
                               </div>
                            </button>
                          );
                       })}
                    </div>
                 </div>

                 <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                    <div className="flex justify-between items-center mb-1">
                       <label className="text-[10px] font-black text-emerald-600 uppercase italic">Rend. Gestione Separata ({hypoGsYield}%)</label>
                    </div>
                    <input type="range" min="-5" max="8" step="0.1" value={hypoGsYield} onChange={(e) => setHypoGsYield(Number(e.target.value))} className="w-full h-1.5 bg-emerald-200 rounded-lg appearance-none accent-emerald-600" />
                 </div>

                 <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                    <div className="flex justify-between items-center mb-1">
                       <label className="text-[10px] font-black text-indigo-600 uppercase italic">Rend. Linea Unit-Linked ({hypoLineYield}%)</label>
                    </div>
                    <input type="range" min="-15" max="25" step="0.1" value={hypoLineYield} onChange={(e) => setHypoLineYield(Number(e.target.value))} className="w-full h-1.5 bg-indigo-200 rounded-lg appearance-none accent-indigo-600" />
                 </div>

                 <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
                    <div className="flex justify-between items-center mb-1">
                       <label className="text-[10px] font-black text-amber-600 uppercase italic">Allocazione GS ({gsPercentage}%)</label>
                    </div>
                    <input type="range" min="10" max="90" step="5" value={gsPercentage} onChange={(e) => setGsPercentage(Number(e.target.value))} className="w-full h-1.5 bg-amber-200 rounded-lg appearance-none accent-amber-600" />
                 </div>
              </div>
           </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="lg:col-span-8 space-y-8">
           
           {/* TAB: DECESSO */}
           {activeTab === 'DEATH' && (
              <div className="space-y-8 animate-fade-in">
                 <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-xl overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-10 opacity-5"><HeartPulse size={300} /></div>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 relative z-10 gap-6">
                       <div>
                          <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic flex items-center gap-3">
                             <Skull className="text-rose-600" /> Prestazione Caso Decesso
                          </h3>
                          <p className="text-slate-400 text-[10px] font-black mt-2 uppercase tracking-widest italic">Art. 2 - Protocollo Tecnico 11.2025</p>
                       </div>
                       <div className="flex gap-4">
                          <div className="bg-rose-50 px-6 py-3 rounded-2xl border border-rose-100 text-rose-700 shadow-sm">
                             <p className="text-[9px] font-black uppercase mb-1">Età al Decesso</p>
                             <div className="flex items-center gap-3">
                                <button onClick={() => setAgeAtDeath(Math.max(18, ageAtDeath - 1))}><MinusCircle size={18}/></button>
                                <span className="font-black text-2xl">{ageAtDeath}y</span>
                                <button onClick={() => setAgeAtDeath(Math.min(99, ageAtDeath + 1))}><PlusCircle size={18}/></button>
                             </div>
                          </div>
                          <div className="bg-rose-50 px-6 py-3 rounded-2xl border border-rose-100 text-rose-700 shadow-sm">
                             <p className="text-[9px] font-black uppercase mb-1">Anzianità</p>
                             <div className="flex items-center gap-3">
                                <button onClick={() => setYearsSinceInception(Math.max(1, yearsSinceInception - 1))}><MinusCircle size={18}/></button>
                                <span className="font-black text-2xl">{yearsSinceInception}y</span>
                                <button onClick={() => setYearsSinceInception(Math.min(30, yearsSinceInception + 1))}><PlusCircle size={18}/></button>
                             </div>
                          </div>
                       </div>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-10 relative z-10">
                       <div className="lg:col-span-7">
                          <div className="p-10 bg-[#0a0f1d] rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden group border-l-8 border-rose-500">
                             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><Gift size={180} /></div>
                             <p className="text-[11px] font-black text-amber-400 uppercase tracking-[0.4em] mb-4 italic">Liquidazione Netta ai Beneficiari</p>
                             <h4 className="text-6xl font-black italic tracking-tighter">{formatCurrency(deathAnalysis.finalLiquidation)}</h4>
                             <div className="mt-8 flex flex-wrap gap-3">
                                <span className="px-5 py-2 bg-white/10 rounded-full border border-white/20 text-[10px] font-black uppercase italic flex items-center gap-2">
                                   <Zap size={14} className="text-amber-500"/> Maggiorazione Art 2.1: +{(deathAnalysis.multiplier * 100).toFixed(0)}%
                                </span>
                                <span className="px-5 py-2 bg-emerald-500/20 text-emerald-400 rounded-full border border-emerald-500/20 text-[10px] font-black uppercase flex items-center gap-2">
                                   <ShieldCheck size={14}/> Successione 0% (Art. 12)
                                </span>
                             </div>
                          </div>
                       </div>
                       <div className="lg:col-span-5 space-y-6">
                          <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-200 shadow-inner">
                             <h5 className="text-[11px] font-black text-[#233D7B] uppercase mb-6 flex items-center gap-2">Breakdown Analitico</h5>
                             <div className="space-y-4">
                                <div className="flex justify-between text-[11px] font-bold text-slate-500 uppercase">
                                   <span>Valore Mercato:</span>
                                   <span className="text-slate-900 font-black">{formatCurrency(deathAnalysis.totalCurrentValue)}</span>
                                </div>
                                <div className="flex justify-between text-[11px] font-black text-indigo-600 uppercase pt-4 border-t border-slate-200">
                                   <span>Maggiorazione:</span>
                                   <span>+{formatCurrency(deathAnalysis.maggiorazioneEffettiva)}</span>
                                </div>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           )}

           {/* TAB: RENDITA */}
           {activeTab === 'ANNUITY' && (
              <div className="space-y-8 animate-fade-in">
                 <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-10 opacity-[0.02]"><ScrollText size={300} /></div>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 relative z-10 gap-6">
                       <div className="max-w-xl">
                          <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic flex items-center gap-3">
                             <ScrollText className="text-indigo-600" /> Opzioni di Rendita (Art. 22)
                          </h3>
                          <p className="text-slate-500 text-sm mt-2 italic font-medium">Conversione del montante accumulato in flusso di cassa vitalizio.</p>
                       </div>
                       <div className="bg-slate-900 p-8 rounded-[2.5rem] border-t-4 border-amber-500 text-white text-center shadow-xl shrink-0">
                          <p className="text-[10px] font-black uppercase text-amber-500 mb-2 tracking-widest">Rendita Stimata</p>
                          <p className="text-4xl font-black">{formatCurrency(annuityAnalysis.monthly)}</p>
                          <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">Mensili (13 rate)</p>
                       </div>
                    </div>
                 </div>
              </div>
           )}

           {/* TAB: SALES KIT + AI ADVISOR */}
           {activeTab === 'SALES_KIT' && (
              <div className="space-y-10 animate-fade-in">
                 <div className="grid md:grid-cols-2 gap-8">
                    {salesStrategies.map((strat, idx) => (
                       <div key={idx} className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm hover:shadow-2xl transition-all group relative overflow-hidden flex flex-col justify-between">
                          <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:scale-110 transition-transform"><Trophy size={300} /></div>
                          <div className="relative z-10">
                             <div className="flex justify-between items-start mb-8">
                                <div className="bg-amber-500 p-3 rounded-2xl text-slate-900 shadow-lg"><UserSearch size={24}/></div>
                                <span className="text-[10px] font-black bg-indigo-600 text-white px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm">{strat.hook}</span>
                             </div>
                             <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic mb-4 leading-none">{strat.target}</h4>
                             <div>
                                <p className="text-[9px] font-black text-rose-500 uppercase tracking-[0.2em] mb-1 italic">The Pain Point</p>
                                <p className="text-sm font-bold text-slate-700 leading-relaxed">"{strat.pain}"</p>
                             </div>
                          </div>
                          <div className="mt-8 pt-8 border-t border-slate-100 relative z-10">
                             <p className="text-[9px] font-black text-amber-600 uppercase mb-4 italic flex items-center gap-2"><MessagesSquare size={14} /> The Killer Script</p>
                             <div className="bg-slate-900 p-6 rounded-3xl text-white italic text-sm font-medium leading-relaxed relative">
                                <Quote className="absolute -top-3 -left-3 text-amber-500 opacity-30" size={32} />
                                "{strat.script}"
                             </div>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           )}

           {/* TAB: SHIELD */}
           {activeTab === 'SHIELD' && (
              <div className="space-y-8 animate-fade-in">
                 <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-10 opacity-5"><Target size={300} /></div>
                    <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic mb-10 flex items-center gap-3">
                       <Microscope className="text-indigo-600" /> Waterfall Bonus Campagna M103F
                    </h3>
                    <div className="space-y-4 relative z-10">
                       <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white flex justify-between items-center group transition-all">
                          <div>
                             <p className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em] mb-2 italic">T0: Bonus Emissione (1%)</p>
                             <h4 className="text-3xl font-black italic tracking-tighter">{formatCurrency(investmentAmount + results.bonusT0_Total)}</h4>
                          </div>
                          <p className="text-xl font-black text-amber-500">+{formatCurrency(results.bonusT0_Total)}</p>
                       </div>
                       <div className="flex justify-center -my-2"><ChevronDown className="text-slate-300" /></div>
                       <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex justify-between items-center">
                          <p className="text-xs font-black text-slate-700 uppercase italic">T1: Bonus Ricorrente (+0,5% GS a 12m)</p>
                          <p className="text-lg font-black text-indigo-600">+{formatCurrency(results.bonusT1)}</p>
                       </div>
                       <div className="flex justify-center -my-2"><ChevronDown className="text-slate-300" /></div>
                       <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex justify-between items-center">
                          <p className="text-xs font-black text-slate-700 uppercase italic">T2: Bonus Fedeltà (+1,0% GS a 24m)</p>
                          <p className="text-lg font-black text-emerald-600">+{formatCurrency(results.bonusT2)}</p>
                       </div>
                    </div>
                 </div>
              </div>
           )}

        </div>
      </div>
    </div>
  );
};

export default MultInvestAnalysisView;
