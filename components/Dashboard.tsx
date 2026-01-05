
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
  PieChart, Map, Sparkles, Binary, Timer, GraduationCap,
  ShieldHalf, Siren, BrainCircuit, ArrowUpRight
} from 'lucide-react';

interface DashboardProps {
  onChangeView: (view: PageView) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onChangeView }) => {
  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* 1. HERO EXECUTIVE SECTION */}
      <div className="bg-[#0a0f1d] rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden border-b-8 border-amber-500">
        <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-amber-50 p-2 rounded-xl shadow-lg"><Landmark size={24} className="text-slate-900" /></div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500 italic">Vomero Elite Advisory - 2025</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter leading-none uppercase">
              Advisor <span className="text-amber-500">Masterkit</span>
            </h1>
            <p className="text-slate-400 text-xl font-medium max-w-2xl leading-relaxed">
              La piattaforma definitiva per i consulenti del Gruppo Vomero. Strategie d'urto e calcoli di efficienza fiscale.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button onClick={() => onChangeView(PageView.NEGOTIATION)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 px-8 rounded-2xl flex items-center gap-3 shadow-xl transition-all hover:scale-105 active:scale-95 uppercase text-xs tracking-widest">
                <BrainCircuit size={20} className="text-amber-400" /> Coaching Lab
              </button>
              <button onClick={() => onChangeView(PageView.INTERVIEW)} className="bg-white hover:bg-slate-100 text-slate-900 font-black py-4 px-8 rounded-2xl flex items-center gap-3 shadow-xl transition-all hover:scale-105 active:scale-95 uppercase text-xs tracking-widest">
                <Target size={20} className="text-indigo-600" /> Diagnosi Clienti
              </button>
            </div>
          </div>
          <div className="lg:col-span-4 bg-white/5 backdrop-blur-3xl p-8 rounded-[3rem] border border-white/10 text-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-amber-500"></div>
             <p className="text-[10px] font-black uppercase text-amber-500 mb-2 tracking-widest">Asset Management</p>
             <p className="text-6xl font-black text-white">4.2</p>
             <p className="text-[10px] text-slate-400 font-bold uppercase mt-4 italic">Versione Advisor Pro</p>
          </div>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-white opacity-5 transform skew-x-12 pointer-events-none"></div>
      </div>

      {/* 2. ELITE TOOLS ROW */}
      <div className="grid md:grid-cols-1 gap-8">
         <div 
           onClick={() => onChangeView(PageView.NEGOTIATION)}
           className="bg-slate-900 p-10 rounded-[3rem] shadow-xl hover:shadow-indigo-500/20 transition-all cursor-pointer group relative overflow-hidden border-b-8 border-indigo-600"
         >
            <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform"><Bot size={200} /></div>
            <div className="flex gap-8 items-center">
               <div className="bg-indigo-600 p-6 rounded-[2rem] text-amber-400 shadow-lg group-hover:rotate-12 transition-transform">
                  <BrainCircuit size={40} />
               </div>
               <div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic mb-1">Sales Strategist AI</h3>
                  <p className="text-slate-400 text-sm font-medium">Gestisci le obiezioni con il metodo Gruppo Vomero.</p>
                  <div className="mt-4 flex items-center gap-2 text-[10px] font-black text-amber-500 uppercase tracking-widest underline decoration-amber-500/50">Apri Coaching Lab <ArrowRight size={14} /></div>
               </div>
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
            <button onClick={() => onChangeView(PageView.ZURICH_SMART_PROTECTION)} className="w-full p-4 bg-indigo-50 hover:bg-indigo-600 hover:text-white rounded-2xl flex items-center justify-between group transition-all text-left border border-indigo-100 shadow-sm">
              <span className="text-[11px] font-black uppercase tracking-tighter">Zurich Smart Protection</span>
              <ShieldPlus size={16} className="text-indigo-600 group-hover:text-white" />
            </button>
            <button onClick={() => onChangeView(PageView.VANTAGGI_LAVORATORI)} className="w-full p-4 bg-white hover:bg-indigo-600 hover:text-white rounded-2xl flex items-center justify-between group transition-all text-left border border-slate-100 shadow-sm">
              <span className="text-[11px] font-black uppercase tracking-tighter">Perché mi conviene?</span>
              <ArrowRight size={16} className="text-indigo-600 group-hover:text-white" />
            </button>
            <button onClick={() => onChangeView(PageView.SIMULATOR)} className="w-full p-4 bg-white hover:bg-indigo-600 hover:text-white rounded-2xl flex items-center justify-between group transition-all text-left border border-slate-100 shadow-sm">
              <span className="text-[11px] font-black uppercase tracking-tighter">TFR vs Fondo Pensione</span>
              <Calculator size={16} className="text-indigo-600 group-hover:text-white" />
            </button>
          </div>
        </div>

        <div className="lg:col-span-4 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col group border-b-8 border-b-amber-600 transition-all hover:-translate-y-1">
          <div className="bg-amber-600 p-8 text-white">
            <h3 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3"><Briefcase size={24}/> Wealth B2B</h3>
            <p className="text-amber-100 text-xs mt-2 font-medium">Ottimizzazione TFR, TFM e Rating Aziendale.</p>
          </div>
          <div className="p-8 space-y-3 bg-gradient-to-b from-amber-50/30 to-white flex-1">
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
