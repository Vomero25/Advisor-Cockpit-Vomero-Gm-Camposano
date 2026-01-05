
import React, { useState, useMemo } from 'react';
import { 
  Calculator, TrendingUp, ShieldAlert, Target, Zap, 
  ArrowRight, CheckCircle2, Info, TrendingDown,
  Activity, Percent, Banknote, Scale, ShieldCheck,
  Handshake, AlertCircle, Rocket, Shield, BarChart3,
  Calendar, Clock, Gavel, Landmark, 
  ChevronRight, ArrowDownToLine, Lock, UserCheck,
  Siren, Flame, MinusCircle, PlusCircle, Quote,
  ShieldPlus, FileSignature, AlertOctagon, Skull
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Line } from 'recharts';

const formatCurrency = (val: number) => 
  new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);

const SimulatorView: React.FC = () => {
  // --- PARAMETRI DI INPUT ---
  const [ral, setRal] = useState<number>(35000); 
  const [currentSavings, setCurrentSavings] = useState<number>(15000); // TFR già maturato
  const [years, setYears] = useState<number>(25);
  const [inflationRate, setInflationRate] = useState<number>(2.5); 
  const [employerContribPct, setEmployerContribPct] = useState<number>(1.5);
  const [selectedProduct, setSelectedProduct] = useState<'ZURICH' | 'ANIMA'>('ZURICH');
  
  // --- RENDIMENTI CERTIFICATI (Media 10Y COVIP 2024) ---
  const CERTIFIED_RETURNS = {
    ZURICH: 0.0643, // Zurich Pension ESG Azionario: 6,43%
    ANIMA: 0.0600,  // Anima Arti & Mestieri Crescita 25+: 6,00%
  };

  // --- MOTORE DI CALCOLO CERTIFICATO ---
  const projectionData = useMemo(() => {
    let companyTfrLordo = currentSavings;
    let fundTfrLordo = currentSavings;
    const data = [];
    
    const annualTfrAccrual = ral / 13.5;
    const annualEmployerGift = ral * (employerContribPct / 100);
    
    // Tassazione Media TFR in Azienda (Aliquota media IRPEF stimata)
    const taxRateAzienda = 0.25;

    for (let i = 0; i <= years; i++) {
      // 1. CALCOLO TFR IN AZIENDA (L. 297/82)
      // Rivalutazione: 1.5% + 75% Inflazione
      const tfrRevalRate = 0.015 + (0.75 * (inflationRate / 100));
      if (i > 0) {
        companyTfrLordo = (companyTfrLordo * (1 + tfrRevalRate)) + annualTfrAccrual;
      }
      const nettoAzienda = companyTfrLordo * (1 - taxRateAzienda);

      // 2. CALCOLO FONDO PENSIONE (RENDIMENTO NETTO SOSTITUTIVA)
      const grossReturn = selectedProduct === 'ZURICH' ? CERTIFIED_RETURNS.ZURICH : CERTIFIED_RETURNS.ANIMA;
      // Imposta sostitutiva sui rendimenti (20% fisso, 12.5% su Titoli di Stato - usiamo media 18%)
      const netReturnFactor = grossReturn * (1 - 0.18); 
      
      if (i > 0) {
        fundTfrLordo = (fundTfrLordo * (1 + netReturnFactor)) + annualTfrAccrual + annualEmployerGift;
      }
      
      // Tassazione Agevolata Uscita: 15% -> 9% (scende 0.3% ogni anno dopo il 15esimo)
      const seniorityBonus = Math.max(0, i - 15);
      const taxRateFondo = Math.max(0.09, 0.15 - (seniorityBonus * 0.003));
      const nettoFondo = fundTfrLordo * (1 - taxRateFondo);

      data.push({
        year: `An. ${i}`,
        azienda: Math.round(nettoAzienda),
        fondo: Math.round(nettoFondo),
        gap: Math.round(nettoFondo - nettoAzienda)
      });
    }
    return data;
  }, [ral, currentSavings, years, inflationRate, employerContribPct, selectedProduct]);

  const finalPoint = projectionData[projectionData.length - 1];

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-fade-in pb-24">
      
      {/* HERO - IL DILEMMA DEL TFR */}
      <div className="bg-[#0a0f1d] rounded-[3.5rem] p-12 text-white shadow-2xl relative overflow-hidden border-b-8 border-indigo-600">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-600/10 to-transparent"></div>
        <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
           <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                 <div className="bg-indigo-600 p-3 rounded-2xl shadow-xl shadow-indigo-600/20"><Scale size={32} /></div>
                 <span className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-400 italic">Audit TFR Certificato - Gruppo Vomero Strategy</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
                Risparmio o <br/> <span className="text-indigo-400">Proprietà?</span>
              </h1>
              <p className="text-slate-400 text-xl font-medium max-w-2xl leading-relaxed">
                "Dottore, il TFR in azienda è un **debito chirografario** di un privato. Nel fondo è la sua **Proprietà Privata Blindata** che cresce con i rendimenti di mercato."
              </p>
           </div>
           <div className="lg:col-span-4 bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 text-center">
              <p className="text-[10px] font-black uppercase text-amber-500 mb-2 tracking-widest italic">Wealth Gap Netto</p>
              <p className="text-6xl font-black text-emerald-400 tracking-tighter">+{formatCurrency(finalPoint.gap)}</p>
              <p className="text-[10px] font-black text-indigo-300 uppercase mt-4 tracking-widest italic">Capitale extra creato nel Fondo</p>
           </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* SIDEBAR PARAMETRI CERTIFICATI */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm space-y-8">
             <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Calculator size={14} className="text-indigo-600" /> Driver di Calcolo
             </h4>
             
             <div className="space-y-6">
                <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100">
                   <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">RAL Lorda Annua (€)</label>
                   <input type="number" value={ral} onChange={(e) => setRal(Number(e.target.value))} className="w-full bg-transparent font-black text-3xl outline-none text-slate-900" />
                   <p className="text-[9px] text-slate-400 mt-1 italic uppercase">Accantonamento TFR annuo: {formatCurrency(ral/13.5)}</p>
                </div>

                <div className="space-y-3">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Comparto Certificato (Azionario)</label>
                   <div className="grid grid-cols-2 gap-2">
                      <button onClick={() => setSelectedProduct('ZURICH')} className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${selectedProduct === 'ZURICH' ? 'border-indigo-600 bg-indigo-50 shadow-md' : 'border-slate-100 hover:bg-slate-50'}`}>
                         <span className="text-[10px] font-black uppercase text-indigo-900 leading-tight">Zurich Spazio <br/>(Azionario ESG)</span>
                         <span className="text-[12px] font-black text-indigo-600">6,43%</span>
                      </button>
                      <button onClick={() => setSelectedProduct('ANIMA')} className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${selectedProduct === 'ANIMA' ? 'border-red-600 bg-red-50 shadow-md' : 'border-slate-100 hover:bg-slate-50'}`}>
                         <span className="text-[10px] font-black uppercase text-red-900 leading-tight">Anima Arti <br/>(Crescita 25+)</span>
                         <span className="text-[12px] font-black text-red-600">6,00%</span>
                      </button>
                   </div>
                </div>

                <div className="bg-amber-50 p-5 rounded-3xl border border-amber-100">
                   <div className="flex justify-between items-center mb-1">
                      <label className="text-[10px] font-black text-amber-700 uppercase italic">Inflazione Target ({inflationRate}%)</label>
                   </div>
                   <input type="range" min="0" max="6" step="0.5" value={inflationRate} onChange={(e) => setInflationRate(Number(e.target.value))} className="w-full h-1.5 bg-amber-200 rounded-lg appearance-none accent-amber-600" />
                   <p className="text-[9px] text-amber-600 font-bold mt-2 italic uppercase">Rivalutazione TFR L. 297/82: {(0.015 + 0.75 * (inflationRate/100) * 100).toFixed(2)}%</p>
                </div>

                <div className="bg-emerald-50 p-5 rounded-3xl border border-emerald-100">
                   <div className="flex justify-between items-center mb-1">
                      <label className="text-[10px] font-black text-emerald-700 uppercase italic">Aumento CCNL ({employerContribPct}%)</label>
                   </div>
                   <input type="range" min="1" max="3" step="0.1" value={employerContribPct} onChange={(e) => setEmployerContribPct(Number(e.target.value))} className="w-full h-1.5 bg-emerald-200 rounded-lg appearance-none accent-emerald-600" />
                   <p className="text-[9px] text-emerald-600 font-bold uppercase mt-2 italic">Contributo Datoriale: {formatCurrency(ral * (employerContribPct/100))}</p>
                </div>
             </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group border-b-8 border-emerald-500">
             <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform"><ShieldCheck size={200} /></div>
             <h4 className="text-emerald-400 text-[10px] font-black uppercase mb-4 tracking-widest italic flex items-center gap-2"><Lock size={14}/> Scudo Legale Art. 1923</h4>
             <p className="text-sm text-slate-300 leading-relaxed font-medium italic">
                "Dottore, il TFR in azienda è pignorabile. Nel fondo è **impignorabile** e **insequestrabile** per legge. Non stiamo solo investendo, stiamo blindando il capitale dai creditori."
              </p>
          </div>
        </div>

        {/* GRAFICO WEALTH GAP */}
        <div className="lg:col-span-8 space-y-8">
           
           <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col relative overflow-hidden h-[550px]">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 relative z-10">
                 <div>
                    <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">Wealth Accumulation Gap</h3>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2">Dati Certificati Netti (COVIP + L. 297/82)</p>
                 </div>
                 <div className="flex gap-4 text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-2 text-indigo-600"><div className="w-2.5 h-2.5 bg-indigo-600 rounded-full"></div> Fondo Pensione Netto</div>
                    <div className="flex items-center gap-2 text-slate-400"><div className="w-2.5 h-2.5 bg-slate-400 rounded-full"></div> TFR Azienda Netto</div>
                 </div>
              </div>

              <div className="flex-1 min-h-[400px]">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={projectionData}>
                       <defs>
                          <linearGradient id="colorFondo" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                             <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                       <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
                       <YAxis tickFormatter={(v) => `€${(v/1000).toFixed(0)}k`} axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                       <Tooltip 
                         contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'}} 
                         formatter={(val: number) => formatCurrency(val)}
                       />
                       <Area type="monotone" dataKey="fondo" stroke="#6366f1" strokeWidth={5} fill="url(#colorFondo)" name="Capitale Netto Fondo" />
                       <Area type="monotone" dataKey="azienda" stroke="#94a3b8" strokeWidth={2} fill="none" name="Capitale Netto Azienda" strokeDasharray="5 5" />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>

              <div className="mt-8 p-6 bg-indigo-50 rounded-3xl border border-indigo-100 flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <div className="bg-indigo-600 p-3 rounded-2xl text-white shadow-lg"><Zap size={24}/></div>
                    <div>
                       <p className="text-xs font-black text-indigo-900 uppercase tracking-tighter">Arbitraggio Fiscale & Mercato</p>
                       <p className="text-[11px] text-indigo-700 font-bold italic">La combinazione di rendimenti azionari e tassazione al 9% genera un plusvalore di <strong>{formatCurrency(finalPoint.gap)}</strong>.</p>
                    </div>
                 </div>
              </div>
           </div>

           {/* AUDIT DEI RISCHI: CHIROGRAFARIO VS PROPRIETÀ */}
           <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm space-y-6 group">
                 <div className="flex items-center gap-3">
                    <div className="p-3 bg-rose-50 rounded-2xl text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-all"><Siren size={24} /></div>
                    <h4 className="text-xl font-black text-slate-900 uppercase italic">TFR in Azienda (Rischi Legali)</h4>
                 </div>
                 <ul className="space-y-4">
                    <li className="flex gap-4">
                       <AlertOctagon size={18} className="text-rose-400 shrink-0" />
                       <div>
                          <p className="text-xs font-black text-slate-800 uppercase">Credito Chirografario (Art. 2776 c.c.)</p>
                          <p className="text-[11px] text-slate-500 font-medium italic">In caso di fallimento aziendale, lei è un creditore semplice. Se l'azienda non ha liquidità, il suo TFR sparisce.</p>
                       </div>
                    </li>
                    <li className="flex gap-4">
                       <AlertOctagon size={18} className="text-rose-400 shrink-0" />
                       <div>
                          <p className="text-xs font-black text-slate-800 uppercase">Pieno Rischio Impresa</p>
                          <p className="text-[11px] text-slate-500 font-medium italic">Il suo capitale è investito al 100% nel 'business' del suo datore di lavoro. Zero diversificazione.</p>
                       </div>
                    </li>
                    <li className="flex gap-4">
                       <AlertOctagon size={18} className="text-rose-400 shrink-0" />
                       <div>
                          <p className="text-xs font-black text-slate-800 uppercase">Pignorabilità Totale</p>
                          <p className="text-[11px] text-slate-500 font-medium italic">Il credito TFR può essere pignorato da terzi creditori in qualsiasi momento (es. banche, fisco).</p>
                       </div>
                    </li>
                 </ul>
              </div>

              <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm space-y-6 group">
                 <div className="flex items-center gap-3">
                    <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all"><ShieldPlus size={24} /></div>
                    <h4 className="text-xl font-black text-slate-900 uppercase italic">Fondo Pensione (Certificazioni)</h4>
                 </div>
                 <ul className="space-y-4">
                    <li className="flex gap-4">
                       <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                       <div>
                          <p className="text-xs font-black text-slate-800 uppercase">Patrimonio Segregato (Art. 2117 c.c.)</p>
                          <p className="text-[11px] text-slate-500 font-medium italic">Il capitale esce dal bilancio aziendale. Anche se l'azienda fallisce, il suo fondo è intatto e suo al 100%.</p>
                       </div>
                    </li>
                    <li className="flex gap-4">
                       <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                       <div>
                          <p className="text-xs font-black text-slate-800 uppercase">Scudo Inattaccabile (Art. 1923 c.c.)</p>
                          <p className="text-[11px] text-slate-500 font-medium italic">Somme impignorabili e insequestrabili per legge. È l'unico asset 'invisibile' ai creditori.</p>
                       </div>
                    </li>
                    <li className="flex gap-4">
                       <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                       <div>
                          <p className="text-xs font-black text-slate-800 uppercase">Tassazione 'Certificata' al 9%</p>
                          <p className="text-[11px] text-slate-500 font-medium italic">L'unica via legale in Italia per tassare un reddito da capitale solo al 9% (D.Lgs 252/05).</p>
                       </div>
                    </li>
                 </ul>
              </div>
           </div>

           {/* SALES SCRIPT: LA METAFORA DEL PRESTITO */}
           <div className="bg-slate-900 p-10 rounded-[3rem] text-white flex items-start gap-8 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-4 opacity-5"><Quote size={200} /></div>
              <div className="bg-amber-500 p-4 rounded-3xl text-slate-900 shadow-xl shrink-0"><Banknote size={32} /></div>
              <div>
                 <h4 className="text-xl font-black text-amber-500 uppercase tracking-tighter italic mb-4">Lo Script di Chiusura</h4>
                 <p className="text-lg font-medium leading-relaxed italic opacity-90">
                    "Signor Cliente, lasciare il TFR in azienda è come prestare i suoi risparmi a un privato senza garanzie e con un interesse misero. Metterlo nel fondo significa metterlo in una cassaforte svizzera di cui solo lei ha la chiave, con un rendimento triplo e tasse dimezzate. Quale banconota preferisce avere tra 20 anni?"
                 </p>
              </div>
           </div>
        </div>
      </div>

      {/* FOOTER METODOLOGICO */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
         <div className="flex items-center gap-6">
            <div className="bg-[#0f172a] p-4 rounded-[1.5rem] text-white shadow-lg"><FileSignature size={32} /></div>
            <div>
               <p className="text-lg font-black text-slate-800 uppercase tracking-tighter leading-none mb-1">TFR Strategy Analytics 2025</p>
               <p className="text-xs text-slate-500 font-bold italic">Rif: Art. 2117 c.c. | L. 297/82 | Serie Storica Zurich ESG (6,43%) - Anima (6,00%) | Revisione Gruppo Vomero</p>
            </div>
         </div>
      </div>

    </div>
  );
};

export default SimulatorView;
