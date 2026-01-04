
import React, { useState, useMemo } from 'react';
import { PENSION_COEFFICIENTS, BUDGET_2026_PARAMS } from '../constants';
import { 
  Scale, ShieldCheck, Info, ArrowRight, Settings2, 
  Landmark, TrendingUp, Coins, Percent, Target, Zap, 
  ArrowDownToLine, CheckCircle2, Gavel, Wallet, 
  Sparkles, Timer, ArrowDown, Receipt, Quote, 
  AlertTriangle, FileSignature, Lightbulb, Microscope, 
  LineChart as LineChartIcon, Binary, ChevronDown, ChevronUp,
  MinusCircle, PlusCircle, Equal, UserPlus, ReceiptEuro
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line } from 'recharts';

const formatCurrency = (val: number) => 
  new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);

const FiscalCalculatorView: React.FC = () => {
  // --- STATI INPUT ---
  const [totalPaid, setTotalPaid] = useState<number>(250000); 
  const [nonDeductedAmount, setNonDeductedAmount] = useState<number>(20000); 
  const [ageAtExit, setAgeAtExit] = useState<number>(67);
  const [seniorityInFund, setSeniorityInFund] = useState<number>(35); 
  const [covipLine, setCovipLine] = useState<'AZIONARIO' | 'BILANCIATO' | 'PRUDENTE' | 'GARANTITO'>('AZIONARIO');
  const [marginalTaxRate, setMarginalTaxRate] = useState<number>(33); // Scaglione IRPEF
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(true);

  // --- MOTORE FISCALE AVANZATO (WATERFALL ANALITICA) ---
  const results = useMemo(() => {
    // 1. IPOTESI RENDIMENTO (Basato su storico COVIP)
    const yieldFactor = covipLine === 'AZIONARIO' ? 0.45 : covipLine === 'BILANCIATO' ? 0.25 : 0.10;
    const estimatedReturns = totalPaid * yieldFactor;
    const montanteLordo = totalPaid + estimatedReturns;

    // 2. DEPURA QUOTA ESENTE (Art. 11 D.Lgs 252/05)
    const totalExempt = nonDeductedAmount + estimatedReturns;
    const taxableBasisAmount = Math.max(0, montanteLordo - totalExempt);
    const taxableRatio = taxableBasisAmount / montanteLordo;

    // 3. ALIQUOTA PROGRESSIVA USCITA (15% -> 9%)
    const extraYears = Math.max(0, seniorityInFund - 15);
    const exitTaxRate = Math.max(9, 15 - (extraYears * 0.3));

    // 4. CALCOLO TASSA PROIETTATA E MONTANTE NETTO
    const projectedTotalTax = taxableBasisAmount * (exitTaxRate / 100);
    const montanteNettoTasse = montanteLordo - projectedTotalTax;

    // 5. TRASFORMAZIONE IN RENDITA (D.M. 2022)
    const coeffData = PENSION_COEFFICIENTS.FULL_DM_TABLE_2025.find(c => c.age === ageAtExit) || { age: 67, coeff: 5.723 };
    const transformationCoeff = coeffData.coeff;
    
    const grossAnnuityAnnual = montanteLordo * (transformationCoeff / 100);
    const grossMonthly = grossAnnuityAnnual / 13;
    
    const monthlyTax = (grossMonthly * taxableRatio) * (exitTaxRate / 100);
    const netMonthly = grossMonthly - monthlyTax;

    // 6. CALCOLO EFFICIENZA ACCUMULO (CASHBACK IRPEF 2026)
    const annualDeductionBenefit = BUDGET_2026_PARAMS.DEDUCTIBILITY_LIMIT * (marginalTaxRate / 100);

    // 7. SENSITIVITY DATA
    const sensitivityData = PENSION_COEFFICIENTS.FULL_DM_TABLE_2025.map(c => {
        const gMonthly = (montanteLordo * (c.coeff / 100)) / 13;
        const mTax = (gMonthly * taxableRatio) * (exitTaxRate / 100);
        return { eta: c.age, netto: Math.round(gMonthly - mTax), lordo: Math.round(gMonthly) };
    });

    return {
      montanteLordo,
      estimatedReturns,
      exitTaxRate,
      transformationCoeff,
      grossMonthly,
      netMonthly,
      monthlyTax,
      taxableRatio,
      taxableBasisAmount,
      totalExempt,
      projectedTotalTax,
      montanteNettoTasse,
      annualDeductionBenefit,
      sensitivityData
    };
  }, [totalPaid, nonDeductedAmount, ageAtExit, seniorityInFund, covipLine, marginalTaxRate]);

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-fade-in pb-24">
      
      {/* HEADER EXECUTIVE */}
      <div className="bg-[#0f172a] rounded-[3rem] p-12 text-white shadow-2xl relative border-b-8 border-indigo-600 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-600/10 to-transparent"></div>
        <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
           <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                 <div className="bg-indigo-600 p-3 rounded-2xl shadow-xl"><Binary size={32} /></div>
                 <span className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-400 italic">Audit Fiscale Certificato - Protocollo Art. 11</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
                Ingegneria della <br/> <span className="text-emerald-400">Rendita Netta</span>
              </h1>
              <p className="text-slate-400 text-xl font-medium max-w-2xl leading-relaxed">
                Analisi granulare del prelievo fiscale. Scomponiamo il montante per proteggere la quota esente e massimizzare il netto mensile.
              </p>
           </div>
           <div className="lg:col-span-4 bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 text-center relative group">
              <p className="text-[10px] font-black uppercase text-amber-400 mb-2 tracking-widest italic">Netto Mensile Stimato</p>
              <p className="text-7xl font-black text-white tracking-tighter">{formatCurrency(results.netMonthly)}</p>
              <p className="text-[10px] font-black text-emerald-400 uppercase mt-4 tracking-widest italic">Al netto di imposta sostitutiva {results.exitTaxRate.toFixed(1)}%</p>
           </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* SIDEBAR PARAMETRI */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm space-y-8">
             <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 italic">
                <Settings2 size={14} className="text-indigo-600" /> Input Dati Tecnici
             </h4>
             
             <div className="space-y-6">
                <div className="bg-indigo-900 rounded-3xl p-5 text-white shadow-xl">
                   <label className="text-[10px] font-black uppercase text-indigo-300 block mb-3 tracking-widest">Tua Aliquota IRPEF Marginale</label>
                   <div className="grid grid-cols-3 gap-2">
                      {[23, 33, 43].map(rate => (
                        <button key={rate} onClick={() => setMarginalTaxRate(rate)} className={`py-2 rounded-xl text-xs font-black transition-all ${marginalTaxRate === rate ? 'bg-indigo-500 text-white ring-2 ring-white/50' : 'bg-white/5 text-indigo-300 hover:bg-white/10'}`}>
                          {rate}%
                        </button>
                      ))}
                   </div>
                   <p className="text-[9px] text-indigo-400 mt-3 font-bold italic uppercase">Leva Cashback 2026: {formatCurrency(results.annualDeductionBenefit)}/anno</p>
                </div>

                <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100">
                   <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">Capitale Totale Versato (€)</label>
                   <input type="number" value={totalPaid} onChange={(e) => setTotalPaid(Number(e.target.value))} className="w-full bg-transparent font-black text-2xl outline-none text-slate-900" />
                   <p className="text-[9px] text-slate-400 mt-1 font-bold italic">Somma storica di TFR + Contributi.</p>
                </div>

                <div className="bg-amber-50 p-5 rounded-3xl border border-amber-100">
                   <label className="text-[10px] font-black text-amber-700 uppercase block mb-1">Di cui NON DEDOTTI (€)</label>
                   <input type="number" value={nonDeductedAmount} onChange={(e) => setNonDeductedAmount(Number(e.target.value))} className="w-full bg-transparent font-black text-2xl outline-none text-amber-800" />
                   <p className="text-[9px] text-amber-600 mt-1 font-bold italic uppercase">Quote eccedenti il plafond annuale.</p>
                </div>

                <div className="space-y-3">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Comparto (Ipotesi Rivalutazione)</label>
                   <div className="grid grid-cols-2 gap-2">
                      {(['AZIONARIO', 'BILANCIATO', 'PRUDENTE', 'GARANTITO'] as const).map(line => (
                        <button key={line} onClick={() => setCovipLine(line)} className={`py-2 rounded-xl text-[9px] font-black uppercase transition-all border ${covipLine === line ? 'bg-indigo-600 text-white border-indigo-700 shadow-md' : 'bg-slate-50 text-slate-400 border-slate-200 hover:bg-slate-100'}`}>
                          {line}
                        </button>
                      ))}
                   </div>
                </div>

                <div className="bg-indigo-50 p-5 rounded-3xl border border-indigo-100">
                   <div className="flex justify-between items-center mb-1">
                      <label className="text-[10px] font-black text-indigo-700 uppercase">Età Pensionamento</label>
                      <span className="text-lg font-black text-[#233D7B]">{ageAtExit} Anni</span>
                   </div>
                   <input type="range" min="57" max="71" value={ageAtExit} onChange={(e) => setAgeAtExit(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none accent-[#233D7B]" />
                   <p className="text-[9px] text-indigo-600 font-bold mt-2 flex justify-between uppercase">
                     <span>Coefficiente INPS:</span>
                     <span>{results.transformationCoeff.toFixed(3)}%</span>
                   </p>
                </div>

                <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100">
                   <div className="flex justify-between items-center mb-1">
                      <label className="text-[10px] font-black text-slate-500 uppercase">Anzianità Fondo</label>
                      <span className="text-sm font-black text-slate-900">{seniorityInFund} Anni</span>
                   </div>
                   <input type="range" min="1" max="50" value={seniorityInFund} onChange={(e) => setSeniorityInFund(Number(e.target.value))} className="w-full h-1.5 bg-indigo-200 rounded-lg appearance-none accent-indigo-600" />
                </div>
             </div>
          </div>
        </div>

        {/* AREA WATERFALL CALCOLI */}
        <div className="lg:col-span-8 space-y-8">
           
           {/* BOX: LA WATERFALL MATEMATICA POTENZIATA */}
           <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="flex justify-between items-start mb-10">
                 <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic flex items-center gap-3">
                    <Microscope className="text-indigo-600" /> Breakdown Matematico della Rendita
                 </h3>
                 <button onClick={() => setShowTechnicalDetails(!showTechnicalDetails)} className="text-indigo-600 hover:text-indigo-800 transition-colors">
                    {showTechnicalDetails ? <MinusCircle size={24} /> : <PlusCircle size={24} />}
                 </button>
              </div>

              {showTechnicalDetails && (
                <div className="space-y-8 animate-fade-in">
                   {/* STEP 1: DETERMINAZIONE MONTANTE LORDO */}
                   <div className="grid md:grid-cols-12 gap-6 items-center">
                      <div className="md:col-span-5 p-6 bg-slate-900 rounded-[2rem] text-white">
                         <p className="text-[9px] font-black text-amber-500 uppercase mb-2 tracking-widest">Step 1: Montante Lordo</p>
                         <div className="flex items-end gap-2">
                            <span className="text-3xl font-black">{formatCurrency(results.montanteLordo)}</span>
                            <span className="text-xs text-slate-400 mb-1 italic">pre-tax</span>
                         </div>
                      </div>
                      <div className="md:col-span-1 flex justify-center text-slate-300"><ArrowRight /></div>
                      <div className="md:col-span-6 text-xs text-slate-500 font-medium italic leading-relaxed">
                         Il montante è la somma dei contributi versati ({formatCurrency(totalPaid)}) + la rivalutazione finanziaria stimata (+{formatCurrency(results.estimatedReturns)}).
                      </div>
                   </div>

                   {/* STEP 2: DEPURA QUOTA ESENTE */}
                   <div className="grid md:grid-cols-12 gap-6 items-center">
                      <div className="md:col-span-5 p-6 bg-emerald-50 rounded-[2rem] border-2 border-emerald-500/20">
                         <p className="text-[9px] font-black text-emerald-600 uppercase mb-2 tracking-widest">Step 2: Base Imponibile (Art. 11)</p>
                         <div className="flex items-end gap-2 text-emerald-700">
                            <span className="text-3xl font-black">{formatCurrency(results.taxableBasisAmount)}</span>
                            <span className="text-xs font-bold mb-1 uppercase">Tassabile</span>
                         </div>
                      </div>
                      <div className="md:col-span-1 flex justify-center text-slate-300"><MinusCircle className="text-rose-400" /></div>
                      <div className="md:col-span-6 text-xs text-slate-600 font-bold leading-relaxed italic">
                         **Depurazione:** Non paghi tasse sui rendimenti (già colpiti dal 20% annuale) né sui contributi non dedotti (-{formatCurrency(results.totalExempt)}).
                      </div>
                   </div>

                   {/* STEP 3: MONTANTE NETTO TASSE */}
                   <div className="grid md:grid-cols-12 gap-6 items-center">
                      <div className="md:col-span-5 p-6 bg-rose-950 rounded-[2rem] text-white ring-4 ring-rose-500/20">
                         <p className="text-[9px] font-black text-rose-400 uppercase mb-2 tracking-widest">Step 3: Montante Netto Tasse</p>
                         <div className="flex items-end gap-2 text-white">
                            <span className="text-3xl font-black">{formatCurrency(results.montanteNettoTasse)}</span>
                            <span className="text-xs font-bold mb-1 uppercase italic">Liquidabile</span>
                         </div>
                         <p className="text-[9px] text-rose-300 mt-2 font-black uppercase">Prelievo Fiscale Totale: {formatCurrency(results.projectedTotalTax)} ({results.exitTaxRate.toFixed(1)}%)</p>
                      </div>
                      <div className="md:col-span-1 flex justify-center text-slate-300"><Equal /></div>
                      <div className="md:col-span-6 text-xs text-slate-500 font-medium leading-relaxed italic">
                         Questo è il **Capitale Reale** di cui lei è proprietario al 100% dopo aver regolato i conti con lo Stato. Su questa base si calcola la sua rendita mensile.
                      </div>
                   </div>

                   {/* STEP 4: CALCOLO FINALE RENDITA NETTA */}
                   <div className="p-8 bg-emerald-600 rounded-[2.5rem] text-white shadow-xl flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-10"><Zap size={150} /></div>
                      <div className="space-y-2">
                         <h4 className="text-xl font-black uppercase italic tracking-tighter text-emerald-100">Rendita Netta in Tasca</h4>
                         <p className="text-sm opacity-80 font-medium italic">Applicazione coefficiente INPS {results.transformationCoeff.toFixed(3)}% sul netto.</p>
                      </div>
                      <div className="text-center md:text-right">
                         <p className="text-6xl font-black tracking-tighter">{formatCurrency(results.netMonthly)}</p>
                         <p className="text-[10px] font-black text-emerald-200 uppercase tracking-widest">Mensili (x13)</p>
                      </div>
                   </div>
                </div>
              )}
           </div>

           {/* BOX RENDIMENTI FISCALI CONFRONTO */}
           <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform"><ReceiptEuro size={150} /></div>
                 <h4 className="text-amber-500 text-[10px] font-black uppercase mb-6 tracking-widest italic">Leva Accumulo: Cashback IRPEF 2026</h4>
                 <p className="text-lg font-medium leading-relaxed italic mb-6">
                    "Dottore, versando i {formatCurrency(BUDGET_2026_PARAMS.DEDUCTIBILITY_LIMIT)} oggi lei recupera immediatamente il **{marginalTaxRate}%** (pari a **{formatCurrency(results.annualDeductionBenefit)}**). Lo Stato sta finanziando la sua pensione per quasi la metà."
                 </p>
                 <div className="p-4 bg-white/10 rounded-2xl border border-white/20">
                    <p className="text-[9px] font-black text-amber-500 uppercase mb-1">Efficienza Netta Versamento:</p>
                    <p className="text-xl font-black">Costo Reale: {formatCurrency(BUDGET_2026_PARAMS.DEDUCTIBILITY_LIMIT - results.annualDeductionBenefit)}</p>
                 </div>
              </div>
              <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col justify-center text-center">
                 <p className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest">Efficienza Prelievo Finale (Netto/Lordo)</p>
                 <p className="text-7xl font-black text-indigo-600">{( (results.netMonthly / results.grossMonthly) * 100 ).toFixed(1)}%</p>
                 <div className="mt-6 flex justify-center gap-2">
                    <span className="bg-emerald-100 text-emerald-700 text-[9px] font-black px-3 py-1 rounded-full uppercase">Pressione: {( (results.monthlyTax / results.grossMonthly) * 100 ).toFixed(1)}%</span>
                 </div>
              </div>
           </div>

           {/* GRAFICO SENSITIVITÀ */}
           <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic mb-10 flex items-center gap-3">
                 <LineChartIcon className="text-indigo-600" /> Curve di Rendimento per Età
              </h3>
              <div className="h-[350px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={results.sensitivityData}>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                       <XAxis dataKey="eta" tick={{fontSize: 10, fontWeight: '900'}} axisLine={false} tickLine={false} />
                       <YAxis tickFormatter={(v) => `€${v}`} tick={{fontSize: 10}} axisLine={false} tickLine={false} />
                       <Tooltip contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'}} formatter={(v: number) => formatCurrency(v)} />
                       <Line type="monotone" dataKey="netto" name="Rendita Netta" stroke="#10b981" strokeWidth={5} dot={{ r: 4, fill: '#10b981', stroke: '#fff', strokeWidth: 2 }} />
                       <Line type="monotone" dataKey="lordo" name="Rendita Lorda" stroke="#cbd5e1" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                    </LineChart>
                 </ResponsiveContainer>
              </div>
           </div>
        </div>
      </div>

      {/* FOOTER METODOLOGICO */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
         <div className="flex items-center gap-6">
            <div className="bg-[#0f172a] p-4 rounded-[1.5rem] text-white shadow-lg"><FileSignature size={32} /></div>
            <div>
               <p className="text-lg font-black text-slate-800 uppercase tracking-tighter leading-none mb-1">Fiscal Intelligence Data Book</p>
               <p className="text-xs text-slate-500 font-bold italic">Base Calcolo: Art. 11 D.Lgs 252/05 | Coefficienti D.M. 01/12/2022 | Revisione Gruppo Vomero 2025</p>
            </div>
         </div>
      </div>

    </div>
  );
};

export default FiscalCalculatorView;
