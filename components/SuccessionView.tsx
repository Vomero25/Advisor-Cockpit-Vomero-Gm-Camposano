
import React, { useState, useMemo } from 'react';
import { SUCCESSION_DATA } from '../constants';
import { 
  Scale, ShieldCheck, AlertTriangle, Coins, Info, 
  Calculator, Gavel, Lock, CheckCircle2, BookOpen, 
  ScrollText, ArrowRight, Zap, Clock, Sparkles, HelpCircle,
  TrendingUp, MessageCircle, AlertOctagon, HeartPulse,
  Gift, Wallet, Landmark, ArrowDownToLine, MousePointer2,
  Lightbulb, ShieldAlert, Ban, HandHelping, History, Globe,
  Settings2, ChevronRight, Siren, Timer, Briefcase, FileText,
  UserPlus, Table as TableIcon, Crown, Percent, Unlock,
  Skull, UserMinus, FileSignature, ArrowDownNarrowWide,
  // Fix: Added missing Quote and ShieldPlus icons
  Quote, ShieldPlus
} from 'lucide-react';

const formatCurrency = (val: number) => 
  new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);

const SuccessionView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'STRESS_TEST' | 'LIQUIDITY' | 'ALQUOTE' | 'LEGAL'>('STRESS_TEST');
  
  // Stato Simulatore
  const [estateValue, setEstateValue] = useState<number>(1000000); // Valore mobiliari (conti, azioni)
  const [realEstateValue, setRealEstateValue] = useState<number>(800000); // Valore immobili
  const [kinship, setKinship] = useState<keyof typeof SUCCESSION_DATA.TAX_RATES>('SPOUSE_CHILDREN');
  const [pensionPot, setPensionPot] = useState<number>(150000);
  const [multinvestPot, setMultinvestPot] = useState<number>(250000);

  const taxRules = SUCCESSION_DATA.TAX_RATES[kinship];
  
  const simulation = useMemo(() => {
    // 1. ASSE EREDITARIO ORDINARIO (Colpito da Tasse e Burocrazia)
    const ordinaryAssets = estateValue + realEstateValue;
    const totalTaxable = Math.max(0, ordinaryAssets - taxRules.exemption);
    const inheritanceTax = totalTaxable * taxRules.rate;
    
    // Imposte Ipo-Catastali sugli immobili (3% del valore catastale, approssimiamo su mkt per stress test)
    const ipoCatastali = realEstateValue * 0.03; 
    const totalCashNeededForSuccession = inheritanceTax + ipoCatastali + 5000; // + Spese legali/periti

    // 2. ASSE PROTETTO (Fondo + Zurich - ESENTI Art. 12)
    const protectedAssets = pensionPot + multinvestPot;
    const directLiquidity = protectedAssets; // Disponibile "Iure Proprio"

    // 3. ANALISI DEL "LIQUIDITY GAP"
    // Se cash_needed > direct_liquidity gli eredi devono attingere ai propri risparmi personali
    const liquidityGap = Math.max(0, totalCashNeededForSuccession - directLiquidity);
    const efficiency = (inheritanceTax / (ordinaryAssets + protectedAssets)) * 100;

    return { 
      inheritanceTax,
      ipoCatastali,
      totalCashNeededForSuccession,
      directLiquidity,
      liquidityGap,
      efficiency,
      ordinaryAssets,
      protectedAssets
    };
  }, [estateValue, realEstateValue, kinship, pensionPot, multinvestPot, taxRules]);

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-fade-in pb-24">
      
      {/* 1. HERO - IL PROBLEMA DELLA TRASMISSIONE */}
      <div className="bg-[#0f172a] rounded-[3.5rem] p-12 text-white shadow-2xl relative border-b-8 border-amber-500 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-amber-600/10 to-transparent"></div>
        <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
           <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                 <div className="bg-amber-500 p-3 rounded-2xl shadow-xl shadow-amber-600/20"><Scale size={32} className="text-slate-900"/></div>
                 <span className="text-[11px] font-black uppercase tracking-[0.4em] text-amber-400 italic">Legacy Audit Unit - Gruppo Vomero</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
                Pianificare <br/> <span className="text-amber-500 text-6xl">la Continuità.</span>
              </h1>
              <p className="text-slate-400 text-xl font-medium max-w-2xl leading-relaxed">
                "Dottore, il passaggio generazionale non è un calcolo fiscale, è un **test di resistenza**. Se i suoi conti vengono bloccati, come farà la sua famiglia a pagare le tasse per ereditare la casa?"
              </p>
           </div>
           <div className="lg:col-span-4 bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 text-center relative group">
              <p className="text-[10px] font-black uppercase text-amber-500 mb-2 tracking-widest italic">Liquidità Pronta (Iure Proprio)</p>
              <p className="text-6xl font-black text-white tracking-tighter animate-pulse">{formatCurrency(simulation.directLiquidity)}</p>
              <p className="text-[10px] font-black text-emerald-400 uppercase mt-4 tracking-widest italic">Esenzione Totale Art. 12</p>
           </div>
        </div>
      </div>

      {/* 2. NAVIGATION SUB-TABS */}
      <div className="flex flex-wrap gap-2 bg-slate-100 p-1.5 rounded-2xl w-full md:w-fit mx-auto shadow-inner border border-slate-200">
         <button onClick={() => setActiveTab('STRESS_TEST')} className={`px-8 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'STRESS_TEST' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-500 hover:text-slate-800'}`}>
            <Zap size={16} /> Stress Test Successorio
         </button>
         <button onClick={() => setActiveTab('LIQUIDITY')} className={`px-8 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'LIQUIDITY' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-500 hover:text-slate-800'}`}>
            <Unlock size={16} /> Analisi Blocco Bancario
         </button>
         <button onClick={() => setActiveTab('ALQUOTE')} className={`px-8 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'ALQUOTE' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-500 hover:text-slate-800'}`}>
            <TableIcon size={16} /> Aliquote & Franchigie
         </button>
         <button onClick={() => setActiveTab('LEGAL')} className={`px-8 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'LEGAL' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-500 hover:text-slate-800'}`}>
            <Gavel size={16} /> Fondamenti Legali
         </button>
      </div>

      {/* 3. CONTENT RENDERER */}
      <div className="min-h-[600px]">
        
        {/* --- TAB 1: STRESS TEST --- */}
        {activeTab === 'STRESS_TEST' && (
          <div className="grid lg:grid-cols-12 gap-8 animate-fade-in">
             <div className="lg:col-span-4 space-y-6">
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8">
                   <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Settings2 size={14} className="text-amber-500" /> Il Patrimonio Attuale
                   </h4>
                   <div className="space-y-6">
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                         <label className="text-[10px] font-black text-slate-400 uppercase block mb-1">Asset Bancari (C/C, Titoli) (€)</label>
                         <input type="number" value={estateValue} onChange={(e) => setEstateValue(Number(e.target.value))} className="w-full bg-transparent font-black text-xl outline-none text-slate-900" />
                         <p className="text-[9px] text-rose-500 mt-1 font-bold italic uppercase">Vulnerabilità: BLOCCO BANCARIO</p>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                         <label className="text-[10px] font-black text-slate-400 uppercase block mb-1">Valore Immobili (€)</label>
                         <input type="number" value={realEstateValue} onChange={(e) => setRealEstateValue(Number(e.target.value))} className="w-full bg-transparent font-black text-xl outline-none text-slate-900" />
                         <p className="text-[9px] text-amber-600 mt-1 font-bold italic uppercase">Vulnerabilità: TASSE IPOCATASTALI</p>
                      </div>
                      <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
                         <label className="text-[10px] font-black text-indigo-600 uppercase block mb-1">Fondo Pensione / Multinvest (€)</label>
                         <div className="grid grid-cols-2 gap-2 mt-2">
                            <input type="number" value={pensionPot} onChange={(e) => setPensionPot(Number(e.target.value))} className="w-full bg-white p-2 rounded-lg font-black text-sm outline-none text-indigo-900" />
                            <input type="number" value={multinvestPot} onChange={(e) => setMultinvestPot(Number(e.target.value))} className="w-full bg-white p-2 rounded-lg font-black text-sm outline-none text-indigo-900" />
                         </div>
                         <p className="text-[9px] text-emerald-600 mt-2 font-bold italic uppercase">Scudo: ESENZIONE ART. 12</p>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                         <label className="text-[10px] font-black text-slate-400 uppercase block mb-2">Eredi</label>
                         <select value={kinship} onChange={(e) => setKinship(e.target.value as any)} className="w-full bg-transparent font-bold text-slate-800 outline-none text-sm">
                            {Object.entries(SUCCESSION_DATA.TAX_RATES).map(([k, v]) => (
                               <option key={k} value={k}>{v.label}</option>
                            ))}
                         </select>
                      </div>
                   </div>
                </div>
                
                <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group border-b-8 border-rose-500">
                   <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform"><AlertOctagon size={200} /></div>
                   <h4 className="text-rose-400 text-[10px] font-black uppercase mb-4 tracking-widest italic flex items-center gap-2"><Siren size={14}/> Allerta Liquidità</h4>
                   <p className="text-sm text-slate-300 leading-relaxed font-medium italic">
                      "Dottore, per ereditare i suoi immobili, i suoi figli dovranno pagare circa **{formatCurrency(simulation.ipoCatastali)}** di tasse fisse. Se il conto corrente è bloccato, dove prenderanno questi soldi?"
                   </p>
                </div>
             </div>

             <div className="lg:col-span-8 space-y-8">
                <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden">
                   <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic mb-10 flex items-center gap-3">
                      <TrendingUp className="text-amber-500" /> Diagnosi della Trasmissione
                   </h3>
                   
                   <div className="grid md:grid-cols-2 gap-8">
                      {/* ASSET CONGELATI */}
                      <div className="p-8 bg-rose-50 rounded-[2.5rem] border-2 border-rose-100 flex flex-col justify-between">
                         <div>
                            <div className="flex justify-between items-start mb-4">
                               <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Patrimonio Burocratico</p>
                               <Clock size={18} className="text-rose-400" />
                            </div>
                            <p className="text-4xl font-black text-slate-900">{formatCurrency(simulation.ordinaryAssets)}</p>
                            <p className="text-[9px] text-slate-500 font-bold uppercase mt-2">Disponibilità: 3-9 Mesi</p>
                         </div>
                         <div className="mt-8 pt-4 border-t border-rose-200 space-y-2">
                            <div className="flex justify-between text-[10px] font-bold text-rose-600 uppercase">
                               <span>Tassa Successione:</span>
                               <span>{formatCurrency(simulation.inheritanceTax)}</span>
                            </div>
                            <div className="flex justify-between text-[10px] font-bold text-rose-600 uppercase">
                               <span>Imposte Ipo-Catastali:</span>
                               <span>{formatCurrency(simulation.ipoCatastali)}</span>
                            </div>
                         </div>
                      </div>

                      {/* ASSET IMMEDIATI */}
                      <div className="p-8 bg-emerald-50 rounded-[2.5rem] border-2 border-emerald-500 relative shadow-xl scale-105">
                         <div className="absolute top-2 right-2"><Sparkles className="text-emerald-500 animate-pulse" size={24}/></div>
                         <div>
                            <div className="flex justify-between items-start mb-4">
                               <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Liquidità Iure Proprio</p>
                               <Zap size={18} className="text-emerald-600" />
                            </div>
                            <p className="text-5xl font-black text-emerald-700">{formatCurrency(simulation.directLiquidity)}</p>
                            <p className="text-[9px] text-emerald-500 font-black uppercase mt-2">Disponibilità: 20-30 Giorni</p>
                         </div>
                         <div className="mt-8 pt-4 border-t border-emerald-200">
                            <p className="text-[10px] font-black text-indigo-600 uppercase italic">Efficienza Fiscale: 100%</p>
                            <p className="text-[9px] text-slate-500 leading-tight mt-1 italic">Esclusi dall'attivo ereditario e dalle franchigie (Art. 12).</p>
                         </div>
                      </div>
                   </div>

                   {/* VERDETTO DI LIQUIDITÀ */}
                   <div className={`mt-12 p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 border-l-8 ${simulation.liquidityGap > 0 ? 'bg-rose-50 border-rose-500' : 'bg-emerald-50 border-emerald-500'}`}>
                      <div>
                         <h4 className="text-xl font-black uppercase italic tracking-tighter text-slate-800">Verdetto Solvibilità Eredi</h4>
                         <p className="text-sm text-slate-500 font-medium">
                            {simulation.liquidityGap > 0 
                               ? `Mancano ${formatCurrency(simulation.liquidityGap)} di liquidità immediata per pagare le spese di sblocco.` 
                               : "La strategia attuale garantisce agli eredi la liquidità necessaria per pagare lo Stato."}
                         </p>
                      </div>
                      <div className="text-center md:text-right">
                         <p className={`text-4xl font-black ${simulation.liquidityGap > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                            {simulation.liquidityGap > 0 ? `GAP: -${formatCurrency(simulation.liquidityGap)}` : 'SICUREZZA OK'}
                         </p>
                      </div>
                   </div>
                </div>

                {/* ADVISOR NOTE */}
                <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm flex items-center gap-8 relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4 opacity-5"><Lightbulb size={120} /></div>
                   <div className="bg-amber-100 p-4 rounded-full text-amber-600 shrink-0"><Quote size={32} /></div>
                   <div className="space-y-2">
                      <h5 className="font-black text-slate-800 uppercase text-xs tracking-widest">Lo Script della Verità</h5>
                      <p className="text-sm text-slate-600 font-medium italic leading-relaxed">
                         "Dottore, lei ha accumulato un grande patrimonio, ma lo ha distribuito in modo che lo Stato sia il primo beneficiario al momento del bisogno. Spostare una quota in Zurich/Anima significa firmare un assegno circolare che i suoi figli incasseranno in 20 giorni, proprio quando la banca dirà loro di aspettare."
                      </p>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* --- TAB 2: ANALISI BLOCCO BANCARIO --- */}
        {activeTab === 'LIQUIDITY' && (
          <div className="animate-fade-in space-y-10">
             <div className="bg-white rounded-[3rem] p-10 border border-slate-200 shadow-sm overflow-hidden">
                <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic mb-12 flex items-center gap-4">
                   <Timer className="text-indigo-600" /> Cronistoria del Blocco Patrimoniale
                </h3>
                
                <div className="relative">
                   <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-slate-100 -translate-x-1/2 hidden md:block"></div>
                   
                   <div className="space-y-12">
                      {[
                        { time: "GIORNO 1", title: "Evento", desc: "La banca viene informata del decesso. Scatta il blocco cautelativo di tutti i conti correnti (anche cointestati a firma disgiunta).", type: "DANGER", icon: Skull },
                        { time: "GIORNI 15-30", title: "Zurich / Anima Payout", desc: "Presentando il certificato di morte e la polizza, i beneficiari ricevono il 100% del capitale direttamente sul proprio conto. Liquidità disponibile.", type: "SAFE", icon: Zap },
                        { time: "MESI 3-6", title: "Burocrazia Stato", desc: "Presentazione della Dichiarazione di Successione. Calcolo e pagamento anticipato delle imposte Ipo-catastali.", type: "NEUTRAL", icon: Landmark },
                        { time: "MESI 9+", title: "Sblocco Bancario", desc: "Solo dopo la presentazione del modello 240 (F24 pagato), la banca procede allo sblocco dei conti. Il cerchio si chiude.", type: "DANGER", icon: Unlock }
                      ].map((step, i) => (
                        <div key={i} className={`flex flex-col md:flex-row items-center gap-8 relative ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                           <div className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
                              <span className={`text-[10px] font-black px-3 py-1 rounded-full mb-3 uppercase tracking-widest ${step.type === 'SAFE' ? 'bg-emerald-100 text-emerald-700' : step.type === 'DANGER' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-600'}`}>
                                 {step.time}
                              </span>
                              <h4 className="text-xl font-black text-slate-800 uppercase tracking-tight">{step.title}</h4>
                              <p className="text-sm text-slate-500 font-medium italic mt-2 leading-relaxed">{step.desc}</p>
                           </div>
                           <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white border-4 border-slate-200 flex items-center justify-center z-10 shadow-lg hidden md:flex">
                              <step.icon size={20} className={step.type === 'SAFE' ? 'text-emerald-600' : 'text-slate-400'} />
                           </div>
                           <div className="md:w-1/2"></div>
                        </div>
                      ))}
                   </div>
                </div>
             </div>

             <div className="grid md:grid-cols-2 gap-8">
                <div className="p-10 bg-indigo-900 rounded-[3rem] text-white shadow-xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4 opacity-10"><ShieldPlus size={150} /></div>
                   <h4 className="text-xl font-black uppercase tracking-tighter text-amber-400 mb-4">Il Concetto "Iure Proprio"</h4>
                   <p className="text-sm text-slate-300 leading-relaxed font-medium italic">
                      "Signor Cliente, il Fondo Pensione e la Multinvest non passano attraverso il testamento. Il capitale è dei beneficiari nel momento stesso in cui viene versato. È un contratto che scavalca la coda della successione."
                   </p>
                </div>
                <div className="p-10 bg-white rounded-[3rem] border border-slate-200 shadow-sm flex items-center gap-6">
                   <div className="bg-rose-50 p-5 rounded-3xl text-rose-600"><AlertTriangle size={32} /></div>
                   <div>
                      <h4 className="font-black text-slate-800 uppercase text-xs">Rischio Conti Cointestati</h4>
                      <p className="text-xs text-slate-500 font-bold italic leading-relaxed">
                         Contrariamente a quanto si pensa, il cointestatario non può prelevare la sua quota (50%) senza il consenso di tutti gli eredi o il nulla osta della banca. Il blocco è totale.
                      </p>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* --- TAB 3: ALIQUOTE & FRANCHIGIE --- */}
        {activeTab === 'ALQUOTE' && (
          <div className="animate-fade-in space-y-8">
             <div className="bg-white rounded-[3rem] p-10 border border-slate-200 shadow-sm">
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic mb-10 flex items-center gap-4">
                   <TableIcon className="text-amber-500" /> Matrice Imposizione Fiscale 2025
                </h3>
                
                <div className="grid lg:grid-cols-12 gap-12">
                   <div className="lg:col-span-8 overflow-hidden rounded-3xl border border-slate-100">
                      <table className="w-full text-left border-collapse">
                        <thead className="bg-[#0f172a] text-white text-[9px] font-black uppercase tracking-widest">
                           <tr>
                              <th className="px-6 py-6">Beneficiario / Grado</th>
                              <th className="px-6 py-6 text-center">Aliquota %</th>
                              <th className="px-6 py-6 text-right">Franchigia €</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-xs font-bold">
                           {Object.entries(SUCCESSION_DATA.TAX_RATES).map(([key, val]) => (
                              <tr key={key} className="hover:bg-slate-50 transition-colors">
                                 <td className="px-6 py-5 text-slate-700">{val.label}</td>
                                 <td className="px-6 py-5 text-center text-rose-600 font-black">{val.rate * 100}%</td>
                                 <td className="px-6 py-5 text-right text-emerald-600">{formatCurrency(val.exemption)}</td>
                              </tr>
                           ))}
                        </tbody>
                      </table>
                   </div>
                   <div className="lg:col-span-4 space-y-6">
                      <div className="bg-indigo-900 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
                         <div className="absolute top-0 right-0 p-4 opacity-10"><Crown size={100} /></div>
                         <h4 className="text-lg font-black uppercase tracking-tighter mb-4 text-amber-400">Zero Imposta</h4>
                         <p className="text-sm text-slate-300 leading-relaxed font-medium italic">
                            "A differenza del conto titoli bancario, il Fondo Pensione e la Multinvest sono **esenti al 100%** da imposta di successione, indipendentemente dalla franchigia residua."
                         </p>
                      </div>
                      <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200">
                         <div className="flex items-center gap-3 mb-3 text-amber-600">
                            <Info size={20} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Focus Immobili</span>
                         </div>
                         <p className="text-[10px] text-slate-500 font-bold">
                            Ricorda che per gli immobili le imposte Ipotecarie (2%) e Catastali (1%) si pagano **sempre**, anche se il valore è sotto la franchigia di 1 milione di euro.
                         </p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* --- TAB 4: FONDAMENTI LEGALI --- */}
        {activeTab === 'LEGAL' && (
          <div className="animate-fade-in space-y-8">
             <div className="grid md:grid-cols-3 gap-8">
                {SUCCESSION_DATA.LEGAL_PILLARS.map((p, idx) => (
                   <div key={idx} className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group flex flex-col justify-between">
                      <div className="absolute -top-10 -right-10 opacity-5 group-hover:rotate-12 transition-transform"><BookOpen size={200} /></div>
                      <div>
                         <div className="flex justify-between items-start mb-8 relative z-10">
                            <div className="bg-amber-500 p-3 rounded-xl text-slate-900"><Gavel size={24} /></div>
                            <span className="text-[9px] font-black bg-white/10 px-3 py-1 rounded-full uppercase text-amber-400 border border-amber-500/30">{p.tag}</span>
                         </div>
                         <h4 className="text-xl font-black text-amber-500 mb-2 uppercase italic leading-tight relative z-10">{p.focus}</h4>
                         <p className="text-[10px] font-black text-slate-500 mb-4 tracking-widest">{p.ref}</p>
                         <p className="text-sm text-slate-400 font-medium leading-relaxed italic relative z-10">"{p.text}"</p>
                      </div>
                   </div>
                ))}
             </div>
             
             <div className="bg-white p-10 rounded-[40px] border-4 border-dashed border-slate-100 flex flex-col md:flex-row items-center gap-10">
                <div className="bg-indigo-50 p-8 rounded-full text-indigo-600 shrink-0"><Lightbulb size={48} /></div>
                <div className="space-y-4">
                   <h4 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">Il Segreto del Wealth Protection</h4>
                   <p className="text-slate-600 font-medium leading-relaxed text-lg">
                      La forza combinata di **Multinvest** e **Fondo Pensione** risiede nell'Art. 12 del Testo Unico sulle Successioni. Le somme sono pagate al beneficiario **iure proprio**. Non erodono le franchigie degli eredi, lasciandole intatte per la protezione degli immobili.
                   </p>
                </div>
             </div>
          </div>
        )}
      </div>

      {/* 4. FOOTER EXECUTIVO */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
         <div className="flex items-center gap-6">
            <div className="bg-[#0f172a] p-4 rounded-[1.5rem] text-white shadow-lg"><FileSignature size={32} /></div>
            <div>
               <p className="text-lg font-black text-slate-800 uppercase tracking-tighter leading-none mb-1">Legacy Intelligence Certification</p>
               <p className="text-xs text-slate-500 font-bold italic">Rif. Tecnico: Art. 12 D.Lgs 346/90 | Art. 1923 c.c. | Circolare 19/E 2024 | Revisione Gruppo Vomero</p>
            </div>
         </div>
         <div className="text-right">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">DOCUMENTO AD USO INTERNO RISERVATO - PRIVATE ADVISOR ONLY</p>
         </div>
      </div>

    </div>
  );
};

export default SuccessionView;
