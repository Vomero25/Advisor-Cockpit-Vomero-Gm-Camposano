
import React, { useState, useMemo } from 'react';
import { 
  Sparkle, Calculator, Info, CheckCircle2, ArrowRight, 
  TrendingUp, Scale, Zap, Landmark, FileSignature, 
  AlertTriangle, Receipt, Quote, BookOpen, UserCheck, 
  HelpCircle, ShieldCheck, User, Users, Gem, Clock,
  Calendar, ArrowDownToLine, MousePointer2, Percent,
  Table as TableIcon, FileSearch, ShieldPlus, ChevronRight,
  Microscope, Siren, UserPlus
} from 'lucide-react';

const formatCurrency = (val: number) => 
  new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 2 }).format(val);

const ExtraDeductibilityView: React.FC = () => {
  // --- STATI DI INPUT ---
  const [totalAnnualIncome, setTotalAnnualIncome] = useState<number>(60000);
  const [actuallyPaidFirst5Years, setActuallyPaidFirst5Years] = useState<number>(5000); // Totale reale versato nei primi 5 anni
  const [startWorkingYear, setStartWorkingYear] = useState<number>(2018);
  const [targetYearsToRecover, setTargetYearsToRecover] = useState<number>(8); // Sofia mode default

  // --- COSTANTI NORMATIVE D.LGS. 252/05 ---
  const STANDARD_LIMIT = 5164.57;
  const THEORETICAL_MAX_5Y = 25822.85; // 5164.57 * 5
  const MAX_EXTRA_ANNUAL = 2582.29;

  // --- MOTORE ANALITICO ---
  const audit = useMemo(() => {
    // 1. Calcolo Plafond Inutilizzato (Punto 2 della guida tecnica)
    const unusedPlafond = Math.max(0, THEORETICAL_MAX_5Y - actuallyPaidFirst5Years);
    
    // 2. Capacità di recupero (Punto 3 della guida tecnica)
    const idealAnnualRecovery = unusedPlafond / targetYearsToRecover;
    const effectiveExtraAnnual = Math.min(idealAnnualRecovery, MAX_EXTRA_ANNUAL);
    
    // 3. Aliquota Fiscale (Simulazione 2025/26)
    let marginalRate = 0.23;
    if (totalAnnualIncome > 50000) marginalRate = 0.43;
    else if (totalAnnualIncome > 28000) marginalRate = 0.33;

    // 4. Benefici
    const totalAnnualDeductible = STANDARD_LIMIT + effectiveExtraAnnual;
    const extraTaxSaving = effectiveExtraAnnual * marginalRate;
    const totalTaxSaving = totalAnnualDeductible * marginalRate;
    
    // Proiezione totale 8 anni (Modello Sofia)
    const totalBenefit8Years = totalTaxSaving * 8;

    // 5. Timeline
    const qualificationEndYear = startWorkingYear + 5;
    const recoveryEndYear = qualificationEndYear + 20;

    return {
      unusedPlafond,
      effectiveExtraAnnual,
      marginalRate,
      totalAnnualDeductible,
      extraTaxSaving,
      totalTaxSaving,
      totalBenefit8Years,
      qualificationEndYear,
      recoveryEndYear,
      isEligible: startWorkingYear >= 2007
    };
  }, [totalAnnualIncome, actuallyPaidFirst5Years, startWorkingYear, targetYearsToRecover]);

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-fade-in pb-24">
      
      {/* HERO SECTION - POSIZIONAMENTO TECNICO BASATO SU COVIP 2024 */}
      <div className="bg-[#0a0f1d] rounded-[3.5rem] p-12 text-white shadow-2xl relative border-b-8 border-indigo-600 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-600/10 to-transparent"></div>
        <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
           <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                 <div className="bg-indigo-600 p-3 rounded-2xl shadow-xl"><Sparkle size={32} className="text-white"/></div>
                 <span className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-400 italic">Vomero Tax Unit - Dati COVIP 2024 Integrati</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
                Recupero <br/> <span className="text-indigo-400">Plafond Fiscale</span>
              </h1>
              <p className="text-slate-400 text-xl font-medium max-w-2xl leading-relaxed">
                Il report COVIP evidenzia che il **91%** dei lavoratori non satura la deducibilità. Sfrutta l'Art. 8 c. 6 per innalzare il tuo limite a <strong>{formatCurrency(7746.86)}</strong>.
              </p>
           </div>
           <div className="lg:col-span-4 bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 text-center relative group">
              <p className="text-[10px] font-black uppercase text-amber-400 mb-2 tracking-widest italic">Plafond Annuo Potenziale</p>
              <p className="text-6xl font-black text-white tracking-tighter">7.746€</p>
              <p className="text-[10px] font-black text-emerald-400 uppercase mt-4 tracking-widest italic leading-tight">Limite Ordinario + <br/> Bonus Neo-Occupato</p>
           </div>
        </div>
      </div>

      {!audit.isEligible && (
         <div className="bg-rose-50 border-2 border-rose-200 p-8 rounded-[2.5rem] flex items-center gap-6 animate-pulse">
            <div className="bg-rose-600 p-4 rounded-2xl text-white shadow-lg"><Siren size={32} /></div>
            <div>
               <h4 className="text-xl font-black text-rose-900 uppercase">Requisito "Neo-Occupato"</h4>
               <p className="text-rose-700 font-medium">L'extra-deducibilità si applica ai lavoratori la cui prima occupazione è successiva al 1° Gennaio 2007 (Rif. COVIP Pag. 1).</p>
            </div>
         </div>
      )}

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* INPUT PANEL: IL CALCOLO DEL DIRITTO */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm space-y-8">
             <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 italic">
                <Calculator size={14} className="text-indigo-600" /> Audit Storico Versamenti
             </h4>
             
             <div className="space-y-6">
                <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100">
                   <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">Anno Prima Occupazione</label>
                   <input type="number" value={startWorkingYear} onChange={(e) => setStartWorkingYear(Number(e.target.value))} className="w-full bg-transparent font-black text-2xl outline-none text-slate-900" />
                </div>

                <div className="bg-indigo-50 p-5 rounded-3xl border border-indigo-100">
                   <label className="text-[10px] font-black text-indigo-700 uppercase block mb-1">Versato Totale Primi 5 Anni (€)</label>
                   <input type="number" value={actuallyPaidFirst5Years} onChange={(e) => setActuallyPaidFirst5Years(Number(e.target.value))} className="w-full bg-transparent font-black text-2xl outline-none text-indigo-900" />
                   <p className="text-[9px] text-indigo-400 mt-1 font-bold italic uppercase">COVIP Indica: Media versata {formatCurrency(2800)}</p>
                </div>

                <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100">
                   <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">Reddito Lordo Attuale (€)</label>
                   <input type="number" value={totalAnnualIncome} onChange={(e) => setTotalAnnualIncome(Number(e.target.value))} className="w-full bg-transparent font-black text-2xl outline-none text-slate-900" />
                </div>

                <div className="bg-amber-50 p-5 rounded-3xl border border-amber-100">
                   <label className="text-[10px] font-black text-amber-700 uppercase block mb-1">Pianificazione Recupero (Anni)</label>
                   <div className="flex items-center gap-4">
                      <input type="range" min="1" max="20" value={targetYearsToRecover} onChange={(e) => setTargetYearsToRecover(Number(e.target.value))} className="flex-1 h-1.5 bg-amber-200 rounded-lg appearance-none accent-amber-600" />
                      <span className="font-black text-amber-900 text-lg w-12">{targetYearsToRecover}y</span>
                   </div>
                   <p className="text-[9px] text-amber-600 font-bold uppercase mt-2 italic">Max extra annuo: {formatCurrency(MAX_EXTRA_ANNUAL)}</p>
                </div>
             </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group border-b-8 border-amber-500">
             <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform"><Clock size={200} /></div>
             <h4 className="text-amber-400 text-[10px] font-black uppercase mb-4 tracking-widest italic flex items-center gap-2"><Clock size={14}/> Finestra Temporale</h4>
             <div className="space-y-4 relative z-10">
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                   <span className="text-[10px] text-slate-400 font-bold uppercase">Fine Maturazione Plafond:</span>
                   <span className="font-black text-white">{audit.qualificationEndYear}</span>
                </div>
                <div className="flex justify-between items-center">
                   <span className="text-[10px] text-slate-400 font-bold uppercase">Ultimo Anno Recupero:</span>
                   <span className="font-black text-amber-500">{audit.recoveryEndYear}</span>
                </div>
             </div>
          </div>
        </div>

        {/* ANALISI RISULTATI ANALITICI */}
        <div className="lg:col-span-8 space-y-8">
           
           {/* BREAKDOWN MATEMATICO DEL PLAFOND */}
           <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden">
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic mb-10 flex items-center gap-3">
                 <Microscope className="text-indigo-600" /> Audit del Plafond Residuo
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6 mb-10">
                 <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <p className="text-[9px] font-black text-slate-400 uppercase mb-2">Plafond Teorico 5y</p>
                    <p className="text-xl font-black text-slate-900">{formatCurrency(THEORETICAL_MAX_5Y)}</p>
                 </div>
                 <div className="p-6 bg-rose-50 rounded-3xl border border-rose-100">
                    <p className="text-[9px] font-black text-rose-400 uppercase mb-2">Versato Effettivo</p>
                    <p className="text-xl font-black text-rose-600">-{formatCurrency(actuallyPaidFirst5Years)}</p>
                 </div>
                 <div className="p-6 bg-emerald-50 rounded-3xl border-2 border-emerald-500 relative">
                    <Zap className="absolute top-2 right-2 text-emerald-500 animate-pulse" size={16} />
                    <p className="text-[9px] font-black text-emerald-600 uppercase mb-2">Credito Fiscale</p>
                    <p className="text-xl font-black text-emerald-700">{formatCurrency(audit.unusedPlafond)}</p>
                 </div>
              </div>

              <div className="p-10 bg-[#0a0f1d] rounded-[3.5rem] text-white flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-8 opacity-5"><Receipt size={200} /></div>
                 <div>
                    <p className="text-[10px] font-black text-amber-500 uppercase mb-1">Ritorno IRPEF Annuo Stimato</p>
                    <h4 className="text-5xl font-black italic text-white tracking-tighter">{formatCurrency(audit.totalTaxSaving)}</h4>
                    {/* Fix: Property 'marginal_rate' does not exist on type audit object. Changed to 'marginalRate'. */}
                    <p className="text-[9px] text-slate-400 mt-2 font-bold uppercase italic">Con Aliquota Marginale {Math.round(audit.marginalRate * 100)}%</p>
                 </div>
                 <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white text-center shadow-2xl rotate-2 border border-indigo-400 shrink-0">
                    <p className="text-[10px] font-black uppercase mb-1">Capitale Extra Annuo</p>
                    <p className="text-3xl font-black">+{formatCurrency(audit.effectiveExtraAnnual)}</p>
                    <p className="text-[8px] font-bold opacity-70">Oltre i 5.164€ ordinari</p>
                 </div>
              </div>
           </div>

           {/* CASE HISTORIES DAL DOCUMENTO INTEGRATE CON DATI COVIP */}
           <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:border-indigo-600 transition-all">
                 <div className="bg-indigo-600 p-6 text-white flex justify-between items-center">
                    <div>
                       <h4 className="font-black italic uppercase tracking-tighter text-xl">Sofia, 40 anni</h4>
                       <p className="text-[10px] font-bold opacity-80 uppercase">Recupero Accelerato (8y)</p>
                    </div>
                    <User size={24} />
                 </div>
                 <div className="p-6 space-y-4">
                    <p className="text-xs text-slate-600 font-medium leading-relaxed italic">
                       "Sofia ha versato poco nei primi 5 anni. Oggi con un reddito di 60k sblocca il plafond extra annuo (2.582€) per massimizzare il risparmio fiscale."
                    </p>
                    <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                       <span className="text-[10px] font-black text-slate-400 uppercase">Risparmio Totale 8y:</span>
                       <span className="text-lg font-black text-emerald-600">~ 26.650 €</span>
                    </div>
                 </div>
              </div>

              <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:border-amber-600 transition-all">
                 <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
                    <div>
                       <h4 className="font-black italic uppercase tracking-tighter text-xl">Andrea, 35 anni</h4>
                       <p className="text-[10px] font-bold opacity-80 uppercase">Recupero Distribuito (20y)</p>
                    </div>
                    <User size={24} />
                 </div>
                 <div className="p-6 space-y-4">
                    <p className="text-xs text-slate-600 font-medium leading-relaxed italic">
                       "Andrea spalma il recupero su tutti i 20 anni disponibili, versando circa 1.040€ extra l'anno per bilanciare flussi e tasse."
                    </p>
                    <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                       <span className="text-[10px] font-black text-slate-400 uppercase">Risparmio IRPEF Annuo:</span>
                       <span className="text-lg font-black text-indigo-600">~ 2.668 €</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* FOCUS DICHIARAZIONE DEI REDDITI - RIGO E28 (ANALISI DOCUMENTALE) */}
      <div className="bg-white rounded-[3rem] p-10 border border-slate-200 shadow-xl overflow-hidden relative group">
         <div className="absolute top-0 right-0 p-10 opacity-[0.02] group-hover:scale-110 transition-transform"><FileSearch size={300} /></div>
         <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic mb-10 flex items-center gap-3 leading-none relative z-10">
            <FileSignature className="text-indigo-600" /> Focus Dichiarazione: Rigo E28 vs E27
         </h3>
         
         <div className="grid lg:grid-cols-12 gap-12 relative z-10">
            <div className="lg:col-span-7 space-y-8">
               <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white shadow-2xl border-l-8 border-amber-500">
                  <h4 className="text-amber-500 font-black text-xs uppercase mb-4 tracking-widest flex items-center gap-2">
                     <AlertTriangle size={16} /> Attenzione ai flussi automatici
                  </h4>
                  <p className="text-sm font-medium leading-relaxed italic mb-6">
                     "Il report COVIP suggerisce di monitorare la corretta attribuzione fiscale. Se l'azienda inserisce tutto nel **Rigo E27**, perdi il beneficio del recupero neo-occupato."
                  </p>
                  <div className="bg-white/10 p-6 rounded-2xl border border-white/20">
                     <p className="text-[10px] font-black text-amber-500 uppercase mb-2 italic">Il consiglio del consulente:</p>
                     <p className="text-xs font-bold leading-relaxed">
                        Sposta manualmente gli importi eccedenti i 5.164€ nel **Quadro E - Sezione II - Rigo E28** del Modello 730.
                     </p>
                  </div>
               </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-center">
               <div className="bg-indigo-50 p-8 rounded-[2.5rem] border border-indigo-100 h-full flex flex-col justify-center text-center">
                  <h4 className="text-sm font-black text-indigo-900 uppercase mb-6 flex items-center gap-2 italic justify-center">
                     <TableIcon size={18} /> Mappatura 730
                  </h4>
                  <div className="space-y-4">
                     <div className="p-4 bg-white rounded-xl shadow-sm border border-indigo-100">
                        <p className="text-[10px] font-black text-slate-400 uppercase">Rigo E27</p>
                        <p className="text-xs font-bold text-slate-700 italic">Deducibilità Ordinaria (Max 5.164€)</p>
                     </div>
                     <div className="p-4 bg-[#0a0f1d] rounded-xl shadow-lg border border-indigo-500">
                        <p className="text-[10px] font-black text-amber-500 uppercase">Rigo E28</p>
                        <p className="text-xs font-bold text-white italic">Extra-Soglia Neo-Occupati (Recupero)</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* FOOTER DI CHIUSURA */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
         <div className="flex items-center gap-6">
            <div className="bg-[#0a0f1d] p-4 rounded-[1.5rem] text-white shadow-lg"><FileSignature size={32} /></div>
            <div>
               <p className="text-lg font-black text-slate-800 uppercase tracking-tighter leading-none mb-1">Extra-Deductibility Intelligence Certification</p>
               <p className="text-xs text-slate-500 font-bold italic">Rif: Relazione COVIP 2024 | D.Lgs. 252/05 Art. 8 | Guida AdE 2025 | Revisione Gruppo Vomero</p>
            </div>
         </div>
      </div>

    </div>
  );
};

export default ExtraDeductibilityView;
