
import React from 'react';
import { 
  Binary, Scale, TrendingUp, History, Info, Gavel, 
  Landmark, ShieldCheck, Microscope, Zap, PieChart, 
  Calculator, Coins, Percent, FileSignature, BookOpen,
  ArrowRight, CheckCircle2, AlertTriangle, Activity
} from 'lucide-react';

const MethodologyView: React.FC = () => {
  const sections = [
    {
      title: "Architettura Fiscale",
      icon: Scale,
      color: "text-indigo-600 bg-indigo-50",
      indicators: [
        { label: "Deducibilità Ordinaria", val: "5.164,57 €", ref: "Art. 10 TUIR", desc: "Limite annuo per il recupero IRPEF immediato." },
        { label: "Deducibilità 2026", val: "5.300,00 €", ref: "Budget 2026", desc: "Nuovo plafond per la previdenza complementare." },
        { label: "Taxation Range", val: "15% - 9%", ref: "D.Lgs 252/05", desc: "Aliquota agevolata sul prelievo finale (pensioni e TFR)." },
        { label: "IRES Aziendale", val: "24,00 %", ref: "Testo Unico", desc: "Base di calcolo per il cashback fiscale dell'impresa." }
      ]
    },
    {
      title: "Parametri Macroeconomici",
      icon: History,
      color: "text-emerald-600 bg-emerald-50",
      indicators: [
        { label: "Rivalutazione TFR", val: "1.5% + 0.75 Inf.", ref: "L. 297/82", desc: "Tasso obbligatorio di crescita del debito TFR in bilancio." },
        { label: "Imposta Sostitutiva", val: "17,00 %", ref: "L. 190/14", desc: "Tassa dovuta dall'azienda sulla rivalutazione del TFR." },
        { label: "ISC Benchmark", val: "1.35% - 2.18%", ref: "Rel. COVIP", desc: "Indicatore Sintetico di Costo medio per FPA e PIP." },
        { label: "Bollo Patrimoniale", val: "0,20 %", ref: "D.L. 201/11", desc: "Imposta dovuta sui conti bancari (0€ sui fondi pensione)." }
      ]
    },
    {
      title: "Indicatori Previdenziali",
      icon: Landmark,
      color: "text-amber-600 bg-amber-50",
      indicators: [
        { label: "Coeff. Trasformazione", val: "5.723% (Età 67)", ref: "D.M. 2022", desc: "Rapporto tra montante accumulato e rendita annua lorda." },
        { label: "Indennità INPS", val: "531,76 €", ref: "Circ. 2025", desc: "Valore base dell'assegno di accompagnamento statale." },
        { label: "Target Care Costs", val: "3.000 €/mese", ref: "Audit AIMA", desc: "Costo medio reale di una assistenza privata 24/7." },
        { label: "Multiplier Option F", val: "x2.0", ref: "Zurich Smart", desc: "Coefficiente di raddoppio rendita in caso di non autosufficienza." }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-fade-in pb-24">
      
      {/* HEADER EXECUTIVE */}
      <div className="bg-[#0a0f1d] rounded-[3.5rem] p-12 text-white shadow-2xl relative overflow-hidden border-b-8 border-indigo-600">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-600/10 to-transparent"></div>
        <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
           <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                 <div className="bg-indigo-600 p-3 rounded-2xl shadow-xl"><Binary size={32} /></div>
                 <span className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-400 italic">Methodology & Calculation Transparency</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
                Motore di <br/> <span className="text-indigo-400 text-6xl">Calcolo Certificato</span>
              </h1>
              <p className="text-slate-400 text-xl font-medium max-w-2xl leading-relaxed">
                Tutti i calcoli dell'app si basano su questi indicatori normativi e macroeconomici ufficiali. La trasparenza è il primo passo per una consulenza etica.
              </p>
           </div>
           <div className="lg:col-span-4 bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 text-center">
              <p className="text-[10px] font-black uppercase text-amber-500 mb-2 tracking-widest italic">Aggiornamento Motore</p>
              <p className="text-6xl font-black text-white tracking-tighter">02/25</p>
              <p className="text-[10px] font-black text-indigo-300 uppercase mt-4 tracking-widest leading-tight italic">Revisione Dati <br/> COVIP & TUIR</p>
           </div>
        </div>
      </div>

      {/* MATRIX INDICATORI */}
      <div className="grid lg:grid-cols-3 gap-8">
         {sections.map((s, idx) => {
           const Icon = s.icon;
           return (
             <div key={idx} className="bg-white rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                <div className={`${s.color} p-8 border-b border-slate-100`}>
                   <div className="flex items-center gap-4">
                      <div className="p-3 bg-white rounded-2xl shadow-md"><Icon size={28} /></div>
                      <h3 className="text-xl font-black uppercase tracking-tighter italic">{s.title}</h3>
                   </div>
                </div>
                <div className="p-8 space-y-6 flex-1 bg-gradient-to-b from-slate-50/50 to-white">
                   {s.indicators.map((ind, iIdx) => (
                      <div key={iIdx} className="space-y-2 group">
                         <div className="flex justify-between items-end">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{ind.label}</span>
                            <span className="text-sm font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{ind.val}</span>
                         </div>
                         <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                            <span className="text-[9px] font-bold text-indigo-500 italic bg-white px-2 py-0.5 rounded border border-indigo-50 shadow-sm">{ind.ref}</span>
                            <p className="text-[10px] text-slate-500 font-medium leading-tight max-w-[180px] text-right">{ind.desc}</p>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
           );
         })}
      </div>

      {/* FOCUS FORMULA: RIVALUTAZIONE TFR */}
      <div className="bg-slate-900 rounded-[3.5rem] p-12 text-white shadow-2xl relative overflow-hidden group">
         <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:scale-110 transition-transform"><Microscope size={300} /></div>
         <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-8">
               <h3 className="text-3xl font-black italic uppercase tracking-tighter text-amber-500 leading-none">Anatomia del Costo <br/> Debito TFR</h3>
               <p className="text-slate-400 text-lg font-medium leading-relaxed italic">
                 "Dottore, il TFR non è gratis. La Legge 297/82 obbliga la sua azienda a rivalutare questo debito verso i dipendenti con una formula che oggi, con l'inflazione, è diventata un'emorragia di cassa."
               </p>
               <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] inline-block">
                  <div className="flex items-center gap-6">
                     <div className="p-4 bg-amber-500 rounded-3xl text-slate-900 shadow-xl shadow-amber-600/20"><Calculator size={32} /></div>
                     <div className="text-2xl font-mono font-black italic tracking-widest">
                        T = 1.5% + (75% × Inf.)
                     </div>
                  </div>
               </div>
            </div>
            <div className="lg:col-span-5 bg-white/5 backdrop-blur-xl p-8 rounded-[3rem] border border-white/10 space-y-6">
               <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <AlertTriangle size={20} className="text-amber-500" />
                  <span className="text-[10px] font-black uppercase text-amber-400 tracking-widest">Risk Alert PMI</span>
               </div>
               <p className="text-sm text-slate-300 leading-relaxed font-medium italic">
                  Con un'inflazione al 4%, il TFR in azienda costa il **4,5% annuo**. Esternalizzare significa trasformare questo costo certo in un risparmio IRES del 24% + Bonus compensativi.
               </p>
               <div className="flex gap-3">
                  <div className="bg-rose-500/20 px-3 py-1 rounded-full text-[9px] font-black uppercase text-rose-400 border border-rose-500/30">Costo Liquidità</div>
                  <div className="bg-emerald-500/20 px-3 py-1 rounded-full text-[9px] font-black uppercase text-emerald-400 border border-emerald-500/30">Target: Outsourcing</div>
               </div>
            </div>
         </div>
      </div>

      {/* FOOTER METODOLOGICO */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
         <div className="flex items-center gap-6">
            <div className="bg-[#0a0f1d] p-4 rounded-[1.5rem] text-white shadow-lg"><FileSignature size={32} /></div>
            <div>
               <p className="text-lg font-black text-slate-800 uppercase tracking-tighter leading-none mb-1">Fiscal Intelligence Data Book 2025</p>
               <p className="text-xs text-slate-500 font-bold italic">Rif: Art. 10 TUIR | L. 297/82 | D.Lgs 252/05 | Revisione Indicatori: Gennaio 2025</p>
            </div>
         </div>
         <div className="text-right">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">DOCUMENTO AD USO INTERNO RISERVATO - PRIVATE SUITE</p>
         </div>
      </div>

    </div>
  );
};

export default MethodologyView;
