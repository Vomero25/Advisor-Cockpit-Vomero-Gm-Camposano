
import React, { useState } from 'react';
import { PageView } from '../types';
import { 
  User, Building2, ChevronRight, CheckCircle2, AlertTriangle, 
  ArrowRight, RefreshCw, ClipboardCheck, Briefcase, HeartHandshake, 
  Factory, ShieldAlert, Coins, Calculator, Scale, TrendingUp, Users,
  ChevronLeft, BarChart3, Target, HeartPulse, Umbrella, ShieldCheck,
  PiggyBank, LineChart, Key, Siren, Timer, Microscope, Sparkles,
  Award, Quote, Ghost, Skull, ShieldX, Wallet, Landmark,
  // Fix for potential missing icons
  Zap, AlertOctagon, GraduationCap
} from 'lucide-react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  ResponsiveContainer, Tooltip 
} from 'recharts';

interface InterviewViewProps {
  onChangeView: (view: PageView) => void;
}

type ProfileType = 'PRIVATO' | 'AZIENDA' | null;

interface Question {
  id: string;
  text: string;
  subtext?: string;
  category: 'PROTEZIONE' | 'FISCALE' | 'PENSIONE' | 'SUCCESSIONE' | 'AZIENDA' | 'INVESTIMENTO';
  relatedNeed: string;
}

interface Need {
  id: string;
  title: string;
  description: string;
  priority: 'ALTA' | 'MEDIA' | 'BASSA';
  script: string;
  targetView: PageView;
  icon: React.ElementType;
  color: string;
}

