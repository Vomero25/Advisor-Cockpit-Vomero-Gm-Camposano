
import React, { useState, useMemo } from 'react';
import { ZURICH_PRODUCT_DATA, ZURICH_REGULATION_DATA, ZURICH_REMUNERATION_DATA } from '../constants';
import { 
  ShieldPlus, TrendingUp, UserCheck, Wallet, PieChart, Layers, 
  Search, BookOpen, FileText, CheckCircle2, Calculator, 
  ReceiptEuro, HelpCircle, ArrowUpRight, DollarSign, Info, 
  ShieldCheck, Target, Activity, HeartPulse, Scale, AlertTriangle, ChevronRight
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const ProductAnalysisView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'PANORAMICA' | 'INVESTIMENTI' | 'LTC' | 'REMUNERAZIONE' | 'REGOLAMENTO'>('PANORAMICA');
  const [searchQuery, setSearchQuery] = useState('');

  // --- STATI TAB REMUNERAZIONE ---
  const [advisorAumTierIndex, setAdvisorAumTierIndex] = useState<number>(3); 
  const [annualContribution, setAnnualContribution] = useState<number>(5164);
  const [existingStock, setExistingStock] = useState<number>(10000);
  const [contributionType, setContributionType] = useState<'RECURRING_LTC' | 'RECURRING_NO_LTC' | 'ADDITIONAL' | 'TRANSFER_TFR'>('RECURRING_LTC');
  const [selectedFundIdx, setSelectedFundIdx] = useState<number>(0);

  // --- STATI TAB LTC ---
  const [baseAnnuity, setBaseAnnuity] = useState<number>(1000);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'UserCheck': return <UserCheck size={28} className="text-blue-600" />;
      case 'Wallet': return <Wallet size={28} className="text-green-600" />;
      case 'ShieldPlus': return <ShieldPlus size={28} className="text-purple-600" />;
      case 'PieChart': return <PieChart size={28} className="text-indigo-600" />;
      default: return <TrendingUp size={28} className="text-slate-600" />;
    }
  };

  const profitability = useMemo(() => {
    // Fix: Added safety check for sales payout rate access to handle potential index-out-of-bounds
    const salesPayoutRate = ZURICH_REMUNERATION_DATA.SALES_PAYOUT[advisorAumTierIndex]?.rate ?? ZURICH_REMUNERATION_DATA.SALES_PAYOUT[0].rate;
    // Fix: Safely access management payout rate by falling back to the first available entry if the specific index is missing
    const mgmtPayoutRate = ZURICH_REMUNERATION_DATA.MANAGEMENT_PAYOUT[advisorAumTierIndex]?.rate ?? ZURICH_REMUNERATION_DATA.MANAGEMENT_PAYOUT[0].rate;
    let zbRetroRate = 0;
    if (contributionType === 'RECURRING_LTC') zbRetroRate = ZURICH_REMUNERATION_DATA.RETROCESSIONS_ZB.RECURRING_WITH_LTC;
    else if (contributionType === 'RECURRING_NO_LTC') zbRetroRate = ZURICH_REMUNERATION_DATA.RETROCESSIONS_ZB.RECURRING_NO_LTC;
    else if (contributionType === 'ADDITIONAL') zbRetroRate = ZURICH_REMUNERATION_DATA.RETROCESSIONS_ZB.ADDITIONAL;
    else zbRetroRate = ZURICH_REMUNERATION_DATA.RETROCESSIONS_ZB.TRANSFER_TFR;

    const zbCommissionUpfront = annualContribution * zbRetroRate;
    const advisorUpfront = zbCommissionUpfront * salesPayoutRate;
    const selectedFund = ZURICH_PRODUCT_DATA.FUNDS_DETAILS[selectedFundIdx];
    const mgmtFeePct = parseFloat(selectedFund.cost.replace(',', '.').replace('%', '')) / 100;
    const zbCommissionMgmt = (existingStock + annualContribution) * mgmtFeePct;
    const advisorRecurring = zbCommissionMgmt * mgmtPayoutRate;

    return { salesPayoutRate, mgmtPayoutRate, zbRetroRate, advisorUpfront, advisorRecurring, totalAdvisorRevenue: advisorUpfront + advisorRecurring, mgmtFeePct };
  }, [advisorAumTierIndex, annualContribution, existingStock, contributionType, selectedFundIdx]);

  // --- LOGICA FILTRO REGOLAMENTO ---
  const filteredRegs = useMemo(() => {
    if (!searchQuery.trim()) return ZURICH_REGULATION_DATA;
    const query = searchQuery.toLowerCase();
    return ZURICH_REGULATION_DATA.filter(item => 
      item.art.toLowerCase().includes(query) || 
      item.content.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="bg-[#233D7B] rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2 opacity-80">
            <ShieldPlus size={20} />
            <span className="text-sm font-semibold tracking-wider uppercase">Analisi Prodotto</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Zurich Spazio Previdenza</h1>
          <p className="text-blue-100 max-w-2xl text-lg">PIP Multiramo di eccellenza. Gestione del rischio attiva e consolidamento progressivo dei risultati.</p>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-blue-500 opacity-10 transform skew-x-12"></div>
      </div>

      {/* Navigation */}
      <div className="flex overflow-x-auto gap-2 pb-2 border-b border-slate-200 no-scrollbar">
        {[
          { id: 'PANORAMICA', label: 'Panoramica & Costi', icon: Layers },
          { id: 'INVESTIMENTI', label: 'Investimenti & Life Cycle', icon: Activity, badge: 'TECNICO' },
          { id: 'LTC', label: 'Garanzie & LTC', icon: ShieldCheck },
          { id: 'REMUNERAZIONE', label: 'Profitto Advisor', icon: ReceiptEuro },
          { id: 'REGOLAMENTO', label: 'Regolamento', icon: BookOpen }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-3 font-medium text-sm whitespace-nowrap transition-all rounded-t-lg border-b-2 flex items-center gap-2 relative ${activeTab === tab.id ? 'border-[#233D7B] text-[#233D7B] bg-blue-50' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
          >
            <tab.icon size={16} />
            {tab.label}
            {tab.badge && <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase">{tab.badge}</span>}
          </button>
        ))}
      </div>

      {/* --- TAB INVESTIMENTI --- */}
      {activeTab === 'INVESTIMENTI' && (
        <div className="space-y-8 animate-fade-in">
           <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                 <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 uppercase tracking-tighter">
                       <Target size={24} className="text-[#233D7B]" />
                       I 4 Pilastri del Multiramo
                    </h3>
                 </div>
                 <div className="grid gap-4">
                    {ZURICH_PRODUCT_DATA.FUNDS_DETAILS.map((fund, idx) => (
                       <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-[#233D7B] transition-all group">
                          <div className="flex justify-between items-start mb-4">
                             <div>
                                <h4 className="font-black text-slate-800 text-lg leading-tight">{fund.name}</h4>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{fund.strategy}</span>
                             </div>
                             <div className={`px-3 py-1 rounded-full text-[10px] font-black ${fund.risk === 'Alto' ? 'bg-red-50 text-red-600' : fund.risk === 'Basso' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                                RISCHIO {fund.risk.toUpperCase()}
                             </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4 mb-4">
                             <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Costo (TER)</p>
                                <p className="text-sm font-bold text-slate-700">{fund.cost}</p>
                             </div>
                             <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Rend. 2024</p>
                                <p className="text-sm font-bold text-emerald-600">{fund.perf2024}</p>
                             </div>
                          </div>
                          <div className="space-y-2">
                             <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase">
                                <span>Asset Mix</span>
                                <span>{fund.composition.equity}% Azionario</span>
                             </div>
                             <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden flex">
                                <div className="h-full bg-[#233D7B]" style={{width: `${fund.composition.equity}%`}}></div>
                                <div className="h-full bg-slate-300" style={{width: `${fund.composition.debt}%`}}></div>
                             </div>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
                 <div className="mb-8">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 uppercase tracking-tighter">Motore Life Cycle</h3>
                    <p className="text-sm text-slate-500 leading-relaxed italic">Ribilanciamento automatico annuale: il capitale si sposta progressivamente verso la stabilità.</p>
                 </div>
                 <div className="flex-1 h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                       <AreaChart data={ZURICH_PRODUCT_DATA.LIFE_CYCLE_SERIES} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="age" tick={{fontSize: 11, fontWeight: 'bold'}} />
                          <YAxis tick={{fontSize: 11}} unit="%" />
                          <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'}} />
                          <Legend iconType="circle" />
                          <Area type="monotone" dataKey="gs" name="Gestione Separata" stackId="1" stroke="#233D7B" fill="#233D7B" fillOpacity={0.8} />
                          <Area type="monotone" dataKey="flex4" name="Flex 4" stackId="1" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.6} />
                          <Area type="monotone" dataKey="flex8" name="Flex 8" stackId="1" stroke="#818cf8" fill="#818cf8" fillOpacity={0.4} />
                          <Area type="monotone" dataKey="azionario" name="Azionario" stackId="1" stroke="#c7d2fe" fill="#c7d2fe" fillOpacity={0.2} />
                       </AreaChart>
                    </ResponsiveContainer>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* --- TAB GARANZIE & LTC (COMPLETA E CORRETTA) --- */}
      {activeTab === 'LTC' && (
        <div className="space-y-8 animate-fade-in">
           <div className="grid lg:grid-cols-12 gap-8">
              {/* Simulatore Rendita LTC */}
              <div className="lg:col-span-5 space-y-6">
                 <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5"><HeartPulse size={120} /></div>
                    <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                       <Calculator className="text-rose-600" />
                       Simulatore Opzione F (LTC)
                    </h3>
                    <div className="space-y-6">
                       <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-3">Rendita Base Stimata (€/mese)</label>
                          <input 
                            type="range" min="500" max="3000" step="50" 
                            value={baseAnnuity} 
                            onChange={(e) => setBaseAnnuity(Number(e.target.value))}
                            className="w-full h-2 bg-slate-100 rounded-lg appearance-none accent-rose-600"
                          />
                          <p className="text-2xl font-black text-slate-800 mt-2">{formatCurrency(baseAnnuity)}</p>
                       </div>

                       <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                             <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Scenario Standard</p>
                             <p className="text-lg font-bold text-slate-600">{formatCurrency(baseAnnuity)}</p>
                             <span className="text-[9px] text-slate-400 italic">Rendita Vitalizia</span>
                          </div>
                          <div className="p-4 bg-rose-50 rounded-2xl border border-rose-100 relative">
                             <div className="absolute top-2 right-2 text-rose-500"><TrendingUp size={14} /></div>
                             <p className="text-[10px] font-black text-rose-400 uppercase mb-1">In caso di LTC</p>
                             <p className="text-xl font-black text-rose-600">{formatCurrency(baseAnnuity * 2)}</p>
                             <span className="text-[9px] text-rose-400 font-bold uppercase tracking-tighter">Rendita Raddoppiata</span>
                          </div>
                       </div>

                       <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 flex gap-3">
                          <Info size={24} className="text-amber-600 shrink-0 mt-1" />
                          <p className="text-xs text-amber-900 leading-relaxed font-medium">
                             L'Opzione F garantisce il raddoppio della rendita vitalizia qualora l'aderente si trovi in stato di non autosufficienza al momento della liquidazione o successivamente.
                          </p>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Dettagli Tecnici Garanzie */}
              <div className="lg:col-span-7 space-y-6">
                 <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3 uppercase tracking-tighter">
                       <ShieldCheck className="text-blue-600" />
                       Protezione Caso Morte Integrata
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                       <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                          <h4 className="font-bold text-blue-900 mb-2">Bonus 1% Capitale</h4>
                          <p className="text-sm text-blue-800 leading-relaxed">
                             In caso di decesso dell'aderente prima del pensionamento, Zurich riconosce una maggiorazione dell'<strong>1%</strong> del capitale accumulato nei fondi interni.
                          </p>
                       </div>
                       <div className="p-6 bg-slate-900 rounded-2xl text-white">
                          <h4 className="font-bold text-amber-400 mb-2">Esenzione Fiscale</h4>
                          <p className="text-sm text-slate-300 leading-relaxed italic">
                             L'intera posizione liquidata ai beneficiari in caso di morte è **esente dall'imposta di successione** (Art. 12 D.Lgs 346/90).
                          </p>
                       </div>
                    </div>
                 </div>

                 <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                    <h4 className="font-black text-slate-800 text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
                       <Scale size={18} className="text-rose-600" />
                       Definizione ADL per Raddoppio Rendita
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                       {['Lavarsi', 'Vestirsi', 'Alimentarsi', 'Igiene Personale', 'Mobilità', 'Continenza'].map((adl) => (
                          <div key={adl} className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
                             <CheckCircle2 size={14} className="text-rose-500" />
                             <span className="text-xs font-bold text-slate-600">{adl}</span>
                          </div>
                       ))}
                    </div>
                    <p className="mt-4 text-[11px] text-slate-500 leading-relaxed">
                       *La prestazione LTC si attiva con l'incapacità di svolgere almeno 4 delle 6 attività elementari della vita quotidiana (ADL) sopra indicate.
                    </p>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* --- TAB REGOLAMENTO (FUNZIONANTE E COMPLETA) --- */}
      {activeTab === 'REGOLAMENTO' && (
        <div className="space-y-6 animate-fade-in">
           <div className="bg-slate-900 rounded-[32px] p-10 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-10 opacity-10"><BookOpen size={200} /></div>
              <div className="relative z-10 max-w-2xl">
                 <h2 className="text-3xl font-black mb-6 flex items-center gap-4 tracking-tighter">
                    <BookOpen className="text-amber-500" size={40} />
                    Knowledge Assistant
                 </h2>
                 <p className="text-indigo-200 mb-8 text-lg">Cerca istantaneamente articoli, clausole e condizioni nel regolamento ufficiale di Zurich Spazio Previdenza.</p>
                 <div className="relative group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-400 transition-colors" size={24} />
                    <input 
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Esempio: 'Riscatti', 'Anticipazione Casa', 'Beneficiari'..."
                      className="w-full pl-14 pr-6 py-6 rounded-3xl bg-slate-800 border border-slate-700 text-white text-xl outline-none focus:ring-4 focus:ring-amber-500/20 shadow-inner transition-all"
                    />
                 </div>
              </div>
           </div>
           
           <div className="grid gap-6">
              {filteredRegs.length > 0 ? (
                filteredRegs.map((item, idx) => (
                  <div key={idx} className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col md:flex-row items-start gap-8 group relative overflow-hidden">
                     <div className={`absolute top-0 left-0 w-2 h-full transition-colors ${
                       item.category === 'PRESTAZIONI' ? 'bg-amber-500' : 
                       item.category === 'COSTI' ? 'bg-rose-500' : 
                       item.category === 'SUCCESSIONE' ? 'bg-indigo-600' : 'bg-blue-600'
                     }`}></div>
                     
                     <div className="flex-shrink-0">
                        <div className="bg-slate-50 p-4 rounded-2xl text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all">
                           <FileText size={32} />
                        </div>
                     </div>
                     
                     <div className="flex-1 space-y-4">
                        <div className="flex flex-wrap items-center gap-3">
                           <h4 className="font-black text-slate-900 text-xl uppercase tracking-tighter">{item.art}</h4>
                           <span className="bg-slate-100 text-slate-500 text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">{item.category}</span>
                        </div>
                        <p className="text-slate-600 text-lg leading-relaxed font-medium">{item.content}</p>
                        
                        <div className="pt-4 flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                           Approfondisci Nota Informativa <ChevronRight size={14} />
                        </div>
                     </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-20 bg-white rounded-[40px] border-4 border-dashed border-slate-100">
                   <AlertTriangle className="mx-auto text-slate-300 mb-4" size={64} />
                   <p className="text-xl font-bold text-slate-400">Nessuna clausola trovata per "{searchQuery}"</p>
                   <button onClick={() => setSearchQuery('')} className="mt-4 text-blue-600 font-black uppercase tracking-widest hover:underline">Mostra tutto il regolamento</button>
                </div>
              )}
           </div>
        </div>
      )}

      {/* --- TAB REMUNERAZIONE --- */}
      {activeTab === 'REMUNERAZIONE' && (
        <div className="space-y-8 animate-fade-in">
           <div className="bg-slate-900 rounded-xl p-8 text-white shadow-lg flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                 <h2 className="text-2xl font-bold flex items-center gap-3 mb-2 italic">
                    <DollarSign className="text-amber-400" size={32} />
                    Advisor Profit Planner
                 </h2>
                 <p className="text-slate-400 text-sm">Calcolo redditività basato sull'Edizione {ZURICH_REMUNERATION_DATA.EDITION}.</p>
              </div>
              <div className="bg-[#233D7B] px-6 py-3 rounded-xl border border-blue-400 shadow-md">
                 <p className="text-[10px] text-blue-200 uppercase font-bold tracking-widest mb-1">Base Provvigionale</p>
                 <p className="text-xl font-black text-white">100% COMM. ZB</p>
              </div>
           </div>
           <div className="grid lg:grid-cols-12 gap-8">
              <div className="lg:col-span-4 space-y-6">
                 <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                    <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-100 pb-3 uppercase text-xs">Parametri</h3>
                    <div className="space-y-6">
                       <div>
                          <label className="block text-[10px] font-black text-slate-400 uppercase mb-2">Tuo Tier AUM</label>
                          <select value={advisorAumTierIndex} onChange={(e) => setAdvisorAumTierIndex(Number(e.target.value))} className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-bold">
                             {ZURICH_REMUNERATION_DATA.SALES_PAYOUT.map((p, idx) => (
                               <option key={idx} value={idx}>{p.tier}</option>
                             ))}
                          </select>
                       </div>
                       <div>
                          <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Versamento Annuo (€)</label>
                          <input type="number" value={annualContribution} onChange={(e) => setAnnualContribution(Number(e.target.value))} className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-bold" />
                       </div>
                    </div>
                 </div>
              </div>
              <div className="lg:col-span-8 bg-white rounded-3xl shadow-xl border border-slate-200 p-8 flex flex-col justify-center text-center md:text-left">
                 <p className="text-xs text-slate-400 font-bold uppercase mb-2 tracking-widest">Ricavo Annuo Stimato Consulente</p>
                 <h4 className="text-7xl font-black text-[#233D7B] tracking-tighter mb-8">{formatCurrency(profitability.totalAdvisorRevenue)}</h4>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-100">
                       <p className="text-[10px] font-black text-emerald-800 uppercase mb-1">Margine Vendita</p>
                       <p className="text-2xl font-black text-emerald-600">{formatCurrency(profitability.advisorUpfront)}</p>
                    </div>
                    <div className="p-5 bg-blue-50 rounded-2xl border border-blue-100">
                       <p className="text-[10px] font-black text-blue-800 uppercase mb-1">Margine Gestione</p>
                       <p className="text-2xl font-black text-blue-600">{formatCurrency(profitability.advisorRecurring)}</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* --- TAB PANORAMICA (PRE-ESISTENTE) --- */}
      {activeTab === 'PANORAMICA' && (
        <div className="space-y-8 animate-fade-in">
          <div className="grid md:grid-cols-2 gap-6">
            {ZURICH_PRODUCT_DATA.USP.map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${item.color}`}>
                  {getIcon(item.icon)}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-8">
             <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-3 uppercase tracking-widest text-xs">Efficienza Costi (Nota Informativa 10/2025)</h3>
             <div className="grid md:grid-cols-2 gap-12">
               <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                     <span className="text-slate-500 text-sm font-medium">Caricamento Ricorrenti</span>
                     <span className="font-black text-slate-900 text-lg">{ZURICH_PRODUCT_DATA.COSTS.loading_recurring}</span>
                  </div>
               </div>
               <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-green-100 pb-3 bg-green-50/50 px-4 rounded-xl">
                     <span className="text-green-800 text-sm font-black uppercase text-[10px]">TFR & Trasferimenti</span>
                     <span className="font-black text-green-700 text-lg">0%</span>
                  </div>
               </div>
             </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ProductAnalysisView;
