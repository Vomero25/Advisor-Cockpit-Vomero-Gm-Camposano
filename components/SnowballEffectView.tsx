
import React, { useState, useMemo } from 'react';
import { HISTORICAL_DATA_20Y, COMPANY_BENCHMARKS } from '../constants';
import { fetchHistoricalReturns } from '../services/geminiService';
import { 
  Snowflake, TrendingUp, TrendingDown, AlertTriangle, Scale, 
  BarChart3, Info, Landmark, CheckCircle2, 
  FileText, ArrowRight, ShieldAlert, Coins,
  History, Globe, Search, Loader2, Sparkles, X,
  CalendarDays, Zap, Activity, BookOpen, Microscope,
  // Fix: added missing icons for sources
  Link as LinkIcon, ExternalLink
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line, ComposedChart } from 'recharts';

const formatCurrency = (val: number) => 
  new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);

const SnowballEffectView: React.FC = () => {
  const [viewMode, setViewMode] = useState<'FORWARD' | 'HISTORICAL'>('FORWARD');
  const [wageBill, setWageBill] = useState<number>(500000);
  const [selectedBenchmarkId, setSelectedBenchmarkId] = useState<string>('jpmGlobal');
  
  // STATI RICERCA ISIN
  const [isinQuery, setIsinQuery] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [customData, setCustomData] = useState<Record<number, number> | null>(null);
  const [customLabel, setCustomLabel] = useState<string>('');
  // Fix: added state for grounding sources
  const [customSources, setCustomSources] = useState<Array<{title: string, uri: string}>>([]);

  const selectedBenchmark = COMPANY_BENCHMARKS.find(b => b.id === selectedBenchmarkId) || COMPANY_BENCHMARKS[0];

  // --- FUNZIONE DI RICERCA AI PER ISIN/INDICE ---
  const handleIsinSearch = async () => {
    if (!isinQuery.trim()) return;
    setIsSearching(true);
    // Fix: reset sources before search
    setCustomSources([]);
    try {
      const response = await fetchHistoricalReturns(isinQuery);
      setCustomData(response.data);
      // Fix: store grounding sources
      setCustomSources(response.sources);
      setCustomLabel(isinQuery.toUpperCase());
    } catch (err) {
      alert("Impossibile recuperare i dati storici per questo strumento. Prova con un indice noto (es. MSCI World) o un ISIN Zurich.");
    } finally {
      setIsSearching(false);
    }
  };

  // --- LOGICA PROIEZIONE 15 ANNI (FORWARD) ---
  const forwardAnalysis = useMemo(() => {
    let currentDebt = 0;
    let currentInvestment = 0;
    const annualTfrAccrual = wageBill / 13.5;
    const avgReturn = 0.045; // Media ipotetica 

    return Array.from({ length: 15 }, (_, i) => {
      const year = 2025 + i;
      const projectedRate = 0.028; 
      const reval = currentDebt * projectedRate;
      currentDebt = currentDebt + reval + annualTfrAccrual;
      const returns = currentInvestment * avgReturn;
      currentInvestment = currentInvestment + returns + annualTfrAccrual;
      
      return {
        year,
        debt: Math.round(currentDebt),
        investment: Math.round(currentInvestment),
      };
    });
  }, [wageBill]);

  // --- LOGICA AUDIT STORICO 25 ANNI (HISTORICAL) ---
  const historicalAudit = useMemo(() => {
    let currentDebt = 100000; // Base di partenza fissa per l'analisi storica
    let currentBenchmark = 100000;
    let currentIsin = 100000;
    const annualAccrual = wageBill / 13.5;

    return HISTORICAL_DATA_20Y.map(point => {
      // Rivalutazione TFR Reale
      const tfrReval = currentDebt * (point.tfrRate / 100);
      currentDebt = currentDebt + tfrReval + annualAccrual;

      // Rendimento Benchmark Reale
      const benchPerf = point[selectedBenchmarkId as keyof typeof point] as number;
      currentBenchmark = currentBenchmark + (currentBenchmark * (benchPerf / 100)) + annualAccrual;

      // Rendimento ISIN Personalizzato (se presente)
      if (customData) {
        const isinPerf = customData[point.year] || 0;
        currentIsin = currentIsin + (currentIsin * (isinPerf / 100)) + annualAccrual;
      }

      return {
        ...point,
        debt: Math.round(currentDebt),
        benchmark: Math.round(currentBenchmark),
        isinValue: customData ? Math.round(currentIsin) : null,
      };
    });
  }, [wageBill, selectedBenchmarkId, customData]);

  const lastHistPoint = historicalAudit[historicalAudit.length - 1];

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-fade-in pb-20">
      
      {/* HEADER EXECUTIVO RISK DIAGNOSTIC */}
      <div className="bg-slate-950 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden border-b-8 border-red-600">
        <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
           <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                 <div className="bg-red-600 p-3 rounded-2xl shadow-lg animate-pulse"><Snowflake size={28}/></div>
                 <span className="text-[11px] font-black uppercase tracking-[0.3em] text-red-400">Risk Diagnostic v5.1 - Intelligence Unit</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-none">
                {viewMode === 'FORWARD' ? 'Effetto' : 'Audit'} <span className="text-red-500">Palla di Neve</span>
              </h1>
              <p className="text-slate-400 text-xl font-medium max-w-xl">
                {viewMode === 'FORWARD' 
                  ? "Analisi predittiva del debito TFR indicizzato a 15 anni. Il costo occulto del non fare nulla."
                  : "Ricostruzione storica 2000-2024: come l'inflazione e le riforme hanno eroso il capitale aziendale."}
              </p>
           </div>
           <div className="lg:col-span-5 bg-white/5 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white/10 text-center">
              <p className="text-[11px] font-black uppercase text-red-300 mb-2 tracking-widest">
                {viewMode === 'FORWARD' ? 'Debito Proiettato 2040' : 'Passività Storica Accumulata'}
              </p>
              <p className="text-7xl font-black text-rose-500 tracking-tighter">
                {formatCurrency(viewMode === 'FORWARD' ? forwardAnalysis[14].debt : lastHistPoint.debt)}
              </p>
              <div className="mt-6 flex justify-center gap-3">
                 <span className="bg-rose-500/20 text-rose-400 text-[10px] font-black px-4 py-1.5 rounded-full border border-red-500/30 uppercase tracking-widest italic">Rating Impact: High</span>
              </div>
           </div>
        </div>
      </div>

      {/* NAVIGATION TABS MODULO */}
      <div className="flex gap-2 bg-slate-100 p-1.5 rounded-2xl w-fit mx-auto shadow-inner border border-slate-200">
         <button onClick={() => setViewMode('FORWARD')} className={`px-8 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${viewMode === 'FORWARD' ? 'bg-white text-rose-600 shadow-md' : 'text-slate-500 hover:text-slate-800'}`}>
            <TrendingUp size={16} /> Proiezione 15 Anni
         </button>
         <button onClick={() => setViewMode('HISTORICAL')} className={`px-8 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${viewMode === 'HISTORICAL' ? 'bg-white text-indigo-600 shadow-md' : 'text-slate-500 hover:text-slate-800'}`}>
            <History size={16} /> Serie Storica 25 Anni
         </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* SIDEBAR PARAMETRI & RICERCA ISIN */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm space-y-8">
             <div>
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-6">
                   <Microscope size={14} className="text-rose-600" /> Configurazione Diagnosi
                </h4>
                <label className="text-[10px] font-black text-slate-400 uppercase block mb-3">Monte Salari Annuo (€)</label>
                <input 
                  type="number" value={wageBill} 
                  onChange={(e) => setWageBill(Number(e.target.value))}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-2xl font-black outline-none focus:ring-4 focus:ring-rose-500/20 text-slate-900" 
                />
             </div>

             {/* COMPARATORE ISIN AI (RICHIESTO) */}
             <div className="pt-6 border-t border-slate-100 space-y-4">
                <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                   <Sparkles size={14} /> Intelligence Comparativa
                </h4>
                <p className="text-[11px] text-slate-500 font-medium">Inserisci un ISIN o un Indice per confrontare il rendimento reale con il costo del TFR.</p>
                <div className="relative">
                   <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                   <input 
                      type="text" 
                      placeholder="Es: MSCI World, IE00B4L5Y983..." 
                      value={isinQuery}
                      onChange={(e) => setIsinQuery(e.target.value)}
                      className="w-full pl-11 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-indigo-500 transition-all font-bold text-sm"
                   />
                </div>
                <button 
                  onClick={handleIsinSearch}
                  disabled={isSearching || !isinQuery}
                  className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg hover:bg-indigo-600 disabled:bg-slate-200 transition-all flex justify-center items-center gap-3"
                >
                  {isSearching ? <Loader2 className="animate-spin" size={18} /> : <Globe size={18} />}
                  {isSearching ? "Analisi di Rete..." : "Compara Strumento"}
                </button>

                {customData && (
                   <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                         <CheckCircle2 size={14} className="text-emerald-600" />
                         <span className="text-[10px] font-black text-emerald-700 truncate max-w-[150px]">{customLabel}</span>
                      </div>
                      <button onClick={() => {setCustomData(null); setCustomLabel(''); setCustomSources([]);}} className="text-emerald-800 hover:text-red-600 transition-colors">
                         <X size={14}/>
                      </button>
                   </div>
                )}
             </div>

             <div className="pt-6 border-t border-slate-100">
                <label className="text-[10px] font-black text-slate-400 uppercase block mb-3">Benchmark di Default</label>
                <div className="space-y-1.5">
                   {COMPANY_BENCHMARKS.map(b => (
                     <button key={b.id} onClick={() => setSelectedBenchmarkId(b.id)} className={`w-full p-3 rounded-xl border-2 text-left transition-all ${selectedBenchmarkId === b.id ? 'border-indigo-600 bg-indigo-50' : 'border-slate-50 hover:bg-slate-50'}`}>
                        <div className="flex justify-between items-center">
                           <span className="font-black text-[10px] text-slate-700 uppercase">{b.name}</span>
                        </div>
                     </button>
                   ))}
                </div>
             </div>
          </div>
        </div>

        {/* AREA GRAFICO POTENZIATA */}
        <div className="lg:col-span-8 space-y-6">
           <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm relative overflow-hidden flex flex-col h-full">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                 <div>
                    <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic">
                       {viewMode === 'FORWARD' ? 'Proiezione Dinamica' : 'Registro Statistico 25 Anni'}
                    </h3>
                    <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">
                       {viewMode === 'FORWARD' ? 'Base Proiezione: Target BCE 2.8%' : 'Periodo: 2000 - 2024'}
                    </p>
                 </div>
                 <div className="flex flex-wrap gap-4 text-[9px] font-black uppercase tracking-widest bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-2 text-rose-500"><div className="w-2.5 h-2.5 bg-rose-500 rounded-full"></div> Debito TFR</div>
                    <div className="flex items-center gap-2 text-indigo-600"><div className="w-2.5 h-2.5 bg-indigo-500 rounded-full"></div> {selectedBenchmark.name}</div>
                    {customData && <div className="flex items-center gap-2 text-emerald-600"><div className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></div> {customLabel}</div>}
                 </div>
              </div>
              
              <div className="flex-1 min-h-[450px]">
                 <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={viewMode === 'FORWARD' ? forwardAnalysis : historicalAudit}>
                       <defs>
                          <linearGradient id="gradDebt" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.1}/>
                             <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                       <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
                       <YAxis tickFormatter={(v) => `€${(v/1000).toFixed(0)}k`} axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                       <Tooltip 
                         contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'}} 
                         formatter={(v: any, name: string) => [formatCurrency(v), name]} 
                       />
                       <Area type="monotone" dataKey="debt" stroke="#f43f5e" strokeWidth={4} fill="url(#gradDebt)" name="Debito TFR" />
                       <Line type="monotone" dataKey={viewMode === 'FORWARD' ? 'investment' : 'benchmark'} stroke="#4f46e5" strokeWidth={3} dot={false} name={selectedBenchmark.name} />
                       {customData && viewMode === 'HISTORICAL' && (
                         <Line type="monotone" dataKey="isinValue" stroke="#10b981" strokeWidth={5} dot={false} name={customLabel} />
                       )}
                    </ComposedChart>
                 </ResponsiveContainer>
              </div>

              {viewMode === 'HISTORICAL' && (
                 <div className="mt-8 p-6 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-center gap-6">
                    <div className="bg-indigo-600 p-3 rounded-xl text-white shadow-lg"><Activity size={24}/></div>
                    <div>
                       <p className="text-sm font-black text-indigo-900 uppercase">Analisi Retrospettiva</p>
                       <p className="text-xs text-indigo-700 leading-relaxed font-medium">
                          In 25 anni, il debito TFR è cresciuto del <strong>{(((lastHistPoint.debt / 100000) - 1) * 100).toFixed(0)}%</strong>. 
                          Chi ha esternalizzato nel benchmark {selectedBenchmark.name} ha generato un valore extra di <strong>{formatCurrency(lastHistPoint.benchmark - lastHistPoint.debt)}</strong>.
                       </p>
                    </div>
                 </div>
              )}
           </div>
        </div>
      </div>

      {/* Fix: Display mandatory grounding sources URLs */}
      {customSources.length > 0 && (
         <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm">
            <h4 className="text-xs font-black uppercase tracking-widest text-indigo-900 mb-4 flex items-center gap-2">
               <LinkIcon size={14} /> Fonti Grounding AI (Rendimenti Verificati)
            </h4>
            <div className="flex flex-wrap gap-3">
               {customSources.map((source, idx) => (
                  <a 
                     key={idx} 
                     href={source.uri} 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all flex items-center gap-2"
                  >
                     {source.title} <ExternalLink size={12} />
                  </a>
               ))}
            </div>
         </div>
      )}

      {/* TABELLA SERIE STATISTICA 25 ANNI (RICHIESTA) */}
      {viewMode === 'HISTORICAL' && (
         <div className="bg-white rounded-[3rem] p-10 border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
               <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic flex items-center gap-3">
                  <BarChart3 className="text-amber-600" /> Registro Storico Macroeconomico (2000-2024)
               </h3>
               <div className="bg-slate-100 px-4 py-2 rounded-xl text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  Fonte: ISTAT / BCE / Gruppo Vomero Intelligence
               </div>
            </div>
            
            <div className="overflow-x-auto rounded-[2rem] border border-slate-100">
               <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest">
                     <tr>
                        <th className="px-6 py-6">Anno</th>
                        <th className="px-6 py-6 text-center text-amber-300">Inflazione %</th>
                        <th className="px-6 py-6 text-center text-rose-400">Rivalutazione TFR %</th>
                        <th className="px-6 py-6 text-center text-indigo-300">Perf. {selectedBenchmark.id} %</th>
                        <th className="px-6 py-6">Evento Macroeconomico Rilevante</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                     {historicalAudit.map((row) => (
                        <tr key={row.year} className="hover:bg-slate-50 transition-colors text-[10px] font-bold">
                           <td className="px-6 py-4 font-black text-slate-900">{row.year}</td>
                           <td className="px-6 py-4 text-center text-amber-600">{row.inflation.toFixed(1)}%</td>
                           <td className="px-6 py-4 text-center text-rose-500 bg-rose-50/20">{row.tfrRate.toFixed(2)}%</td>
                           <td className={`px-6 py-4 text-center ${(row[selectedBenchmarkId as keyof typeof row] as number) >= 0 ? 'text-indigo-600' : 'text-red-500'}`}>
                              {(row[selectedBenchmarkId as keyof typeof row] as number).toFixed(1)}%
                           </td>
                           <td className="px-6 py-4">
                              <span className="bg-slate-100 px-3 py-1 rounded-full text-slate-500 italic text-[9px]">
                                 {row.event}
                              </span>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      )}

      {/* FOOTER METODOLOGICO */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
         <div className="flex items-center gap-6">
            <div className="bg-slate-900 p-4 rounded-[1.5rem] text-white shadow-lg"><BookOpen size={32} /></div>
            <div>
               <p className="text-lg font-black text-slate-800 uppercase tracking-tighter leading-none mb-1">Risk Intelligence Certification</p>
               <p className="text-xs text-slate-500 font-bold italic">Audit Statistico 25 Anni | Riferimento Normativo L. 297/82 | Grounding AI Multi-Source</p>
            </div>
         </div>
         <div className="text-right">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">RELAZIONE AD USO ESCLUSIVO CONSULENTI GRUPPO VOMERO</p>
         </div>
      </div>

    </div>
  );
};

export default SnowballEffectView;
