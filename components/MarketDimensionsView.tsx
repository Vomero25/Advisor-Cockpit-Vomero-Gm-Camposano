
import React from 'react';
import { MARKET_INSIGHTS_2025 } from '../constants';
import { 
  Globe2, BarChart3, TrendingUp, Users, Factory, 
  Landmark, AlertCircle, CheckCircle2, ArrowRight,
  PieChart as PieChartIcon, Target, Info, ShieldAlert,
  ArrowUpRight, ExternalLink, FileText, History,
  TrendingDown, Ghost, MousePointer2, AlertOctagon,
  Microscope, Siren, Zap, Sparkles, UserMinus,
  Briefcase, TrendingUp as TrendUpIcon, HeartHandshake,
  ShieldCheck
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Cell, PieChart, Pie, Legend, LineChart, Line, ComposedChart
} from 'recharts';

const formatCurrency = (val: number) => 
  new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);

const MarketDimensionsView: React.FC = () => {
  const { 
    INTERNATIONAL_RANKING, 
    ASSET_DISTRIBUTION, 
    ITALIAN_PMI_STRUCTURE, 
    MEMBERSHIP_STATS,
    GLOBAL_GIANTS,
    TAXATION_HISTORY,
    UE_EMPLOYMENT_COMPARISON
  } = MARKET_INSIGHTS_2025;

  const strategicTargets = [
    {
      title: "Il Target 'Silente'",
      subtitle: "Iscritti Non Versanti",
      data: "27,7% (2,69 Mln persone)",
      opportunity: "Conversione a versanti attivi e attivazione PAC integrativi.",
      script: "Hai già un fondo aperto ma è fermo? Stai perdendo i vantaggi fiscali annuali e l'effetto della capitalizzazione composta.",
      icon: UserMinus,
      color: "border-rose-500 bg-rose-50/30",
      iconColor: "text-rose-600"
    },
    {
      title: "Microimprese (0-9)",
      subtitle: "Asset B2B Critico",
      data: "94,9% delle Imprese",
      opportunity: "Audit TFR Dinamico e outsourcing del debito previdenziale.",
      script: "Dottore, il TFR in azienda le costa il 4,5% annuo tra rivalutazione e tasse. Lo trasformi in un risparmio IRES del 24%.",
      icon: Factory,
      color: "border-amber-500 bg-amber-50/30",
      iconColor: "text-amber-600"
    },
    {
      title: "Dipendenti PMI (<50)",
      subtitle: "Il Bacino d'Oro",
      data: "11 Milioni di lavoratori",
      opportunity: "Previdenza Collettiva e portabilità del contributo datoriale.",
      script: "Nelle piccole aziende il TFR non va all'INPS. È il momento di creare un piano che protegga i suoi dipendenti e ottimizzi i costi.",
      icon: Briefcase,
      color: "border-indigo-500 bg-indigo-50/30",
      iconColor: "text-indigo-600"
    },
    {
      title: "Gap di Genere",
      subtitle: "Target Femminile",
      data: "Solo 27% nei negoziali",
      opportunity: "Pianificazione dell'indipendenza economica femminile.",
      script: "Esiste un enorme vuoto di tutela per le lavoratrici. Una soluzione individuale è il modo migliore per proteggere il suo futuro.",
      icon: HeartHandshake,
      color: "border-emerald-500 bg-emerald-50/30",
      iconColor: "text-emerald-600"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-fade-in pb-24">
      
      {/* 1. HEADER EXECUTIVE */}
      <div className="bg-[#0a0f1d] rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden border-b-8 border-indigo-500">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-600/10 to-transparent"></div>
        <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
           <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                 <div className="bg-indigo-500 p-3 rounded-2xl shadow-xl"><Globe2 size={32} className="text-white"/></div>
                 <span className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-400 italic">Market Intelligence Unit - Report OCSE/COVIP 2025</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
                Market <br/> <span className="text-indigo-400 text-6xl">Intelligence</span>
              </h1>
              <p className="text-slate-400 text-xl font-medium max-w-2xl leading-relaxed">
                Analisi granulare del posizionamento italiano. Dalla cronistoria dei peggioramenti fiscali alla fragilità delle microimprese italiane.
              </p>
           </div>
           <div className="lg:col-span-4 bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 text-center relative overflow-hidden group">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl"></div>
              <p className="text-[10px] font-black uppercase text-indigo-400 mb-2 tracking-widest italic">Patrimonio Complessivo</p>
              <p className="text-6xl font-black text-white tracking-tighter">267 <span className="text-xl">Mld $</span></p>
              <p className="text-[10px] font-black text-emerald-400 uppercase mt-4 tracking-widest">+8,5% Trend Crescita</p>
           </div>
        </div>
      </div>

      {/* 2. KPI MACRO */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
            <div className="bg-rose-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-rose-600">
               <Ghost size={24} />
            </div>
            <p className="text-3xl font-black text-slate-900 tracking-tighter">{MEMBERSHIP_STATS.NON_PAYERS_PCT}%</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Iscritti non versanti</p>
            <p className="text-[10px] font-bold text-rose-600 italic mt-3">2,69 Milioni di soggetti "silenti"</p>
         </div>
         <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
            <div className="bg-amber-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-amber-600">
               <Factory size={24} />
            </div>
            <p className="text-3xl font-black text-slate-900 tracking-tighter">{MEMBERSHIP_STATS.TFR_SHARE_PCT}%</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Quota TFR su contribuzione</p>
            <p className="text-[10px] font-bold text-amber-600 italic mt-3">8,6 Mld € di flussi annui</p>
         </div>
         <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
            <div className="bg-indigo-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-indigo-600">
               <Users size={24} />
            </div>
            <p className="text-3xl font-black text-slate-900 tracking-tighter">7 Mln</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Aderenti Attivi</p>
            <p className="text-[10px] font-bold text-indigo-500 italic mt-3">Prevalentemente in medie-grandi imprese</p>
         </div>
         <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
            <div className="bg-emerald-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-emerald-600">
               <TrendingUp size={24} />
            </div>
            <p className="text-3xl font-black text-slate-900 tracking-tighter">20,5 Mld</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Raccolta annua totale</p>
            <p className="text-[10px] font-bold text-emerald-500 italic mt-3">Quasi un punto di PIL nazionale</p>
         </div>
      </div>

      {/* 3. TARGET STRATEGICI PER IL CONSULENTE (NUOVA SEZIONE) */}
      <section className="space-y-8 py-10">
         <div className="flex items-center gap-4 border-l-8 border-indigo-600 pl-6">
            <div>
               <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic">Target Strategici & Opportunità</h2>
               <p className="text-slate-500 font-medium italic">Trasforma i dati in appuntamenti di consulenza</p>
            </div>
         </div>
         
         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {strategicTargets.map((target, idx) => (
               <div key={idx} className={`p-8 rounded-[2.5rem] border-2 ${target.color} flex flex-col justify-between transition-all hover:shadow-2xl group`}>
                  <div>
                     <div className={`w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm ${target.iconColor}`}>
                        <target.icon size={28} />
                     </div>
                     <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter mb-1">{target.title}</h3>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">{target.subtitle}</p>
                     
                     <div className="bg-white/60 p-4 rounded-2xl border border-white/40 mb-6">
                        <p className="text-[10px] font-black text-slate-500 uppercase mb-1">Dato Chiave:</p>
                        <p className="text-sm font-black text-slate-800">{target.data}</p>
                     </div>
                     
                     <p className="text-xs text-slate-600 font-medium leading-relaxed mb-6">
                        <span className="font-black text-slate-800 uppercase block text-[9px] mb-1">Opportunità:</span>
                        {target.opportunity}
                     </p>
                  </div>

                  <div className="pt-6 border-t border-black/5">
                     <p className="text-[10px] font-black uppercase text-indigo-600 mb-2 flex items-center gap-1">
                        <Sparkles size={12}/> The Killer Script:
                     </p>
                     <p className="text-xs font-bold text-slate-800 italic leading-snug">"{target.script}"</p>
                  </div>
               </div>
            ))}
         </div>
      </section>

      {/* 4. GRAFICI MACRO */}
      <div className="grid lg:grid-cols-12 gap-8">
         <div className="lg:col-span-8 space-y-8">
            <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden">
               <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic mb-10 flex items-center gap-4">
                  <History className="text-rose-600" /> Timeline del Prelievo Fiscale sui Rendimenti
               </h3>
               <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                     <ComposedChart data={TAXATION_HISTORY}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="year" tick={{fontSize: 10, fontWeight: 'bold'}} axisLine={false} tickLine={false} />
                        <YAxis unit="%" hide />
                        <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'}} />
                        <Bar dataKey="rate" name="Aliquota Rendimenti %" radius={[12, 12, 0, 0]} barSize={40}>
                           {TAXATION_HISTORY.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={index === 0 ? '#10b981' : '#ef4444'} fillOpacity={0.8} />
                           ))}
                        </Bar>
                        <Line type="monotone" dataKey="rate" stroke="#ef4444" strokeWidth={3} dot={{ r: 6 }} />
                     </ComposedChart>
                  </ResponsiveContainer>
               </div>
            </div>

            <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
               <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic mb-10 flex items-center gap-4">
                  <BarChart3 className="text-indigo-600" /> Posizionamento OCSE: Patrimonio / PIL (%)
               </h3>
               <div className="h-[350px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                     <BarChart data={INTERNATIONAL_RANKING} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <XAxis dataKey="country" tick={{fontSize: 9, fontWeight: 'black'}} axisLine={false} tickLine={false} />
                        <YAxis unit="%" tick={{fontSize: 10}} axisLine={false} tickLine={false} />
                        <Tooltip cursor={{fill: 'transparent'}} />
                        <Bar dataKey="gdp_pct" radius={[8, 8, 0, 0]} barSize={35}>
                           {INTERNATIONAL_RANKING.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.country === 'Italia' ? '#ef4444' : entry.country === 'Media OCSE' ? '#94a3b8' : '#4f46e5'} />
                           ))}
                        </Bar>
                     </BarChart>
                  </ResponsiveContainer>
               </div>
            </div>
         </div>

         <div className="lg:col-span-4 space-y-8">
            <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><Landmark size={150} /></div>
               <h4 className="text-xl font-black italic uppercase tracking-tighter mb-8 leading-tight">Il Gap con i <br/> <span className="text-amber-500 text-2xl">Giganti Globali</span></h4>
               <div className="space-y-6 relative z-10">
                  {GLOBAL_GIANTS.map((g, i) => (
                    <div key={i} className="space-y-2">
                       <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                          <span className="text-slate-400">{g.name}</span>
                          <span>{g.value} Mld $</span>
                       </div>
                       <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full" style={{ width: `${(g.value / 1600) * 100}%`, backgroundColor: g.color }}></div>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="bg-indigo-50 p-10 rounded-[3rem] border border-indigo-100 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10"><Globe2 size={100} /></div>
               <h4 className="text-xl font-black text-indigo-900 uppercase tracking-tighter mb-8 italic">Il "Caso Italia": <br/> Struttura Occupazionale</h4>
               <div className="space-y-6">
                  {UE_EMPLOYMENT_COMPARISON.map((c, i) => (
                    <div key={i} className="flex justify-between items-end border-b border-indigo-200 pb-4">
                       <div>
                          <p className="text-sm font-black text-indigo-800 uppercase tracking-tight">{c.name}</p>
                          <p className="text-[9px] text-indigo-500 font-bold uppercase">{c.label}</p>
                       </div>
                       <p className="text-3xl font-black text-indigo-700 tracking-tighter">{c.pmi_pct}%</p>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>

      {/* 5. FOOTER EXECUTIVO */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
         <div className="flex items-center gap-6">
            <div className="bg-[#0a0f1d] p-4 rounded-[1.5rem] text-white shadow-lg"><FileText size={32} /></div>
            <div>
               <p className="text-lg font-black text-slate-800 uppercase tracking-tighter leading-none mb-1">Market Dimensions & Intelligence Report</p>
               <p className="text-xs text-slate-500 font-bold italic">Rif. Tecnico: Report OCSE "Pension Markets in Focus 2025" | Nota ISTAT Gennaio 2025 | Relazione Annuale COVIP 2024</p>
            </div>
         </div>
         <div className="text-right">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">DOCUMENTO AD USO INTERNO - MARKET INTELLIGENCE UNIT GRUPPO VOMERO</p>
         </div>
      </div>

    </div>
  );
};

export default MarketDimensionsView;
