
import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, Scale, ShieldCheck, Zap, ArrowRight, 
  Calculator, Gavel, Landmark, History, Lock, 
  Settings2, Award, Info, FileText, CheckCircle2,
  AlertTriangle, ShieldAlert, Briefcase, Sparkles, 
  Quote, ChevronRight, FileSignature, Coins, 
  BookOpen, Building2, UserCheck, Handshake,
  Receipt, Landmark as Bank, ShieldPlus, AlertCircle, Siren,
  ArrowDownNarrowWide, MinusCircle, PlusCircle, Percent,
  ClipboardCheck, BarChart3, Database, Wallet, UserMinus,
  Timer, ArrowDownToLine, Gem, ListChecks, CalendarSearch
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';

const formatCurrency = (val: number) => 
  new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);

const TfmSimulatorView: React.FC = () => {
  // --- STATI DI INPUT ---
  const [compensoAnnuoTfm, setCompensoAnnuoTfm] = useState<number>(30000);
  const [redditoPersonaleAltro, setRedditoPersonaleAltro] = useState<number>(75000);
  const [aliquotaMediaSocio, setAliquotaMediaSocio] = useState<number>(27); 
  const [isGestioneSeparataInps, setIsGestioneSeparataInps] = useState<boolean>(true);

  // --- MOTORE DI AUDIT TFM EXECUTIVO ---
  const audit = useMemo(() => {
    // 1. ANALISI PRELIEVO ORDINARIO (SALARIO)
    // Se prelevati come compenso amministratore, si sommano al reddito e vanno allo scaglione 43%
    const irpefMarginale = 0.43;
    const addizionali = 0.02;
    const inpsRate = isGestioneSeparataInps ? 0.2607 : 0;
    
    const prelievoFiscaleOrdinario = compensoAnnuoTfm * (irpefMarginale + addizionali);
    const prelievoInpsOrdinario = compensoAnnuoTfm * inpsRate;
    const nettoOrdinario = compensoAnnuoTfm - prelievoFiscaleOrdinario - prelievoInpsOrdinario;

    // 2. ANALISI PRELIEVO TFM (TASSAZIONE SEPARATA)
    // Non si somma ai redditi IRPEF dell'anno (Art. 17 TUIR). Niente INPS.
    const prelievoTfmSeparata = compensoAnnuoTfm * (aliquotaMediaSocio / 100);
    const nettoTfm = compensoAnnuoTfm - prelievoTfmSeparata;
    
    // 3. VANTAGGIO AZIENDALE (IRES)
    // Deducibile al 100% per competenza (Art. 105 TUIR)
    const risparmioIresAzienda = compensoAnnuoTfm * 0.24;

    // Delta & KPI
    const guadagnoExtraNetto = nettoTfm - nettoOrdinario;
    const efficienzaPercentuale = (guadagnoExtraNetto / nettoOrdinario) * 100;
    const pressioneTotaleOrdinaria = ((compensoAnnuoTfm - nettoOrdinario) / compensoAnnuoTfm) * 100;

    const chartData = [
      { name: 'Compenso Ordinario', netto: Math.round(nettoOrdinario), tasse: Math.round(prelievoFiscaleOrdinario + prelievoInpsOrdinario) },
      { name: 'Strategia TFM', netto: Math.round(nettoTfm), tasse: Math.round(prelievoTfmSeparata) }
    ];

    return {
      nettoOrdinario,
      prelievoFiscaleOrdinario,
      prelievoInpsOrdinario,
      nettoTfm,
      prelievoTfmSeparata,
      risparmioIresAzienda,
      guadagnoExtraNetto,
      efficienzaPercentuale,
      pressioneTotaleOrdinaria,
      chartData
    };
  }, [compensoAnnuoTfm, aliquotaMediaSocio, isGestioneSeparataInps, redditoPersonaleAltro]);

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-fade-in pb-24">
      
      {/* 1. HERO: IL POSIZIONAMENTO (RICCHEZZA DIFFERITA) */}
      <div className="bg-[#0f172a] rounded-[3.5rem] p-12 text-white shadow-2xl relative overflow-hidden border-b-8 border-amber-500">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-amber-600/10 to-transparent"></div>
        <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
           <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                 <div className="bg-amber-500 p-3 rounded-2xl shadow-xl shadow-amber-600/20"><Gem size={32} className="text-slate-900"/></div>
                 <span className="text-[11px] font-black uppercase tracking-[0.4em] text-amber-400 italic">Financial Engineering - Wealth Management B2B</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
                TFM: Estrarre <br/> <span className="text-amber-500 text-6xl">Utili Puliti.</span>
              </h1>
              <p className="text-slate-400 text-xl font-medium max-w-2xl leading-relaxed">
                "Dottore, il TFM non è un semplice accantonamento. È lo strumento legale per prelevare ricchezza dall'azienda **bypassando il 43% di IRPEF** e azzerando i contributi previdenziali."
              </p>
           </div>
           <div className="lg:col-span-4 bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 text-center">
              <p className="text-[10px] font-black uppercase text-amber-500 mb-2 tracking-widest italic">Guadagno Netto Extra</p>
              <p className="text-7xl font-black text-white tracking-tighter">+{audit.efficienzaPercentuale.toFixed(0)}%</p>
              <p className="text-[10px] font-bold text-emerald-400 uppercase mt-4 italic tracking-widest">Di capitale in tasca al Socio</p>
           </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* 2. SIDEBAR TECNICA: PARAMETRI DI AUDIT */}
        <div className="lg:col-span-4 space-y-6 no-print">
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm space-y-8">
             <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 italic">
                <Settings2 size={14} className="text-[#233D7B]" /> Audit Parametri Socio
             </h4>
             <div className="space-y-6">
                <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100">
                   <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">Quota Annuo TFM (€)</label>
                   <input type="number" value={compensoAnnuoTfm} onChange={(e) => setCompensoAnnuoTfm(Number(e.target.value))} className="w-full bg-transparent font-black text-3xl outline-none text-slate-900" />
                   <p className="text-[9px] text-slate-400 mt-1 uppercase italic font-bold">Importo che l'azienda deduce subito</p>
                </div>

                <div className="bg-indigo-50 p-5 rounded-3xl border border-indigo-200">
                   <label className="text-[10px] font-black text-indigo-700 uppercase block mb-1">Altri Redditi IRPEF (€)</label>
                   <input type="number" value={redditoPersonaleAltro} onChange={(e) => setRedditoPersonaleAltro(Number(e.target.value))} className="w-full bg-transparent font-black text-xl outline-none text-indigo-900" />
                   <p className="text-[9px] text-indigo-400 mt-1 font-bold italic">Determina lo scaglione marginale (43%)</p>
                </div>

                <div className="bg-amber-50 p-5 rounded-3xl border border-amber-200">
                   <div className="flex justify-between items-center mb-1">
                      <label className="text-[10px] font-black text-amber-700 uppercase">Aliquota Tassazione Separata (%)</label>
                      <span className="text-sm font-black text-amber-900">{aliquotaMediaSocio}%</span>
                   </div>
                   <input type="range" min="23" max="35" step="1" value={aliquotaMediaSocio} onChange={(e) => setAliquotaMediaSocio(Number(e.target.value))} className="w-full h-1.5 bg-amber-200 rounded-lg appearance-none accent-amber-600" />
                   <p className="text-[9px] text-amber-600 font-bold uppercase mt-2 italic leading-tight italic">Media IRPEF biennio precedente (Art. 17)</p>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                   <label className="text-[10px] font-black text-slate-600 uppercase">Inps Gestione Separata</label>
                   <button onClick={() => setIsGestioneSeparataInps(!isGestioneSeparataInps)} className={`px-4 py-1.5 rounded-xl text-[9px] font-black transition-all ${isGestioneSeparataInps ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-indigo-400'}`}>
                      {isGestioneSeparataInps ? 'ATTIVA (26%)' : 'ESENTE'}
                   </button>
                </div>
             </div>
          </div>

          <div className="bg-[#233D7B] p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group border-b-8 border-emerald-400">
             <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform"><Lock size={200} /></div>
             <h4 className="text-amber-400 text-[10px] font-black uppercase mb-4 tracking-widest italic flex items-center gap-2"><ShieldCheck size={14}/> Scudo Asset Art. 1923</h4>
             <p className="text-sm text-blue-100 leading-relaxed font-medium italic">
                "Dottore, il TFM in Zurich è **impignorabile**. Se domani l'azienda ha problemi, questi soldi sono legalmente fuori dalla portata dei creditori, salvaguardando il futuro della sua famiglia."
             </p>
          </div>
        </div>

        {/* 3. MAIN CONTENT: THE WEALTH BATTLE */}
        <div className="lg:col-span-8 space-y-8">
           
           <div className="bg-white rounded-[3rem] p-10 border border-slate-200 shadow-sm relative overflow-hidden">
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic mb-10 flex items-center gap-3 leading-none">
                 <TrendingUp className="text-indigo-600" /> Vantaggi della Tassazione Separata (Art. 17)
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8 mb-10">
                 {/* SCENARIO ORDINARIO */}
                 <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex flex-col justify-between group hover:bg-white hover:shadow-xl transition-all">
                    <div>
                       <div className="flex justify-between items-start mb-4">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">A) Prelievo Compenso</p>
                          <UserMinus size={18} className="text-rose-500" />
                       </div>
                       <p className="text-4xl font-black text-slate-900">{formatCurrency(audit.nettoOrdinario)}</p>
                       <p className="text-[9px] text-slate-500 font-bold uppercase mt-2">Netto Reale in tasca</p>
                    </div>
                    <div className="mt-8 pt-4 border-t border-slate-200">
                       <p className="text-[10px] font-black text-rose-500 uppercase italic">Pressione Totale: {audit.pressioneTotaleOrdinaria.toFixed(1)}%</p>
                       <p className="text-[9px] text-slate-400 leading-tight mt-1 italic">Viene tassato tutto allo scaglione massimo IRPEF (43%).</p>
                    </div>
                 </div>

                 {/* SCENARIO TFM */}
                 <div className="p-8 bg-emerald-50 rounded-[2.5rem] border-2 border-emerald-500 flex flex-col justify-between relative shadow-xl shadow-emerald-200/20 scale-105">
                    <div className="absolute top-2 right-2"><Sparkles className="text-emerald-500 animate-pulse" size={24}/></div>
                    <div>
                       <div className="flex justify-between items-start mb-4">
                          <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest italic">B) Strategia TFM Zurich</p>
                          <Award size={18} className="text-emerald-600" />
                       </div>
                       <p className="text-5xl font-black text-emerald-700">{formatCurrency(audit.nettoTfm)}</p>
                       <p className="text-[9px] text-emerald-500 font-black uppercase mt-2">Netto Differito Protetto</p>
                    </div>
                    <div className="mt-8 pt-4 border-t border-emerald-200">
                       <p className="text-[10px] font-black text-indigo-600 uppercase italic">Efficienza Netta: +{formatCurrency(audit.guadagnoExtraNetto)}</p>
                       <p className="text-[9px] text-slate-500 leading-tight mt-1 italic">Bypass IRPEF Marginale + Bypass Contributi INPS.</p>
                    </div>
                 </div>
              </div>

              <div className="h-[300px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={audit.chartData} barGap={0}>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                       <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fontStyle: 'italic', fontWeight: 900}} />
                       <YAxis hide />
                       <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '16px'}} />
                       <Bar dataKey="netto" name="Netto in Tasca" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} barSize={60} />
                       <Bar dataKey="tasse" name="Erosione Fiscale/INPS" stackId="a" fill="#f43f5e" radius={[10, 10, 0, 0]} barSize={60} />
                    </BarChart>
                 </ResponsiveContainer>
              </div>
           </div>

           {/* 4. MODULABILITÀ REDDITO E ASPETTI AMMINISTRATIVI */}
           <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-[3rem] p-10 border border-slate-200 shadow-sm space-y-6">
                 <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic flex items-center gap-3">
                    <ArrowDownNarrowWide className="text-amber-500" /> Modulabilità del Reddito
                 </h4>
                 <p className="text-sm text-slate-500 leading-relaxed font-medium">
                    "Il TFM le permette di **abbassare il suo imponibile IRPEF annuo**. Anziché prelevare tutto oggi pagando il 43%, sposta una quota nel futuro dove la pagherà circa il 25-27%. Questo 'livellamento' dei redditi abbatte l'aliquota media complessiva della sua vita lavorativa."
                 </p>
                 <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 text-xs font-bold text-amber-800 italic">
                    Leva: Arbitraggio Fiscale tra IRPEF Marginale e Tassazione Separata.
                 </div>
              </div>

              <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-xl space-y-6 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-5"><FileSignature size={150} /></div>
                 <h4 className="text-xl font-black uppercase tracking-tighter italic text-amber-400 flex items-center gap-3">
                    <CalendarSearch size={20} /> Obbligo della Data Certa
                 </h4>
                 <p className="text-sm text-slate-300 leading-relaxed font-medium italic">
                    "Dottore, per non avere problemi con l'Agenzia delle Entrate, la delibera del TFM deve avere **Data Certa Anteriore** all'inizio del mandato. Noi la blindiamo tramite PEC o Verbale Notarile."
                 </p>
                 <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-[10px] font-black text-emerald-400 uppercase">
                       <CheckCircle2 size={12} /> Verbale Assemblea Soci
                    </li>
                    <li className="flex items-center gap-2 text-[10px] font-black text-emerald-400 uppercase">
                       <CheckCircle2 size={12} /> PEC di Certificazione
                    </li>
                 </ul>
              </div>
           </div>

           {/* 5. CHECKLIST AMMINISTRATIVA TITOLARE */}
           <div className="bg-white rounded-[3rem] p-10 border border-slate-200 shadow-sm relative overflow-hidden">
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic mb-10 flex items-center gap-4">
                 <ListChecks className="text-indigo-600" /> Checklist di Setup per l'Amministratore
              </h3>
              
              <div className="grid md:grid-cols-3 gap-8">
                 {[
                   { step: "01", title: "Delibera TFM", desc: "Approvazione in sede di nomina amministratore con indicazione della quota annua." },
                   { step: "02", title: "Blindatura Legale", desc: "Invio del verbale via PEC per attribuire Data Certa (indispensabile per Art. 17)." },
                   { step: "03", title: "Polizza Zurich", desc: "Sottoscrizione del piano di accantonamento con vincolo di impignorabilità Art. 1923." }
                 ].map((item, i) => (
                    <div key={i} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 relative group hover:bg-white hover:shadow-xl transition-all">
                       <div className="w-10 h-10 rounded-xl bg-[#233D7B] text-white flex items-center justify-center font-black text-sm mb-4 shadow-lg">{item.step}</div>
                       <h5 className="font-black text-slate-800 uppercase text-xs mb-3 tracking-widest">{item.title}</h5>
                       <p className="text-[11px] text-slate-500 leading-relaxed font-bold italic">{item.desc}</p>
                    </div>
                 ))}
              </div>

              <div className="mt-10 p-8 bg-indigo-50 rounded-[2.5rem] border border-indigo-100 flex items-center gap-8">
                 <div className="bg-white p-5 rounded-full text-indigo-600 shadow-sm shrink-0"><Landmark size={32} /></div>
                 <div>
                    <h4 className="text-lg font-black text-indigo-900 uppercase italic mb-1">Vantaggio IRES 24%</h4>
                    <p className="text-sm text-indigo-700 leading-relaxed">
                       "Dottore, non dimentichi che l'azienda deduce l'importo TFM **nell'anno di accantonamento**. Significa che ogni 10.000€ di TFM, l'azienda ne paga 2.400€ in meno di IRES subito."
                    </p>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* 6. RIQUADRO NORMATIVO TUIR */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden group">
         <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic mb-8 flex items-center gap-3">
            <BookOpen className="text-indigo-600" /> Fondamenti del Testo Unico Imposte sui Redditi
         </h3>
         <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-indigo-300 transition-colors">
               <h4 className="font-black text-indigo-700 text-xs uppercase mb-2">Art. 17 TUIR</h4>
               <p className="text-[10px] text-slate-600 leading-relaxed italic">Definisce le indennità per la cessazione di rapporti di collaborazione coordinata e continuativa come soggette a **Tassazione Separata**.</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-indigo-300 transition-colors">
               <h4 className="font-black text-indigo-700 text-xs uppercase mb-2">Art. 105 TUIR</h4>
               <p className="text-[10px] text-slate-600 leading-relaxed italic">Sancisce la **Deducibilità per Competenza** delle quote TFM accantonate, indipendentemente dal momento dell'esborso finanziario.</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-indigo-300 transition-colors">
               <h4 className="font-black text-indigo-700 text-xs uppercase mb-2">Art. 2120 C.C.</h4>
               <p className="text-[10px] text-slate-600 leading-relaxed italic">Riconosce la natura previdenziale e risarcitoria dell'indennità differita, proteggendola da azioni revocatorie standard.</p>
            </div>
         </div>
      </div>

      {/* FOOTER METODOLOGICO */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
         <div className="flex items-center gap-6">
            <div className="bg-[#0f172a] p-4 rounded-[1.5rem] text-white shadow-lg"><FileSignature size={32} /></div>
            <div>
               <p className="text-lg font-black text-slate-800 uppercase tracking-tighter leading-none mb-1">Fiscal TFM Engineering Audit 2026</p>
               <p className="text-[10px] text-slate-500 font-bold italic">Rif: Art. 17, 105 TUIR | Art. 1923 c.c. | Circolare AdE 29/2001 | Revisione Gruppo Vomero</p>
            </div>
         </div>
         <div className="text-right">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">DOCUMENTO AD USO INTERNO RISERVATO - CORPORATE UNIT</p>
         </div>
      </div>

    </div>
  );
};

export default TfmSimulatorView;
