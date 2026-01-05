
import React, { useState } from 'react';
import { generateAssistantResponse } from '../services/geminiService';
import { 
  BrainCircuit, Sparkles, User, Briefcase, Factory, Loader2, 
  Bot, MessageSquarePlus, Lightbulb, CheckCircle2, 
  History, Zap, Users, Crown, ShieldCheck, HeartPulse,
  Stethoscope, Landmark, Heart, GraduationCap, MessagesSquare,
  Quote, ChevronRight, Send, AlertOctagon, Target, Microscope,
  Trophy, Siren, Sword, ShieldAlert, ZapOff, Handshake,
  Clock, Lock, Car, Building, Activity, ShieldPlus,
  Copy, FileDown, Printer
} from 'lucide-react';

const OBJECTIONS = [
  { id: 'LIQUIDITY', label: 'Mancanza di Liquidità', desc: '"I soldi sono bloccati troppo a lungo"' },
  { id: 'REAL_ESTATE', label: 'Focus Immobiliare', desc: '"Preferisco investire nel mattone"' },
  { id: 'STATE_TRUST', label: 'Sfiducia nello Stato', desc: '"Cambieranno le leggi e le tasse"' },
  { id: 'COSTS', label: 'Obiezione Costi', desc: '"Le commissioni sono troppo alte"' },
  { id: 'MARKET_FEAR', label: 'Paura del Mercato', desc: '"E se i mercati crollano?"' },
  { id: 'LEGACY', label: 'Eredità', desc: '"Voglio lasciare tutto ai figli senza vincoli"' }
];

const ARCHETYPES = [
  { id: 'SKEPTIC', label: 'Lo Scettico Analitico', icon: Microscope },
  { id: 'PROCRASTINATOR', label: 'Il Procrastinatore', icon: Clock },
  { id: 'CONSERVATIVE', label: 'Il Super Conservativo', icon: Lock },
  { id: 'EMOTIONAL', label: 'L\'Emotivo/Ansioso', icon: HeartPulse }
];

