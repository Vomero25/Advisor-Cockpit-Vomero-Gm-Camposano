
import React, { useState, useMemo } from 'react';
import { 
  ArrowUpRight, Calculator, CheckCircle2, TrendingUp, 
  Info, ShieldCheck, PieChart, Landmark, Scale,
  Zap, Percent, BarChart3, Binary, ArrowRightLeft,
  Coins, MinusCircle, FileSignature, AlertTriangle
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const formatCurrency = (val: number) => 
  new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);

const FiscalArbitrageView: React.FC = () => {
  const [initialCapital, setInitialCapital] = useState<number>(50000);
  const [annualContribution, setAnnualContribution] = useState<number>(5164);
  const [expectedReturn, setExpectedReturn] = useState<number>(6.0);
  const [govBondPct, setGovBondPct] = useState<number>(40); // 12.5% taxation portion
  const [years, setYears] = useState<number>(25);

  const analysis = useMemo(() => {
    let bankWealth = initialCapital;
    let fundWealth = initialCapital;
    const data = [];

    // Tassazione Media Fondo: (GovBond% * 12.5) + (Resto% * 20)
    const fundTaxRate = ((govBondPct / 100) * 0.125) + (((100 - govBondPct) / 100) * 0.20);
    const bankTaxRate = 0.26;
    const bankStampDuty = 0.0020; // 0.2% Bollo

    for (let i = 0; i <= years; i++) {
      data.push({
        year: `An. ${i}`,
        banca: Math.round(bankWealth),
        fondo: Math.round(fundWealth),
        gap: Math.round(fundWealth - bankWealth)
      });

      // Calcolo Bancario (26% Tax + Bollo)
      const bankGrossReturn = bankWealth * (expectedReturn / 100);
      const bankNetReturn = bankGrossReturn * (1 - bankTaxRate);
      bankWealth = (bankWealth + bankNetReturn + annualContribution) * (1 - bankStampDuty);

      // Calcolo Fondo (Weighted Tax - No Bollo)
      const fundGrossReturn = fundWealth * (expectedReturn / 100);
      const fundNetReturn = fundGrossReturn * (1 - fundTaxRate);
      fundWealth = fundWealth + fundNetReturn + annualContribution;
    }

    const finalGap = fundWealth - bankWealth;
    const taxSavingPct = (finalGap / initialCapital) * 100;

    return { data, finalGap, fundTaxRate, taxSavingPct };
  }, [initialCapital, annualContribution, expectedReturn, govBondPct, years]);

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-fade-in pb-24">
      {/* Header */}
      <div className="bg-[#0f172a] rounded-[3.5rem] p-12 text-white shadow-2xl relative overflow-hidden border-b-8 border-indigo-600">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-600/10 to-transparent"></div>
        <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
           <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                 <div className="bg-indigo-600 p-3 rounded-2xl shadow-xl"><ArrowUpRight size={32} /></div>
                 <span className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-400 italic">Financial Arbitrage Audit v2.0</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
                Leva Fiscale <br/> <span className="text-indigo-400">sui Rendimenti</span>
              </h1>
              <p className="text-slate-400 text-xl font-medium max-w-2xl leading-relaxed">
                "Dottore, il risparmio non si fa solo comprando bene, ma **evitando di regalare rendimenti allo Stato**. La previdenza le permette di trattenere fino al 52% di tasse in più rispetto alla banca."
              </p>
           </div>
           <div className="lg:col-span-4 bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 text-center relative group">
              <p className="text-[10px] font-black uppercase text-amber-400 mb-2 tracking-widest italic">Vantaggio Matematico Netto</p>
              <p className="text-6xl font-black text-white tracking-tighter">{formatCurrency(analysis.finalGap)}</p>
              <p className="text-[10px] font-black text-emerald-400 uppercase mt-4 tracking-widest italic">Capitale salvato dalle tasse</p>
           </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Sidebar Inputs */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm space-y-8">
             <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 italic">
                <Calculator size={14} className="text-indigo-600" /> Parametri di Proiezione
             </h4>
             <div className="space-y-6">
                <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100">
                   <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">Capitale Iniziale (€)</label>
                   <input type="number" value={initialCapital} onChange={(e) => setInitialCapital(Number(e.target.value))} className="w-full bg-transparent font-black text-2xl outline-none text-slate-900" />
                </div>
                <div className="bg-indigo-50 p-5 rounded-3xl border border-indigo-100">
                   <label className="text-[10px] font-black text-indigo-700 uppercase block mb-1">Versamento Annuo (€)</label>
                   <input type="number" value={annualContribution} onChange={(e) => setAnnualContribution(Number(e.target.value))} className="w-full bg-transparent font-black text-2xl outline-none text-indigo-900" />
                </div>
                <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100">
                   <div className="flex justify-between mb-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase">Rendimento Lordo Annuo</label>
                      <span className="font-black text-indigo-600">{expectedReturn}%</span>
                   </div>
                   <input type="range" min="1" max="12" step="0.5" value={expectedReturn} onChange={(e) => setExpectedReturn(Number(e.target.value))} className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none accent-indigo-600" />
                </div>
                <div className="bg-emerald-50 p-5 rounded-3xl border border-emerald-100">
                   <div className="flex justify-between mb-2">
                      <label className="text-[10px] font-black text-emerald-700 uppercase">Quota Titoli di Stato (12.5%)</label>
                      <span className="font-black text-emerald-800">{govBondPct}%</span>
                   </div>
                   <input type="range" min="0" max="100" step="5" value={govBondPct} onChange={(e) => setGovBondPct(Number(e.target.value))} className="w-full h-1.5 bg-emerald-200 rounded-lg appearance-none accent-emerald-600" />
                   <p className="text-[9px] text-emerald-600 font-bold uppercase mt-2 italic">Aliquota Media Fondo: {(analysis.fundTaxRate * 100).toFixed(2)}%</p>
                </div>
             </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group border-b-8 border-indigo-600">
             <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform"><Scale size={200} /></div>
             <h4 className="text-indigo-400 text-[10px] font-black uppercase mb-4 tracking-widest italic flex items-center gap-2"><PieChart size={14}/> Arbitraggio Normativo</h4>
             <p className="text-sm text-slate-400 leading-relaxed font-medium italic relative z-10">
                "In banca lei paga il 26% di tasse ogni anno e lo 0,20% di bollo. Nel fondo pensione il bollo è **zero** e le tasse sono ridotte. Questo differenziale, composto nel tempo, crea un capitale extra senza alcun rischio aggiuntivo."
             </p>
          </div>
        </div>

        {/* Chart Area */}
        <div className="lg:col-span-8 space-y-8">
           <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden flex flex-col h-full">
              <div className="flex justify-between items-center mb-10">
                 <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic flex items-center gap-3"><TrendingUp className="text-indigo-600" /> Area di Efficienza Fiscale</h3>
                 <div className="flex gap-4 text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-2 text-indigo-600"><div className="w-2.5 h-2.5 bg-indigo-600 rounded-full"></div> Fondo Pensione</div>
                    <div className="flex items-center gap-2 text-slate-400"><div className="w-2.5 h-2.5 bg-slate-400 rounded-full"></div> Risparmio Bancario</div>
                 </div>
              </div>
              
              <div className="flex-1 min-h-[450px]">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={analysis.data}>
                       <defs>
                          <linearGradient id="colorFondo" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/><stop offset="95%" stopColor="#6366f1" stopOpacity={0}/></linearGradient>
                       </defs>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                       <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
                       <YAxis tickFormatter={(v) => `€${(v/1000).toFixed(0)}k`} axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                       <Tooltip contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'}} />
                       <Area type="monotone" dataKey="fondo" stroke="#6366f1" strokeWidth={5} fill="url(#colorFondo)" name="Capitale Fondo Pensione" />
                       <Area type="monotone" dataKey="banca" stroke="#94a3b8" strokeWidth={2} fill="none" name="Capitale Bancario" strokeDasharray="5 5" />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>

              <div className="mt-8 grid md:grid-cols-2 gap-6">
                 <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 flex items-center gap-5">
                    <div className="bg-emerald-500 p-3 rounded-2xl text-white shadow-lg"><Zap size={24} /></div>
                    <div>
                       <p className="text-[10px] font-black text-emerald-600 uppercase mb-1">Guadagno Fiscale Totale</p>
                       <p className="text-2xl font-black text-emerald-800">{formatCurrency(analysis.finalGap)}</p>
                    </div>
                 </div>
                 <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100 flex items-center gap-5">
                    <div className="bg-amber-500 p-3 rounded-2xl text-white shadow-lg"><MinusCircle size={24} /></div>
                    <div>
                       <p className="text-[10px] font-black text-amber-600 uppercase mb-1">Imposta di Bollo Evitata</p>
                       <p className="text-2xl font-black text-amber-800">ESENTE</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Footer Metodologico */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
         <div className="flex items-center gap-6">
            <div className="bg-[#0f172a] p-4 rounded-[1.5rem] text-white shadow-lg"><FileSignature size={32} /></div>
            <div>
               <p className="text-lg font-black text-slate-800 uppercase tracking-tighter leading-none mb-1">Fiscal Returns Engineering Audit 2025</p>
               <p className="text-xs text-slate-500 font-bold italic">Rif: Art. 11 D.Lgs 252/05 | L. 201/2011 (Bollo) | Arbitraggio 20% vs 26% | Revisione Gruppo Vomero</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default FiscalArbitrageView;
