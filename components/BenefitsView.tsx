
import React, { useState, useMemo } from 'react';
import { PageView } from '../types';
import { 
  Building2, Scale, ShieldCheck, Landmark, Settings2, TrendingUp, Calculator, 
  Handshake, BadgePercent, ArrowRight, TrendingDown, Quote, Microscope, 
  Percent, FileSignature, Binary, Sparkles, Lightbulb, BookOpenCheck, 
  Zap, Plus, Equal, Info, AlertOctagon, History as HistoryIcon,
  ShieldPlus, Coins, Receipt, ArrowDownToLine, CheckCircle2, ChevronRight,
  Minus, UserCheck, AlertCircle,
  ArrowDownNarrowWide, Wallet, FileText, ChevronDown, Layers, Timer, 
  ArrowDownUp, RefreshCw, BarChart3, AlertTriangle, ShieldX, Gavel, 
  ShieldAlert, Activity, FileWarning, Briefcase, MinusCircle, PlusCircle,
  Calendar, ClipboardList, PiggyBank, HeartPulse, UserMinus, Shield,
  Stethoscope, Home, Unlock, PiggyBank as PiggyIcon,
  ArrowLeftRight, Zap as ZapIcon, ReceiptEuro, Table as TableIcon,
  Target, Search, FileCheck, MousePointer2,
  ListChecks, PenTool, UserPlus, HeartHandshake,
  ArrowUpCircle, Gem, Star, Lock, Factory,
  LifeBuoy, Key, HardHat, GraduationCap, FastForward,
  ArrowRightLeft, FileDown, ShieldCheck as ShieldCheckIcon,
  Siren, Flame, Skull, Ban,
  BadgeCheck,
  TrendingUp as TrendUp,
  CreditCard,
  FileSearch,
  ArrowUpRight,
  Gift,
  ArrowDownCircle,
  Users,
  Clock,
  ArrowUpCircle as ArrowUp,
  LockKeyhole,
  Check,
  ShieldAlert as AlertIcon
} from 'lucide-react';

const formatCurrency = (val: number) => 
  new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);

/**
 * ============================================================================
 * WORKER AUDIT (B2C) - CONFIGURATORE FISCALE 2026 & FLESSIBILITÀ
 * ============================================================================
 */
