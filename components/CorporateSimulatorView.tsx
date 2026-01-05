import React, { useState, useMemo } from 'react';
import { COMPANY_BENCHMARKS, HISTORICAL_DATA_20Y } from '../constants';
import { fetchHistoricalReturns } from '../services/geminiService';
import { 
  Factory, TrendingDown, TrendingUp, Scale, 
  CheckCircle2, ShieldAlert, Landmark, History, 
  Table as TableIcon, Activity, 
  Settings2, Users, Wallet, Search, Loader2, Sparkles, AlertCircle,
  BarChart3, Globe, ShieldCheck, ArrowRight, ExternalLink, X, Info,
  Link as LinkIcon, CalendarDays, Percent, Microscope, ArrowUpRight, Signal,
  Eye, EyeOff, FileCheck, Globe2, Zap,
  Coins, Minus, ArrowDownToLine, Receipt, FileSignature, Banknote
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ComposedChart, Line } from 'recharts';

const formatCurrency = (val: number) => 
  new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);

const CorporateSimulatorView: React.FC = () => {
  const [initialStock, setInitialStock] = useState<number>(100000);
  const [wageBill, setWageBill] = useState<number>(350000); // Monte stipendi complessivo (RAL Tot)
  const [salaryGrowth, setSalaryGrowth] = useState<number>(2.0); 
  const [accrualRate, setAccrualRate] = useState<number>(7.41); // Aliquota legale accantonamento (1/13.5)
  const [selectedBenchmarkId, setSelectedBenchmarkId] = useState<string>('jpmGlobal');
  
  // Serie storica dal 2000 ad oggi
  const [startYear, setStartYear] = useState<number>(2000);
  const [endYear, setEndYear] = useState<number>(2024);
  
  const [customSearch, setCustomSearch] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [customReturns, setCustomReturns] = useState<Record<number, number> | null>(null);
  const [customSources, setCustomSources] = useState<Array<{title: string, uri: string}>>([]);
  const [customExplanation, setCustomExplanation] = useState<string>('');
  const [customLabel, setCustomLabel] = useState<string>('');

  const availableYears = HISTORICAL_DATA_20Y.map(d => d.year);
  const selectedBenchmark = COMPANY_BENCHMARKS.find(b => b.id === selectedBenchmarkId) || COMPANY_BENCHMARKS[0];

  const handleSearchCustomIndex = async () => {
    if (!customSearch.trim()) return;
    setIsSearching(true);
    setCustomSources([]);
    try {
      const response = await fetchHistoricalReturns(customSearch);
      setCustomReturns(response.data);
      setCustomSources(response.sources);
      setCustomExplanation(response.explanation || '');
      setCustomLabel(customSearch.toUpperCase());
    } catch (err) {
      alert("Errore nel recupero dei dati. Assicurati che la chiave API sia configurata.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleQuickSelect = (id: string) => {
    setSelectedBenchmarkId(id);
    setCustomReturns(null);
    setCustomLabel('');
    setCustomSources([]);
  };

  const detailedAudit = useMemo(() => {
    let currentDebt = initialStock;
    let currentAsset = initialStock;
    let currentNominalDebt = initialStock; 
    let currentWageBill = wageBill; 
    
    // Filtriamo la sorgente storica in base alla selezione dell'utente
    const filteredSource = HISTORICAL_DATA_20Y.filter(d => d.year >= startYear && d.year <= endYear);
    
    return filteredSource.map(point => {
      // Calcolo Accantonamento Annuo ex Art. 2120 c.c. (RAL * aliquota scelta)
      const yearlyAccrual = currentWageBill * (accrualRate / 100);
      
      // Calcolo Coefficiente TFR (L. 297/82): 1.5% + 75% Inflazione
      const tfrCoeff = 1.5 + (0.75 * point.inflation);
      const revalCost = currentDebt * (tfrCoeff / 100);
      
      // Evoluzione Debito Reale (TFR in Azienda)
      currentDebt = currentDebt + revalCost + yearlyAccrual;
      
      // Evoluzione Debito Nominale (Pura somma accantonamenti senza interessi di rivalutazione)
      currentNominalDebt = currentNominalDebt + yearlyAccrual;

      // Evoluzione Asset Esternalizzato (Benchmark)
      let mktPerf = point[selectedBenchmarkId as keyof typeof point] as number;
      if (customReturns) {
        mktPerf = customReturns[point.year] ?? mktPerf;
      }
      const assetReturn = currentAsset * (mktPerf / 100);
      currentAsset = currentAsset + assetReturn + yearlyAccrual;

      // Incremento monte stipendi per l'anno successivo
      currentWageBill = currentWageBill * (1 + salaryGrowth / 100);

      return {
        year: point.year,
        inflation: point.inflation,
        tfrCoeff: tfrCoeff.toFixed(2),
        event: point.event,
        accrual: Math.round(yearlyAccrual),
        revalCost: Math.round(revalCost),
        debt: Math.round(currentDebt),
        nominalDebt: Math.round(currentNominalDebt),
        asset: Math.round(currentAsset),
        opportunityCost: Math.round(currentAsset - currentDebt),
        totalInterestCost: Math.round(currentDebt - currentNominalDebt) 
      };
    });
  }, [initialStock, wageBill, salaryGrowth, accrualRate, selectedBenchmarkId, startYear, endYear, customReturns]);

  const finalPoint = detailedAudit[detailedAudit.length - 1];

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-fade-in pb-20">
      
      {/* HERO SECTION */}
      <div className="bg-[#0f172a] rounded-[3rem] p-10 text-white shadow-xl relative border-b-8 border-indigo-600">
        <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
           <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                 <div className="bg-indigo-600 p-3 rounded-2xl shadow-lg"><Factory size={28}/></div>
                 <span className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-400 italic">Vomero Corporate Intelligence Unit</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-none">Audit <span className="text-indigo-500">TFR Dinamico</span></h1>
              <p className="text-slate-400 text-xl font-medium max-w-xl">Analisi retrospettiva della passività TFR. Il costo reale del "non fare nulla" dal 2000 ad oggi.</p>
           </div>
           <div className="lg:col-span-5 bg-white/5 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white/10 text-center relative overflow-hidden">
              <p className="text-[10px] font-black uppercase text-indigo-300 mb-2 tracking-widest italic">Interessi Passivi Accumulati</p>
              <p className="text-7xl font-black text-white tracking-tighter text-rose-500">{formatCurrency(finalPoint?.totalInterestCost || 0)}</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase mt-4 italic">Costo finanziario eroso dal bilancio</p>
           </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* SIDEBAR CONFIG */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm space-y-8">
             <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 italic"><Settings2 size={14} className="text-indigo-600" /> Parametri dell'Audit</h4>
             
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <p className="text-[9px] font-black text-slate-500 mb-1 uppercase">Dal Anno</p>
                  <select value={startYear} onChange={(e) => setStartYear(Number(e.target.value))} className="w-full bg-transparent font-black text-sm outline-none">
                    {availableYears.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <p className="text-[9px] font-black text-slate-500 mb-1 uppercase">Al Anno</p>
                  <select value={endYear} onChange={(e) => setEndYear(Number(e.target.value))} className="w-full bg-transparent font-black text-sm outline-none">
                    {availableYears.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
             </div>

             <div className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                   <p className="text-[10px] font-black text-slate-500 uppercase block mb-1 italic">Stock TFR al {startYear} (€)</p>
                   <input type="number" value={initialStock} onChange={(e) => setInitialStock(Number(e.target.value))} className="w-full bg-transparent font-black text-2xl outline-none text-slate-900" />
                </div>
                
                <div className="bg-indigo-50 p-4 rounded-2xl border-2 border-indigo-100">
                   <p className="text-[10px] font-black text-indigo-600 uppercase block mb-1 italic">Monte Stipendi Annuo (RAL) (€)</p>
                   <input type="number" value={wageBill} onChange={(e) => setWageBill(Number(e.target.value))} className="w-full bg-transparent font-black text-2xl outline-none text-indigo-900" />
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                   <div className="flex justify-between items-center mb-1">
                      <p className="text-[10px] font-black text-slate-500 uppercase italic">Aliquota Accantonamento ({accrualRate}%)</p>
                      <span title="Valore standard ex Art. 2120 c.c.: 7.41% (1/13.5)">
                        <Info size={12} className="text-slate-400" />
                      </span>
                   </div>
                   <input type="range" min="6" max="9" step="0.01" value={accrualRate} onChange={(e) => setAccrualRate(Number(e.target.value))} className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none accent-indigo-600" />
                   <p className="text-[9px] text-slate-400 mt-1 italic">Riferimento Legale: 7,41% (RAL / 13,5)</p>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                   <div className="flex justify-between items-center mb-1">
                      <p className="text-[10px] font-black text-slate-500 uppercase italic">Crescita Salariale ({salaryGrowth}%)</p>
                   </div>
                   <input type="range" min="0" max="5" step="0.5" value={salaryGrowth} onChange={(e) => setSalaryGrowth(Number(e.target.value))} className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none accent-indigo-600" />
                </div>
             </div>

             <div className="pt-6 border-t border-slate-100 space-y-4">
                <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2 italic"><Sparkles size={14} /> Intelligence Comparativa</h4>
                <div className="grid grid-cols-2 gap-2 mb-4">
                   {COMPANY_BENCHMARKS.map((bench) => (
                      <button 
                        key={bench.id} 
                        onClick={() => handleQuickSelect(bench.id)}
                        className={`p-3 rounded-xl border-2 text-[9px] font-black uppercase transition-all text-center leading-tight ${selectedBenchmarkId === bench.id && !customReturns ? 'border-indigo-600 bg-indigo-50 text-indigo-900 shadow-md' : 'border-slate-100 text-slate-400 hover:bg-slate-50'}`}
                      >
                         {bench.name}
                      </button>
                   ))}
                </div>
                <div className="relative">
                   <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                   <input type="text" placeholder="Benchmark AI (es. MSCI World)..." value={customSearch} onChange={(e) => setCustomSearch(e.target.value)} className="w-full pl-11 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-indigo-500 transition-all font-bold text-sm" />
                </div>
                <button onClick={handleSearchCustomIndex} disabled={isSearching || !customSearch} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:bg-indigo-600 disabled:bg-slate-200 transition-all flex justify-center items-center gap-3">
                  {isSearching ? <Loader2 className="animate-spin" size={18} /> : <Globe size={18} />} Valida Benchmark Web
                </button>
             </div>
          </div>
        </div>

        {/* MAIN CHART & TABLE */}
        <div className="lg:col-span-8 space-y-8">
           {/* CHART VIEW */}
           <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm flex flex-col h-[500px]">
              <div className="flex flex-col lg:flex-row justify-between lg:items-center mb-10 gap-4">
                 <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic">Erosione della Redditività (Serie Storica)</h3>
                 <div className="flex flex-wrap gap-4 text-[9px] font-black uppercase text-slate-400 tracking-widest">
                    <div className="flex items-center gap-2 text-rose-500"><div className="w-2.5 h-2.5 bg-rose-500 rounded-full"></div> Debito TFR</div>
                    <div className="flex items-center gap-2 text-slate-400"><div className="w-2.5 h-2.5 border-2 border-slate-400 border-dashed rounded-full"></div> Debito Nominale</div>
                    <div className="flex items-center gap-2 text-indigo-600"><div className="w-2.5 h-2.5 bg-indigo-600 rounded-full"></div> {customLabel || selectedBenchmark.name}</div>
                 </div>
              </div>
              <div className="flex-1">
                 <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={detailedAudit}>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                       <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
                       <YAxis tickFormatter={(v) => `€${(v/1000).toFixed(0)}k`} axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                       <Tooltip 
                         contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'}} 
                         formatter={(val: number) => formatCurrency(val)}
                       />
                       <Area type="monotone" dataKey="debt" stroke="#f43f5e" strokeWidth={4} fill="#f43f5e" fillOpacity={0.05} name="Debito TFR" />
                       <Line type="monotone" dataKey="nominalDebt" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Solo Accantonamento" />
                       <Line type="monotone" dataKey="asset" stroke="#4f46e5" strokeWidth={4} dot={false} name={customLabel || selectedBenchmark.name} />
                    </ComposedChart>
                 </ResponsiveContainer>
              </div>
           </div>

           {/* DETAILED YEAR-BY-YEAR AUDIT TABLE - FULL HISTORY */}
           <div className="bg-white rounded-[3rem] p-10 border border-slate-200 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic flex items-center gap-3">
                    <TableIcon className="text-indigo-600" /> Registro Analitico "Audit Ledger" (2000-2024)
                 </h3>
                 <div className="bg-slate-100 px-4 py-2 rounded-xl text-[10px] font-black text-slate-500 uppercase tracking-widest italic">
                    Focus: Inflazione & Rivalutazione Legale
                 </div>
              </div>

              <div className="overflow-x-auto rounded-[2rem] border border-slate-100 shadow-inner max-h-[700px] overflow-y-auto custom-scrollbar">
                 <table className="w-full text-left border-collapse">
                    <thead className="bg-[#0f172a] text-white text-[9px] font-black uppercase tracking-[0.2em] sticky top-0 z-10">
                       <tr>
                          <th className="px-6 py-6">Anno</th>
                          <th className="px-4 py-6 text-center text-amber-400">Coeff. TFR %</th>
                          <th className="px-4 py-6 text-right">Costo Rivalutaz.</th>
                          <th className="px-6 py-6">Evento Macroeconomico</th>
                          <th className="px-6 py-6 text-right">Debito Reale</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                       {detailedAudit.map((row) => (
                          <tr key={row.year} className="hover:bg-slate-50 transition-colors text-[11px] font-bold group">
                             <td className="px-6 py-4 font-black text-slate-900">{row.year}</td>
                             <td className="px-4 py-4 text-center text-indigo-600 font-black">{row.tfrCoeff}%</td>
                             <td className="px-4 py-4 text-right text-rose-500 bg-rose-50/20">{formatCurrency(row.revalCost)}</td>
                             <td className="px-6 py-4">
                                <span className="bg-slate-100 px-3 py-1 rounded-full text-slate-500 italic text-[9px] font-black uppercase group-hover:bg-amber-100 group-hover:text-amber-700 transition-colors">
                                   {row.event}
                                </span>
                             </td>
                             <td className="px-6 py-4 text-right font-black text-slate-900">{formatCurrency(row.debt)}</td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>

              <div className="mt-10 p-8 bg-indigo-50 rounded-[2.5rem] border border-indigo-100 flex flex-col md:flex-row items-center justify-between gap-8">
                 <div className="flex items-center gap-6">
                    <div className="bg-white p-4 rounded-2xl text-indigo-600 shadow-sm"><FileSignature size={28} /></div>
                    <div>
                       <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1 italic">Conclusione Tecnica dell'Audit</p>
                       <p className="text-sm font-bold text-indigo-900 italic leading-relaxed">
                          "Dottore, il suo debito TFR è un **assegno in bianco** firmato alla inflazione. Senza esternalizzazione, il bilancio continuerà a finanziare passività invece che investimenti."
                       </p>
                    </div>
                 </div>
                 <div className="text-center md:text-right shrink-0">
                    <p className="text-[9px] font-black text-slate-400 uppercase">Perdita in tasca all'imprenditore:</p>
                    <p className="text-3xl font-black text-indigo-600">{formatCurrency(finalPoint?.totalInterestCost || 0)}</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CorporateSimulatorView;