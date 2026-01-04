import React from 'react';
import { 
  Scale, ShieldCheck, Lock, Gavel, 
  CheckCircle2, BookOpen, ScrollText, 
  Zap, Clock, Sparkles, HelpCircle,
  TrendingUp, Landmark, ArrowDownToLine,
  Lightbulb, ShieldAlert, History, Globe,
  Briefcase, FileText, UserPlus, Table as TableIcon, 
  Crown, Percent, GraduationCap, ChevronRight,
  HeartPulse, Umbrella, Coins, Library,
  ShieldPlus, AlertOctagon, FileSignature
} from 'lucide-react';

const WealthProtectionHubView: React.FC = () => {
  
  const pillars = [
    {
      id: 'art38',
      title: 'Art. 38 Costituzione',
      category: 'FONDAMENTO SUPREMO',
      content: 'I lavoratori hanno diritto che siano preveduti e assicurati mezzi adeguati alle loro esigenze di vita in caso di infortunio, malattia, invalidità e vecchiaia.',
      benefit: 'La previdenza complementare non è un investimento finanziario, è un diritto costituzionalmente protetto.',
      icon: Library,
      color: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    {
      id: 'art1923',
      title: 'Art. 1923 Codice Civile',
      category: 'PROTEZIONE FISICA',
      content: 'Impignorabilità e Insequestrabilità delle somme dovute dall\'assicuratore (Fondi Pensione e Polizze Vita).',
      benefit: 'Scudo totale contro creditori civili, fornitori e banche.',
      icon: Lock,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100'
    },
    {
      id: 'art12',
      title: 'Art. 12 D.Lgs 346/90',
      category: 'PROTEZIONE FISCALE',
      content: 'Esclusione delle somme erogate in caso di morte dall\'attivo ereditario soggetto a imposta di successione.',
      benefit: 'Tassazione 0€ per i beneficiari, anche se estranei all\'asse ereditario.',
      icon: Scale,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-100'
    },
    {
      id: 'art2117',
      title: 'Art. 2117 Codice Civile',
      category: 'PROTEZIONE AZIENDALE',
      content: 'I fondi speciali per la previdenza non possono formare oggetto di esecuzione da parte dei creditori del datore di lavoro.',
      benefit: 'Segregazione totale: il risparmio del dipendente è separato dal destino dell\'azienda.',
      icon: Landmark,
      color: 'bg-rose-50 text-rose-600 border-rose-100'
    },
    {
      id: 'art17tuir',
      title: 'Art. 17 e 105 TUIR',
      category: 'VANTAGGIO FISCALE',
      content: 'Regime della tassazione separata per le indennità di fine rapporto e i versamenti a fondi pensione.',
      benefit: 'Il TFR/TFM non si cumula con altri redditi, evitando il salto di aliquota IRPEF.',
      icon: Coins,
      color: 'bg-blue-50 text-blue-600 border-blue-100'
    },
    {
      id: 'ccii',
      title: 'Art. 150 CCII (Codice Crisi)',
      category: 'BLINDAGGIO FALLIMENTARE',
      content: 'Nelle procedure di liquidazione giudiziale, le somme in fondi pensione sono escluse dalla massa attiva fallimentare.',
      benefit: 'Anche in caso di fallimento del professionista o imprenditore, la pensione è salva.',
      icon: ShieldPlus,
      color: 'bg-slate-50 text-slate-700 border-slate-200'
    },
    {
      id: 'art141',
      title: 'Art. 141 Codice Assicurazioni',
      category: 'VELOCITÀ LIQUIDAZIONE',
      content: 'Il risarcimento diretto e la procedura di liquidazione per le prestazioni vita assicurative.',
      benefit: 'Accesso alla liquidità in 20-25 giorni, bypassando i tempi della successione bancaria.',
      icon: Clock,
      color: 'bg-cyan-50 text-cyan-600 border-cyan-100'
    },
    {
      id: 'cassazione',
      title: 'Cass. Sez. Un. 11421/21',
      category: 'CERTEZZA DEL DIRITTO',
      content: 'Riconoscimento della natura previdenziale prevalente su quella finanziaria per le polizze a contenuto protettivo.',
      benefit: 'Giurisprudenza consolidata che tutela il contraente contro tentativi di pignoramento.',
      icon: Gavel,
      color: 'bg-purple-50 text-purple-600 border-purple-100'
    }
  ];

  const comparison = [
    { asset: 'Conto Corrente', protection: 'Nulla (Pignorabile)', tax: '26% + Bollo', succession: 'Tassata (4-8%)', time: 'Mesi (Blocco)' },
    { asset: 'Immobili', protection: 'Bassa (Ipotecabile)', tax: 'IMU + Irpef', succession: 'Tassata + IpoCat (3%)', time: 'Anni (Vendita)' },
    { asset: 'Fondo Pensione', protection: 'Massima (Art. 1923)', tax: '9-15% (Agevolata)', succession: 'ESENTE (0€)', time: 'Settimane (Fast)' },
    { asset: 'Multinvest 90/10', protection: 'Alta (Art. 1923)', tax: '20% Max', succession: 'ESENTE (0€)', time: '20-25 Giorni' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-fade-in pb-24">
      
      {/* 1. HERO MASTERCLASS */}
      <div className="bg-[#0a0f1d] rounded-[3rem] p-12 text-white shadow-2xl relative border-b-8 border-indigo-600 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-600/10 to-transparent"></div>
        <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
           <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                 <div className="bg-indigo-600 p-3 rounded-2xl shadow-xl shadow-indigo-600/20"><GraduationCap size={32} className="text-white"/></div>
                 <span className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-400 italic">Academy Gruppo Vomero - Modulo Wealth Protection</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
                Codice & <br/> <span className="text-indigo-400">Patrimonio Master</span>
              </h1>
              <p className="text-slate-400 text-xl font-medium max-w-2xl leading-relaxed">
                L'architettura legale dei Fondi Pensione e delle Polizze Multiramo. Trasforma il tecnicismo normativo in una barriera d'acciaio per il tuo cliente.
              </p>
           </div>
           <div className="lg:col-span-4 bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 text-center">
              <p className="text-[10px] font-black uppercase text-indigo-400 mb-2 tracking-widest italic">Compliance 2025</p>
              <p className="text-6xl font-black text-white tracking-tighter">8</p>
              <p className="text-[10px] font-black text-indigo-300 uppercase mt-4 tracking-widest leading-tight italic">Pilastri Normativi <br/> Certificati</p>
           </div>
        </div>
      </div>

      {/* 2. I 8 PILASTRI NORMATIVI - GRID ESPANSA */}
      <section className="space-y-8">
        <div className="flex items-center gap-4 border-l-8 border-indigo-600 pl-6 py-2">
           <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic">L'Enciclopedia della Protezione</h3>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
           {pillars.map((p) => {
             const Icon = p.icon;
             return (
               <div key={p.id} className={`p-8 rounded-[2.5rem] border-2 transition-all hover:shadow-2xl hover:-translate-y-2 flex flex-col justify-between ${p.color} shadow-sm`}>
                  <div>
                    <div className="bg-white p-4 rounded-2xl w-fit shadow-md mb-6"><Icon size={24} /></div>
                    <p className="text-[9px] font-black uppercase tracking-widest mb-2 opacity-70">{p.category}</p>
                    <h4 className="text-xl font-black mb-4 leading-tight">{p.title}</h4>
                    <p className="text-[11px] font-bold leading-relaxed mb-6 italic opacity-80 line-clamp-4">"{p.content}"</p>
                  </div>
                  <div className="pt-6 border-t border-black/5">
                     <p className="text-[10px] font-black uppercase mb-1">Il Vantaggio Advisor:</p>
                     <p className="text-xs font-black tracking-tight leading-snug">{p.benefit}</p>
                  </div>
               </div>
             );
           })}
        </div>
      </section>

      {/* 3. COMPARAZIONE ASSET LAB */}
      <section className="bg-white rounded-[3rem] p-10 border border-slate-200 shadow-sm overflow-hidden relative">
         <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12"><Landmark size={300} /></div>
         <div className="relative z-10 space-y-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
               <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic flex items-center gap-4">
                  <TableIcon className="text-indigo-600" /> Matrice di Resilienza Patrimoniale
               </h3>
               <div className="bg-indigo-50 px-6 py-3 rounded-2xl text-[10px] font-black text-indigo-700 uppercase tracking-widest border border-indigo-100 italic">
                  Advisor Tool - Benchmark 2025
               </div>
            </div>

            <div className="overflow-x-auto rounded-[2rem] border border-slate-100 shadow-inner">
               <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead className="bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest">
                     <tr>
                        <th className="px-6 py-8">Asset / Strumento</th>
                        <th className="px-6 py-8 text-center">Protezione Legale</th>
                        <th className="px-6 py-8 text-center">Prelievo Fiscale</th>
                        <th className="px-6 py-8 text-center">Esenzione Successione</th>
                        <th className="px-6 py-8 text-center">Tempi Sblocco</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs font-bold">
                     {comparison.map((row, idx) => (
                        <tr key={idx} className={`hover:bg-indigo-50/30 transition-colors ${row.asset.includes('Fondo') || row.asset.includes('Multinvest') ? 'bg-indigo-50/10' : ''}`}>
                           <td className="px-6 py-6 font-black text-slate-800 text-sm uppercase">{row.asset}</td>
                           <td className={`px-6 py-6 text-center ${row.protection.includes('Massima') || row.protection.includes('Alta') ? 'text-emerald-600' : 'text-rose-600'}`}>{row.protection}</td>
                           <td className="px-6 py-6 text-center text-slate-600">{row.tax}</td>
                           <td className={`px-6 py-6 text-center ${row.succession === 'ESENTE (0€)' ? 'text-emerald-600 font-black' : 'text-rose-600'}`}>{row.succession}</td>
                           <td className="px-6 py-6 text-center text-slate-500 italic">{row.time}</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </section>

      {/* 4. SALES STRATEGY & SCRIPTS */}
      <div className="grid lg:grid-cols-2 gap-8">
         <div className="bg-[#233D7B] p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group transition-all hover:shadow-indigo-500/20">
            <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform"><Lightbulb size={250} /></div>
            <h4 className="text-2xl font-black italic uppercase tracking-tighter mb-8 text-amber-400">Strategia Commerciale</h4>
            <div className="space-y-6 relative z-10">
               <div className="bg-white/10 p-6 rounded-3xl border border-white/10 hover:bg-white/15 transition-all">
                  <p className="text-xs font-black uppercase text-amber-500 mb-2">La Gerarchia delle Fonti</p>
                  <p className="text-sm font-medium italic opacity-90 leading-relaxed">
                    "Dottore, il suo risparmio in banca è un contratto ordinario. Il risparmio nel Fondo Pensione è un mandato protetto dalla Costituzione (Art. 38) e da leggi speciali del Codice Civile. Non stiamo solo investendo, stiamo blindando il suo tenore di vita futuro."
                  </p>
               </div>
               <div className="bg-white/10 p-6 rounded-3xl border border-white/10 hover:bg-white/15 transition-all">
                  <p className="text-xs font-black uppercase text-amber-500 mb-2">Il Rischio Aziendale (Art. 2117)</p>
                  <p className="text-sm font-medium italic opacity-90 leading-relaxed">
                    "Mettere il TFR nel fondo significa staccare il suo patrimonio dal destino dell'azienda. Se domani l'azienda ha dei creditori, il suo fondo è inattaccabile perché è protetto da un vincolo di destinazione invalicabile (Art. 2117 c.c.)."
                  </p>
               </div>
            </div>
         </div>

         <div className="space-y-6">
            <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-5"><AlertOctagon size={100} className="text-rose-600" /></div>
               <h4 className="text-lg font-black text-slate-800 uppercase tracking-tighter mb-6 flex items-center gap-3">
                  <ShieldAlert className="text-rose-600" /> Focus Revocatoria (Art. 2901 c.c.)
               </h4>
               <p className="text-sm text-slate-500 leading-relaxed mb-6 font-medium italic">
                 "L'imprenditore deve sapere che la protezione va costruita in **tempi di pace**. Un versamento effettuato quando il dissesto è già palese è revocabile. La consulenza del Gruppo Vomero serve a pianificare oggi lo scudo che servirà domani."
               </p>
               <div className="flex items-center gap-3 p-4 bg-rose-50 rounded-2xl border border-rose-100">
                  <CheckCircle2 size={18} className="text-rose-600" />
                  <span className="text-[10px] font-black uppercase text-rose-800 tracking-widest">Compliance Temporale Certificata</span>
               </div>
            </div>

            <div className="bg-slate-900 p-8 rounded-[3rem] text-white shadow-xl flex flex-col justify-center relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-5"><Zap size={100} /></div>
               <h4 className="text-xl font-black uppercase italic tracking-tighter mb-4 text-amber-400">Wealth Protection Toolkit</h4>
               <p className="text-xs text-slate-400 leading-relaxed font-medium mb-6">
                 Utilizza questi strumenti per documentare la protezione al cliente:
               </p>
               <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-xs font-bold text-indigo-100">
                     <ChevronRight size={14} className="text-amber-500" /> Scheda Tecnica Art. 1923 Zurich
                  </li>
                  <li className="flex items-center gap-3 text-xs font-bold text-indigo-100">
                     <ChevronRight size={14} className="text-amber-500" /> Dichiarazione di Esenzione Successione
                  </li>
                  <li className="flex items-center gap-3 text-xs font-bold text-indigo-100">
                     <ChevronRight size={14} className="text-amber-500" /> Estratto Codice della Crisi (Art. 150)
                  </li>
               </ul>
            </div>
         </div>
      </div>

      {/* 5. FOOTER EXECUTIVO */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
         <div className="flex items-center gap-6">
            <div className="bg-[#0a0f1d] p-4 rounded-[1.5rem] text-white shadow-lg"><BookOpen size={32} /></div>
            <div>
               <p className="text-lg font-black text-slate-800 uppercase tracking-tighter leading-none mb-1">Legal Asset Protection Certification</p>
               <p className="text-xs text-slate-500 font-bold italic">Ref: Costituzione Italiana | Codice Civile | Codice della Crisi | Revisione 03/2025</p>
            </div>
         </div>
         <div className="text-right">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">RELAZIONE AD USO ESCLUSIVO CONSULENTI GRUPPO VOMERO</p>
         </div>
      </div>

    </div>
  );
};

export default WealthProtectionHubView;