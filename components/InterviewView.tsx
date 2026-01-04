
import React, { useState } from 'react';
import { PageView } from '../types';
import { 
  User, Building2, ChevronRight, CheckCircle2, AlertTriangle, 
  ArrowRight, RefreshCw, ClipboardCheck, Briefcase, HeartHandshake, 
  Factory, ShieldAlert, Coins, Calculator, Scale, TrendingUp, Users,
  ChevronLeft, BarChart3, Target, HeartPulse, Umbrella, ShieldCheck,
  PiggyBank, LineChart
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
      text: "Il TFR è ancora in azienda o all'INPS?", 
      subtext: "Non è stato ancora conferito a un fondo pensione complementare.",
      category: 'PENSIONE',
      relatedNeed: 'TFR_MANAGEMENT' 
    },
    { 
      id: 'q_protection_smart', 
      text: "Hai una protezione che garantisca un capitale alla tua famiglia e un indennizzo immediato per te in caso di infortunio?", 
      subtext: "Cerchi una soluzione 'Smart' (TCM + Lesioni) con emissione istantanea e senza esami medici.",
      category: 'PROTEZIONE',
      relatedNeed: 'ZURICH_SMART_NEED' 
    },
    { 
      id: 'q_pac_education', 
      text: "Hai obiettivi di spesa futuri importanti (es. università figli, acquisto casa) tra 10-15 anni?", 
      subtext: "L'accumulo graduale è l'unico modo per non farsi trovare impreparati dalle grandi scadenze della vita.",
      category: 'INVESTIMENTO',
      relatedNeed: 'PAC_STRATEGY' 
    },
    { 
      id: 'q_ltc_emergency', 
      text: "Hai previsto un fondo di emergenza specifico per coprire i 3.000€ mensili di costo medio per la non autosufficienza?", 
      subtext: "L'oro di una vita può sparire in pochi anni di RSA.",
      category: 'PROTEZIONE',
      relatedNeed: 'LTC_RISK' 
    },
    { 
      id: 'q_succession_estate', 
      text: "Possiedi asset che vorresti proteggere dall'erosione forzata causata da spese sanitarie gravi?", 
      category: 'SUCCESSIONE',
      relatedNeed: 'SUCCESSION_PLANNING' 
    },
    { 
      id: 'q_tax_efficiency', 
      text: "Il tuo reddito lordo supera i 28.000 € annui?", 
      category: 'FISCALE',
      relatedNeed: 'TAX_EFFICIENCY' 
    }
  ];

  const questionsCorporate: Question[] = [
    { 
      id: 'q_corp_tfr', 
      text: "L'azienda ha meno di 50 dipendenti e mantiene il TFR in tesoreria?", 
      category: 'AZIENDA',
      relatedNeed: 'CORP_TFR_OPTIMIZATION' 
    },
    { 
      id: 'q_corp_admin', 
      text: "Sei amministratore e non hai ancora un piano TFM deliberato?", 
      category: 'FISCALE',
      relatedNeed: 'TFM_PLANNING' 
    }
  ];

  const currentQuestions = profile === 'PRIVATO' ? questionsPrivate : questionsCorporate;

  const needsMap: Record<string, Need> = {
    'TFR_MANAGEMENT': {
      id: 'TFR_MANAGEMENT',
      title: "Gestione TFR Inefficiente",
      description: "Il TFR lasciato in azienda/INPS è tassato min. 23% e rende poco.",
      priority: 'ALTA',
      script: "Il tuo TFR sta perdendo valore reale. Spostiamolo in un veicolo che lo tassa solo al 9% e ti dà rendimenti di mercato.",
      targetView: PageView.SIMULATOR,
      icon: Calculator,
      color: "bg-amber-100 text-amber-700"
    },
    'ZURICH_SMART_NEED': {
      id: 'ZURICH_SMART_NEED',
      title: "Protezione Smart (TCM + Lesioni)",
      description: "Capitale decesso per i cari e indennizzo forfettario per te in caso di infortunio grave.",
      priority: 'ALTA',
      script: "Proteggi il domani della tua famiglia e l'oggi della tua salute.",
      targetView: PageView.DASHBOARD,
      icon: Umbrella,
      color: "bg-[#233D7B] text-white"
    },
    'PAC_STRATEGY': {
      id: 'PAC_STRATEGY',
      title: "Accumulo Strategico (PAC)",
      description: "Piano di Accumulo per abbattere la volatilità.",
      priority: 'MEDIA',
      script: "Iniziamo oggi a costruire il capitale per l'università dei tuoi figli.",
      targetView: PageView.PAC_SIMULATOR,
      icon: TrendingUp,
      color: "bg-emerald-100 text-emerald-700"
    },
    'TAX_EFFICIENCY': {
      id: 'TAX_EFFICIENCY',
      title: "Ottimizzazione Fiscale",
      description: "Possibilità di recuperare fino al 43% dei versamenti tramite deduzione.",
      priority: 'MEDIA',
      script: "Stai lasciando soldi allo Stato. Versando 5.000€, l'Agenzia delle Entrate te ne restituisce circa 2.000€.",
      targetView: PageView.FISCAL_CALCULATOR,
      icon: Coins,
      color: "bg-emerald-100 text-emerald-700"
    },
    'SUCCESSION_PLANNING': {
      id: 'SUCCESSION_PLANNING',
      title: "Vulnerabilità Patrimoniale",
      description: "Rischio di erosione forzata del patrimonio.",
      priority: 'ALTA',
      script: "Non lasciare che un imprevisto di salute azzeri l'eredità dei tuoi figli.",
      targetView: PageView.SUCCESSION_ANALYSIS,
      icon: Scale,
      color: "bg-indigo-100 text-indigo-700"
    },
    'LTC_RISK': {
      id: 'LTC_RISK',
      title: "Rischio Non Autosufficienza",
      description: "Il peso dell'assistenza ricade sui figli.",
      priority: 'ALTA',
      script: "La LTC è l'unica vera prevenzione finanziaria per la propria dignità.",
      targetView: PageView.LTC_ANALYSIS,
      icon: HeartPulse,
      color: "bg-rose-100 text-rose-700"
    },
    'CORP_TFR_OPTIMIZATION': {
      id: 'CORP_TFR_OPTIMIZATION',
      title: "TFR come Debito Aziendale",
      description: "Costo occulto rivalutazione e appesantimento bilancio.",
      priority: 'ALTA',
      script: "Tenere il TFR in azienda ti costa il 4,5% e peggiora il tuo rating.",
      targetView: PageView.CORPORATE_SIMULATOR,
      icon: Factory,
      color: "bg-slate-100 text-slate-700"
    },
    'TFM_PLANNING': {
      id: 'TFM_PLANNING',
      title: "Assenza TFM Amministratore",
      description: "Mancata pianificazione fiscale per l'uscita dell'amministratore.",
      priority: 'ALTA',
      script: "Preleva utili pagando meno tasse tramite la tassazione separata.",
      targetView: PageView.TFM_SIMULATOR,
      icon: TrendingUp,
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
      if (answers[q.id]) scores[q.category] += 60; 
    });
    return profile === 'PRIVATO' ? [
        { subject: 'PROTEZIONE', A: scores['PROTEZIONE'], fullMark: 100 },
        { subject: 'FISCALE', A: scores['FISCALE'], fullMark: 100 },
        { subject: 'PENSIONE', A: scores['PENSIONE'], fullMark: 100 },
        { subject: 'SUCCESSIONE', A: scores['SUCCESSIONE'], fullMark: 100 },
        { subject: 'INVESTIMENTO', A: scores['INVESTIMENTO'], fullMark: 100 },
    ] : [
        { subject: 'EFFICIENZA FISC.', A: scores['FISCALE'], fullMark: 100 },
        { subject: 'GESTIONE TFR', A: scores['AZIENDA'], fullMark: 100 },
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
        <p className="text-slate-500 text-xl">Identifica i gap di protezione e le inefficienze fiscali del tuo cliente.</p>
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
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Privato / Famiglia</h3>
          <p className="text-slate-500 leading-relaxed">Analisi LTC, TCM, PAC, Pensione e Successione.</p>
        </button>
        <button 
          onClick={() => { setProfile('AZIENDA'); setStep(1); }}
          className="group relative bg-white p-10 rounded-3xl border-2 border-slate-100 hover:border-amber-600 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-amber-600"></div>
          <div className="w-24 h-24 rounded-full bg-amber-50 group-hover:bg-amber-600 transition-colors flex items-center justify-center mx-auto mb-6">
            <Building2 size={48} className="text-amber-600 group-hover:text-white transition-colors" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Imprenditore / Azienda</h3>
          <p className="text-slate-500 leading-relaxed">TFR, TFM e Welfare d'impresa.</p>
        </button>
      </div>
    </div>
  );

  const renderWizard = () => {
    const currentQ = currentQuestions[currentQuestionIndex];
    const progress = ((currentQuestionIndex) / currentQuestions.length) * 100;
    return (
      <div className="max-w-2xl mx-auto animate-fade-in py-8">
        <div className="mb-8">
          <div className="flex justify-between text-xs font-bold text-slate-400 uppercase mb-2">
            <span>Step {currentQuestionIndex + 1} / {currentQuestions.length}</span>
            <span>{Math.round(progress)}% Analisi</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div className={`h-full transition-all duration-500 ease-out ${profile === 'PRIVATO' ? 'bg-[#233D7B]' : 'bg-amber-600'}`} style={{ width: `${progress}%` }}></div>
          </div>
        </div>
        <div className="bg-white rounded-[40px] shadow-2xl border border-slate-200 p-8 md:p-14 relative overflow-hidden min-h-[450px] flex flex-col justify-center">
          <button onClick={goBack} className="absolute top-10 left-10 text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-1 text-sm font-black uppercase tracking-widest">
            <ChevronLeft size={16} /> Indietro
          </button>
          <div className="relative z-10 text-center space-y-8">
            <span className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${profile === 'PRIVATO' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'}`}>
              Categoria: {currentQ.category}
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight tracking-tighter">{currentQ.text}</h2>
            <div className="grid grid-cols-2 gap-6 mt-10">
              <button onClick={() => handleAnswer(false)} className="py-5 rounded-2xl border-2 border-slate-200 font-black text-slate-400 hover:bg-slate-50 hover:border-slate-300 transition-all text-xl">NO</button>
              <button onClick={() => handleAnswer(true)} className={`py-5 rounded-2xl font-black text-white shadow-xl transition-all text-xl transform hover:scale-105 ${profile === 'PRIVATO' ? 'bg-[#233D7B]' : 'bg-amber-600'}`}>SÌ</button>
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
      <div className="max-w-6xl mx-auto animate-fade-in py-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <h2 className="text-4xl font-black text-slate-900 flex items-center gap-4 tracking-tighter">
            <Target size={32} className="text-indigo-600" /> VOMERO RISK ANALYSIS
          </h2>
          <button onClick={resetInterview} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-[#233D7B] bg-white px-6 py-3 rounded-xl border border-slate-200 shadow-md transition-all">
            <RefreshCw size={16} /> Nuova Diagnosi
          </button>
        </div>
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <div className="bg-white rounded-[40px] shadow-xl border border-slate-200 p-8 flex flex-col items-center">
              <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest mb-6">Matrice dei Bisogni</h3>
              <div className="w-full h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 11, fontWeight: 900 }} />
                    <Radar dataKey="A" stroke={radarColor} fill={radarColor} fillOpacity={0.6} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="lg:col-span-8 space-y-6">
            {needs.map((need) => (
              <div key={need.id} className="bg-white rounded-[32px] shadow-lg border border-slate-200 overflow-hidden hover:shadow-2xl transition-all">
                <div className="flex flex-col md:flex-row">
                  <div className={`p-8 md:w-1/3 flex flex-col justify-center items-center text-center ${need.color} bg-opacity-10`}>
                    <div className="p-5 rounded-[24px] bg-white text-indigo-600 mb-4 shadow-xl">
                      <need.icon size={40} />
                    </div>
                    <h4 className="font-black text-lg leading-tight uppercase tracking-tighter">{need.title}</h4>
                  </div>
                  <div className="p-8 md:w-2/3 flex flex-col justify-between">
                    <div className="space-y-6">
                      <p className="text-slate-600 text-lg font-medium leading-relaxed">{need.description}</p>
                      <div className="bg-slate-50 p-6 rounded-[24px] italic font-bold">"{need.script}"</div>
                    </div>
                    <button onClick={() => onChangeView(need.targetView)} className="mt-8 self-end px-8 py-4 rounded-2xl bg-slate-900 text-white text-sm font-black hover:bg-[#233D7B] transition-all flex items-center gap-3">Approfondisci <ArrowRight size={20} /></button>
                  </div>
                </div>
              </div>
            ))}
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
