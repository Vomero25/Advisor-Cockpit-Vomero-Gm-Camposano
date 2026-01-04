import React, { useState, useMemo } from 'react';
import { GoogleGenAI } from "@google/genai";
import { 
  Brain, Target, Ghost, Zap, Clock, ShieldCheck, HeartPulse, 
  ArrowRight, CheckCircle2, AlertTriangle, Sparkles, Quote,
  History, Info, MousePointer2, Landmark, LifeBuoy, TrendingUp,
  UserSearch, Eye, Skull, Coins, Umbrella, Scale, RefreshCw,
  Award, MessageSquare, Microscope, Loader2, Send, BrainCircuit,
  Fingerprint, Lightbulb, MessagesSquare, ChevronRight,
  BookOpen
} from 'lucide-react';

// --- CONFIGURAZIONE BIAS AVANZATA - LEVA PSICOLOGICA ---
const BIAS_QUESTIONS = [
  {
    id: 'bias_hyperbolic',
    label: 'Sconto Iperbolico (Present Bias)',
    text: "Immagini di ricevere un premio produzione di 5.164€. La sua mente visualizza istantaneamente un acquisto desiderato o il beneficio fiscale differito di 2.200€ che incasserà l'anno prossimo?",
    optionA: "Il desiderio immediato (Consumo)",
    optionB: "Il rimborso fiscale (Pianificazione)",
    impact: "Se sceglie A, il cliente vive solo nel presente. La strategia deve essere il 'Cashback Fiscale' immediato."
  },
  {
    id: 'bias_loss',
    label: 'Avversione alla Perdita Certificata',
    text: "Dottore, la spaventa di più un calo temporaneo dei mercati finanziari del 10% o la certezza di regalare allo Stato il 43% dei suoi risparmi perché non li ha dedotti?",
    optionA: "L'incertezza del mercato",
    optionB: "Il prelievo fiscale certo",
    impact: "Chi sceglie A teme il rischio. La leva è la Gestione Separata Zurich Trend (Capitale Protetto)."
  },
  {
    id: 'bias_accounting',
    label: 'Mental Accounting (Contabilità Mentale)',
    text: "Considera il suo TFR come un 'salvadanaio intoccabile' custodito dall'azienda o come un capitale di sua proprietà che deve rendere per contrastare l'inflazione?",
    optionA: "Salvadanaio intoccabile (Inertia)",
    optionB: "Capitale di proprietà (Efficienza)",
    impact: "Se sceglie A, il TFR è visto come un 'cassetto mentale' isolato. Serve spiegare il debito aziendale."
  },
  {
    id: 'bias_discontinuity',
    label: 'Future-Self Discontinuity',
    text: "Quando pensa a se stesso tra 30 anni, sente di descrivere una persona che conosce bene o percepisce un estraneo con bisogni che oggi le sembrano irreali?",
    optionA: "Un estraneo (Mancanza di connessione)",
    optionB: "Me stesso (Consapevolezza)",
    impact: "Se sceglie A, non risparmierà mai per un 'estraneo'. Serve lo scudo Zurich LTC (Protezione tenore di vita)."
  },
  {
    id: 'bias_overconfidence',
    label: 'Illusione di Controllo',
    text: "Ritiene che tenere i soldi sul conto corrente sia più sicuro rispetto a un contratto blindato dal Codice Civile (Art. 1923) che ne garantisce l'impignorabilità totale?",
    optionA: "Sì, preferisco il controllo immediato",
    optionB: "No, preferisco lo scudo legale",
    impact: "Chi sceglie A scambia disponibilità con sicurezza. La leva è l'Asset Protection e la segregazione patrimoniale."
  }
];

