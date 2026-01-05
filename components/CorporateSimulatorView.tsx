
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
  Coins, Minus
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const formatCurrency = (val: number) => 
  new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);

const CorporateSimulatorView: React.FC = () => {
  const [initialStock, setInitialStock] = useState<number>(100000);
  const [numEmployees, setNumEmployees] = useState<number>(10);
  const [avgSalary, setAvgSalary] = useState<number>(35000);
  const [salaryGrowth, setSalaryGrowth] = useState<number>(2.0); 
  const [selectedBenchmarkId, setSelectedBenchmarkId] = useState<string>('jpmGlobal');
  const [visibleSeries, setVisibleSeries] = useState({ asset: true, debt: true, nominal: true });
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
      alert("Errore nel recupero dei dati. Assicurati che la chiave API sia configurata su Vercel.");
    } finally {
      setIsSearching(false);
    }
  };

  const historicalAnalysis = useMemo(() => {
    let currentDebt = initialStock;
    let currentAsset = initialStock;
    let currentNominal = initialStock;
    let currentSalary = avgSalary; 
    const filteredSource = HISTORICAL_DATA_20Y.filter(d => d.year >= startYear && d.year <= endYear);
    
    return filteredSource.map(point => {
      const yearlyAccrual = (numEmployees * currentSalary) / 13.5;
      const tfrReval = currentDebt * (point.tfrRate / 100);
      currentDebt = currentDebt + tfrReval + yearlyAccrual;
      let mktPerf = point[selectedBenchmarkId as keyof typeof point] as number;
      if (customReturns) mktPerf = customReturns[point.year] ?? mktPerf;
      const assetReturn = currentAsset * (mktPerf / 100);
      currentAsset = currentAsset + assetReturn + yearlyAccrual;
      currentNominal = currentNominal + yearlyAccrual;
      const result = {
        ...point,
        debt: Math.round(currentDebt),
        asset: Math.round(currentAsset),
        nominal: Math.round(currentNominal),
        opportunityCost: Math.round(currentAsset - currentDebt)
      };
      currentSalary = currentSalary * (1 + salaryGrowth / 100);
      return result;
    });
  }, [initialStock, numEmployees, avgSalary, salaryGrowth, selectedBenchmarkId, startYear, endYear, customReturns]);

  const finalPoint = historicalAnalysis[historicalAnalysis.length - 1];
  const compensatoryBonus = useMemo(() => {
     const iresRate = 0.24;
     const totalAccrualPeriod = historicalAnalysis.reduce((sum, item) => sum + (numEmployees * avgSalary / 13.5), 0);
     return (totalAccrualPeriod * 0.06) * iresRate;
  }, [historicalAnalysis, numEmployees, avgSalary]);

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-fade-in pb-20">
      <div className="bg-[#0f172a] rounded-[3rem] p-10 text-white shadow-xl relative border-b-8 border-indigo-600">
        <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
           <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                 <div className="bg-indigo-600 p-3 rounded-2xl shadow-lg"><Factory size={28}/></div>
                 <span className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-400">Corporate Wealth Analytics</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-none">Audit del <span className="text-indigo-500">Patrimonio</span></h1>
              <p className="text-slate-400 text-xl font-medium max-w-xl">Analisi dell'impatto macroeconomico sul TFR aziendale negli ultimi {endYear - startYear + 1} anni.</p>
           </div>
           <div className="lg:col-span-5 bg-white/5 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white/10 text-center relative overflow-hidden">
              <p className="text-[10px] font-black uppercase text-indigo-300 mb-2 tracking-widest">Efficienza Patrimoniale Mancata</p>
              <p className={`text-7xl font-black tracking-tighter ${finalPoint?.opportunityCost > 0 ? 'text-emerald-400' : 'text-rose-500'}`}>{formatCurrency(finalPoint?.opportunityCost || 0)}</p>
           </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm space-y-8">
             <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Settings2 size={14} className="text-indigo-600" /> Configurazione Audit</h4>
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <p className="text-[9px] font-black text-slate-500 mb-1 uppercase">Dal</p>
                  <select value={startYear} onChange={(e) => setStartYear(Number(e.target.value))} className="w-full bg-transparent font-black text-sm outline-none">
                    {availableYears.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <p className="text-[9px] font-black text-slate-500 mb-1 uppercase">Al</p>
                  <select value={endYear} onChange={(e) => setEndYear(Number(e.target.value))} className="w-full bg-transparent font-black text-sm outline-none">
                    {availableYears.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
             </div>
             <div className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                   <p className="text-[10px] font-black text-slate-500 mb-1 uppercase">Stock TFR (€)</p>
                   <input type="number" value={initialStock} onChange={(e) => setInitialStock(Number(e.target.value))} className="w-full bg-transparent font-black text-2xl outline-none" />
                </div>
             </div>
             <div className="pt-6 border-t border-slate-100 space-y-4">
                <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2"><Sparkles size={14} /> Intelligence Certificata</h4>
                <div className="relative">
                   <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                   <input type="text" placeholder="Nome Fondo o Indice..." value={customSearch} onChange={(e) => setCustomSearch(e.target.value)} className="w-full pl-11 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-indigo-500 transition-all font-bold text-sm" />
                </div>
                <button onClick={handleSearchCustomIndex} disabled={isSearching || !customSearch} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:bg-indigo-600 disabled:bg-slate-200 transition-all flex justify-center items-center gap-3">
                  {isSearching ? <Loader2 className="animate-spin" size={18} /> : <Globe size={18} />} Valida Dati Web
                </button>
             </div>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-6">
           <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm relative flex flex-col h-full">
              <div className="flex justify-between items-center mb-10">
                 <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic">Analisi Patrimoniale Dinamica</h3>
                 <div className="flex gap-2">
                    <button onClick={() => setVisibleSeries(v => ({...v, asset: !v.asset}))} className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase transition-all ${visibleSeries.asset ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-400'}`}>Patrimonio</button>
                    <button onClick={() => setVisibleSeries(v => ({...v, debt: !v.debt}))} className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase transition-all ${visibleSeries.debt ? 'bg-rose-600 text-white shadow-md' : 'bg-slate-100 text-slate-400'}`}>Debito TFR</button>
                 </div>
              </div>
              <div className="flex-1 h-[450px]">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={historicalAnalysis}>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                       <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
                       <YAxis tickFormatter={(v) => `€${(v/1000).toFixed(0)}k`} axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                       <Tooltip contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'}} />
                       <Area type="monotone" dataKey="asset" stroke="#6366f1" strokeWidth={5} fill="#6366f1" fillOpacity={0.1} name={customLabel || selectedBenchmark.name} hide={!visibleSeries.asset}/>
                       <Area type="monotone" dataKey="debt" stroke="#f43f5e" strokeWidth={3} fill="#f43f5e" fillOpacity={0.05} name="Debito TFR" hide={!visibleSeries.debt}/>
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </div>

           {/* GROUNDING SOURCES & EXPLANATION */}
           {customSources.length > 0 && (
             <div className="bg-white rounded-[3rem] p-10 border border-slate-200 shadow-xl space-y-6 animate-fade-in">
                <div className="flex items-center gap-3">
                   <div className="bg-indigo-600 p-2 rounded-xl text-white"><Globe size={20} /></div>
                   <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic">Analisi Intelligence AI</h3>
                </div>
                {customExplanation && (
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                     <p className="text-sm text-slate-600 italic leading-relaxed whitespace-pre-wrap">{customExplanation}</p>
                  </div>
                )}
                <div className="space-y-4">
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2"><LinkIcon size={14} /> Fonti Verificate</h4>
                   <div className="flex flex-wrap gap-3">
                      {customSources.map((s, i) => (
                         <a key={i} href={s.uri} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-indigo-600 hover:bg-indigo-50 transition-colors shadow-sm">
                            {s.title} <ExternalLink size={12} />
                         </a>
                      ))}
                   </div>
                </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default CorporateSimulatorView;
