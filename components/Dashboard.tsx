
import React from 'react';
import { PageView } from '../types';
import { 
  Users, Briefcase, Bot, ArrowRight, Factory, 
  Calculator, ShieldCheck, Rocket, TrendingUp, 
  Target, Lightbulb, Handshake, Scale, Percent, 
  Lock, Repeat, BarChart3, FileText, Landmark,
  Info, ArrowRightLeft, AlertCircle, ShieldAlert,
  Flame, Globe, Zap, Banknote, Calendar,
  TrendingDown, FileSearch, ChevronRight, Crown,
  HeartPulse, ShieldPlus, BookOpen, Package, Star,
  PieChart, Map, Sparkles, Binary, Timer
} from 'lucide-react';

interface DashboardProps {
  onChangeView: (view: PageView) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onChangeView }) => {
  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* 1. HERO EXECUTIVE SECTION */}
      <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden border-b-8 border-indigo-600">
        <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-500/20"><Landmark size={24} /></div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 italic">Vomero Intelligence Unit - 2025</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter leading-none uppercase">
              Advisor <span className="text-indigo-500">Cockpit</span>
            </h1>
            <p className="text-slate-400 text-xl font-medium max-w-2xl leading-relaxed">
              Piattaforma di analisi patrimoniale avanzata. Trasforma i dati <strong>COVIP 2024</strong> e le novità del <strong>Bilancio 2026</strong> in opportunità.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button onClick={() => onChangeView(PageView.BUDGET_2026)} className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-black py-4 px-8 rounded-2xl flex items-center gap-3 shadow-xl transition-all hover:scale-105 active:scale-95 uppercase text-xs tracking-widest">
                <Sparkles size={20} /> Legge Bilancio 2026
              </button>
              <button onClick={() => onChangeView(PageView.FISCAL_CALCULATOR)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 px-8 rounded-2xl flex items-center gap-3 shadow-xl transition-all hover:scale-105 active:scale-95 uppercase text-xs tracking-widest">
                <Calculator size={20} /> Calcolatore Fiscale IRPEF
              </button>
            </div>
          </div>
          <div className="lg:col-span-4 hidden lg:block">
            <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[2rem] border border-white/10 space-y-6">
               <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-[10px] font-black uppercase text-indigo-400 tracking-widest">Market Pulse</span>
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
               </div>
               <div className="space-y-4">
                  <div className="flex justify-between items-center">
                     <span className="text-sm font-bold text-slate-300">Deducibilità 2026</span>
                     <span className="text-xl font-black text-emerald-400">5.300€</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-sm font-bold text-slate-300">Riv. TFR (L. 297)</span>
                     <span className="text-xl font-black text-amber-500">2.15%</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-sm font-bold text-slate-300">Tesoreria INPS</span>
                     <span className="text-xl font-black text-rose-500">60+ add.</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-white opacity-5 transform skew-x-12 pointer-events-none"></div>
      </div>

      {/* 2. AREA TARGET STRATEGICI (WIDGET DEDICATO) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm flex items-center gap-8 group hover:border-indigo-500 transition-all cursor-pointer" onClick={() => onChangeView(PageView.MARKET_DIMENSIONS)}>
            <div className="bg-indigo-100 p-6 rounded-[2rem] text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-inner">
               <Target size={40} />
            </div>
            <div>
               <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic">Analisi dei Target</h3>
               <p className="text-slate-500 text-sm font-medium leading-relaxed">Scopri dove si nasconde il business: dai <strong>2.6 Mln di silenti</strong> al debito delle <strong>microimprese</strong>.</p>
               <button className="mt-4 flex items-center gap-2 text-xs font-black text-indigo-600 uppercase tracking-widest hover:underline">Vedi Opportunità <ArrowRight size={14}/></button>
            </div>
         </div>
         
         <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl flex items-center gap-8 group relative overflow-hidden border-t-8 border-amber-500 cursor-pointer" onClick={() => onChangeView(PageView.BEHAVIORAL_FINANCE)}>
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform"><Binary size={100} /></div>
            <div className="bg-amber-500 p-6 rounded-[2rem] text-slate-900 shadow-lg shrink-0">
               <Zap size={40} />
            </div>
            <div className="relative z-10">
               <h3 className="text-2xl font-black uppercase tracking-tighter italic">Neuro-Vendita AI</h3>
               <p className="text-slate-400 text-sm font-medium leading-relaxed">Usa la psicologia del <strong>Nudge</strong> e la nostra AI per smontare i bias dei clienti più difficili.</p>
               <button className="mt-4 flex items-center gap-2 text-xs font-black text-amber-500 uppercase tracking-widest hover:underline">Genera Script <ArrowRight size={14}/></button>
            </div>
         </div>
      </div>

      {/* 3. CORE SERVICE MODULES */}
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col group border-b-8 border-b-indigo-600 transition-all hover:-translate-y-1">
          <div className="bg-indigo-600 p-8 text-white">
            <h3 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3"><Users size={24}/> Wealth B2C</h3>
            <p className="text-indigo-100 text-xs mt-2 font-medium">Massimizzazione del risparmio netto individuale.</p>
          </div>
          <div className="p-8 space-y-3 bg-gradient-to-b from-indigo-50/30 to-white flex-1">
            <button onClick={() => onChangeView(PageView.VANTAGGI_LAVORATORI)} className="w-full p-4 bg-white hover:bg-indigo-600 hover:text-white rounded-2xl flex items-center justify-between group transition-all text-left border border-slate-100 shadow-sm">
              <span className="text-[11px] font-black uppercase tracking-tighter">Perché mi conviene?</span>
              <ArrowRight size={16} className="text-indigo-600 group-hover:text-white" />
            </button>
            <button onClick={() => onChangeView(PageView.SIMULATOR)} className="w-full p-4 bg-white hover:bg-indigo-600 hover:text-white rounded-2xl flex items-center justify-between group transition-all text-left border border-slate-100 shadow-sm">
              <span className="text-[11px] font-black uppercase tracking-tighter">TFR vs Fondo Pensione</span>
              <Calculator size={16} className="text-indigo-600 group-hover:text-white" />
            </button>
            <button onClick={() => onChangeView(PageView.RITA_SIMULATOR)} className="w-full p-4 bg-white hover:bg-indigo-600 hover:text-white rounded-2xl flex items-center justify-between group transition-all text-left border border-slate-100 shadow-sm">
              <span className="text-[11px] font-black uppercase tracking-tighter">Scivolo Fiscale R.I.T.A.</span>
              <Timer size={16} className="text-indigo-600 group-hover:text-white" />
            </button>
            <button onClick={() => onChangeView(PageView.FISCAL_CALCULATOR)} className="w-full p-4 bg-white hover:bg-indigo-600 hover:text-white rounded-2xl flex items-center justify-between group transition-all text-left border border-slate-100 shadow-sm">
              <span className="text-[11px] font-black uppercase tracking-tighter">Ingegneria della Rendita</span>
              <Banknote size={16} className="text-indigo-600 group-hover:text-white" />
            </button>
          </div>
        </div>

        <div className="lg:col-span-4 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col group border-b-8 border-b-amber-600 transition-all hover:-translate-y-1">
          <div className="bg-amber-600 p-8 text-white">
            <h3 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3"><Briefcase size={24}/> Wealth B2B</h3>
            <p className="text-amber-100 text-xs mt-2 font-medium">Ottimizzazione TFR, TFM e Rating Aziendale.</p>
          </div>
          <div className="p-8 space-y-3 bg-gradient-to-b from-amber-50/30 to-white flex-1">
            <div className="p-4 bg-white rounded-2xl border border-amber-100 shadow-sm flex items-start gap-4 mb-2">
               <ShieldAlert size={20} className="text-amber-600 mt-1 shrink-0" />
               <p className="text-[10px] text-slate-600 font-bold leading-snug">
                  <strong>PMI ADVISOR:</strong> Focus Tesoreria INPS (60 addetti) e Rating Bancario.
               </p>
            </div>
            <button onClick={() => onChangeView(PageView.CORPORATE_SIMULATOR)} className="w-full p-4 bg-white hover:bg-amber-600 hover:text-white rounded-2xl flex items-center justify-between group transition-all text-left border border-slate-100 shadow-sm">
              <span className="text-[11px] font-black uppercase tracking-tighter">Audit TFR Dinamico</span>
              <ArrowRight size={16} className="text-amber-600 group-hover:text-white" />
            </button>
            <button onClick={() => onChangeView(PageView.TFM_SIMULATOR)} className="w-full p-4 bg-white hover:bg-amber-600 hover:text-white rounded-2xl flex items-center justify-between group transition-all text-left border border-slate-100 shadow-sm">
              <span className="text-[11px] font-black uppercase tracking-tighter">TFM Amministratore</span>
              <TrendingUp size={16} className="text-amber-600 group-hover:text-white" />
            </button>
          </div>
        </div>

        <div className="lg:col-span-4 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col group border-b-8 border-b-slate-900 transition-all hover:-translate-y-1">
          <div className="bg-slate-900 p-8 text-white">
            <h3 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3"><ShieldCheck size={24}/> Wealth Shield</h3>
            <p className="text-slate-400 text-xs mt-2 font-medium">Asset Protection e Successione a 0%.</p>
          </div>
          <div className="p-8 space-y-3 bg-gradient-to-b from-slate-50 to-white flex-1">
             {[
               { view: PageView.MULTINVEST_ANALYSIS, label: "MultInvest 90/10", icon: Crown },
               { view: PageView.ASSET_PROTECTION, label: "Scudo Patrimoniale", icon: Lock },
               { view: PageView.SUCCESSION_ANALYSIS, label: "Successione a 0€", icon: Scale },
               { view: PageView.LTC_ANALYSIS, label: "Rischio Longevità", icon: HeartPulse }
             ].map((btn, bidx) => (
                <button 
                  key={bidx} 
                  onClick={() => onChangeView(btn.view)}
                  className="w-full p-4 bg-white hover:bg-slate-900 hover:text-white rounded-2xl flex items-center gap-3 transition-all text-left border border-slate-100 shadow-sm group/btn"
                >
                   <btn.icon size={18} className="text-indigo-600 group-hover/btn:text-amber-400" />
                   <span className="text-[11px] font-black uppercase tracking-tighter">{btn.label}</span>
                </button>
             ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
