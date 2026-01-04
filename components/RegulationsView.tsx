
import React, { useState } from 'react';
import { REGULATIONS } from '../constants';
import { RegulationCategory, RegulationItem } from '../types';
import { BookOpen, FileText, Scale, Filter, Calendar, BookMarked, ChevronDown, ChevronUp, Package, Search, Star } from 'lucide-react';

const RegulationCard: React.FC<{ 
  item: RegulationItem; 
  getIcon: (cat: RegulationCategory) => React.ReactNode; 
  getCategoryLabel: (cat: RegulationCategory) => string; 
}> = ({ item, getIcon, getCategoryLabel }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Length of text to show when collapsed
  const PREVIEW_LENGTH = 350;
  const shouldTruncate = item.content.length > PREVIEW_LENGTH;

  const isRecent = item.date?.includes('2025');

  return (
    <div className={`bg-white rounded-xl shadow-sm border ${isRecent ? 'border-blue-200' : 'border-slate-200'} overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative`}>
      {isRecent && (
        <div className="absolute top-0 right-12 bg-blue-600 text-white text-[9px] font-black px-3 py-1 rounded-b-md flex items-center gap-1 z-10 shadow-sm uppercase tracking-tighter">
          <Star size={10} fill="currentColor" /> Novità 2025
        </div>
      )}
      
      {/* Header Card */}
      <div className={`${isRecent ? 'bg-blue-50/50' : 'bg-slate-50'} px-6 py-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4`}>
        <div className="flex items-center gap-3">
          <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-sm">
            {getIcon(item.category)}
          </div>
          <div>
            <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">
              {getCategoryLabel(item.category)}
            </span>
            <h3 className={`text-lg font-bold ${isRecent ? 'text-blue-900' : 'text-slate-900'} leading-tight`}>
              {item.title}
            </h3>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          <span className={`text-[10px] font-black ${isRecent ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'} px-2 py-1 rounded uppercase`}>
            {item.reference}
          </span>
          {item.date && (
            <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
              <Calendar size={12} />
              {item.date}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className={`prose prose-slate max-w-none text-slate-700 text-sm leading-relaxed whitespace-pre-wrap ${isExpanded ? '' : 'line-clamp-4'} transition-all duration-300`}>
          {item.content}
        </div>
        
        {shouldTruncate && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-4 flex items-center gap-1.5 text-[#233D7B] hover:text-blue-800 font-black text-xs transition-colors focus:outline-none group uppercase tracking-widest"
          >
            {isExpanded ? (
              <>
                Comprimi Testo <ChevronUp size={16} className="group-hover:-translate-y-0.5 transition-transform" />
              </>
            ) : (
              <>
                Leggi Analisi Completa <ChevronDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

const RegulationsView: React.FC = () => {
  const [filter, setFilter] = useState<RegulationCategory | 'ALL'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRegulations = REGULATIONS.filter(r => {
    const matchesCategory = filter === 'ALL' || r.category === filter;
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      r.title.toLowerCase().includes(searchLower) || 
      r.content.toLowerCase().includes(searchLower) ||
      r.reference.toLowerCase().includes(searchLower);
      
    return matchesCategory && matchesSearch;
  });

  const getIcon = (category: RegulationCategory) => {
    switch (category) {
      case 'DECRETO': return <Scale className="text-blue-600" size={20} />;
      case 'CIRCOLARE': return <FileText className="text-green-600" size={20} />;
      case 'RISOLUZIONE': return <BookOpen className="text-amber-600" size={20} />;
      case 'GUIDA': return <BookMarked className="text-purple-600" size={20} />;
      case 'PRODOTTO': return <Package className="text-pink-600" size={20} />;
      default: return <FileText className="text-slate-600" size={20} />;
    }
  };

  const getCategoryLabel = (category: RegulationCategory) => {
    switch (category) {
      case 'DECRETO': return 'Normativa / Legge';
      case 'CIRCOLARE': return 'Circolare A.E.';
      case 'RISOLUZIONE': return 'Risoluzione A.E.';
      case 'GUIDA': return 'Guida Strategica';
      case 'PRODOTTO': return 'Scheda Tecnica';
      default: return 'Altro';
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in pb-12">
      <div className="flex flex-col gap-6 border-b border-slate-200 pb-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Knowledge Base Consulente</h2>
          <p className="text-slate-600 mt-2 font-medium">
            Documentazione tecnica e guide strategiche aggiornate (D.Lgs. 252/05, Bilancio 2025, Zurich Smart Protection).
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 justify-between items-end md:items-center">
            {/* Search Bar */}
            <div className="relative w-full md:max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                    type="text" 
                    placeholder="Cerca per parola chiave (es. 'Smart', 'Infortunio')..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm font-medium"
                />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 bg-slate-100 rounded-xl p-1 shadow-inner border border-slate-200">
            {(['ALL', 'DECRETO', 'GUIDA', 'PRODOTTO'] as const).map((cat) => (
                <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`
                    px-4 py-2 text-xs font-black rounded-lg transition-all uppercase tracking-tighter
                    ${filter === cat 
                    ? 'bg-white text-blue-800 shadow-md' 
                    : 'text-slate-500 hover:text-slate-900'}
                `}
                >
                {cat === 'ALL' ? 'Tutti i Documenti' : getCategoryLabel(cat)}
                </button>
            ))}
            </div>
        </div>
      </div>

      <div className="grid gap-6">
        {filteredRegulations.map((item) => (
          <RegulationCard 
            key={item.id} 
            item={item} 
            getIcon={getIcon} 
            getCategoryLabel={getCategoryLabel} 
          />
        ))}
      </div>

      {filteredRegulations.length === 0 && (
        <div className="text-center py-20 text-slate-500 bg-slate-100/50 rounded-3xl border-2 border-dashed border-slate-200">
          <Filter size={64} className="mx-auto mb-4 opacity-10" />
          <p className="text-lg font-bold">Nessun documento trovato.</p>
          <button 
            onClick={() => {setSearchTerm(''); setFilter('ALL');}}
            className="mt-4 text-blue-600 font-black text-sm hover:underline uppercase tracking-widest"
          >
            Resetta Ricerca
          </button>
        </div>
      )}
    </div>
  );
};

export default RegulationsView;
