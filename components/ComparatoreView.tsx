
import React, { useState, useMemo } from 'react';
import { 
  BarChart3, Search, PlusCircle, MinusCircle, 
  Star, Award, List, ArrowRightLeft, FileText,
  Info, CheckCircle2, RefreshCw, Filter, TrendingUp,
  LayoutGrid, Landmark, ArrowUpRight, ShieldCheck,
  Zap, AlertTriangle, Building2, ChevronDown, 
  Layers, Loader2, Sparkles, X, Globe, Link as LinkIcon, ExternalLink
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';
import { COVIP_MARKET_DATA } from '../constants';
import { fetchFundPerformance, FundPerformanceResponse } from '../services/geminiService';

// Benchmark estratti dal report COVIP 2024 (Supplementary Pension Funds: Main Data)
const COVIP_2024_BENCHMARKS = [
  { id: 'COVIP_FPN', company: 'BENCHMARK', name: 'Media Fondi Negoziali', type: 'FPA', category: 'BILANCIATO', y1: 6.0, y5: 2.2, y10: 2.2, isCore: false },
  { id: 'COVIP_FPA', company: 'BENCHMARK', name: 'Media Fondi Aperti', type: 'FPA', category: 'BILANCIATO', y1: 6.5, y5: 2.4, y10: 2.4, isCore: false },
  { id: 'COVIP_PIP', company: 'BENCHMARK', name: 'Media PIP Unit-Linked', type: 'PIP', category: 'AZIONARIO', y1: 9.0, y5: 3.0, y10: 2.9, isCore: false },
  { id: 'COVIP_TFR', company: 'INFLAZIONE', name: 'Rivalutazione TFR 2024', type: 'BENCH', category: 'GARANTITO', y1: 1.9, y5: 2.4, y10: 2.4, isCore: false }
];

const ComparatoreView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'TUTTI' | 'AZIONARIO' | 'BILANCIATO' | 'PRUDENTE_OBB' | 'GARANTITO'>('TUTTI');
  const [activeType, setActiveType] = useState<'TUTTI' | 'FPA' | 'PIP'>('TUTTI');
  const [activeCompany, setActiveCompany] = useState<string>('TUTTE');
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>(['Z_PIP_AZN', 'A_FPA_C25', 'COVIP_TFR']);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Stato AI
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiProducts, setAiProducts] = useState<FundPerformanceResponse[]>([]);

  // Database unificato (locale + benchmarks COVIP 2024 + risultati AI)
  const unifiedDatabase = useMemo(() => {
    return [...COVIP_MARKET_DATA, ...COVIP_2024_BENCHMARKS, ...aiProducts];
  }, [aiProducts]);

  const companies = useMemo(() => {
    const list = Array.from(new Set(unifiedDatabase.map(p => p.company)));
    return ['TUTTE', ...list.sort()];
  }, [unifiedDatabase]);

  const filteredProducts = useMemo(() => {
    return unifiedDatabase.filter(p => {
      const matchesCategory = activeCategory === 'TUTTI' || p.category === activeCategory;
      const matchesType = activeType === 'TUTTI' || p.type === activeType;
      const matchesCompany = activeCompany === 'TUTTE' || p.company === activeCompany;
      const matchesSearch = p.company.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           p.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesType && matchesCompany && matchesSearch;
    }).sort((a, b) => b.y1 - a.y1);
  }, [activeCategory, activeType, activeCompany, searchTerm, unifiedDatabase]);

  const chartData = useMemo(() => {
    return unifiedDatabase.filter(p => selectedProductIds.includes(p.id));
  }, [selectedProductIds, unifiedDatabase]);

  const toggleProduct = (id: string) => {
    setSelectedProductIds(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id].slice(0, 10)
    );
  };

  const handleAiSearch = async () => {
    if (!searchTerm.trim()) return;
    setIsAiLoading(true);
    try {
      const result = await fetchFundPerformance(searchTerm);
      setAiProducts(prev => {
        if (prev.some(p => p.name === result.name)) return prev;
        return [...prev, result];
      });
      if (!selectedProductIds.includes(result.id)) {
        setSelectedProductIds(prev => [...prev, result.id]);
      }
      setSearchTerm('');
    } catch (err) {
      alert("Impossibile recuperare i dati dal web. Verifica il nome del fondo.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const allAiSources = useMemo(() => {
    const sourcesMap = new Map();
    aiProducts.forEach(p => {
      p.sources?.forEach(s => sourcesMap.set(s.uri, s));
    });
    return Array.from(sourcesMap.values());
  }, [aiProducts]);

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-20">
      
      {/* HEADER STRATEGICO CON DATI REPORT */}
      <div className="bg-[#0a0f1d] rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden border-b-8 border-indigo-600">
         <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12"><Landmark size={200} /></div>
         <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
               <div className="flex items-center gap-3 mb-2">
                  <div className="bg-indigo-600 p-2 rounded-xl"><ArrowRightLeft size={24} /></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 italic">Market Benchmark - Relazione COVIP 2024</span>
               </div>
               <h2 className="text-4xl font-black uppercase tracking-tighter italic">Analisi <span className="text-indigo-500">Rendimenti Netti</span></h2>
               <p className="text-slate-400 mt-2 font-medium italic leading-relaxed max-w-xl">
                  Confronta Zurich e Anima con le medie nazionali. Nota: Nel 2024 l'azionario ha reso il 10,4% vs 1,9% del TFR.
               </p>
            </div>
            <div className="bg-emerald-500/10 backdrop-blur-md p-6 rounded-3xl border border-emerald-500/20 text-center">
               <p className="text-[9px] font-black uppercase text-emerald-500 mb-1 tracking-widest">Delta TFR 2024</p>
               <p className="text-3xl font-black text-white">+7,1%</p>
               <p className="text-[9px] font-bold text-slate-500 uppercase mt-1 italic">Gap Azionario vs Azienda</p>
            </div>
         </div>
      </div>

      {/* BARRA FILTRI & RICERCA AI */}
      <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-4">
         <div className="grid lg:grid-cols-12 gap-4 items-center">
            <div className="lg:col-span-8 flex gap-2">
               <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                     type="text" 
                     placeholder="Analisi Competitor (es. 'Generali', 'Axa')..." 
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                     onKeyDown={(e) => e.key === 'Enter' && handleAiSearch()}
                     className="w-full pl-12 pr-10 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all"
                  />
               </div>
               <button 
                  onClick={handleAiSearch}
                  disabled={!searchTerm || isAiLoading}
                  className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 text-white px-6 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg flex items-center gap-2 transition-all"
               >
                  {isAiLoading ? <Loader2 className="animate-spin" size={16} /> : <Globe size={16} />}
                  {isAiLoading ? "Analisi..." : "Cerca con AI"}
               </button>
            </div>

            <div className="lg:col-span-4 flex justify-end">
               <button onClick={() => { setSearchTerm(''); setActiveCategory('TUTTI'); setActiveType('TUTTI'); }} className="text-[10px] font-black uppercase text-slate-400 hover:text-rose-600 flex items-center gap-1 transition-colors">
                  <RefreshCw size={14} /> Resetta Filtri
               </button>
            </div>
         </div>
      </div>

      {/* GRAFICO COMPARATIVO */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden">
         <div className="flex justify-between items-center mb-12">
            <div>
               <h3 className="text-sm font-black text-slate-800 uppercase tracking-[0.2em] flex items-center gap-2">
                  <TrendingUp size={16} className="text-indigo-600" /> Performance vs Benchmark COVIP 2024 (%)
               </h3>
            </div>
            <div className="flex gap-6 text-[9px] font-black text-slate-400 uppercase tracking-widest">
               <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-indigo-300"></div> Netto 2024</div>
               <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-indigo-600"></div> Media 10 Anni</div>
            </div>
         </div>
         
         <div className="h-[400px] w-full">
            {chartData.length > 0 ? (
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 40 }}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fontSize: 8, fontWeight: '900', fill: '#475569'}} 
                        angle={-25} 
                        textAnchor="end" 
                        interval={0} 
                     />
                     <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} unit="%" />
                     <Tooltip 
                        cursor={{fill: '#f8fafc'}}
                        contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.2)'}} 
                        formatter={(val: number) => [`${val.toFixed(2)}%`, '']}
                     />
                     <Bar dataKey="y1" name="Netto 2024" fill="#818cf8" radius={[8, 8, 0, 0]} barSize={22} />
                     <Bar dataKey="y10" name="Media 10Y" fill="#0f172a" radius={[8, 8, 0, 0]} barSize={22} />
                  </BarChart>
               </ResponsiveContainer>
            ) : (
               <div className="h-full flex flex-col items-center justify-center text-slate-300 border-4 border-dashed border-slate-50 rounded-[4rem]">
                  <BarChart3 size={80} className="mb-4 opacity-5" />
                  <p className="text-sm font-black uppercase tracking-widest text-slate-400">Seleziona i comparti dalla lista</p>
               </div>
            )}
         </div>
      </div>

      {/* DATABASE INTEGRALE */}
      <div className="bg-white rounded-[3rem] border border-slate-200 shadow-xl overflow-hidden">
         <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic">Database Comparti & Medie COVIP</h3>
            <div className="flex items-center gap-4">
               {isAiLoading && <div className="flex items-center gap-2 text-[10px] font-black text-indigo-600 animate-pulse"><Loader2 className="animate-spin" size={14}/> ANALISI AI...</div>}
               <span className="text-[10px] font-black text-slate-400 uppercase">Selezione: {selectedProductIds.length}/10</span>
            </div>
         </div>

         <div className="overflow-x-auto max-h-[500px] overflow-y-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
               <thead className="sticky top-0 z-20">
                  <tr className="bg-[#0f172a] text-white text-[9px] font-black uppercase tracking-[0.2em]">
                     <th className="px-8 py-6">Fondo / Società / Benchmark</th>
                     <th className="px-6 py-6 text-center text-emerald-400">Netto 2024</th>
                     <th className="px-6 py-6 text-center">Media 10Y</th>
                     <th className="px-8 py-6 text-right">Azione</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {filteredProducts.map((p) => {
                     const isSelected = selectedProductIds.includes(p.id);
                     const isBench = p.company === 'BENCHMARK' || p.company === 'INFLAZIONE';
                     
                     return (
                        <tr key={p.id} className={`hover:bg-slate-50 transition-colors ${isSelected ? 'bg-indigo-50/50' : ''}`}>
                           <td className="px-8 py-5">
                              <div className="flex items-center gap-4">
                                 <div className={`w-3 h-3 rounded-full ${isSelected ? 'bg-indigo-600' : 'bg-slate-200'}`}></div>
                                 <div>
                                    <div className="flex items-center gap-2">
                                       <p className={`text-[10px] font-black uppercase leading-none ${isBench ? 'text-rose-500' : 'text-slate-400'}`}>{p.company}</p>
                                    </div>
                                    <p className={`text-sm font-black uppercase tracking-tighter mt-1 ${isBench ? 'text-slate-900 italic' : 'text-slate-700'}`}>{p.name}</p>
                                 </div>
                              </div>
                           </td>
                           <td className={`px-6 py-5 text-center text-lg font-black ${p.y1 > 8 ? 'text-emerald-600' : 'text-slate-900'}`}>
                              +{p.y1.toFixed(1)}%
                           </td>
                           <td className="px-6 py-5 text-center font-bold text-slate-500 text-sm">{p.y10 > 0 ? `${p.y10.toFixed(1)}%` : '-'}</td>
                           <td className="px-8 py-5 text-right">
                              <button 
                                 onClick={() => toggleProduct(p.id)}
                                 className={`p-2 rounded-xl transition-all ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400 hover:bg-indigo-600 hover:text-white'}`}
                              >
                                 {isSelected ? <MinusCircle size={18} /> : <PlusCircle size={18} />}
                              </button>
                           </td>
                        </tr>
                     );
                  })}
               </tbody>
            </table>
         </div>
      </div>

      {allAiSources.length > 0 && (
         <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm animate-fade-in">
            <h4 className="text-xs font-black uppercase tracking-widest text-indigo-900 mb-4 flex items-center gap-2">
               <LinkIcon size={14} /> Fonti Grounding AI (Rendimenti Verificati)
            </h4>
            <div className="flex flex-wrap gap-3">
               {allAiSources.map((source, idx) => (
                  <a key={idx} href={source.uri} target="_blank" rel="noopener noreferrer" className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all flex items-center gap-2">
                     {source.title} <ExternalLink size={12} />
                  </a>
               ))}
            </div>
         </div>
      )}
    </div>
  );
};

export default ComparatoreView;
