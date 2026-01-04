
import React, { useState, useMemo } from 'react';
import { 
  ShieldPlus, BarChart3, TrendingUp, Landmark, 
  Settings2, Info, CheckCircle2, Calculator, 
  ArrowUpRight, ShieldCheck, Zap, AlertTriangle,
  History, Clock, BookOpen, Layers,
  // Fix: added missing MousePointer2 import
  MousePointer2
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const formatCurrency = (val: number) => 
  new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);

const CertificatesView: React.FC = () => {
  // Input States
  const [nominalValue, setNominalValue] = useState<number>(100000);
  const [finalPerformance, setFinalPerformance] = useState<number>(-40); // Esempio Worst-of -40%
  const [barrierLevel, setBarrierLevel] = useState<number>(-50); // Barriera al 50%
  const [strikeLevel, setStrikeLevel] = useState<number>(-50); // Strike per Airbag al 50%
  const [hasAirbag, setHasAirbag] = useState<boolean>(true);

  const results = useMemo(() => {
    const isAboveBarrier = finalPerformance >= barrierLevel;
    let standardRedemption = 0;
    let airbagRedemption = 0;

    // 1. Standard (Senza Airbag)
    if (isAboveBarrier) {
      standardRedemption = nominalValue;
    } else {
      standardRedemption = nominalValue * (1 + finalPerformance / 100);
    }

    // 2. Airbag (Low Strike)
    // Formula: (Prezzo Finale / Livello Strike) * Valore Nozionale
    if (finalPerformance >= strikeLevel) {
      airbagRedemption = nominalValue;
    } else {
      // Es: Prezzo Finale 40 (worst-of -60%), Strike 50 (-50%)
      // Rimb: (40 / 50) * 100 = 80. Perdita 20% vs perdita 60% reale.
      const finalPriceRatio = (100 + finalPerformance) / (100 + strikeLevel);
      airbagRedemption = nominalValue * finalPriceRatio;
    }

    return { 
      standardRedemption, 
      airbagRedemption, 
      isAboveBarrier,
      lossSaving: airbagRedemption - standardRedemption
    };
  }, [nominalValue, finalPerformance, barrierLevel, strikeLevel]);

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-fade-in pb-24">
      
      {/* HEADER EXECUTIVE */}
      <div className="bg-[#0a0f1d] rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden border-b-8 border-emerald-500">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-emerald-600/10 to-transparent"></div>
        <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
           <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                 <div className="bg-emerald-500 p-3 rounded-2xl shadow-xl shadow-emerald-600/20"><ShieldPlus size={32} className="text-slate-900"/></div>
                 <span className="text-[11px] font-black uppercase tracking-[0.4em] text-emerald-400 italic">Advanced Asset Management - ACEPI Standard</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
                Express <br/> <span className="text-emerald-500">Certificates</span>
              </h1>
              <p className="text-slate-400 text-xl font-medium max-w-2xl leading-relaxed">
                Strumenti a capitale condizionatamente protetto. Genera rendimenti positivi anche in fasi di mercato laterali o moderatamente ribassiste.
              </p>
           </div>
           <div className="lg:col-span-4 bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 text-center relative overflow-hidden group">
              <p className="text-[10px] font-black uppercase text-emerald-400 mb-2 tracking-widest italic">Simulazione Rimborso</p>
              <p className="text-6xl font-black text-white tracking-tighter">{formatCurrency(hasAirbag ? results.airbagRedemption : results.standardRedemption)}</p>
              <p className="text-[10px] font-black text-emerald-300 uppercase mt-4 tracking-widest">Capitale a Scadenza</p>
           </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* SIDEBAR PARAMETRI */}
        <div className="lg:col-span-4 space-y-6 no-print">
           <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm space-y-8 sticky top-8">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                 <Settings2 size={14} className="text-emerald-600" /> Configurazione Stress Test
              </h4>
              
              <div className="space-y-6">
                 <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">Capitale Nozionale (€)</label>
                    <input type="number" value={nominalValue} onChange={(e) => setNominalValue(Number(e.target.value))} className="w-full bg-transparent font-black text-2xl outline-none text-slate-900" />
                 </div>

                 <div className="space-y-4">
                    <div className="flex justify-between items-center mb-1">
                       <label className="text-[10px] font-black text-slate-400 uppercase italic">Performance Worst-Of ({finalPerformance}%)</label>
                    </div>
                    <input type="range" min="-100" max="50" step="1" value={finalPerformance} onChange={(e) => setFinalPerformance(Number(e.target.value))} className="w-full h-1.5 bg-rose-200 rounded-lg appearance-none accent-rose-600" />
                 </div>

                 <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                    <div className="flex justify-between items-center mb-2">
                       <label className="text-[10px] font-black text-indigo-700 uppercase italic">Livello Barriera ({barrierLevel}%)</label>
                    </div>
                    <input type="range" min="-80" max="-30" step="5" value={barrierLevel} onChange={(e) => setBarrierLevel(Number(e.target.value))} className="w-full h-1.5 bg-indigo-200 rounded-lg appearance-none accent-indigo-600" />
                 </div>

                 <div className="flex items-center justify-between bg-emerald-50 p-4 rounded-2xl border-2 border-emerald-200">
                    <div className="flex items-center gap-2">
                       <Zap size={18} className="text-emerald-600" />
                       <span className="text-sm font-black text-emerald-900 uppercase">Meccanismo Airbag</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                       <input type="checkbox" checked={hasAirbag} onChange={(e) => setHasAirbag(e.target.checked)} className="sr-only peer" />
                       <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                    </label>
                 </div>

                 {hasAirbag && (
                    <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 animate-fade-in">
                       <div className="flex justify-between items-center mb-1">
                          <label className="text-[10px] font-black text-emerald-700 uppercase italic">Livello Strike Airbag ({strikeLevel}%)</label>
                       </div>
                       <input type="range" min="-80" max="-30" step="5" value={strikeLevel} onChange={(e) => setStrikeLevel(Number(e.target.value))} className="w-full h-1.5 bg-emerald-300 rounded-lg appearance-none accent-emerald-600" />
                    </div>
                 )}
              </div>
           </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="lg:col-span-8 space-y-8">
           
           {/* BOX ANALISI RISULTATO */}
           <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden">
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic mb-10 flex items-center gap-4 leading-none">
                 <BarChart3 className="text-indigo-600" /> Analisi Rimborso a Scadenza
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8 mb-10">
                 <div className={`p-8 rounded-[2.5rem] border-2 relative group overflow-hidden ${results.isAboveBarrier ? 'bg-emerald-50 border-emerald-100' : 'bg-rose-50 border-rose-100'}`}>
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                       {results.isAboveBarrier ? <CheckCircle2 size={120} /> : <AlertTriangle size={120} />}
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest italic">Status Barriera</p>
                    <h4 className={`text-3xl font-black italic uppercase ${results.isAboveBarrier ? 'text-emerald-700' : 'text-rose-700'}`}>
                       {results.isAboveBarrier ? 'BARRIERA INTACT' : 'BARRIERA BREACHED'}
                    </h4>
                    <p className="text-sm font-bold text-slate-600 mt-4 leading-relaxed italic">
                       {results.isAboveBarrier 
                         ? "Il sottostante quota sopra la barriera: rimborso integrale del 100% del nozionale."
                         : "Il sottostante ha violato la barriera: l'investitore partecipa alla perdita."}
                    </p>
                 </div>

                 <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group border-t-8 border-emerald-500">
                    <div className="absolute -bottom-10 -right-10 opacity-10"><Zap size={200} /></div>
                    <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-4 italic">Vantaggio Meccanismo Airbag</p>
                    <p className="text-sm text-slate-300 leading-relaxed font-medium italic mb-6">
                       "Dottore, osserva come l'Airbag attenua drasticamente la caduta. Anche se il mercato perde il {Math.abs(finalPerformance)}%, tu rientri di molto più capitale grazie al coefficiente di moltiplicazione Low Strike."
                    </p>
                    <div className="flex justify-between items-center pt-6 border-t border-white/10">
                       <span className="text-xs font-black uppercase text-emerald-400">Protezione Extra:</span>
                       <span className="text-2xl font-black text-white">+{formatCurrency(results.lossSaving)}</span>
                    </div>
                 </div>
              </div>

              {/* TABELLA COMPARATIVA PERFORMANCE */}
              <div className="overflow-x-auto rounded-[2rem] border border-slate-100 shadow-inner">
                 <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest">
                       <tr>
                          <th className="px-6 py-6">Scenario Performance</th>
                          <th className="px-6 py-6 text-center">Rimborso Standard</th>
                          <th className="px-6 py-6 text-center bg-emerald-900">Rimborso con Airbag</th>
                          <th className="px-6 py-6 text-right">Delta (%)</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs font-bold">
                       <tr className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-5 text-slate-700">Mkt Worst-of a {finalPerformance}%</td>
                          <td className="px-6 py-5 text-center text-rose-600">{formatCurrency(results.standardRedemption)}</td>
                          <td className="px-6 py-5 text-center text-emerald-600 bg-emerald-50/30">{formatCurrency(results.airbagRedemption)}</td>
                          <td className="px-6 py-5 text-right font-black text-emerald-700">+{((results.airbagRedemption / results.standardRedemption - 1) * 100).toFixed(1)}%</td>
                       </tr>
                    </tbody>
                 </table>
              </div>
           </div>

           {/* KNOWLEDGE BASE DAL DOCUMENTO */}
           <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm group hover:border-indigo-500 transition-all">
                 <div className="bg-indigo-50 p-4 rounded-2xl w-fit text-indigo-600 mb-6"><Clock size={24}/></div>
                 <h4 className="font-black text-slate-900 uppercase text-[10px] mb-3 tracking-widest">Autocallability</h4>
                 <p className="text-[11px] text-slate-500 leading-relaxed italic">Rimborso anticipato automatico se i sottostanti superano il livello Trigger nelle date di osservazione.</p>
              </div>
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm group hover:border-amber-500 transition-all">
                 <div className="bg-amber-50 p-4 rounded-2xl w-fit text-amber-600 mb-6"><MousePointer2 size={24}/></div>
                 <h4 className="font-black text-slate-900 uppercase text-[10px] mb-3 tracking-widest">Softcallable</h4>
                 <p className="text-[11px] text-slate-500 leading-relaxed italic">L'emittente ha la facoltà (ma non l'obbligo) di richiamare il titolo, offrendo solitamente cedole più elevate.</p>
              </div>
              <div className="bg-[#0a0f1d] p-8 rounded-[2.5rem] text-white shadow-xl border-t-4 border-emerald-500">
                 <div className="bg-emerald-500 p-4 rounded-2xl w-fit text-slate-900 mb-6"><ShieldCheck size={24}/></div>
                 <h4 className="font-black text-emerald-400 uppercase text-[10px] mb-3 tracking-widest">Meccanismo Airbag</h4>
                 <p className="text-[11px] text-slate-400 leading-relaxed italic">Riduce l'importo delle perdite se il sottostante quota sotto lo Strike, rimborsando (Prezzo Finale / Strike) * Nozionale.</p>
              </div>
           </div>

        </div>
      </div>

      {/* FOOTER EXECUTIVO */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
         <div className="flex items-center gap-6">
            <div className="bg-[#0a0f1d] p-4 rounded-[1.5rem] text-white shadow-lg"><Layers size={32} /></div>
            <div>
               <p className="text-lg font-black text-slate-800 uppercase tracking-tighter leading-none mb-1">Express Portfolio Certification</p>
               <p className="text-xs text-slate-500 font-bold italic">Rif. Tecnico: Formula Airbag ACEPI | Certificati Express Autocallable | Revisione Gruppo Vomero 2025</p>
            </div>
         </div>
         <div className="text-right">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">DOCUMENTO AD USO INTERNO RISERVATO - PRIVATE BANKING UNIT</p>
         </div>
      </div>

    </div>
  );
};

export default CertificatesView;