const ARCHETYPES = {
  IL_PROCRASTINATORE: {
    name: "Il Procrastinatore Iperbolico",
    description: "Soffre di un forte distacco dal 'sé futuro'. Vede il risparmio come una perdita di piacere presente anziché come un acquisto di libertà futura.",
    nudge: "Strategia 'Save More Tomorrow': concordare oggi che i futuri aumenti di reddito o bonus saranno destinati al fondo, annullando il dolore del sacrificio attuale.",
    product: "Anima Arti & Mestieri (Classe I) - Versamenti Flessibili."
  },
  IL_DIFENSORE: {
    name: "Il Difensore Ansioso",
    description: "Dominato dall'avversione alla perdita. Preferisce non guadagnare pur di avere la certezza di non vedere segni meno sul rendiconto.",
    nudge: "Nudge del 'Rendimento Fiscale': la deducibilità garantisce un guadagno certo del 43% (IRPEF) da subito. È un rendimento che nessun mercato può battere.",
    product: "Zurich Multinvest Shield (90% Gestione Separata Trend)."
  },
  IL_GHOST_SAVER: {
    name: "Il Ghost Saver (Mental Accounting)",
    description: "Persona che risparmia ma divide i soldi in compartimenti inefficienti. Lascia il TFR in azienda perché lo considera 'altro' rispetto al suo patrimonio.",
    nudge: "Audit del Debito: mostrare come il TFR in azienda sia un debito non garantito verso un soggetto privato, mentre nel fondo diventa proprietà privata blindata.",
    product: "Patrimonio Blindato Zurich (Asset Protection)."
  },
  IL_CONTROLLORE: {
    name: "Il Controllore Illuso",
    description: "Pensa che la liquidità sia sicurezza. Sottovaluta il rischio di pignorabilità dei conti bancari e l'erosione silenziosa del potere d'acquisto.",
    nudge: "Audit Legale Art. 1923: confrontare la vulnerabilità del C/C in caso di controversie civili con lo scudo costituzionale della previdenza.",
    product: "Zurich Spazio Previdenza - Opzione F (LTC)."
  }
};

