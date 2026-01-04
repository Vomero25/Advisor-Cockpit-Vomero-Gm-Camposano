
import React, { useState } from 'react';
import { generateAssistantResponse } from '../services/geminiService';
import { 
  BrainCircuit, Sparkles, User, Briefcase, Factory, Loader2, 
  Bot, MessageSquarePlus, Lightbulb, CheckCircle2, 
  History, Zap, Users, Crown, ShieldCheck, HeartPulse
} from 'lucide-react';

const NegotiationView: React.FC = () => {
  const [clientType, setClientType] = useState<string>('');
  const [clientNotes, setClientNotes] = useState<string>('');
  const [negotiationResult, setNegotiationResult] = useState<string>('');
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);

  const handleGenerateStrategy = async () => {
    if (!clientType) return;
    
    setIsAiLoading(true);
    setNegotiationResult('');

    let promptContext = "";
    
    switch(clientType) {
      case 'DIPENDENTE':
        promptContext = "Cliente: Lavoratore Dipendente. Focus: Conferimento TFR vs Liquidità in azienda (debito), Vantaggio fiscale deducibilità (anche per familiari a carico), Contributo datore di lavoro. Prodotto: Zurich Spazio Previdenza.";
        break;
      case 'AUTONOMO':
        promptContext = "Cliente: Libero Professionista / Partita IVA. Focus: Abbattimento carico fiscale immediato (deducibilità), Costruzione pensione integrativa per coprire il gap INPS, Flessibilità versamenti. Prodotto: Anima Arti & Mestieri.";
        break;
      case 'IMPRENDITORE':
        promptContext = "Cliente: Imprenditore (PMI). Focus: Vantaggi fiscali azienda (deduzione IRES 4-6%, esonero fondo garanzia), Gestione TFR come costo/debito CCII, Welfare aziendale come premio defiscalizzato. Prodotto: Zurich Spazio Previdenza.";
        break;
      case 'PENSIONATO':
        promptContext = "Cliente: Pensionato / Senior. Focus: 'Cashback Ereditario' (dedurre per lasciare di più agli eredi), Successione esente (Art. 12 D.Lgs 346/90), R.I.T.A. come scivolo fiscale, Protezione LTC per non pesare sui figli.";
        break;
      case 'GIOVANE':
        promptContext = "Cliente: Under 35 / Studente (o genitori per lui). Focus: Effetto 'Palla di Neve' (interesse composto su 35-40 anni), Deducibilità per familiari a carico (vantaggio per i genitori), Costruzione capitale per acquisto prima casa.";
        break;
      case 'FAMIGLIA':
        promptContext = "Cliente: Nucleo Familiare con minori. Focus: Protezione del reddito (Zurich Smart Protection 1+1=2), LTC per i genitori per tutelare il futuro dei figli, Accumulo educativo (PAC).";
        break;
      case 'PRIVATE':
        promptContext = "Cliente: Private / Wealth (HNWI). Focus: Asset Protection (impignorabilità/insequestrabilità Art. 1923), MultInvest 90% Gestione Separata per stabilità e ottimizzazione fiscale, Successione fuori asse ereditario.";
        break;
    }

    const notesContext = clientNotes ? `\nNote specifiche sul cliente: "${clientNotes}".` : "";

    const prompt = `Agisci come un senior sales coach d'élite esperto in previdenza e wealth management per il Gruppo Vomero.
    ${promptContext}
    ${notesContext}
    
    Genera una strategia di trattativa altamente persuasiva e tecnica, strutturata rigorosamente così:
    1. **Analisi del Bisogno Latente**: Qual è la paura o l'aspirazione profonda di questo profilo?
    2. **Leve di Ingaggio (The Hook)**: Una frase d'apertura "disruptive" che catturi l'attenzione.
    3. **3 Punti di Forza Tecnici**: Usa riferimenti normativi precisi (es. Art. 11 D.Lgs 252/05, Art. 1923 c.c.) e dati COVIP 2024.
    4. **Killer Objection Handling**: Come rispondere all'obiezione più ostica di questo profilo (es. "i soldi sono bloccati", "lo Stato cambierà le regole").
    5. **Call to Action**: Una proposta di chiusura per il prossimo step operativo.`;

    const response = await generateAssistantResponse(prompt);
    setNegotiationResult(response);
    setIsAiLoading(false);
  };

  const profiles = [
    { id: 'DIPENDENTE', label: 'Dipendente', icon: User, desc: 'TFR e contributo datore.' },
    { id: 'AUTONOMO', label: 'P. IVA / Prof.', icon: Briefcase, desc: 'Efficienza IRPEF e gap INPS.' },
    { id: 'IMPRENDITORE', label: 'Imprenditore', icon: Factory, desc: 'Debito TFR e Welfare PMI.' },
    { id: 'PENSIONATO', label: 'Pensionato', icon: History, desc: 'Successione e Cashback.' },
    { id: 'GIOVANE', label: 'Under 35', icon: Zap, desc: 'Snowball effect e genitori.' },
    { id: 'FAMIGLIA', label: 'Famiglia', icon: Users, desc: 'Protezione e LTC genitori.' },
    { id: 'PRIVATE', label: 'Private/Wealth', icon: Crown, desc: 'Scudo patrimoniale e MultInvest.' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-indigo-800 rounded-3xl p-10 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
             <div className="bg-purple-500 p-2 rounded-lg text-white shadow-lg">
                <BrainCircuit size={24} />
             </div>
             <span className="text-purple-300 font-black tracking-widest uppercase text-xs">Vomero AI Coach v2.0</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter italic">
            Sales <span className="text-purple-400">Strategist</span>
          </h2>
          <p className="text-indigo-100 mt-2 max-w-2xl text-lg font-medium">
            Seleziona il profilo del tuo cliente e genera una strategia commerciale basata su dati COVIP, normativa fiscale e psicologia della vendita.
          </p>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-white opacity-5 transform skew-x-12"></div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Selezione Profilo */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-black text-slate-800 mb-6 flex items-center gap-2 uppercase text-xs tracking-widest">
              <Users size={18} className="text-purple-600" />
              Seleziona Target
            </h3>
            
            <div className="grid grid-cols-1 gap-3">
              {profiles.map((profile) => (
                <button
                  key={profile.id}
                  onClick={() => setClientType(profile.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center gap-4 group ${clientType === profile.id ? 'border-purple-500 bg-purple-50 shadow-md ring-2 ring-purple-500/20' : 'border-slate-100 bg-slate-50/50 hover:bg-white hover:border-purple-200 hover:shadow-sm'}`}
                >
                  <div className={`p-3 rounded-xl transition-colors ${clientType === profile.id ? 'bg-purple-600 text-white shadow-lg' : 'bg-white text-slate-400 group-hover:text-purple-500 shadow-sm'}`}>
                    <profile.icon size={20} />
                  </div>
                  <div>
                    <h4 className={`font-black text-sm uppercase tracking-tight ${clientType === profile.id ? 'text-purple-900' : 'text-slate-700'}`}>{profile.label}</h4>
                    <p className="text-[10px] text-slate-500 font-bold leading-tight mt-0.5">{profile.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100">
              <label className="block text-[10px] font-black text-slate-400 uppercase mb-3 tracking-widest flex items-center gap-1.5">
                <MessageSquarePlus size={14} className="text-purple-600" />
                Note contestuali (Es. "Scettico", "Reddito 60k")
              </label>
              <textarea
                value={clientNotes}
                onChange={(e) => setClientNotes(e.target.value)}
                placeholder="Inserisci dettagli per personalizzare la risposta..."
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-4 focus:ring-purple-500/10 focus:bg-white outline-none resize-none h-28 transition-all font-medium"
              />
            </div>

            <button
              onClick={handleGenerateStrategy}
              disabled={!clientType || isAiLoading}
              className="w-full bg-slate-900 hover:bg-purple-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-black py-5 rounded-2xl shadow-xl transition-all flex justify-center items-center gap-3 mt-6 uppercase tracking-widest text-xs"
            >
              {isAiLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Analisi in corso...
                </>
              ) : (
                <>
                  <Sparkles size={20} className="text-amber-400" />
                  Genera Strategia
                </>
              )}
            </button>
          </div>
        </div>

        {/* Risultato AI */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-200 p-8 md:p-10 h-full min-h-[600px] flex flex-col relative overflow-hidden">
            {negotiationResult ? (
              <div className="animate-fade-in relative z-10">
                <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-purple-100 p-3 rounded-2xl">
                      <Bot size={28} className="text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 tracking-tighter">Strategia Generata</h3>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Modello: Gemini 3 Flash Intelligence</p>
                    </div>
                  </div>
                  <div className="hidden md:flex gap-2">
                     <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[9px] font-black rounded-full uppercase border border-emerald-100">Dati Certificati</span>
                     <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[9px] font-black rounded-full uppercase border border-indigo-100">Ready to Sell</span>
                  </div>
                </div>
                <div className="prose prose-slate max-w-none prose-p:text-slate-600 prose-p:font-medium prose-strong:text-slate-900 prose-h3:text-purple-700 prose-h3:font-black prose-h3:uppercase prose-h3:text-xs prose-h3:tracking-widest whitespace-pre-wrap leading-relaxed text-sm">
                  {negotiationResult}
                </div>
                
                <div className="mt-12 p-6 bg-slate-900 rounded-3xl text-white">
                   <div className="flex gap-4 items-start">
                      <Lightbulb className="text-amber-400 shrink-0" size={24} />
                      <div>
                         <p className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-1">Advisor Tip</p>
                         <p className="text-sm font-medium opacity-90 leading-relaxed italic">
                            "Usa queste argomentazioni non come un copione, ma come una traccia per guidare il cliente verso la soluzione Zurich/Anima più efficiente."
                         </p>
                      </div>
                   </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <div className="bg-slate-50 p-10 rounded-[3rem] mb-6 animate-pulse">
                  <BrainCircuit size={64} className="text-slate-200" />
                </div>
                <h4 className="font-black text-slate-400 uppercase tracking-widest text-sm">Pronto per la simulazione</h4>
                <p className="text-slate-400 text-sm max-w-xs mt-3 font-medium">
                  Scegli uno dei 7 profili a sinistra e clicca su "Genera Strategia" per ricevere il supporto dell'AI.
                </p>
              </div>
            )}
            
            {/* Background design elements */}
            <div className="absolute bottom-0 right-0 p-12 opacity-[0.02] pointer-events-none">
               <ShieldCheck size={400} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NegotiationView;
