
import React, { useState, useMemo } from 'react';
import { SUCCESSION_DATA } from '../constants';
import { 
  Home, Scale, Calculator, AlertTriangle, CheckCircle2, 
  Info, Landmark, History, ChevronRight, Gavel, 
  Briefcase, FileText, UserPlus, Table as TableIcon, 
  Crown, Percent, ArrowDownToLine, Zap, ScrollText,
  Key, ShieldAlert, Coins, Eye, BookOpen, Quote,
  ArrowRight, ShieldCheck, Siren, Timer, Hammer,
  Construction, MapPin, Share2, Heart,
  AlertOctagon, Lightbulb, UserCheck, ShieldPlus,
  Users, UserMinus, Plus, Minus, ArrowUpRight,
  UserX, HeartOff, Landmark as Bank,
  // Fix: Added missing FileSignature icon import
  FileSignature
} from 'lucide-react';

const formatCurrency = (val: number) => 
  new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);

// Database Scenari Successori Completo (Art. 536 e segg. c.c.)
const SUCCESSION_SCENARIOS = [
  {
    id: 'S1',
    label: 'Solo Coniuge',
    description: 'Nessun figlio, nessun genitore in vita.',
    quotas: [
      { label: 'Legittima Coniuge', value: 50, color: 'bg-indigo-600', text: '1/2' },
      { label: 'Quota Disponibile', value: 50, color: 'bg-emerald-500', text: '1/2' }
    ],
    insight: 'Il coniuge è l\'unico erede necessario. Hai il 50% di libertà per premiare terzi o nipoti.',
    legalRef: 'Art. 540 c.c.'
  },
  {
    id: 'S2',
    label: 'Coniuge + 1 Figlio',
    description: 'Famiglia mononucleare standard.',
    quotas: [
      { label: 'Coniuge', value: 33.33, color: 'bg-indigo-600', text: '1/3' },
      { label: 'Figlio', value: 33.33, color: 'bg-indigo-400', text: '1/3' },
      { label: 'Disponibile', value: 33.34, color: 'bg-emerald-500', text: '1/3' }
    ],
    insight: 'Equilibrio perfetto tra eredi e quota libera. Attenzione al diritto di abitazione del coniuge.',
    legalRef: 'Art. 542 c.1 c.c.'
  },
  {
    id: 'S3',
    label: 'Coniuge + 2 o più Figli',
    description: 'Protezione massima della prole.',
    quotas: [
      { label: 'Coniuge', value: 25, color: 'bg-indigo-600', text: '1/4' },
      { label: 'Figli (Totale)', value: 50, color: 'bg-indigo-400', text: '1/2' },
      { label: 'Disponibile', value: 25, color: 'bg-emerald-500', text: '1/4' }
    ],
    insight: 'Rischio frammentazione: l\'immobile viene diviso in quote millesimali complesse.',
    legalRef: 'Art. 542 c.2 c.c.'
  },
  {
    id: 'S4',
    label: 'Solo Figli (Nessun Coniuge)',
    description: 'Genitore single o vedovo.',
    quotas: [
      { label: 'Figli (Totale)', value: 66.66, color: 'bg-indigo-400', text: '2/3' },
      { label: 'Disponibile', value: 33.34, color: 'bg-emerald-500', text: '1/3' }
    ],
    insight: 'Lo Stato "blocca" i 2/3 del patrimonio per la prole. La libera scelta è limitata al 33%.',
    legalRef: 'Art. 537 c.c.'
  },
  {
    id: 'S5',
    label: 'Coniuge + Ascendenti',
    description: 'Niente figli, ma genitori del de cuius in vita.',
    quotas: [
      { label: 'Coniuge', value: 50, color: 'bg-indigo-600', text: '1/2' },
      { label: 'Ascendenti', value: 25, color: 'bg-indigo-300', text: '1/4' },
      { label: 'Disponibile', value: 25, color: 'bg-emerald-500', text: '1/4' }
    ],
    insight: 'Attenzione: i genitori hanno diritto a una quota anche se c\'è il coniuge (se mancano i figli).',
    legalRef: 'Art. 544 c.c.'
  },
  {
    id: 'S6',
    label: 'Solo Ascendenti',
    description: 'Nessun coniuge, nessun figlio.',
    quotas: [
      { label: 'Ascendenti', value: 33.33, color: 'bg-indigo-300', text: '1/3' },
      { label: 'Disponibile', value: 66.67, color: 'bg-emerald-500', text: '2/3' }
    ],
    insight: 'Scenario tipico di chi vuole destinare il patrimonio a fratelli o istituzioni.',
    legalRef: 'Art. 538 c.c.'
  },
  {
    id: 'S7',
    label: 'Libera (Nessun Legittimario)',
    description: 'Niente coniuge, prole o ascendenti.',
    quotas: [
      { label: 'Quota Disponibile', value: 100, color: 'bg-emerald-500', text: '100%' }
    ],
    insight: 'Massima libertà: i fratelli NON sono legittimari. Puoi disporre di tutto con testamento.',
    legalRef: 'Art. 457 c.2 c.c.'
  },
  {
    id: 'S8',
    label: 'Coniuge Separato (Con Addebito)',
    description: 'Separazione legale con colpa dichiarata.',
    quotas: [
      { label: 'Quota Disponibile', value: 100, color: 'bg-emerald-500', text: '100%' }
    ],
    insight: 'Il coniuge con addebito perde i diritti successori, salvo un assegno alimentare vitale.',
    legalRef: 'Art. 548 c.2 c.c.'
  }
];

