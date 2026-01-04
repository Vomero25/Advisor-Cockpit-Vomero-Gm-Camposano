
import React, { useState, useMemo } from 'react';
import { 
  Sparkles, Zap, ArrowRight, CheckCircle2, 
  Users, Factory, Calculator, FileText, TrendingUp, History,
  Info, Landmark, ChevronRight, ClipboardCheck, Scale, 
  Timer, Rocket, ArrowLeftRight, Percent, Lightbulb, 
  ArrowUpRight, Target, ShieldCheck, HeartPulse, AlertTriangle,
  MoveRight, RefreshCw, Layers, ShieldAlert, ReceiptEuro,
  Wallet, UserPlus, Coins, Gavel
} from 'lucide-react';
import { BUDGET_2026_PARAMS } from '../constants';

const formatCurrency = (val: number) => 
  new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);

const Budget2026View: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'PUBLIC' | 'PORTABILITY' | 'PAYOUT' | 'FISCAL'>('PORTABILITY');

  // --- STATI SIMULATORE PORTABILITÀ ---
  const [ral, setRal] = useState(40000);
  const [employerContribPct, setEmployerContribPct] = useState(1.5);
  
  // --- STATI SIMULATORE EXTRA DEDUCIBILITÀ ---
  const [startWorkingYear, setStartWorkingYear] = useState(2020);
  const [totalSeniority, setTotalSeniority] = useState(5);

  // --- CALCOLI FISCALI 2026 ---
  const fiscalResults = useMemo(() => {
    const isNewWorker = startWorkingYear >= 2007;
    const canUseBonus = isNewWorker && totalSeniority > 5;
    const bonusAmount = canUseBonus ? BUDGET_2026_PARAMS.EXTRA_DEDUCTIBILITY_BONUS : 0;
    const totalCap = BUDGET_2026_PARAMS.DEDUCTIBILITY_LIMIT + bonusAmount;
    
    let marginalTax = 23;
    if (ral > 28000) marginalTax = 33;
    if (ral > 50000) marginalTax = 43;

    const maxTaxSaving = totalCap * (marginalTax / 100);

    return { isNewWorker, canUseBonus, totalCap, marginalTax, maxTaxSaving, bonusAmount };
  }, [ral, startWorkingYear, totalSeniority]);

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-fade-in pb-24">
      
      {/* 1. HEADER EXECUTIVE - FOCUS TESTO DEFINITIVO */}
      <div className="bg-[#0f172a] rounded-[3rem] p-12 text-white shadow-2xl relative border-b-8 border-indigo-600 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-600/10 to-transparent"></div>
        <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
           <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                 <div className="bg-indigo-600 p-3 rounded-2xl shadow-xl shadow-indigo-600/20"><FileText size={32} className="text-white"/></div>
                 <span className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-400 italic">Vomero Law Lab - Testo Definitivo G.U. 30/12/2025</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
                La Nuova <br/> <span className="text-indigo-400">Era Previdenziale</span>
              </h1>
              <p className="text-slate-400 text-xl font-medium max-w-2xl leading-relaxed">
                Dalla **Portabilità Totale** del contributo aziendale alla **Rendita a Termine**. Analisi tecnica delle riforme che cambiano il mercato Zurich/Anima.
              </p>
           </div>
           <div className="lg:col-span-4 bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 text-center relative group">
              <p className="text-[10px] font-black uppercase text-amber-400 mb-2 tracking-widest italic">Plafond Fiscale 2026</p>
              <p className="text-6xl font-black text-white tracking-tighter">{formatCurrency(BUDGET_2026_PARAMS.DEDUCTIBILITY_LIMIT)}</p>
              <p className="text-[10px] font-black text-emerald-400 uppercase mt-4 tracking-widest">+ {formatCurrency(BUDGET_2026_PARAMS.EXTRA_DEDUCTIBILITY_BONUS)} Bonus Recupero</p>
           </div>
        </div>
      </div>

      {/* 2. NAVIGATION TOOLKIT */}
      <div className="flex flex-wrap gap-2 bg-slate-100 p-1.5 rounded-2xl w-full md:w-fit mx-auto shadow-inner border border-slate-200">
         <button onClick={() => setActiveTab('PORTABILITY')} className={`px-8 py-3 rounded-xl text-[10px] font-black transition-all flex items-center gap-2 ${activeTab === 'PORTABILITY' ? 'bg-[#233D7B] text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}>
            <ArrowLeftRight size={16} /> Portabilità Contributo
         </button>
         <button onClick={() => setActiveTab('PAYOUT')} className={`px-8 py-3 rounded-xl text-[10px] font-black transition-all flex items-center gap-2 ${activeTab === 'PAYOUT' ? 'bg-[#233D7B] text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}>
            <Coins size={16} /> Nuove Rendite & Tasse
         </button>
         <button onClick={() => setActiveTab('FISCAL')} className={`px-8 py-3 rounded-xl text-[10px] font-black transition-all flex items-center gap-2 ${activeTab === 'FISCAL' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}>
            <Percent size={16} /> Extra Deducibilità
         </button>
         <button onClick={() => setActiveTab('PUBLIC')} className={`px-8 py-3 rounded-xl text-[10px] font-black transition-all flex items-center gap-2 ${activeTab === 'PUBLIC' ? 'bg-[#0f172a] text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}>
            <Landmark size={16} /> Pensioni Pubbliche
         </button>
      </div>

      <div className="min-h-[600px]">
        
        {/* --- TAB: PORTABILITÀ (LA KILLER ARGUMENT 2026) --- */}
        {activeTab === 'PORTABILITY' && (
          <div className="space-y-10 animate-fade-in">
             <div className="grid lg:grid-cols-12 gap-8">
                <div className="lg:col-span-7 bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-10 opacity-5"><RefreshCw size={200} /></div>
                   <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic mb-8 leading-none">Abrogazione Vincoli Trasferimento</h3>
                   <div className="space-y-6 relative z-10">
                      <p className="text-lg text-slate-600 leading-relaxed font-medium italic">
                        "Dottore, dal 2026 cade il muro dei Fondi Negoziali. Se sposta la sua posizione verso **Zurich** o **Anima**, l'azienda è **obbligata** per legge a versare il suo contributo datoriale nel nuovo fondo."
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                         <div className="p-6 bg-slate-900 rounded-3xl text-white">
                            <p className="text-[9px] font-black text-amber-500 uppercase mb-2">Prima del 2026</p>
                            <p className="text-sm font-bold opacity-80 leading-snug">Il contributo aziendale si perdeva se si usciva dal fondo di categoria (Cometa, Fonchim, ecc.).</p>
                            <div className="mt-4 flex items-center gap-2 text-rose-500 font-black text-[10px]">
                               <AlertTriangle size={14} /> VINCOLO D'INERTIA
                            </div>
                         </div>
                         <div className="p-6 bg-indigo-600 rounded-3xl text-white shadow-xl ring-4 ring-indigo-500/20">
                            <p className="text-[9px] font-black text-indigo-200 uppercase mb-2">Con Riforma 2026</p>
                            <p className="text-sm font-bold leading-snug">Portabilità totale del 'diritto a percepire'. L'efficienza gestionale batte l'appartenenza.</p>
                            <div className="mt-4 flex items-center gap-2 text-emerald-400 font-black text-[10px]">
                               <CheckCircle2 size={14} /> LIBERTÀ DI SCELTA
                            </div>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="lg:col-span-5 space-y-6">
                   <div className="bg-emerald-50 p-8 rounded-[2.5rem] border-2 border-emerald-100 shadow-sm">
                      <h4 className="text-[10px] font-black text-emerald-700 uppercase mb-6 tracking-widest flex items-center gap-2"><Calculator size={14}/> Calcola il "Regalo" Aziendale</h4>
                      <div className="space-y-4">
                         <div>
                            <label className="text-[9px] font-black text-slate-400 uppercase">RAL Annua (€)</label>
                            <input type="number" value={ral} onChange={(e) => setRal(Number(e.target.value))} className="w-full bg-transparent text-2xl font-black outline-none border-b border-emerald-200" />
                         </div>
                         <div>
                            <label className="text-[9px] font-black text-slate-400 uppercase">Contrib. Datoriale (%)</label>
                            <input type="range" min="1" max="4" step="0.5" value={employerContribPct} onChange={(e) => setEmployerContribPct(Number(e.target.value))} className="w-full h-1.5 bg-emerald-200 rounded-lg appearance-none accent-emerald-600" />
                         </div>
                         <div className="pt-4 border-t border-emerald-100">
                            <p className="text-[10px] font-black text-emerald-600 uppercase">Valore che porti in Zurich/Anima:</p>
                            <p className="text-4xl font-black text-emerald-700">{formatCurrency(ral * (employerContribPct / 100))}/anno</p>
                         </div>
                      </div>
                   </div>
                   <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white">
                      <div className="flex gap-4 items-start">
                         <Lightbulb size={24} className="text-amber-400 shrink-0" />
                         <p className="text-xs font-medium italic leading-relaxed text-slate-300">
                            "L'azienda non può più opporsi. La nuova norma (Pag. 23 PDF) estende il diritto alla contribuzione datoriale a **qualsiasi forma pensionistica** scelta dall'aderente dopo il trasferimento."
                         </p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* --- TAB: NUOVE RENDITE (PAG 19-21) --- */}
        {activeTab === 'PAYOUT' && (
          <div className="space-y-10 animate-fade-in">
             <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden">
                   <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic mb-8">Nuove Opzioni di Erogazione</h3>
                   <div className="space-y-4">
                      {[
                        { title: "Rendita a Durata Definita", desc: "Non più vitalizia, ma per anni pari alla speranza di vita ISTAT (es. 20 anni).", tag: "NOVITÀ 2026" },
                        { title: "Prelievi Liberamente Determinabili", desc: "Il fondo diventa un 'Bancomat' entro certi limiti di prelievo annuo.", tag: "FLESSIBILITÀ" },
                        { title: "Capitale al 60%", desc: "Innalzato il limite di liquidazione cash dal 50% al 60%.", tag: "LIQUIDITÀ" }
                      ].map((item, i) => (
                        <div key={i} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 group hover:border-indigo-500 transition-all">
                           <div className="flex justify-between items-start mb-2">
                              <h4 className="font-black text-slate-800 uppercase text-xs tracking-widest">{item.title}</h4>
                              <span className="text-[8px] font-black bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full">{item.tag}</span>
                           </div>
                           <p className="text-xs text-slate-500 italic font-bold leading-relaxed">{item.desc}</p>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="bg-[#0a0f1d] p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden border-t-8 border-rose-600">
                   <div className="absolute top-0 right-0 p-8 opacity-5"><Percent size={200} /></div>
                   <h3 className="text-2xl font-black uppercase italic tracking-tighter text-rose-400 mb-6">Attenzione: Nuovo Regime Fiscale</h3>
                   <p className="text-lg text-slate-300 leading-relaxed font-medium italic mb-8">
                      "Le nuove forme di rendita a termine e i prelievi liberi hanno una tassazione diversa dalla rendita vitalizia standard."
                   </p>
                   
                   <div className="grid grid-cols-2 gap-4">
                      <div className="p-6 bg-white/5 border border-white/10 rounded-3xl">
                         <p className="text-[9px] font-black text-slate-400 uppercase mb-2">Vitalizia Standard</p>
                         <p className="text-2xl font-black text-emerald-400">15% → 9%</p>
                         <p className="text-[8px] text-slate-500 mt-1 uppercase">-0,3% / Anno</p>
                      </div>
                      <div className="p-6 bg-white/5 border border-white/10 rounded-3xl ring-2 ring-rose-500/30">
                         <p className="text-[9px] font-black text-rose-400 uppercase mb-2">Nuove Opzioni 2026</p>
                         <p className="text-2xl font-black text-rose-500">20% → 15%</p>
                         <p className="text-[8px] text-slate-500 mt-1 uppercase">-0,25% / Anno</p>
                      </div>
                   </div>
                   <p className="mt-8 text-[10px] text-slate-400 font-bold italic">
                      *Dati estratti da Pag. 21 del documento. La nuova ritenuta del 20% è riducibile di un massimo di 5 punti dopo il 15esimo anno di partecipazione.
                   </p>
                </div>
             </div>
          </div>
        )}

        {/* --- TAB: FISCALITÀ & EXTRA (PAG 14-15) --- */}
        {activeTab === 'FISCAL' && (
          <div className="space-y-10 animate-fade-in">
             <div className="grid lg:grid-cols-12 gap-8">
                <div className="lg:col-span-4 space-y-6">
                   <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 italic">
                         <UserPlus size={14} className="text-indigo-600" /> Profilo Neo-Lavoratore
                      </h4>
                      <div className="space-y-6">
                         <div className="bg-slate-50 p-4 rounded-2xl">
                            <label className="text-[9px] font-black text-slate-400 uppercase mb-1 block">Anno Inizio Lavoro</label>
                            <input type="number" value={startWorkingYear} onChange={(e) => setStartWorkingYear(Number(e.target.value))} className="w-full bg-transparent font-black text-xl outline-none" />
                         </div>
                         <div className="bg-slate-50 p-4 rounded-2xl">
                            <label className="text-[9px] font-black text-slate-400 uppercase mb-1 block">Anni Iscrizione Fondo</label>
                            <input type="number" value={totalSeniority} onChange={(e) => setTotalSeniority(Number(e.target.value))} className="w-full bg-transparent font-black text-xl outline-none" />
                         </div>
                      </div>
                   </div>
                </div>

                <div className="lg:col-span-8 bg-white p-10 rounded-[3rem] border-2 border-indigo-600 shadow-xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-10 opacity-5"><Sparkles size={250} /></div>
                   <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic mb-10 leading-none">Il "Bonus Recupero" 2026</h3>
                   
                   <div className="grid md:grid-cols-2 gap-10 items-center">
                      <div className="space-y-6">
                         <p className="text-sm text-slate-600 leading-relaxed font-medium italic">
                            "Dottore, avendo iniziato dopo il 2007, lei ha una finestra di **20 anni** per recuperare la deducibilità non sfruttata nei primi 5 anni di carriera."
                         </p>
                         <div className="p-6 bg-indigo-50 rounded-[2rem] border border-indigo-100 flex justify-between items-center">
                            <div>
                               <p className="text-[10px] font-black text-indigo-600 uppercase mb-1">Nuovo Tetto Deducibile:</p>
                               <p className="text-4xl font-black text-indigo-900">{formatCurrency(fiscalResults.totalCap)}</p>
                            </div>
                            <div className="text-right">
                               <p className="text-[9px] font-black text-indigo-400 uppercase">Extra Bonus:</p>
                               <p className="text-lg font-black text-emerald-600">+{formatCurrency(fiscalResults.bonusAmount)}</p>
                            </div>
                         </div>
                      </div>

                      <div className="bg-[#0a0f1d] p-8 rounded-[2.5rem] text-white text-center shadow-2xl relative overflow-hidden">
                         <div className="absolute -bottom-10 -right-10 opacity-10"><ReceiptEuro size={150} /></div>
                         <p className="text-[10px] font-black text-amber-500 uppercase mb-4 tracking-widest italic">Cashback IRPEF Annuo Reale</p>
                         <p className="text-6xl font-black text-white tracking-tighter italic">+{formatCurrency(fiscalResults.maxTaxSaving)}</p>
                         <p className="text-[10px] text-slate-400 mt-4 font-bold uppercase tracking-widest">Su Aliquota Marginale {fiscalResults.marginalTax}%</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* --- TAB 4: PUBBLICO (PAG 3-7) --- */}
        {activeTab === 'PUBLIC' && (
          <div className="space-y-10 animate-fade-in">
             <div className="grid lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden">
                   <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic mb-10 flex items-center gap-4 leading-none">
                      <History className="text-rose-600" /> Aumento Graduale Requisiti (Speranza di Vita)
                   </h3>
                   <div className="space-y-6">
                      {[
                        { year: '2026', desc: 'Invariati (67 anni e 20 di contributi)', status: 'SAFE', color: 'bg-emerald-50 text-emerald-700' },
                        { year: '2027', desc: 'Aumento limitato a +1 mese (67y 1m)', status: 'ADJUSTMENT', color: 'bg-amber-50 text-amber-700' },
                        { year: '2028', desc: 'A regime aumento complessivo di +3 mesi (67y 3m)', status: 'FULL_IMPACT', color: 'bg-rose-50 text-rose-700' },
                      ].map((p, i) => (
                        <div key={i} className={`p-6 rounded-3xl border-2 border-transparent ${p.color} flex justify-between items-center group hover:scale-[1.01] transition-all`}>
                           <div>
                              <p className="text-2xl font-black italic">{p.year}</p>
                              <p className="text-sm font-bold opacity-80">{p.desc}</p>
                           </div>
                           <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      ))}
                   </div>
                </div>

                <div className="lg:col-span-4 space-y-6">
                   <div className="bg-rose-600 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden border-b-8 border-rose-800">
                      <h4 className="text-xl font-black uppercase tracking-tighter mb-4 italic leading-tight">Addio Sperimentali</h4>
                      <p className="text-sm text-rose-100 leading-relaxed font-medium italic mb-4">
                         "A partire dal 2026 non saranno più disponibili **Opzione Donna** e **Quota 103**."
                      </p>
                      <div className="p-3 bg-white/10 rounded-xl border border-white/10 flex items-center gap-2">
                         <AlertTriangle size={14} className="text-amber-300" />
                         <span className="text-[9px] font-black uppercase">Fine dei benefici flessibili</span>
                      </div>
                   </div>
                   <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-xl relative border-b-8 border-amber-500">
                      <h4 className="text-xl font-black uppercase tracking-tighter mb-4 italic leading-tight">Bonus Sociale</h4>
                      <p className="text-sm text-slate-400 leading-relaxed font-medium italic mb-4">
                         Incremento strutturale delle maggiorazioni sociali per redditi bassi: **+260€ annui**.
                      </p>
                      <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest">Strutturale dal 01/01/2026</span>
                   </div>
                </div>
             </div>
          </div>
        )}

      </div>

      {/* FOOTER METODOLOGICO */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
         <div className="flex items-center gap-6">
            <div className="bg-[#0f172a] p-4 rounded-[1.5rem] text-white shadow-lg"><Gavel size={32} /></div>
            <div>
               <p className="text-lg font-black text-slate-800 uppercase tracking-tighter leading-none mb-1">Rapporto Legislativo 2026 - Gruppo Vomero Intelligence</p>
               <p className="text-xs text-slate-500 font-bold italic">Rif: Testo Definitivo L. Bilancio 2026 | Art. 14 Portabilità | Art. 21 Tassazione | Agg. 03/2025</p>
            </div>
         </div>
         <div className="text-right">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">DOCUMENTO AD USO INTERNO RISERVATO - PRIVATE SUITE</p>
         </div>
      </div>

    </div>
  );
};

export default Budget2026View;
