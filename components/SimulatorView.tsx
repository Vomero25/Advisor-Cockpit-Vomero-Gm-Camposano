
import React, { useState, useMemo } from 'react';
import { PENSION_COEFFICIENTS, ZURICH_PRODUCT_DATA, ANIMA_PRODUCT_DATA } from '../constants';
import { 
  Calculator, TrendingUp, History, ShieldAlert, Target, Zap, 
  ArrowRight, CheckCircle2, BookOpen, Info, TrendingDown,
  ChevronRight, Activity, Percent, Banknote, Scale, ShieldCheck,
  UserPlus, HandCoins, AlertCircle, Rocket, Shield, BarChart3,
  Calendar, Clock, Gavel, AlertTriangle, ArrowDown, Landmark,
  TrendingUp as TrendUpIcon, MoveDown
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';

const formatCurrency = (val: number) => 
  new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);

const SimulatorView: React.FC = () => {
  // --- STATI INPUT ---
  const [ral, setRal] = useState<number>(35000); 
  const [years, setYears] = useState<number>(25);
  const [inflationRate, setInflationRate] = useState<number>(2.0); 
  const [employerContribRate, setEmployerContribRate] = useState<number>(1.5);
  const [selectedFundId, setSelectedFundId] = useState<string>('Z_AZIONARIO');
  const [pensionPot, setPensionPot] = useState<number>(300000);

  const allFunds = useMemo(() => {
    const list: any[] = [];
    ZURICH_PRODUCT_DATA.FUNDS_DETAILS.forEach(f => {
      list.push({ ...f, provider: 'ZURICH', perf: parseFloat(f.returns.y10.replace(',', '.').replace('%', '')) / 100 });
    });
    ANIMA_PRODUCT_DATA.FUNDS_DETAILS.forEach(f => {
      list.push({ ...f, provider: 'ANIMA', perf: parseFloat(f.returns.y10.replace(',', '.').replace('%', '')) / 100 });
    });
    return list;
  }, []);

  const currentFund = allFunds.find(f => f.id === selectedFundId) || allFunds[0];

  // --- MOTORE TFR VS FONDO ---
  const projectionData = useMemo(() => {
    let capAziendaLordo = 0;
    let capFondoLordo = 0;
    const data = [];
    const annualTfrAccrual = ral / 13.5;
    const annualEmployerContrib = ral * (employerContribRate / 100);
    const tfrRevalRateNetta = (0.015 + (0.75 * (inflationRate / 100))) * (1 - 0.17);
    const fundNetRate = currentFund.perf * (1 - 0.20);

    for (let i = 1; i <= years; i++) {
      capAziendaLordo = (capAziendaLordo * (1 + tfrRevalRateNetta)) + annualTfrAccrual;
      capFondoLordo = (capFondoLordo * (1 + fundNetRate)) + annualTfrAccrual + annualEmployerContrib;
      const nettoAzienda = capAziendaLordo * 0.77;
      const extraYears = Math.max(0, i - 15);
      const taxRateFondo = Math.max(0.09, 0.15 - (extraYears * 0.003));
      const nettoFondo = capFondoLordo * (1 - taxRateFondo);
      data.push({ year: `An. ${i}`, azienda: Math.round(nettoAzienda), fondo: Math.round(nettoFondo), gap: Math.round(nettoFondo - nettoAzienda) });
    }
    return data;
  }, [ral, currentFund, years, inflationRate, employerContribRate]);

  const finalPoint = projectionData[projectionData.length - 1];

  // --- ANALISI RENDITA 2025 VS 1996 ---
  const currentAnnuityStats = useMemo(() => {
    const coeff67_2025 = PENSION_COEFFICIENTS.COMPARISON_AGES.find(c => c.age === 67)?.val2025 || 5.723;
    const coeff67_1996 = PENSION_COEFFICIENTS.COMPARISON_AGES.find(c => c.age === 67)?.val1996 || 6.612;
    
    const monthly2025 = (pensionPot * (coeff67_2025 / 100)) / 13;
    const monthly1996 = (pensionPot * (coeff67_1996 / 100)) / 13;
    
    return {
      monthly2025,
      monthly1996,
      loss: monthly2025 - monthly1996,
      coeffUsed: coeff67_2025
    };
  }, [pensionPot]);

  // --- DATI GRAFICO CRONISTORIA INTERATTIVO ---
  const interactiveHistoryData = useMemo(() => {
    const startValue = PENSION_COEFFICIENTS.HISTORY_AGE_65[0].value;
    return PENSION_COEFFICIENTS.HISTORY_AGE_65.map(d => {
      const monthly = (pensionPot * (d.value / 100)) / 13;
      const lossVsPeak = ((startValue - d.value) / startValue) * 100;
      return {
        ...d,
        rendita: Math.round(monthly),
        lossPct: lossVsPeak.toFixed(1),
        coeff: d.value.toFixed(3)
      };
    });
  }, [pensionPot]);

  const ageLossData = useMemo(() => {
    return PENSION_COEFFICIENTS.COMPARISON_AGES.map(row => {
      const ann1996 = (pensionPot * (row.val1996 / 100)) / 13;
      const ann2025 = (pensionPot * (row.val2025 / 100)) / 13;
      const monthlyLoss = ann2025 - ann1996;
      const percentLoss = ((ann2025 / ann1996 - 1) * 100).toFixed(1);
      return { ...row, ann1996, ann2025, monthlyLoss, percentLoss };
    });
  }, [pensionPot]);

  return (
    <div className="max-w-7xl mx-auto space-y-16 animate-fade-in pb-24">
      
      {/* 1. SEZIONE TFR VS FONDO */}
      <section className="space-y-8">
        <div className="bg-[#0f172a] rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden border-b-8 border-indigo-600">
          <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-600 p-3 rounded-2xl shadow-lg"><Calculator size={28}/></div>
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-indigo-400 italic">Audit Gruppo Vomero | Benchmark COVIP Certificati</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-none">TFR: <span className="text-rose-500">Debito</span> vs <span className="text-emerald-400">Patrimonio</span></h2>
              <p className="text-slate-400 text-xl font-medium max-w-xl">Simulazione del comparto <strong>{currentFund.name}</strong> vs TFR in azienda, inclusa efficienza fiscale 9-15% e contributi datoriali.</p>
            </div>
            <div className="lg:col-span-5 bg-white/5 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white/10 text-center relative">
              <p className="text-[11px] font-black uppercase text-indigo-300 mb-2 tracking-widest">Capitale Netto Extra</p>
              <p className="text-7xl font-black text-emerald-400 tracking-tighter">+{formatCurrency(finalPoint.gap)}</p>
              <div className="mt-4 flex items-center justify-center gap-2 text-[10px] font-black text-slate-400 uppercase italic">
                <ShieldCheck size={14} className="text-emerald-500" /> Rendimento Netto Storico: {currentFund.returns.y10}
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm space-y-8">
               <div className="space-y-6">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Activity size={14} className="text-indigo-600"/> Parametri Diagnosi</h4>
                  <div className="space-y-4">
                     <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <p className="text-[10px] font-black text-slate-500 mb-1 uppercase">RAL Lorda (€)</p>
                        <input type="number" value={ral} onChange={(e) => setRal(Number(e.target.value))} className="w-full bg-transparent font-black text-2xl outline-none text-slate-900" />
                     </div>
                     <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <p className="text-[10px] font-black text-slate-500 mb-1 uppercase">Orizzonte: {years} anni</p>
                        <input type="range" min="1" max="40" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none accent-indigo-600" />
                     </div>
                  </div>
               </div>
               <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Target size={14} className="text-indigo-600"/> Selezione Comparto</h4>
                  <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {allFunds.map(f => (
                      <button key={f.id} onClick={() => setSelectedFundId(f.id)} className={`w-full p-4 rounded-2xl border-2 text-left transition-all ${selectedFundId === f.id ? 'border-indigo-600 bg-indigo-50 shadow-md' : 'border-slate-100 hover:bg-slate-50'}`}>
                        <div className="flex justify-between items-center">
                           <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase ${f.provider === 'ZURICH' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>{f.provider}</span>
                           <span className="text-[9px] font-black text-slate-400 uppercase">ISC: {f.cost}</span>
                        </div>
                        <h4 className="font-black text-xs text-slate-700 mt-2 uppercase truncate">{f.name}</h4>
                      </button>
                    ))}
                  </div>
               </div>
            </div>
          </div>

          <div className="lg:col-span-8 bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm flex flex-col">
             <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic">Analisi Proiettiva Capitale Netto</h3>
             </div>
             <div className="flex-1 min-h-[450px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={projectionData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
                    <YAxis tickFormatter={(v) => `€${(v/1000).toFixed(0)}k`} axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                    <Tooltip contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'}} />
                    <Area type="monotone" dataKey="fondo" stroke="#10b981" strokeWidth={5} fill="#10b981" fillOpacity={0.1} name="Netto Fondo" />
                    <Area type="monotone" dataKey="azienda" stroke="#6366f1" strokeWidth={3} fill="none" name="Netto Azienda" />
                  </AreaChart>
                </ResponsiveContainer>
             </div>
          </div>
        </div>
      </section>

      {/* 2. FOCUS DECLINO RENDITA STATALE (POTENZIATA ED INTERATTIVA) */}
      <section className="space-y-12 pt-16 border-t-2 border-slate-100">
        <div className="bg-slate-950 rounded-[3.5rem] p-12 text-white shadow-2xl relative overflow-hidden border-b-8 border-rose-600">
           <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                 <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-500/20 rounded-full border border-rose-500/30 text-rose-400 text-[10px] font-black uppercase tracking-widest">
                    <ShieldAlert size={14} /> Alert Coefficienti 2025 (D.M. 19/12/2022)
                 </div>
                 <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-none">Il Declino della <br/> <span className="text-rose-500 underline decoration-8 underline-offset-8">Rendita Pubblica</span></h2>
                 <p className="text-slate-400 text-xl font-medium leading-relaxed max-w-xl">
                    "Dottore, osserva come lo stesso montante genera oggi una rendita inferiore del 13% rispetto al passato. Lo Stato riduce la velocità di restituzione dei tuoi soldi."
                 </p>
              </div>
              <div className="lg:col-span-5 space-y-6">
                 {/* CALCOLATORE RENDITA DINAMICO */}
                 <div className="bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 text-center relative overflow-hidden group shadow-2xl">
                    <div className="absolute -bottom-10 -left-10 opacity-5 rotate-12 group-hover:rotate-0 transition-transform"><Banknote size={200} /></div>
                    <p className="text-[11px] font-black uppercase text-indigo-300 mb-4 tracking-widest italic">Montante per lo Stress Test (€)</p>
                    <input 
                      type="number" 
                      value={pensionPot} 
                      onChange={(e) => setPensionPot(Number(e.target.value))} 
                      className="bg-transparent text-6xl font-black text-white text-center outline-none w-full border-b-2 border-white/20 pb-4 mb-8 transition-colors focus:border-amber-500" 
                    />
                    
                    {/* BOX RISULTATO RENDITA OGGI */}
                    <div className="p-8 bg-indigo-600 rounded-3xl shadow-2xl transform hover:scale-105 transition-all">
                       <p className="text-[10px] font-black uppercase text-indigo-200 mb-2 tracking-[0.2em]">Rendita Mensile Lorda OGGI</p>
                       <p className="text-5xl font-black text-white tracking-tighter">{formatCurrency(currentAnnuityStats.monthly2025)}</p>
                       <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center text-[10px] font-bold text-indigo-100">
                          <span className="uppercase">Coefficiente 2025:</span>
                          <span className="bg-white/20 px-2 py-0.5 rounded">{currentAnnuityStats.coeffUsed.toFixed(3)}%</span>
                       </div>
                    </div>

                    <div className="mt-6 flex items-center justify-center gap-2 text-rose-400 font-black text-[10px] uppercase tracking-widest">
                       <TrendingDown size={14} /> Perdita Mensile vs 1996: {formatCurrency(Math.abs(currentAnnuityStats.loss))}
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
           {/* GRAFICO CRONISTORIA INTERATTIVO */}
           <div className="lg:col-span-8 bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm h-[550px] flex flex-col relative overflow-hidden group">
              <div className="flex justify-between items-start mb-10">
                 <div>
                    <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic flex items-center gap-3 italic leading-none"><History className="text-rose-600" /> Cronistoria Rendite Mensili</h3>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2">Valore stimato a parità di montante ({formatCurrency(pensionPot)})</p>
                 </div>
                 <div className="flex gap-4">
                    <div className="bg-slate-50 px-4 py-2 rounded-xl text-[10px] font-black text-slate-400 border border-slate-100 uppercase italic">
                       Basato su Età 65
                    </div>
                 </div>
              </div>
              
              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={interactiveHistoryData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                      <defs>
                         <linearGradient id="gradRed" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2}/><stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/></linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis 
                        dataKey="period" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fontSize: 10, fontWeight: '900', fill: '#475569'}} 
                      />
                      <YAxis 
                        domain={['auto', 'auto']} 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fontSize: 10}}
                        tickFormatter={(v) => `€${v}`}
                      />
                      <Tooltip 
                        content={({ active, payload }) => {
                           if (active && payload && payload.length) {
                              const data = payload[0].payload;
                              return (
                                 <div className="bg-slate-900 text-white p-5 rounded-[2rem] shadow-2xl border border-white/10 animate-fade-in">
                                    <p className="text-[10px] font-black text-amber-500 uppercase mb-2 tracking-widest">{data.period}</p>
                                    <p className="text-2xl font-black italic">{formatCurrency(data.rendita)} <span className="text-[10px] opacity-50 not-italic">/mese</span></p>
                                    <div className="mt-3 pt-3 border-t border-white/5 space-y-1">
                                       <p className="text-[9px] font-bold text-slate-400 uppercase">Coefficiente: {data.coeff}%</p>
                                       {data.lossPct !== "0.0" && (
                                          <p className="text-[9px] font-black text-rose-500 uppercase">Perdita vs Picco: -{data.lossPct}%</p>
                                       )}
                                    </div>
                                 </div>
                              );
                           }
                           return null;
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="rendita" 
                        stroke="#f43f5e" 
                        strokeWidth={6} 
                        fill="url(#gradRed)" 
                        dot={{ r: 8, fill: '#f43f5e', stroke: '#fff', strokeWidth: 3 }} 
                        /* Fix: Removed invalid 'shadow' property from activeDot */
                        activeDot={{ r: 12, fill: '#f43f5e', stroke: '#fff', strokeWidth: 4 }}
                      />
                      {/* LINEE DI RIFERIMENTO FISSE */}
                      <ReferenceLine 
                        y={interactiveHistoryData[0].rendita} 
                        stroke="#94a3b8" 
                        strokeDasharray="10 5" 
                        label={{ position: 'top', value: 'REGIME DINI (MAX)', fill: '#94a3b8', fontSize: 9, fontWeight: 900 }} 
                      />
                   </AreaChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-8 flex items-center justify-between p-6 bg-rose-50 rounded-3xl border border-rose-100">
                 <div className="flex items-center gap-4">
                    <div className="p-3 bg-rose-500 rounded-2xl text-white shadow-lg"><MoveDown size={24} /></div>
                    <div>
                       <p className="text-xs font-black text-rose-900 uppercase">Velocità di Restituzione</p>
                       <p className="text-[11px] text-rose-700 font-bold italic">Lo Stato sta progressivamente riducendo la rendita per contrastare l'aumento della longevità.</p>
                    </div>
                 </div>
                 <div className="text-right">
                    <p className="text-2xl font-black text-rose-600 tracking-tighter">-{interactiveHistoryData[interactiveHistoryData.length-1].lossPct}%</p>
                    <p className="text-[9px] font-black text-rose-400 uppercase">Gap Storico</p>
                 </div>
              </div>
           </div>

           <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm relative overflow-hidden h-full flex flex-col">
                 <h4 className="text-[10px] font-black text-rose-600 uppercase tracking-widest flex items-center gap-2 mb-8">
                    <ArrowDown size={14} /> Bench. Rendita per Età
                 </h4>
                 <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                    {ageLossData.map((row) => (
                       <div key={row.age} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-rose-200 transition-all">
                          <div className="flex justify-between items-center mb-3">
                             <div className="flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-black">{row.age}</span>
                                <span className="text-[11px] font-black text-slate-700 uppercase tracking-tighter">{row.label}</span>
                             </div>
                             <span className="text-xs font-black text-rose-600">{row.percentLoss}%</span>
                          </div>
                          <div className="flex justify-between items-end">
                             <div>
                                <p className="text-[9px] text-slate-400 font-bold uppercase">Rendita Oggi</p>
                                <p className="text-xl font-black text-slate-900">{formatCurrency(row.ann2025)}</p>
                             </div>
                             <div className="text-right">
                                <p className="text-[9px] text-slate-400 font-bold uppercase">Coeff. 2025</p>
                                <p className="text-sm font-black text-indigo-600">{row.val2025.toFixed(3)}%</p>
                             </div>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* FOOTER AUDIT */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
         <div className="flex items-center gap-6">
            <div className="bg-[#0f172a] p-4 rounded-[1.5rem] text-white shadow-lg"><Info size={32} /></div>
            <div>
               <p className="text-lg font-black text-slate-800 uppercase tracking-tighter leading-none mb-1">Rapporto Certificato sulla Rendita Statale</p>
               <p className="text-xs text-slate-500 font-bold italic">Fonti: ISTAT (Tavole di Mortalità) | MEF | INPS (Coefficienti di Trasformazione 1996-2025)</p>
            </div>
         </div>
         <div className="text-right">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest italic leading-none">Market Intelligence Unit - Gruppo Vomero</p>
         </div>
      </div>
    </div>
  );
};

export default SimulatorView;