const NegotiationView: React.FC = () => {
  const [clientType, setClientType] = useState<string>('');
  const [objectionType, setObjectionType] = useState<string>('');
  const [clientArchetype, setClientArchetype] = useState<string>('');
  const [clientNotes, setClientNotes] = useState<string>('');
  const [negotiationResult, setNegotiationResult] = useState<string>('');
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);

  const handleGenerateStrategy = async () => {
    if (!clientType) return;
    
    setIsAiLoading(true);
    setNegotiationResult('');

    const prompt = `
      Agisci come il Direttore Commerciale d'élite del Gruppo Vomero. Il tuo compito è fare COACHING QUALITATIVO a un consulente finanziario per chiudere una trattativa complessa.
      
      DATI TRATTATIVA:
      - Profilo Cliente: ${clientType}
      - Archetipo Psicologico: ${clientArchetype || 'Non specificato'}
      - Obiezione Principale: ${objectionType ? OBJECTIONS.find(o => o.id === objectionType)?.desc : 'Nessuna specifica'}
      - Note del Consulente: "${clientNotes || 'Nessuna nota aggiuntiva'}"

      STRUTTURA IL TUO COACHING IN QUESTO MODO (Usa un tono autorevole, tecnico ed elitario):
      
      1. **ANALISI DEL BIAS**: Identifica quale errore cognitivo sta bloccando il cliente (es. Avversione alla perdita, Sconto iperbolico, Mental Accounting). Spiega al consulente come "disinnescarlo".
      
      2. **LA LEVA NORMATIVA (LO SCUDO)**: Fornisce i riferimenti legali precisi (Art. 1923 c.c., Art. 12 D.Lgs 346/90, Art. 11 D.Lgs 252/05, Art. 17 o 105 TUIR se applicabile) per trasformare il prodotto in una soluzione giuridica indiscutibile.
      
      3. **TECNICA DI RE-FRAMING**: Come ribaltare l'obiezione principale. Non rispondere "difendendoti", ma "attaccando" con una prospettiva di rischio diversa (es. il rischio di non fare nulla).
      
      4. **SCRIPT DI CHIUSURA "VOMERO STYLE"**: Fornisci un dialogo serrato e persuasivo, usando metafore potenti (es. l'assegno circolare per i figli, il congelatore fiscale, lo scudo anti-creditori).
      
      5. **ACTION PLAN & NUDGE**: I 3 passi immediati e il suggerimento comportamentale (linguaggio del corpo, tono di voce).
    `;

    const response = await generateAssistantResponse(prompt);
    setNegotiationResult(response);
    setIsAiLoading(false);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(negotiationResult);
    alert("Script copiato negli appunti!");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in pb-24">
      {/* Header Executive */}
      <div className="bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900 rounded-[3.5rem] p-12 text-white shadow-2xl relative overflow-hidden border-b-8 border-purple-500 no-print">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white opacity-[0.03] transform skew-x-12"></div>
        <div className="relative z-10 grid lg:grid-cols-12 gap-10 items-center">
           <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                 <div className="bg-purple-500 p-3 rounded-2xl shadow-xl shadow-purple-600/20">
                    <BrainCircuit size={32} className="text-white" />
                 </div>
                 <span className="text-purple-300 font-black tracking-[0.4em] uppercase text-xs italic">Vomero Elite Coaching Lab v4.2</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic uppercase leading-none">
                Sales <span className="text-purple-400">Strategist</span>
              </h1>
              <p className="text-indigo-100 text-xl font-medium max-w-2xl leading-relaxed">
                Personalizza la tua proposizione consulenziale. Il Coach AI analizza i target e blinda la tua strategia d'urto.
              </p>
           </div>
           <div className="lg:col-span-4 bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 text-center relative group">
              <p className="text-[10px] font-black uppercase text-amber-400 mb-2 tracking-widest italic">Success Rate Advisor</p>
              <p className="text-6xl font-black text-white tracking-tighter">AI</p>
              <p className="text-[10px] font-black text-indigo-300 uppercase mt-4 tracking-widest italic">Powered by Gemini 3 <br/> & Vomero Wisdom</p>
           </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* INPUT PANEL - IL LABORATORIO */}
        <div className="lg:col-span-4 space-y-6 no-print">
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 p-8 space-y-8">
            
            {/* 1. Target Cliente */}
            <div className="space-y-4">
              <h3 className="font-black text-slate-800 flex items-center gap-2 uppercase text-[10px] tracking-[0.2em] italic">
                <Target size={16} className="text-purple-600" />
                1. Profilo Cliente
              </h3>
              <select 
                value={clientType} 
                onChange={(e) => setClientType(e.target.value)}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-purple-500/10 transition-all appearance-none"
              >
                <option value="">Seleziona Target...</option>
                <optgroup label="Dipendenti">
                  <option value="DIPENDENTE">Dipendente Privato (TFR)</option>
                  <option value="DIP_PUBBLICO">Dipendente Pubblico (TFS)</option>
                </optgroup>
                <optgroup label="Professionisti & Autonomi">
                  <option value="AGENTE_ENASARCO">Agente di Commercio (Enasarco)</option>
                  <option value="MEDICO">Medico / Libero Prof.</option>
                  <option value="FORFETTARIO">Partita IVA (Forfettario)</option>
                  <option value="SPORTIVO">Sportivo Professionista</option>
                </optgroup>
                <optgroup label="Impresa & Wealth">
                  <option value="SOCIO_SRL">Socio SRL (TFM vs Dividendi)</option>
                  <option value="IMPRENDITORE">Imprenditore / PMI</option>
                  <option value="PRIVATE">Cliente Wealth / Private</option>
                </optgroup>
                <optgroup label="Famiglia & Sociale">
                  <option value="CONVIVENTI">Coppia Convivente</option>
                  <option value="PENSIONATO">Pensionato / Successione</option>
                </optgroup>
              </select>
            </div>

            {/* 2. Archetipo Psicologico */}
            <div className="space-y-4">
              <h3 className="font-black text-slate-800 flex items-center gap-2 uppercase text-[10px] tracking-[0.2em] italic">
                <Users size={16} className="text-purple-600" />
                2. Archetipo Psicologico
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {ARCHETYPES.map(a => (
                  <button
                    key={a.id}
                    onClick={() => setClientArchetype(a.id)}
                    className={`p-4 rounded-2xl border-2 text-center transition-all ${clientArchetype === a.id ? 'border-purple-600 bg-purple-50 shadow-md' : 'border-slate-50 bg-slate-50/50 hover:bg-white'}`}
                  >
                    <a.icon size={20} className={`mx-auto mb-2 ${clientArchetype === a.id ? 'text-purple-600' : 'text-slate-400'}`} />
                    <span className={`text-[9px] font-black uppercase ${clientArchetype === a.id ? 'text-purple-900' : 'text-slate-500'}`}>{a.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Gestione Obiezioni */}
            <div className="space-y-4">
              <h3 className="font-black text-slate-800 flex items-center gap-2 uppercase text-[10px] tracking-[0.2em] italic">
                <ShieldAlert size={16} className="text-purple-600" />
                3. Obiezione Principale
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {OBJECTIONS.map(o => (
                  <button
                    key={o.id}
                    onClick={() => setObjectionType(o.id)}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex justify-between items-center ${objectionType === o.id ? 'border-purple-600 bg-purple-50 shadow-md' : 'border-slate-50 bg-slate-50/50'}`}
                  >
                    <div>
                      <p className={`text-[10px] font-black uppercase ${objectionType === o.id ? 'text-purple-900' : 'text-slate-700'}`}>{o.label}</p>
                      <p className="text-[9px] text-slate-400 italic mt-0.5">{o.desc}</p>
                    </div>
                    {objectionType === o.id && <CheckCircle2 size={14} className="text-purple-600" />}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Note Libere */}
            <div className="space-y-4">
              <h3 className="font-black text-slate-400 flex items-center gap-2 uppercase text-[10px] tracking-[0.2em] italic">
                <MessageSquarePlus size={16} />
                4. Dettagli sul Campo
              </h3>
              <textarea
                value={clientNotes}
                onChange={(e) => setClientNotes(e.target.value)}
                placeholder="Es. 'Teme il crollo dell'euro', 'Deve ristrutturare casa tra 5 anni'..."
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:ring-4 focus:ring-purple-500/10 focus:bg-white outline-none resize-none h-32 transition-all shadow-inner"
              />
            </div>

            <button
              onClick={handleGenerateStrategy}
              disabled={!clientType || isAiLoading}
              className="w-full bg-slate-900 hover:bg-purple-700 disabled:bg-slate-200 text-white font-black py-6 rounded-[2rem] shadow-xl transition-all flex justify-center items-center gap-3 uppercase tracking-widest text-xs group"
            >
              {isAiLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Analisi Qualitativa...
                </>
              ) : (
                <>
                  <Sword size={18} className="text-amber-400 group-hover:rotate-12 transition-transform" />
                  Genera Coaching Strategico
                </>
              )}
            </button>
          </div>
        </div>

        {/* RESULTS PANEL - LA WAR ROOM */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-[3.5rem] shadow-xl border border-slate-200 p-10 h-full min-h-[800px] flex flex-col relative overflow-hidden group">
            {negotiationResult ? (
              <div className="animate-fade-in relative z-10 h-full flex flex-col">
                <div className="flex items-center justify-between mb-10 border-b border-slate-100 pb-8">
                  <div className="flex items-center gap-5">
                    <div className="bg-purple-100 p-5 rounded-[2rem] shadow-inner">
                      <Bot size={40} className="text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">Vomero Closing Plan</h3>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-2 flex items-center gap-2">
                         <Microscope size={12} /> Strategic Intelligence: Gemini 3 Flash
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 no-print">
                     <button 
                        onClick={handleCopyToClipboard}
                        className="p-3 bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all shadow-sm border border-slate-200"
                        title="Copia Script"
                      >
                        <Copy size={18} />
                      </button>
                     <button 
                        onClick={handlePrint}
                        className="p-3 bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all shadow-sm border border-slate-200"
                        title="Stampa Report"
                      >
                        <Printer size={18} />
                      </button>
                     <span className="hidden md:flex px-4 py-1.5 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-full uppercase border border-emerald-100 items-center gap-2 shadow-sm ml-2">
                        <CheckCircle2 size={12} /> Coaching Qualitativo
                     </span>
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto custom-scrollbar pr-6 print:overflow-visible">
                  <div className="prose prose-slate max-w-none 
                    prose-p:text-slate-600 prose-p:text-lg prose-p:font-medium prose-p:leading-relaxed 
                    prose-strong:text-slate-900 prose-strong:font-black
                    prose-h3:text-purple-700 prose-h3:font-black prose-h3:uppercase prose-h3:text-sm prose-h3:tracking-widest prose-h3:mt-8 prose-h3:mb-4
                    prose-ul:text-slate-600 prose-li:mb-2
                    whitespace-pre-wrap">
                    {negotiationResult}
                  </div>
                </div>
                
                {/* Footer del risultato */}
                <div className="mt-12 p-8 bg-slate-950 rounded-[3rem] text-white relative overflow-hidden border-l-8 border-amber-500 shadow-2xl no-print">
                   <div className="absolute top-0 right-0 p-4 opacity-5 rotate-12"><Trophy size={180} /></div>
                   <div className="flex gap-8 items-start relative z-10">
                      <div className="bg-amber-500 p-4 rounded-2xl text-slate-950 shadow-xl shrink-0">
                         <MessagesSquare size={32} />
                      </div>
                      <div>
                         <p className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500 mb-2 italic">Prossimo Step Operativo</p>
                         <p className="text-lg font-bold opacity-90 leading-relaxed italic">
                            "Non chiudere mai parlando di costi. Chiudi chiedendo: 'Preferisce che il suo patrimonio sia sotto attacco o sotto scudo legale?'"
                         </p>
                      </div>
                   </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-12">
                <div className="bg-slate-50 p-16 rounded-[5rem] mb-10 shadow-inner group-hover:scale-105 transition-transform duration-700">
                  <BrainCircuit size={100} className="text-slate-200 group-hover:text-purple-200 transition-colors" />
                </div>
                <div className="max-w-md space-y-4">
                  <h4 className="font-black text-slate-800 uppercase tracking-[0.3em] text-xl italic">In attesa del briefing...</h4>
                  <p className="text-slate-400 text-lg font-medium leading-relaxed">
                    Seleziona il target (ora inclusi Agenti, Soci e Sportivi). Il Coach AI analizzerà i bias e genererà la tua strategia d'urto.
                  </p>
                </div>
                <div className="mt-12 flex flex-wrap justify-center gap-4">
                   <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                      <Car size={14} className="text-indigo-500" /> Agenti Enasarco
                   </div>
                   <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                      <Building size={14} className="text-amber-500" /> Soci SRL (TFM)
                   </div>
                   <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                      <ShieldPlus size={14} className="text-emerald-500" /> P.IVA Forfettaria
                   </div>
                   <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                      <Activity size={14} className="text-rose-500" /> Career Short Sport
                   </div>
                </div>
              </div>
            )}
            
            {/* Elementi di design sfondo */}
            <div className="absolute bottom-0 right-0 p-12 opacity-[0.02] pointer-events-none">
               <Crown size={500} />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Metodologico */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm no-print">
         <div className="flex items-center gap-6">
            <div className="bg-slate-950 p-4 rounded-[1.5rem] text-white shadow-lg"><Handshake size={32} /></div>
            <div>
               <p className="text-lg font-black text-slate-800 uppercase tracking-tighter leading-none mb-1">Vomero Closing System v4.2</p>
               <p className="text-xs text-slate-500 font-bold italic">Metodo: Psicologia Comportamentale & Grounding Normativo (Art. 17 TUIR, Art. 1923 c.c.) | Advisor: GM Raffaele Camposano</p>
            </div>
         </div>
         <div className="text-right">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">INTERNAL COACHING TOOL - TOP SECRET</p>
         </div>
      </div>
    </div>
  );
};

export default NegotiationView;
