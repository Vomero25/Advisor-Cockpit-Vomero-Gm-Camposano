
import React, { useState, useMemo } from 'react';
import { 
  TrendingDown, AlertTriangle, Scale, History, 
  Info, CheckCircle2, Landmark, Gavel, 
  ArrowRight, ShieldAlert, BarChart3, Quote,
  ArrowDownToLine, Flame, Percent, Globe2,
  ShieldX, Skull, ArrowDownNarrowWide, AlertOctagon,
  ShieldCheck, Lock, CloudRain, Sun, ShoppingCart, 
  FileSignature, AlertCircle
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const formatCurrency = (val: number) => 
  new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);

const PensionErosionView: React.FC = () => {
  const [pensionAmount, setPensionAmount] = useState<number>(4500);
  const [horizonYears, setHorizonYears] = useState<number>(15);

  // Dati reali dalla Legge di Bilancio 2024 e Rapporto Itinerari Previdenziali
  const TRATTAMENTO_MINIMO = 614.77;
  const INFLAZIONE_STIMATA = 4.0; // Media prudenziale per il futuro

  const audit = useMemo(() => {
    const ratio = pensionAmount / TRATTAMENTO_MINIMO;
    
    // Aliquota di rivalutazione (Perequazione) 2024
    let revalRate = 100;
    if (ratio > 10) revalRate = 22;
    else if (ratio > 8) revalRate = 37;
    else if (ratio > 6) revalRate = 47;
    else if (ratio > 5) revalRate = 53;
    else if (ratio > 4) revalRate = 85;

    const realInflationImpact = (pensionAmount * INFLAZIONE_STIMATA) / 100;
    const stateRevaluation = (realInflationImpact * revalRate) / 100;
    const monthlyNetLoss = realInflationImpact - stateRevaluation;
    
    const annualLoss = monthlyNetLoss * 13;
    const totalLoss = annualLoss * horizonYears;
    
    // Metafora comprensibile: quante mensilità "spariscono"?
    const monthsLost = totalLoss / pensionAmount;

    const chartData = [];
    for (let i = 0; i <= horizonYears; i++) {
       chartData.push({
         year: `Anno ${i}`,
         potereAcquisto: Math.round((pensionAmount * 13) - (annualLoss * i)),
         tassaOcculta: Math.round(annualLoss * i)
       });
    }

    return { revalRate, monthlyNetLoss, totalLoss, monthsLost, chartData };
  }, [pensionAmount, horizonYears]);

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-fade-in pb-24">
      
      {/* HEADER EMOTIVO: IL PATTO ROTTO */}
      <div className="bg-[#0a0f1d] rounded-[3.5rem] p-12 text-white shadow-2xl relative overflow-hidden border-b-8 border-rose-600">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-rose-600/10 to-transparent"></div>
        <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
           <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                 <div className="bg-rose-600 p-3 rounded-2xl shadow-xl shadow-rose-600/20"><TrendingDown size={32} /></div>
                 <span className="text-[11px] font-black uppercase tracking-[0.4em] text-rose-400 italic">Audit Gruppo Vomero - Rapporto 2025</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter leading-none">
                La Pensione: <br/> <span className="text-rose-500">Un Saldo che Cala</span>
              </h1>
              <p className="text-slate-400 text-xl font-medium max-w-xl leading-relaxed">
                "Dottore, lo Stato non le sta togliendo soldi dal conto, le sta togliendo **tempo e benessere**. La sua pensione è un bancomat che lo Stato ricalcola ogni anno a suo svantaggio."
              </p>
           </div>
           <div className="lg:col-span-4 bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 text-center">
              <p className="text-[10px] font-black uppercase text-rose-400 mb-2 tracking-widest italic">Tempo di Vita Sottratto</p>
              <p className="text-7xl font-black text-white tracking-tighter">-{audit.monthsLost.toFixed(0)} <span className="text-xl">Mesi</span></p>
              <p className="text-[10px] font-black text-rose-300 uppercase mt-4 tracking-widest italic">Di spesa reale persi in {horizonYears} anni</p>
           </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* CONFIGURATORE SEMPLICE */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm space-y-8">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 italic">
                 <Scale size={14} className="text-rose-600" /> Il Suo Profilo
              </h4>
              <div className="space-y-6">
                 <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                    <label className="text-[10px] font-black text-slate-500 uppercase block mb-2">Pensione Mensile Lorda (€)</label>
                    <input type="number" value={pensionAmount} onChange={(e) => setPensionAmount(Number(e.target.value))} className="w-full bg-transparent font-black text-4xl outline-none text-slate-900 border-b-2 border-slate-200 pb-2 focus:border-rose-500 transition-colors" />
                 </div>
                 <div className="space-y-4">
                    <div className="flex justify-between text-[10px] font-black uppercase text-slate-400 italic">
                       <span>Anni di Pensione</span>
                       <span>{horizonYears} Anni</span>
                    </div>
                    <input type="range" min="5" max="35" value={horizonYears} onChange={(e) => setHorizonYears(Number(e.target.value))} className="w-full h-2 bg-rose-200 rounded-lg appearance-none accent-rose-600" />
                 </div>
              </div>
           </div>

           <div className="bg-rose-900 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><Skull size={100} /></div>
              <h4 className="text-amber-400 text-[10px] font-black uppercase tracking-widest mb-4 italic">Perché succede?</h4>
              <p className="text-sm text-slate-300 leading-relaxed font-medium italic">
                 "Dottore, lei è nel mirino. Chi ha una pensione sopra i 2.500€ lordi viene considerato un 'ricco' da tassare. Lo Stato decide di non proteggere il suo potere d'acquisto per finanziare l'assistenza pubblica."
              </p>
              <div className="mt-6 pt-6 border-t border-white/10 flex justify-between items-center">
                 <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest">Rivalutazione Accordata:</span>
                 <span className="text-xl font-black">{audit.revalRate}%</span>
              </div>
           </div>
        </div>

        {/* GRAFICO E ANALISI COMPARATIVA: PROMESSA VS CONTRATTO */}
        <div className="lg:col-span-8 space-y-8">
           
           <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden">
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic mb-10 flex items-center gap-4 leading-none">
                 <BarChart3 className="text-rose-600" /> La Caduta del Potere d'Acquisto
              </h3>
              
              <div className="h-[350px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={audit.chartData}>
                       <defs>
                          <linearGradient id="colorErosion" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.1}/>
                             <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                       <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
                       <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} tickFormatter={(v) => `€${v/1000}k`} />
                       <Tooltip 
                         contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'}} 
                         formatter={(val: number) => formatCurrency(val)} 
                       />
                       <Area type="monotone" dataKey="potereAcquisto" stroke="#f43f5e" strokeWidth={5} fill="url(#colorErosion)" name="Valore Reale Pensione" />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>

              <div className="mt-8 p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center gap-6">
                 <div className="bg-rose-500 p-4 rounded-2xl text-white shadow-lg"><ShoppingCart size={24} /></div>
                 <div>
                    <p className="text-xs font-black uppercase text-rose-600 mb-1">Cosa significa per lei?</p>
                    <p className="text-sm font-bold text-slate-700 leading-relaxed italic">
                       Tra {horizonYears} anni, con la stessa cifra che riceve oggi, potrà comprare solo l'equivalente di **{formatCurrency(pensionAmount - (audit.totalLoss / (horizonYears * 13)))}** attuali. È un declassamento sociale forzato.
                    </p>
                 </div>
              </div>
           </div>

           {/* IL CONFRONTO DEFINITIVO: PUBBLICO VS PRIVATO */}
           <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden">
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic mb-10 text-center">
                 Pensione Pubblica vs <span className="text-indigo-600 underline decoration-indigo-200">Zurich Multinvest Shield</span>
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                 {/* COLONNA PUBBLICA */}
                 <div className="p-8 bg-rose-50 rounded-[2.5rem] border-2 border-rose-100 flex flex-col justify-between group hover:border-rose-300 transition-all">
                    <div className="space-y-6">
                       <div className="flex justify-between items-center">
                          <CloudRain className="text-rose-600" size={32} />
                          <span className="text-[10px] font-black bg-rose-600 text-white px-3 py-1 rounded-full uppercase italic">Promessa Politica</span>
                       </div>
                       <ul className="space-y-4">
                          <li className="flex gap-3 text-xs font-bold text-rose-900 italic">
                             <AlertCircle size={16} className="shrink-0" /> "Lo Stato può cambiare le leggi sulla rivalutazione ogni anno (e lo fa)."
                          </li>
                          <li className="flex gap-3 text-xs font-bold text-rose-900 italic">
                             <AlertCircle size={16} className="shrink-0" /> "I suoi soldi non sono suoi: sono un credito futuro variabile."
                          </li>
                          <li className="flex gap-3 text-xs font-bold text-rose-900 italic">
                             <AlertCircle size={16} className="shrink-0" /> "Tassazione rendimenti prelevata dallo Stato (quarta progressività)."
                          </li>
                       </ul>
                    </div>
                    <div className="mt-8 pt-6 border-t border-rose-200 text-center">
                       <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest">Esito Futuro</p>
                       <p className="text-xl font-black text-rose-800 uppercase italic">Incertezza Politica</p>
                    </div>
                 </div>

                 {/* COLONNA PRIVATA */}
                 <div className="p-8 bg-indigo-900 rounded-[2.5rem] text-white shadow-2xl flex flex-col justify-between relative overflow-hidden group hover:scale-[1.02] transition-all ring-8 ring-indigo-500/5">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform"><Lock size={120} /></div>
                    <div className="space-y-6 relative z-10">
                       <div className="flex justify-between items-center">
                          <Sun className="text-amber-400" size={32} />
                          <span className="text-[10px] font-black bg-amber-500 text-slate-900 px-3 py-1 rounded-full uppercase italic">Contratto Privato</span>
                       </div>
                       <ul className="space-y-4">
                          <li className="flex gap-3 text-xs font-bold text-indigo-100 italic">
                             <CheckCircle2 size={16} className="text-emerald-400 shrink-0" /> "Art. 1923 c.c.: Il capitale è impignorabile e protetto per legge."
                          </li>
                          <li className="flex gap-3 text-xs font-bold text-indigo-100 italic">
                             <CheckCircle2 size={16} className="text-emerald-400 shrink-0" /> "Il rendimento è legato al mercato, non al bilancio dello Stato."
                          </li>
                          <li className="flex gap-3 text-xs font-bold text-indigo-100 italic">
                             <CheckCircle2 size={16} className="text-emerald-400 shrink-0" /> "Esenzione Imposta Successione (Art. 12 D.Lgs 346/90)."
                          </li>
                       </ul>
                    </div>
                    <div className="mt-8 pt-6 border-t border-white/10 text-center relative z-10">
                       <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest">Esito Futuro</p>
                       <p className="text-xl font-black text-emerald-400 uppercase italic tracking-tighter">Proprietà Blindata</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* FOOTER DI CHIUSURA: L'AZIONABILITÀ */}
      <div className="bg-white p-10 rounded-[4rem] border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-10">
         <div className="flex items-center gap-8">
            <div className="bg-[#0a0f1d] p-6 rounded-full text-white shadow-xl animate-pulse"><ShieldCheck size={48} /></div>
            <div>
               <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic">L'Unico Scudo Possibile</h4>
               <p className="text-sm text-slate-500 font-medium italic">"Dottore, non possiamo cambiare le leggi dello Stato, ma possiamo cambiare dove mette i suoi risparmi."</p>
            </div>
         </div>
         <button onClick={() => window.location.hash = '#FISCAL_CALCULATOR'} className="px-10 py-5 bg-[#0a0f1d] text-white rounded-3xl font-black uppercase tracking-widest hover:bg-rose-600 transition-all shadow-xl group">
            Trasforma il Debito in Patrimonio <ArrowRight size={20} className="inline ml-3 group-hover:translate-x-2 transition-transform" />
         </button>
      </div>

    </div>
  );
};

export default PensionErosionView;