const InterviewView: React.FC<InterviewViewProps> = ({ onChangeView }) => {
  const [profile, setProfile] = useState<ProfileType>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [step, setStep] = useState(0); // 0: Profile, 1: Wizard, 2: Results

  const questionsPrivate: Question[] = [
    { 
      id: 'q_tfr', 
      text: "Il tuo TFR è ancora 'congelato' in azienda o all'INPS?", 
      subtext: "Stai rinunciando a una tassazione del 9% e ai rendimenti di mercato.",
      category: 'PENSIONE',
      relatedNeed: 'TFR_MANAGEMENT' 
    },
    {
      id: 'q_familiari',
      text: "Hai figli o coniuge fiscalmente a carico?",
      subtext: "Puoi dedurre fino a 5.164€ anche per i loro versamenti, raddoppiando il vantaggio fiscale familiare.",
      category: 'FISCALE',
      relatedNeed: 'TAX_EFFICIENCY'
    },
    {
      id: 'q_inflation_cash',
      text: "Hai più di 20.000€ 'fermi' sul conto corrente infruttifero?",
      subtext: "L'inflazione al 3% divora 600€ di potere d'acquisto ogni anno senza che tu te ne accorga.",
      category: 'INVESTIMENTO',
      relatedNeed: 'PAC_STRATEGY'
    },
    { 
      id: 'q_protection_smart', 
      text: "La tua famiglia ha un 'paracadute' immediato in caso di tua assenza o infortunio?", 
      subtext: "Soluzione Smart (TCM + Lesioni) senza esami medici e con liquidazione in 20 giorni.",
      category: 'PROTEZIONE',
      relatedNeed: 'ZURICH_SMART_NEED' 
    },
    {
      id: 'q_gap_pensionistico',
      text: "Hai calcolato che la tua pensione pubblica sarà inferiore al 60% del tuo ultimo stipendio?",
      subtext: "L'erosione del potere d'acquisto post-lavoro è il rischio più sottovalutato dai professionisti.",
      category: 'PENSIONE',
      relatedNeed: 'TFR_MANAGEMENT'
    },
    {
      id: 'q_joint_accounts',
      text: "Possiedi conti cointestati che potrebbero bloccarsi totalmente in caso di decesso di un titolare?",
      subtext: "La banca congela l'intero rapporto fino alla chiusura della successione (tempi: 6-9 mesi).",
      category: 'SUCCESSIONE',
      relatedNeed: 'SUCCESSION_PLANNING'
    },
    { 
      id: 'q_pac_education', 
      text: "Hai obiettivi di spesa certi tra 10-15 anni (università figli, acquisto casa)?", 
      subtext: "L'accumulo graduale (PAC) abbatte la volatilità e crea capitale senza stress.",
      category: 'INVESTIMENTO',
      relatedNeed: 'PAC_STRATEGY' 
    },
    {
      id: 'q_short_disability',
      text: "In caso di infortunio che ti impedisse di lavorare per 3 mesi, come copriresti le spese fisse?",
      subtext: "L'indennizzo forfettario da referto medico garantisce liquidità senza attendere lunghe perizie.",
      category: 'PROTEZIONE',
      relatedNeed: 'ZURICH_SMART_NEED'
    },
    {
      id: 'q_rita_anticipo',
      text: "Ti piacerebbe poter smettere di lavorare fino a 10 anni prima dell'età INPS?",
      subtext: "La R.I.T.A. trasforma il tuo fondo pensione in uno stipendio anticipato tassato al 9%.",
      category: 'PENSIONE',
      relatedNeed: 'RITA_NEED'
    },
    {
      id: 'q_immobili_locati',
      text: "Possiedi immobili locati il cui canone concorre al tuo reddito IRPEF alzando l'aliquota?",
      subtext: "Stai pagando fino al 43% di tasse su affitti che potresti 'compensare' con la deducibilità previdenziale.",
      category: 'FISCALE',
      relatedNeed: 'TAX_EFFICIENCY'
    },
    { 
      id: 'q_ltc_emergency', 
      text: "Se perdessi l'autosufficienza, i tuoi risparmi coprirebbero 3.000€ al mese di cure?", 
      subtext: "Proteggi la tua dignità e l'eredità dei tuoi figli con il raddoppio della rendita.",
      category: 'PROTEZIONE',
      relatedNeed: 'LTC_RISK' 
    },
    { 
      id: 'q_succession_estate', 
      text: "Possiedi immobili che i tuoi eredi potrebbero faticare a riscattare per mancanza di contanti?", 
      subtext: "Le imposte di sblocco e voltura richiedono liquidità immediata (Iure Proprio).",
      category: 'SUCCESSIONE',
      relatedNeed: 'SUCCESSION_PLANNING' 
    },
    { 
      id: 'q_tax_efficiency', 
      text: "Il tuo reddito lordo (RAL) supera i 28.000 € annui?", 
      subtext: "Sei nello scaglione IRPEF dove lo Stato ti finanzia il 35-43% del tuo risparmio.",
      category: 'FISCALE',
      relatedNeed: 'TAX_EFFICIENCY' 
    }
  ];

  const questionsCorporate: Question[] = [
    { 
      id: 'q_corp_tfr', 
      text: "L'azienda mantiene il TFR in tesoreria (Debito a vista)?", 
      subtext: "Il TFR in azienda peggiora la PFN e costa il 4,5% annuo tra rivalutazione e tasse.",
      category: 'AZIENDA',
      relatedNeed: 'CORP_TFR_OPTIMIZATION' 
    },
    { 
      id: 'q_corp_admin', 
      text: "L'amministratore preleva utili solo come dividendi o compenso ordinario?", 
      subtext: "Stai pagando il 43% di IRPEF quando potresti usare la tassazione separata TFM.",
      category: 'FISCALE',
      relatedNeed: 'TFM_PLANNING' 
    },
    {
      id: 'q_corp_tfm_date',
      text: "La tua delibera di TFM ha una 'Data Certa' certificata (PEC o Notarile)?",
      subtext: "Senza data certa anteriore all'incarico, l'Agenzia delle Entrate può negare la tassazione separata.",
      category: 'FISCALE',
      relatedNeed: 'TFM_PLANNING'
    },
    {
      id: 'q_corp_ccii', 
      text: "Sei a conoscenza dell'obbligo di monitoraggio dei debiti (Codice della Crisi)?", 
      subtext: "Esternalizzare il TFR pulisce il bilancio e migliora il rating bancario immediatamente.",
      category: 'AZIENDA',
      relatedNeed: 'CORP_TFR_OPTIMIZATION' 
    },
    {
      id: 'q_corp_liability',
      text: "Hai analizzato l'impatto di un'eventuale azione di responsabilità verso il CdA sui tuoi beni personali?",
      subtext: "Lo scudo legale Art. 1923 rende il TFR/TFM in polizza inattaccabile dai creditori della società.",
      category: 'PROTEZIONE',
      relatedNeed: 'SUCCESSION_PLANNING'
    },
    {
      id: 'q_corp_keyman', 
      text: "Se venisse a mancare un socio o un uomo chiave, l'azienda avrebbe la liquidità per liquidare gli eredi?", 
      subtext: "Proteggi la continuità aziendale con capitali garantiti e detraibili.",
      category: 'PROTEZIONE',
      relatedNeed: 'ZURICH_SMART_NEED' 
    },
    {
      id: 'q_corp_welfare',
      text: "Eroghi premi di produzione solo in busta paga (tassati) invece che in Welfare Aziendale?",
      subtext: "Il Welfare (Fondo Pensione) abbatte il cuneo fiscale e aumenta il potere d'acquisto del dipendente a parità di costo azienda.",
      category: 'FISCALE',
      relatedNeed: 'TAX_EFFICIENCY'
    }
  ];

  const currentQuestions = profile === 'PRIVATO' ? questionsPrivate : questionsCorporate;

  const needsMap: Record<string, Need> = {
    'TFR_MANAGEMENT': {
      id: 'TFR_MANAGEMENT',
      title: "Gestione TFR Inefficiente",
      description: "Il TFR lasciato in azienda/INPS è tassato min. 23% e rende poco. Nel fondo è al 9%.",
      priority: 'ALTA',
      script: "Il tuo TFR sta perdendo valore. Spostiamolo in un veicolo che lo tassa meno e lo protegge dai creditori.",
      targetView: PageView.SIMULATOR,
      icon: Calculator,
      color: "bg-amber-100 text-amber-700"
    },
    'ZURICH_SMART_NEED': {
      id: 'ZURICH_SMART_NEED',
      title: "Protezione Asset & Persona",
      description: "Capitale decesso per i cari e indennizzo immediato per infortunio grave (47 lesioni mappate).",
      priority: 'ALTA',
      script: "Non sacrifichiamo i progetti: proteggiamo il futuro dei tuoi figli senza intaccare il patrimonio.",
      targetView: PageView.ZURICH_SMART_PROTECTION,
      icon: Umbrella,
      color: "bg-[#233D7B] text-white"
    },
    'PAC_STRATEGY': {
      id: 'PAC_STRATEGY',
      title: "Accumulo Strategico (PAC)",
      description: "Piano di Accumulo per abbattere la volatilità e costruire obiettivi di vita.",
      priority: 'MEDIA',
      script: "Cominciamo oggi a costruire il capitale per l'università dei tuoi figli o la tua libertà futura.",
      targetView: PageView.PAC_SIMULATOR,
      icon: TrendingUp,
      color: "bg-emerald-100 text-emerald-700"
    },
    'TAX_EFFICIENCY': {
      id: 'TAX_EFFICIENCY',
      title: "Ottimizzazione Fiscale",
      description: "Recupero immediato fino al 43% dei versamenti. Focus familiari a carico.",
      priority: 'ALTA',
      script: "Ogni 100€ che versi, lo Stato te ne restituisce fino a 43€. È il rendimento più alto del mercato.",
      targetView: PageView.FISCAL_CALCULATOR,
      icon: Coins,
      color: "bg-emerald-100 text-emerald-700"
    },
    'SUCCESSION_PLANNING': {
      id: 'SUCCESSION_PLANNING',
      title: "Vulnerabilità Successoria",
      description: "Rischio blocco conti e mancanza di liquidità per il riscatto degli immobili.",
      priority: 'ALTA',
      script: "Non lasciare che un imprevisto di salute o un decesso obblighi i tuoi figli a svendere la casa per pagare le tasse.",
      targetView: PageView.SUCCESSION_ANALYSIS,
      icon: Scale,
      color: "bg-indigo-100 text-indigo-700"
    },
    'LTC_RISK': {
      id: 'LTC_RISK',
      title: "Rischio Non Autosufficienza",
      description: "Costi di assistenza che erodono il patrimonio accumulato in una vita.",
      priority: 'ALTA',
      script: "La LTC non serve a te, serve a proteggere l'indipendenza economica dei tuoi figli.",
      targetView: PageView.LTC_ANALYSIS,
      icon: HeartPulse,
      color: "bg-rose-100 text-rose-700"
    },
    'RITA_NEED': {
      id: 'RITA_NEED',
      title: "Prepensionamento (R.I.T.A.)",
      description: "Utilizzo del fondo come scivolo per uscire anticipatamente dal mondo del lavoro.",
      priority: 'MEDIA',
      script: "Puoi incassare il fondo a rate tassate al 9% fino a 10 anni prima della pensione statale.",
      targetView: PageView.RITA_SIMULATOR,
      icon: Timer,
      color: "bg-blue-100 text-blue-700"
    },
    'CORP_TFR_OPTIMIZATION': {
      id: 'CORP_TFR_OPTIMIZATION',
      title: "Rating & Audit TFR",
      description: "Costo occulto rivalutazione e appesantimento bilancio (CCII).",
      priority: 'ALTA',
      script: "Il TFR in azienda è un debito 'a vista' che peggiora il tuo rating bancario. Esternalizziamolo.",
      targetView: PageView.CORPORATE_SIMULATOR,
      icon: Factory,
      color: "bg-slate-100 text-slate-700"
    },
    'TFM_PLANNING': {
      id: 'TFM_PLANNING',
      title: "TFM Amministratore",
      description: "Pianificazione fiscale per l'uscita dell'amministratore (Art. 17 TUIR).",
      priority: 'ALTA',
      script: "Estrai utili dall'azienda bypassando il 43% di IRPEF tramite la tassazione separata.",
      targetView: PageView.TFM_SIMULATOR,
      icon: Award,
      color: "bg-orange-100 text-orange-700"
    }
  };

  const handleAnswer = (value: boolean) => {
    const currentQ = currentQuestions[currentQuestionIndex];
    setAnswers(prev => ({ ...prev, [currentQ.id]: value }));
    
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setStep(2);
    }
  };

  const goBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else {
      setStep(0);
    }
  };

  const resetInterview = () => {
    setProfile(null);
    setAnswers({});
    setCurrentQuestionIndex(0);
    setStep(0);
  };

  const getRadarData = () => {
    const scores: Record<string, number> = {
      'PROTEZIONE': 20,
      'FISCALE': 20,
      'PENSIONE': 20,
      'SUCCESSIONE': 20,
      'AZIENDA': 20,
      'INVESTIMENTO': 20
    };
    currentQuestions.forEach(q => {
      if (answers[q.id]) scores[q.category] += Math.floor(80 / (currentQuestions.filter(x => x.category === q.category).length)); 
    });
    return profile === 'PRIVATO' ? [
        { subject: 'PROTEZIONE', A: Math.min(100, scores['PROTEZIONE']), fullMark: 100 },
        { subject: 'FISCALE', A: Math.min(100, scores['FISCALE']), fullMark: 100 },
        { subject: 'PENSIONE', A: Math.min(100, scores['PENSIONE']), fullMark: 100 },
        { subject: 'SUCCESSIONE', A: Math.min(100, scores['SUCCESSIONE']), fullMark: 100 },
        { subject: 'INVESTIMENTO', A: Math.min(100, scores['INVESTIMENTO']), fullMark: 100 },
    ] : [
        { subject: 'PROT. AZIENDA', A: Math.min(100, scores['PROTEZIONE']), fullMark: 100 },
        { subject: 'EFFICIENZA FISC.', A: Math.min(100, scores['FISCALE']), fullMark: 100 },
        { subject: 'GESTIONE TFR', A: Math.min(100, scores['AZIENDA']), fullMark: 100 },
    ];
  };

  const getDetectedNeeds = () => {
    const detected: Need[] = [];
    const seen = new Set<string>();
    currentQuestions.forEach(q => {
      if (answers[q.id] && !seen.has(q.relatedNeed)) {
        detected.push(needsMap[q.relatedNeed]);
        seen.add(q.relatedNeed);
      }
    });
    return detected;
  };

  const renderProfileSelection = () => (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in text-center py-10">
      <div className="space-y-4">
        <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight uppercase italic">Diagnosi <span className="text-[#233D7B]">Vomero Strategy</span></h2>
        <p className="text-slate-500 text-xl font-medium">Identifica i gap di protezione e le inefficienze fiscali del tuo cliente.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-8 mt-12 px-4">
        <button 
          onClick={() => { setProfile('PRIVATO'); setStep(1); }}
          className="group relative bg-white p-10 rounded-3xl border-2 border-slate-100 hover:border-[#233D7B] shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-[#233D7B]"></div>
          <div className="w-24 h-24 rounded-full bg-blue-50 group-hover:bg-[#233D7B] transition-colors flex items-center justify-center mx-auto mb-6">
            <User size={48} className="text-[#233D7B] group-hover:text-white transition-colors" />
          </div>
          <h3 className="text-2xl font-black text-slate-800 mb-2 uppercase italic tracking-tighter">Privato / Famiglia</h3>
          <p className="text-slate-500 leading-relaxed font-medium italic">Analisi LTC, TCM, RITA, Pensione e Successione.</p>
        </button>
        <button 
          onClick={() => { setProfile('AZIENDA'); setStep(1); }}
          className="group relative bg-white p-10 rounded-3xl border-2 border-slate-100 hover:border-amber-600 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-amber-600"></div>
          <div className="w-24 h-24 rounded-full bg-amber-50 group-hover:bg-amber-600 transition-colors flex items-center justify-center mx-auto mb-6">
            <Building2 size={48} className="text-amber-600 group-hover:text-white transition-colors" />
          </div>
          <h3 className="text-2xl font-black text-slate-800 mb-2 uppercase italic tracking-tighter">Imprenditore / Azienda</h3>
          <p className="text-slate-500 leading-relaxed font-medium italic">Rating TFR, TFM e Welfare Key Man.</p>
        </button>
      </div>
    </div>
  );

  const renderWizard = () => {
    const currentQ = currentQuestions[currentQuestionIndex];
    const progress = ((currentQuestionIndex) / currentQuestions.length) * 100;
    return (
      <div className="max-w-3xl mx-auto animate-fade-in py-8">
        <div className="mb-8">
          <div className="flex justify-between text-xs font-black text-slate-400 uppercase mb-2 tracking-[0.2em]">
            <span>Step {currentQuestionIndex + 1} / {currentQuestions.length}</span>
            <span>{Math.round(progress)}% Analisi</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div className={`h-full transition-all duration-500 ease-out ${profile === 'PRIVATO' ? 'bg-[#233D7B]' : 'bg-amber-600'}`} style={{ width: `${progress}%` }}></div>
          </div>
        </div>
        <div className="bg-white rounded-[40px] shadow-2xl border border-slate-200 p-8 md:p-14 relative overflow-hidden min-h-[500px] flex flex-col justify-center">
          <button onClick={goBack} className="absolute top-10 left-10 text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-1 text-[10px] font-black uppercase tracking-widest">
            <ChevronLeft size={16} /> Indietro
          </button>
          <div className="relative z-10 text-center space-y-8">
            <div className="flex justify-center gap-2">
               <span className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${profile === 'PRIVATO' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'}`}>
                 Categoria: {currentQ.category}
               </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight tracking-tighter italic uppercase">{currentQ.text}</h2>
            {currentQ.subtext && <p className="text-slate-400 text-lg font-medium italic">"{currentQ.subtext}"</p>}
            <div className="grid grid-cols-2 gap-6 mt-12">
              <button onClick={() => handleAnswer(false)} className="py-6 rounded-3xl border-2 border-slate-100 font-black text-slate-300 hover:bg-slate-50 hover:text-slate-400 transition-all text-2xl uppercase italic tracking-tighter">NO</button>
              <button onClick={() => handleAnswer(true)} className={`py-6 rounded-3xl font-black text-white shadow-xl transition-all text-2xl transform hover:scale-105 uppercase italic tracking-tighter ${profile === 'PRIVATO' ? 'bg-[#233D7B] shadow-blue-900/20' : 'bg-amber-600 shadow-amber-900/20'}`}>SÌ</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderResults = () => {
    const needs = getDetectedNeeds();
    const radarData = getRadarData();
    const radarColor = profile === 'PRIVATO' ? '#233D7B' : '#d97706';
    return (
      <div className="max-w-7xl mx-auto animate-fade-in py-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <h2 className="text-4xl font-black text-slate-900 flex items-center gap-4 tracking-tighter uppercase italic">
            <Target size={32} className="text-indigo-600" /> Analisi Rischio <span className="text-indigo-600">Vomero 2026</span>
          </h2>
          <button onClick={resetInterview} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-[#233D7B] bg-white px-8 py-4 rounded-2xl border border-slate-200 shadow-xl transition-all">
            <RefreshCw size={16} /> Nuova Diagnosi
          </button>
        </div>
        
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-[40px] shadow-xl border border-slate-200 p-8 flex flex-col items-center">
              <h3 className="font-black text-slate-400 text-[10px] uppercase tracking-[0.3em] mb-10 italic border-b border-slate-100 pb-2 w-full text-center">Matrice dei Bisogni</h3>
              <div className="w-full h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 11, fontWeight: 900 }} />
                    <Radar name="Scoring" dataKey="A" stroke={radarColor} fill={radarColor} fillOpacity={0.6} />
                    <Tooltip contentStyle={{borderRadius: '16px', border: 'none'}} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-slate-950 p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden border-b-8 border-amber-500">
               <div className="absolute top-0 right-0 p-4 opacity-5"><Quote size={100} /></div>
               <p className="text-lg font-medium italic opacity-90 leading-relaxed mb-6">
                 "Dottore, il rischio non è qualcosa che succede, è qualcosa che non abbiamo gestito in tempo. I gap evidenziati dal grafico sono le porte aperte al suo patrimonio."
               </p>
               <div className="flex items-center gap-2 text-amber-500 text-[9px] font-black uppercase tracking-widest">
                  <Microscope size={14} /> Intelligence Unit Gruppo Vomero
               </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-8">
            {needs.length > 0 ? needs.map((need) => (
              <div key={need.id} className="bg-white rounded-[3.5rem] shadow-xl border border-slate-200 overflow-hidden hover:shadow-2xl transition-all group border-b-8 border-indigo-600">
                <div className="flex flex-col md:flex-row">
                  <div className={`p-10 md:w-1/3 flex flex-col justify-center items-center text-center ${need.color} bg-opacity-10 relative overflow-hidden`}>
                    <div className="absolute -top-10 -left-10 opacity-5 group-hover:scale-110 transition-transform"><need.icon size={200} /></div>
                    <div className="p-6 rounded-[32px] bg-white text-indigo-600 mb-6 shadow-2xl group-hover:rotate-6 transition-transform relative z-10">
                      <need.icon size={48} />
                    </div>
                    <h4 className="font-black text-xl leading-tight uppercase tracking-tighter italic relative z-10">{need.title}</h4>
                    <span className="mt-3 px-3 py-1 bg-white/50 rounded-full text-[9px] font-black uppercase tracking-widest relative z-10">Priorità {need.priority}</span>
                  </div>
                  <div className="p-10 md:w-2/3 flex flex-col justify-between">
                    <div className="space-y-8">
                      <div>
                         <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">Diagnosi Area:</p>
                         <p className="text-slate-700 text-2xl font-bold leading-tight tracking-tight uppercase italic">{need.description}</p>
                      </div>
                      <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-100 relative">
                         <Quote size={40} className="absolute -top-4 -left-2 text-indigo-100" />
                         <p className="text-slate-600 font-bold italic text-lg leading-relaxed relative z-10">"{need.script}"</p>
                      </div>
                    </div>
                    <button onClick={() => onChangeView(need.targetView)} className="mt-10 self-end px-10 py-5 rounded-[2rem] bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-[#233D7B] transition-all flex items-center gap-3 shadow-xl group/btn">
                       Sblocca Soluzione Tecnica <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            )) : (
              <div className="bg-white p-20 rounded-[4rem] border-4 border-dashed border-slate-200 text-center space-y-6">
                 <ShieldCheck size={80} className="mx-auto text-emerald-500 opacity-20" />
                 <h3 className="text-2xl font-black text-slate-400 uppercase tracking-tighter">Nessun Gap Critico Rilevato</h3>
                 <p className="text-slate-400 font-medium italic">Il profilo sembra solido. Verifica i versamenti extra-plafond.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="pb-12 min-h-[700px]">
      {step === 0 && renderProfileSelection()}
      {step === 1 && renderWizard()}
      {step === 2 && renderResults()}
    </div>
  );
};

export default InterviewView;
