
import React from 'react';
import { PageView } from '../types';
import { 
  BookOpen, Briefcase, Users, LayoutDashboard, Bot, Calculator, X, 
  Factory, BrainCircuit, Rocket, Percent, TrendingUp, Snowflake, 
  PieChart, HeartPulse, Scale, ShieldPlus, Home, ClipboardCheck, 
  Layers, Lock, Repeat, Target, Landmark, Eye, BarChart3, ShieldCheck,
  Search, Crown, Banknote, History, AlertOctagon, GraduationCap, ArrowLeftRight,
  Globe2, Brain, Ghost, LifeBuoy, TrendingDown, Map, Sparkles, LineChart, Shield,
  Settings2, Binary, Timer, Sparkle, ArrowUpRight, Gavel, LineChart as ChartIcon
} from 'lucide-react';

interface SidebarProps {
  currentView: PageView;
  onChangeView: (view: PageView) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView, isOpen, setIsOpen }) => {
  
  const groups = [
    {
      label: 'Home Base',
      items: [
        { view: PageView.DASHBOARD, label: 'Command Center', icon: LayoutDashboard },
      ]
    },
    {
      label: 'Vomero Elite Lab',
      items: [
        { view: PageView.NEGOTIATION, label: 'Coaching Lab AI', icon: BrainCircuit },
      ]
    },
    {
      label: 'Focus News 2026',
      items: [
        { view: PageView.BUDGET_2026, label: 'Legge Bilancio 2026', icon: Sparkles },
      ]
    },
    {
      label: 'Area Previdenza',
      items: [
        { view: PageView.ZURICH_SPAZIO_PREVIDENZA, label: 'Zurich Spazio Previdenza', icon: Rocket },
        { view: PageView.VANTAGGI_LAVORATORI, label: 'Vantaggi Lavoratore', icon: Eye },
        { view: PageView.EXTRA_DEDUCTIBILITY, label: 'Extra Deducibilità', icon: Sparkle },
        { view: PageView.SIMULATOR, label: 'TFR vs Fondo', icon: Calculator },
        { view: PageView.COEFFICIENTS_EVOLUTION, label: 'Evoluzione Coefficienti', icon: ChartIcon },
        { view: PageView.RITA_SIMULATOR, label: 'Simulatore R.I.T.A.', icon: Timer },
      ]
    },
    {
      label: 'Protezione & Wealth',
      items: [
        { view: PageView.ZURICH_SMART_PROTECTION, label: 'Zurich Smart Protection', icon: ShieldPlus },
        { view: PageView.LTC_ANALYSIS, label: 'Rischio Longevità (LTC)', icon: HeartPulse },
        { view: PageView.ASSET_PROTECTION, label: "Scudo Patrimoniale", icon: Lock },
        { view: PageView.SUCCESSION_ANALYSIS, label: "Successione a 0€", icon: Scale },
      ]
    },
    {
      label: 'Area B2B (Azienda)',
      items: [
        { view: PageView.VANTAGGI_AZIENDE, label: 'Vantaggi Azienda', icon: Factory },
        { view: PageView.CORPORATE_SIMULATOR, label: 'Audit TFR Dinamico', icon: Briefcase },
        { view: PageView.TFM_SIMULATOR, label: 'TFM Amministratore', icon: TrendingUp },
      ]
    },
    {
      label: 'Strategia & Benchmark',
      items: [
        { view: PageView.INTERVIEW, label: 'Diagnosi Clienti', icon: Target },
        { view: PageView.COVIP_INTELLIGENCE_2024, label: 'COVIP Intelligence 24', icon: Shield },
        { view: PageView.COMPARATORE, label: 'Comparatore Rendimenti', icon: ArrowLeftRight },
      ]
    }
  ];

  const handleNavClick = (view: PageView) => {
    onChangeView(view);
    setIsOpen(false); 
  };

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-60 z-20 lg:hidden backdrop-blur-sm" onClick={() => setIsOpen(false)} />}

      <div className={`fixed lg:static inset-y-0 left-0 z-30 w-72 bg-[#0a0f1d] text-white transform transition-all duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} flex flex-col shadow-2xl`}>
        <div className="p-8 border-b border-slate-800 flex justify-between items-center relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-2xl font-black italic tracking-tighter text-amber-500 uppercase leading-none">Gruppo <span className="text-white">Vomero</span></h1>
            <p className="text-[10px] font-black text-slate-400 mt-2 uppercase tracking-[0.3em]">GM Raffaele Camposano</p>
          </div>
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-slate-400 hover:text-white transition-colors">
            <X size={28} />
          </button>
          <div className="absolute -top-10 -right-10 bg-amber-50/10 w-32 h-32 rounded-full blur-3xl"></div>
        </div>

        <nav className="flex-1 py-8 space-y-8 px-4 overflow-y-auto custom-scrollbar">
          {groups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-2">
              <h3 className="px-4 text-[9px] font-black text-slate-600 uppercase tracking-[0.25em] mb-3">{group.label}</h3>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentView === item.view;
                  const isElite = group.label === 'Vomero Elite Lab';
                  const isHome = group.label === 'Home Base';
                  return (
                    <button
                      key={item.view}
                      onClick={() => handleNavClick(item.view)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : isElite ? 'hover:bg-amber-500/5 hover:text-amber-500 text-slate-300' : isHome ? 'hover:bg-white/10 text-slate-200 font-black' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                    >
                      <div className={`${isActive ? 'text-white' : isElite ? 'text-amber-500' : isHome ? 'text-amber-400' : 'text-slate-500 group-hover:text-indigo-400'} transition-colors`}>
                        <Icon size={18} />
                      </div>
                      <span className={`font-bold text-sm tracking-tight ${isActive ? 'text-white' : ''}`}>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-800 bg-[#070b14] space-y-4">
          <div className="bg-slate-900 rounded-2xl p-4 text-[10px] text-slate-500 font-bold border border-slate-800/50 italic leading-relaxed">
            "La protezione è il contratto che trasforma un rischio in una certezza finanziaria."
          </div>
          <div className="px-2">
            <p className="text-[9px] text-slate-600 font-black uppercase tracking-widest text-center">Sviluppatore: Raffaele Camposano</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
