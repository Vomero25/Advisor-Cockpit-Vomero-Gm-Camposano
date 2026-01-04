
import React from 'react';
import { PROTECTION_PARADOX_DATA } from '../constants';
import { 
  AlertOctagon, ShieldAlert, HeartPulse, TrendingDown, 
  ArrowRight, Users, Scale, Landmark, Quote,
  Info, CheckCircle2, Siren, Zap, Sparkles, 
  HelpCircle, Home, Factory, Eye, Microscope
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const ProtectionParadoxView: React.FC = () => {
  const chartDataPil = [
    { name: 'Italia', value: PROTECTION_PARADOX_DATA.PIL_PROTECTION.italy, fill: '#ef4444' },
    { name: 'Media OCSE', value: PROTECTION_PARADOX_DATA.PIL_PROTECTION.oecd_avg, fill: '#4f46e5' }
  ];

  const chartDataHealth = [
    { name: 'Italia (Out of Pocket)', value: PROTECTION_PARADOX_DATA.HEALTH_OUT_OF_POCKET.italy, fill: '#f59e0b' },
    { name: 'Media OCSE', value: PROTECTION_PARADOX_DATA.HEALTH_OUT_OF_POCKET.oecd_avg, fill: '#94a3b8' }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-fade-in pb-24">
      
      {/* 1. HERO - IL PARADOSSO */}
      <div className="bg-[#0f172a] rounded-[3rem] p-12 text-white shadow-2xl relative border-b-8 border-rose-600 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-rose-600/10 to-transparent"></div>
        <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
           <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                 <div className="bg-rose-600 p-3 rounded-2xl shadow-xl shadow-rose-600/20"><AlertOctagon size={32} className="text-white"/></div>
                 <span className="text-[11px] font-black uppercase tracking-[0.4em] text-rose-400 italic">Market Insight - Gruppo Vomero Intelligence</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
                Il Paradosso <br/> <span className="text-rose-500">della Protezione</span>
              </h1>
              <p className="text-slate-400 text-xl font-medium max-w-2xl leading-relaxed">
                L'Italia è un Paese che <strong>risparmia molto ma protegge poco</strong>: sente il rischio, ma non lo contrattualizza. Crea ricchezza, ma non la mette al riparo.
              </p>
           </div>
           <div className="lg:col-span-4 bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 text-center">
              <p className="text-[10px] font-black uppercase text-rose-400 mb-2 tracking-widest italic">Fonte: OCSE / LinkedIn Insight</p>
              <p className="text-6xl font-black text-white tracking-tighter">1,9%</p>
              <p className="text-xs text-slate-400 font-bold uppercase mt-2">Investimento in Protezione vs 5,1% Media OCSE</p>
           </div>
        </div>
      </div>

      {/* 2. ANALISI MACRO - GRAFICI DI CONFRONTO */}
      <div className="grid lg:grid-cols-2 gap-8">
         <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter mb-8 flex items-center gap-3">
               <ShieldAlert className="text-rose-600" /> Coperture Danni / PIL
            </h3>
            <div className="h-64 w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartDataPil} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                     <XAxis dataKey="name" tick={{fontSize: 12, fontWeight: 'bold'}} axisLine={false} tickLine={false} />
                     <YAxis unit="%" hide />
                     <Tooltip cursor={{fill: 'transparent'}} />
                     <Bar dataKey="value" radius={[12, 12, 12, 12]} barSize={50}>
                        {chartDataPil.map((entry, index) => <Cell key={index} fill={entry.fill} />)}
                     </Bar>
                  </BarChart>
               </ResponsiveContainer>
            </div>
            <p className="mt-6 text-sm text-slate-500 font-medium leading-relaxed italic text-center">
              "Il rischio lo pagano le famiglie, non i sistemi di protezione."
            </p>
         </div>

         <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter mb-8 flex items-center gap-3">
               <HeartPulse className="text-amber-500" /> Spesa Sanitaria Privata
            </h3>
            <div className="h-64 w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartDataHealth} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                     <XAxis dataKey="name" tick={{fontSize: 12, fontWeight: 'bold'}} axisLine={false} tickLine={false} />
                     <YAxis unit="%" hide />
                     <Tooltip cursor={{fill: 'transparent'}} />
                     <Bar dataKey="value" radius={[12, 12, 12, 12]} barSize={50}>
                        {chartDataHealth.map((entry, index) => <Cell key={index} fill={entry.fill} />)}
                     </Bar>
                  </BarChart>
               </ResponsiveContainer>
            </div>
            <p className="mt-6 text-sm text-slate-500 font-medium leading-relaxed italic text-center">
              In Italia il **22%** della spesa sanitaria è pagata direttamente dalle famiglie.
            </p>
         </div>
      </div>

      {/* 3. FOCUS: STESSA FRAGILITÀ, SCALA DIVERSA */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden">
         <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic mb-12 text-center">
            Piccoli e Grandi Patrimoni: <span className="text-rose-600 underline decoration-rose-200">Stessa Fragilità</span>
         </h3>
         
         <div className="grid md:grid-cols-2 gap-10">
            {/* PICCOLI PATRIMONI */}
            <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-200 relative group transition-all hover:bg-white hover:shadow-xl">
               <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform"><Zap size={100} /></div>
               <div className="flex items-center gap-3 mb-6">
                  <div className="bg-amber-500 p-2 rounded-xl text-white"><HelpCircle size={24} /></div>
                  <h4 className="text-xl font-black text-slate-800 uppercase italic">{PROTECTION_PARADOX_DATA.PROFILES.SMALL.tag}</h4>
               </div>
               <p className="text-[10px] font-black text-amber-600 uppercase mb-4 tracking-widest italic">{PROTECTION_PARADOX_DATA.PROFILES.SMALL.focus}</p>
               <ul className="space-y-6">
                  <li className="flex gap-4">
                     <div className="w-1.5 h-1.5 bg-rose-500 rounded-full mt-2 shrink-0"></div>
                     <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase">Rischio Economico</p>
                        <p className="text-sm font-bold text-slate-700">{PROTECTION_PARADOX_DATA.PROFILES.SMALL.risk_economic}</p>
                     </div>
                  </li>
                  <li className="flex gap-4">
                     <div className="w-1.5 h-1.5 bg-rose-500 rounded-full mt-2 shrink-0"></div>
                     <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase">Rischio Sanitario</p>
                        <p className="text-sm font-bold text-slate-700">{PROTECTION_PARADOX_DATA.PROFILES.SMALL.risk_health}</p>
                     </div>
                  </li>
                  <li className="flex gap-4">
                     <div className="w-1.5 h-1.5 bg-rose-500 rounded-full mt-2 shrink-0"></div>
                     <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase">Rischio Successorio</p>
                        <p className="text-sm font-bold text-slate-700">{PROTECTION_PARADOX_DATA.PROFILES.SMALL.risk_legacy}</p>
                     </div>
                  </li>
               </ul>
            </div>

            {/* GRANDI PATRIMONI */}
            <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white relative group transition-all hover:shadow-2xl">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><Landmark size={100} /></div>
               <div className="flex items-center gap-3 mb-6">
                  <div className="bg-indigo-600 p-2 rounded-xl text-white"><Sparkles size={24} /></div>
                  <h4 className="text-xl font-black uppercase italic">{PROTECTION_PARADOX_DATA.PROFILES.LARGE.tag}</h4>
               </div>
               <p className="text-[10px] font-black text-indigo-400 uppercase mb-4 tracking-widest italic">{PROTECTION_PARADOX_DATA.PROFILES.LARGE.focus}</p>
               <ul className="space-y-6">
                  <li className="flex gap-4">
                     <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 shrink-0"></div>
                     <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase">Rischio Economico</p>
                        <p className="text-sm font-bold text-slate-300">{PROTECTION_PARADOX_DATA.PROFILES.LARGE.risk_economic}</p>
                     </div>
                  </li>
                  <li className="flex gap-4">
                     <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 shrink-0"></div>
                     <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase">Rischio Sanitario</p>
                        <p className="text-sm font-bold text-slate-300">{PROTECTION_PARADOX_DATA.PROFILES.LARGE.risk_health}</p>
                     </div>
                  </li>
                  <li className="flex gap-4">
                     <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 shrink-0"></div>
                     <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase">Rischio Successorio</p>
                        <p className="text-sm font-bold text-slate-300">{PROTECTION_PARADOX_DATA.PROFILES.LARGE.risk_legacy}</p>
                     </div>
                  </li>
               </ul>
            </div>
         </div>
      </div>

      {/* 4. KILLER QUOTE SECTION */}
      <div className="grid lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 bg-[#1e293b] p-12 rounded-[3rem] text-white flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-5"><Quote size={200} /></div>
            <p className="text-2xl md:text-3xl font-black leading-tight italic tracking-tighter relative z-10">
              "Il patrimonio è solido solo se protetto. Altrimenti è una grande vulnerabilità mascherata da benessere. È il rischio di credere che il passato garantisca il futuro."
            </p>
            <div className="mt-8 pt-8 border-t border-white/10 flex items-center gap-4">
               <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center"><CheckCircle2 size={24} className="text-rose-500" /></div>
               <div>
                  <p className="text-xs font-black uppercase text-rose-400 tracking-widest">Lezione Fondamentale</p>
                  <p className="text-sm font-medium text-slate-400 italic">Trasformiamo il futuro in una decisione del presente.</p>
               </div>
            </div>
         </div>

         <div className="bg-rose-600 p-10 rounded-[3rem] text-white shadow-xl flex flex-col justify-between">
            <div>
               <h4 className="text-2xl font-black uppercase tracking-tighter italic mb-6">Dramma LTC</h4>
               <p className="text-sm font-medium opacity-90 leading-relaxed italic mb-8">
                  "I premi LTC ammontano a soli <strong>178 milioni di euro</strong>, lo 0,2% dei premi vita complessivi. In un Paese che invecchia, è come vivere in un mondo nuovo con strumenti vecchi."
               </p>
            </div>
            <button onClick={() => window.location.hash = '#LTC_ANALYSIS'} className="w-full bg-white text-rose-600 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-100 transition-all">
               Vai all'Audit LTC <ArrowRight size={14} />
            </button>
         </div>
      </div>

      {/* 5. SALES HOOKS & SCRIPTS */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
         <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter mb-10 flex items-center gap-3">
            <Zap className="text-indigo-600" /> Hook Commerciali dal Documento
         </h3>
         <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-start gap-4">
               <div className="p-3 bg-white rounded-2xl shadow-sm text-indigo-600 shrink-0"><Microscope size={20}/></div>
               <div>
                  <h4 className="font-black text-slate-800 text-xs uppercase mb-2">Per il Cliente Wealth</h4>
                  <p className="text-sm text-slate-600 italic font-medium leading-relaxed">
                    "Dottore, il suo patrimonio oggi è il frutto di un grande passato. Ma senza una strategia di protezione, il futuro si accorcia ogni giorno. Il logorio dei costi sanitari è lento ma inesorabile: non lasciamo che disgregi ciò che ha costruito."
                  </p>
               </div>
            </div>
            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-start gap-4">
               <div className="p-3 bg-white rounded-2xl shadow-sm text-amber-600 shrink-0"><Eye size={20}/></div>
               <div>
                  <h4 className="font-black text-slate-800 text-xs uppercase mb-2">Sulla "Solidità Apparente"</h4>
                  <p className="text-sm text-slate-600 italic font-medium leading-relaxed">
                    "Signor Cliente, il risparmio non è protezione. Mettere i soldi sul conto è come creare una riserva che tutti possono vedere e attaccare. Metterli in un contratto di protezione è come renderli invisibili al rischio."
                  </p>
               </div>
            </div>
         </div>
      </div>

      {/* FOOTER EXECUTIVO */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
         <div className="flex items-center gap-6">
            <div className="bg-[#0f172a] p-4 rounded-[1.5rem] text-white shadow-lg"><Info size={32} /></div>
            <div>
               <p className="text-lg font-black text-slate-800 uppercase tracking-tighter leading-none mb-1">Protection Strategy Analysis</p>
               <p className="text-xs text-slate-500 font-bold italic">Rif: "Il paradosso della protezione in Italia" - E. Pasqualitto | Analisi Advisor Gruppo Vomero 2025</p>
            </div>
         </div>
         <div className="text-right">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">DOCUMENTO AD USO INTERNO RISERVATO - ADVISOR TRAINING UNIT</p>
         </div>
      </div>

    </div>
  );
};

export default ProtectionParadoxView;