const BehavioralFinanceView: React.FC = () => {
  const [step, setStep] = useState<number>(0); 
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, 'A' | 'B'>>({});
  
  // AI States
  const [aiResponse, setAiResponse] = useState<string>('');
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);

  const handleAnswer = (choice: 'A' | 'B') => {
    setAnswers(prev => ({ ...prev, [BIAS_QUESTIONS[currentIdx].id]: choice }));
    if (currentIdx < BIAS_QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setStep(2);
    }
  };

  const detectedArchetype = useMemo(() => {
    // Logica di profilazione raffinata
    if (answers['bias_hyperbolic'] === 'A' && answers['bias_discontinuity'] === 'A') return ARCHETYPES.IL_PROCRASTINATORE;
    if (answers['bias_loss'] === 'A') return ARCHETYPES.IL_DIFENSORE;
    if (answers['bias_overconfidence'] === 'A') return ARCHETYPES.IL_CONTROLLORE;
    return ARCHETYPES.IL_GHOST_SAVER;
  }, [answers, step]);

  const generateAiStrategy = async () => {
    setIsAiLoading(true);
    setAiResponse('');
    
    // Initialize GoogleGenAI inside the function as per guidelines
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `
      Agisci come un Master Coach in Psicologia della Vendita Finanziaria per il Gruppo Vomero.
      Il tuo obiettivo è fornire a un consulente uno script di chiusura personalizzato.
      
      DATI CLIENTE:
      - Profilo Comportamentale: "${detectedArchetype.name}"
      - Descrizione Bias: "${detectedArchetype.description}"
      - Risposte ai Test: ${JSON.stringify(answers)}
      
      GENERA UNO SCRIPT STRUTTURATO COSI:
      1. EMPATIA TATTICA: Come validare il bias del cliente per farlo sentire compreso.
      2. LO SHOCK ANALITICO: Una domanda o un dato che smonti la sua falsa sicurezza (es. citando l'Art. 1923 o la svalutazione).
      3. LA SOLUZIONE "NUDGE": Come proporre il prodotto (${detectedArchetype.product}) non come investimento, ma come "cura" alla sua paura o inerzia.
      4. KILLER CLOSING: Una frase d'impatto finale che forzi la decisione.
      
      Usa un tono autorevole, persuasivo e molto tecnico ma comprensibile.
    `;

    try {
      // Use ai.models.generateContent directly as per guidelines
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });
      // Correctly access .text property
      setAiResponse(response.text || '');
    } catch (e) {
      setAiResponse("L'assistente strategico ha riscontrato un errore di rete. Riprova.");
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-fade-in pb-24">
      
      {/* HEADER NEURO-DESIGN */}
      <div className="bg-[#0a0f1d] rounded-[3.5rem] p-12 text-white shadow-2xl relative overflow-hidden border-b-8 border-indigo-600">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-600/10 to-transparent"></div>
        <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
           <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                 <div className="bg-indigo-600 p-3 rounded-2xl shadow-xl shadow-indigo-600/20"><BrainCircuit size={32} /></div>
                 <span className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-400 italic">Behavioral Audit Certification - Gruppo Vomero</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
                Odissea <br/> <span className="text-indigo-400">Previdenza</span>
              </h1>
              <p className="text-slate-400 text-xl font-medium max-w-2xl leading-relaxed">
                "La decisione finanziaria è per il 20% logica e per l'80% emozione. Usiamo la **Scienza del Nudge** per superare le barriere biologiche della mente."
              </p>
           </div>
           <div className="lg:col-span-4 bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 text-center relative group">
              <p className="text-[10px] font-black uppercase text-amber-500 mb-2 tracking-widest italic">Metodo Nobel Thaler</p>
              <p className="text-6xl font-black text-white tracking-tighter italic">Nudge</p>
              <p className="text-[10px] font-black text-indigo-300 uppercase mt-4 tracking-widest leading-tight italic">Diagnosi Comportamentale <br/> Avanzata 2025</p>
           </div>
        </div>
      </div>

      {step === 0 && (
        <div className="bg-white p-16 rounded-[4rem] border border-slate-200 shadow-sm text-center space-y-10 relative overflow-hidden">
           <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-50"></div>
           <div className="max-w-2xl mx-auto space-y-6 relative z-10">
              <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic">Pronto per l'Audit Psicologico?</h3>
              <p className="text-slate-500 text-lg font-medium leading-relaxed">
                "Dottore, prima di parlare di numeri dobbiamo capire come funziona il suo processo decisionale." <br/>
                Poni queste 5 domande al cliente e ottieni istantaneamente lo script di chiusura basato sui suoi bias.
              </p>
           </div>
           <button 
             onClick={() => setStep(1)}
             className="px-12 py-6 bg-[#0a0f1d] text-white rounded-3xl font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl flex items-center gap-4 mx-auto group"
           >
              Inizia la Diagnosi <ArrowRight className="group-hover:translate-x-2 transition-transform" />
           </button>
        </div>
      )}

      {step === 1 && (
        <div className="max-w-3xl mx-auto animate-fade-in">
           <div className="mb-8">
              <div className="flex justify-between text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">
                 <span>Analisi Bias {currentIdx + 1} / 5</span>
                 <span>{BIAS_QUESTIONS[currentIdx].label}</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                 <div className="h-full bg-indigo-600 transition-all duration-500" style={{width: `${(currentIdx + 1) * 20}%`}}></div>
              </div>
           </div>

           <div className="bg-white p-12 rounded-[4rem] border border-slate-200 shadow-2xl relative overflow-hidden flex flex-col justify-center min-h-[450px]">
              <div className="text-center space-y-12 relative z-10">
                 <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight tracking-tighter px-4">
                   {BIAS_QUESTIONS[currentIdx].text}
                 </h2>
                 <div className="grid md:grid-cols-2 gap-6 pt-4">
                    <button 
                      onClick={() => handleAnswer('A')} 
                      className="p-8 rounded-[2rem] border-2 border-slate-100 hover:border-indigo-500 hover:bg-indigo-50 transition-all group text-left relative overflow-hidden"
                    >
                       <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-10 transition-opacity"><Fingerprint size={80} /></div>
                       <p className="text-[10px] font-black text-slate-400 uppercase mb-2 group-hover:text-indigo-400 transition-colors">Opzione A</p>
                       <p className="font-bold text-slate-700 leading-snug">{BIAS_QUESTIONS[currentIdx].optionA}</p>
                    </button>
                    <button 
                      onClick={() => handleAnswer('B')} 
                      className="p-8 rounded-[2rem] border-2 border-slate-100 hover:border-indigo-500 hover:bg-indigo-50 transition-all group text-left relative overflow-hidden"
                    >
                       <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-10 transition-opacity"><Fingerprint size={80} /></div>
                       <p className="text-[10px] font-black text-slate-400 uppercase mb-2 group-hover:text-indigo-400 transition-colors">Opzione B</p>
                       <p className="font-bold text-slate-700 leading-snug">{BIAS_QUESTIONS[currentIdx].optionB}</p>
                    </button>
                 </div>
              </div>
              <div className="absolute -bottom-10 -right-10 opacity-[0.03] pointer-events-none"><Brain size={300} /></div>
           </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-10 animate-fade-in">
           <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-200 pb-8">
              <div>
                 <h3 className="text-sm font-black text-indigo-600 uppercase tracking-[0.3em] mb-2">Esito Diagnosi Comportamentale</h3>
                 <h2 className="text-5xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">Profilo: <span className="text-indigo-600">{detectedArchetype.name}</span></h2>
              </div>
              <button onClick={() => {setStep(0); setCurrentIdx(0); setAiResponse('');}} className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 hover:text-indigo-600 transition-colors bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100">
                 <RefreshCw size={14} /> Nuova Analisi
              </button>
           </div>

           <div className="grid lg:grid-cols-12 gap-8">
              {/* ANALISI ARCHETIPO */}
              <div className="lg:col-span-4 space-y-6">
                 <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:rotate-12 transition-transform"><UserSearch size={150} /></div>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Diagnosi Psicologica</h4>
                    <p className="text-xl font-bold text-slate-700 leading-relaxed italic mb-8">
                       "{detectedArchetype.description}"
                    </p>
                    <div className="p-5 bg-indigo-50 rounded-3xl border border-indigo-100">
                       <p className="text-[9px] font-black text-indigo-600 uppercase tracking-widest mb-1 italic">Focus Prodotto Consigliato:</p>
                       <p className="text-sm font-black text-slate-900 uppercase tracking-tight">{detectedArchetype.product}</p>
                    </div>
                 </div>

                 <div className="bg-indigo-900 p-10 rounded-[3rem] text-white shadow-xl relative overflow-hidden group border-b-8 border-amber-500">
                    <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform"><Zap size={200} /></div>
                    <h4 className="text-amber-400 text-[10px] font-black uppercase tracking-widest mb-6 italic flex items-center gap-2">
                       <Award size={14} /> La Spinta Gentile (Nudge)
                    </h4>
                    <p className="text-lg font-medium leading-relaxed italic relative z-10">
                       {detectedArchetype.nudge}
                    </p>
                 </div>
              </div>

              {/* SALES STRATEGY AI - COMPLETAMENTE OPERATIVA */}
              <div className="lg:col-span-8">
                 <div className="bg-white p-10 rounded-[4rem] border border-slate-200 shadow-xl relative overflow-hidden flex flex-col min-h-[650px] group">
                    <div className="absolute top-0 right-0 p-10 opacity-[0.02] group-hover:scale-110 transition-all pointer-events-none"><BrainCircuit size={400} /></div>
                    
                    <div className="flex justify-between items-center mb-10 relative z-10">
                       <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic flex items-center gap-3">
                          <Sparkles className="text-indigo-600" /> Sales Strategy Assistant AI
                       </h3>
                       <span className="bg-indigo-50 text-indigo-600 text-[9px] font-black px-4 py-1.5 rounded-full border border-indigo-100 uppercase tracking-widest italic">Vomero AI Agent</span>
                    </div>

                    {!aiResponse && !isAiLoading && (
                       <div className="flex-1 flex flex-col items-center justify-center text-center space-y-10 animate-fade-in relative z-10">
                          <div className="bg-slate-50 p-10 rounded-full shadow-inner ring-8 ring-indigo-50/50"><BrainCircuit size={80} className="text-indigo-600" /></div>
                          <div className="max-w-md">
                             <p className="text-xl font-black text-slate-800 uppercase tracking-tight">Genera lo Script di Vendita</p>
                             <p className="text-sm text-slate-500 mt-3 font-medium leading-relaxed">
                                L'IA analizzerà i bias rilevati (<strong>{Object.keys(answers).length} punti mappati</strong>) per creare argomentazioni d'urto specifiche per questo cliente.
                             </p>
                          </div>
                          <button 
                            onClick={generateAiStrategy}
                            className="px-12 py-6 bg-indigo-600 text-white rounded-[2rem] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl flex items-center gap-4 group"
                          >
                             Elabora Strategia Chiusura <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                          </button>
                       </div>
                    )}

                    {isAiLoading && (
                       <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 animate-pulse relative z-10">
                          <Loader2 size={64} className="animate-spin text-indigo-600" />
                          <div className="space-y-2">
                             <p className="text-xs font-black uppercase text-indigo-400 tracking-[0.3em]">Analizzando la Psicologia del Cliente...</p>
                             <p className="text-[10px] text-slate-400 font-bold uppercase">Mappatura Bias Kahneman/Thaler in corso</p>
                          </div>
                       </div>
                    )}

                    {aiResponse && (
                       <div className="animate-fade-in relative z-10 h-full flex flex-col">
                          <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 flex-1 relative overflow-y-auto custom-scrollbar shadow-inner">
                             <Quote className="absolute -top-4 -left-2 text-indigo-100" size={100} />
                             <div className="prose prose-slate max-w-none text-slate-700 font-medium leading-relaxed whitespace-pre-wrap relative z-10">
                                {aiResponse}
                             </div>
                          </div>
                          <div className="mt-8 grid md:grid-cols-2 gap-4">
                             <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-3">
                                <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600"><Lightbulb size={20} /></div>
                                <span className="text-[10px] font-black uppercase text-emerald-800 tracking-widest">Strategia Evidence-Based</span>
                             </div>
                             <button onClick={generateAiStrategy} className="p-5 bg-slate-900 text-white hover:bg-indigo-600 rounded-2xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest transition-all shadow-lg group">
                                <RefreshCw size={16} className="group-hover:rotate-180 transition-transform duration-500" /> Rigenera Script AI
                             </button>
                          </div>
                       </div>
                    )}
                 </div>
              </div>
           </div>

           {/* EVIDENCE LITERATURE - KNOWLEDGE BASE */}
           <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden">
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic mb-10 flex items-center gap-3">
                 <Microscope className="text-indigo-600" /> Behavioral Literature Advisor Kit
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                 {[
                   { title: "Nudge", author: "R. Thaler (Nobel)", concept: "L'architettura delle scelte influenza le decisioni finanziarie a lungo termine." },
                   { title: "Thinking, Fast and Slow", author: "D. Kahneman (Nobel)", concept: "Il Sistema 1 domina la paura delle perdite; il Sistema 2 gestisce la previdenza." },
                   { title: "Sconto Iperbolico", author: "D. Laibson", concept: "Spiega perché preferiamo 100€ oggi a 110€ tra un mese, distruggendo la vecchiaia." }
                 ].map((lit, i) => (
                    <div key={i} className="p-8 bg-slate-50 rounded-3xl border border-slate-100 group hover:border-indigo-400 transition-all hover:bg-white hover:shadow-xl relative overflow-hidden">
                       <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:scale-110 transition-transform"><BookOpen size={100} /></div>
                       <h4 className="font-black text-indigo-700 text-lg uppercase tracking-tight mb-1 leading-none">{lit.title}</h4>
                       <p className="text-[10px] font-black text-slate-400 uppercase mb-4 italic tracking-widest">Rif: {lit.author}</p>
                       <p className="text-xs text-slate-600 font-medium leading-relaxed">{lit.concept}</p>
                    </div>
                 ))}
              </div>
           </div>

           {/* FOOTER EXECUTIVO */}
           <div className="bg-white p-10 rounded-[3rem] border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
              <div className="flex items-center gap-6">
                 <div className="bg-[#0a0f1d] p-4 rounded-[1.5rem] text-white shadow-lg"><Brain size={32} /></div>
                 <div>
                    <p className="text-lg font-black text-slate-800 uppercase tracking-tighter leading-none mb-1">Behavioral Audit Certification</p>
                    <p className="text-xs text-slate-500 font-bold italic">Rif: Behavioral Economics Toolkit 2025 | Metodo Gruppo Vomero</p>
                 </div>
              </div>
              <div className="text-right">
                 <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">DOCUMENTO AD USO INTERNO - CONFIDENTIAL STRATEGY</p>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default BehavioralFinanceView;
