import React, { useState, useMemo } from 'react';
import { ZURICH_SMART_CONSTANTS, ZURICH_SMART_TECHNICAL_DATA, ZURICH_SMART_COMMISSION_DATA } from '../constants';
import { 
  ShieldCheck, Umbrella, HeartPulse, Stethoscope, Search, Info, Users, 
  Briefcase, FileCheck, AlertTriangle, XCircle, Euro, Cigarette, 
  Baby, Calculator, CheckCircle2, Star, Quote, ArrowRight, UserPlus, 
  ShieldAlert, BookOpen, Scale, Landmark, Target, TrendingUp,
  Coins, ReceiptEuro, Wallet, Activity, UserSearch, Flame,
  Trophy, Lightbulb, Handshake, Gem, Ban, Ruler, History,
  Microscope, Sparkles, Siren, Thermometer, MapPin, Ghost, Clock,
  FileText, ShieldPlus, ChevronRight, Zap, Layers, FileSignature, Rocket,
  Skull, Waves, Mountain, Plane, Ghost as GhostIcon, AlertOctagon,
  AlertCircle, ShieldX, LifeBuoy, Banknote, PiggyBank
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, BarChart, Bar, Legend } from 'recharts';

const formatCurrency = (val: number) => 
  new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);

const ZurichSmartProtectionView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'CONCEPT' | 'DIAGNOSI' | 'LESIONI' | 'PRICING' | 'CHECKLIST' | 'EXCLUSIONS' | 'PROFIT'>('CONCEPT');
  
  // --- STATO DIAGNOSI ---
  const [age, setAge] = useState<number>(40);
  const [weight, setWeight] = useState<number>(75);
  const [height, setHeight] = useState<number>(180);
  const [hasOtherZurichPolicies, setHasOtherZurichPolicies] = useState<boolean>(false);
  const [otherZurichCapitals, setOtherZurichCapitals] = useState<number>(0);
  const [answers, setAnswers] = useState({ q3: false, q4: false, q5: false });

  // --- STATO REDDITIVITÀ ---
  const [premium, setPremium] = useState<number>(500);
  const [duration, setDuration] = useState<5 | 10>(10);

  const bmi = useMemo(() => {
    const hMeters = height / 100;
    if (hMeters === 0) return 0;
    return weight / (hMeters * hMeters);
  }, [weight, height]);

  const accumulationLimit = useMemo(() => {
    const rule = ZURICH_SMART_TECHNICAL_DATA.ACCUMULATION_LIMITS.find(r => age <= r.maxAge);
    return rule ? rule.limit : 200000;
  }, [age]);

  const underwritingStatus = useMemo(() => {
    if (answers.q3 || answers.q4 || answers.q5) return 'REJECTED_HEALTH';
    if (bmi < 16 || bmi > 35) return 'REJECTED_BMI';
    if (hasOtherZurichPolicies && otherZurichCapitals > accumulationLimit) return 'REJECTED_ACCUMULATION';
    return 'ACCEPTED';
  }, [answers, bmi, hasOtherZurichPolicies, otherZurichCapitals, accumulationLimit]);

  // --- MOTORE COMMISSIONALE UFFICIALE (IDENTICO PER TUTTI - FLAT PAYOUT) ---
  const commissions = useMemo(() => {
    // Base di calcolo: Premio Netto (Lordo - 40€ costo pratica)
    const netPremium = Math.max(0, premium - ZURICH_SMART_COMMISSION_DATA.FIXED_PRACTICE_COST);
    
    // PayIn Riconosciuto dalla Compagnia (40% o 80% del netto alla prima sottoscrizione)
    const payInRate = duration === 5 
      ? ZURICH_SMART_COMMISSION_DATA.PAYIN_RATES.DUR_5Y 
      : ZURICH_SMART_COMMISSION_DATA.PAYIN_RATES.DUR_10_15_20Y;
    
    const payInUpfront = netPremium * payInRate;

    // Upfront Advisor: 87,50% del PayIn (Fisso per tutte le categorie come da PDF)
    const upfrontAdvisor = payInUpfront * ZURICH_SMART_COMMISSION_DATA.FIXED_PAYOUT.NEW_BUSINESS;

    // Ricorrente dal 2° Anno: 50,00% del PayIn (che è il 10% del premio netto)
    const payInRecurring = netPremium * ZURICH_SMART_COMMISSION_DATA.PAYIN_RATES.RECURRING_AFTER_Y1;
    const recurringAdvisor = payInRecurring * ZURICH_SMART_COMMISSION_DATA.FIXED_PAYOUT.RECURRING;

    // Business Plan 5 Anni (Crescita nel tempo)
    const businessPlanData = Array.from({ length: 5 }, (_, i) => ({
      name: `Anno ${i + 1}`,
      valore: Math.round(i === 0 ? upfrontAdvisor : recurringAdvisor),
      accumulo: Math.round(upfrontAdvisor + (recurringAdvisor * i))
    }));

    return { 
      netPremium,
      payInRate,
      upfrontAdvisor, 
      recurringAdvisor, 
      total5Y: upfrontAdvisor + (recurringAdvisor * 4),
      businessPlanData
    };
  }, [premium, duration]);

  // --- PRICING & BONUS ---
  const [pricingMode, setPricingMode] = useState<'NON_SMOKER' | 'SMOKER'>('NON_SMOKER');

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-fade-in pb-24">
      
      {/* 1. HERO - POSIZIONAMENTO STRATEGICO 03/2025 */}
      <div className="bg-[#233D7B] rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden border-b-8 border-amber-500">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-amber-500/10 to-transparent"></div>
        <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
           <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                 <div className="bg-amber-50 p-3 rounded-2xl shadow-xl shadow-amber-600/20"><ShieldPlus size={32} className="text-[#233D7B]"/></div>
                 <span className="text-[11px] font-black uppercase tracking-[0.4em] text-amber-400 italic">Aggiornamento Set Informativo Ed. 03/2025</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
                Smart <br/> <span className="text-amber-500">Protection</span>
              </h1>
              <p className="text-blue-100 text-xl font-medium max-w-2xl leading-relaxed">
                La TCM moderna che include le <strong>Lesioni da Infortunio</strong>. Proteggi il futuro dei tuoi cari (Morte) e il tuo presente (Indennizzo fisico).
              </p>
           </div>
           <div className="lg:col-span-4 bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 text-center relative group">
              <p className="text-[10px] font-black uppercase text-amber-400 mb-2 tracking-widest italic">Concept "1+1=2"</p>
              <p className="text-6xl font-black text-white tracking-tighter">100%</p>
              <p className="text-[10px] font-black text-blue-300 uppercase mt-4 tracking-widest leading-tight italic">Emissione Immediata <br/> Senza Esami Medici</p>
           </div>
        </div>
      </div>

      {/* 2. NAVIGATION TOOLKIT */}
      <div className="flex flex-wrap gap-2 bg-slate-100 p-1.5 rounded-2xl w-full md:w-fit mx-auto shadow-inner border border-slate-200">
         <button onClick={() => setActiveTab('CONCEPT')} className={`px-8 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'CONCEPT' ? 'bg-[#233D7B] text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}>
            <Target size={16} /> Sales Concept
         </button>
         <button onClick={() => setActiveTab('DIAGNOSI')} className={`px-8 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'DIAGNOSI' ? 'bg-[#233D7B] text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}>
            <UserSearch size={16} /> Diagnosi Underwriting
         </button>
         <button onClick={() => setActiveTab('LESIONI')} className={`px-8 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'LESIONI' ? 'bg-[#233D7B] text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}>
            <Gem size={16} /> Catalogo Lesioni
         </button>
         <button onClick={() => setActiveTab('PRICING')} className={`px-8 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'PRICING' ? 'bg-[#233D7B] text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}>
            <Euro size={16} /> Tabelle Premi
         </button>
         <button onClick={() => setActiveTab('PROFIT')} className={`px-8 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'PROFIT' ? 'bg-amber-500 text-slate-900 shadow-md border-b-2 border-amber-600' : 'text-slate-500 hover:text-slate-800'}`}>
            <TrendingUp size={16} /> Redditività Advisor
         </button>
         <button onClick={() => setActiveTab('EXCLUSIONS')} className={`px-8 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'EXCLUSIONS' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}>
            <Ban size={16} /> Cause Esclusione
         </button>
         <button onClick={() => setActiveTab('CHECKLIST')} className={`px-8 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'CHECKLIST' ? 'bg-slate-800 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}>
            <FileCheck size={16} /> Checklist Advisor
         </button>
      </div>

      {/* 3. CONTENT AREA */}
      <div className="min-h-[600px]">
        
        {/* --- VIEW: REDDITIVITÀ ADVISOR (FLAT PAYOUT 87,50%) --- */}
        {activeTab === 'PROFIT' && (
          <div className="space-y-8 animate-fade-in">
             <div className="bg-[#233D7B] rounded-[3rem] p-10 text-white shadow-xl relative overflow-hidden border-b-8 border-amber-400">
                <div className="absolute top-0 right-0 p-12 opacity-5 rotate-12"><PiggyBank size={300} /></div>
                <div className="relative z-10 grid lg:grid-cols-12 gap-10">
                   <div className="lg:col-span-7 space-y-6">
                      <div className="flex items-center gap-3">
                         <div className="bg-amber-400 p-2 rounded-xl text-slate-900"><Banknote size={24} /></div>
                         <h3 className="text-3xl font-black italic uppercase tracking-tighter">Compensi Diretti <br/> <span className="text-amber-400">Advisor Flat 2025</span></h3>
                      </div>
                      <p className="text-blue-100 text-lg font-medium leading-relaxed italic">
                        "Un sistema provvigionale semplificato e meritocratico che valorizza ogni singola sottoscrizione, garantendo flussi di cassa immediati e ricorrenti identici per tutte le categorie (87,50% Payout)."
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4">
                         <div className="p-6 bg-white/5 border border-white/10 rounded-3xl relative overflow-hidden group">
                            <div className="absolute -right-2 -bottom-2 opacity-10 group-hover:scale-110 transition-transform"><Star size={60}/></div>
                            <p className="text-[10px] font-black uppercase text-amber-400 mb-2 tracking-widest">Upfront Advisor (87,50% PayIn)</p>
                            <p className="text-4xl font-black text-white">{formatCurrency(commissions.upfrontAdvisor)}</p>
                         </div>
                         <div className="p-6 bg-white/5 border border-white/10 rounded-3xl relative overflow-hidden group">
                            <div className="absolute -right-2 -bottom-2 opacity-10 group-hover:scale-110 transition-transform"><Activity size={60}/></div>
                            <p className="text-[10px] font-black uppercase text-emerald-400 mb-2 tracking-widest">Ricorrente (50,00% PayIn)</p>
                            <p className="text-4xl font-black text-white">{formatCurrency(commissions.recurringAdvisor)}</p>
                         </div>
                      </div>
                   </div>

                   <div className="lg:col-span-5 flex flex-col justify-center">
                      <div className="bg-white/10 backdrop-blur-3xl p-8 rounded-[3rem] border border-white/20 shadow-2xl">
                         <h4 className="text-xs font-black uppercase text-amber-400 mb-6 text-center tracking-[0.2em]">Parametri di Calcolo</h4>
                         <div className="space-y-6">
                            <div className="space-y-2">
                               <label className="text-[10px] font-black uppercase text-blue-200 flex justify-between">
                                  <span>Premio Annuo Lordo (€)</span>
                                  <span className="text-amber-400">Base Netta: {formatCurrency(commissions.netPremium)}</span>
                               </label>
                               <input type="number" value={premium} onChange={(e) => setPremium(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-2xl font-black text-white outline-none focus:ring-4 focus:ring-amber-500/20" />
                               <p className="text-[9px] text-slate-400 font-bold uppercase mt-1 italic">Viene dedotto il costo pratica di 40€ come da documento.</p>
                            </div>
                            <div className="space-y-2">
                               <label className="text-[10px] font-black uppercase text-blue-200">Durata Contratto (PayIn Rate)</label>
                               <div className="grid grid-cols-2 gap-2">
                                  <button onClick={() => setDuration(5)} className={`py-3 rounded-xl text-[10px] font-black transition-all ${duration === 5 ? 'bg-amber-400 text-slate-900 shadow-lg' : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'}`}>
                                     5 ANNI (PayIn 40%)
                                  </button>
                                  <button onClick={() => setDuration(10)} className={`py-3 rounded-xl text-[10px] font-black transition-all ${duration === 10 ? 'bg-amber-400 text-slate-900 shadow-lg' : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'}`}>
                                     10-20 ANNI (PayIn 80%)
                                  </button>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>

             <div className="grid lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden">
                   <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic mb-10 flex items-center gap-3">
                      <TrendingUp className="text-[#233D7B]" /> Proiezione Crescita Compensi (5 Anni)
                   </h3>
                   <div className="h-[400px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                         <BarChart data={commissions.businessPlanData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="name" tick={{fontSize: 12, fontWeight: '900', fill: '#475569'}} axisLine={false} tickLine={false} />
                            <YAxis tickFormatter={(v) => `€${v}`} axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                            <Tooltip 
                              cursor={{fill: '#f8fafc'}}
                              contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'}} 
                              formatter={(v: any) => [formatCurrency(v), 'Compenso Effettivo']}
                            />
                            <Bar dataKey="valore" name="Competenza Anno" fill="#233D7B" radius={[12, 12, 0, 0]} barSize={40} />
                            <Bar dataKey="accumulo" name="Ricavo Cumulato" fill="#f59e0b" radius={[12, 12, 0, 0]} barSize={15} />
                         </BarChart>
                      </ResponsiveContainer>
                   </div>
                </div>

                <div className="lg:col-span-4 space-y-6">
                   <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 shadow-inner">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Trasparenza Documentale</h4>
                      <ul className="space-y-5">
                         <li className="flex justify-between items-center text-xs font-bold text-slate-600">
                            <span>Base di Calcolo:</span>
                            <span className="font-black text-slate-900">{formatCurrency(commissions.netPremium)}</span>
                         </li>
                         <li className="flex justify-between items-center text-xs font-bold text-slate-600">
                            <span>PayIn Compagnia ({duration === 5 ? '40%' : '80%'}):</span>
                            <span className="font-black text-indigo-600">{formatCurrency(commissions.netPremium * (duration === 5 ? 0.4 : 0.8))}</span>
                         </li>
                         <li className="flex justify-between items-center text-xs font-bold text-slate-600 pb-4 border-b border-slate-200">
                            <span>Tuo Payout (Flat):</span>
                            <span className="font-black text-amber-600">87,50%</span>
                         </li>
                         <li className="pt-2 flex justify-between items-center">
                            <span className="text-[10px] font-black uppercase text-slate-400">Profitto 5Y su Pratica:</span>
                            <span className="text-xl font-black text-[#233D7B]">{formatCurrency(commissions.total5Y)}</span>
                         </li>
                      </ul>
                   </div>

                   <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl border-t-8 border-emerald-500">
                      <div className="absolute -top-10 -right-10 opacity-10"><Zap size={200} /></div>
                      <h4 className="text-xl font-black text-amber-400 mb-4 italic uppercase tracking-tighter">Advisor Tip</h4>
                      <p className="text-xs text-slate-400 leading-relaxed font-medium italic">
                        "La Smart Protection non è solo una vendita, è un generatore di ricorrente solido. A differenza di altri prodotti, la retrocessione fissa immediata al 87,50% è tra le più elevate del settore per i consulenti indipendenti e bancari."
                      </p>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* --- VIEW: CAUSE DI ESCLUSIONE (PAG 14-15-17) --- */}
        {activeTab === 'EXCLUSIONS' && (
          <div className="space-y-8 animate-fade-in">
             <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-xl overflow-hidden relative">
                <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12"><Ban size={300} /></div>
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6 relative z-10">
                   <div>
                      <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">Cosa NON è assicurato</h3>
                      <p className="text-slate-400 text-xs font-black uppercase tracking-widest mt-2 italic text-rose-600">Documento di Trasparenza Pag. 14-15-17 - Edizione 03/2025</p>
                   </div>
                   <div className="bg-rose-600 px-6 py-4 rounded-3xl text-white text-center shadow-lg border-b-4 border-rose-800">
                      <p className="text-[10px] font-black uppercase opacity-70 mb-1 tracking-widest">Attenzione</p>
                      <p className="text-xl font-black italic">Logica IN-OUT</p>
                   </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 relative z-10">
                   {/* 1. ESCLUSIONI TCM & LIMITI DI COPERTURA */}
                   <div className="space-y-6">
                      <h4 className="font-black text-slate-800 text-sm uppercase tracking-[0.2em] flex items-center gap-3">
                         <ShieldX size={20} className="text-rose-600" /> Esclusioni & Carenza TCM
                      </h4>
                      <div className="grid gap-4">
                         {ZURICH_SMART_CONSTANTS.EXCLUSIONS.TCM_SPECIFIC.map((ex, i) => (
                            <div key={i} className="p-5 bg-rose-50/50 border border-rose-100 rounded-3xl hover:bg-white hover:border-rose-300 transition-all group">
                               <h5 className="text-xs font-black text-rose-900 uppercase mb-1 flex items-center gap-2">
                                  <AlertCircle size={14} className="text-rose-500" /> {ex.title}
                                </h5>
                               <p className="text-[11px] text-rose-800/70 font-medium italic leading-relaxed">{ex.desc}</p>
                            </div>
                         ))}
                      </div>

                      <div className="p-6 bg-emerald-50 rounded-[2rem] border border-emerald-100 space-y-3">
                         <h5 className="text-[10px] font-black text-emerald-800 uppercase flex items-center gap-2 mb-2">
                            <LifeBuoy size={14} /> Patologie che ANNULLANO la Carenza
                         </h5>
                         <p className="text-[10px] text-emerald-700 font-bold leading-relaxed mb-4">
                            In caso di decesso per queste cause o Infortunio, Zurich paga **da subito** (anche durante i primi 6 mesi):
                         </p>
                         <div className="flex flex-wrap gap-2">
                            {ZURICH_SMART_TECHNICAL_DATA.WAITING_PERIOD.EXCEPTIONS_DISEASES.map((d, i) => (
                               <span key={i} className="bg-white px-2 py-1 rounded-lg border border-emerald-200 text-[9px] font-black text-emerald-600 uppercase italic">{d}</span>
                            ))}
                         </div>
                      </div>
                   </div>

                   {/* 2. SPORT E PROFESSIONI ESCLUSE */}
                   <div className="space-y-6">
                      <div className="p-8 bg-slate-50 rounded-[2.5rem] border-2 border-slate-100">
                         <h4 className="font-black text-slate-700 text-sm uppercase tracking-[0.2em] flex items-center gap-3 mb-6">
                            <Skull size={20} className="text-slate-400" /> Esclusioni Generali
                         </h4>
                         <div className="grid gap-3">
                            {ZURICH_SMART_CONSTANTS.EXCLUSIONS.GENERAL.map((ex, i) => (
                               <div key={i} className="flex gap-3 items-start">
                                  <div className="w-1.5 h-1.5 bg-rose-400 rounded-full mt-1.5 shrink-0"></div>
                                  <div>
                                     <p className="text-[11px] font-black text-slate-800 uppercase tracking-tighter">{ex.title}</p>
                                     <p className="text-[10px] text-slate-500 italic leading-tight">{ex.desc}</p>
                                  </div>
                               </div>
                            ))}
                         </div>
                      </div>

                      <div className="p-8 bg-rose-50 rounded-[2.5rem] border-2 border-rose-100">
                         <h4 className="font-black text-rose-700 text-sm uppercase tracking-[0.2em] flex items-center gap-3 mb-6">
                            <Mountain size={20} /> Sport Pericolosi Esclusi
                         </h4>
                         <ul className="space-y-3">
                            {ZURICH_SMART_CONSTANTS.EXCLUSIONS.SPORTS.slice(0, 8).map((sport, i) => (
                               <li key={i} className="flex gap-3 items-start">
                                  <div className="w-1.5 h-1.5 bg-rose-400 rounded-full mt-1.5 shrink-0"></div>
                                  <span className="text-[11px] font-bold text-rose-900/70 leading-relaxed uppercase tracking-tighter">{sport}</span>
                               </li>
                            ))}
                         </ul>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* --- VIEW: CONCEPT & SALES HOOKS --- */}
        {activeTab === 'CONCEPT' && (
          <div className="space-y-10 animate-fade-in">
             <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm space-y-8 relative overflow-hidden">
                   <div className="absolute -top-10 -right-10 opacity-5"><Flame size={300} /></div>
                   <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic flex items-center gap-3">
                      <Sparkles className="text-amber-500" /> Leve di Ingaggio
                   </h3>
                   <div className="space-y-6">
                      {ZURICH_SMART_CONSTANTS.TARGET_ADVISORY.map((target, i) => (
                         <div key={i} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 group hover:border-[#233D7B] transition-all">
                            <h4 className="font-black text-slate-800 uppercase text-xs mb-3 tracking-widest text-[#233D7B]">{target.title}</h4>
                            <p className="text-sm text-slate-600 font-bold italic mb-4 leading-relaxed">"{target.hook}"</p>
                            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase">
                               <Info size={12} /> {target.need}
                            </div>
                         </div>
                      ))}
                   </div>
                </div>
                
                <div className="space-y-6">
                   <div className="bg-[#0a0f1d] p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden border-l-8 border-emerald-500">
                      <h4 className="text-xl font-black uppercase italic tracking-tighter mb-4 flex items-center gap-2 text-emerald-400">
                         <Zap size={20} /> Vantaggio Competitivo
                      </h4>
                      <p className="text-sm text-slate-300 mb-6 leading-relaxed font-medium">
                         "Dottore, il massimale di <strong>50.000€</strong> per le lesioni si attiva con un semplice referto di Pronto Soccorso. Non servono perizie medico-legali che durano anni."
                      </p>
                      <div className="flex gap-3">
                         <span className="bg-white/10 px-3 py-1 rounded-full text-[9px] font-black uppercase border border-white/10 italic">Liquidazione Veloce</span>
                         <span className="bg-white/10 px-3 py-1 rounded-full text-[9px] font-black uppercase border border-white/10 italic">No Visite Mediche</span>
                      </div>
                   </div>

                   <div className="bg-indigo-50 p-8 rounded-[3rem] border border-indigo-100 flex flex-col md:flex-row items-center gap-8 shadow-sm">
                      <div className="bg-[#233D7B] p-5 rounded-3xl text-white shrink-0 shadow-lg"><Clock size={32} /></div>
                      <div>
                         <h4 className="text-lg font-black text-[#233D7B] mb-1 uppercase italic tracking-tighter">Periodo di Carenza (Pag. 17)</h4>
                         <p className="text-xs text-slate-500 leading-relaxed font-medium italic">
                            Copertura attiva dopo <strong>6 mesi</strong>. Tuttavia, in caso di <strong>Infortunio</strong> o malattie infettive acute, la carenza è <strong>annullata</strong>: il cliente è protetto dal minuto dopo la firma.
                         </p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* --- VIEW: DIAGNOSI UNDERWRITING --- */}
        {activeTab === 'DIAGNOSI' && (
          <div className="space-y-8 animate-fade-in">
             <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-xl overflow-hidden relative">
                <div className="absolute top-0 right-0 p-10 opacity-5"><UserSearch size={300} /></div>
                <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic mb-10 flex items-center gap-3 relative z-10">
                   <Calculator className="text-indigo-600" /> Underwriting Motor IN-OUT
                </h3>

                <div className="grid lg:grid-cols-12 gap-12 relative z-10">
                   <div className="lg:col-span-7 space-y-8">
                      <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 shadow-inner space-y-6">
                         <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest">
                            <Ruler size={16} className="text-indigo-600" /> Verifica Biometrica & Età
                         </div>
                         <div className="grid grid-cols-3 gap-6">
                            <div className="space-y-2">
                               <label className="text-[10px] font-black text-slate-500 uppercase">Età</label>
                               <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-2xl font-black outline-none focus:ring-4 focus:ring-indigo-100 transition-all" />
                            </div>
                            <div className="space-y-2">
                               <label className="text-[10px] font-black text-slate-500 uppercase">Peso (kg)</label>
                               <input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-2xl font-black outline-none focus:ring-4 focus:ring-indigo-100 transition-all" />
                            </div>
                            <div className="space-y-2">
                               <label className="text-[10px] font-black text-slate-500 uppercase">Altezza (cm)</label>
                               <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-2xl font-black outline-none focus:ring-4 focus:ring-indigo-100 transition-all" />
                            </div>
                         </div>
                      </div>

                      <div className={`p-6 rounded-3xl border-2 transition-all ${hasOtherZurichPolicies ? 'bg-amber-50 border-amber-200 shadow-md' : 'bg-slate-50 border-slate-100'}`}>
                         <div className="flex justify-between items-center mb-4">
                            <h4 className="text-xs font-black uppercase text-slate-700 flex items-center gap-2">
                               <Layers size={16} className="text-amber-500" /> Cumulo Capitali Zurich (Pag. 13)
                            </h4>
                            <button onClick={() => setHasOtherZurichPolicies(!hasOtherZurichPolicies)} className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase transition-all ${hasOtherZurichPolicies ? 'bg-amber-500 text-white shadow-lg' : 'bg-slate-200 text-slate-500'}`}>
                               {hasOtherZurichPolicies ? 'SÌ, HA ALTRE POLIZZE' : 'NO, NUOVO CLIENTE'}
                            </button>
                         </div>
                         {hasOtherZurichPolicies && (
                            <div className="space-y-4 animate-fade-in">
                               <input 
                                 type="number" value={otherZurichCapitals} onChange={(e) => setOtherZurichCapitals(Number(e.target.value))}
                                 placeholder="Totale capitali Zurich già attivi (€)..."
                                 className="w-full p-4 bg-white border border-amber-200 rounded-2xl font-black text-xl outline-none" 
                               />
                               <div className="p-3 bg-white/50 rounded-xl flex justify-between items-center text-[10px] font-bold text-amber-800 italic">
                                  <span>Limite per età {age} anni:</span>
                                  <span className="font-black underline">{formatCurrency(accumulationLimit)}</span>
                               </div>
                            </div>
                         )}
                      </div>

                      <div className="space-y-3">
                         <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                            <Microscope size={16} className="text-indigo-600" /> Questionario Anamnestico (IN-OUT)
                         </div>
                         {[
                            { id: 'q3', text: 'Tumori (ultimi 10y) o esami sospetti?' },
                            { id: 'q4', text: 'Gravi patologie cardiocircolatorie (infarto, ictus)?' },
                            { id: 'q5', text: 'Malattie neurodegenerative o renali?' }
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
                               : <AlertTriangle size={64} className="text-rose-500" />
                            }
                         </div>
                         
                         <h4 className={`text-3xl font-black italic uppercase tracking-tighter mb-4 leading-none ${
                            underwritingStatus === 'ACCEPTED' ? 'text-emerald-800' : 'text-rose-800'
                         }`}>
                            {underwritingStatus === 'ACCEPTED' ? 'Rischio Assumibile' : 'Esito Negativo'}
                         </h4>
                         
                         <div className="space-y-4 mb-6">
                            <div className="bg-white/80 backdrop-blur px-6 py-4 rounded-2xl">
                               <p className="text-[10px] font-black text-slate-400 uppercase mb-1">BMI Reale</p>
                               <p className="text-3xl font-black text-slate-900">{bmi.toFixed(1)}</p>
                               <p className="text-[9px] font-bold text-slate-400 mt-1">Target: 16 - 35</p>
                            </div>
                         </div>

                         <p className="text-[11px] font-bold italic text-slate-600 px-4 leading-relaxed">
                            {underwritingStatus === 'ACCEPTED' 
                               ? 'Dottore, il cliente rispetta i criteri Ed. 03/2025. Emissione possibile in 5 minuti.'
                               : 'Spiacente, i parametri tecnici o sanitari non permettono la sottoscrizione smart.'
                            }
                         </p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* --- VIEW: CATALOGO LESIONI --- */}
        {activeTab === 'LESIONI' && (
          <div className="space-y-8 animate-fade-in">
             <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden">
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
                   <div>
                      <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic">Catalogo Indennizzi</h3>
                      <p className="text-slate-500 text-sm font-medium mt-1">47 Lesioni mappate (Pag. 24 del Set Informativo).</p>
                   </div>
                   <div className="bg-[#233D7B] px-6 py-4 rounded-3xl text-white text-center shadow-lg">
                      <p className="text-[10px] font-black uppercase opacity-70 mb-1 tracking-widest">Massimale Lesioni</p>
                      <p className="text-2xl font-black">50.000 € <span className="text-xs opacity-50 uppercase font-bold tracking-tighter">Omnicomprensivo</span></p>
                   </div>
                </div>

                <div className="grid md:grid-cols-4 gap-4 mb-10">
                   {[
                      { level: 1, amount: 2500, label: "Fratture Semplici", color: 'bg-blue-100 text-blue-700' },
                      { level: 2, amount: 7500, label: "Lesioni Organiche", color: 'bg-indigo-100 text-indigo-700' },
                      { level: 3, amount: 15000, label: "Amputazioni / Perdite", color: 'bg-amber-100 text-amber-700' },
                      { level: 4, amount: 25000, label: "Grandi Invalidità", color: 'bg-rose-100 text-rose-700' },
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

        {/* --- VIEW: TABELLE PREMI REALI --- */}
        {activeTab === 'PRICING' && (
          <div className="space-y-8 animate-fade-in">
             <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-xl overflow-hidden relative">
                <div className="absolute top-0 right-0 p-10 opacity-5"><ReceiptEuro size={300} /></div>
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 relative z-10">
                   <div>
                      <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">Premi Annuali 2025</h3>
                      <p className="text-slate-400 text-xs font-black uppercase tracking-widest mt-2">Capitale TCM 100.000 € (Inclusa Componente Lesioni)</p>
                   </div>
                   <div className="flex gap-2 p-1 bg-slate-100 rounded-2xl border border-slate-200">
                      <button onClick={() => setPricingMode('NON_SMOKER')} className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all ${pricingMode === 'NON_SMOKER' ? 'bg-white text-[#233D7B] shadow-md' : 'text-slate-500 hover:text-slate-700'}`}>Non Fumatore</button>
                      <button onClick={() => setPricingMode('SMOKER')} className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all ${pricingMode === 'SMOKER' ? 'bg-white text-rose-700 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}>Fumatore</button>
                   </div>
                </div>

                <div className="overflow-x-auto rounded-[2rem] border border-slate-100 shadow-inner relative z-10">
                   <table className="w-full text-left border-collapse">
                      <thead className="bg-[#233D7B] text-white text-[10px] font-black uppercase tracking-widest">
                         <tr>
                            <th className="px-8 py-6">Età Assicurativa</th>
                            <th className="px-6 py-6 text-center">Durata 5y</th>
                            <th className="px-6 py-6 text-center">Durata 10y</th>
                            <th className="px-6 py-6 text-center">Durata 15y</th>
                            <th className="px-6 py-6 text-center">Durata 20y</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs font-bold">
                         {ZURICH_SMART_CONSTANTS.PRICING_TABLE_100K[pricingMode].map((row) => (
                            <tr key={row.age} className="hover:bg-slate-50 transition-colors">
                               <td className="px-8 py-5 font-black text-slate-800 text-base">{row.age} Anni</td>
                               <td className="px-6 py-5 text-center text-slate-700">{row.y5 === 0 ? '-' : `${row.y5} €`}</td>
                               <td className="px-6 py-5 text-center text-slate-700">{row.y10 === 0 ? '-' : `${row.y10} €`}</td>
                               <td className="px-6 py-5 text-center text-slate-700">{row.y15 === 0 ? '-' : `${row.y15} €`}</td>
                               <td className="px-6 py-5 text-center text-slate-700">{row.y20 === 0 ? '-' : `${row.y20} €`}</td>
                            </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
             </div>
          </div>
        )}

        {/* --- VIEW: CHECKLIST ADVISOR --- */}
        {activeTab === 'CHECKLIST' && (
          <div className="animate-fade-in space-y-10">
             <div className="grid md:grid-cols-2 gap-8">
                {/* Step Sottoscrizione */}
                <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm space-y-8">
                   <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic flex items-center gap-3">
                      <FileSignature className="text-indigo-600" /> Iter di Chiusura
                   </h3>
                   <div className="space-y-4">
                      {[
                        { step: "01", text: "Verifica Età Assicurativa (Mantieni stessa età ± 6 mesi compleanno, pag. 11)", icon: History },
                        { step: "02", text: "Frazionamento: Se mensile, incasso immediato di 3 rate (pag. 23)", icon: Coins },
                        { step: "03", text: "Fumatore: Definizione chiara > 5 sigarette/giorno ultimi 24 mesi (pag. 18)", icon: Cigarette },
                        { step: "04", text: "Beneficiari: Designazione fuori asse per esenzione Art. 12 (pag. 20)", icon: Scale }
                      ].map((item, i) => (
                         <div key={i} className="flex gap-4 items-start p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-indigo-500 transition-all">
                            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-black text-xs shrink-0">{item.step}</div>
                            <p className="text-xs font-bold text-slate-700 leading-relaxed">{item.text}</p>
                         </div>
                      ))}
                   </div>
                </div>

                {/* Strategia Proposta Complementare */}
                <div className="bg-[#233D7B] p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-8 opacity-5"><Rocket size={200} /></div>
                   <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-8 flex items-center gap-3">
                      <ShieldPlus className="text-amber-500" /> Up-Selling Complementare
                   </h3>
                   <div className="space-y-6">
                      <div className="p-6 bg-white/5 border border-white/10 rounded-3xl group hover:bg-white/10 transition-all">
                         <h4 className="text-amber-400 font-black uppercase text-xs mb-2">Garanzia Opzionale (Pag. 14)</h4>
                         <p className="text-sm font-medium leading-relaxed mb-4">
                            È possibile raddoppiare il capitale decesso in caso di <strong>Incidente Stradale</strong>.
                         </p>
                         <div className="flex items-center gap-2 text-[10px] font-black uppercase text-blue-300">
                            <Target size={14} /> Ideale per Pendolari e Agenti
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
               <p className="text-lg font-black text-slate-800 uppercase tracking-tighter leading-none mb-1">Smart Protection Diagnostic v3.1</p>
               <p className="text-xs text-slate-500 font-bold italic">Set Informativo Ed. 03/2025 | Sistema Provvigionale Flat 2025 (Payout 87,50%) | Gruppo Vomero Intelligence</p>
            </div>
         </div>
         <div className="text-right">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">DOCUMENTO AD USO INTERNO - PRIVACY LEVEL: HIGH</p>
         </div>
      </div>

    </div>
  );
};

export default ZurichSmartProtectionView;