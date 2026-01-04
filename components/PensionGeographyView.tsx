
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Legend, Cell 
} from 'recharts';
import { 
  MapPin, TrendingDown, AlertCircle, Info, 
  ShieldAlert, Landmark, ArrowUpRight, Microscope,
  Globe, LayoutGrid, CheckCircle2, TrendingUp,
  Map as MapIcon, ShieldCheck, AlertOctagon
} from 'lucide-react';

const PENSION_DISTRIBUTION_DATA = [
  { 
    region: 'NORD', 
    'Fino a 499,99': 6.4, 
    '500,00-999,99': 14.6, 
    '1.000,00-1.499,99': 16.4, 
    '1.500,00-1.999,99': 19.2, 
    '2.000,00-2.499,99': 15.5, 
    '2.500,00-2.999,99': 11.6, 
    '3.000,00 e più': 16.4 
  },
  { 
    region: 'CENTRO', 
    'Fino a 499,99': 8.7, 
    '500,00-999,99': 17.1, 
    '1.000,00-1.499,99': 16.9, 
    '1.500,00-1.999,99': 16.7, 
    '2.000,00-2.499,99': 13.1, 
    '2.500,00-2.999,99': 10.2, 
    '3.000,00 e più': 17.1 
  },
  { 
    region: 'MEZZOGIORNO', 
    'Fino a 499,99': 12.7, 
    '500,00-999,99': 23.2, 
    '1.000,00-1.499,99': 20.1, 
    '1.500,00-1.999,99': 14.4, 
    '2.000,00-2.499,99': 10.2, 
    '2.500,00-2.999,99': 7.9, 
    '3.000,00 e più': 11.4 
  }
];

const COLORS = [
  '#233D7B', // Dark Blue
  '#4B79A1', // Medium Blue
  '#9CB6CC', // Light Blue
  '#D1D1D1', // Gray
  '#C99A82', // Terra Cotta Light
  '#8E443D', // Rust
  '#4A0E0E'  // Deep Red
];

const CLASSES = [
  'Fino a 499,99',
  '500,00-999,99',
  '1.000,00-1.499,99',
  '1.500,00-1.999,99',
  '2.000,00-2.499,99',
  '2.500,00-2.999,99',
  '3.000,00 e più'
];

