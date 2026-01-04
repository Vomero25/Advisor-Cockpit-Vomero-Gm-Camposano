
import React from 'react';
import { PageView } from '../types';
import { 
  BookOpen, Briefcase, Users, LayoutDashboard, Bot, Calculator, X, 
  Factory, BrainCircuit, Rocket, Percent, TrendingUp, Snowflake, 
  PieChart, HeartPulse, Scale, ShieldPlus, Home, ClipboardCheck, 
  Layers, Lock, Repeat, Target, Landmark, Eye, BarChart3, ShieldCheck,
  Search, Crown, Banknote, History, AlertOctagon, GraduationCap, ArrowLeftRight,
  Globe2, Brain, Ghost, LifeBuoy, TrendingDown, Map, Sparkles, LineChart, Shield,
  Settings2, Binary, Timer, Sparkle
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
      label: 'Focus News 2026',
      items: [
        { view: PageView.BUDGET_2026, label: 'Legge Bilancio 2026', icon: Sparkles },
      ]
    },
    {
      label: 'Strategia & Diagnosi',
      items: [
        { view: PageView.DASHBOARD, label: 'Command Center', icon: LayoutDashboard },
        { view: PageView.INTERVIEW, label: 'Diagnosi Clienti', icon: Target },
        { view: PageView.METHODOLOGY, label: 'Motore di Calcolo', icon: Binary },
        { view: PageView.PENSION_EROSION, label: 'Audit Svalutazione', icon: TrendingDown },
        { view: PageView.BEHAVIORAL_FINANCE, label: 'Odissea Previdenza', icon: Brain },
        { view: PageView.PROTECTION_PARADOX, label: 'Paradosso Protezione', icon: AlertOctagon },
        { view: PageView.NEGOTIATION, label: 'Sales Strategist AI', icon: BrainCircuit },
      ]
    },
    {
      label: 'Benchmark & Mercato',
      items: [
        { view: PageView.COVIP_INTELLIGENCE_2024, label: 'COVIP Intelligence 24', icon: Shield },
        { view: PageView.PENSION_GEOGRAPHY, label: 'Geografia Pensioni', icon: Map },
        { view: PageView.COMPARATORE, label: 'Comparatore Rendimenti', icon: ArrowLeftRight },
        { view: PageView.COVIP_BENCHMARK, label: 'Analisi Benchmark', icon: BarChart3 },
        { view: PageView.MARKET_DIMENSIONS, label: 'Dimensioni Mercato', icon: Globe2 },
        { view: PageView.PAC_SIMULATOR, label: 'Backtest PAC', icon: History },
      ]
    },
    {
      label: 'Area B2C (Lavoratore)',
      items: [
        { view: PageView.VANTAGGI_LAVORATORI, label: 'Perché conviene?', icon: Eye },
        { view: PageView.EXTRA_DEDUCTIBILITY, label: 'Extra Deducibilità', icon: Sparkle },
        { view: PageView.SIMULATOR, label: 'TFR vs Fondo', icon: Calculator },
        { view: PageView.RITA_SIMULATOR, label: 'Simulatore R.I.T.A.', icon: Timer },
        { view: PageView.FISCAL_CALCULATOR, label: 'Ingegneria Rendita', icon: Banknote },
      ]
    },
    {
      label: 'Area B2B (Imprenditore)',
      items: [
        { view: PageView.VANTAGGI_AZIENDE, label: 'Vantaggi Azienda', icon: Factory },
        { view: PageView.CORPORATE_SIMULATOR, label: 'Audit TFR Dinamico', icon: Briefcase },
        { view: PageView.TFM_SIMULATOR, label: 'TFM Amministratore', icon: TrendingUp },
      ]
    },
    {
      label: 'Wealth Protection',
      items: [
        { view: PageView.WEALTH_PROTECTION_MASTERCLASS, label: 'Masterclass Normativa', icon: GraduationCap },
        { view: PageView.MULTINVEST_ANALYSIS, label: 'MultInvest Shield', icon: Crown },
        { view: PageView.ASSET_PROTECTION, label: 'Scudo Patrimoniale', icon: Lock },
        { view: PageView.SUCCESSION_ANALYSIS, label: 'Successione Finanziaria', icon: Scale },
        { view: PageView.REAL_ESTATE_SUCCESSION, label: 'Successione Immobili', icon: Home },
        { view: PageView.LTC_ANALYSIS, label: 'Rischio Longevità', icon: HeartPulse },
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
                  return (
                    <button
                      key={item.view}
                      onClick={() => handleNavClick(item.view)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                    >
                      <div className={`${isActive ? 'text-white' : 'text-slate-500 group-hover:text-indigo-400'} transition-colors`}>
                        <Icon size={18} />
                      </div>
                      <span className={`font-bold text-sm tracking-tight ${isActive ? 'text-white' : 'text-slate-400'}`}>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-800 bg-[#070b14]">
          <div className="bg-slate-900 rounded-2xl p-4 text-[10px] text-slate-500 font-bold border border-slate-800/50 italic leading-relaxed">
            "La consulenza è l'arte di proteggere il futuro che il cliente non ha ancora immaginato."
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
