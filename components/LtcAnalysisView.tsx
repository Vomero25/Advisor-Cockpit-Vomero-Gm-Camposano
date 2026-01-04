
import React, { useState, useMemo } from 'react';
import { GoogleGenAI } from "@google/genai";
import { LTC_DATA, LTC_MARKET_INSIGHTS } from '../constants';
import { 
  ShieldAlert, HeartPulse, TrendingDown, Stethoscope, Scale, 
  Info, Zap, Calculator, ShieldCheck, Heart, ArrowRight,
  UserCheck, Timer, Sparkles, BookOpen, Quote, Microscope,
  AlertTriangle, Siren, ExternalLink, Link as LinkIcon,
  Loader2, Send, Search, Users, Coins, ShieldPlus, CheckCircle2, Globe, Target
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const formatCurrency = (val: number) => 
  new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);

const LtcAnalysisView: React.FC = () => {
  // Input Utente per Simulatore
  const [savings, setSavings] = useState<number>(300000);
  const [careExpense, setCareExpense] = useState<number>(3000); // Costo medio RSA/Assistenza
  const [pensionAnnuity, setPensionAnnuity] = useState<number>(1500);
  
  // Stati per AI Grounding
  const [aiLoading, setAiLoading] = useState(false);
  const [aiReport, setAiReport] = useState<string | null>(null);
  const [sources, setSources] = useState<Array<{title: string, uri: string}>>([]);

  // --- MOTORE DI CALCOLO LONGEVITÀ ---
  const calculation = useMemo(() => {
    const aid = LTC_DATA.INDENNITA_ACCOMPAGNAMENTO_2025; // ~531€
    const monthlyDeficit = Math.max(0, careExpense - aid - pensionAnnuity);
    const annualDeficit = monthlyDeficit * 12;
    
    // Simulazione esaurimento risparmi
    const depletionData = [];
    let currentSavings = savings;
    for (let i = 0; i <= 20; i++) {
        depletionData.push({ 
          year: `Anno ${i}`, 
          value: Math.max(0, currentSavings),
          loss: annualDeficit * i
        });
        currentSavings -= annualDeficit;
    }
    const yearsToZero = annualDeficit > 0 ? Math.floor(savings / annualDeficit) : 99;

    // Zurich Option F (Raddoppio Rendita)
    const zurichOptionFAnnuity = pensionAnnuity * 2;
    const zurichGapAfterOptionF = Math.max(0, careExpense - (zurichOptionFAnnuity + aid));

    return { aid, monthlyDeficit, annualDeficit, depletionData, yearsToZero, zurichOptionFAnnuity, zurichGapAfterOptionF };
  }, [savings, careExpense, pensionAnnuity]);

  // --- AI STRATEGY GENERATOR CON GROUNDING ---
  const generateLongevityReport = async () => {
    setAiLoading(true);
    setAiReport(null);
    setSources([]);

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `Analizza il rischio longevità in Italia nel 2025. 
    1. Qual è il costo medio reale di una RSA privata al Nord vs Sud?
    2. Quanti sono i caregivers familiari in Italia?
    3. Qual è l'impatto economico medio su una famiglia in caso di Alzheimer?
    Recupera dati certi e cita le fonti ISTAT o Ministero della Salute. 
    Struttura la risposta come un report professionale per un consulente del Gruppo Vomero.`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }]
        }
      });

      setAiReport(response.text || '');
      // Estrazione fonti come da linee guida
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (chunks) {
        const extractedSources = chunks
          .filter((c: any) => c.web)
          .map((c: any) => ({ title: c.web.title, uri: c.web.uri }));
        setSources(extractedSources);
      }
    } catch (e) {
      setAiReport("Errore nel recupero dei dati di mercato. Verifica la connessione.");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-fade-in pb-24">
      
      {/* 1. HERO - IL RISCHIO SILENZIOSO */}
      <div className="bg-[#0f172a] rounded-[3.5rem] p-12 text-white shadow-2xl relative border-b-8 border-rose-600 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-rose-600/10 to-transparent"></div>
        <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
           <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                 <div className="bg-rose-600 p-3 rounded-2xl shadow-xl shadow-rose-600/20"><HeartPulse size={32} className="text-white"/></div>
                 <span className="text-[11px] font-black uppercase tracking-[0.4em] text-rose-400 italic">Longevity Risk Unit - Gruppo Vomero</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
                Longevity <br/> <span className="text-rose-500 text-6xl italic">Erosion Lab</span>
              </h1>
              <p className="text-slate-400 text-xl font-medium max-w-2xl leading-relaxed">
                Il rischio longevità non è vivere a lungo, ma <strong>sopravvivere ai propri risparmi</strong>. In Italia, l'80% della ricchezza di una vita può sparire in soli 5 anni di assistenza non programmata.
              </p>
           </div>
           <div className="lg:col-span-4 bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 text-center relative overflow-hidden group">
              <p className="text-[10px] font-black uppercase text-rose-400 mb-2 tracking-widest italic">Autonomia Finanziaria Stimata</p>
              <p className="text-7xl font-black text-white tracking-tighter">{calculation.yearsToZero} <span className="text-xl">Anni</span></p>
              <p className="text-[10px] font-black text-rose-300 uppercase mt-4 tracking-widest leading-tight">Prima dell'azzeramento <br/> del patrimonio liquido</p>
           </div>
        </div>
      </div>

      {/* 2. ANALIZZATORE DI DEFICIT ASSISTENZIALE */}
      <div className="grid lg:grid-cols-12 gap-8">
         {/* Sidebar Input */}
         <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm space-y-8">
               <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Calculator size={14} className="text-rose-600" /> Stress Test Patrimoniale
               </h4>
               <div className="space-y-6">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                     <label className="text-[10px] font-black text-slate-500 uppercase block mb-1">Capitale Liquido da Proteggere (€)</label>
                     <input type="number" value={savings} onChange={(e) => setSavings(Number(e.target.value))} className="w-full bg-transparent font-black text-2xl outline-none text-slate-900" />
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                     <div className="flex justify-between items-center mb-1">
                        <label className="text-[10px] font-black text-slate-500 uppercase">Costo Mensile Assistenza (RSA/24h)</label>
                        <span className="text-xs font-black text-rose-600">{formatCurrency(careExpense)}</span>
                     </div>
                     <input type="range" min="1500" max="6000" step="100" value={careExpense} onChange={(e) => setCareExpense(Number(e.target.value))} className="w-full h-1.5 bg-rose-200 rounded-lg appearance-none accent-rose-600" />
                  </div>
                  <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
                     <label className="text-[10px] font-black text-indigo-500 uppercase block mb-1">Rendita Pensionistica Base (€)</label>
                     <input type="number" value={pensionAnnuity} onChange={(e) => setPensionAnnuity(Number(e.target.value))} className="w-full bg-transparent font-black text-2xl outline-none text-indigo-800" />
                  </div>
               </div>
            </div>

            <div className="bg-rose-900 p-8 rounded-[2.5rem] text-white shadow-xl relative group overflow-hidden border-b-8 border-rose-500">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><Siren size={150} /></div>
               <h4 className="text-rose-400 text-[10px] font-black uppercase mb-4 tracking-widest italic">Allerta Deficit Annuale</h4>
               <p className="text-4xl font-black text-white">{formatCurrency(calculation.annualDeficit)}</p>
               <p className="text-xs text-rose-300 mt-2 font-medium italic">Capitale che deve essere "prelevato" ogni anno dai risparmi o dai figli per coprire la cura.</p>
            </div>
         </div>

         {/* Grafico Erosione */}
         <div className="lg:col-span-8 bg-white rounded-[3rem] p-10 border border-slate-200 shadow-sm flex flex-col relative overflow-hidden">
            <div className="flex justify-between items-center mb-10">
               <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic flex items-center gap-3 leading-none">
                  <Timer className="text-rose-600" /> Curva di Erosione Ereditaria
               </h3>
               <div className="bg-slate-50 px-4 py-2 rounded-xl text-[10px] font-black text-slate-500 uppercase tracking-widest border border-slate-100 italic">
                  Ipotesi Prezzi Costanti 2025
               </div>
            </div>
            <div className="flex-1 h-[400px]">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={calculation.depletionData}>
                     <defs>
                        <linearGradient id="gradRed" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2}/><stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/></linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fontSize: 11, fontWeight: 'bold'}} />
                     <YAxis tickFormatter={(v) => `€${(v/1000).toFixed(0)}k`} axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                     <Tooltip contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'}} />
                     <Area type="monotone" dataKey="value" stroke="#f43f5e" strokeWidth={5} fill="url(#gradRed)" name="Patrimonio Residuo" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
            <div className="mt-8 p-6 bg-[#0f172a] rounded-3xl text-white flex items-center gap-6">
               <div className="bg-amber-500 p-3 rounded-2xl text-slate-900 shadow-lg animate-pulse"><AlertTriangle size={24} /></div>
               <div className="space-y-1">
                  <p className="text-sm font-black text-amber-500 uppercase tracking-tighter">Conseguenza Ereditaria:</p>
                  <p className="text-sm italic font-medium text-slate-300 leading-relaxed">
                    "Dottore, se lei non si protegge, tra {calculation.yearsToZero} anni i suoi figli erediteranno un debito anziché un patrimonio. La LTC non serve a lei, serve a proteggere la loro eredità."
                  </p>
               </div>
            </div>
         </div>
      </div>

      {/* 3. LOGICA COSTRUTTIVA ZURICH: OPTION F */}
      <div className="grid lg:grid-cols-12 gap-8">
         <div className="lg:col-span-7 bg-[#233D7B] rounded-[3.5rem] p-12 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 opacity-5 group-hover:scale-110 transition-transform"><ShieldCheck size={400} /></div>
            <div className="relative z-10">
               <div className="flex items-center gap-3 mb-8">
                  <div className="bg-amber-500 p-3 rounded-2xl text-[#233D7B] shadow-xl"><ShieldPlus size={28} /></div>
                  <h3 className="text-3xl font-black italic uppercase tracking-tighter">Zurich "Option F" Engineering</h3>
               </div>
               
               <div className="grid md:grid-cols-2 gap-10 items-center">
                  <div className="space-y-8">
                     <p className="text-blue-100 text-lg leading-relaxed font-medium">
                        Il **Fondo Pensione Zurich** include un automatismo unico: al verificarsi della non autosufficienza, la rendita **raddoppia istantaneamente**.
                     </p>
                     <ul className="space-y-4">
                        <li className="flex gap-4 items-center">
                           <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-amber-400 font-black italic">x2</div>
                           <span className="text-xs font-black uppercase tracking-widest">Moltiplicatore Rendita</span>
                        </li>
                        <li className="flex gap-4 items-center">
                           <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-emerald-400 font-black italic">0%</div>
                           <span className="text-xs font-black uppercase tracking-widest">Tassazione (Esente IRPEF)</span>
                        </li>
                        <li className="flex gap-4 items-center">
                           <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-indigo-400"><CheckCircle2 size={24}/></div>
                           <span className="text-xs font-black uppercase tracking-widest">Protocollo ADL (4 su 6)</span>
                        </li>
                     </ul>
                  </div>

                  <div className="bg-white/10 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 text-center shadow-2xl relative overflow-hidden">
                     <div className="absolute top-0 left-0 w-full h-1 bg-amber-500"></div>
                     <p className="text-[10px] font-black uppercase text-amber-400 mb-4 tracking-widest italic">Impatto Option F Zurich</p>
                     <div className="space-y-6">
                        <div>
                           <p className="text-[9px] text-blue-200 uppercase font-bold mb-1">Rendita Raddoppiata Mensile</p>
                           <p className="text-5xl font-black text-white tracking-tighter">{formatCurrency(calculation.zurichOptionFAnnuity)}</p>
                        </div>
                        <div className="pt-6 border-t border-white/10">
                           <p className="text-[9px] text-blue-200 uppercase font-bold mb-1">Gap Residuo Coperto dai Risparmi</p>
                           <p className={`text-3xl font-black ${calculation.zurichGapAfterOptionF > 500 ? 'text-rose-400' : 'text-emerald-400'}`}>
                              {formatCurrency(calculation.zurichGapAfterOptionF)}
                           </p>
                           <p className="text-[9px] text-blue-200 uppercase mt-2 italic">Un risparmio mensile del <strong>{(((calculation.monthlyDeficit - calculation.zurichGapAfterOptionF) / calculation.monthlyDeficit) * 100).toFixed(0)}%</strong></p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm relative overflow-hidden group">
               <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:rotate-12 transition-transform"><Microscope size={200} /></div>
               <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-6">
                  <Quote size={14} className="text-indigo-600" /> Il Valore dell'Indipendenza
               </h4>
               <p className="text-sm text-slate-600 leading-relaxed font-medium italic mb-6">
                  "Dottore, il 22% della spesa sanitaria in Italia è **out-of-pocket**. Quando la salute viene meno, la liquidità è l'unica cosa che garantisce la scelta tra una struttura mediocre e un'assistenza d'eccellenza."
               </p>
               <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Pillola Normativa:</p>
                  <p className="text-[11px] text-slate-900 font-bold leading-relaxed">
                     L'Art. 15 TUIR permette di **detrarre il 19%** dei premi per assicurazioni aventi per oggetto il rischio di non autosufficienza.
                  </p>
               </div>
            </div>

            <div className="bg-[#0a0f1d] rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-xl border-t-8 border-amber-500">
               <h4 className="text-xl font-black italic uppercase tracking-tighter text-amber-500 mb-4 flex items-center gap-2"><Siren size={20} /> Alert Demografico</h4>
               <p className="text-sm text-slate-400 leading-relaxed font-medium">
                  Entro il 2050 in Italia ci saranno **2,5 milioni** di anziani non autosufficienti. Il sistema sanitario nazionale sta già collassando sotto questo peso. Proteggersi non è un'opzione, è un dovere verso la propria prole.
               </p>
            </div>
         </div>
      </div>

      {/* 4. GROUNDING AI SECTION - EVIDENCE BASED ADVISORY */}
      <div className="bg-white rounded-[3rem] p-10 border border-slate-200 shadow-xl overflow-hidden relative group">
         <div className="absolute top-0 right-0 p-10 opacity-[0.02] group-hover:scale-110 transition-transform"><Globe size={300} /></div>
         
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6 relative z-10">
            <div>
               <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic leading-none flex items-center gap-3">
                  <Sparkles className="text-amber-500" /> Evidence-Based Advisory
               </h3>
               <p className="text-slate-500 mt-2 font-medium italic">Validazione dei costi di assistenza con dati reali 2025 certificati dall'AI.</p>
            </div>
            <button 
              onClick={generateLongevityReport}
              disabled={aiLoading}
              className="bg-[#0f172a] hover:bg-indigo-600 disabled:bg-slate-300 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all shadow-xl flex items-center gap-3 group"
            >
               {aiLoading ? <Loader2 className="animate-spin" size={18} /> : <Zap size={18} className="text-amber-400" />}
               Interroga Market Intelligence
            </button>
         </div>

         {aiReport ? (
            <div className="space-y-8 animate-fade-in relative z-10">
               <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-200 prose prose-slate max-w-none shadow-inner">
                  <div className="flex items-center gap-2 mb-6">
                     <div className="bg-white p-2 rounded-xl border border-slate-200 text-indigo-600"><Target size={20} /></div>
                     <span className="text-[10px] font-black uppercase text-indigo-900 tracking-widest">Report Strategico Generato</span>
                  </div>
                  <div className="text-slate-700 font-medium whitespace-pre-wrap leading-relaxed italic text-base">
                     {aiReport}
                  </div>
               </div>

               {/* Grounding Sources - Mandatory */}
               {sources.length > 0 && (
                  <div className="space-y-4">
                     <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                        <LinkIcon size={14} /> Fonti e Riferimenti Verificati
                     </h4>
                     <div className="flex flex-wrap gap-3">
                        {sources.map((s, i) => (
                           <a 
                             key={i} href={s.uri} target="_blank" rel="noopener noreferrer"
                             className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-[#233D7B] hover:bg-indigo-50 transition-colors shadow-sm"
                           >
                              {s.title.substring(0, 40)}... <ExternalLink size={12} />
                           </a>
                        ))}
                     </div>
                  </div>
               )}
            </div>
         ) : (
            <div className="py-20 text-center border-4 border-dashed border-slate-100 rounded-[3rem]">
               <Microscope size={64} className="mx-auto text-slate-200 mb-4" />
               <p className="text-slate-400 font-black uppercase tracking-widest text-sm">Clicca per generare l'analisi di mercato aggiornata</p>
            </div>
         )}
      </div>

      {/* 5. FOOTER EXECUTIVO */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
         <div className="flex items-center gap-6">
            <div className="bg-[#0f172a] p-4 rounded-[1.5rem] text-white shadow-lg"><BookOpen size={32} /></div>
            <div>
               <p className="text-lg font-black text-slate-800 uppercase tracking-tighter leading-none mb-1">Longevity Strategy Lab - Gruppo Vomero</p>
               <p className="text-xs text-slate-500 font-bold italic">Rif: Art. 15 TUIR | Report OCSE "Pensions at a Glance" | Protocollo Zurich Spazio Previdenza | Edizione 03/2025</p>
            </div>
         </div>
      </div>

    </div>
  );
};

export default LtcAnalysisView;
