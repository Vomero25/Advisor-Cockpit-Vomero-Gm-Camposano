
import React, { useState } from 'react';
import { 
  BookOpen, Scale, ShieldCheck, Landmark, Gavel, 
  Search, FileText, ChevronRight, Lock, History,
  Star, Info, CheckCircle2, Bookmark, GraduationCap
} from 'lucide-react';

const NORMATIVA_DATABASE = [
  {
    id: 'D252',
    title: 'D.Lgs. 252/05',
    tag: 'FONDAMENTO',
    subtitle: 'La Costituzione della Previdenza',
    summary: 'Disciplina le forme di previdenza complementare. Stabilisce la deducibilità (Art. 8), il regime dei riscatti (Art. 14) e la tassazione agevolata (Art. 11).',
    details: [
      { art: 'Art. 8', text: 'Deducibilità dei contributi fino a 5.164,57 €.' },
      { art: 'Art. 11', text: 'Tassazione finale tra il 15% e il 9%.' },
      { art: 'Art. 14', text: 'Riscatti per inoccupazione, mobilità o invalidità.' }
    ],
    color: 'border-indigo-500 bg-indigo-50/50'
  },
  {
    id: 'C1923',
    title: 'Art. 1923 Codice Civile',
    tag: 'PROTEZIONE',
    subtitle: 'Lo Scudo Patrimoniale',
    summary: 'Sancisce l\'impignorabilità e l\'insequestrabilità delle somme dovute dall\'assicuratore in base ai contratti di assicurazione sulla vita.',
    details: [
      { art: 'Comma 1', text: 'Le somme non possono essere soggette ad azione esecutiva o cautelare.' },
      { art: 'Giurisprudenza', text: 'Esteso ai Fondi Pensione in quanto forme di assicurazione sulla vita sociale.' }
    ],
    color: 'border-emerald-500 bg-emerald-50/50'
  },
  {
    id: 'DLGS346',
    title: 'Art. 12 D.Lgs 346/90',
    tag: 'SUCCESSIONE',
    subtitle: 'Esenzione Successoria',
    summary: 'Stabilisce che le somme corrisposte ai beneficiari di polizze vita sono escluse dall\'attivo ereditario.',
    details: [
      { art: 'Fiscale', text: 'Imposta di successione pari a 0€.' },
      { art: 'Civile', text: 'Il capitale è pagato "Iure Proprio", fuori dall\'asse ereditario.' }
    ],
    color: 'border-amber-500 bg-amber-50/50'
  },
  {
    id: 'TUIR17',
    title: 'Art. 17 e 105 TUIR',
    tag: 'FISCALITÀ B2B',
    subtitle: 'Vantaggio TFR/TFM',
    summary: 'Disciplina la tassazione separata delle indennità di fine rapporto, evitando il cumulo con i redditi ordinari.',
    details: [
      { art: 'Art. 17', text: 'Tassazione separata basata sull\'aliquota media del biennio.' },
      { art: 'Art. 105', text: 'Deducibilità integrale per l\'azienda degli accantonamenti TFM.' }
    ],
    color: 'border-blue-500 bg-blue-50/50'
  }
];

const RegulationsFondiView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = NORMATIVA_DATABASE.filter(n => 
    n.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    n.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-fade-in pb-24">
      {/* Header Executive */}
      <div className="bg-[#0f172a] rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden border-b-8 border-indigo-600">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-600/10 to-transparent"></div>
        <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
           <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                 <div className="bg-indigo-600 p-3 rounded-2xl shadow-xl"><BookOpen size={32} /></div>
                 <span className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-400 italic">Vomero Legal Bible v1.0</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
                La Bibbia <br/> <span className="text-indigo-400">Normativa</span>
              </h1>
              <p className="text-slate-400 text-xl font-medium max-w-2xl leading-relaxed">
                Tutti i riferimenti di legge necessari per blindare la tua consulenza. Ricerca rapida tra Articoli, Commi e Circolari AdE.
              </p>
           </div>
           <div className="lg:col-span-4 bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 text-center relative group">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                   type="text" 
                   placeholder="Cerca art. o parola chiave..." 
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   className="w-full pl-11 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white font-bold outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all text-sm"
                />
              </div>
           </div>
        </div>
      </div>

      {/* Grid Normativa */}
      <div className="grid md:grid-cols-2 gap-8">
        {filtered.map((item) => (
          <div key={item.id} className={`p-8 rounded-[2.5rem] border-2 shadow-sm transition-all hover:shadow-2xl flex flex-col justify-between ${item.color}`}>
             <div>
                <div className="flex justify-between items-start mb-6">
                   <span className="bg-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm text-slate-900 border border-slate-100">{item.tag}</span>
                   <Bookmark size={20} className="text-slate-400" />
                </div>
                <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-1">{item.title}</h3>
                <p className="text-xs font-bold text-indigo-600 uppercase mb-4 tracking-widest italic">{item.subtitle}</p>
                <p className="text-sm text-slate-600 leading-relaxed font-medium mb-8">"{item.summary}"</p>
                
                <div className="space-y-3">
                   {item.details.map((d, i) => (
                      <div key={i} className="flex gap-4 p-4 bg-white/60 rounded-2xl border border-white">
                         <span className="font-black text-xs text-indigo-900 shrink-0">{d.art}</span>
                         <p className="text-[11px] font-bold text-slate-500 leading-snug">{d.text}</p>
                      </div>
                   ))}
                </div>
             </div>
             <button className="mt-8 flex items-center justify-between w-full p-4 bg-white rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-900 hover:bg-indigo-600 hover:text-white transition-all border border-slate-100">
                Leggi Testo Integrale <ChevronRight size={16} />
             </button>
          </div>
        ))}
      </div>

      {/* Footer Tecnico */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
         <div className="flex items-center gap-6">
            <div className="bg-[#0f172a] p-4 rounded-[1.5rem] text-white shadow-lg"><GraduationCap size={32} /></div>
            <div>
               <p className="text-lg font-black text-slate-800 uppercase tracking-tighter leading-none mb-1">Centro Documentazione Gruppo Vomero</p>
               <p className="text-xs text-slate-500 font-bold italic">Aggiornato alla Gazzetta Ufficiale: Febbraio 2025 | Database validato da Advisor Legali</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default RegulationsFondiView;
