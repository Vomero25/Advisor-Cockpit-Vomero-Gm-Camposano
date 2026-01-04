
import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Legend, Cell, LineChart, Line, ComposedChart, Area, AreaChart
} from 'recharts';
import { 
  TrendingUp, Users, ShieldCheck, Coins, Landmark, 
  Target, Zap, History, Scale, Briefcase, 
  ArrowRight, CheckCircle2, Info, AlertTriangle, 
  PieChart as PieIcon, FileText, Microscope, Globe,
  Shield, Siren, ZapOff, Award, Quote, Search
} from 'lucide-react';

const formatCurrency = (val: number) => 
  new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 1, notation: 'compact' }).format(val);

const CovipIntelligence2024View: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'PERFORMANCE' | 'COSTS' | 'B2B_INSIGHTS'>('OVERVIEW');

  // --- DATI REALI DAL REPORT COVIP 2024 ---
  const returns10y = [
    { period: '10 Anni (2014-2024)', contractual: 2.2, open: 2.4, pip: 2.9, tfr: 2.4, equity: 4.7 },
    { period: '20 Anni (2004-2024)', contractual: 3.0, open: 2.9, pip: 0, tfr: 2.5, equity: 4.5 },
  ];

  const returns2024 = [
    { name: 'Contrattuali (FPN)', val: 6.0, tfr: 1.9, color: '#4f46e5' },
    { name: 'Aperti (FPA)', val: 6.5, tfr: 1.9, color: '#10b981' },
    { name: 'PIP Unit-Linked', val: 9.0, tfr: 1.9, color: '#f59e0b' },
  ];

  const costComparison = [
    { name: 'Contrattuali', value: 0.49 },
    { name: 'Aperti (Media)', value: 1.35 },
    { name: 'Anima (Cl. I)', value: 1.35 }, // Benchmark specifico Anima dal report
    { name: 'PIP (Media)', value: 2.17 },
    { name: 'Zurich (ESG Az.)', value: 2.10 } // Benchmark specifico Zurich
  ];

  const genderGap = [
    { name: 'Uomini', contractual: 72.4, open: 56.9, pip: 53.3 },
    { name: 'Donne', contractual: 27.6, open: 43.1, pip: 46.7 }
  ];

  const contributionMix = [
    { name: 'TFR Flow', value: 8.6, fill: '#4f46e5' },
    { name: 'Dipendente', value: 5.3, fill: '#10b981' },
    { name: 'Datoriale', value: 3.1, fill: '#f59e0b' },
    { name: 'Autonomi', value: 1.7, fill: '#94a3b8' }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-fade-in pb-24">
      
      {/* 1. HEADER EXECUTIVE BUDGET 2024 */}
      <div className="bg-[#0a0f1d] rounded-[3rem] p-12 text-white shadow-2xl relative border-b-8 border-indigo-600 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-600/10 to-transparent"></div>
        <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
           <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                 <div className="bg-indigo-600 p-3 rounded-2xl shadow-xl shadow-indigo-600/20"><Shield size={32} /></div>
                 <span className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-400 italic">Market Intelligence - Report COVIP 2024</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
                Data <br/> <span className="text-indigo-400">Intelligence</span>
              </h1>
              <p className="text-slate-400 text-xl font-medium max-w-2xl leading-relaxed">
                L'intero sistema della previdenza complementare italiana analizzato per la tua trattativa. Trasforma i numeri della vigilanza in prove inconfutabili per il cliente.
              </p>
           </div>
           <div className="lg:col-span-4 bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 text-center relative group">
              <p className="text-[10px] font-black uppercase text-amber-400 mb-2 tracking-widest italic">Patrimonio del Sistema</p>
              <p className="text-6xl font-black text-white tracking-tighter">243,4 <span className="text-xl">Mld</span></p>
              <p className="text-[10px] font-black text-emerald-400 uppercase mt-4 tracking-widest">+8,5% vs 2023</p>
           </div>
        </div>
      </div>

      {/* 2. NAVIGATION TOOLKIT */}
      <div className="flex flex-wrap gap-2 bg-slate-100 p-1.5 rounded-2xl w-full md:w-fit mx-auto shadow-inner border border-slate-200">
         <button onClick={() => setActiveTab('OVERVIEW')} className={`px-8 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'OVERVIEW' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}>
            <Globe size={16} /> Panoramica Sistema
         </button>
         <button onClick={() => setActiveTab('PERFORMANCE')} className={`px-8 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'PERFORMANCE' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}>
            <TrendingUp size={16} /> Performance & TFR
         </button>
         <button onClick={() => setActiveTab('COSTS')} className={`px-8 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'COSTS' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}>
            <Coins size={16} /> Analisi Costi ISC
         </button>
         <button onClick={() => setActiveTab('B2B_INSIGHTS')} className={`px-8 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'B2B_INSIGHTS' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}>
            <Briefcase size={16} /> Opportunità B2B/PMI
         </button>
      </div>

      <div className="min-h-[600px]">
        {/* --- TAB 1: OVERVIEW --- */}
        {activeTab === 'OVERVIEW' && (
          <div className="space-y-10 animate-fade-in">
             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: "Aderenti Totali", val: "9,95 Mln", trend: "+4,2%", icon: Users, color: "indigo" },
                  { label: "Contributi 2024", val: "20,5 Mld", trend: "+7,0%", icon: Zap, color: "amber" },
                  { label: "Uscite (RITA/Lump)", val: "13,2 Mld", trend: "Sostegno Reddito", icon: History, color: "rose" },
                  { label: "Patrimonio / PIL", val: "11,1%", trend: "Rilevanza Macro", icon: Landmark, color: "emerald" },
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
                <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
                   <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic mb-8 flex items-center gap-3">
                      <PieIcon className="text-indigo-600" /> Mix della Contribuzione (Miliardi €)
                   </h3>
                   <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                         <BarChart data={contributionMix} layout="vertical" margin={{ left: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                            <XAxis type="number" hide />
                            <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
                            <Tooltip contentStyle={{borderRadius: '16px'}} />
                            <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={40}>
                               {contributionMix.map((entry, index) => <Cell key={index} fill={entry.fill} />)}
                            </Bar>
                         </BarChart>
                      </ResponsiveContainer>
                   </div>
                   <div className="mt-6 p-4 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-start gap-4">
                      <Info size={20} className="text-indigo-600 shrink-0 mt-1" />
                      <p className="text-xs text-indigo-900 leading-relaxed font-bold italic">
                        "Solo nel 2024, le aziende hanno versato 3,1 Miliardi di euro come 'contributo datoriale'. Chi non aderisce al fondo pensione sta tecnicamente rinunciando a un aumento di stipendio netto già stanziato dall'imprenditore."
                      </p>
                   </div>
                </div>

                <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-xl flex flex-col justify-between border-t-8 border-amber-500 relative overflow-hidden">
                   <div className="absolute -bottom-10 -right-10 opacity-5"><Quote size={200} /></div>
                   <div className="relative z-10">
                      <h4 className="text-xl font-black text-amber-500 mb-6 uppercase italic">Market Insight: RITA</h4>
                      <p className="text-2xl font-medium leading-relaxed italic tracking-tight mb-10">
                         "Nel 2024 sono stati erogati 2,4 Miliardi di euro tramite la RITA. Lo strumento si conferma il miglior 'scivolo' verso la pensione, garantendo reddito ai lavoratori in condizioni di svantaggio."
                      </p>
                   </div>
                   <div className="pt-8 border-t border-white/10 flex items-center gap-4 relative z-10">
                      <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center font-black text-xs text-amber-500">COVIP</div>
                      <div>
                         <p className="text-xs font-black uppercase text-amber-400">Relazione Sociale 2024</p>
                         <p className="text-[10px] text-slate-400 font-bold uppercase italic">Pagina 2: Contributions & Benefits</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* --- TAB 2: PERFORMANCE --- */}
        {activeTab === 'PERFORMANCE' && (
          <div className="space-y-10 animate-fade-in">
             <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                   <div>
                      <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic">L'Anno d'Oro 2024</h3>
                      <p className="text-slate-400 text-[10px] font-black mt-2 uppercase tracking-widest italic">Rendimenti Netti vs Rivalutazione TFR (%)</p>
                   </div>
                   <div className="bg-emerald-50 px-6 py-3 rounded-2xl border border-emerald-100 text-emerald-700 flex items-center gap-3 shadow-sm">
                      <TrendingUp size={24} />
                      <span className="text-sm font-black uppercase italic">Annata di Eccellenza</span>
                   </div>
                </div>
                <div className="h-[400px] w-full">
                   <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={returns2024} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                         <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                         <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 11, fontWeight: 'bold'}} />
                         <YAxis unit="%" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                         <Tooltip contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'}} />
                         <Bar dataKey="val" name="Rendimento Fondo" radius={[12, 12, 0, 0]} barSize={50}>
                            {returns2024.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                         </Bar>
                         <Bar dataKey="tfr" name="Rivalutazione TFR" fill="#94a3b8" radius={[12, 12, 0, 0]} barSize={50} />
                      </BarChart>
                   </ResponsiveContainer>
                </div>
             </div>

             <div className="bg-[#0a0f1d] p-12 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-5"><History size={250} /></div>
                <div className="relative z-10 grid lg:grid-cols-12 gap-10 items-center">
                   <div className="lg:col-span-7 space-y-6">
                      <h3 className="text-2xl font-black italic uppercase tracking-tighter text-indigo-400">Analisi 10 Anni (2014-2024)</h3>
                      <p className="text-slate-300 text-lg font-medium leading-relaxed italic">
                        "Dottore, il 2024 è stato un anno straordinario con punte del 9%. Ma guardiamo il decennio: i comparti azionari (4.4% - 4.7%) hanno battuto il TFR (2.4%) di quasi il doppio. Chi ha lasciato i soldi in azienda ha perso il 50% di rendimento composto."
                      </p>
                      <div className="space-y-4">
                         <div className="flex items-center justify-between group">
                            <span className="text-xs font-black uppercase text-slate-400">Azionari (Tutti i fondi)</span>
                            <div className="flex items-center gap-4">
                               <span className="text-xs font-bold text-slate-500 italic">vs TFR: 2.4%</span>
                               <span className="text-2xl font-black text-emerald-400">4.7%</span>
                            </div>
                         </div>
                         <div className="flex items-center justify-between group">
                            <span className="text-xs font-black uppercase text-slate-400">Bilanciati (Aperti)</span>
                            <div className="flex items-center gap-4">
                               <span className="text-xs font-bold text-slate-500 italic">vs TFR: 2.4%</span>
                               <span className="text-2xl font-black text-indigo-400">2.7%</span>
                            </div>
                         </div>
                      </div>
                   </div>
                   <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-[2.5rem] p-10 text-center">
                      <p className="text-[10px] font-black uppercase text-amber-500 mb-2 tracking-widest italic">Performance 2024</p>
                      <p className="text-5xl font-black text-white italic">Azionari</p>
                      <p className="text-3xl font-black text-emerald-400 tracking-tighter">+10,4%</p>
                      <p className="text-[9px] text-slate-400 font-bold uppercase pt-4 italic leading-tight">Il miglior risultato dal 2019</p>
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
                   <Microscope className="text-indigo-600" /> L'Impatto dei Costi (ISC - 10 Anni)
                </h3>
                <div className="grid lg:grid-cols-12 gap-10 items-center">
                   <div className="lg:col-span-7 h-[350px]">
                      <ResponsiveContainer width="100%" height="100%">
                         <BarChart data={costComparison} layout="vertical" margin={{ left: 40 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis type="number" unit="%" hide />
                            <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
                            <Tooltip contentStyle={{borderRadius: '16px'}} />
                            <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={40}>
                               {costComparison.map((entry, index) => (
                                  <Cell key={index} fill={entry.name.includes('Media') ? '#94a3b8' : entry.name.includes('PIP') ? '#f43f5e' : '#4f46e5'} />
                               ))}
                            </Bar>
                         </BarChart>
                      </ResponsiveContainer>
                   </div>
                   <div className="lg:col-span-5 space-y-6">
                      <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white border-b-8 border-emerald-500">
                         <h4 className="text-amber-500 font-black text-xs uppercase mb-4 tracking-widest flex items-center gap-2"><Award size={16} /> Punto di Forza Vomero</h4>
                         <p className="text-sm font-medium leading-relaxed italic">
                           "Dottore, il report COVIP conferma: la media dei PIP è al 2.18%. Il nostro partner **Anima (ISC 1,35%)** e le linee azionarie **Zurich (2,10%)** si posizionano sotto la media nazionale, offrendo un'efficienza istituzionale che preserva il suo montante finale."
                         </p>
                      </div>
                      <div className="p-6 bg-indigo-50 rounded-3xl border border-indigo-100">
                         <p className="text-[10px] text-indigo-900 font-bold leading-relaxed">
                            "ISC: Un incremento dell'1% del costo può ridurre il capitale finale del 15-20% in un orizzonte di 35 anni."
                         </p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* --- TAB 4: B2B INSIGHTS --- */}
        {activeTab === 'B2B_INSIGHTS' && (
          <div className="space-y-10 animate-fade-in">
             <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform"><Target size={150} /></div>
                   <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter mb-8 italic">Il Gap di Genere: Un'opportunità di vendita</h3>
                   <div className="space-y-6">
                      <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                         <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Partecipazione Femminile</span>
                            <span className="text-xs font-black text-rose-600">Fondi Contrattuali</span>
                         </div>
                         <p className="text-4xl font-black text-slate-900 tracking-tighter">27,6%</p>
                         <div className="w-full h-2 bg-slate-200 rounded-full mt-4 overflow-hidden">
                            <div className="h-full bg-rose-500" style={{width: '27.6%'}}></div>
                         </div>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed font-medium">
                         "Dottore, il dato è allarmante: nei fondi aziendali/contrattuali le donne sono meno di un terzo. Esiste un vuoto di tutela enorme per il target femminile. Le forme aperte (Anima) e individuali (Zurich) sono la soluzione per bilanciare questo gap familiare."
                      </p>
                   </div>
                </div>

                <div className="bg-indigo-900 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4 opacity-10"><Globe size={150} /></div>
                   <h4 className="text-xl font-black uppercase italic tracking-tighter mb-8 text-amber-400">Distribuzione per Età (Tav. 5)</h4>
                   <div className="space-y-6 relative z-10">
                      <div className="flex justify-between items-center border-b border-white/10 pb-4">
                         <span className="text-sm font-bold text-blue-200">UNDER 35</span>
                         <span className="text-xl font-black">19,2%</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-white/10 pb-4">
                         <span className="text-sm font-bold text-blue-200">35 - 54 ANNI</span>
                         <span className="text-xl font-black text-amber-500">46,7%</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-white/10 pb-4">
                         <span className="text-sm font-bold text-blue-200">OVER 55</span>
                         <span className="text-xl font-black">33,4%</span>
                      </div>
                   </div>
                   <div className="mt-8 p-5 bg-white/5 rounded-3xl border border-white/10 italic text-xs leading-relaxed text-slate-400">
                      "Il 46,7% degli iscritti è nel pieno della carriera (35-54 anni). È il momento perfetto per massimizzare la deducibilità di 5.164€ e pianificare l'integrazione del reddito."
                   </div>
                </div>
             </div>

             <div className="bg-white p-10 rounded-[4rem] border border-slate-200 shadow-xl flex flex-col md:flex-row items-center gap-10">
                <div className="bg-indigo-100 p-8 rounded-full text-indigo-600 shrink-0 shadow-inner"><Users size={48} /></div>
                <div className="space-y-4">
                   <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic">Opportunità per le PMI (Sotto 50 addetti)</h4>
                   <p className="text-slate-600 text-lg font-medium leading-relaxed">
                      "Il report mostra che l'80% delle microimprese (0-9 addetti) non ha ancora un piano di previdenza collettiva. In queste aziende il TFR non finisce all'INPS ma resta in cassa. È la nostra prateria per portare vantaggi fiscali all'imprenditore (IRES) e ai dipendenti (IRPEF)."
                   </p>
                   <div className="flex gap-3">
                      <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-full border border-indigo-100 uppercase tracking-widest">Target: 4,4 Milioni Imprese</span>
                   </div>
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
               <p className="text-lg font-black text-slate-800 uppercase tracking-tighter leading-none mb-1">COVIP Intelligence Report 2024</p>
               <p className="text-xs text-slate-500 font-bold italic">Rif: "Supplementary Pension Funds in Italy: Main Data" | Analisi Certificata Advisor Gruppo Vomero</p>
            </div>
         </div>
         <div className="text-right">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">DOCUMENTO AD USO INTERNO RISERVATO - PRIVATE SUITE</p>
         </div>
      </div>

    </div>
  );
};

export default CovipIntelligence2024View;
