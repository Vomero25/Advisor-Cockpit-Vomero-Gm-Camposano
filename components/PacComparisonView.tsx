
import React, { useState, useMemo } from 'react';
import { Repeat, TrendingUp, DollarSign, BarChart3, Info, AlertTriangle, ShieldCheck, PieChart, Rocket, FileText, CheckCircle2, HelpCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const PacComparisonView: React.FC = () => {
  // Input State
  const [annualAmount, setAnnualAmount] = useState<number>(1500); // Default da Documenti (1.500€)
  
  // Costi Caricamento (Entry Fee) - Default da Documenti
  // Nel PDF Zurich il caricamento implicito o esplicito porta la rata investita a 1.455€
  // Nel PDF Anima la rata investita è anch'essa 1.455€.
  // Lasciamo i cursori per permettere al consulente di simulare scenari diversi (es. sconto costi).
  const [zurichLoad, setZurichLoad] = useState<number>(3); 
  const [animaLoad, setAnimaLoad] = useState<number>(0);   

  // --- DATI REALI ESTRATTI DA OCR - DOCUMENTO ZURICH ---
  // Fondo: ZLAP Azione Globale
  // Periodo: 21/07/2006 - 22/07/2025
  const ZURICH_DATA = [
    { year: 2006, nav: 5.00900 },
    { year: 2007, nav: 6.15200 },
    { year: 2008, nav: 4.74200 },
    { year: 2009, nav: 3.85300 },
    { year: 2010, nav: 4.50200 },
    { year: 2011, nav: 4.78800 },
    { year: 2012, nav: 4.88600 },
    { year: 2013, nav: 5.29200 },
    { year: 2014, nav: 5.79500 },
    { year: 2015, nav: 7.24400 },
    { year: 2016, nav: 6.88900 },
    { year: 2017, nav: 7.30800 },
    { year: 2018, nav: 7.74100 },
    { year: 2019, nav: 8.23000 },
    { year: 2020, nav: 8.46100 },
    { year: 2021, nav: 10.29000 },
    { year: 2022, nav: 10.30300 },
    { year: 2023, nav: 10.61600 },
    { year: 2024, nav: 12.29500 },
    { year: 2025, nav: 12.76100 },
  ];

  // --- DATI REALI ESTRATTI DA OCR - DOCUMENTO ANIMA ---
  // Fondo: Arti & Mestieri - Crescita 25+ I
  // Periodo: 21/07/2006 - 22/07/2025
  const ANIMA_DATA = [
    { year: 2006, nav: 10.24800 },
    { year: 2007, nav: 11.51900 },
    { year: 2008, nav: 9.66200 },
    { year: 2009, nav: 8.53700 },
    { year: 2010, nav: 10.02800 },
    { year: 2011, nav: 10.63800 },
    { year: 2012, nav: 11.02900 },
    { year: 2013, nav: 12.24100 },
    { year: 2014, nav: 13.81700 },
    { year: 2015, nav: 16.02400 },
    { year: 2016, nav: 15.31800 },
    { year: 2017, nav: 17.04700 },
    { year: 2018, nav: 18.06900 },
    { year: 2019, nav: 18.27600 },
    { year: 2020, nav: 18.61900 },
    { year: 2021, nav: 22.65400 },
    { year: 2022, nav: 20.83700 },
    { year: 2023, nav: 22.60100 },
    { year: 2024, nav: 25.53700 },
    { year: 2025, nav: 26.91700 },
  ];

  const calculateSimulation = () => {
    let unitsZurich = 0;
    let unitsAnima = 0;
    let totalInvestedNominal = 0;
    
    // Importi Netti Investiti per Rata
    const netInvestZurichStep = annualAmount * (1 - (zurichLoad / 100));
    const netInvestAnimaStep = annualAmount * (1 - (animaLoad / 100));

    // Usiamo ZURICH_DATA come base per l'iterazione (gli anni coincidono)
    const data = ZURICH_DATA.map((zPoint, index) => {
        const aPoint = ANIMA_DATA[index];
        
        totalInvestedNominal += annualAmount;

        // Acquisto Quote (Accumulo)
        const newUnitsZurich = netInvestZurichStep / zPoint.nav;
        const newUnitsAnima = netInvestAnimaStep / aPoint.nav;

        unitsZurich += newUnitsZurich;
        unitsAnima += newUnitsAnima;

        // Valorizzazione Corrente
        const valueZurich = unitsZurich * zPoint.nav;
        const valueAnima = unitsAnima * aPoint.nav;

        return {
            year: zPoint.year,
            navZurich: zPoint.nav,
            navAnima: aPoint.nav,
            invested: totalInvestedNominal,
            zurichVal: Math.round(valueZurich),
            animaVal: Math.round(valueAnima),
            delta: Math.round(valueAnima - valueZurich),
            netInvestedZurich: netInvestZurichStep,
            netInvestedAnima: netInvestAnimaStep
        };
    });

    return data;
  };

  const simulationData = useMemo(() => calculateSimulation(), [annualAmount, zurichLoad, animaLoad]);
  const finalResult = simulationData[simulationData.length - 1];

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <Repeat className="text-emerald-400" size={28} />
            <span className="text-emerald-200 font-bold tracking-wider uppercase">Simulatore PAC Reale</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Backtest Storico: Anima vs Zurich</h1>
          <p className="text-slate-300 max-w-2xl text-lg">
            Simulazione basata sulle <strong>serie storiche esatte (2006-2025)</strong> dei valori quota estratti dai documenti ufficiali.
          </p>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-white opacity-5 transform skew-x-12"></div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Controlli */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
              <TrendingUp size={20} className="text-emerald-600" />
              Parametri PAC
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Versamento Annuo Lordo (€)</label>
                <div className="relative">
                   <input 
                    type="number" 
                    value={annualAmount}
                    onChange={(e) => setAnnualAmount(Number(e.target.value))}
                    className="w-full pl-4 p-3 border border-slate-300 rounded-lg font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none text-lg"
                   />
                </div>
                <input 
                    type="range" min="1000" max="30000" step="100" 
                    value={annualAmount}
                    onChange={(e) => setAnnualAmount(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600 mt-2"
                />
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                 <div className="flex justify-between text-xs text-slate-600 mb-1">
                    <span>Durata Storica:</span>
                    <span className="font-bold">20 Anni</span>
                 </div>
                 <div className="flex justify-between text-xs text-slate-600">
                    <span>Periodo:</span>
                    <span className="font-bold">2006 - 2025</span>
                 </div>
                 <div className="flex justify-between text-xs text-slate-600 mt-1 pt-1 border-t border-slate-200">
                    <span>Totale Versato (Lordo):</span>
                    <span className="font-bold">{formatCurrency(annualAmount * 20)}</span>
                 </div>
              </div>

              <div className="border-t border-slate-100 pt-4 space-y-4">
                 <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-slate-800 flex items-center gap-2">
                        <DollarSign size={16} /> Costi Caricamento
                    </p>
                 </div>
                 
                 <div>
                    <div className="flex justify-between mb-1">
                       <label className="text-xs font-bold text-[#233D7B]">Zurich (ZLAP Azione Globale)</label>
                       <span className="text-xs font-bold text-slate-700">{zurichLoad}%</span>
                    </div>
                    <input 
                      type="range" min="0" max="5" step="0.5" 
                      value={zurichLoad}
                      onChange={(e) => setZurichLoad(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#233D7B]"
                    />
                    <div className="flex justify-between mt-1">
                       <span className="text-[10px] text-slate-400">Investito Netto: {formatCurrency(annualAmount * (1 - zurichLoad/100))}</span>
                    </div>
                 </div>

                 <div>
                    <div className="flex justify-between mb-1">
                       <label className="text-xs font-bold text-red-600">Anima (Crescita 25+ Cl.I)</label>
                       <span className="text-xs font-bold text-slate-700">{animaLoad}%</span>
                    </div>
                    <input 
                      type="range" min="0" max="5" step="0.5" 
                      value={animaLoad}
                      onChange={(e) => setAnimaLoad(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                    />
                    <div className="flex justify-between mt-1">
                       <span className="text-[10px] text-slate-400">Investito Netto: {formatCurrency(annualAmount * (1 - animaLoad/100))}</span>
                    </div>
                 </div>
              </div>
           </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-xs text-blue-900 flex gap-3">
             <FileText size={24} className="flex-shrink-0" />
             <p className="leading-relaxed">
                <strong>Fonte:</strong> Simulatore Analysis versamenti annui a partire dal 21/07/2006.
                <br/>NAV storici reali estratti dalla documentazione ufficiale.
             </p>
          </div>
        </div>

        {/* Grafico e Risultati */}
        <div className="lg:col-span-8 space-y-6">
           
           <div className="grid grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
                 <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Totale Versato</p>
                 <p className="text-xl font-bold text-slate-700">{formatCurrency(finalResult.invested)}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 shadow-sm text-center relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-1">
                    <span className="text-[9px] font-bold bg-blue-200 text-blue-800 px-1 rounded">-{zurichLoad}% Costi</span>
                 </div>
                 <div className="flex items-center justify-center gap-1 mb-1">
                    <Rocket size={12} className="text-[#233D7B]"/>
                    <p className="text-[10px] text-blue-800 uppercase font-bold">Zurich Finale</p>
                 </div>
                 <p className="text-2xl font-bold text-[#233D7B]">{formatCurrency(finalResult.zurichVal)}</p>
                 <p className="text-[10px] font-bold text-green-600">
                    +{formatCurrency(finalResult.zurichVal - finalResult.invested)} ({((finalResult.zurichVal / finalResult.invested - 1) * 100).toFixed(2)}%)
                 </p>
              </div>
              <div className="bg-red-50 p-4 rounded-xl border border-red-100 shadow-sm text-center relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-1">
                    <span className="text-[9px] font-bold bg-red-200 text-red-800 px-1 rounded">-{animaLoad}% Costi</span>
                 </div>
                 <div className="flex items-center justify-center gap-1 mb-1">
                    <PieChart size={12} className="text-red-600"/>
                    <p className="text-[10px] text-red-800 uppercase font-bold">Anima Finale</p>
                 </div>
                 <p className="text-2xl font-bold text-red-600">{formatCurrency(finalResult.animaVal)}</p>
                 <p className="text-[10px] font-bold text-green-600">
                    +{formatCurrency(finalResult.animaVal - finalResult.invested)} ({((finalResult.animaVal / finalResult.invested - 1) * 100).toFixed(2)}%)
                 </p>
              </div>
           </div>

           <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <BarChart3 size={20} className="text-indigo-600" />
                    Crescita del Capitale (Quote Reali)
                 </h3>
                 <div className="flex gap-4 text-xs">
                    <div className="flex items-center gap-1"><div className="w-3 h-3 bg-[#233D7B] rounded-full"></div> Zurich</div>
                    <div className="flex items-center gap-1"><div className="w-3 h-3 bg-red-600 rounded-full"></div> Anima</div>
                    <div className="flex items-center gap-1"><div className="w-3 h-3 bg-slate-300 rounded-full"></div> Versato</div>
                 </div>
              </div>

              <div className="h-[400px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={simulationData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                       <defs>
                          <linearGradient id="colorZurich" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#233D7B" stopOpacity={0.3}/>
                             <stop offset="95%" stopColor="#233D7B" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorAnima" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#dc2626" stopOpacity={0.3}/>
                             <stop offset="95%" stopColor="#dc2626" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                       <XAxis dataKey="year" tick={{fontSize: 10}} interval={2} />
                       <YAxis tickFormatter={(val) => `€ ${(val/1000).toFixed(0)}k`} width={50} tick={{fontSize: 10}} />
                       <Tooltip 
                          formatter={(value: number, name: string) => [formatCurrency(value), name === 'zurichVal' ? 'Zurich' : name === 'animaVal' ? 'Anima' : 'Versato']} 
                          contentStyle={{borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} 
                        />
                       <Area type="monotone" dataKey="zurichVal" name="Zurich ESG" stroke="#233D7B" strokeWidth={2} fill="url(#colorZurich)" />
                       <Area type="monotone" dataKey="animaVal" name="Anima Crescita" stroke="#dc2626" strokeWidth={2} fill="url(#colorAnima)" />
                       <Area type="monotone" dataKey="invested" name="Capitale Versato" stroke="#cbd5e1" strokeWidth={2} fill="none" strokeDasharray="5 5" />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </div>

           {/* Cost Impact Analysis */}
           <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                 <Info size={18} className="text-slate-500" />
                 <h4 className="font-bold text-slate-700">Analisi Differenziale</h4>
              </div>
              <div className="flex justify-between items-center text-sm">
                 <p className="text-slate-600 max-w-lg">
                    Differenza di capitale a scadenza calcolata applicando le commissioni di ingresso ({zurichLoad}% vs {animaLoad}%) al piano di accumulo su serie storiche reali.
                 </p>
                 <span className={`text-lg font-bold px-3 py-1 rounded ${finalResult.delta !== 0 ? 'bg-white shadow-sm border border-slate-200' : ''}`}>
                    {finalResult.delta > 0 ? (
                       <span className="text-red-600">Anima +{formatCurrency(finalResult.delta)}</span>
                    ) : finalResult.delta < 0 ? (
                       <span className="text-[#233D7B]">Zurich +{formatCurrency(Math.abs(finalResult.delta))}</span>
                    ) : (
                       <span className="text-slate-400">Pari</span>
                    )}
                 </span>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
};

export default PacComparisonView;
