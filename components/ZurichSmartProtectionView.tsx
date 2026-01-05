import React, { useState, useMemo } from 'react';
import { ZURICH_SMART_CONSTANTS, ZURICH_SMART_TECHNICAL_DATA, ZURICH_SMART_COMMISSION_DATA } from '../constants';
import { 
  ShieldPlus, Umbrella, HeartPulse, Calculator, CheckCircle2, 
  AlertTriangle, Euro, Cigarette, Baby, Star, Quote, 
  ArrowRight, UserSearch, Flame, Trophy, Gem, Ban, 
  Ruler, History, Microscope, Sparkles, Siren, 
  Clock, FileText, ChevronRight, Zap, Layers, 
  FileSignature, Rocket, Skull, PiggyBank,
  Info, Target, Users, Briefcase, HeartHandshake,
  UserCheck, ShieldCheck, Wallet, MinusCircle, PlusCircle,
  TrendingUp, Stethoscope, Receipt, BookOpen, UserMinus,
  AlertOctagon, XCircle
} from 'lucide-react';

const formatCurrency = (val: number) => 
  new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);

const ZurichSmartProtectionView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'CONCEPT' | 'DIAGNOSI' | 'LESIONI' | 'PRICING' | 'PROFIT'>('CONCEPT');
  
  // --- STATO DIAGNOSI (4 DOMANDE + BMI da Pag. 11) ---
  const [age, setAge] = useState<number>(40);
  const [weight, setWeight] = useState<number>(75);
  const [height, setHeight] = useState<number>(180);
  const [smoker, setSmoker] = useState<boolean>(false);
  const [answers, setAnswers] = useState({ q3: false, q4: false, q5: false });

  // --- STATO REDDITIVITÀ ---
  const [premium, setPremium] = useState<number>(500);
  const [duration, setDuration] = useState<5 | 10>(10);

  const bmi = useMemo(() => {
    const hMeters = height / 100;
    if (hMeters === 0) return 0;
    return weight / (hMeters * hMeters);
  }, [weight, height]);

  const underwritingStatus = useMemo(() => {
    if (answers.q3 || answers.q4 || answers.q5) return 'REJECTED_HEALTH';
    if (bmi < 16 || bmi > 35) return 'REJECTED_BMI';
    if (age < 18 || age > 70) return 'REJECTED_AGE';
    return 'ACCEPTED';
  }, [answers, bmi, age]);

  const commissions = useMemo(() => {
    const netPremium = Math.max(0, premium - ZURICH_SMART_COMMISSION_DATA.FIXED_PRACTICE_COST);
    const payInRate = duration === 5 
      ? ZURICH_SMART_COMMISSION_DATA.PAYIN_RATES.DUR_5Y 
      : ZURICH_SMART_COMMISSION_DATA.PAYIN_RATES.DUR_10_15_20Y;
    
    const payInCompagnia = netPremium * payInRate;
    const advisorCommission = payInCompagnia * ZURICH_SMART_COMMISSION_DATA.FIXED_PAYOUT.NEW_BUSINESS;
    
    return { netPremium, payInRate, payInCompagnia, advisorCommission };
  }, [premium, duration]);

  const targetingData = [
    {
      title: "Famiglie e Neo Famiglie",
      hook: "Come offrire serenità ai tuoi figli?",
      pain: "Paura che il patrimonio per il futuro dei figli venga compromesso.",
      script: "Dottore, non sacrifichiamo i progetti: lo Smart Protection protegge la costruzione del futuro dei suoi figli senza intaccare il patrimonio familiare.",
      icon: Baby,
      color: "bg-blue-50 text-[#233D7B]"
    },
    {
      title: "Adulti e Senior",
      hook: "Mantenimento Tenore di Vita",
      pain: "Rischio di smobilizzo forzato di investimenti in caso di decesso o infortunio.",
      script: "Offri ai tuoi eredi la tranquillità di affrontare le spese di successione senza intaccare gli immobili.",
      icon: Users,
      color: "bg-indigo-50 text-indigo-700"
    },
    {
      title: "Autonomi e Imprenditori",
      hook: "Continuità dell'attività",
      pain: "Il valore del tempo e l'impatto di un infortunio sulla società.",
      script: "Proteggi i soci a vicenda: il capitale liquidato copre le rate con banche e fornitori senza stressare l'impresa.",
      icon: Briefcase,
      color: "bg-amber-50 text-amber-700"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-fade-in pb-24">
      
      {/* 1. HERO - CONCEPT 1+1=2 */}
      <div className="bg-[#233D7B] rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden border-b-8 border-amber-500">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-amber-500/10 to-transparent"></div>
        <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
           <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                 <div className="bg-amber-50 p-3 rounded-2xl shadow-xl shadow-amber-600/20"><ShieldPlus size={32} className="text-[#233D7B]"/></div>
                 <span className="text-[11px] font-black uppercase tracking-[0.4em] text-amber-400 italic">Smart Protection - Edizione 03/2025</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
                Concept <br/> <span className="text-amber-500">1 + 1 = 2</span>
              </h1>
              <p className="text-blue-100 text-xl font-medium max-w-2xl leading-relaxed">
                Una garanzia **Caso Morte** unita a un'innovativa garanzia **Lesioni da Infortunio**. Tutto in un unico prodotto a emissione istantanea.
              </p>
           </div>
           <div className="lg:col-span-4 bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 text-center relative group">
              <p className="text-[10px] font-black uppercase text-amber-400 mb-2 tracking-widest italic italic">Emissione Digitale</p>
              <p className="text-6xl font-black text-white tracking-tighter">4</p>
              <p className="text-[10px] font-black text-blue-300 uppercase mt-4 tracking-widest leading-tight italic">Domande sulla salute <br/> Zero documentazione</p>
           </div>
        </div>
      </div>

      {/* 2. NAVIGATION TOOLKIT */}
      <div className="flex flex-wrap gap-2 bg-slate-100 p-1.5 rounded-2xl w-full md:w-fit mx-auto shadow-inner border border-slate-200">
         <button onClick={() => setActiveTab('CONCEPT')} className={`px-8 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'CONCEPT' ? 'bg-[#233D7B] text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}>
            <Target size={16} /> Sales Concept
         </button>
         <button onClick={() => setActiveTab('DIAGNOSI')} className={`px-8 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'DIAGNOSI' ? 'bg-[#233D7B] text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}>
            <UserSearch size={16} /> Underwriting Lab
         </button>
         <button onClick={() => setActiveTab('LESIONI')} className={`px-8 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'LESIONI' ? 'bg-[#233D7B] text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}>
            <Gem size={16} /> Catalogo Lesioni
         </button>
         <button onClick={() => setActiveTab('PRICING')} className={`px-8 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'PRICING' ? 'bg-[#233D7B] text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}>
            <Euro size={16} /> Tabelle Premi
         </button>
         <button onClick={() => setActiveTab('PROFIT')} className={`px-8 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'PROFIT' ? 'bg-amber-500 text-slate-900 shadow-md border-b-2 border-amber-600' : 'text-slate-500 hover:text-slate-800'}`}>
            <TrendingUp size={16} /> Profitto Advisor
         </button>
      </div>

      <div className="min-h-[600px]">
        
        {/* --- TAB: CONCEPT --- */}
        {activeTab === 'CONCEPT' && (
          <div className="space-y-10 animate-fade-in">
             <div className="grid md:grid-cols-3 gap-8">
                {targetingData.map((t, idx) => (
                   <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col justify-between group hover:border-[#233D7B] transition-all">
                      <div>
                         <div className={`${t.color} p-4 rounded-3xl w-fit mb-6 shadow-sm`}>
                            <t.icon size={28} />
                         </div>
                         <h4 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter mb-4">{t.title}</h4>
                         <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-4 italic">"{t.hook}"</p>
                         <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6">{t.pain}</p>
                      </div>
                      <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 relative overflow-hidden">
                         <Quote className="absolute top-2 right-2 text-[#233D7B] opacity-10" size={40} />
                         <p className="text-xs font-bold text-[#233D7B] leading-relaxed italic relative z-10">"{t.script}"</p>
                      </div>
                   </div>
                ))}
             </div>

             <div className="bg-slate-900 p-12 rounded-[3.5rem] text-white shadow-xl relative overflow-hidden border-b-8 border-indigo-600">
                <div className="absolute top-0 right-0 p-12 opacity-5 rotate-12"><ShieldCheck size={300} /></div>
                <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
                   <div className="lg:col-span-7 space-y-6">
                      <h3 className="text-3xl font-black italic uppercase tracking-tighter text-amber-500">I vantaggi fiscali (Pag. 3)</h3>
                      <div className="grid grid-cols-2 gap-6">
                         <div className="flex gap-4">
                            <div className="w-1.5 h-10 bg-amber-500 rounded-full"></div>
                            <div>
                               <p className="text-[10px] font-black text-slate-400 uppercase">Detraibilità</p>
                               <p className="text-sm font-bold">19% del premio fino a 530€</p>
                            </div>
                         </div>
                         <div className="flex gap-4">
                            <div className="w-1.5 h-10 bg-indigo-500 rounded-full"></div>
                            <div>
                               <p className="text-[10px] font-black text-slate-400 uppercase">Successione</p>
                               <p className="text-sm font-bold">Capitale 0% Tasse</p>
                            </div>
                         </div>
                      </div>
                   </div>
                   <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-3xl p-8 italic text-sm leading-relaxed text-slate-300">
                      "Dottore, il massimale di **50.000€** per le lesioni non richiede invalidità permanenti lunghe. Si attiva con un referto di pronto soccorso per le 47 lesioni mappate. È liquidità immediata per lei."
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* --- TAB: DIAGNOSI (UNDERWRITING) --- */}
        {activeTab === 'DIAGNOSI' && (
          <div className="space-y-10 animate-fade-in">
             <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-xl overflow-hidden relative">
                <div className="absolute top-0 right-0 p-10 opacity-5"><UserSearch size={300} /></div>
                <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic mb-10 flex items-center gap-3">
                   <Microscope className="text-indigo-600" /> Underwriting Motor (Pag. 11)
                </h3>

                <div className="grid lg:grid-cols-12 gap-12 relative z-10">
                   <div className="lg:col-span-7 space-y-8">
                      <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 shadow-inner space-y-6">
                         <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest">
                            <Ruler size={16} className="text-indigo-600" /> Parametri Biometrici
                         </div>
                         <div className="grid grid-cols-3 gap-6">
                            <div className="space-y-2">
                               <label className="text-[10px] font-black text-slate-500 uppercase block">Età Assicurativa</label>
                               <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-2xl font-black outline-none focus:ring-4 focus:ring-indigo-100 transition-all" />
                            </div>
                            <div className="space-y-2">
                               <label className="text-[10px] font-black text-slate-500 uppercase block">Peso (kg)</label>
                               <input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-2xl font-black outline-none focus:ring-4 focus:ring-indigo-100 transition-all" />
                            </div>
                            <div className="space-y-2">
                               <label className="text-[10px] font-black text-slate-500 uppercase block">Altezza (cm)</label>
                               <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-2xl font-black outline-none focus:ring-4 focus:ring-indigo-100 transition-all" />
                            </div>
                         </div>
                      </div>

                      <div className="space-y-3">
                         <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                            <Stethoscope size={16} className="text-indigo-600" /> Le 4 Domande Decisive
                         </div>
                         {[
                            { id: 'q3', text: 'Tumore maligno negli ultimi 10 anni o esami sospetti?' },
                            { id: 'q4', text: 'Gravi patologie cardiocircolatorie (infarto, ictus, aneurisma)?' },
                            { id: 'q5', text: 'Malattie neurodegenerative, SLA, SM o insufficienza renale?' }
                         ].map(q => (
                            <div key={q.id} className="p-5 bg-white border border-slate-100 rounded-3xl flex justify-between items-center shadow-sm">
                               <p className="text-xs font-bold text-slate-700 pr-4">{q.text}</p>
                               <div className="flex gap-2">
                                  <button onClick={() => setAnswers(prev => ({ ...prev, [q.id]: false }))} className={`px-4 py-1.5 rounded-xl text-[10px] font-black transition-all ${!answers[q.id as keyof typeof answers] ? 'bg-emerald-500 text-white shadow-lg' : 'bg-slate-100 text-slate-400'}`}>NO</button>
                                  <button onClick={() => setAnswers(prev => ({ ...prev, [q.id]: true }))} className={`px-4 py-1.5 rounded-xl text-[10px] font-black transition-all ${answers[q.id as keyof typeof answers] ? 'bg-rose-500 text-white shadow-lg' : 'bg-slate-100 text-slate-400'}`}>SÌ</button>
                               </div>
                            </div>
                         ))}
                      </div>
                   </div>

                   <div className="lg:col-span-5 flex flex-col justify-center">
                      <div className={`p-10 rounded-[3.5rem] text-center shadow-2xl relative border-t-8 transition-all duration-500 ${
                         underwritingStatus === 'ACCEPTED' ? 'bg-emerald-50 border-emerald-500' : 'bg-rose-50 border-rose-500'
                      }`}>
                         <div className="mb-6 inline-block p-6 rounded-full bg-white shadow-xl">
                            {underwritingStatus === 'ACCEPTED' 
                               ? <CheckCircle2 size={64} className="text-emerald-500" />
                               : <XCircle size={64} className="text-rose-500" />
                            }
                         </div>
                         <h4 className={`text-3xl font-black italic uppercase mb-4 leading-none ${
                            underwritingStatus === 'ACCEPTED' ? 'text-emerald-800' : 'text-rose-800'
                         }`}>
                            {underwritingStatus === 'ACCEPTED' ? 'Assumibile' : 'Negato'}
                         </h4>
                         <div className="bg-white/80 backdrop-blur p-4 rounded-2xl mb-6">
                            <p className="text-[10px] font-black text-slate-400 uppercase">BMI Reale</p>
                            <p className="text-2xl font-black text-slate-900">{bmi.toFixed(1)}</p>
                            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Range: 16 - 35</p>
                         </div>
                         <p className="text-[11px] font-bold italic text-slate-600 px-4 leading-relaxed">
                            {underwritingStatus === 'ACCEPTED' 
                               ? 'Dottore, il profilo rispetta i criteri Ed. 03/2025. Emissione possibile subito.'
                               : 'Spiacente, i criteri sanitari o il BMI bloccano l\'emissione smart.'
                            }
                         </p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* --- TAB: LESIONI (IL CATALOGO) --- */}
        {activeTab === 'LESIONI' && (
          <div className="space-y-8 animate-fade-in">
             <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden">
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
                   <div>
                      <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic">Catalogo Indennizzi (Pag. 24)</h3>
                      <p className="text-slate-500 text-sm font-medium mt-1">47 Lesioni mappate a valore predefinito.</p>
                   </div>
                   <div className="bg-[#233D7B] px-8 py-4 rounded-3xl text-white text-center shadow-xl">
                      <p className="text-[10px] font-black uppercase opacity-70 mb-1">Massimale "a smontaggio"</p>
                      <p className="text-3xl font-black tracking-tighter">50.000 €</p>
                   </div>
                </div>

                <div className="grid md:grid-cols-4 gap-4 mb-10">
                   {[
                      { level: 1, amount: 2500, label: "Fratture & Amputazioni Dita", color: 'bg-blue-100 text-blue-700' },
                      { level: 2, amount: 7500, label: "Lesioni Vertebrali & Organiche", color: 'bg-indigo-100 text-indigo-700' },
                      { level: 3, amount: 15000, label: "Perdite Organiche Gravi", color: 'bg-amber-100 text-amber-700' },
                      { level: 4, amount: 25000, label: "Invalidità Totali (Cecità/Sordità)", color: 'bg-rose-100 text-rose-700' },
                   ].map(l => (
                      <div key={l.level} className={`p-6 rounded-3xl border-2 border-transparent ${l.color} text-center shadow-sm`}>
                         <p className="text-[10px] font-black uppercase mb-1 tracking-widest">Livello {l.level}</p>
                         <p className="text-2xl font-black">{formatCurrency(l.amount)}</p>
                         <p className="text-[9px] font-bold uppercase mt-1 opacity-70">{l.label}</p>
                      </div>
                   ))}
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                   {ZURICH_SMART_CONSTANTS.INJURIES.map((inj, idx) => (
                      <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
                         <div className={`absolute left-0 top-0 h-full w-1.5 ${
                            inj.level === 1 ? 'bg-blue-500' :
                            inj.level === 2 ? 'bg-indigo-500' :
                            inj.level === 3 ? 'bg-amber-500' : 'bg-rose-500'
                         }`}></div>
                         <p className="text-[9px] font-black text-slate-400 uppercase mb-1">{inj.category}</p>
                         <h4 className="font-bold text-slate-900 mb-4 h-10 flex items-center leading-tight text-xs uppercase tracking-tighter">{inj.name}</h4>
                         <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                            <span className="text-[10px] font-black text-slate-700">LIV. {inj.level}</span>
                            <p className="text-lg font-black text-slate-900">{formatCurrency(inj.amount)}</p>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          </div>
        )}

        {/* --- TAB: TABELLE PREMI --- */}
        {activeTab === 'PRICING' && (
          <div className="space-y-10 animate-fade-in">
             <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                   <div>
                      <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">Premi Annuali Certificati</h3>
                      <p className="text-slate-400 text-[10px] font-black mt-2 uppercase tracking-widest italic">Capitale 100.000€ - Inclusa Componente Morte + Lesioni</p>
                   </div>
                   <div className="p-1 bg-slate-100 rounded-2xl border border-slate-200 flex gap-2">
                      <button onClick={() => setSmoker(false)} className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${!smoker ? 'bg-[#233D7B] text-white shadow-lg' : 'text-slate-500 hover:text-slate-700'}`}>Non Fumatore</button>
                      <button onClick={() => setSmoker(true)} className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${smoker ? 'bg-rose-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-700'}`}>Fumatore</button>
                   </div>
                </div>

                <div className="overflow-x-auto rounded-[2rem] border border-slate-100 shadow-inner">
                   <table className="w-full text-left border-collapse">
                      <thead className="bg-[#233D7B] text-white text-[9px] font-black uppercase tracking-widest">
                         <tr>
                            <th className="px-8 py-6 sticky left-0 bg-[#233D7B] z-10">Età Assicurativa</th>
                            <th className="px-6 py-6 text-center">Durata 5y</th>
                            <th className="px-6 py-6 text-center">Durata 10y</th>
                            <th className="px-6 py-6 text-center">Durata 15y</th>
                            <th className="px-6 py-6 text-center">Durata 20y</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-sm font-bold">
                         {ZURICH_SMART_CONSTANTS.PRICING_TABLE_100K[smoker ? 'SMOKER' : 'NON_SMOKER'].map((row) => (
                            <tr key={row.age} className="hover:bg-slate-50 transition-colors">
                               <td className="px-8 py-5 font-black text-slate-800 text-lg sticky left-0 bg-white group-hover:bg-slate-50 z-10">{row.age} Anni</td>
                               <td className="px-6 py-5 text-center text-slate-600">{row.y5 === 0 ? '-' : `${row.y5} €`}</td>
                               <td className="px-6 py-5 text-center text-slate-600">{row.y10 === 0 ? '-' : `${row.y10} €`}</td>
                               <td className="px-6 py-5 text-center text-slate-600">{row.y15 === 0 ? '-' : `${row.y15} €`}</td>
                               <td className="px-6 py-5 text-center text-slate-600">{row.y20 === 0 ? '-' : `${row.y20} €`}</td>
                            </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
                <div className="mt-8 p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-center gap-3">
                   <Info size={20} className="text-amber-600" />
                   <p className="text-[10px] text-amber-900 font-bold uppercase italic leading-tight">Definizione Fumatore (Pag. 18): Chi fuma o ha mai fumato negli ultimi 24 mesi più di 5 sigarette al giorno.</p>
                </div>
             </div>
          </div>
        )}

        {/* --- TAB: PROFITTO ADVISOR (87,50%) --- */}
        {activeTab === 'PROFIT' && (
          <div className="space-y-10 animate-fade-in">
             <div className="bg-slate-900 rounded-[3.5rem] p-12 text-white shadow-2xl relative overflow-hidden border-b-8 border-amber-500">
                <div className="absolute top-0 right-0 p-12 opacity-5 rotate-12"><PiggyBank size={300} /></div>
                <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
                   <div className="lg:col-span-7 space-y-8">
                      <div className="flex items-center gap-3">
                         <div className="bg-amber-500 p-2 rounded-xl text-slate-900 shadow-xl"><Receipt size={24} /></div>
                         <h3 className="text-3xl font-black italic uppercase tracking-tighter text-amber-500">Business Payout 2025</h3>
                      </div>
                      <p className="text-xl font-medium leading-relaxed italic text-slate-300">
                        "Un sistema provvigionale flat che valorizza ogni pratica. 87,50% di payout netto su provvigioni payin differenziate per durata."
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4">
                         <div className="p-6 bg-white/5 border border-white/10 rounded-3xl">
                            <p className="text-[9px] font-black text-amber-500 uppercase mb-1 tracking-widest italic">PayIn Rate (Provvigione)</p>
                            <p className="text-4xl font-black text-white">{duration === 5 ? '40%' : '80%'}</p>
                            <p className="text-[9px] text-slate-500 mt-2 font-bold uppercase">SUL PREMIO NETTO</p>
                         </div>
                         <div className="p-6 bg-white/5 border border-white/10 rounded-3xl">
                            <p className="text-[9px] font-black text-indigo-400 uppercase mb-1 tracking-widest italic">Payout Advisor Flat</p>
                            <p className="text-4xl font-black text-white">87,50%</p>
                            <p className="text-[9px] text-slate-500 mt-2 font-bold uppercase">SUL MONTE PROVVIGIONALE</p>
                         </div>
                      </div>
                   </div>

                   <div className="lg:col-span-5 bg-white/10 backdrop-blur-3xl p-10 rounded-[3.5rem] border border-white/10 shadow-2xl">
                      <h4 className="text-xs font-black uppercase text-amber-400 mb-8 tracking-widest text-center italic">Calcolo Redditività Advisor</h4>
                      <div className="space-y-6">
                         <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                            <label className="text-[9px] font-black text-slate-400 uppercase mb-1 block">Premio Annuo Lordo (€)</label>
                            <input type="number" value={premium} onChange={(e) => setPremium(Number(e.target.value))} className="w-full bg-transparent font-black text-3xl outline-none text-white border-b border-white/20 pb-2 focus:border-amber-500 transition-colors" />
                         </div>
                         <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                            <label className="text-[9px] font-black text-slate-400 uppercase mb-2 block">Durata Contratto</label>
                            <div className="flex gap-2">
                               <button onClick={() => setDuration(5)} className={`flex-1 py-2 rounded-xl text-[10px] font-black transition-all ${duration === 5 ? 'bg-amber-500 text-slate-900 shadow-lg' : 'bg-white/5 text-slate-400'}`}>5 ANNI (40%)</button>
                               <button onClick={() => setDuration(10)} className={`flex-1 py-2 rounded-xl text-[10px] font-black transition-all ${duration === 10 ? 'bg-amber-500 text-slate-900 shadow-lg' : 'bg-white/5 text-slate-400'}`}>10+ ANNI (80%)</button>
                            </div>
                         </div>
                         <div className="pt-6 border-t border-white/10 text-center">
                            <p className="text-[10px] font-black uppercase text-amber-500 mb-1 italic tracking-widest">Il Tuo Compenso Diretto</p>
                            <p className="text-5xl font-black text-emerald-400 tracking-tighter animate-pulse">{formatCurrency(commissions.advisorCommission)}</p>
                            <p className="text-[9px] text-slate-500 mt-2 font-bold uppercase italic leading-tight">Include 40€ fissi per emissione pratica</p>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}

      </div>

      {/* FOOTER EXECUTIVO */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
         <div className="flex items-center gap-6">
            <div className="bg-[#233D7B] p-4 rounded-[1.5rem] text-white shadow-lg"><BookOpen size={32} /></div>
            <div>
               <p className="text-lg font-black text-slate-800 uppercase tracking-tighter leading-none mb-1">Smart Protection Diagnostic v3.9</p>
               <p className="text-xs text-slate-500 font-bold italic">Base Tecnica: Set Informativo Ed. 03/2025 | Advisor Hub Gruppo Vomero | Girato su Vercel Architecture</p>
            </div>
         </div>
         <div className="text-right">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">RELAZIONE AD USO INTERNO RISERVATO - CONFIDENTIAL</p>
         </div>
      </div>

    </div>
  );
};

export default ZurichSmartProtectionView;