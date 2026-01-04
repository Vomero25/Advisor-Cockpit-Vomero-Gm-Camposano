
import React, { useState, useMemo } from 'react';
import { 
  Sparkle, Calculator, Info, CheckCircle2, ArrowRight, 
  TrendingUp, Scale, Zap, Landmark, FileSignature, 
  AlertTriangle, Receipt, Quote, BookOpen, UserCheck, 
  HelpCircle, ShieldCheck, User, Users, Gem, Clock,
  Calendar, ArrowDownToLine, MousePointer2, Percent,
  Table as TableIcon, FileSearch, ShieldPlus, ChevronRight,
  // Fix: Add missing Microscope icon
  Microscope
} from 'lucide-react';

const formatCurrency = (val: number) => 
  new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 2 }).format(val);

const ExtraDeductibilityView: React.FC = () => {
  // --- STATI DI INPUT ---
  const [totalAnnualIncome, setTotalAnnualIncome] = useState<number>(60000);
  const [actuallyPaidFirst5Years, setActuallyPaidFirst5Years] = useState<number>(5000); // Totale versato nei primi 5 anni
  const [recoverySpeed, setRecoverySpeed] = useState<number>(2582.29); // Quota annua extra desiderata
  const [startWorkingYear, setStartWorkingYear] = useState<number>(2018);

  // --- COSTANTI NORMATIVE D.LGS. 252/05 ---
  const STANDARD_LIMIT = 5164.57;
  const THEORETICAL_MAX_5Y = 25822.85; // 5164.57 * 5
  const MAX_EXTRA_ANNUAL = 2582.29;

  // --- MOTORE ANALITICO ---
  const audit = useMemo(() => {
    // 1. Calcolo Plafond Inutilizzato
    const unusedPlafond = Math.max(0, THEORETICAL_MAX_5Y - actuallyPaidFirst5Years);
    
    // 2. Capacità di recupero
    const effectiveExtraAnnual = Math.min(recoverySpeed, MAX_EXTRA_ANNUAL, unusedPlafond);
    const yearsNeeded = effectiveExtraAnnual > 0 ? unusedPlafond / effectiveExtraAnnual : 0;
    
    // 3. Aliquota Fiscale (Simulazione 2025/26)
    let marginalRate = 0.23;
    if (totalAnnualIncome > 50000) marginalRate = 0.43;
    else if (totalAnnualIncome > 28000) marginalRate = 0.33;

    // 4. Benefici
    const totalAnnualDeductible = STANDARD_LIMIT + effectiveExtraAnnual;
    const standardTaxSaving = STANDARD_LIMIT * marginalRate;
    const extraTaxSaving = effectiveExtraAnnual * marginalRate;
    const totalTaxSaving = totalAnnualDeductible * marginalRate;

    // 5. Timeline
    const qualificationEndYear = startWorkingYear + 5;
    const recoveryEndYear = qualificationEndYear + 20;

    return {
      unusedPlafond,
      effectiveExtraAnnual,
      yearsNeeded,
      marginalRate,
      totalAnnualDeductible,
      standardTaxSaving,
      extraTaxSaving,
      totalTaxSaving,
      qualificationEndYear,
      recoveryEndYear
    };
  }, [totalAnnualIncome, actuallyPaidFirst5Years, recoverySpeed, startWorkingYear]);

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-fade-in pb-24">
      
      {/* HERO SECTION - POSIZIONAMENTO TECNICO */}
      <div className="bg-[#0a0f1d] rounded-[3.5rem] p-12 text-white shadow-2xl relative border-b-8 border-indigo-600 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-600/10 to-transparent"></div>
        <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
           <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                 <div className="bg-indigo-600 p-3 rounded-2xl shadow-xl"><Sparkle size={32} className="text-white"/></div>
                 <span className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-400 italic">Vomero Tax Strategy - Art. 8 c. 6 D.Lgs. 252/05</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
                L'Extra <br/> <span className="text-indigo-400">Deducibilità</span>
              </h1>
              <p className="text-slate-400 text-xl font-medium max-w-2xl leading-relaxed">
                Analisi del "Bonus Neo-Occupato": recupera il plafond fiscale non utilizzato nei primi 5 anni di carriera e innalza il limite a <strong>{formatCurrency(7746.86)}</strong>.
              </p>
           </div>
           <div className="lg:col-span-4 bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 text-center relative group">
              <p className="text-[10px] font-black uppercase text-amber-400 mb-2 tracking-widest italic">Plafond Annuo Potenziale</p>
              <p className="text-6xl font-black text-white tracking-tighter">7.746€</p>
              <p className="text-[10px] font-black text-emerald-400 uppercase mt-4 tracking-widest italic leading-tight">5.164€ Ordinari + <br/> 2.582€ di Recupero</p>
           </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* INPUT PANEL: IL CALCOLO DEL DIRITTO */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm space-y-8">
             <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 italic">
                <Calculator size={14} className="text-indigo-600" /> Configurazione Diritto
             </h4>
             
             <div className="space-y-6">
                <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100">
                   <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">Anno Prima Occupazione</label>
                   <input type="number" value={startWorkingYear} onChange={(e) => setStartWorkingYear(Number(e.target.value))} className="w-full bg-transparent font-black text-2xl outline-none text-slate-900" />
                   <p className="text-[9px] text-slate-400 mt-2 font-bold italic">Deve essere successivo al 01/01/2007.</p>
                </div>

                <div className="bg-indigo-50 p-5 rounded-3xl border border-indigo-100">
                   <label className="text-[10px] font-black text-indigo-700 uppercase block mb-1">Totale Versato Primi 5 Anni (€)</label>
                   <input type="number" value={actuallyPaidFirst5Years} onChange={(e) => setActuallyPaidFirst5Years(Number(e.target.value))} className="w-full bg-transparent font-black text-2xl outline-none text-indigo-900" />
                   <p className="text-[9px] text-indigo-400 mt-1 font-bold italic uppercase">Include TFR e contributi datoriali.</p>
                </div>

                <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100">
                   <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">Reddito Lordo Attuale (€)</label>
                   <input type="number" value={totalAnnualIncome} onChange={(e) => setTotalAnnualIncome(Number(e.target.value))} className="w-full bg-transparent font-black text-2xl outline-none text-slate-900" />
                </div>
             </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group border-b-8 border-amber-500">
             <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform"><Clock size={200} /></div>
             <h4 className="text-amber-400 text-[10px] font-black uppercase mb-4 tracking-widest italic flex items-center gap-2"><Clock size={14}/> Finestra Temporale</h4>
             <div className="space-y-4 relative z-10">
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                   <span className="text-[10px] text-slate-400 font-bold uppercase">Fine Maturazione:</span>
                   <span className="font-black text-white">{audit.qualificationEndYear}</span>
                </div>
                <div className="flex justify-between items-center">
                   <span className="text-[10px] text-slate-400 font-bold uppercase">Termine Recupero:</span>
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
                 <Microscope className="text-indigo-600" /> Audit del Plafond Inutilizzato
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6 mb-10">
                 <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <p className="text-[9px] font-black text-slate-400 uppercase mb-2">Target 5 Anni</p>
                    <p className="text-xl font-black text-slate-900">{formatCurrency(THEORETICAL_MAX_5Y)}</p>
                 </div>
                 <div className="p-6 bg-rose-50 rounded-3xl border border-rose-100">
                    <p className="text-[9px] font-black text-rose-400 uppercase mb-2">Versato Reale</p>
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
                    <p className="text-[10px] font-black text-amber-500 uppercase mb-1">Risparmio IRPEF Annuo Stimato</p>
                    <h4 className="text-5xl font-black italic text-white tracking-tighter">{formatCurrency(audit.totalTaxSaving)}</h4>
                    <p className="text-[9px] text-slate-400 mt-2 font-bold uppercase italic">Con Aliquota Marginale {Math.round(audit.marginalRate * 100)}%</p>
                 </div>
                 <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white text-center shadow-2xl rotate-2 border border-indigo-400 shrink-0">
                    <p className="text-[10px] font-black uppercase mb-1">Piano di Recupero</p>
                    <p className="text-3xl font-black">{Math.ceil(audit.yearsNeeded)} Anni</p>
                    <p className="text-[8px] font-bold opacity-70">a versamento max</p>
                 </div>
              </div>
           </div>

           {/* CASE HISTORIES DAL DOCUMENTO (INTERATTIVE) */}
           <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:border-indigo-600 transition-all">
                 <div className="bg-indigo-600 p-6 text-white flex justify-between items-center">
                    <div>
                       <h4 className="font-black italic uppercase tracking-tighter text-xl">Il Caso Sofia</h4>
                       <p className="text-[10px] font-bold opacity-80 uppercase">Recupero Accelerato</p>
                    </div>
                    <User size={24} />
                 </div>
                 <div className="p-6 space-y-4">
                    <p className="text-xs text-slate-600 font-medium leading-relaxed italic">
                       "Sofia, commercialista, ha versato solo 1.000€/anno nei primi 5 anni. Oggi con un reddito di 60k decide di sfruttare tutto il plafond extra."
                    </p>
                    <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                       <span className="text-[10px] font-black text-slate-400 uppercase">Saving Totale 8y:</span>
                       <span className="text-lg font-black text-emerald-600">~ 26.650 €</span>
                    </div>
                 </div>
              </div>

              <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:border-amber-600 transition-all">
                 <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
                    <div>
                       <h4 className="font-black italic uppercase tracking-tighter text-xl">Il Caso Andrea</h4>
                       <p className="text-[10px] font-bold opacity-80 uppercase">Recupero Distribuito</p>
                    </div>
                    <User size={24} />
                 </div>
                 <div className="p-6 space-y-4">
                    <p className="text-xs text-slate-600 font-medium leading-relaxed italic">
                       "Andrea, programmatore, preferisce spalmare il recupero su tutti i 20 anni disponibili per non pesare troppo sulla liquidità mensile."
                    </p>
                    <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                       <span className="text-[10px] font-black text-slate-400 uppercase">Saving Annuo:</span>
                       <span className="text-lg font-black text-indigo-600">~ 2.668 €</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* FOCUS DICHIARAZIONE DEI REDDITI - ANALISI TECNICA 730 */}
      <div className="bg-white rounded-[3rem] p-10 border border-slate-200 shadow-xl overflow-hidden relative group">
         <div className="absolute top-0 right-0 p-10 opacity-[0.02] group-hover:scale-110 transition-transform"><FileSearch size={300} /></div>
         <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic mb-10 flex items-center gap-3 leading-none relative z-10">
            <FileSignature className="text-indigo-600" /> Focus Dichiarazione: Rigo E28
         </h3>
         
         <div className="grid lg:grid-cols-12 gap-12 relative z-10">
            <div className="lg:col-span-7 space-y-8">
               <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white shadow-2xl">
                  <h4 className="text-amber-500 font-black text-xs uppercase mb-4 tracking-widest flex items-center gap-2">
                     <AlertTriangle size={16} /> Attenzione ai Flussi Aziendali
                  </h4>
                  <p className="text-sm font-medium leading-relaxed italic mb-6">
                     "Dottore, spesso i versamenti extra vengono inseriti automaticamente nel <strong>Rigo E27</strong> (deducibilità ordinaria). Questo le impedisce di sfruttare il bonus neo-occupato."
                  </p>
                  <div className="bg-white/10 p-6 rounded-2xl border border-white/20">
                     <p className="text-[10px] font-black text-amber-500 uppercase mb-2 italic">Il consiglio del consulente:</p>
                     <p className="text-xs font-bold leading-relaxed">
                        Per non perdere il beneficio è fondamentale **spostare manualmente** gli importi eccedenti i 5.164,57€ nel <strong>Quadro E - Rigo E28</strong>.
                     </p>
                  </div>
               </div>
            </div>

            <div className="lg:col-span-5">
               <div className="bg-indigo-50 p-8 rounded-[2.5rem] border border-indigo-100 h-full flex flex-col justify-center">
                  <h4 className="text-sm font-black text-indigo-900 uppercase mb-6 flex items-center gap-2 italic">
                     <TableIcon size={18} /> Mappatura 730
                  </h4>
                  <div className="space-y-4">
                     <div className="p-4 bg-white rounded-xl shadow-sm border border-indigo-100">
                        <p className="text-[10px] font-black text-slate-400 uppercase">Rigo E27</p>
                        <p className="text-xs font-bold text-slate-700 italic">Deducibilità Ordinaria (Max 5.164,57€)</p>
                     </div>
                     <div className="p-4 bg-[#0a0f1d] rounded-xl shadow-lg border border-indigo-500">
                        <p className="text-[10px] font-black text-amber-500 uppercase">Rigo E28</p>
                        <p className="text-xs font-bold text-white italic">Contributi Lavoratori Prima Occupazione</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* SALES HOOKS & ADVISOR ACTION */}
      <div className="grid md:grid-cols-3 gap-8">
         <div className="bg-indigo-900 p-8 rounded-[2.5rem] text-white flex flex-col justify-between group overflow-hidden relative">
            <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:rotate-12 transition-transform"><Quote size={150} /></div>
            <h4 className="text-amber-400 font-black uppercase text-xs mb-4 flex items-center gap-2"><Zap size={14}/> The Sales Hook</h4>
            <p className="text-xl font-medium italic leading-relaxed relative z-10 tracking-tight">
               "Sapevi che lo Stato ti deve ancora dei bonus sulla pensione che non hai chiesto? Hai iniziato dopo il 2007: hai un credito fiscale dormiente."
            </p>
         </div>
         <div className="md:col-span-2 bg-white p-10 rounded-[3rem] border border-slate-200 flex items-center gap-8 shadow-sm">
            <div className="bg-emerald-50 p-8 rounded-full text-emerald-600 shadow-inner"><ShieldPlus size={40} /></div>
            <div className="space-y-3">
               <h4 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">Pianificazione Certificata</h4>
               <p className="text-sm text-slate-500 font-medium leading-relaxed">
                  L'extra deducibilità non è un automatismo. Richiede una **ricostruzione storica** dei versamenti e una pianificazione consapevole per massimizzare il risparmio IRPEF in base alla progressione di carriera del cliente.
               </p>
               <div className="flex gap-3">
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-full uppercase italic border border-indigo-100">D.Lgs. 252/05</span>
                  <span className="px-3 py-1 bg-amber-50 text-amber-700 text-[10px] font-black rounded-full uppercase italic border border-amber-100">Certificazione Vomero 2025</span>
               </div>
            </div>
         </div>
      </div>

      {/* FOOTER DI CHIUSURA */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
         <div className="flex items-center gap-6">
            <div className="bg-[#0a0f1d] p-4 rounded-[1.5rem] text-white shadow-lg"><FileSignature size={32} /></div>
            <div>
               <p className="text-lg font-black text-slate-800 uppercase tracking-tighter leading-none mb-1">Fiscal Extra-Deductibility Certification</p>
               <p className="text-xs text-slate-500 font-bold italic">Rif: Art. 8 comma 6 D.Lgs. 252/05 | Guida alla Dichiarazione dei Redditi | Revisione Gruppo Vomero 2025</p>
            </div>
         </div>
      </div>

    </div>
  );
};

export default ExtraDeductibilityView;