const WorkerAudit: React.FC<{ onChangeView: (v: PageView) => void }> = ({ onChangeView }) => {
  // Parametri Lavoratore
  const [ral, setRal] = useState<number>(35000);
  const [extraContribution, setExtraContribution] = useState<number>(200); // Mensile
  const [seniority, setSeniority] = useState<number>(15); 
  const [employerContribPct, setEmployerContribPct] = useState<number>(1.5);

  // Analisi Dinamica basata su RAL 2026
  const analysis = useMemo(() => {
    // 1. Identificazione Scaglione IRPEF 2026
    let marginalRate = 0.23;
    let bracketLabel = "Fino a 28k";
    if (ral > 50000) {
      marginalRate = 0.43;
      bracketLabel = "Oltre 50k";
    } else if (ral > 28000) {
      marginalRate = 0.33;
      bracketLabel = "28k - 50k";
    }

    // 2. Cashback Fiscale (Deducibilità)
    const annualExtra = extraContribution * 12;
    const actualDeduction = Math.min(annualExtra, 5164.57);
    const taxRefund = actualDeduction * marginalRate;
    const netCost = annualExtra - taxRefund;

    // 3. Regalo Datoriale
    const employerGift = ral * (employerContribPct / 100);

    // 4. Tassazione Anticipi (Protocollo 2026)
    // Salute: 15% - 0.3% per anno dopo il 15esimo (min 9%)
    const healthTaxRate = Math.max(9, 15 - (Math.max(0, seniority - 15) * 0.3));
    // Casa / Spese Personali: 23% Fisso
    const homeTaxRate = 23;
    // In Azienda: Tassazione Separata (Media IRPEF ultimi 2 anni, solitamente >= 23%)
    const companyTaxRateAvg = Math.max(23, marginalRate - 0.05);

    return {
      marginalRate,
      bracketLabel,
      taxRefund,
      netCost,
      employerGift,
      healthTaxRate,
      homeTaxRate,
      companyTaxRateAvg,
      annualExtra,
      actualDeduction
    };
  }, [ral, extraContribution, seniority, employerContribPct]);

  return (
    <div className="space-y-12 animate-fade-in pb-24">
      {/* HERO B2C */}
      <div className="bg-[#0a0f1d] rounded-[3.5rem] p-12 text-white shadow-2xl relative border-b-8 border-indigo-600 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-600/10 to-transparent"></div>
        <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
           <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                 <div className="bg-indigo-600 p-3 rounded-2xl shadow-xl text-white"><Calculator size={32} /></div>
                 <span className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-400 italic">Financial Efficiency Audit B2C - Budget 2026</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
                Risparmio <br/> <span className="text-indigo-500 text-6xl">Matematico.</span>
              </h1>
              <p className="text-slate-400 text-xl font-medium max-w-xl leading-relaxed">
                "Dottore, il Fondo Pensione non è una spesa, è un **congelatore fiscale**. Lei mette 100, ma grazie allo Stato le costa solo {Math.round(100 - (analysis.marginalRate * 100))}."
              </p>
           </div>
           <div className="lg:col-span-4 bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 text-center relative group">
              <p className="text-[10px] font-black text-amber-500 uppercase mb-2 tracking-widest italic">Rimborso IRPEF Annuo</p>
              <p className="text-6xl font-black text-white tracking-tighter">+{formatCurrency(analysis.taxRefund)}</p>
              <p className="text-[10px] text-indigo-400 font-black uppercase mt-4 italic">Cashback immediato in busta paga</p>
           </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* CONFIGURATORE FISCALE 2026 */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8">
             <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 italic">
                <Settings2 size={14} className="text-indigo-600" /> Parametri 2026
             </h4>
             <div className="space-y-6">
                <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100">
                   <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">RAL Lorda Annua (€)</label>
                   <input type="number" value={ral} onChange={(e) => setRal(Number(e.target.value))} className="w-full bg-transparent font-black text-2xl outline-none text-slate-900" />
                   <div className="mt-2 flex justify-between items-center">
                      <span className="text-[9px] font-black text-indigo-600 uppercase">Aliquota 2026:</span>
                      <span className="bg-indigo-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full">{analysis.marginalRate * 100}%</span>
                   </div>
                </div>

                <div className="bg-indigo-900 p-6 rounded-3xl text-white shadow-xl relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-2 opacity-10"><Zap size={100} /></div>
                   <label className="text-[10px] font-black text-indigo-300 uppercase block mb-3">Versamento Volontario (€/mese)</label>
                   <input type="number" value={extraContribution} onChange={(e) => setExtraContribution(Number(e.target.value))} className="w-full bg-transparent font-black text-3xl outline-none text-white border-b-2 border-white/20 pb-2 mb-4" />
                   <p className="text-[9px] text-indigo-200 font-bold uppercase italic leading-relaxed">
                      "Ogni euro che versa le costa realmente solo {formatCurrency(1 - analysis.marginalRate)}."
                   </p>
                </div>

                <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100">
                   <div className="flex justify-between items-center mb-1">
                      <label className="text-[10px] font-black text-slate-500 uppercase italic">Anzianità Fondo ({seniority} anni)</label>
                   </div>
                   <input type="range" min="1" max="45" value={seniority} onChange={(e) => setSeniority(Number(e.target.value))} className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none accent-indigo-600" />
                   <p className="text-[9px] text-indigo-600 font-bold mt-2 uppercase tracking-tighter">Tassa Uscita Salute: {analysis.healthTaxRate.toFixed(1)}%</p>
                </div>
             </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group">
             <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform"><Landmark size={200} /></div>
             <h4 className="text-amber-400 text-[10px] font-black uppercase mb-4 tracking-widest italic flex items-center gap-2"><LockKeyhole size={14}/> Scudo Patrimoniale Art. 1923</h4>
             <p className="text-sm text-slate-300 leading-relaxed font-medium italic">
                "Dottore, il capitale nel fondo è **impignorabile**. Sul conto titoli bancario, invece, è a disposizione di qualsiasi creditore o banca."
             </p>
          </div>
        </div>

        {/* ANALISI MATEMATICA & ANTICIPI */}
        <div className="lg:col-span-8 space-y-8">
           
           <div className="bg-white rounded-[3rem] p-10 border border-slate-200 shadow-sm relative overflow-hidden">
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic mb-10 flex items-center gap-3">
                 <Binary className="text-indigo-600" /> Analisi Matematica del Risparmio
              </h3>
              
              <div className="space-y-8">
                 {/* FORMULA 1: DEDUCIBILITÀ */}
                 <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 relative group">
                    <div className="flex justify-between items-start mb-6">
                       <div>
                          <span className="text-[10px] font-black bg-indigo-600 text-white px-3 py-1 rounded-full uppercase">Step 1: Efficienza IRPEF (Deducibilità)</span>
                          <h4 className="text-lg font-black text-slate-800 mt-2 uppercase tracking-tight">Il Cashback Fiscale</h4>
                       </div>
                       <span className="text-2xl font-black text-indigo-600">+{formatCurrency(analysis.taxRefund)}</span>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-slate-200 font-mono text-[11px] text-slate-500 mb-4 shadow-inner">
                       <span className="text-indigo-600 font-black">ALGORITMO:</span> Versamento ({formatCurrency(analysis.annualExtra)}) × Aliquota Marginale {analysis.bracketLabel} ({analysis.marginalRate * 100}%) = Rimb. IRPEF
                    </div>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed italic">
                       Grazie all'Art. 10 TUIR, lo Stato finanzia la sua pensione restituendole immediatamente una quota del versamento tramite conguaglio fiscale.
                    </p>
                 </div>

                 {/* FORMULA 2: CONTRIBUTO DATORIALE */}
                 <div className="p-8 bg-emerald-50 rounded-[2.5rem] border border-emerald-100">
                    <div className="flex justify-between items-start mb-6">
                       <div>
                          <span className="text-[10px] font-black bg-emerald-600 text-white px-3 py-1 rounded-full uppercase">Step 2: Contributo Azienda (CCNL)</span>
                          <h4 className="text-lg font-black text-slate-800 mt-2 uppercase tracking-tight">Il "Regalo" Obbligatorio</h4>
                       </div>
                       <span className="text-2xl font-black text-emerald-600">+{formatCurrency(analysis.employerGift)}</span>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-emerald-200 font-mono text-[11px] text-emerald-600 mb-4 shadow-inner">
                       <span className="text-emerald-700 font-black">ALGORITMO:</span> RAL ({formatCurrency(ral)}) × % Contributo Aziendale ({employerContribPct}%) = Capitale Extra Annuo
                    </div>
                    <p className="text-xs text-slate-600 font-bold leading-relaxed italic">
                       Questi soldi l'azienda glieli dà **solo se** apre il fondo. Non aderire significa rifiutare un aumento di stipendio gratuito garantito per legge.
                    </p>
                 </div>
              </div>
           </div>

           {/* TASSAZIONE ANTICIPI E FLESSIBILITÀ (NEW SPECIFIC SECTION) */}
           <div className="bg-white rounded-[3rem] p-10 border border-slate-200 shadow-sm overflow-hidden">
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic mb-10 flex items-center gap-3">
                 <ArrowRightLeft className="text-indigo-600" /> Audit Flessibilità: Tassazione Anticipi
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                 {/* COMPARTO FONDO PENSIONE */}
                 <div className="space-y-6">
                    <h4 className="text-sm font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2"><Sparkles size={16}/> Prelievo dal Fondo</h4>
                    <div className="space-y-4">
                       <div className="p-5 bg-indigo-50 rounded-2xl border border-indigo-100">
                          <div className="flex justify-between items-center mb-1">
                             <span className="text-[10px] font-black text-slate-500 uppercase">Spese Sanitarie Gravi (75%)</span>
                             <span className="text-sm font-black text-emerald-600">{analysis.healthTaxRate.toFixed(1)}%</span>
                          </div>
                          <p className="text-[9px] text-slate-400 font-bold italic">Sempre disponibile, tassazione ultra-agevolata.</p>
                       </div>
                       <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                          <div className="flex justify-between items-center mb-1">
                             <span className="text-[10px] font-black text-slate-500 uppercase">Acquisto Prima Casa (75%)</span>
                             <span className="text-sm font-black text-slate-900">{analysis.homeTaxRate}%</span>
                          </div>
                          <p className="text-[9px] text-slate-400 font-bold italic">Dopo 8 anni di anzianità.</p>
                       </div>
                       <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                          <div className="flex justify-between items-center mb-1">
                             <span className="text-[10px] font-black text-slate-500 uppercase">Spese Personali (30%)</span>
                             <span className="text-sm font-black text-slate-900">{analysis.homeTaxRate}%</span>
                          </div>
                          <p className="text-[9px] text-slate-400 font-bold italic">Libero (Senza Causale) dopo 8 anni.</p>
                       </div>
                    </div>
                 </div>

                 {/* COMPARTO TFR IN AZIENDA */}
                 <div className="space-y-6">
                    <h4 className="text-sm font-black text-rose-500 uppercase tracking-widest flex items-center gap-2"><Landmark size={16}/> Prelievo TFR Azienda</h4>
                    <div className="p-8 bg-rose-50 rounded-[2.5rem] border-2 border-rose-100 h-full flex flex-col justify-center text-center group">
                       <div className="bg-white p-6 rounded-3xl shadow-sm mb-6">
                          <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Tassazione Separata (Media IRPEF)</p>
                          <p className="text-4xl font-black text-rose-600">~{analysis.companyTaxRateAvg.toFixed(0)}%</p>
                       </div>
                       <p className="text-xs text-rose-800 font-bold leading-relaxed italic px-4">
                          "Dottore, prelevare dal TFR aziendale le costa il doppio in tasse. Nel fondo, dopo 35 anni, pagherebbe solo il **9%**."
                       </p>
                       <div className="mt-8 pt-6 border-t border-rose-200">
                          <div className="flex items-center gap-2 text-rose-600 text-[10px] font-black uppercase">
                             <AlertOctagon size={14} /> Vincoli Rigidi Art. 2120 c.c.
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* FOOTER EXECUTIVO B2C */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
         <div className="flex items-center gap-6">
            <div className="bg-[#0f172a] p-4 rounded-[1.5rem] text-white shadow-lg"><FileSignature size={32} /></div>
            <div>
               <p className="text-lg font-black text-slate-800 uppercase tracking-tighter leading-none mb-1">Fiscal Efficiency Certification 2026</p>
               <p className="text-xs text-slate-500 font-bold italic">Rif: Art. 10 TUIR | Legge Bilancio 2026 | D.Lgs 252/05 | Revisione Algoritmo Advisor Gruppo Vomero</p>
            </div>
         </div>
      </div>

    </div>
  );
};

