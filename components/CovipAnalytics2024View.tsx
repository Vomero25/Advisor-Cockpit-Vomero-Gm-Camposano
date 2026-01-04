
import React, { useState } from 'react';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell, PieChart, Pie
} from 'recharts';
import { 
  TrendingUp, Users, ShieldCheck, Globe, Info, AlertCircle, 
  Target, Zap, ArrowRight, CheckCircle2, History, Briefcase,
  Gem, FileText, Microscope, Landmark, Scale, Quote,
  ArrowUpRight, PieChart as PieIcon, Coins, Clock, UserCheck
} from 'lucide-react';

const formatCurrency = (val: number) => 
  new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 1, notation: 'compact' }).format(val);

const CovipAnalytics2024View: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'PERFORMANCE' | 'COSTS' | 'DEMOGRAPHICS'>('OVERVIEW');

  // --- DATI ESTRATTI E TRADOTTI DAL REPORT ---
  const stats2024 = {
    totalMembers: 9.95, // Milioni
    totalAum: 243.4, // Miliardi
    gdpRatio: 11.1, // %
    annualContributions: 20.5, // Miliardi
    growthRate: 4.2 // % iscritti
  };

  const performance10y = [
    { name: 'Negoziali (FPN)', val: 2.2, tfr: 2.4, color: '#4f46e5' },
    { name: 'Aperti (FPA)', val: 2.4, tfr: 2.4, color: '#10b981' },
    { name: 'PIP Unit-Linked', val: 2.9, tfr: 2.4, color: '#f59e0b' },
  ];

  const performance2024 = [
    { name: 'Negoziali', val: 6.0, tfr: 1.9 },
    { name: 'Aperti', val: 6.5, tfr: 1.9 },
    { name: 'PIP Unit-Linked', val: 9.0, tfr: 1.9 },
  ];

  const costsIsc10y = [
    { name: 'Negoziali', value: 0.49 },
    { name: 'Aperti', value: 1.35 },
    { name: 'PIP Nuovi', value: 2.17 }
  ];

  const genderGap = [
    { name: 'Uomini', value: 61.6, fill: '#233D7B' },
    { name: 'Donne', value: 38.4, fill: '#f43f5e' }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-fade-in pb-24">
      
      {/* 1. HEADER EXECUTIVE */}
      <div className="bg-[#0a0f1d] rounded-[3rem] p-12 text-white shadow-2xl relative border-b-8 border-indigo-600 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-600/10 to-transparent"></div>
        <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
           <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                 <div className="bg-indigo-600 p-3 rounded-2xl shadow-xl shadow-indigo-600/20"><Landmark size={32} /></div>
                 <span className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-400 italic">Market Intelligence - Report Annuale 2024</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
                Intelligence <br/> <span className="text-indigo-400">COVIP 2024</span>
              </h1>
              <p className="text-slate-400 text-xl font-medium max-w-2xl leading-relaxed">
                I dati ufficiali della Commissione di Vigilanza tradotti in opportunità commerciali. 10 milioni di aderenti e 243 miliardi di patrimonio: il sistema è solido e in crescita.
              </p>
           </div>
           <div className="lg:col-span-4 bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 text-center relative group">
              <p className="text-[10px] font-black uppercase text-amber-400 mb-2 tracking-widest italic">Patrimonio del Sistema</p>
              <p className="text-6xl font-black text-white tracking-tighter">243 <span className="text-xl">Mld</span></p>
              <p className="text-[10px] font-black text-emerald-400 uppercase mt-4 tracking-widest">+8,5% vs 2023</p>
           </div>
        </div>
      </div>

      {/* 2. NAVIGATION TOOLKIT */}
      <div className="flex flex-wrap gap-2 bg-slate-100 p-1.5 rounded-2xl w-full md:w-fit mx-auto shadow-inner border border-slate-200">
         <button onClick={() => setActiveTab('OVERVIEW')} className={`px-8 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'OVERVIEW' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}>
            <Globe size={16} /> Panoramica Mercato
         </button>
         <button onClick={() => setActiveTab('PERFORMANCE')} className={`px-8 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'PERFORMANCE' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}>
            <TrendingUp size={16} /> Rendimenti 10Y/1Y
         </button>
         <button onClick={() => setActiveTab('COSTS')} className={`px-8 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'COSTS' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}>
            <Coins size={16} /> Analisi Costi ISC
         </button>
         <button onClick={() => setActiveTab('DEMOGRAPHICS')} className={`px-8 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'DEMOGRAPHICS' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}>
            <Users size={16} /> Target Commerciali
         </button>
      </div>

      <div className="min-h-[600px]">
        {/* --- TAB 1: OVERVIEW --- */}
        {activeTab === 'OVERVIEW' && (
          <div className="space-y-10 animate-fade-in">
             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: "Aderenti Totali", val: "9,95 Mln", trend: "+4,2%", color: "indigo", icon: Users },
                  { label: "Attività Nette", val: "243,4 Mld", trend: "11,1% PIL", color: "emerald", icon: ShieldCheck },
                  { label: "Contribuzioni", val: "20,5 Mld", trend: "+7% Flussi", color: "amber", icon: Zap },
                  { label: "Fondi Totali", val: "291", trend: "Consolidamento", color: "slate", icon: Landmark },
                ].map((kpi, i) => (
                   <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm group hover:border-indigo-500 transition-all">
                      <div className={`bg-${kpi.color}-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-${kpi.color}-600 group-hover:bg-indigo-600 group-hover:text-white transition-all`}>
                         <kpi.icon size={24} />
                      </div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{kpi.label}</p>
                      <p className="text-3xl font-black text-slate-900 tracking-tighter">{kpi.val}</p>
                      <p className="text-[10px] font-bold text-indigo-600 mt-2 uppercase">{kpi.trend}</p>
                   </div>
                ))}
             </div>

             <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform"><Briefcase size={120} /></div>
                   <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic mb-6">Composizione Contributiva Lavoratori</h3>
                   <div className="space-y-6">
                      <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                         <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] font-black text-slate-500 uppercase">Flusso TFR in Fondi</span>
                            <span className="text-sm font-black text-indigo-600">8,6 Mld €</span>
                         </div>
                         <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-600" style={{width: '42%'}}></div>
                         </div>
                         <p className="text-[10px] text-slate-400 mt-2 font-bold italic">Rappresenta il 42% della contribuzione totale dipendenti.</p>
                      </div>
                      <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                         <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] font-black text-slate-500 uppercase">Contributo Datoriale</span>
                            <span className="text-sm font-black text-emerald-600">3,1 Mld €</span>
                         </div>
                         <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-600" style={{width: '15%'}}></div>
                         </div>
                         <p className="text-[10px] text-slate-400 mt-2 font-bold italic">La 'mancia' dello Stato/Azienda che si perde non aderendo.</p>
                      </div>
                   </div>
                </div>

                <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-xl flex flex-col justify-between border-t-8 border-amber-500 relative overflow-hidden">
                   <div className="absolute -bottom-10 -right-10 opacity-5"><Zap size={200} /></div>
                   <div className="relative z-10">
                      <Quote className="text-amber-500 mb-6" size={40} />
                      <p className="text-2xl font-medium leading-relaxed italic tracking-tight">
                         "Il sistema della previdenza complementare italiana ha dimostrato resilienza nel 2024 nonostante le tensioni geopolitiche, con un patrimonio che pesa per l'11% del PIL nazionale."
                      </p>
                   </div>
                   <div className="pt-8 mt-8 border-t border-white/10 flex items-center gap-4 relative z-10">
                      <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center font-black text-xs text-amber-500">COVIP</div>
                      <div>
                         <p className="text-xs font-black uppercase text-amber-400">Relazione Sociale 2024</p>
                         <p className="text-[10px] text-slate-400 font-bold uppercase italic">Sintesi tecnica per Advisor</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* --- TAB 2: PERFORMANCE --- */}
        {activeTab === 'PERFORMANCE' && (
          <div className="space-y-10 animate-fade-in">
             <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                   <div>
                      <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">Rendimento 2024: Mercato vs TFR</h3>
                      <p className="text-slate-400 text-[10px] font-black mt-2 uppercase tracking-widest">Dati netti da costi e tasse (%)</p>
                   </div>
                   <div className="bg-emerald-50 px-6 py-3 rounded-2xl border border-emerald-100 text-emerald-700 flex items-center gap-3">
                      <TrendingUp size={24} />
                      <span className="text-sm font-black uppercase italic">Annata Eccellente</span>
                   </div>
                </div>
                <div className="h-[400px] w-full">
                   <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={performance2024} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                         <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                         <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
                         <YAxis unit="%" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                         <Tooltip contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'}} />
                         <Legend />
                         <Bar dataKey="val" name="Rendimento Fondo" fill="#4f46e5" radius={[12, 12, 0, 0]} barSize={50} />
                         <Bar dataKey="tfr" name="Rivalutazione TFR" fill="#94a3b8" radius={[12, 12, 0, 0]} barSize={50} />
                      </BarChart>
                   </ResponsiveContainer>
                </div>
             </div>

             <div className="bg-[#0a0f1d] p-12 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-5"><History size={250} /></div>
                <div className="relative z-10 grid lg:grid-cols-12 gap-10 items-center">
                   <div className="lg:col-span-7 space-y-6">
                      <h3 className="text-2xl font-black italic uppercase tracking-tighter text-indigo-400">Il Lungo Periodo (2014-2024)</h3>
                      <p className="text-slate-300 text-lg font-medium leading-relaxed italic">
                        "Dottore, il 2024 è stato un anno d'oro, ma la forza della previdenza è nella media decennale. Tutti i comparti azionari (4.4% - 4.7%) hanno battuto il TFR (2.4%) di quasi il doppio."
                      </p>
                      <div className="space-y-4">
                         {performance10y.map((row, i) => (
                            <div key={i} className="flex items-center justify-between group">
                               <span className="text-xs font-black uppercase text-slate-400 group-hover:text-white transition-colors">{row.name}</span>
                               <div className="flex items-center gap-4">
                                  <span className="text-xs font-bold text-slate-500 italic">vs TFR: {row.tfr}%</span>
                                  <span className="text-xl font-black text-emerald-400">{row.val}%</span>
                               </div>
                            </div>
                         ))}
                      </div>
                   </div>
                   <div className="lg:col-span-5">
                      <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 text-center space-y-2">
                         <p className="text-[10px] font-black uppercase text-amber-500 tracking-[0.2em] italic">Top Performer 2024</p>
                         <p className="text-5xl font-black text-white italic">Azionari</p>
                         <p className="text-2xl font-black text-emerald-400">+10,4%</p>
                         <p className="text-[10px] text-slate-400 font-bold uppercase pt-4 italic">Contro 1,9% del TFR Aziendale</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* --- TAB 3: COSTS --- */}
        {activeTab === 'COSTS' && (
          <div className="space-y-10 animate-fade-in">
             <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic mb-10 flex items-center gap-3">
                   <Microscope className="text-indigo-600" /> Analisi ISC (Indicatore Sintetico Costo)
                </h3>
                <div className="grid lg:grid-cols-12 gap-10 items-center">
                   <div className="lg:col-span-7 h-[350px]">
                      <ResponsiveContainer width="100%" height="100%">
                         <BarChart data={costsIsc10y} layout="vertical" margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
                            <XAxis type="number" unit="%" hide />
                            <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
                            <Tooltip contentStyle={{borderRadius: '16px'}} />
                            <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={40}>
                               {costsIsc10y.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={index === 0 ? '#10b981' : index === 1 ? '#4f46e5' : '#ef4444'} />
                               ))}
                            </Bar>
                         </BarChart>
                      </ResponsiveContainer>
                   </div>
                   <div className="lg:col-span-5 space-y-6">
                      <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white">
                         <h4 className="text-amber-500 font-black text-xs uppercase mb-4 tracking-widest">Killer Argument: Efficienza Anima</h4>
                         <p className="text-sm font-medium leading-relaxed italic">
                           "Dottore, i PIP hanno costi quadrupli rispetto ai fondi negoziali e doppi rispetto agli aperti come **Anima (ISC 1,35%)**. In 35 anni, questa differenza di costi erode il 20% del suo capitale finale. Scegliere Anima significa investire in efficienza istituzionale."
                         </p>
                      </div>
                      <div className="p-6 bg-indigo-50 rounded-3xl border border-indigo-100">
                         <p className="text-[10px] font-black text-indigo-700 uppercase mb-2">Relazione Pag. 3:</p>
                         <p className="text-xs text-indigo-900 font-bold">"La crescente dimensione media dei fondi sta innescando economie di scala che riducono i costi per l'aderente."</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* --- TAB 4: DEMOGRAPHICS --- */}
        {activeTab === 'DEMOGRAPHICS' && (
          <div className="space-y-10 animate-fade-in">
             <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
                   <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter mb-8 italic">Ripartizione per Genere (Il mercato ignorato)</h3>
                   <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                         <PieChart>
                            <Pie data={genderGap} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                               {genderGap.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.fill} />
                               ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                         </PieChart>
                      </ResponsiveContainer>
                   </div>
                   <div className="mt-8 p-6 bg-rose-50 rounded-3xl border border-rose-100 flex items-start gap-4">
                      <AlertCircle size={24} className="text-rose-600 shrink-0 mt-1" />
                      <p className="text-xs text-rose-900 leading-relaxed font-bold italic">
                        "Nelle forme negoziali le donne sono solo il 27%. Esiste un vuoto di consulenza enorme per il target femminile e per l'indipendenza economica della donna post-lavoro."
                      </p>
                   </div>
                </div>

                <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden">
                   <div className="absolute -top-10 -right-10 opacity-5"><Target size={200} /></div>
                   <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter mb-8 italic">Distribuzione Geografica</h3>
                   <div className="space-y-6">
                      <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                         <span className="text-sm font-bold text-slate-600">NORD ITALIA</span>
                         <span className="text-2xl font-black text-indigo-600">57,2%</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                         <span className="text-sm font-bold text-slate-600">CENTRO</span>
                         <span className="text-2xl font-black text-slate-400">19,7%</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                         <span className="text-sm font-bold text-slate-600">SUD & ISOLE</span>
                         <span className="text-2xl font-black text-rose-400">22,9%</span>
                      </div>
                   </div>
                   <div className="mt-10 p-6 bg-slate-900 rounded-3xl text-white">
                      <h4 className="text-amber-500 font-black text-[10px] uppercase mb-2">Insight Strategico</h4>
                      <p className="text-xs text-slate-400 italic">"L'età media è 47 anni. La finestra dei neo-assunti è l'occasione per ringiovanire il portafoglio e creare relazioni di 20-30 anni."</p>
                   </div>
                </div>
             </div>

             <div className="bg-indigo-900 p-12 rounded-[3.5rem] text-white shadow-2xl flex flex-col md:flex-row items-center gap-12">
                <div className="bg-white/10 p-6 rounded-full text-white shadow-xl animate-pulse"><UserCheck size={40} /></div>
                <div className="space-y-4">
                   <h4 className="text-2xl font-black italic uppercase tracking-tighter text-indigo-400">Target B2B: L'esercito delle PMI</h4>
                   <p className="text-lg text-indigo-100 leading-relaxed font-medium italic">
                      "Il 60% dei dipendenti privati lavora in aziende con meno di 50 addetti. In queste aziende il TFR non finisce all'INPS ma resta in cassa o va nei fondi. Questo è il nostro bacino d'oro per la previdenza collettiva."
                   </p>
                </div>
             </div>
          </div>
        )}
      </div>

      {/* FOOTER METODOLOGICO */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
         <div className="flex items-center gap-6">
            <div className="bg-[#0a0f1d] p-4 rounded-[1.5rem] text-white shadow-lg"><FileText size={32} /></div>
            <div>
               <p className="text-lg font-black text-slate-800 uppercase tracking-tighter leading-none mb-1">COVIP 2024 Market Intelligence Report</p>
               <p className="text-xs text-slate-500 font-bold italic">Rif: "Supplementary Pension Funds in Italy at the end of 2024: Main Data" | Traduzione e Analisi: Advisor Unit Gruppo Vomero</p>
            </div>
         </div>
         <div className="text-right">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">DOCUMENTO AD USO INTERNO RISERVATO</p>
         </div>
      </div>

    </div>
  );
};

export default CovipAnalytics2024View;