const PensionGeographyView: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-fade-in pb-24">
      
      {/* 1. HEADER EXECUTIVE */}
      <div className="bg-[#0f172a] rounded-[3rem] p-12 text-white shadow-2xl relative border-b-8 border-indigo-600 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-600/10 to-transparent"></div>
        <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
           <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                 <div className="bg-indigo-600 p-3 rounded-2xl shadow-xl shadow-indigo-600/20"><MapIcon size={32} className="text-white"/></div>
                 <span className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-400 italic">Market Geography Unit - Gruppo Vomero Intelligence</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
                Mappatura <br/> <span className="text-indigo-400">Pensioni 2024</span>
              </h1>
              <p className="text-slate-400 text-xl font-medium max-w-2xl leading-relaxed">
                Analisi digitale basata sulla Relazione INPS 2024. Distribuzione dei redditi pensionistici per macro-area geografica.
              </p>
           </div>
           <div className="lg:col-span-4 bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 text-center relative group">
              <p className="text-[10px] font-black uppercase text-amber-400 mb-2 tracking-widest italic">Punto di Rottura: Sud</p>
              <p className="text-6xl font-black text-white tracking-tighter">56%</p>
              <p className="text-[10px] font-black text-rose-300 uppercase mt-4 tracking-widest italic">Pensioni sotto i 1.500€ <br/> Lordi Mensili</p>
           </div>
        </div>
      </div>

      {/* 2. CORE VISUALIZATION - STACKED CHART (RICOSTRUZIONE FEDELE) */}
      <div className="bg-white rounded-[4rem] p-10 border border-slate-200 shadow-sm relative overflow-hidden flex flex-col">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
           <div>
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">Distribuzione per Classe di Reddito (%)</h3>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2">Dati ripartizione geografica anno 2024</p>
           </div>
           <div className="bg-slate-50 p-2 rounded-2xl border border-slate-100 flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white shadow-sm text-[9px] font-black text-indigo-600 uppercase">
                 <CheckCircle2 size={12} /> Valori ISTAT 2024
              </div>
              <span className="text-[10px] font-bold text-slate-400 italic">Fonte: Relazione Sociale INPS</span>
           </div>
        </div>

        <div className="h-[500px] w-full">
           <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={PENSION_DISTRIBUTION_DATA}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" unit="%" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
                <YAxis dataKey="region" type="category" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 'black', fill: '#1e293b'}} />
                <Tooltip 
                   contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'}} 
                   formatter={(value: number) => [`${value}%`, 'Quota']}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }} />
                {CLASSES.map((className, index) => (
                  <Bar 
                    key={className} 
                    dataKey={className} 
                    stackId="a" 
                    fill={COLORS[index]} 
                    barSize={60}
                  />
                ))}
              </BarChart>
           </ResponsiveContainer>
        </div>
      </div>

      {/* 3. ADVISOR STRATEGY INSIGHTS */}
      <div className="grid lg:grid-cols-3 gap-8">
         <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative group hover:border-indigo-600 transition-all">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform"><MapPin size={100} /></div>
            <h4 className="text-sm font-black text-indigo-600 uppercase tracking-widest mb-4">Focus Nord</h4>
            <p className="text-3xl font-black text-slate-900 mb-6 italic">Massa Critica</p>
            <p className="text-sm text-slate-600 leading-relaxed font-medium mb-8">
               Sebbene abbia la quota più alta di pensioni sopra i 3.000€ (16,4%), il Nord presenta un gap di integrazione per il <strong>37%</strong> della popolazione che percepisce meno di 1.500€. 
            </p>
            <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 italic text-[11px] text-indigo-800 font-bold">
               "Leva Commerciale: Mantenimento dello stile di vita in aree ad alto costo."
            </div>
         </div>

         <div className="bg-[#233D7B] p-8 rounded-[2.5rem] text-white shadow-xl relative group overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><AlertCircle size={100} /></div>
            <h4 className="text-sm font-black text-amber-400 uppercase tracking-widest mb-4">Focus Mezzogiorno</h4>
            <p className="text-3xl font-black text-white mb-6 italic">Allarme Sociale</p>
            <p className="text-sm text-blue-100 leading-relaxed font-medium mb-8">
               Il 56% delle prestazioni è inferiore a 1.500€ lordi mensili. Senza previdenza complementare, metà del Sud Italia rischia la povertà relativa post-lavorativa.
            </p>
            <div className="p-4 bg-white/10 rounded-2xl border border-white/20 italic text-[11px] text-blue-200 font-bold">
               "Leva Commerciale: La previdenza come unico scudo di protezione familiare."
            </div>
         </div>

         <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-xl relative group border-t-8 border-amber-500">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><Landmark size={100} /></div>
            <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Dato Nazionale</h4>
            <div className="space-y-6 relative z-10">
               <div>
                  <p className="text-[10px] font-black uppercase text-amber-500 mb-1">Concentrazione Media</p>
                  <p className="text-2xl font-black">1.500€ - 1.999€</p>
                  <p className="text-[10px] text-slate-400 font-bold italic">La 'Classe di Mezzo' delle pensioni italiane</p>
               </div>
               <div className="pt-6 border-t border-white/10">
                  <p className="text-xs text-slate-300 font-medium leading-relaxed italic">
                     "Dottore, guardi l'area scura (3.000€+): al Nord è il 16%, al Sud solo l'11%. Il gap generazionale si somma a quello geografico: è ora di agire."
                  </p>
               </div>
            </div>
         </div>
      </div>

      {/* FOOTER METODOLOGICO */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
         <div className="flex items-center gap-6">
            <div className="bg-[#0f172a] p-4 rounded-[1.5rem] text-white shadow-lg"><Microscope size={32} /></div>
            <div>
               <p className="text-lg font-black text-slate-800 uppercase tracking-tighter leading-none mb-1">Pension Distribution Analysis 2024</p>
               <p className="text-xs text-slate-500 font-bold italic">Fonti: ISTAT Area Studi | Osservatorio INPS | Elaborazione Gruppo Vomero Intelligence</p>
            </div>
         </div>
         <div className="text-right">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">RELAZIONE AD USO ESCLUSIVO CONSULENTI GRUPPO VOMERO</p>
         </div>
      </div>

    </div>
  );
};

export default PensionGeographyView;
