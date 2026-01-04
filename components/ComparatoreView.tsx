
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

const ComparatoreView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'TUTTI' | 'AZIONARIO' | 'BILANCIATO' | 'PRUDENTE_OBB' | 'GARANTITO'>('TUTTI');
  const [activeType, setActiveType] = useState<'TUTTI' | 'FPA' | 'PIP'>('TUTTI');
  const [activeCompany, setActiveCompany] = useState<string>('TUTTE');
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>(['Z_PIP_AZN', 'A_FPA_C25']);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Stato AI
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiProducts, setAiProducts] = useState<FundPerformanceResponse[]>([]);

  // Database unificato (locale + risultati AI)
  const unifiedDatabase = useMemo(() => {
    return [...COVIP_MARKET_DATA, ...aiProducts];
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
        // Evita duplicati se l'utente clicca più volte lo stesso termine
        if (prev.some(p => p.name === result.name)) return prev;
        return [...prev, result];
      });
      // Aggiungi automaticamente ai selezionati
      if (!selectedProductIds.includes(result.id)) {
        setSelectedProductIds(prev => [...prev, result.id]);
      }
      setSearchTerm(''); // Pulisci ricerca dopo successo
    } catch (err) {
      alert("Impossibile recuperare i dati dal web. Verifica il nome del fondo.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setActiveCategory('TUTTI');
    setActiveType('TUTTI');
    setActiveCompany('TUTTE');
  };

  // Fix: Aggregate all grounding sources from AI-discovered products for mandatory display
  const allAiSources = useMemo(() => {
    const sourcesMap = new Map();
    aiProducts.forEach(p => {
      p.sources?.forEach(s => sourcesMap.set(s.uri, s));
    });
    return Array.from(sourcesMap.values());
  }, [aiProducts]);

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-20">
      
      {/* HEADER STRATEGICO */}
      <div className="bg-[#0a0f1d] rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden border-b-8 border-indigo-600">
         <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12"><Landmark size={200} /></div>
         <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
               <div className="flex items-center gap-3 mb-2">
                  <div className="bg-indigo-600 p-2 rounded-xl"><ArrowRightLeft size={24} /></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 italic">Analisi Comparativa Fondi Pensione 2024</span>
               </div>
               <h2 className="text-4xl font-black uppercase tracking-tighter italic">Market Asset <span className="text-indigo-500">Benchmark</span></h2>
               <p className="text-slate-400 mt-2 font-medium italic leading-relaxed max-w-xl">
                  Confronta i rendimenti Zurich e Anima con quelli dei competitor. Usa l'AI per recuperare dati in tempo reale dal web.
               </p>
            </div>
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10 text-center">
               <p className="text-[9px] font-black uppercase text-amber-500 mb-1 tracking-widest">Database Intelligence</p>
               <p className="text-xl font-black text-white">Hybrid Analysis</p>
               <p className="text-[9px] font-bold text-slate-500 uppercase mt-1 italic tracking-widest">Locale + Real-Time Search</p>
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
                     placeholder="Cerca Società o Fondo (es. 'Axa Previdenza', 'Amundi')..." 
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                     onKeyDown={(e) => e.key === 'Enter' && handleAiSearch()}
                     className="w-full pl-12 pr-10 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 focus:bg-white transition-all"
                  />
                  {searchTerm && (
                    <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                      <X size={18} />
                    </button>
                  )}
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
               <button onClick={clearFilters} className="text-[10px] font-black uppercase text-slate-400 hover:text-rose-600 flex items-center gap-1 transition-colors">
                  <RefreshCw size={14} /> Resetta Filtri
               </button>
            </div>
         </div>

         <div className="flex flex-wrap gap-4 items-center pt-2 border-t border-slate-50">
            <div className="flex items-center gap-2">
               <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Categoria:</span>
               <div className="flex gap-1">
                  {(['TUTTI', 'AZIONARIO', 'BILANCIATO', 'GARANTITO'] as const).map(cat => (
                     <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase transition-all ${activeCategory === cat ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
                        {cat === 'TUTTI' ? 'TUTTE' : cat}
                     </button>
                  ))}
               </div>
            </div>
            <div className="flex items-center gap-2 ml-auto">
               <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Tipo:</span>
               <div className="flex gap-1">
                  {(['TUTTI', 'FPA', 'PIP'] as const).map(t => (
                     <button key={t} onClick={() => setActiveType(t)} className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase transition-all ${activeType === t ? 'bg-slate-800 text-white shadow-sm' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
                        {t}
                     </button>
                  ))}
               </div>
            </div>
         </div>
      </div>

      {/* GRAFICO COMPARATIVO */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden">
         <div className="flex justify-between items-center mb-12">
            <div>
               <h3 className="text-sm font-black text-slate-800 uppercase tracking-[0.2em] flex items-center gap-2">
                  <TrendingUp size={16} className="text-indigo-600" /> Rendimenti Netti Multi-Periodo (%)
               </h3>
            </div>
            <div className="flex gap-6 text-[9px] font-black text-slate-400 uppercase tracking-widest">
               <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-indigo-300"></div> Netto 2024</div>
               <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-indigo-600"></div> Media 5 Anni</div>
               <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-slate-900"></div> Media 10 Anni</div>
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
                     <Bar dataKey="y5" name="Media 5Y" fill="#4f46e5" radius={[8, 8, 0, 0]} barSize={22} />
                     <Bar dataKey="y10" name="Media 10Y" fill="#0f172a" radius={[8, 8, 0, 0]} barSize={22} />
                  </BarChart>
               </ResponsiveContainer>
            ) : (
               <div className="h-full flex flex-col items-center justify-center text-slate-300 border-4 border-dashed border-slate-50 rounded-[4rem]">
                  <BarChart3 size={80} className="mb-4 opacity-5" />
                  <p className="text-sm font-black uppercase tracking-widest text-slate-400">
                     Seleziona i comparti dalla lista qui sotto
                  </p>
               </div>
            )}
         </div>
      </div>

      {/* DATABASE INTEGRALE */}
      <div className="bg-white rounded-[3rem] border border-slate-200 shadow-xl overflow-hidden">
         <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic">Database Comparti Integrale</h3>
            <div className="flex items-center gap-4">
               {isAiLoading && <div className="flex items-center gap-2 text-[10px] font-black text-indigo-600 animate-pulse"><Loader2 className="animate-spin" size={14}/> ANALISI AI IN CORSO...</div>}
               <span className="text-[10px] font-black text-slate-400 uppercase">Selezione: {selectedProductIds.length}/10</span>
            </div>
         </div>

         <div className="overflow-x-auto max-h-[600px] overflow-y-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
               <thead className="sticky top-0 z-20">
                  <tr className="bg-[#0f172a] text-white text-[9px] font-black uppercase tracking-[0.2em]">
                     <th className="px-8 py-6">Fondo / Società / Comparto</th>
                     <th className="px-4 py-6 text-center">Tipo</th>
                     <th className="px-6 py-6 text-center text-emerald-400">Netto 2024</th>
                     <th className="px-6 py-6 text-center">M. 5Y</th>
                     <th className="px-6 py-6 text-center">M. 10Y</th>
                     <th className="px-8 py-6 text-right">Azione</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {filteredProducts.map((p) => {
                     const isSelected = selectedProductIds.includes(p.id);
                     const isAiGenerated = p.id.startsWith('AI_');
                     
                     return (
                        <tr key={p.id} className={`hover:bg-slate-50 transition-colors ${isSelected ? 'bg-indigo-50/50' : ''}`}>
                           <td className="px-8 py-5">
                              <div className="flex items-center gap-4">
                                 <div className={`w-3 h-3 rounded-full ${isSelected ? 'bg-indigo-600' : 'bg-slate-200'}`}></div>
                                 <div>
                                    <div className="flex items-center gap-2">
                                       <p className={`text-[10px] font-black uppercase leading-none ${p.company === 'ZURICH' ? 'text-indigo-600' : 'text-slate-400'}`}>{p.company}</p>
                                       {isAiGenerated && <span className="bg-amber-100 text-amber-700 text-[8px] font-black px-1.5 py-0.5 rounded uppercase flex items-center gap-1"><Sparkles size={8}/> AI DATA</span>}
                                    </div>
                                    <p className="text-sm font-black uppercase tracking-tighter mt-1 text-slate-800">{p.name}</p>
                                 </div>
                              </div>
                           </td>
                           <td className="px-4 py-5 text-center">
                              <span className="text-[9px] font-black px-2 py-1 rounded bg-slate-100 text-slate-600 border border-slate-200">{p.type}</span>
                           </td>
                           <td className={`px-6 py-5 text-center text-lg font-black ${p.y1 > 12 ? 'text-emerald-600' : 'text-slate-900'}`}>
                              +{p.y1.toFixed(2)}%
                           </td>
                           <td className="px-6 py-5 text-center font-bold text-slate-500 text-sm">{p.y5 > 0 ? `${p.y5.toFixed(2)}%` : '-'}</td>
                           <td className="px-6 py-5 text-center font-bold text-slate-900 text-sm">{p.y10 > 0 ? `${p.y10.toFixed(2)}%` : '-'}</td>
                           <td className="px-8 py-5 text-right">
                              <button 
                                 onClick={() => toggleProduct(p.id)}
                                 className={`p-2.5 rounded-xl transition-all ${isSelected ? 'bg-indigo-600 text-white shadow-lg rotate-180' : 'bg-slate-100 text-slate-400 hover:bg-indigo-600 hover:text-white'}`}
                              >
                                 {isSelected ? <MinusCircle size={20} /> : <PlusCircle size={20} />}
                              </button>
                           </td>
                        </tr>
                     );
                  })}
               </tbody>
            </table>
         </div>
      </div>

      {/* Fix: Display mandatory grounding sources for AI search results */}
      {allAiSources.length > 0 && (
         <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm animate-fade-in">
            <h4 className="text-xs font-black uppercase tracking-widest text-indigo-900 mb-4 flex items-center gap-2">
               <LinkIcon size={14} /> Fonti Grounding AI (Rendimenti Verificati)
            </h4>
            <div className="flex flex-wrap gap-3">
               {allAiSources.map((source, idx) => (
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

      {/* ALERT STRATEGICO */}
      {filteredProducts.length === 0 && !isAiLoading && (
        <div className="bg-indigo-50 border-2 border-dashed border-indigo-200 p-12 rounded-[3rem] text-center animate-pulse">
           <Globe className="mx-auto text-indigo-400 mb-4" size={48} />
           <h4 className="text-xl font-black text-indigo-900 uppercase italic">Nessun risultato locale trovato</h4>
           <p className="text-indigo-600 mt-2 font-medium">Usa il tasto <strong>"Cerca con AI"</strong> per estrarre i dati ufficiali COVIP 2024 dal web per <strong>"{searchTerm}"</strong>.</p>
        </div>
      )}
    </div>
  );
};

export default ComparatoreView;
