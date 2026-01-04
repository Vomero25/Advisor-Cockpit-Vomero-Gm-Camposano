
import React, { useState } from 'react';
import { ANIMA_PRODUCT_DATA } from '../constants';
import { ShieldCheck, TrendingUp, PieChart, Layers, Leaf, HeartHandshake, FileText, CheckCircle2, Info, Handshake, Calculator, Coins, Briefcase } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const AnimaProductView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'PANORAMICA' | 'COMPARTI' | 'COSTI' | 'LTC' | 'PARTNERSHIP'>('PANORAMICA');

  // Stati per Tab Partnership
  const [partnerInflow, setPartnerInflow] = useState<number>(500000); // Raccolta Annua
  const [selectedFundIndex, setSelectedFundIndex] = useState<number>(1); // Default Rivalutazione 10+
  const [partnerSplit, setPartnerSplit] = useState<number>(30); // % al Partner

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'PieChart': return <PieChart size={28} className="text-red-600" />;
      case 'ShieldCheck': return <ShieldCheck size={28} className="text-emerald-600" />;
      case 'Leaf': return <Leaf size={28} className="text-green-600" />;
      case 'HeartHandshake': return <HeartHandshake size={28} className="text-blue-600" />;
      default: return <TrendingUp size={28} className="text-slate-600" />;
    }
  };

  // Helper per parsing costo (es. "1,40%" -> 0.014)
  const parseCost = (costStr: string) => {
    return parseFloat(costStr.replace(',', '.').replace('%', '')) / 100;
  };

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);

  // Calcoli Partnership
  const calculatePartnership = () => {
    const selectedFund = ANIMA_PRODUCT_DATA.FUNDS_DETAILS[selectedFundIndex];
    const mgmtFeePct = parseCost(selectedFund.cost);
    
    // 1. Fee Totale pagata dal cliente (Massa * Fee)
    const totalClientFee = partnerInflow * mgmtFeePct;

    // 2. Commissione Generata per il Consulente (23% della Fee Cliente)
    const advisorCommissionBase = totalClientFee * 0.23;

    // 3. Split
    const partnerShare = advisorCommissionBase * (partnerSplit / 100);
    const advisorShare = advisorCommissionBase - partnerShare;

    // Proiezione su 5 anni (Accumulo lineare: Anno 1 = 1x, Anno 2 = 2x inflow, etc.)
    // Assumiamo che la fee si applichi sullo stock accumulato.
    const projection = [];
    let currentStock = 0;
    
    for (let year = 1; year <= 5; year++) {
        currentStock += partnerInflow; // Nuova raccolta ogni anno
        const yearTotalFee = currentStock * mgmtFeePct;
        const yearAdvisorCommTotal = yearTotalFee * 0.23;
        const yearPartnerShare = yearAdvisorCommTotal * (partnerSplit / 100);
        
        projection.push({
            year: `Anno ${year}`,
            stock: currentStock,
            totalComm: Math.round(yearAdvisorCommTotal),
            partner: Math.round(yearPartnerShare),
            advisor: Math.round(yearAdvisorCommTotal - yearPartnerShare)
        });
    }

    return {
        fundName: selectedFund.name,
        mgmtFeePct,
        totalClientFee,
        advisorCommissionBase,
        partnerShare,
        advisorShare,
        projection
    };
  };

  const partnershipData = calculatePartnership();

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-12">
      {/* Header with Anima Branding */}
      <div className="bg-gradient-to-r from-red-700 to-red-900 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2 opacity-90">
            <PieChart size={20} />
            <span className="text-sm font-semibold tracking-wider uppercase">Fondo Pensione Aperto</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Anima Arti & Mestieri</h1>
          <p className="text-red-100 max-w-2xl text-lg">
            Soluzione previdenziale flessibile con 6 linee di investimento, garanzia di capitale opzionale e focus ESG.
          </p>
        </div>
        {/* Abstract shapes */}
        <div className="absolute right-0 bottom-0 h-full w-1/3 bg-white opacity-5 transform -skew-x-12"></div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex overflow-x-auto gap-2 pb-2 border-b border-slate-200 no-scrollbar">
        {[
          { id: 'PANORAMICA', label: 'Panoramica' },
          { id: 'COMPARTI', label: 'Linee & Investimenti' },
          { id: 'COSTI', label: 'Costi & Spese' },
          { id: 'LTC', label: 'Garanzie & LTC' },
          { id: 'PARTNERSHIP', label: 'Partnership B2B', icon: Handshake, badge: 'NUOVO' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`
              px-6 py-3 font-medium text-sm whitespace-nowrap transition-all rounded-t-lg border-b-2 flex items-center gap-2 relative
              ${activeTab === tab.id 
                ? 'border-red-700 text-red-700 bg-red-50' 
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'}
            `}
          >
            {tab.icon && <tab.icon size={16} />}
            {tab.label}
            {tab.badge && (
              <span className="absolute top-1 right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
            )}
          </button>
        ))}
      </div>

      {/* TAB CONTENT: PANORAMICA */}
      {activeTab === 'PANORAMICA' && (
        <div className="space-y-8 animate-fade-in">
          <div className="grid md:grid-cols-2 gap-6">
            {ANIMA_PRODUCT_DATA.USP.map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${item.color}`}>
                  {getIcon(item.icon)}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
             <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
               <FileText size={20} className="text-red-600" />
               Caratteristiche Chiave
             </h3>
             <ul className="grid md:grid-cols-2 gap-3 text-sm text-slate-700">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-600"/> Adesione individuale o collettiva</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-600"/> Contribuzione libera e flessibile</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-600"/> Possibilità di conferimento TFR (anche tacito)</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-600"/> Anticipazioni e Riscatti previsti per legge</li>
             </ul>
          </div>
        </div>
      )}

      {/* TAB CONTENT: COMPARTI */}
      {activeTab === 'COMPARTI' && (
        <div className="space-y-6 animate-fade-in">
           <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Layers className="text-red-600" />
                Performance e Asset Allocation (Dati Classe I - Nota Inf. 06/2025)
              </h3>
              
              <div className="grid lg:grid-cols-2 gap-6">
                {ANIMA_PRODUCT_DATA.FUNDS_DETAILS.map((fund, idx) => (
                  <div key={idx} className="p-5 bg-slate-50 rounded-lg border border-slate-200 hover:border-red-300 transition-colors relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-red-600"></div>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                         <h4 className="font-bold text-slate-800 text-base">{fund.name}</h4>
                         <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">{fund.strategy}</span>
                      </div>
                      <div className="text-right">
                         <span className="text-xs font-bold bg-red-600 text-white px-2 py-1 rounded">Costo: {fund.cost}</span>
                      </div>
                    </div>
                    
                    {/* Performance Grid */}
                    <div className="grid grid-cols-4 gap-2 my-3 bg-white p-2 rounded border border-slate-100 text-center">
                       <div>
                          <p className="text-[10px] text-slate-400 uppercase">2024</p>
                          <p className={`font-bold text-sm ${fund.perf2024.includes('-') ? 'text-red-600' : 'text-green-600'}`}>{fund.perf2024}</p>
                       </div>
                       <div>
                          <p className="text-[10px] text-slate-400 uppercase">3 Anni</p>
                          <p className="font-bold text-xs text-slate-700">{fund.returns.y3}</p>
                       </div>
                       <div>
                          <p className="text-[10px] text-slate-400 uppercase">5 Anni</p>
                          <p className="font-bold text-xs text-slate-700">{fund.returns.y5}</p>
                       </div>
                       <div>
                          {/* Fix: Property 'y20' does not exist, using y10 as per constants */}
                          <p className="text-[10px] text-slate-400 uppercase">10 Anni</p>
                          <p className="font-bold text-xs text-slate-700">{fund.returns.y10}</p>
                       </div>
                    </div>

                    {/* Asset Allocation Visual */}
                    <div className="flex items-center gap-2 mt-2">
                       <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden flex">
                          <div className="h-full bg-red-500" style={{width: `${fund.composition.equity}%`}}></div>
                          <div className="h-full bg-slate-400" style={{width: `${fund.composition.debt}%`}}></div>
                       </div>
                       <div className="text-[10px] text-slate-500 font-medium whitespace-nowrap">
                          {fund.composition.equity.toFixed(1)}% Az / {fund.composition.debt.toFixed(1)}% Obb
                       </div>
                    </div>
                  </div>
                ))}
              </div>
           </div>
           
           <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg flex gap-3 text-sm text-blue-800">
              <Info size={20} className="flex-shrink-0" />
              <p>Tutti i comparti promuovono caratteristiche ambientali e sociali (Art. 8 Regolamento UE 2019/2088 - SFDR).</p>
           </div>
        </div>
      )}

      {/* TAB CONTENT: COSTI */}
      {activeTab === 'COSTI' && (
        <div className="space-y-8 animate-fade-in">
           <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                 <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <TrendingUp size={20} className="text-red-600" />
                    Spese Fisse
                 </h3>
                 <ul className="space-y-4">
                    <li className="flex justify-between border-b border-slate-100 pb-2">
                       <span className="text-slate-600">Adesione (Una tantum)</span>
                       <span className="font-bold text-slate-900">{ANIMA_PRODUCT_DATA.COSTS.entry}</span>
                    </li>
                    <li className="flex justify-between border-b border-slate-100 pb-2">
                       <span className="text-slate-600">Spesa Annua</span>
                       <span className="font-bold text-slate-900">{ANIMA_PRODUCT_DATA.COSTS.annual}</span>
                    </li>
                    <li className="flex justify-between border-b border-slate-100 pb-2">
                       <span className="text-slate-600">Attivazione RITA</span>
                       <span className="font-bold text-slate-900">{ANIMA_PRODUCT_DATA.COSTS.rita}</span>
                    </li>
                 </ul>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                 <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Layers size={20} className="text-red-600" />
                    Operazioni
                 </h3>
                 <ul className="space-y-4">
                    <li className="flex justify-between border-b border-slate-100 pb-2">
                       <span className="text-slate-600">Switch / Riallocazione</span>
                       <span className="font-bold text-slate-900">{ANIMA_PRODUCT_DATA.COSTS.switch}</span>
                    </li>
                    <li className="flex justify-between border-b border-slate-100 pb-2">
                       <span className="text-slate-600">Trasferimento</span>
                       <span className="font-bold text-slate-900">{ANIMA_PRODUCT_DATA.COSTS.transfer}</span>
                    </li>
                    <li className="flex justify-between border-b border-slate-100 pb-2">
                       <span className="text-slate-600">Caricamenti %</span>
                       <span className="font-bold text-green-600">{ANIMA_PRODUCT_DATA.COSTS.loading}</span>
                    </li>
                 </ul>
              </div>
           </div>
        </div>
      )}

      {/* TAB CONTENT: LTC & GARANZIE */}
      {activeTab === 'LTC' && (
        <div className="space-y-8 animate-fade-in">
           <div className="bg-red-50 p-6 rounded-xl border border-red-100 mb-6">
              <h3 className="text-xl font-bold text-red-900 mb-2 flex items-center gap-2">
                 <ShieldCheck size={24} />
                 Garanzia di Capitale
              </h3>
              <p className="text-red-800 mb-4 text-sm">
                 Nei comparti <strong>"Incremento e Garanzia 5+"</strong> e <strong>"Garanzia 1+"</strong> è prevista la restituzione del capitale investito al verificarsi di specifici eventi (pensionamento, decesso, invalidità, inoccupazione).
              </p>
              <div className="flex gap-2">
                 <span className="text-xs bg-white text-red-800 px-2 py-1 rounded border border-red-200 font-bold">Ideale per TFR</span>
                 <span className="text-xs bg-white text-red-800 px-2 py-1 rounded border border-red-200 font-bold">Basso Rischio</span>
              </div>
           </div>

           <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                 <HeartHandshake size={20} className="text-blue-600" />
                 Opzione F: Copertura LTC (Long Term Care)
              </h3>
              <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                 Anima Arti & Mestieri offre un'opzione di rendita vitalizia che <strong>raddoppia l'importo</strong> nel caso in l'aderente perda l'autosufficienza in età avanzata.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                 <div className="p-4 bg-slate-50 rounded-lg">
                    <span className="font-bold text-slate-900 block mb-1">Definizione</span>
                    <p className="text-slate-600 text-xs">Incapacità di svolgere 4 su 6 attività elementari della vita quotidiana (ADL).</p>
                 </div>
                 <div className="p-4 bg-slate-50 rounded-lg">
                    <span className="font-bold text-slate-900 block mb-1">Costo</span>
                    <p className="text-slate-600 text-xs">Caricamento specifico del 4,90% sul premio unico al momento della conversione in rendita.</p>
                 </div>
                 <div className="p-4 bg-slate-50 rounded-lg">
                    <span className="font-bold text-slate-900 block mb-1">Vantaggio</span>
                    <p className="text-slate-600 text-xs">Protezione del tenore di vita in caso di spese sanitarie impreviste.</p>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* --- TAB PARTNERSHIP PROFESSIONALE (NEW) --- */}
      {activeTab === 'PARTNERSHIP' && (
        <div className="space-y-8 animate-fade-in">
           <div className="bg-slate-900 rounded-xl p-8 text-white shadow-lg">
              <h2 className="text-2xl font-bold flex items-center gap-3 mb-2">
                 <Handshake className="text-amber-500" size={32} />
                 Simulatore Partnership B2B
              </h2>
              <p className="text-slate-300 max-w-2xl">
                 Strumento dedicato per Commercialisti e Partner: calcola la retrocessione sui volumi di raccolta.
                 Il calcolo si basa sul 23% della Management Fee pagata dal cliente.
              </p>
           </div>

           <div className="grid lg:grid-cols-12 gap-8">
              
              {/* Controlli Input */}
              <div className="lg:col-span-4 space-y-6">
                 <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                       <Calculator size={20} className="text-red-600" />
                       Configura Accordo
                    </h3>
                    
                    <div className="space-y-6">
                       {/* Raccolta Annua */}
                       <div>
                          <label className="block text-xs font-bold text-slate-600 mb-1">Nuova Raccolta Annua (AUM)</label>
                          <div className="relative">
                             <input 
                                type="number" 
                                value={partnerInflow}
                                onChange={(e) => setPartnerInflow(Number(e.target.value))}
                                className="w-full pl-3 p-3 border border-slate-300 rounded-lg font-bold text-slate-800 focus:ring-2 focus:ring-red-500 outline-none"
                             />
                          </div>
                          <input 
                             type="range" min="50000" max="2000000" step="50000" 
                             value={partnerInflow}
                             onChange={(e) => setPartnerInflow(Number(e.target.value))}
                             className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600 mt-2"
                          />
                       </div>

                       {/* Linea Investimento */}
                       <div>
                          <label className="block text-xs font-bold text-slate-600 mb-1">Linea Prevalente</label>
                          <select 
                             value={selectedFundIndex}
                             onChange={(e) => setSelectedFundIndex(Number(e.target.value))}
                             className="w-full p-2 border border-slate-300 rounded-lg text-sm bg-white cursor-pointer"
                          >
                             {ANIMA_PRODUCT_DATA.FUNDS_DETAILS.map((fund, idx) => (
                                <option key={idx} value={idx}>{fund.name} (Costo: {fund.cost})</option>
                             ))}
                          </select>
                       </div>

                       {/* Split Partner */}
                       <div>
                          <div className="flex justify-between mb-1">
                             <label className="text-xs font-bold text-slate-600">Split al Partner</label>
                             <span className="text-xs font-bold text-red-600">{partnerSplit}%</span>
                          </div>
                          <input 
                             type="range" min="0" max="50" step="5" 
                             value={partnerSplit}
                             onChange={(e) => setPartnerSplit(Number(e.target.value))}
                             className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                          />
                          <p className="text-[10px] text-slate-400 mt-1">Percentuale calcolata sulla quota Consulente</p>
                       </div>
                    </div>
                 </div>

                 {/* KPI Summary Box */}
                 <div className="bg-red-50 border border-red-100 rounded-xl p-6">
                    <h4 className="text-xs text-red-800 font-bold uppercase mb-4 flex items-center gap-2">
                       <Briefcase size={14} /> Dettaglio Commissionale
                    </h4>
                    <div className="space-y-3 text-sm">
                       <div className="flex justify-between">
                          <span className="text-slate-600">Fee Cliente:</span>
                          <span className="font-bold text-slate-800">{(partnershipData.mgmtFeePct * 100).toFixed(2)}%</span>
                       </div>
                       <div className="flex justify-between">
                          <span className="text-slate-600">Payout Consulente:</span>
                          <span className="font-bold text-slate-800">23% <span className="text-[10px] font-normal text-slate-400">della fee</span></span>
                       </div>
                       <div className="border-t border-red-200 pt-2 flex justify-between font-bold text-red-700">
                          <span>Split Partner:</span>
                          <span>{partnerSplit}% <span className="text-[10px] font-normal">del payout</span></span>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Risultati */}
              <div className="lg:col-span-8 space-y-6">
                 
                 {/* Card Risultati Annuali */}
                 <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <div className="grid md:grid-cols-3 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
                       <div className="pb-4 md:pb-0">
                          <p className="text-xs text-slate-500 uppercase font-bold mb-1">Fee Totale (Cliente)</p>
                          <p className="text-xl font-bold text-slate-800">{formatCurrency(partnershipData.totalClientFee)}</p>
                          <p className="text-[10px] text-slate-400">Generata su {formatCurrency(partnerInflow)}</p>
                       </div>
                       <div className="py-4 md:py-0">
                          <p className="text-xs text-indigo-600 uppercase font-bold mb-1">Monte Consulente (23%)</p>
                          <p className="text-xl font-bold text-indigo-600">{formatCurrency(partnershipData.advisorCommissionBase)}</p>
                          <p className="text-[10px] text-indigo-400">Base imponibile split</p>
                       </div>
                       <div className="pt-4 md:pt-0">
                          <p className="text-xs text-red-600 uppercase font-bold mb-1 flex items-center justify-center gap-1">
                             <Handshake size={14} /> Share Partner ({partnerSplit}%)
                          </p>
                          <p className="text-2xl font-extrabold text-red-600">{formatCurrency(partnershipData.partnerShare)}</p>
                          <p className="text-[10px] text-red-400">Ricavo annuo (Anno 1)</p>
                       </div>
                    </div>
                 </div>

                 {/* Proiezione 5 Anni */}
                 <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <div className="flex justify-between items-center mb-6">
                       <h3 className="font-bold text-slate-800 flex items-center gap-2">
                          <TrendingUp size={20} className="text-green-600" />
                          Proiezione Business Plan (5 Anni)
                       </h3>
                       <span className="text-[10px] bg-slate-100 px-2 py-1 rounded text-slate-500 font-bold border border-slate-200">
                          Ipotesi: Raccolta Costante
                       </span>
                    </div>
                    
                    <div className="h-[300px] w-full mb-6">
                       <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={partnershipData.projection} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                             <XAxis dataKey="year" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                             <YAxis tickFormatter={(val) => `€${(val/1000).toFixed(0)}k`} width={60} axisLine={false} tickLine={false} />
                             <Tooltip 
                                formatter={(value: number) => formatCurrency(value)}
                                cursor={{fill: '#f1f5f9'}}
                                contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                             />
                             <Legend />
                             <Bar dataKey="partner" name="Ricavo Partner" stackId="a" fill="#dc2626" radius={[4, 4, 0, 0]} barSize={40} />
                             <Bar dataKey="advisor" name="Ricavo Consulente" stackId="a" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={40} />
                          </BarChart>
                       </ResponsiveContainer>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
                       <table className="w-full text-sm text-left">
                          <thead className="bg-slate-100 text-slate-500 font-bold uppercase text-xs">
                             <tr>
                                <th className="px-4 py-2">Anno</th>
                                <th className="px-4 py-2">Stock Gestito</th>
                                <th className="px-4 py-2 text-right text-red-700">Ricavo Partner</th>
                             </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200">
                             {partnershipData.projection.map((row, idx) => (
                                <tr key={idx}>
                                   <td className="px-4 py-2 font-medium text-slate-700">{row.year}</td>
                                   <td className="px-4 py-2 text-slate-600 font-mono">{formatCurrency(row.stock)}</td>
                                   <td className="px-4 py-2 text-right font-bold text-red-600">{formatCurrency(row.partner)}</td>
                                </tr>
                             ))}
                          </tbody>
                       </table>
                    </div>
                 </div>

              </div>
           </div>
        </div>
      )}

    </div>
  );
};

export default AnimaProductView;
