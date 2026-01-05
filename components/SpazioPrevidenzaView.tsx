
import React, { useState, useMemo } from 'react';
import { 
  Rocket, ShieldCheck, HeartPulse, Zap, Percent, 
  ArrowRight, CheckCircle2, Star, Quote, Info, 
  ChevronRight, Calculator, Landmark, ShieldPlus,
  Users, Activity, Timer, Coins, Scale, AlertTriangle,
  Umbrella, GraduationCap, Binary, Layers, 
  ArrowUpRight, Heart, UserPlus, Siren, AlertOctagon,
  Settings2, ListChecks, FileText, ShieldX, 
  Stethoscope, Crosshair, HelpCircle, ArrowDownToLine,
  UserCheck, History, Wallet, BadgePercent,
  Sparkles, AlertCircle, Calendar, TrendingUp, PieChart,
  DollarSign, BarChart3, ReceiptEuro, HandCoins,
  Shield, Key, Home, HeartHandshake, UserMinus,
  Ban, Gavel, FileSignature, Microscope,
  // Added missing icons to resolve name errors and JSX collision with global Lock interface
  Lightbulb, Lock, RefreshCw, Briefcase, Skull
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar, Cell } from 'recharts';

const formatCurrency = (val: number) => 
  new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);

const SpazioPrevidenzaView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'CONCEPT' | 'INVESTIMENTI' | 'PRESTAZIONI' | 'PROTEZIONE' | 'COSTI'>('CONCEPT');

  // --- STATI CALCOLATORE PROVVIGIONI ---
  const [premiumAmount, setPremiumAmount] = useState<number>(5000);
  const [aumTierIndex, setAumTierIndex] = useState<number>(0); 
  const [hasLtc, setHasLtc] = useState<boolean>(true);

  const salesPayoutTiers = [
    { label: "0 - 4 Mln", rate: 0.60 },
    { label: "4 - 6.5 Mln", rate: 0.60 },
    { label: "6.5 - 10 Mln", rate: 0.62 },
    { label: "10 - 20 Mln", rate: 0.65 },
    { label: "Oltre 20 Mln", rate: 0.70 }
  ];

  const commissions = useMemo(() => {
    const zbRetroRate = hasLtc ? 0.03 : 0.02;
    const totalZbCommission = premiumAmount * zbRetroRate;
    const advisorRate = salesPayoutTiers[aumTierIndex].rate;
    const advisorUpfront = totalZbCommission * advisorRate;
    const avgMfee = 0.007; 
    const advisorMgmtRate = 0.45;
    const estimatedYearlyMgmt = (premiumAmount * avgMfee) * advisorMgmtRate;

    return { zbRetroRate, advisorUpfront, estimatedYearlyMgmt };
  }, [premiumAmount, aumTierIndex, hasLtc]);

  const lifecycleData = [
    { age: 30, label: '< 35', gs: 0, flex8: 40, flex4: 0, az: 60 },
    { age: 37, label: '35-39', gs: 10, flex8: 45, flex4: 0, az: 45 },
    { age: 42, label: '40-44', gs: 20, flex8: 40, flex4: 0, az: 40 },
    { age: 47, label: '45-49', gs: 30, flex8: 35, flex4: 0, az: 35 },
    { age: 52, label: '50-54', gs: 40, flex8: 30, flex4: 15, az: 15 },
    { age: 57, label: '55-59', gs: 60, flex8: 20, flex4: 20, az: 0 },
    { age: 65, label: '60 e +', gs: 80, flex8: 0, flex4: 20, az: 0 },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-fade-in pb-24">
      
      {/* HERO SECTION - EXECUTIVE STYLE */}
      <div className="bg-[#233D7B] rounded-[3.5rem] p-12 text-white shadow-2xl relative overflow-hidden border-b-8 border-amber-500">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-amber-500/10 to-transparent"></div>
        <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
           <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                 <div className="bg-amber-50 p-3 rounded-2xl shadow-xl shadow-amber-600/20"><Rocket size={32} className="text-[#233D7B]"/></div>
                 <span className="text-[11px] font-black uppercase tracking-[0.4em] text-amber-400 italic">Advisor Master Database - Full Product Specs 2025</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
                Spazio <br/> <span className="text-amber-500">Previdenza</span>
              </h1>
              <div className="flex flex-wrap gap-3">
                 <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 text-amber-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                    <Zap size={14} /> TFR MATURATO TRASFERIBILE
                 </div>
                 <div className="bg-emerald-500/20 backdrop-blur-md p-3 rounded-2xl border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                    <ShieldCheck size={14} /> LTC A VITA INTERA
                 </div>
              </div>
           </div>
           <div className="lg:col-span-4 bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 text-center relative group">
              <p className="text-[10px] font-black uppercase text-amber-400 mb-2 tracking-widest italic">Commissione Upfront</p>
              <p className="text-6xl font-black text-white tracking-tighter italic">3,00%</p>
              <p className="text-[10px] font-black text-blue-300 uppercase mt-4 tracking-widest leading-tight italic">Sui Contributi PUR <br/> con Opzione LTC attiva</p>
           </div>
        </div>
      </div>

      {/* NAVIGATION TABS */}
      <div className="flex flex-wrap gap-2 bg-slate-100 p-1.5 rounded-2xl w-full md:w-fit mx-auto shadow-inner border border-slate-200">
         <button onClick={() => setActiveTab('CONCEPT')} className={`px-8 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'CONCEPT' ? 'bg-[#233D7B] text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}>
            <Lightbulb size={16} /> Concept & Valori
         </button>
         <button onClick={() => setActiveTab('INVESTIMENTI')} className={`px-8 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'INVESTIMENTI' ? 'bg-[#233D7B] text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}>
            <Layers size={16} /> Asset & Life Cycle
         </button>
         <button onClick={() => setActiveTab('PRESTAZIONI')} className={`px-8 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'PRESTAZIONI' ? 'bg-[#233D7B] text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}>
            <HandCoins size={16} /> Anticipi & RITA
         </button>
         <button onClick={() => setActiveTab('PROTEZIONE')} className={`px-8 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'PROTEZIONE' ? 'bg-[#233D7B] text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}>
            <HeartPulse size={16} /> Morte & LTC
         </button>
         <button onClick={() => setActiveTab('COSTI')} className={`px-8 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'COSTI' ? 'bg-slate-800 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}>
            <ReceiptEuro size={16} /> Fiscalità & Costi
         </button>
      </div>

      <div className="min-h-[600px]">
        
        {/* --- TAB: CONCEPT (PERCHÉ ACQUISTARLA) --- */}
        {activeTab === 'CONCEPT' && (
          <div className="space-y-10 animate-fade-in">
             <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6 group hover:border-[#233D7B] transition-all">
                   <div className="bg-blue-50 p-4 rounded-3xl w-fit text-[#233D7B]"><UserPlus size={32} /></div>
                   <h4 className="text-xl font-black uppercase italic tracking-tighter">Aperta a Tutti</h4>
                   <p className="text-sm text-slate-500 font-medium leading-relaxed">
                      "Non solo per lavoratori. Puoi aprire il piano a tuo <strong>figlio minorenne</strong> fiscalmente a carico per costruire da subito il suo futuro sfruttando la tua deducibilità."
                   </p>
                </div>
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6 group hover:border-emerald-500 transition-all">
                   <div className="bg-emerald-50 p-4 rounded-3xl w-fit text-emerald-600"><Lock size={32} /></div>
                   <h4 className="text-xl font-black uppercase italic tracking-tighter">Patrimonio Segregato</h4>
                   <p className="text-sm text-slate-500 font-medium leading-relaxed">
                      I contributi sono salvaguardati perché costituiscono un <strong>patrimonio autonomo e separato</strong> dal patrimonio complessivo di Zurich Investments Life.
                   </p>
                </div>
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6 group hover:border-amber-500 transition-all">
                   <div className="bg-amber-50 p-4 rounded-3xl w-fit text-amber-600"><RefreshCw size={32} /></div>
                   <h4 className="text-xl font-black uppercase italic tracking-tighter">Flessibilità Totale</h4>
                   <p className="text-sm text-slate-500 font-medium leading-relaxed">
                      "Dottore, può modificare liberamente l'importo dei versamenti, sospenderli e riattivarli senza alcuna penale o perdita dei vantaggi acquisiti."
                   </p>
                </div>
             </div>

             <div className="bg-slate-900 rounded-[3.5rem] p-12 text-white shadow-xl relative overflow-hidden group border-b-8 border-indigo-600">
                <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform"><Landmark size={200} /></div>
                <div className="relative z-10 max-w-3xl space-y-6">
                   <h3 className="text-3xl font-black italic uppercase tracking-tighter text-amber-500">Il Killer del TFR Maturato</h3>
                   <p className="text-xl font-medium leading-relaxed italic">
                      "A differenza di molti competitor, Spazio Previdenza permette di trasferire nel fondo **anche il TFR già maturato in azienda**, trasformando un debito del datore di lavoro in proprietà privata blindata del dipendente."
                   </p>
                   <div className="flex items-center gap-3 p-4 bg-white/10 rounded-2xl border border-white/10 w-fit">
                      <ShieldCheck size={20} className="text-emerald-400" />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em]">Impignorabilità Art. 1923 c.c.</span>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* --- TAB: INVESTIMENTI --- */}
        {activeTab === 'INVESTIMENTI' && (
          <div className="space-y-12 animate-fade-in">
             <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-xl overflow-hidden relative">
                <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic leading-none mb-10 flex items-center gap-4">
                   <Timer className="text-[#233D7B]" /> Meccanismo Life Cycle
                </h3>
                <div className="h-[400px] w-full mb-10">
                   <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={lifecycleData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                         <defs>
                            <linearGradient id="colorGs" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#233D7B" stopOpacity={0.8}/><stop offset="95%" stopColor="#233D7B" stopOpacity={0.2}/></linearGradient>
                            <linearGradient id="colorAz" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8}/><stop offset="95%" stopColor="#60a5fa" stopOpacity={0.2}/></linearGradient>
                         </defs>
                         <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                         <XAxis dataKey="label" tick={{fontSize: 11, fontWeight: 'bold'}} axisLine={false} tickLine={false} />
                         <YAxis tick={{fontSize: 10}} unit="%" axisLine={false} tickLine={false} />
                         <Tooltip contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'}} />
                         <Legend iconType="circle" />
                         <Area type="monotone" dataKey="gs" name="G.S. Pension Garantita" stackId="1" stroke="#233D7B" fill="url(#colorGs)" />
                         <Area type="monotone" dataKey="flex4" name="Flex 4 ESG" stackId="1" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.6} />
                         <Area type="monotone" dataKey="flex8" name="Flex 8 ESG" stackId="1" stroke="#818cf8" fill="#818cf8" fillOpacity={0.4} />
                         <Area type="monotone" dataKey="az" name="Azionario ESG" stackId="1" stroke="#60a5fa" fill="url(#colorAz)" />
                      </AreaChart>
                   </ResponsiveContainer>
                </div>
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-start gap-4">
                   <Info size={20} className="text-indigo-600 mt-1" />
                   <p className="text-xs text-slate-500 font-bold leading-relaxed italic">
                      "Il Life Cycle è un programma di investimento guidato che riduce progressivamente la rischiosità dell'investimento all'avvicinarsi dell'età pensionabile, aumentando la quota in Gestione Separata fino all'80%."
                   </p>
                </div>
             </div>

             <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm space-y-6">
                   <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic flex items-center gap-3"><CheckCircle2 className="text-emerald-500"/> Profilo Libero</h4>
                   <p className="text-sm text-slate-500">Allocazione autonoma nei Fondi Interni con un minimo del 10% per comparto e quota variabile in Gestione Separata.</p>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                         <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Fondi Interni</p>
                         <p className="text-lg font-black text-slate-900">10% - 100%</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                         <p className="text-[10px] font-black text-slate-400 uppercase mb-1">G.S. Zurich</p>
                         <p className="text-lg font-black text-slate-900">0% - 80%</p>
                      </div>
                   </div>
                </div>
                <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm space-y-6">
                   <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic flex items-center gap-3"><Landmark className="text-blue-600"/> Comparto Garantito</h4>
                   <p className="text-sm text-slate-500">Gestione Interna Separata "Zurich Pension Garantita" con rivalutazione annuale e protezione del capitale.</p>
                   <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex justify-between items-center">
                      <span className="text-xs font-black text-blue-900 uppercase">Garanzia Restituzione</span>
                      <span className="text-sm font-black text-blue-600">0% Minimo ad Evento</span>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* --- TAB: PRESTAZIONI (ANTICIPAZIONI, RISCATTI, RITA) --- */}
        {activeTab === 'PRESTAZIONI' && (
          <div className="space-y-10 animate-fade-in">
             <div className="grid lg:grid-cols-2 gap-8">
                {/* ANTICIPAZIONI */}
                <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm space-y-8 relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-8 opacity-5"><ArrowDownToLine size={150} /></div>
                   <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic">Vademecum Anticipazioni</h3>
                   <div className="space-y-4">
                      <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-100 flex justify-between items-center group hover:scale-[1.02] transition-transform">
                         <div>
                            <p className="text-xs font-black text-emerald-900 uppercase">Spese Sanitarie Gravi</p>
                            <p className="text-[10px] text-emerald-700 font-bold italic">Sempre disponibile, documentata.</p>
                         </div>
                         <span className="text-xl font-black text-emerald-600">75%</span>
                      </div>
                      <div className="p-5 bg-indigo-50 rounded-2xl border border-indigo-100 flex justify-between items-center group hover:scale-[1.02] transition-transform">
                         <div>
                            <p className="text-xs font-black text-indigo-900 uppercase">Prima Casa (Acquisto/Ristr.)</p>
                            <p className="text-[10px] text-indigo-700 font-bold italic">Dopo 8 anni di partecipazione.</p>
                         </div>
                         <span className="text-xl font-black text-indigo-600">75%</span>
                      </div>
                      <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center group hover:scale-[1.02] transition-transform">
                         <div>
                            <p className="text-xs font-black text-slate-900 uppercase">Altre Cause (Libere)</p>
                            <p className="text-[10px] text-slate-700 font-bold italic">Dopo 8 anni di partecipazione.</p>
                         </div>
                         <span className="text-xl font-black text-slate-500">30%</span>
                      </div>
                   </div>
                </div>

                {/* RITA & RISCATTI */}
                <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm space-y-8">
                   <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic flex items-center gap-3"><History className="text-indigo-600"/> Rendita Anticipata (RITA)</h3>
                   <p className="text-sm text-slate-500 font-medium leading-relaxed">
                      "Dottore, se smette di lavorare a 5 anni dalla pensione (o 10 se inoccupato da 2 anni), può incassare il fondo a rate con una tassazione che scende fino al **9%**."
                   </p>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="p-5 bg-slate-900 rounded-3xl text-white text-center">
                         <p className="text-[10px] font-black uppercase text-amber-500 mb-1">Iscrizione Minima</p>
                         <p className="text-2xl font-black">5 Anni</p>
                      </div>
                      <div className="p-5 bg-slate-900 rounded-3xl text-white text-center">
                         <p className="text-[10px] font-black uppercase text-amber-500 mb-1">Costo Gestione</p>
                         <p className="text-2xl font-black">2,00 € <span className="text-xs font-normal">/rata</span></p>
                      </div>
                   </div>
                   <div className="pt-6 border-t border-slate-100">
                      <h5 className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest italic flex items-center gap-2"><Briefcase size={14}/> Casistiche Riscatto Totale</h5>
                      <div className="flex flex-wrap gap-2">
                         {['Invalidità', 'Inoccupazione >48m', 'Decesso', 'Perdita Requisiti'].map(r => (
                           <span key={r} className="bg-slate-100 px-3 py-1.5 rounded-xl text-[9px] font-black text-slate-600 uppercase border border-slate-200">{r}</span>
                         ))}
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* --- TAB: PROTEZIONE (MORTE & LTC) --- */}
        {activeTab === 'PROTEZIONE' && (
          <div className="space-y-10 animate-fade-in">
             <div className="grid lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-8 opacity-5"><ShieldPlus size={200} /></div>
                   <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic mb-8">Asset Protection Zurich</h3>
                   <div className="grid md:grid-cols-2 gap-10">
                      <div className="space-y-6">
                         <div className="flex items-center gap-3">
                            <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600"><Skull size={24} /></div>
                            <h4 className="font-black text-slate-800 uppercase text-xs tracking-widest">Garanzia Caso Morte</h4>
                         </div>
                         <p className="text-sm text-slate-600 leading-relaxed font-medium">
                            "In caso di decesso durante la fase di accumulo, Zurich riconosce un capitale pari al controvalore delle quote dei Fondi Interni **maggiorato dell'1%** più il capitale assicurato in Gestione Separata."
                         </p>
                         <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-3">
                            <ShieldCheck size={20} className="text-emerald-600" />
                            <span className="text-[10px] font-black text-emerald-800 uppercase italic">Esente da Imposta di Successione (Art. 12)</span>
                         </div>
                      </div>
                      <div className="space-y-6">
                         <div className="flex items-center gap-3">
                            <div className="p-3 bg-rose-50 rounded-2xl text-rose-600"><HeartPulse size={24} /></div>
                            <h4 className="font-black text-slate-800 uppercase text-xs tracking-widest">Opzione F (ADL/LTC)</h4>
                         </div>
                         <p className="text-sm text-slate-600 leading-relaxed font-medium">
                            Possibilità di attivare la protezione sulla non autosufficienza che garantisce il **raddoppio della rendita** se l'aderente non è più in grado di svolgere autonomamente 4 su 6 ADL (Activity of Daily Living).
                         </p>
                         <div className="p-4 bg-rose-50 rounded-2xl border border-rose-100 flex items-center gap-3">
                            <Zap size={20} className="text-rose-600" />
                            <span className="text-[10px] font-black text-rose-800 uppercase italic">Rendimento raddoppiato a vita</span>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="lg:col-span-4 bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group">
                   <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform"><Umbrella size={200} /></div>
                   <h4 className="text-amber-400 text-[10px] font-black uppercase mb-4 tracking-widest italic">Le 5 Rendite (Pag. 38)</h4>
                   <ul className="space-y-4 relative z-10">
                      {[
                        'Vitalizia Rivalutabile',
                        'Vitalizia con LTC (Opzione F)',
                        'Certa per 5/10 Anni',
                        'Reversibile',
                        'Controassicurata'
                      ].map((r, i) => (
                        <li key={i} className="flex items-center gap-3 text-xs font-bold text-slate-300">
                           <ChevronRight size={14} className="text-amber-500" /> {r}
                        </li>
                      ))}
                   </ul>
                </div>
             </div>
          </div>
        )}

        {/* --- TAB: FISCALITÀ & COSTI --- */}
        {activeTab === 'COSTI' && (
          <div className="space-y-10 animate-fade-in">
             <div className="grid lg:grid-cols-12 gap-8">
                <div className="lg:col-span-7 bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm space-y-8">
                   <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic flex items-center gap-3"><Gavel className="text-indigo-600"/> Vantaggi Fiscali Certificati</h3>
                   <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 flex flex-col justify-between">
                         <p className="text-[10px] font-black text-slate-400 uppercase mb-4">In Fase di Accumulo</p>
                         <p className="text-sm font-bold text-slate-800 leading-relaxed italic mb-4">"Deducibilità IRPEF dei contributi versati fino a un massimo di **5.164,57 €** annui."</p>
                         <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
                            <span className="text-[10px] font-black uppercase text-indigo-600">Imposta Bollo:</span>
                            <span className="text-xs font-black text-emerald-600">ESENTE</span>
                         </div>
                      </div>
                      <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 flex flex-col justify-between">
                         <p className="text-[10px] font-black text-slate-400 uppercase mb-4">Sui Rendimenti</p>
                         <div className="space-y-3">
                            <div className="flex justify-between items-center">
                               <span className="text-[10px] font-bold text-slate-500">TITOLI DI STATO:</span>
                               <span className="text-sm font-black text-indigo-600">12,5%</span>
                            </div>
                            <div className="flex justify-between items-center">
                               <span className="text-[10px] font-bold text-slate-500">ALTRE LINEE:</span>
                               <span className="text-sm font-black text-indigo-600">20%</span>
                            </div>
                         </div>
                         <p className="text-[9px] text-slate-400 mt-4 italic">Contro il 26% della tassazione bancaria ordinaria.</p>
                      </div>
                   </div>
                   <div className="p-8 bg-indigo-900 rounded-[2.5rem] text-white flex justify-between items-center">
                      <div>
                         <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-1 italic">Tassazione Uscita (Pensione/TFR)</p>
                         <h4 className="text-4xl font-black italic tracking-tighter">15% → 9%</h4>
                      </div>
                      <p className="text-[9px] text-slate-400 font-bold uppercase italic max-w-[150px] text-right">Riduzione dello 0,3% annuo dopo il 15° anno di partecipazione.</p>
                   </div>
                </div>

                <div className="lg:col-span-5 bg-white p-10 rounded-[3rem] border border-slate-200 shadow-xl overflow-hidden relative">
                   <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic mb-8 flex items-center gap-3"><Calculator className="text-amber-500"/> Profit Planner Advisor</h3>
                   <div className="space-y-6">
                      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                         <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">Premio Ricorrente Annuo (€)</label>
                         <input type="number" value={premiumAmount} onChange={(e) => setPremiumAmount(Number(e.target.value))} className="w-full bg-transparent font-black text-2xl outline-none text-[#233D7B] border-b border-slate-200" />
                      </div>
                      <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                         <label className="text-[10px] font-black text-slate-500 uppercase block mb-3">Tuo Tier Payout (Sales)</label>
                         <div className="grid grid-cols-1 gap-2">
                            {salesPayoutTiers.map((tier, idx) => (
                               <button key={idx} onClick={() => setAumTierIndex(idx)} className={`w-full flex justify-between px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${aumTierIndex === idx ? 'bg-[#233D7B] text-white' : 'bg-white text-slate-400 border border-slate-100'}`}>
                                  <span>{tier.label}</span>
                                  <span>{tier.rate * 100}%</span>
                               </button>
                            ))}
                         </div>
                      </div>
                      <div className="p-6 bg-[#0a0f1d] rounded-3xl text-white text-center">
                         <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-1 italic">Upfront Stimato</p>
                         <p className="text-4xl font-black italic">{formatCurrency(commissions.advisorUpfront)}</p>
                         <p className="text-[9px] text-slate-500 mt-2 font-bold uppercase italic">Sulla prima annualità versata</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}

      </div>

      {/* FOOTER MASTERCLASS */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
         <div className="flex items-center gap-6">
            <div className="bg-[#233D7B] p-4 rounded-[1.5rem] text-white shadow-lg"><GraduationCap size={32} /></div>
            <div>
               <p className="text-lg font-black text-slate-800 uppercase tracking-tighter leading-none mb-1">Zurich Spazio Previdenza Intelligence Report</p>
               <p className="text-xs text-slate-500 font-bold italic">Sintesi tecnica ad uso esclusivo Gruppo Vomero | Ref: Set Informativo Zurich Ed. 10/2025</p>
            </div>
         </div>
      </div>

    </div>
  );
};

export default SpazioPrevidenzaView;