/**
 * ============================================================================
 * COMPANY AUDIT (B2B) - ANALISI VANTAGGI RINUNCIA AUTOFINANZIAMENTO
 * ============================================================================
 */
const CompanyAudit: React.FC = () => {
  const [wageBill, setWageBill] = useState<number>(500000); 
  const [employees, setEmployees] = useState<number>(15);
  const [inflation, setInflation] = useState<number>(3.5);
  const [tfrStock, setTfrStock] = useState<number>(300000);

  const analysis = useMemo(() => {
    // 1. Costo Autofinanziamento (Rivalutazione)
    const revalRate = 1.5 + (0.75 * inflation);
    const yearlyRevalCost = tfrStock * (revalRate / 100);
    const substituteTax = yearlyRevalCost * 0.17;
    const realRevalOutflow = yearlyRevalCost; // Per l'imprenditore è un debito che cresce

    // 2. Misure Compensative Art. 10
    const yearlyTfrAccrual = wageBill * 0.0741; 
    const dedPct = employees < 50 ? 0.06 : 0.04;
    const extraDeductionBase = yearlyTfrAccrual * dedPct;
    const iresSaving = extraDeductionBase * 0.24; 
    
    // Esonero contributivo Fondo Garanzia (0.20%)
    const inpsGuaranteeExemption = wageBill * 0.0020;
    
    // Riduzione oneri sociali (0.28% o 0.20%)
    const socialTaxSaving = wageBill * 0.0028;

    const totalCashback = iresSaving + inpsGuaranteeExemption + socialTaxSaving;
    const totalStrategicAdvantage = substituteTax + totalCashback;

    return { 
      revalRate, yearlyRevalCost, substituteTax, iresSaving, inpsGuaranteeExemption, 
      socialTaxSaving, totalCashback, totalStrategicAdvantage, yearlyTfrAccrual
    };
  }, [wageBill, employees, inflation, tfrStock]);

  return (
    <div className="space-y-12 animate-fade-in pb-24">
      {/* HERO CORPORATE - IL CAMBIO DI PARADIGMA */}
      <div className="bg-[#0f172a] rounded-[3.5rem] p-12 text-white shadow-2xl relative border-b-8 border-amber-500 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-amber-500/10 to-transparent"></div>
        <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
           <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                 <div className="bg-amber-50 p-3 rounded-2xl shadow-xl text-slate-900"><Factory size={32} /></div>
                 <span className="text-[11px] font-black uppercase tracking-[0.4em] text-amber-400 italic">Corporate Strategic Audit B2B</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
                L'Inganno del <br/> <span className="text-amber-500">TFR in Azienda.</span>
              </h1>
              <p className="text-slate-400 text-xl font-medium max-w-xl leading-relaxed">
                "Dottore, il TFR non è autofinanziamento: è un **debito a vista** che oggi le costa il **{analysis.revalRate.toFixed(2)}%** annuo. Esternalizzarlo non è un costo, è un'operazione di pulizia finanziaria certificata dallo Stato."
              </p>
           </div>
           <div className="lg:col-span-4 bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 text-center">
              <p className="text-[10px] font-black text-amber-500 uppercase mb-2 tracking-widest italic">Vantaggio Economico Annuo</p>
              <p className="text-6xl font-black text-white tracking-tighter">{formatCurrency(analysis.totalStrategicAdvantage)}</p>
              <p className="text-[10px] text-emerald-400 font-black uppercase mt-4 italic">Cashback Fiscale + Oneri evitati</p>
           </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* SIDEBAR CONFIGURATION */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8">
             <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Settings2 size={14} className="text-amber-600" /> Configurazione Impresa
             </h4>
             <div className="space-y-6">
                <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100">
                   <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">Stock TFR in Bilancio (€)</label>
                   <input type="number" value={tfrStock} onChange={(e) => setTfrStock(Number(e.target.value))} className="w-full bg-transparent font-black text-2xl outline-none text-slate-900" />
                </div>
                <div className="bg-amber-50 p-5 rounded-3xl border border-amber-200">
                   <div className="flex justify-between items-center mb-1">
                      <label className="text-[10px] font-black text-amber-700 uppercase block">Inflazione ISTAT (%)</label>
                      <span className="font-black text-amber-800">{inflation}%</span>
                   </div>
                   <input type="range" min="0" max="8" step="0.5" value={inflation} onChange={(e) => setInflation(Number(e.target.value))} className="w-full h-1.5 bg-amber-200 rounded-lg appearance-none accent-amber-600" />
                </div>
                <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100">
                   <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">Monte Salari (RAL Tot) (€)</label>
                   <input type="number" value={wageBill} onChange={(e) => setWageBill(Number(e.target.value))} className="w-full bg-transparent font-black text-2xl outline-none text-slate-900" />
                </div>
             </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group border-b-8 border-indigo-500">
             <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform"><Landmark size={200} /></div>
             <h4 className="text-indigo-400 text-[10px] font-black uppercase mb-4 tracking-widest italic flex items-center gap-2"><ArrowUpRight size={14}/> Rating Bancario (CCII)</h4>
             <p className="text-sm text-slate-300 leading-relaxed font-medium italic">
                "Dottore, il nuovo **Codice della Crisi** impone di monitorare i debiti a breve. Il TFR è un debito 'a vista' che può essere richiesto dai dipendenti in qualsiasi momento. Esternalizzarlo migliora istantaneamente la sua **PFN** e il suo rating bancario."
             </p>
          </div>
        </div>

        {/* ANALISI ANALITICA VANTAGGI */}
        <div className="lg:col-span-8 space-y-8">
           <div className="bg-white rounded-[3rem] p-10 border border-slate-200 shadow-sm relative overflow-hidden">
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic mb-10 flex items-center gap-3 leading-none">
                 <Binary className="text-amber-600" /> Analisi Matematica del Risparmio (Explicit Formulas)
              </h3>
              
              <div className="space-y-8">
                 {/* VANTAGGIO 1: ELIMINAZIONE COSTO RIVALUTAZIONE */}
                 <div className="p-8 bg-rose-50 rounded-[2.5rem] border border-rose-100 relative group">
                    <div className="flex justify-between items-start mb-6">
                       <div>
                          <span className="text-[10px] font-black bg-rose-600 text-white px-3 py-1 rounded-full uppercase">Eliminazione Passività</span>
                          <h4 className="text-lg font-black text-slate-800 mt-2 uppercase tracking-tight">Costo Rivalutazione Evitato</h4>
                       </div>
                       <span className="text-2xl font-black text-rose-600">-{formatCurrency(analysis.yearlyRevalCost)}</span>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-rose-200 font-mono text-[11px] text-slate-500 mb-4 shadow-inner">
                       <span className="text-rose-600 font-black">FORMULA:</span> Stock ({formatCurrency(tfrStock)}) × [1.5% + (75% × Inflazione {inflation}%)] = Interessi Passivi Reali
                    </div>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed italic">
                       Anziché pagare il {analysis.revalRate.toFixed(2)}% ai dipendenti per un 'finanziamento' rischioso, l'azienda smette di accumulare interessi passivi sul debito.
                    </p>
                 </div>

                 {/* VANTAGGIO 2: MISURE COMPENSATIVE ART. 10 */}
                 <div className="p-8 bg-emerald-50 rounded-[2.5rem] border border-emerald-100 relative group">
                    <div className="flex justify-between items-start mb-6">
                       <div>
                          <span className="text-[10px] font-black bg-emerald-600 text-white px-3 py-1 rounded-full uppercase">Misure Compensative (Art. 10 D.Lgs 252/05)</span>
                          <h4 className="text-lg font-black text-slate-800 mt-2 uppercase tracking-tight">Cashback Fiscale Certificato</h4>
                       </div>
                       <span className="text-2xl font-black text-emerald-600">+{formatCurrency(analysis.totalCashback)}</span>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                       <div className="bg-white p-4 rounded-2xl border border-emerald-200 text-center">
                          <p className="text-[9px] font-black text-slate-400 uppercase">Extra-Deduzione IRES</p>
                          <p className="text-sm font-black text-emerald-700">{formatCurrency(analysis.iresSaving)}</p>
                       </div>
                       <div className="bg-white p-4 rounded-2xl border border-emerald-200 text-center">
                          <p className="text-[9px] font-black text-slate-400 uppercase">Esonero F. Garanzia</p>
                          <p className="text-sm font-black text-emerald-700">{formatCurrency(analysis.inpsGuaranteeExemption)}</p>
                       </div>
                       <div className="bg-white p-4 rounded-2xl border border-emerald-200 text-center">
                          <p className="text-[9px] font-black text-slate-400 uppercase">Riduzione Oneri</p>
                          <p className="text-sm font-black text-emerald-700">{formatCurrency(analysis.socialTaxSaving)}</p>
                       </div>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-emerald-200 font-mono text-[11px] text-emerald-600 mb-4 shadow-inner">
                       <span className="text-emerald-700 font-black">FORMULA:</span> Accantonamento ({formatCurrency(analysis.yearlyTfrAccrual)}) × {employees < 50 ? '6%' : '4%'} (Deduzione) + {employees < 50 ? '0.28%' : '0.20%'} (Oneri)
                    </div>
                    <p className="text-xs text-emerald-700 font-bold leading-relaxed italic">
                       Lo Stato "paga" l'azienda per liberarsi del TFR, offrendo sconti contributivi e deduzioni extra che migliorano l'EBITDA.
                    </p>
                 </div>

                 {/* VANTAGGIO 3: ARBITRAGGIO IMPOSTA SOSTITUTIVA */}
                 <div className="p-8 bg-amber-50 rounded-[2.5rem] border border-amber-100 relative group">
                    <div className="flex justify-between items-start mb-6">
                       <div>
                          <span className="text-[10px] font-black bg-amber-600 text-white px-3 py-1 rounded-full uppercase">Ottimizzazione Flussi</span>
                          <h4 className="text-lg font-black text-slate-800 mt-2 uppercase tracking-tight">Recupero Imposta Sostitutiva (17%)</h4>
                       </div>
                       <span className="text-2xl font-black text-amber-600">+{formatCurrency(analysis.substituteTax)}</span>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-amber-200 font-mono text-[11px] text-amber-600 mb-4 shadow-inner">
                       <span className="text-amber-700 font-black">FORMULA:</span> Rivalutazione Lorda ({formatCurrency(analysis.yearlyRevalCost)}) × 17% (Tassa L. 190/14) = Risparmio di Cassa Immediato
                    </div>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed italic">
                       Ogni anno lei versa il 17% allo Stato per rivalutare un debito. Esternalizzando, smette di regalare questi soldi all'Erario oggi.
                    </p>
                 </div>
              </div>
           </div>

           {/* ANALISI COMPARATIVA: PERCHÉ RINUNCIARE? */}
           <div className="bg-white rounded-[3rem] p-10 border border-slate-200 shadow-sm">
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic mb-10 flex items-center gap-3">
                 <ArrowRightLeft className="text-amber-600" /> Autofinanziamento vs Outsourcing Zurich
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                 <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-200 space-y-6">
                    <h4 className="font-black text-slate-400 text-xs uppercase tracking-widest flex items-center gap-2"><TrendingDown size={14}/> TFR in Azienda (Self-Finance)</h4>
                    <ul className="space-y-4 text-xs font-bold text-slate-500 italic">
                       <li className="flex gap-3 items-center"><MinusCircle size={16} className="text-rose-400 shrink-0" /> Costo Reale: {analysis.revalRate.toFixed(2)}% (Superiore ai tassi bancari)</li>
                       <li className="flex gap-3 items-center"><MinusCircle size={16} className="text-rose-400 shrink-0" /> PFN: Aumenta il debito a breve termine</li>
                       <li className="flex gap-3 items-center"><MinusCircle size={16} className="text-rose-400 shrink-0" /> Rischio: Richiesta improvvisa liquidità (Anticipi/Dimissioni)</li>
                       <li className="flex gap-3 items-center"><MinusCircle size={16} className="text-rose-400 shrink-0" /> Rating: Rating bancario penalizzato (Debito On-Demand)</li>
                    </ul>
                 </div>

                 <div className="p-8 bg-amber-600 rounded-[2.5rem] text-white shadow-xl space-y-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><ZapIcon size={120} /></div>
                    <h4 className="font-black text-amber-200 text-xs uppercase tracking-widest flex items-center gap-2 relative z-10"><TrendingUp size={14}/> TFR nel Fondo (Outsourcing)</h4>
                    <ul className="space-y-4 text-xs font-black relative z-10">
                       <li className="flex gap-3 items-center"><CheckCircle2 size={16} className="text-emerald-400 shrink-0" /> Costo Reale: ZERO (Anzi, Cashback Fiscale Art. 10)</li>
                       <li className="flex gap-3 items-center"><CheckCircle2 size={16} className="text-emerald-400 shrink-0" /> PFN: Elimina passività correnti dal bilancio</li>
                       <li className="flex gap-3 items-center"><CheckCircle2 size={16} className="text-emerald-400 shrink-0" /> Sicurezza: Liquidità aziendale protetta</li>
                       <li className="flex gap-3 items-center"><CheckCircle2 size={16} className="text-emerald-400 shrink-0" /> Rating: Miglioramento solvibilità percepita</li>
                    </ul>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* FOOTER EXECUTIVO B2B */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
         <div className="flex items-center gap-6">
            <div className="bg-[#0f172a] p-4 rounded-[1.5rem] text-white shadow-lg"><FileSignature size={32} /></div>
            <div>
               <p className="text-lg font-black text-slate-800 uppercase tracking-tighter leading-none mb-1">Corporate Wealth Certification - B2B Unit</p>
               <p className="text-xs text-slate-500 font-bold italic">Rif: Art. 10 D.Lgs 252/05 | L. 297/82 | Codice della Crisi (CCII) | Aggiornamento 03/2025</p>
            </div>
         </div>
      </div>
    </div>
  );
};

const BenefitsView: React.FC<{ type: 'WORKER' | 'COMPANY', onChangeView: (v: PageView) => void }> = ({ type, onChangeView }) => {
  return (
    <div className="max-w-7xl mx-auto">
      {type === 'WORKER' ? <WorkerAudit onChangeView={onChangeView} /> : <CompanyAudit />}
    </div>
  );
};

export default BenefitsView;