const RealEstateSuccessionView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'SIMULATORE' | 'LEGITTIMA' | 'NORMATIVA'>('SIMULATORE');
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('S3');
  
  // Input States
  const [marketValue, setMarketValue] = useState<number>(800000);
  const [renditaCatastale, setRenditaCatastale] = useState<number>(1500);
  const [kinship, setKinship] = useState<keyof typeof SUCCESSION_DATA.TAX_RATES>('SPOUSE_CHILDREN');
  const [numHeirs, setNumHeirs] = useState<number>(2);
  const [atLeastOneFirstHome, setAtLeastOneFirstHome] = useState<boolean>(false);

  const taxRules = SUCCESSION_DATA.TAX_RATES[kinship];
  const activeScenario = SUCCESSION_SCENARIOS.find(s => s.id === selectedScenarioId) || SUCCESSION_SCENARIOS[0];

  const analysis = useMemo(() => {
    const multiplier = 120; 
    const cadastralValue = renditaCatastale * 1.05 * multiplier;
    const totalExemption = taxRules.exemption * numHeirs;
    const taxableAmount = Math.max(0, cadastralValue - totalExemption);
    const inheritanceTax = taxableAmount * taxRules.rate;

    let ipotecaria = 0;
    let catastale = 0;

    if (atLeastOneFirstHome) {
      ipotecaria = 200;
      catastale = 200;
    } else {
      ipotecaria = cadastralValue * 0.02;
      catastale = cadastralValue * 0.01;
    }

    const totalCashNeeded = inheritanceTax + ipotecaria + catastale + 3000;
    const impactOnMarket = (totalCashNeeded / marketValue) * 100;

    return {
      cadastralValue,
      totalExemption,
      taxableAmount,
      inheritanceTax,
      ipotecaria,
      catastale,
      totalCashNeeded,
      impactOnMarket,
      isUnderExemption: taxableAmount === 0
    };
  }, [renditaCatastale, kinship, numHeirs, marketValue, taxRules, atLeastOneFirstHome]);

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-fade-in pb-24">
      
      {/* 1. HERO - IL PESO DEGLI IMMOBILI */}
      <div className="bg-[#0f172a] rounded-[3.5rem] p-12 text-white shadow-2xl relative border-b-8 border-amber-600 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-amber-600/10 to-transparent"></div>
        <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
           <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                 <div className="bg-amber-600 p-3 rounded-2xl shadow-xl shadow-amber-600/20"><Home size={32} className="text-white"/></div>
                 <span className="text-[11px] font-black uppercase tracking-[0.4em] text-amber-400 italic">Estate Audit Unit - Gruppo Vomero</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
                Real Estate <br/> <span className="text-amber-500">Legacy Shield</span>
              </h1>
              <p className="text-slate-400 text-xl font-medium max-w-2xl leading-relaxed">
                "Dottore, il passaggio degli immobili non è mai gratuito. Anche se non paga la tassa di successione, lo Stato prenderà migliaia di euro in contanti per volture e ipotecarie."
              </p>
           </div>
           <div className="lg:col-span-4 bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 text-center group">
              <p className="text-[10px] font-black uppercase text-amber-500 mb-2 tracking-widest italic">Contanti per lo Sblocco</p>
              <p className="text-6xl font-black text-white tracking-tighter animate-pulse">{formatCurrency(analysis.totalCashNeeded)}</p>
              <p className="text-[10px] font-black text-rose-400 uppercase mt-4 tracking-widest italic">Capitale liquido richiesto</p>
           </div>
        </div>
      </div>

      {/* 2. NAVIGATION SUB-TABS */}
      <div className="flex flex-wrap gap-2 bg-slate-100 p-1.5 rounded-2xl w-full md:w-fit mx-auto shadow-inner border border-slate-200">
         <button onClick={() => setActiveTab('SIMULATORE')} className={`px-10 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'SIMULATORE' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-500 hover:text-slate-800'}`}>
            <Calculator size={16} /> Calcolo Imposte
         </button>
         <button onClick={() => setActiveTab('LEGITTIMA')} className={`px-10 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'LEGITTIMA' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-500 hover:text-slate-800'}`}>
            <Share2 size={16} /> Architettura Successoria
         </button>
         <button onClick={() => setActiveTab('NORMATIVA')} className={`px-10 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'NORMATIVA' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-500 hover:text-slate-800'}`}>
            <Gavel size={16} /> Disciplina Fiscale
         </button>
      </div>

      {/* 3. TAB: SIMULATORE AVANZATO */}
      {activeTab === 'SIMULATORE' && (
        <div className="grid lg:grid-cols-12 gap-8 animate-fade-in">
           {/* Sidebar Configurazione */}
           <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm space-y-8">
                 <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Construction size={14} className="text-amber-500" /> Dati Patrimoniali
                 </h4>
                 <div className="space-y-6">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                       <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">Rendita Catastale (€)</label>
                       <input type="number" value={renditaCatastale} onChange={(e) => setRenditaCatastale(Number(e.target.value))} className="w-full bg-transparent font-black text-2xl outline-none text-slate-900" />
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                       <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">Valore Mercato (€)</label>
                       <input type="number" value={marketValue} onChange={(e) => setMarketValue(Number(e.target.value))} className="w-full bg-transparent font-black text-xl outline-none text-slate-900" />
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                       <label className="text-[10px] font-black text-slate-400 uppercase block mb-2">Eredi</label>
                       <select value={kinship} onChange={(e) => setKinship(e.target.value as any)} className="w-full bg-transparent font-bold text-slate-800 outline-none text-sm">
                          {Object.entries(SUCCESSION_DATA.TAX_RATES).map(([k, v]) => (
                             <option key={k} value={k}>{v.label}</option>
                          ))}
                       </select>
                    </div>
                    <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
                       <div className="flex justify-between items-center mb-1">
                          <label className="text-[10px] font-black text-indigo-700 uppercase">Numero Eredi</label>
                          <span className="font-black text-indigo-900">{numHeirs}</span>
                       </div>
                       <input type="range" min="1" max="10" value={numHeirs} onChange={(e) => setNumHeirs(Number(e.target.value))} className="w-full h-1.5 bg-indigo-200 rounded-lg appearance-none accent-indigo-600" />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-2xl border-2 border-emerald-200">
                       <div className="flex items-center gap-2">
                          <Key size={18} className="text-emerald-600" />
                          <span className="text-xs font-black text-emerald-900 uppercase">Agevolazione 1° Casa</span>
                       </div>
                       <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked={atLeastOneFirstHome} onChange={(e) => setAtLeastOneFirstHome(e.target.checked)} className="sr-only peer" />
                          <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                       </label>
                    </div>
                 </div>
              </div>

              <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group border-b-8 border-rose-500">
                 <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform"><AlertOctagon size={200} /></div>
                 <h4 className="text-rose-400 text-[10px] font-black uppercase mb-4 tracking-widest italic flex items-center gap-2"><Siren size={14}/> Risk Analysis</h4>
                 <p className="text-sm text-slate-300 leading-relaxed font-medium italic">
                    "Dottore, il problema è la liquidità degli eredi. Anche se gli immobili valgono milioni, se i conti correnti sono bloccati dalla banca per mesi, i suoi figli dovranno indebitarsi per pagare queste imposte."
                 </p>
              </div>
           </div>

           {/* Main Report Area */}
           <div className="lg:col-span-8 space-y-8">
              <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden">
                 <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic mb-10 flex items-center gap-3">
                    <ArrowDownToLine className="text-amber-600" /> Carico Fiscale al Passaggio
                 </h3>
                 
                 <div className="grid md:grid-cols-2 gap-8 mb-10">
                    <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex flex-col justify-between">
                       <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Base Imponibile Fiscale</p>
                          <p className="text-4xl font-black text-slate-900">{formatCurrency(analysis.cadastralValue)}</p>
                          <p className="text-[9px] text-slate-500 font-bold uppercase mt-2">Valore Fiscale Rivalutato</p>
                       </div>
                    </div>

                    <div className={`p-8 rounded-[2.5rem] border-2 flex flex-col justify-between relative shadow-xl ${analysis.isUnderExemption ? 'bg-emerald-50 border-emerald-500' : 'bg-rose-50 border-rose-500'}`}>
                       <div className="absolute top-2 right-2">
                          {analysis.isUnderExemption ? <ShieldCheck className="text-emerald-500" size={24}/> : <ShieldAlert className="text-rose-500" size={24}/>}
                       </div>
                       <div>
                          <p className={`text-[10px] font-black uppercase tracking-widest ${analysis.isUnderExemption ? 'text-emerald-600' : 'text-rose-600'}`}>
                             {analysis.isUnderExemption ? 'Capitale in Franchigia' : 'Sopra Franchigia'}
                          </p>
                          <p className="text-4xl font-black text-slate-900">{formatCurrency(analysis.inheritanceTax)}</p>
                          <p className="text-[9px] text-slate-500 font-bold uppercase mt-2">Imposta Successione ({taxRules.rate * 100}%)</p>
                       </div>
                    </div>
                 </div>

                 <div className="p-10 bg-[#0a0f1d] rounded-[3.5rem] text-white flex flex-col md:flex-row justify-between items-center gap-8 mt-10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5"><Coins size={200} /></div>
                    <div className="relative z-10">
                       <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-1">Cash Totale Necessario</p>
                       <h4 className="text-5xl font-black italic text-white tracking-tighter">{formatCurrency(analysis.totalCashNeeded)}</h4>
                       <p className="text-[9px] text-slate-400 mt-2 font-bold uppercase italic">Include Ipo-Catastali + Spese di Sblocco</p>
                    </div>
                    <div className="bg-amber-500 p-8 rounded-[2.5rem] text-slate-900 text-center shadow-2xl rotate-2">
                       <p className="text-[10px] font-black uppercase mb-1">Efficienza Asset</p>
                       <p className="text-3xl font-black">-{analysis.impactOnMarket.toFixed(1)}%</p>
                    </div>
                 </div>
              </div>

              <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm flex items-center gap-8 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-5"><Lightbulb size={120} /></div>
                 <div className="bg-indigo-100 p-4 rounded-full text-indigo-600 shrink-0"><Quote size={32} /></div>
                 <div className="space-y-2">
                    <h5 className="font-black text-slate-800 uppercase text-xs tracking-widest">Lo Scudo Zurich</h5>
                    <p className="text-sm text-slate-600 font-medium italic leading-relaxed">
                       "Dottore, spostare una quota di patrimonio in **Multinvest** o **Fondo Pensione** significa creare un 'Assegno Circolare' che i figli incassano in 20 giorni. Questi soldi, essendo **esenti da successione**, sono il carburante per sbloccare i suoi immobili."
                    </p>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* 4. TAB: ARCHITETTURA SUCCESSORIA (POTENZIATA CON TUTTI I CASI) */}
      {activeTab === 'LEGITTIMA' && (
        <div className="space-y-12 animate-fade-in">
           <div className="bg-white rounded-[3rem] p-10 border border-slate-200 shadow-sm">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8 border-l-8 border-[#233D7B] pl-8">
                 <div>
                    <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">Matrice delle Quote Legali</h3>
                    <p className="text-slate-500 mt-2 font-medium italic">Simulatore dei limiti alla libertà testamentaria (Codice Civile).</p>
                 </div>
                 <div className="bg-[#233D7B] px-6 py-4 rounded-2xl text-white shadow-xl flex items-center gap-3">
                    <Gavel size={24} className="text-amber-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest leading-tight">Advisor Toolkit <br/> Case-by-Case</span>
                 </div>
              </div>
              
              <div className="grid lg:grid-cols-12 gap-12">
                 {/* Scenario Selector */}
                 <div className="lg:col-span-5 space-y-4">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                       <Users size={16} className="text-[#233D7B]" /> Selezione Scenario Nucleo
                    </h4>
                    <div className="grid gap-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                       {SUCCESSION_SCENARIOS.map((s) => (
                          <button 
                            key={s.id}
                            onClick={() => setSelectedScenarioId(s.id)}
                            className={`w-full text-left p-5 rounded-2xl border-2 transition-all group ${selectedScenarioId === s.id ? 'border-[#233D7B] bg-indigo-50 shadow-md ring-4 ring-indigo-500/5' : 'border-slate-100 hover:bg-slate-50'}`}
                          >
                             <div className="flex justify-between items-center">
                                <h5 className={`font-black text-xs uppercase tracking-tight ${selectedScenarioId === s.id ? 'text-[#233D7B]' : 'text-slate-800'}`}>{s.label}</h5>
                                {selectedScenarioId === s.id && <CheckCircle2 size={16} className="text-[#233D7B]" />}
                             </div>
                             <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase italic">{s.description}</p>
                          </button>
                       ))}
                    </div>
                 </div>

                 {/* Quota Visualization */}
                 <div className="lg:col-span-7 space-y-10">
                    <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 shadow-inner relative overflow-hidden">
                       <div className="absolute top-4 right-10 flex items-center gap-2 text-[#233D7B]">
                          <Scale size={14} />
                          <span className="text-[9px] font-black uppercase">{activeScenario.legalRef}</span>
                       </div>
                       <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8 text-center">Ripartizione Legale del Patrimonio</h4>
                       
                       {/* Visual Progress Bar Segmented */}
                       <div className="h-16 w-full flex rounded-2xl overflow-hidden shadow-2xl border-4 border-white mb-10">
                          {activeScenario.quotas.map((q, i) => (
                             <div 
                                key={i} 
                                style={{ width: `${q.value}%` }} 
                                className={`${q.color} flex flex-col items-center justify-center text-white relative group`}
                             >
                                <span className="text-xl font-black italic leading-none">{q.text}</span>
                                <div className="absolute -bottom-12 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-slate-900 text-white text-[9px] font-black px-3 py-1 rounded-full z-20">
                                   {q.label}: {q.value.toFixed(1)}%
                                </div>
                             </div>
                          ))}
                       </div>

                       {/* Legend & Details */}
                       <div className="grid md:grid-cols-2 gap-6">
                          {activeScenario.quotas.map((q, i) => (
                             <div key={i} className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                                <div className={`w-3 h-10 rounded-full ${q.color}`}></div>
                                <div>
                                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{q.label}</p>
                                   <p className="text-lg font-black text-slate-800 leading-none">{q.text} <span className="text-[10px] text-slate-400">({q.value.toFixed(1)}%)</span></p>
                                </div>
                             </div>
                          ))}
                       </div>
                    </div>

                    <div className="p-8 bg-indigo-900 rounded-[3rem] text-white shadow-xl relative overflow-hidden border-b-8 border-amber-500">
                       <div className="absolute top-0 right-0 p-4 opacity-10"><ShieldPlus size={150} /></div>
                       <h4 className="text-amber-400 text-[10px] font-black uppercase mb-4 tracking-widest italic flex items-center gap-2">
                          <Lightbulb size={14} /> Advisor Insight
                       </h4>
                       <p className="text-lg font-medium leading-relaxed italic mb-6">
                          "{activeScenario.insight}"
                       </p>
                       <div className="bg-white/10 p-6 rounded-2xl border border-white/10">
                          <p className="text-xs font-bold text-amber-500 mb-2 uppercase">Strategia Zurich Spazio Previdenza:</p>
                          <p className="text-xs text-blue-100 leading-relaxed italic">
                             "Dottore, il patrimonio in polizza **non rientra nella legittima**. Se vuole destinare capitali a chi vuole, superando questi blocchi legali, la polizza è lo strumento perfetto per bilanciare l'asse ereditario."
                          </p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           {/* NUOVI FOCUS: PARENTI NON LEGITTIMARI */}
           <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm flex items-start gap-8 relative overflow-hidden group">
                 <div className="absolute -top-10 -right-10 opacity-5 group-hover:rotate-12 transition-transform"><UserX size={200} /></div>
                 <div className="bg-rose-50 p-4 rounded-3xl text-rose-600 shrink-0"><HeartOff size={32} /></div>
                 <div className="space-y-4">
                    <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic">Il Caso Fratelli e Sorelle</h4>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">
                       Molti pensano che fratelli e sorelle abbiano diritto alla legittima. **Falso.** Fratelli, sorelle e nipoti collaterali possono essere esclusi totalmente dal testamento. La legge tutela solo coniuge, figli e ascendenti.
                    </p>
                 </div>
              </div>
              <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm flex items-start gap-8 relative overflow-hidden group">
                 <div className="absolute -top-10 -right-10 opacity-5 group-hover:rotate-12 transition-transform"><Bank size={200} /></div>
                 <div className="bg-emerald-50 p-4 rounded-3xl text-emerald-600 shrink-0"><ShieldCheck size={32} /></div>
                 <div className="space-y-4">
                    <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic">Successione dello Stato</h4>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">
                       In mancanza di parenti entro il 6° grado e senza testamento, l'intero patrimonio finisce allo **Stato**. Con una polizza Zurich, puoi nominare beneficiari amici o enti senza che nessuno possa contestare nulla.
                    </p>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* 5. TAB: NORMATIVA & DISPOSIZIONI */}
      {activeTab === 'NORMATIVA' && (
        <div className="space-y-10 animate-fade-in">
           <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Art. 12 D.Lgs 346/90", tag: "ESCLUSIONE", desc: "Le somme pagate ai beneficiari di polizze vita sono escluse dall'attivo ereditario." },
                { title: "Art. 1923 Cod. Civ.", tag: "SCUDO", desc: "Le somme dovute dall'assicuratore sono impignorabili e insequestrabili." },
                { title: "Agevolazione Prima Casa", tag: "FISCALITÀ", desc: "In successione le imposte ipo-catastali diventano fisse se un erede ha i requisiti 1° casa." }
              ].map((norm, i) => (
                <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:border-indigo-500 transition-all">
                   <span className="text-[10px] font-black bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">{norm.tag}</span>
                   <h4 className="text-xl font-black text-slate-900 uppercase italic mb-4">{norm.title}</h4>
                   <p className="text-sm text-slate-500 font-medium italic leading-relaxed">"{norm.desc}"</p>
                </div>
              ))}
           </div>
        </div>
      )}

      {/* 6. FOOTER EXECUTIVO */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
         <div className="flex items-center gap-6">
            <div className="bg-[#0f172a] p-4 rounded-[1.5rem] text-white shadow-lg"><FileSignature size={32} /></div>
            <div>
               <p className="text-lg font-black text-slate-800 uppercase tracking-tighter leading-none mb-1">Estate Legacy Intelligence Certification</p>
               <p className="text-xs text-slate-500 font-bold italic">Rif. Tecnico: Art. 12 D.Lgs 346/90 | Testo Unico Successioni | Codice Civile Art. 536-548 | Revisione Gruppo Vomero</p>
            </div>
         </div>
      </div>

    </div>
  );
};

export default RealEstateSuccessionView;
