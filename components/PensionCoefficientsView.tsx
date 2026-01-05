
import React, { useState, useMemo } from 'react';
import { PENSION_COEFFICIENTS } from '../constants';
import { 
  History, TrendingDown, Info, Scale, Gavel, 
  ArrowRight, ShieldAlert, BarChart3, Quote,
  ArrowDownToLine, Zap, CheckCircle2, Siren,
  Microscope, LineChart as ChartIcon, FileSignature,
  Target, Users, Landmark, Clock
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const formatCurrency = (val: number) => 
  new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);

const PensionCoefficientsView: React.FC = () => {
  const [capital, setCapital] = useState<number>(100000);
  const [selectedAge, setSelectedAge] = useState<number>(65);

  const availableAges = [57, 60, 65, 67, 70];

  const analysis = useMemo(() => {
    const ageKey = `v${selectedAge}` as keyof typeof PENSION_COEFFICIENTS.HISTORY[0];
    
    // Preparazione dati per grafico storico con protezione per dati mancanti
    const historicalData = (PENSION_COEFFICIENTS.HISTORY || []).map(h => ({
      period: h.period.replace(' (Dini)', ''),
      coeff: (h[ageKey] as number) || 0,
      annuity: (((h[ageKey] as number) || 0) / 100) * capital
    }));

    if (historicalData.length === 0) return { historicalData: [], dropPct: 0, cashLoss: 0 };

    const firstCoeff = historicalData[0].coeff;
    const lastCoeff = historicalData[historicalData.length - 1].coeff;
    const dropPct = firstCoeff !== 0 ? ((lastCoeff - firstCoeff) / firstCoeff) * 100 : 0;
    const cashLoss = historicalData[0].annuity - historicalData[historicalData.length - 1].annuity;

    return { historicalData, dropPct, cashLoss, firstCoeff, lastCoeff };
  }, [capital, selectedAge]);

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-fade-in pb-24">
      
      {/* HERO SECTION - IL DRAMMA DEMOGRAFICO */}
      <div className="bg-[#0f172a] rounded-[3.5rem] p-12 text-white shadow-2xl relative border-b-8 border-rose-600 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-rose-600/10 to-transparent"></div>
        <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
           <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                 <div className="bg-rose-600 p-3 rounded-2xl shadow-xl shadow-rose-600/20 text-white"><History size={32} /></div>
                 <span className="text-[11px] font-black uppercase tracking-[0.4em] text-rose-400 italic">Audit Demografico - Serie Storica Ministeriale 1996-2025</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
                L'Erosione <br/> <span className="text-rose-500 text-6xl">dei Coefficienti</span>
              </h1>
              <p className="text-slate-400 text-xl font-medium max-w-2xl leading-relaxed">
                "Dottore, lo Stato ricalcola la sua pensione ogni due anni. Poiché la speranza di vita aumenta, i coefficienti diminuiscono: a parità di capitale, riceverà sempre meno rendita."
              </p>
           </div>
           <div className="lg:col-span-4 bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 text-center relative group">
              <p className="text-[10px] font-black uppercase text-rose-400 mb-2 tracking-widest italic">Perdita di Rendimento Storico</p>
              <p className="text-7xl font-black text-white tracking-tighter">{analysis.dropPct.toFixed(1)}%</p>
              <p className="text-[10px] font-black text-rose-300 uppercase mt-4 tracking-widest italic">Dal 1996 ad oggi (Età {selectedAge})</p>
           </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* SIDEBAR INPUTS */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm space-y-8">
             <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 italic">
                <Target size={14} className="text-rose-600" /> Parametri Stress Test
             </h4>
             
             <div className="space-y-6">
                <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100">
                   <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">Montante Ipotezzato (€)</label>
                   <input type="number" value={capital} onChange={(e) => setCapital(Number(e.target.value))} className="w-full bg-transparent font-black text-3xl outline-none text-slate-900 border-b-2 border-slate-200 focus:border-rose-500 transition-all" />
                   <p className="text-[9px] text-slate-400 mt-2 font-bold uppercase">Il capitale accumulato nel fondo pensione</p>
                </div>

                <div className="space-y-4">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Età Pensionamento Target</label>
                   <div className="grid grid-cols-5 gap-2">
                      {availableAges.map(age => (
                        <button key={age} onClick={() => setSelectedAge(age)} className={`py-3 rounded-xl text-xs font-black transition-all ${selectedAge === age ? 'bg-rose-600 text-white shadow-lg' : 'bg-slate-100 text-slate-400'}`}>
                          {age}
                        </button>
                      ))}
                   </div>
                </div>
             </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group border-b-8 border-rose-500">
             <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform"><Scale size={200} /></div>
             <h4 className="text-amber-400 text-[10px] font-black uppercase mb-4 tracking-widest italic flex items-center gap-2"><Siren size={14}/> Allerta Sostenibilità</h4>
             <p className="text-sm text-slate-300 leading-relaxed font-medium italic">
                "Dottore, il sistema contributivo è un'equazione spietata. Se lei vive di più, lo Stato spalma lo stesso capitale su più anni. L'unico modo per non veder scendere la sua rendita è aumentare la 'massa' del capitale oggi."
             </p>
          </div>
        </div>

        {/* RESULTS AREA */}
        <div className="lg:col-span-8 space-y-8">
           
           <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden flex flex-col h-full">
              <div className="flex justify-between items-center mb-12">
                 <div>
                    <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic flex items-center gap-3">
                       <ChartIcon className="text-rose-600" /> Evoluzione Coefficiente (%)
                    </h3>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2 italic">Valore Ministeriale per età {selectedAge}</p>
                 </div>
                 <div className="flex gap-4 text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-2 text-rose-600"><div className="w-2.5 h-2.5 bg-rose-600 rounded-full"></div> % Trasformazione</div>
                 </div>
              </div>
              
              <div className="flex-1 min-h-[400px]">
                 <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={analysis.historicalData}>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                       <XAxis dataKey="period" axisLine={false} tickLine={false} tick={{fontSize: 9, fontWeight: 'bold'}} interval={0} angle={-25} textAnchor="end" height={60} />
                       <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} domain={['auto', 'auto']} unit="%" />
                       <Tooltip contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'}} />
                       <Line type="monotone" dataKey="coeff" stroke="#f43f5e" strokeWidth={5} dot={{ r: 6, fill: '#f43f5e', stroke: '#fff', strokeWidth: 3 }} name="Coefficiente" />
                    </LineChart>
                 </ResponsiveContainer>
              </div>

              <div className="mt-8 p-8 bg-rose-50 rounded-[2.5rem] border border-rose-100 flex flex-col md:flex-row items-center justify-between gap-8">
                 <div className="flex items-center gap-6">
                    <div className="bg-white p-4 rounded-2xl text-rose-600 shadow-sm"><TrendingDown size={32} /></div>
                    <div>
                       <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest mb-1">Perdita di Rendita Annua</p>
                       <p className="text-xl font-bold text-rose-900 italic leading-relaxed">
                          Un montante di {formatCurrency(capital)} rendeva {formatCurrency(analysis.historicalData[0]?.annuity || 0)} nel 1996. Oggi ne rende solo {formatCurrency(analysis.historicalData[analysis.historicalData.length - 1]?.annuity || 0)}.
                       </p>
                    </div>
                 </div>
                 <div className="text-center md:text-right shrink-0">
                    <p className="text-[9px] font-black text-slate-400 uppercase">Gap in Euro:</p>
                    <p className="text-3xl font-black text-rose-600">-{formatCurrency(analysis.cashLoss)}</p>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* FOCUS NORMATIVO: PERCHÉ CAMBIANO? */}
      <div className="grid md:grid-cols-3 gap-8">
         <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-4 group hover:border-[#233D7B] transition-all">
            <div className="bg-blue-50 p-4 rounded-2xl w-fit text-[#233D7B]"><Landmark size={24}/></div>
            <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest">D.M. 01/12/2022</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed font-bold italic">È l'ultimo decreto che ha aggiornato i coefficienti per il triennio 2023-2025. Nonostante un leggero rialzo dovuto all'aumento della mortalità post-Covid, il trend di lungo periodo resta fortemente decrescente.</p>
         </div>
         <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-4 group hover:border-emerald-50 transition-all">
            <div className="bg-emerald-50 p-4 rounded-2xl w-fit text-emerald-600"><Users size={24}/></div>
            <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest">Speranza di Vita ISTAT</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed font-bold italic">La legge prevede l'adeguamento automatico dei coefficienti ogni 2 anni. Più aumenta l'aspettativa di vita a 65 anni, più il coefficiente scende. È la difesa tecnica della stabilità dell'INPS.</p>
         </div>
         <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-4 group hover:border-amber-500 transition-all">
            <div className="bg-amber-50 p-4 rounded-2xl w-fit text-amber-600"><Microscope size={24}/></div>
            <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest">Analisi Gruppo Vomero</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed font-bold italic">La nostra intelligence suggerisce di ipotizzare coefficienti ancora più bassi per chi ha meno di 40 anni oggi. La previdenza complementare è l'unico modo per 'contrattualizzare' un rendimento certo.</p>
         </div>
      </div>

      {/* FOOTER EXECUTIVO */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
         <div className="flex items-center gap-6">
            <div className="bg-[#0f172a] p-4 rounded-[1.5rem] text-white shadow-lg"><FileSignature size={32} /></div>
            <div>
               <p className="text-lg font-black text-slate-800 uppercase tracking-tighter leading-none mb-1">Pension Engineering Audit - Gruppo Vomero</p>
               <p className="text-xs text-slate-500 font-bold italic">Rif: Legge 335/95 | D.L. 201/11 | D.M. 01/12/2022 | Serie Storica ISTAT - INPS | Revisione Febbraio 2025</p>
            </div>
         </div>
      </div>

    </div>
  );
};

export default PensionCoefficientsView;
