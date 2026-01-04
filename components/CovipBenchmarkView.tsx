
import React, { useState } from 'react';
import { 
  BarChart3, TrendingUp, Info, ShieldCheck, 
  CheckCircle2, ArrowRightLeft, FileSearch, 
  TrendingDown, Coins, Landmark, AlertTriangle, 
  ArrowRight, ShieldAlert, Scale, Users, 
  MousePointer2, Zap, Target, History, Lock,
  Handshake, ZapOff, Sparkles, Gavel, Umbrella,
  Layers, Package
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell, PieChart as RePie, Pie } from 'recharts';

const CovipBenchmarkView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'COSTI' | 'RENDIMENTI' | 'STRATEGIA'>('STRATEGIA');
  const [compareZurich, setCompareZurich] = useState(true);
  const [compareAnima, setCompareAnima] = useState(true);

  // --- DATI ISC MEDI UFFICIALI RELAZIONE COVIP 2024 ---
  const ISC_DATA = [
    { name: 'Fondi Negoziali (Media)', y2: 1.09, y5: 0.62, y10: 0.47, y35: 0.28 },
    { name: 'Fondi Aperti (Media)', y2: 2.27, y5: 1.54, y10: 1.36, y35: 1.21 },
    { name: 'PIP "Nuovi" (Media)', y2: 3.75, y5: 2.58, y10: 2.18, y35: 1.84 },
  ];

  // --- DATI PRODOTTI SPECIFICI (Classe I per Anima, ESG Azionario per Zurich) ---
  const PRODUCT_COSTS = [
    { name: 'ZURICH Spazio Previdenza (ESG Az.)', y2: 2.45, y5: 2.25, y10: 2.10, y35: 1.65 },
    { name: 'ANIMA Arti & Mestieri (Crescita - Cl. I)', y2: 1.95, y5: 1.55, y10: 1.35, y35: 1.10 }
  ];

  // --- RENDIMENTI NETTI MEDI 10Y (Media 2014-2023) ---
  const RETURNS_DATA = [
    { type: 'Azionari', negoziali: 4.4, aperti: 4.7, pip: 4.7 },
    { type: 'Bilanciati', negoziali: 2.5, aperti: 2.7, pip: 1.7 },
    { type: 'Obbligazionari', negoziali: 0.3, aperti: 0.0, pip: 0.0 },
    { type: 'Garantiti', negoziali: 0.7, aperti: 0.4, pip: 1.6 },
  ];

  // --- DATI COMMERCIALI STRATEGICI ---
  const DEMOGRAPHIC_DATA = [
    { name: 'Under 35', value: 19, fill: '#ef4444' },
    { name: '35 - 54', value: 52, fill: '#4f46e5' },
    { name: 'Over 55', value: 29, fill: '#94a3b8' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-12">
      
      {/* Header Strategico */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
             <div className="bg-amber-500 p-2 rounded-lg text-slate-900 shadow-lg">
                <BarChart3 size={24} />
             </div>
             <span className="text-amber-400 font-black tracking-widest uppercase text-xs">Market Intelligence COVIP 2024</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            Analisi <span className="text-indigo-400">Benchmark</span> Ufficiali
          </h1>
          <p className="text-indigo-100 max-w-3xl text-lg leading-relaxed">
            Dati estratti dalla Relazione Annuale COVIP pubblicata a Giugno 2024 e aggiornati con le schede costi 2025.
          </p>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-white opacity-5 transform skew-x-12"></div>
      </div>

      {/* Navigazione Modulo */}
      <div className="flex flex-wrap gap-2 bg-slate-100 p-1.5 rounded-2xl w-fit mx-auto shadow-inner border border-slate-200">
        <button onClick={() => setActiveTab('STRATEGIA')} className={`px-8 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'STRATEGIA' ? 'bg-[#233D7B] text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}>
          <Zap size={16} /> Flash Opportunità
        </button>
        <button onClick={() => setActiveTab('COSTI')} className={`px-8 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'COSTI' ? 'bg-[#233D7B] text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}>
          <Coins size={16} /> Costi ISC
        </button>
        <button onClick={() => setActiveTab('RENDIMENTI')} className={`px-8 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'RENDIMENTI' ? 'bg-[#233D7B] text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}>
          <TrendingUp size={16} /> Rendimenti 10Y
        </button>
      </div>

      {/* --- STRATEGIE COMMERCIALI --- */}
      {activeTab === 'STRATEGIA' && (
        <div className="space-y-8 animate-fade-in">
           <div className="grid lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-3xl border-2 border-indigo-500 shadow-xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform"><ArrowRightLeft size={100} /></div>
                 <div className="bg-indigo-100 text-indigo-600 w-fit px-3 py-1 rounded-full text-[10px] font-black uppercase mb-4 tracking-widest">Dinamismo 2024</div>
                 <p className="text-5xl font-black text-slate-900 mb-1">117.000</p>
                 <p className="text-sm font-bold text-slate-500 mb-6 uppercase tracking-tighter">Trasferimenti in uscita dai fondi</p>
                 <div className="space-y-4">
                    <div className="flex items-center gap-2 text-xs font-black text-slate-700">
                       <CheckCircle2 size={16} className="text-green-500" />
                       <span>Valore: 1,7 Miliardi di €</span>
                    </div>
                    <div className="p-4 bg-indigo-50 rounded-2xl text-[11px] text-indigo-800 font-bold border border-indigo-100 italic leading-relaxed">
                       "Signor cliente, 117mila persone hanno cambiato fondo nel 2024. Se non è soddisfatto delle performance o del servizio, la portabilità è un suo diritto gratuito."
                    </div>
                 </div>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform"><Users size={100} /></div>
                 <div className="bg-red-100 text-red-600 w-fit px-3 py-1 rounded-full text-[10px] font-black uppercase mb-4 tracking-widest">Gap Generazionale</div>
                 <p className="text-5xl font-black text-slate-900 mb-1">19%</p>
                 <p className="text-sm font-bold text-slate-500 mb-6 uppercase tracking-tighter">Iscritti hanno meno di 35 anni</p>
                 <div className="h-24 w-full mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                       <BarChart data={DEMOGRAPHIC_DATA} layout="vertical">
                          <XAxis type="number" hide />
                          <YAxis dataKey="name" type="category" hide />
                          <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={14}>
                             {DEMOGRAPHIC_DATA.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                             ))}
                          </Bar>
                       </BarChart>
                    </ResponsiveContainer>
                 </div>
                 <div className="p-4 bg-red-50 rounded-2xl text-[11px] text-red-800 font-bold border border-red-100 italic leading-relaxed">
                    "Solo 1 giovane su 5 sta risparmiando. La deducibilità per familiari a carico è lo strumento migliore per finanziare il futuro dei suoi figli a spese dello Stato."
                 </div>
              </div>

              <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden group border-t-8 border-t-amber-500">
                 <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><Lock size={100} /></div>
                 <div className="bg-amber-500 text-slate-900 w-fit px-3 py-1 rounded-full text-[10px] font-black uppercase mb-4 tracking-widest">Asset Protection</div>
                 <p className="text-4xl font-black text-white mb-1 tracking-tighter">234 Mld</p>
                 <p className="text-sm font-bold text-amber-200 mb-6 uppercase tracking-tighter">Debito TFR in bilancio PMI</p>
                 <ul className="space-y-3 mb-6">
                    <li className="flex items-center gap-2 text-xs font-bold text-indigo-100"><CheckCircle2 size={16} className="text-amber-500" /> TFR = Debito bancabile</li>
                    <li className="flex items-center gap-2 text-xs font-bold text-indigo-100"><CheckCircle2 size={16} className="text-amber-500" /> Rischio crisi liquidità</li>
                 </ul>
                 <button onClick={() => setActiveTab('COSTI')} className="w-full py-3 bg-white text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-amber-400 transition-colors">
                    Analisi Misure Compensative <ArrowRight size={14} />
                 </button>
              </div>
           </div>

           {/* Battle Card Commerciale - POTENZIATA CON ANIMA */}
           <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-8 overflow-hidden">
              <h3 className="text-2xl font-black text-slate-900 mb-8 uppercase tracking-tighter flex items-center gap-3">
                 <ShieldAlert className="text-red-600" /> Battle Card: Zurich & Anima vs Banca
              </h3>
              <div className="grid lg:grid-cols-3 gap-6">
                 {/* COLONNA 1: BANCA */}
                 <div className="p-6 bg-red-50 rounded-2xl border border-red-100 relative flex flex-col">
                    <ZapOff className="absolute top-4 right-4 text-red-200" size={32} />
                    <h4 className="font-bold text-red-900 mb-4 uppercase text-xs tracking-widest">Fondi Comuni Bancari</h4>
                    <ul className="space-y-3 text-[11px] text-red-800 font-medium flex-1">
                       <li className="flex gap-2"><span>✕</span> Tassazione rendimenti: 26%</li>
                       <li className="flex gap-2"><span>✕</span> Successione: SI paga imposta (4-8%)</li>
                       <li className="flex gap-2"><span>✕</span> ISEE: Da dichiarare (impatto asilo/università)</li>
                       <li className="flex gap-2"><span>✕</span> Patrimonio: Pignorabile dai creditori</li>
                    </ul>
                    <div className="mt-6 pt-4 border-t border-red-100 text-[10px] text-red-600 font-black uppercase">Asset Vulnerabile</div>
                 </div>

                 {/* COLONNA 2: ZURICH */}
                 <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-200 relative flex flex-col ring-4 ring-indigo-500/10">
                    <Umbrella className="absolute top-4 right-4 text-indigo-300" size={32} />
                    <h4 className="font-bold text-indigo-900 mb-4 uppercase text-xs tracking-widest">Zurich Spazio Previdenza</h4>
                    <ul className="space-y-3 text-[11px] text-indigo-800 font-bold flex-1">
                       <li className="flex gap-2"><CheckCircle2 size={14} /> Opzione F: Raddoppio Rendita LTC</li>
                       <li className="flex gap-2"><CheckCircle2 size={14} /> Gestione Multiramo (Trend + Units)</li>
                       <li className="flex gap-2"><CheckCircle2 size={14} /> Bonus 1% Caso Morte integrato</li>
                       <li className="flex gap-2"><CheckCircle2 size={14} /> Tassazione Rendimenti: 20% Max</li>
                    </ul>
                    <div className="mt-6 pt-4 border-t border-indigo-200 text-[10px] text-indigo-600 font-black uppercase">Focus Protezione & Wealth</div>
                 </div>

                 {/* COLONNA 3: ANIMA */}
                 <div className="p-6 bg-red-600 rounded-2xl relative flex flex-col text-white shadow-xl">
                    <Sparkles className="absolute top-4 right-4 text-red-400" size={32} />
                    <h4 className="font-bold text-white mb-4 uppercase text-xs tracking-widest">Anima Arti & Mestieri</h4>
                    <ul className="space-y-3 text-[11px] text-red-50 font-bold flex-1">
                       <li className="flex gap-2"><CheckCircle2 size={14} className="text-white" /> ISC 1,35%: Top Efficienza Mercato</li>
                       <li className="flex gap-2"><CheckCircle2 size={14} className="text-white" /> 6 Linee (da Garantita a 25+ Crescita)</li>
                       <li className="flex gap-2"><CheckCircle2 size={14} className="text-white" /> Classe I (Istituzionale) per Advisor</li>
                       <li className="flex gap-2"><CheckCircle2 size={14} className="text-white" /> Successione: ESENTE TOTALE</li>
                    </ul>
                    <div className="mt-6 pt-4 border-t border-red-500 text-[10px] text-white font-black uppercase">Focus Efficienza & Flessibilità</div>
                 </div>
              </div>
              <div className="mt-8 p-4 bg-slate-900 rounded-xl text-white text-[10px] flex items-center gap-3">
                 <ShieldCheck className="text-amber-400 shrink-0" size={20} />
                 <p className="font-bold uppercase tracking-tight">Vantaggio comune: Il capitale nei Fondi Pensione è impignorabile e insequestrabile (Art. 1923 c.c. e Art. 2117 c.c.).</p>
              </div>
           </div>
        </div>
      )}

      {/* --- SEZIONE COSTI --- */}
      {activeTab === 'COSTI' && (
        <div className="space-y-8 animate-fade-in">
           <div className="grid lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                 <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                   <Landmark size={20} className="text-indigo-600" />
                   Tav. 1.51 - Indicatore Sintetico di Costo (ISC)
                 </h3>
                 <div className="overflow-hidden rounded-2xl border border-slate-100 mb-6">
                    <table className="w-full text-left">
                       <thead className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase">
                          <tr>
                             <th className="px-6 py-4">Tipologia</th>
                             <th className="px-4 py-4 text-center">2 Anni</th>
                             <th className="px-4 py-4 text-center">5 Anni</th>
                             <th className="px-4 py-4 text-center bg-indigo-50 text-indigo-700 font-black">10 Anni</th>
                             <th className="px-4 py-4 text-center">35 Anni</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-50 text-sm">
                          {ISC_DATA.map((row) => (
                             <tr key={row.name} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 font-bold text-slate-700">{row.name}</td>
                                <td className="px-4 py-4 text-center">{row.y2.toFixed(2)}%</td>
                                <td className="px-4 py-4 text-center">{row.y5.toFixed(2)}%</td>
                                <td className="px-4 py-4 text-center font-bold text-indigo-600 bg-indigo-50/30">{row.y10.toFixed(2)}%</td>
                                <td className="px-4 py-4 text-center">{row.y35.toFixed(2)}%</td>
                             </tr>
                          ))}
                          {compareAnima && (
                             <tr className="bg-red-50/50">
                                <td className="px-6 py-4 font-black text-red-900">ANIMA Arti & Mestieri (Crescita - Cl. I)</td>
                                <td className="px-4 py-4 text-center font-bold">{PRODUCT_COSTS[1].y2.toFixed(2)}%</td>
                                <td className="px-4 py-4 text-center font-bold">{PRODUCT_COSTS[1].y5.toFixed(2)}%</td>
                                <td className="px-4 py-4 text-center font-black text-red-700 bg-red-100/50">{PRODUCT_COSTS[1].y10.toFixed(2)}%</td>
                                <td className="px-4 py-4 text-center font-bold">{PRODUCT_COSTS[1].y35.toFixed(2)}%</td>
                             </tr>
                          )}
                          {compareZurich && (
                             <tr className="bg-blue-50/50">
                                <td className="px-6 py-4 font-black text-blue-900">ZURICH Spazio Previdenza (ESG Az.)</td>
                                <td className="px-4 py-4 text-center font-bold">{PRODUCT_COSTS[0].y2.toFixed(2)}%</td>
                                <td className="px-4 py-4 text-center font-bold">{PRODUCT_COSTS[0].y5.toFixed(2)}%</td>
                                <td className="px-4 py-4 text-center font-black text-blue-700 bg-blue-100/50">{PRODUCT_COSTS[0].y10.toFixed(2)}%</td>
                                <td className="px-4 py-4 text-center font-bold">{PRODUCT_COSTS[0].y35.toFixed(2)}%</td>
                             </tr>
                          )}
                       </tbody>
                    </table>
                 </div>
                 <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 flex gap-3">
                    <Info size={24} className="text-amber-600 flex-shrink-0 mt-1" />
                    <div className="text-xs text-amber-900 leading-relaxed font-medium">
                       <p><strong>Dettaglio Tecnico Benchmark:</strong></p>
                       <ul className="list-disc pl-4 mt-1">
                          <li><strong>Anima (1,35% a 10y)</strong> si riferisce alla <strong>Classe I (Istituzionale)</strong>, comparto Crescita. È significativamente più efficiente della media dei fondi aperti.</li>
                          <li><strong>Zurich (2,10% a 10y)</strong> si riferisce alla linea <strong>ESG Azionario</strong>. Nonostante sia un PIP, resta sotto la media nazionale dei PIP (2,18%), offrendo un valore aggiunto in termini di gestione attiva.</li>
                       </ul>
                    </div>
                 </div>
              </div>

              <div className="lg:col-span-4 space-y-6">
                 <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">Gap Deducibilità Media</p>
                    <p className="text-4xl font-black text-slate-900">3.064 €</p>
                    <p className="text-[10px] text-red-500 font-bold mt-2 uppercase">Capitale non sfruttato per cliente</p>
                    <div className="mt-6 p-3 bg-red-50 rounded-xl text-[10px] text-red-700 font-medium">
                       Il 91% dei clienti versa meno del massimo. Questa è la tua opportunità principale di <strong>incremento premi</strong>.
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* --- SEZIONE RENDIMENTI --- */}
      {activeTab === 'RENDIMENTI' && (
        <div className="space-y-8 animate-fade-in">
           <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
              <h3 className="text-2xl font-black text-slate-900 mb-8 uppercase tracking-tighter">Rendimenti Netti Decennali (Media 2014-2023)</h3>
              <div className="h-[350px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={RETURNS_DATA} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                       <XAxis dataKey="type" tick={{fontSize: 10, fontWeight: 'bold'}} axisLine={false} tickLine={false} />
                       <YAxis unit="%" tick={{fontSize: 10}} axisLine={false} tickLine={false} />
                       <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                       <Legend verticalAlign="top" height={36}/>
                       <Bar dataKey="aperti" name="Fondi Aperti" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                       <Bar dataKey="pip" name="PIP di Mercato" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                    </BarChart>
                 </ResponsiveContainer>
              </div>
           </div>
        </div>
      )}

      <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-center">
         <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Fonte: Relazione Annuale COVIP 2024 (Dati Consolidati 2023) - Dati analizzati da Advisor Gruppo Vomero</p>
      </div>
    </div>
  );
};

export default CovipBenchmarkView;
