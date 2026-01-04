
import React, { useState } from 'react';
import { Home, Building2, User, FileCheck, Info, Scale, Calculator, AlertTriangle, CheckCircle2, TrendingDown, ChevronDown, ChevronUp, BookOpen, X, FileSignature, Landmark, ScrollText } from 'lucide-react';

const RealEstateTaxView: React.FC = () => {
  // Input States
  const [sellerType, setSellerType] = useState<'PRIVATO' | 'IMPRESA'>('PRIVATO');
  const [purchaseType, setPurchaseType] = useState<'PRIMA_CASA' | 'SECONDA_CASA'>('SECONDA_CASA');
  const [companyVatType, setCompanyVatType] = useState<'ESENTE' | 'SOGGETTA'>('ESENTE');
  
  const [marketPrice, setMarketPrice] = useState<number>(200000);
  const [renditaCatastale, setRenditaCatastale] = useState<number>(900);
  
  // New State: Mutuo
  const [hasMortgage, setHasMortgage] = useState<boolean>(true);
  const [mortgageAmount, setMortgageAmount] = useState<number>(160000); // Default 80% of 200k

  const [usePrezzoValore, setUsePrezzoValore] = useState<boolean>(true);
  const [showPvDetails, setShowPvDetails] = useState<boolean>(false);

  // Logic & Constants from PDF
  const COEFF_PRIMA_CASA = 115.5;
  const COEFF_SECONDA_CASA = 126;

  // Calculations
  const coefficient = purchaseType === 'PRIMA_CASA' ? COEFF_PRIMA_CASA : COEFF_SECONDA_CASA;
  const cadastralValue = renditaCatastale * coefficient; // Valore Catastale rivalutato

  // Determination of Tax Base
  let taxableBase = marketPrice;
  const canApplyPrezzoValore = (sellerType === 'PRIVATO') || (sellerType === 'IMPRESA' && companyVatType === 'ESENTE');

  if (canApplyPrezzoValore && usePrezzoValore) {
    taxableBase = cadastralValue;
  }

  // --- TAX CALCULATION (IMPOSTE) ---
  let registrationTax = 0;
  let mortgageTax = 0;
  let cadastralTax = 0;
  let vatTax = 0;
  let vatRate = 0;

  if (sellerType === 'PRIVATO' || (sellerType === 'IMPRESA' && companyVatType === 'ESENTE')) {
    const regRate = purchaseType === 'PRIMA_CASA' ? 0.02 : 0.09;
    let rawRegTax = taxableBase * regRate;
    if (rawRegTax < 1000) rawRegTax = 1000;
    
    registrationTax = rawRegTax;
    mortgageTax = 50;
    cadastralTax = 50;
    vatTax = 0;
  } else {
    registrationTax = 200;
    mortgageTax = 200;
    cadastralTax = 200;
    vatRate = purchaseType === 'PRIMA_CASA' ? 0.04 : 0.10; 
    vatTax = marketPrice * vatRate; 
  }

  const totalTax = registrationTax + mortgageTax + cadastralTax + vatTax;

  // Comparison Logic (Risparmio Imposte)
  let taxSaving = 0;
  if (canApplyPrezzoValore && usePrezzoValore) {
     const regRate = purchaseType === 'PRIMA_CASA' ? 0.02 : 0.09;
     let hypotheticalRegTax = marketPrice * regRate;
     if (hypotheticalRegTax < 1000) hypotheticalRegTax = 1000;
     const hypotheticalTotal = hypotheticalRegTax + 50 + 50;
     taxSaving = hypotheticalTotal - totalTax;
  }

  // --- NOTARY FEES ESTIMATION (STIMA COSTI NOTARILI) ---
  // Stima basata su scaglioni medi di mercato (netti IVA)
  const calculateBaseNotaryFee = (price: number) => {
    if (price <= 100000) return 1200;
    if (price <= 200000) return 1600;
    if (price <= 300000) return 2000;
    if (price <= 400000) return 2400;
    if (price <= 500000) return 2800;
    return 2800 + ((price - 500000) * 0.003);
  };

  let notaryFeeSale = calculateBaseNotaryFee(marketPrice);
  
  // APPLICAZIONE SCONTO 30% SE PREZZO-VALORE
  // La legge prevede la riduzione del 30% degli onorari se si usa il prezzo-valore
  let notaryDiscountAmount = 0;
  if (canApplyPrezzoValore && usePrezzoValore) {
    notaryDiscountAmount = notaryFeeSale * 0.30;
    notaryFeeSale = notaryFeeSale - notaryDiscountAmount;
  }

  let notaryFeeMortgage = 0;
  if (hasMortgage) {
    // L'atto di mutuo costa generalmente meno della vendita (stimiamo un 60-70% circa o scaglioni ridotti)
    notaryFeeMortgage = calculateBaseNotaryFee(mortgageAmount) * 0.7;
  }

  const notaryFeesTotalNet = notaryFeeSale + notaryFeeMortgage;
  const notaryVat = notaryFeesTotalNet * 0.22; // IVA 22%
  const notaryTotalCost = notaryFeesTotalNet + notaryVat;

  const grandTotal = totalTax + notaryTotalCost;

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-12">
      
      {/* HEADER HERO */}
      <div className="bg-gradient-to-r from-cyan-900 to-cyan-700 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <Home size={28} className="text-cyan-200" />
            <span className="text-cyan-100 font-bold tracking-wider uppercase">Agenzia delle Entrate</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">L'acquisto di una casa: le imposte</h1>
          <p className="text-cyan-100 max-w-2xl text-lg">
            Guida interattiva al calcolo delle imposte di registro, ipotecarie, catastali e stima dei costi notarili.
          </p>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-white opacity-5 transform -skew-x-12"></div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* INPUT SECTION */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Calculator size={20} className="text-cyan-600" />
              Dati Compravendita
            </h3>

            <div className="space-y-6">
              
              {/* Venditore */}
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Chi è il Venditore?</label>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setSellerType('PRIVATO')}
                    className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm border transition-all flex items-center justify-center gap-2 ${sellerType === 'PRIVATO' ? 'bg-cyan-600 text-white border-cyan-600 shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
                  >
                    <User size={18} /> Privato
                  </button>
                  <button 
                    onClick={() => setSellerType('IMPRESA')}
                    className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm border transition-all flex items-center justify-center gap-2 ${sellerType === 'IMPRESA' ? 'bg-cyan-600 text-white border-cyan-600 shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
                  >
                    <Building2 size={18} /> Impresa
                  </button>
                </div>
              </div>

              {/* Opzioni Impresa */}
              {sellerType === 'IMPRESA' && (
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 animate-fade-in">
                   <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Regime IVA</label>
                   <div className="flex gap-2">
                      <button 
                        onClick={() => setCompanyVatType('ESENTE')}
                        className={`flex-1 py-2 text-xs font-bold rounded border ${companyVatType === 'ESENTE' ? 'bg-white border-cyan-500 text-cyan-700 shadow-sm' : 'bg-transparent border-transparent text-slate-500'}`}
                      >
                        Esente IVA (Standard)
                      </button>
                      <button 
                        onClick={() => setCompanyVatType('SOGGETTA')}
                        className={`flex-1 py-2 text-xs font-bold rounded border ${companyVatType === 'SOGGETTA' ? 'bg-white border-cyan-500 text-cyan-700 shadow-sm' : 'bg-transparent border-transparent text-slate-500'}`}
                      >
                        Soggetta a IVA
                      </button>
                   </div>
                   <p className="text-[10px] text-slate-500 mt-2 leading-tight">
                     *Soggetta se venduta entro 5 anni dalla costruzione/ristrutturazione o su opzione del venditore (Pag. 1).
                   </p>
                </div>
              )}

              {/* Tipo Acquisto */}
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Tipologia Acquisto</label>
                <div className="flex bg-slate-100 p-1 rounded-lg">
                  <button 
                    onClick={() => setPurchaseType('SECONDA_CASA')}
                    className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${purchaseType === 'SECONDA_CASA' ? 'bg-white text-cyan-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    Seconda Casa (o Standard)
                  </button>
                  <button 
                    onClick={() => setPurchaseType('PRIMA_CASA')}
                    className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${purchaseType === 'PRIMA_CASA' ? 'bg-white text-cyan-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    Prima Casa
                  </button>
                </div>
              </div>

              {/* Valori */}
              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Prezzo Pattuito (€)</label>
                    <input 
                      type="number" 
                      value={marketPrice}
                      onChange={(e) => setMarketPrice(Number(e.target.value))}
                      className="w-full p-2 border border-slate-300 rounded-lg font-bold text-slate-800"
                    />
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Rendita Catastale (€)</label>
                    <input 
                      type="number" 
                      value={renditaCatastale}
                      onChange={(e) => setRenditaCatastale(Number(e.target.value))}
                      className="w-full p-2 border border-slate-300 rounded-lg font-bold text-slate-800"
                    />
                 </div>
              </div>

              {/* Toggle Mutuo */}
              <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                 <div className="flex items-center justify-between mb-2">
                    <label className="flex items-center gap-2 text-xs font-bold text-indigo-900 uppercase">
                       <Landmark size={16} /> Richiedi Mutuo?
                    </label>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={hasMortgage} onChange={(e) => setHasMortgage(e.target.checked)} className="sr-only peer" />
                      <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                 </div>
                 {hasMortgage && (
                    <div className="animate-fade-in">
                       <label className="block text-[10px] text-indigo-700 mb-1">Importo Mutuo (€)</label>
                       <input 
                         type="number" 
                         value={mortgageAmount} 
                         onChange={(e) => setMortgageAmount(Number(e.target.value))}
                         className="w-full p-2 text-sm border border-indigo-200 rounded font-bold text-indigo-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                       />
                    </div>
                 )}
              </div>

              {/* Toggle Prezzo-Valore */}
              {canApplyPrezzoValore && (
                <div className="flex items-center justify-between bg-cyan-50 p-3 rounded-lg border border-cyan-200">
                   <div className="flex items-center gap-2">
                      <Scale size={18} className="text-cyan-600" />
                      <span className="text-sm font-bold text-cyan-900">Sistema "Prezzo-Valore"</span>
                   </div>
                   <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={usePrezzoValore} onChange={(e) => setUsePrezzoValore(e.target.checked)} className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                   </label>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* OUTPUT SECTION */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Result Card */}
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
             <div className="bg-slate-900 px-6 py-4 flex justify-between items-center text-white">
                <h3 className="font-bold text-lg">Preventivo Spese Totali</h3>
                <span className="text-xs bg-white/20 px-2 py-1 rounded font-mono">
                   {sellerType} - {purchaseType === 'PRIMA_CASA' ? '1° CASA' : '2° CASA'}
                </span>
             </div>
             
             <div className="p-6">
                <div className="flex justify-between items-end mb-6">
                   <div>
                      <p className="text-xs text-slate-500 font-bold uppercase mb-1">Totale Stimato (Imposte + Notaio)</p>
                      <p className="text-4xl font-extrabold text-cyan-700">
                         {formatCurrency(grandTotal)}
                      </p>
                   </div>
                   {taxSaving > 0 && (
                      <div className="text-right">
                         <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded font-bold">
                            Risparmio Imposte: {formatCurrency(taxSaving)}
                         </span>
                      </div>
                   )}
                </div>

                <div className="grid md:grid-cols-2 gap-8 border-t border-slate-100 pt-6">
                   
                   {/* Sezione IMPOSTE */}
                   <div className="space-y-3 text-sm">
                      <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-2">
                         <Building2 size={16} className="text-cyan-600" />
                         Imposte Erariali
                      </h4>
                      {vatTax > 0 && (
                         <div className="flex justify-between items-center text-slate-700">
                            <span>IVA ({(vatRate * 100).toFixed(0)}%)</span>
                            <span className="font-mono">{formatCurrency(vatTax)}</span>
                         </div>
                      )}
                      <div className="flex justify-between items-center text-slate-700">
                         <span>Registro</span>
                         <span className="font-mono">{formatCurrency(registrationTax)}</span>
                      </div>
                      <div className="flex justify-between items-center text-slate-700">
                         <span>Ipotecaria</span>
                         <span className="font-mono">{formatCurrency(mortgageTax)}</span>
                      </div>
                      <div className="flex justify-between items-center text-slate-700">
                         <span>Catastale</span>
                         <span className="font-mono">{formatCurrency(cadastralTax)}</span>
                      </div>
                      <div className="border-t border-slate-200 pt-2 flex justify-between font-bold text-cyan-800">
                         <span>Totale Imposte</span>
                         <span>{formatCurrency(totalTax)}</span>
                      </div>
                   </div>

                   {/* Sezione NOTAIO (NEW) */}
                   <div className="space-y-3 text-sm">
                      <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-2">
                         <FileSignature size={16} className="text-indigo-600" />
                         Stima Costi Notarili
                      </h4>
                      <div className="flex justify-between items-center text-slate-700">
                         <span>Onorario Atto Compravendita</span>
                         <span className="font-mono">{formatCurrency(notaryFeeSale)}</span>
                      </div>
                      {notaryDiscountAmount > 0 && (
                         <div className="flex justify-between items-center text-emerald-600 text-xs">
                            <span>Sconto "Prezzo-Valore" (30%)</span>
                            <span>-{formatCurrency(notaryDiscountAmount)}</span>
                         </div>
                      )}
                      {hasMortgage && (
                         <div className="flex justify-between items-center text-slate-700">
                            <span>Onorario Atto Mutuo</span>
                            <span className="font-mono">{formatCurrency(notaryFeeMortgage)}</span>
                         </div>
                      )}
                      <div className="flex justify-between items-center text-slate-500 text-xs">
                         <span>IVA (22% su Onorari)</span>
                         <span className="font-mono">{formatCurrency(notaryVat)}</span>
                      </div>
                      <div className="border-t border-slate-200 pt-2 flex justify-between font-bold text-indigo-800">
                         <span>Totale Notaio (Stima)</span>
                         <span>{formatCurrency(notaryTotalCost)}</span>
                      </div>
                   </div>

                </div>
             </div>
             
             <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 text-[10px] text-slate-500 italic text-center">
                *Nota: I costi notarili sono indicativi e basati su medie di mercato. Il preventivo reale varia in base al professionista e alla complessità della pratica. Le imposte sono calcolate secondo le aliquote vigenti.
             </div>
          </div>

          {/* FOCUS PREZZO VALORE (NEW EXPLICIT SECTION) */}
          {canApplyPrezzoValore && (
            <div className="bg-cyan-50 border border-cyan-200 rounded-xl overflow-hidden transition-all duration-300">
               <button 
                 onClick={() => setShowPvDetails(!showPvDetails)}
                 className="w-full flex justify-between items-center p-5 text-left hover:bg-cyan-100/50 transition-colors"
               >
                  <div className="flex items-center gap-3">
                     <div className="bg-white p-2 rounded-full shadow-sm text-cyan-700">
                        <BookOpen size={20} />
                     </div>
                     <div>
                        <h4 className="font-bold text-cyan-900">Focus Normativo: Sistema "Prezzo-Valore"</h4>
                        <p className="text-xs text-cyan-700 mt-0.5">Come si calcola la base imponibile e quali sono i vantaggi.</p>
                     </div>
                  </div>
                  {showPvDetails ? <ChevronUp className="text-cyan-600" /> : <ChevronDown className="text-cyan-600" />}
               </button>

               {showPvDetails && (
                  <div className="px-6 pb-6 pt-0 animate-fade-in">
                     <div className="border-t border-cyan-200 my-4"></div>
                     
                     {/* La Formula */}
                     <div className="bg-white p-4 rounded-xl border border-cyan-100 text-center mb-6 shadow-sm">
                        <p className="text-xs text-cyan-600 uppercase font-bold mb-2">La Formula di Legge</p>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-2 text-lg font-mono text-cyan-900 font-bold">
                           <span>{formatCurrency(renditaCatastale)}</span>
                           <span className="text-cyan-400">×</span>
                           <span>1,05 <span className="text-[10px] font-sans text-cyan-500 block font-normal">(Rivalutazione 5%)</span></span>
                           <span className="text-cyan-400">×</span>
                           <span>{purchaseType === 'PRIMA_CASA' ? '110' : '120'} <span className="text-[10px] font-sans text-cyan-500 block font-normal">(Moltiplicatore)</span></span>
                           <span className="text-cyan-400">=</span>
                           <span className="text-xl bg-cyan-100 px-2 py-1 rounded text-cyan-800">{formatCurrency(cadastralValue)}</span>
                        </div>
                     </div>

                     <div className="grid md:grid-cols-2 gap-6">
                        <div>
                           <h5 className="font-bold text-cyan-800 text-sm mb-2 flex items-center gap-2">
                              <CheckCircle2 size={16} /> Requisiti Applicabilità
                           </h5>
                           <ul className="text-xs text-cyan-900 space-y-2 list-disc pl-4">
                              <li>L'acquirente deve essere un <strong>Privato</strong> (non agisce nell'esercizio di impresa).</li>
                              <li>L'immobile deve essere a <strong>uso abitativo</strong> (incluse pertinenze).</li>
                              <li>Deve essere fatta <strong>esplicita richiesta</strong> al Notaio nell'atto.</li>
                           </ul>
                        </div>
                        <div>
                           <h5 className="font-bold text-cyan-800 text-sm mb-2 flex items-center gap-2">
                              <AlertTriangle size={16} /> Attenzione alla Trasparenza
                           </h5>
                           <p className="text-xs text-cyan-900 leading-relaxed">
                              Per godere del beneficio è <strong>obbligatorio indicare in atto il prezzo reale</strong> pattuito. 
                              Se il prezzo viene occultato (anche parzialmente), si perdono i benefici e si applicano sanzioni (50%-100% della maggiore imposta).
                           </p>
                        </div>
                     </div>
                  </div>
               )}
            </div>
          )}

          {/* Info Panels from PDF */}
          <div className="grid md:grid-cols-2 gap-6">
             <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                   <Info size={18} className="text-cyan-600" />
                   Minimo d'Imposta
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                   Attenzione: Sia quando si compra da un’impresa in esenzione IVA sia da un privato, l’imposta di registro proporzionale <strong>non può essere inferiore a 1.000 euro</strong>.
                </p>
             </div>

             <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                   <FileCheck size={18} className="text-cyan-600" />
                   Vantaggi Prezzo-Valore
                </h4>
                <ul className="text-sm text-slate-600 space-y-2">
                   <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Limitazione potere di accertamento dell'Agenzia Entrate (nessun controllo sul valore).</span>
                   </li>
                   <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Riduzione del <strong>30%</strong> degli onorari notarili (prevista per legge).</span>
                   </li>
                </ul>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RealEstateTaxView;
