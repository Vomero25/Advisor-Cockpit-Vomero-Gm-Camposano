
import React, { useState, useMemo } from 'react';
import { 
  Timer, Calculator, ShieldCheck, ArrowRight, Info, 
  CheckCircle2, AlertTriangle, Scale, History,
  TrendingUp, Landmark, Coins, FileSignature, Zap,
  Search, ShieldAlert, Quote, Lightbulb, Clock
} from 'lucide-react';

const formatCurrency = (val: number) => 
  new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);

const RitaSimulatorView: React.FC = () => {
  // --- STATI INPUT ---
  const [montante, setMontante] = useState<number>(150000);
  const [currentAge, setCurrentAge] = useState<number>(62);
  const [seniorityInFund, setSeniorityInFund] = useState<number>(25);
  const [isUnemployedLongTerm, setIsUnemployedLongTerm] = useState<boolean>(false);
  const [percentageToUse, setPercentageToUse] = useState<number>(100);

  const RETIREMENT_AGE = 67;

  // --- MOTORE DI CALCOLO RITA ---
  const results = useMemo(() => {
    // 1. Verifica Requisiti Temporali
    // Inoccupato > 24 mesi: fino a 10 anni prima (57y)
    // Altri: fino a 5 anni prima (62y)
    const maxAnticipation = isUnemployedLongTerm ? 10 : 5;
    const minAgeForRita = RETIREMENT_AGE - maxAnticipation;
    const isEligibleByAge = currentAge >= minAgeForRita;
    const isEligibleBySeniority = seniorityInFund >= 5;

    // 2. Calcolo Durata Erogazione (mesi)
    const monthsToRetirement = (RETIREMENT_AGE - currentAge) * 12;
    
    // 3. Calcolo Aliquota Fiscale (Art. 11 D.Lgs 252/05)
    // 15% ridotto di 0.3% per ogni anno eccedente il 15esimo. Min 9%.
    const extraYears = Math.max(0, seniorityInFund - 15);
    const taxRate = Math.max(9, 15 - (extraYears * 0.3));

    // 4. Simulazione Rata
    const capitalUsed = montante * (percentageToUse / 100);
    const grossMonthly = monthsToRetirement > 0 ? capitalUsed / monthsToRetirement : 0;
    const netMonthly = grossMonthly * (1 - (taxRate / 100));

    // 5. Risparmio Fiscale vs Riscatto Ordinario o Altri Redditi (assumendo 23% o 43% marginale)
    const taxPaidRita = capitalUsed * (taxRate / 100);
    const taxPaidOrdinary = capitalUsed * 0.23; // Assumendo aliquota minima ordinaria
    const fiscalSaving = taxPaidOrdinary - taxPaidRita;

    return {
      isEligible: isEligibleByAge && isEligibleBySeniority,
      minAgeForRita,
      monthsToRetirement,
      taxRate,
      grossMonthly,
      netMonthly,
      fiscalSaving,
      capitalUsed,
      taxPaidRita
    };
  }, [montante, currentAge, seniorityInFund, isUnemployedLongTerm, percentageToUse]);

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-fade-in pb-24">
      
      {/* 1. HEADER EXECUTIVE */}
      <div className="bg-[#0f172a] rounded-[3rem] p-12 text-white shadow-2xl relative border-b-8 border-indigo-600 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-600/10 to-transparent"></div>
        <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
           <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                 <div className="bg-indigo-600 p-3 rounded-2xl shadow-xl shadow-indigo-600/20 text-white"><Timer size={32} /></div>
                 <span className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-400 italic">Audit Previdenziale - Protocollo R.I.T.A. 2025</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
                Lo Scivolo <br/> <span className="text-indigo-400 text-6xl">Fiscale RITA</span>
              </h1>
              <p className="text-slate-400 text-xl font-medium max-w-2xl leading-relaxed">
                Anticipa l'incasso del tuo fondo fino a 10 anni prima. La **Rendita Integrativa Temporanea Anticipata** è l'unica via per tassare il capitale al **9%**.
              </p>
           </div>
           <div className="lg:col-span-4 bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 text-center relative group">
              <p className="text-[10px] font-black uppercase text-amber-400 mb-2 tracking-widest italic">Aliquota Fiscale Applicata</p>
              <p className="text-7xl font-black text-white tracking-tighter">{results.taxRate.toFixed(1)}%</p>
              <p className="text-[10px] font-black text-emerald-400 uppercase mt-4 tracking-widest italic">Contro il 23-43% ordinario</p>
           </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* 2. SIDEBAR INPUTS */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm space-y-8">
             <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 italic">
                <Calculator size={14} className="text-indigo-600" /> Configura Profilo
             </h4>
             
             <div className="space-y-6">
                <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100">
                   <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">Montante Accumulato (€)</label>
                   <input type="number" value={montante} onChange={(e) => setMontante(Number(e.target.value))} className="w-full bg-transparent font-black text-2xl outline-none text-slate-900" />
                </div>

                <div className="bg-indigo-50 p-5 rounded-3xl border border-indigo-100">
                   <div className="flex justify-between items-center mb-1">
                      <label className="text-[10px] font-black text-indigo-700 uppercase italic">Età Attuale ({currentAge}y)</label>
                   </div>
                   <input type="range" min="55" max="67" value={currentAge} onChange={(e) => setCurrentAge(Number(e.target.value))} className="w-full h-1.5 bg-indigo-200 rounded-lg appearance-none accent-indigo-600" />
                </div>

                <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100">
                   <div className="flex justify-between items-center mb-1">
                      <label className="text-[10px] font-black text-slate-500 uppercase italic">Anzianità Fondo ({seniorityInFund}y)</label>
                   </div>
                   <input type="range" min="5" max="45" value={seniorityInFund} onChange={(e) => setSeniorityInFund(Number(e.target.value))} className="w-full h-1.5 bg-slate-300 rounded-lg appearance-none accent-slate-800" />
                </div>

                <div className="flex items-center justify-between p-4 bg-amber-50 rounded-2xl border border-amber-200">
                   <label className="text-[10px] font-black text-amber-700 uppercase">Inoccupato da {'>'}24 mesi?</label>
                   <button onClick={() => setIsUnemployedLongTerm(!isUnemployedLongTerm)} className={`px-4 py-1.5 rounded-xl text-[10px] font-black transition-all ${isUnemployedLongTerm ? 'bg-amber-500 text-white shadow-lg' : 'bg-white text-amber-500'}`}>
                      {isUnemployedLongTerm ? 'SÌ (MAX 10y)' : 'NO (MAX 5y)'}
                   </button>
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase italic flex justify-between">
                      <span>% Capitale da erogare</span>
                      <span>{percentageToUse}%</span>
                   </label>
                   <input type="range" min="10" max="100" step="10" value={percentageToUse} onChange={(e) => setPercentageToUse(Number(e.target.value))} className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none accent-indigo-600" />
                </div>
             </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group border-b-8 border-amber-500">
             <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform"><Scale size={200} /></div>
             <h4 className="text-amber-400 text-[10px] font-black uppercase mb-4 tracking-widest italic flex items-center gap-2"><Lightbulb size={14}/> Advisor Trick</h4>
             <p className="text-sm text-slate-400 leading-relaxed font-medium italic">
                "Dottore, non riscatti tutto il fondo per liquidità. Chieda la RITA: pagherà solo il 9-15% invece del 23% del riscatto ordinario. Lo Stato finanzia il suo prepensionamento."
             </p>
          </div>
        </div>

        {/* 3. RESULTS AREA */}
        <div className="lg:col-span-8 space-y-8">
           
           {!results.isEligible ? (
              <div className="bg-rose-50 border-2 border-rose-100 p-10 rounded-[3rem] text-center space-y-6">
                 <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <ShieldAlert size={40} className="text-rose-500" />
                 </div>
                 <h3 className="text-2xl font-black text-rose-900 uppercase tracking-tighter">Accesso Non Disponibile</h3>
                 <p className="text-rose-700 font-medium italic">
                    I requisiti di età ({results.minAgeForRita} anni) o anzianità (5 anni) non sono ancora soddisfatti per questo profilo.
                 </p>
              </div>
           ) : (
              <>
                {/* RESULT CARD - MAIN RATA */}
                <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden">
                   <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                      <div>
                         <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic flex items-center gap-3">
                            <Coins className="text-indigo-600" /> Rata Integrativa Mensile
                         </h3>
                         <p className="text-slate-400 text-[10px] font-black mt-2 uppercase tracking-widest">Basata su {results.monthsToRetirement} mesi di anticipo</p>
                      </div>
                      <div className="bg-indigo-600 px-8 py-4 rounded-3xl text-white text-center shadow-xl">
                         <p className="text-[10px] font-black uppercase opacity-70 mb-1">Netto in Tasca</p>
                         <p className="text-5xl font-black italic tracking-tighter">{formatCurrency(results.netMonthly)}</p>
                      </div>
                   </div>

                   <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-slate-100">
                      <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 group hover:border-indigo-500 transition-all">
                         <p className="text-[10px] font-black text-slate-400 uppercase mb-3 tracking-widest">Analisi Prelievo Fiscale</p>
                         <div className="space-y-3">
                            <div className="flex justify-between items-center text-xs">
                               <span className="text-slate-500 font-bold">Rata Lorda:</span>
                               <span className="text-slate-900 font-black">{formatCurrency(results.grossMonthly)}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                               <span className="text-slate-500 font-bold">Imposta ({results.taxRate.toFixed(1)}%):</span>
                               <span className="text-rose-600 font-black">-{formatCurrency(results.grossMonthly - results.netMonthly)}</span>
                            </div>
                         </div>
                      </div>

                      <div className="p-6 bg-emerald-50 rounded-3xl border-2 border-emerald-500 relative group overflow-hidden shadow-lg">
                         <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><Zap size={120} /></div>
                         <p className="text-[10px] font-black text-emerald-600 uppercase mb-3 tracking-widest">Bonus Efficienza Vomero</p>
                         <h4 className="text-2xl font-black text-emerald-800 italic">+{formatCurrency(results.fiscalSaving)}</h4>
                         <p className="text-[9px] text-emerald-600 font-bold uppercase mt-2">Risparmio fiscale netto stimato</p>
                      </div>
                   </div>
                </div>

                {/* TIMELINE VISUAL */}
                <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-10 opacity-5"><Clock size={250} /></div>
                   <h3 className="text-xl font-black uppercase italic tracking-tighter text-amber-400 mb-8">Percorso di Erogazione Anticipata</h3>
                   
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
                      <div className="space-y-2">
                         <p className="text-[9px] font-black text-slate-500 uppercase">Start RITA</p>
                         <p className="text-xl font-black italic">{currentAge} Anni</p>
                      </div>
                      <div className="space-y-2">
                         <p className="text-[9px] font-black text-slate-500 uppercase">Durata</p>
                         <p className="text-xl font-black italic">{RETIREMENT_AGE - currentAge} Anni</p>
                      </div>
                      <div className="space-y-2">
                         <p className="text-[9px] font-black text-slate-500 uppercase">Capitale Dedicato</p>
                         <p className="text-xl font-black italic text-emerald-400">{formatCurrency(results.capitalUsed)}</p>
                      </div>
                      <div className="space-y-2">
                         <p className="text-[9px] font-black text-slate-500 uppercase">Pensione Inps</p>
                         <p className="text-xl font-black italic">{RETIREMENT_AGE} Anni</p>
                      </div>
                   </div>

                   <div className="mt-12 relative h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="absolute top-0 left-0 h-full bg-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.5)] animate-pulse" style={{width: '75%'}}></div>
                   </div>
                </div>
              </>
           )}

           {/* INFO NORMATIVA RITA */}
           <div className="grid md:grid-cols-2 gap-6">
              <div className="p-8 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm space-y-4">
                 <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500" /> Requisiti cumulativi
                 </h4>
                 <ul className="space-y-2 text-[11px] text-slate-500 font-bold italic">
                    <li>• Cessazione attività lavorativa (non serve mobilità).</li>
                    <li>• Almeno 20 anni di contributi nell'Inps.</li>
                    <li>• Almeno 5 anni di iscrizione alla previdenza complementare.</li>
                 </ul>
              </div>
              <div className="p-8 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm space-y-4">
                 <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest flex items-center gap-2">
                    <Scale size={16} className="text-indigo-600" /> Vantaggi Unici
                 </h4>
                 <ul className="space-y-2 text-[11px] text-slate-500 font-bold italic">
                    <li>• Tassazione definitiva al 15%-9% (No conguaglio).</li>
                    <li>• Somme impignorabili (Art. 1923 c.c.).</li>
                    <li>• Reversibilità: se l'aderente decede, il residuo va ai beneficiari.</li>
                 </ul>
              </div>
           </div>
        </div>
      </div>

      {/* FOOTER EXECUTIVO */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
         <div className="flex items-center gap-6">
            <div className="bg-[#0f172a] p-4 rounded-[1.5rem] text-white shadow-lg"><FileSignature size={32} /></div>
            <div>
               <p className="text-lg font-black text-slate-800 uppercase tracking-tighter leading-none mb-1">RITA Efficiency Audit Report</p>
               <p className="text-xs text-slate-500 font-bold italic">Rif: Art. 1, commi 188-191, L. 205/2017 | Circolare AdE 19/2018 | Revisione Gruppo Vomero 2025</p>
            </div>
         </div>
      </div>

    </div>
  );
};

export default RitaSimulatorView;
