import React, { useState } from 'react';
import { ASSET_PROTECTION_DATA } from '../constants';
import { 
  ShieldCheck, ShieldAlert, Lock, Gavel, AlertTriangle, 
  Search, Info, Scale, Landmark, History, 
  Zap, AlertOctagon, Siren, CheckCircle2, 
  ArrowRight, ShieldPlus, BookOpen, UserCheck,
  HeartPulse, Activity, UserPlus,
  Book, Quote, Lightbulb, GraduationCap, MessagesSquare,
  Skull, Crosshair, ChevronRight,
  FileText, Shield, AlertCircle, Bookmark, ExternalLink,
  Users, UserX, Sparkles, FileSignature, 
  Ban, ShieldHalf, Microscope, Eye, Users2,
  // Added missing Building2 icon import
  Building2
} from 'lucide-react';

const formatCurrency = (val: number) => 
  new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);

const LEGAL_CASES = [
  {
    id: 'case-educando',
    title: 'Culpa in Educando: Danni da Bullismo',
    court: 'Tribunale di Milano, Sez. X',
    reference: 'Art. 2048 Codice Civile',
    threat: 'Un minore causa lesioni permanenti a un compagno durante l\'orario scolastico (o extra-scolastico). I genitori vengono condannati in solido per un risarcimento di 680.000€. La polizza capofamiglia ha un massimale saturo o esclusioni specifiche.',
    shield: 'Art. 1923 c.c. - Patrimonio Separato',
    verdict: 'Mentre la casa e i conti correnti sono pignorabili, la posizione nel Fondo Pensione e nella Polizza Multiramo Zurich resta intatta. La legge tutela il "fine previdenziale" sopra il diritto al risarcimento del terzo.',
    strength: 100,
    advisorTip: 'Script: "Dottore, lei è responsabile delle azioni di suo figlio col suo intero patrimonio. Vuole davvero che un errore di gioventù distrugga la sua vecchiaia?"'
  },
  {
    id: 'case-vigilando',
    title: 'Culpa in Vigilando: Il Dipendente Infedele',
    court: 'Corte di Cassazione Civile',
    reference: 'Art. 2049 Codice Civile',
    threat: 'Un dipendente di una PMI causa un danno ambientale o un incidente mortale durante l\'uso di un mezzo aziendale. L\'imprenditore risponde con tutto il suo patrimonio personale se l\'assicurazione aziendale non copre integralmente il danno.',
    shield: 'Art. 2117 c.c. - Segregazione Fondi',
    verdict: 'Il Fondo Pensione è un patrimonio autonomo "segregato". I creditori dell\'impresa non possono aggredire le somme accantonate per la previdenza del titolare.',
    strength: 100,
    advisorTip: 'Usa la leva del "Socio Occulto": lo Stato e i creditori sono soci dei tuoi rischi, ma non del tuo fondo pensione.'
  },
  {
    id: 'case-custodia',
    title: 'Cose in Custodia: Incendio o Allagamento',
    court: 'Giurisprudenza Condominiale',
    reference: 'Art. 2051 Codice Civile',
    threat: 'La rottura di una tubatura o un corto circuito nella tua seconda casa causa danni ingenti all\'intero stabile. Risarcimento richiesto: 1,2 Mln €. La tua responsabilità è oggettiva (presunta).',
    shield: 'Art. 1923 c.c. - Insequestrabilità',
    verdict: 'In attesa dell\'esito del processo (media 7 anni), i tuoi asset liquidi in banca vengono sequestrati. Solo Zurich multinvest garantisce che una parte del tuo patrimonio resti libera e produttiva.',
    strength: 95,
    advisorTip: 'Punta sul tempo: "Il processo congela la sua liquidità. Lo scudo Zurich mantiene la sua libertà finanziaria."'
  },
  {
    id: 'case-admin',
    title: 'D&O: Azione di Responsabilità Societaria',
    court: 'Nuovo Codice della Crisi (CCII)',
    reference: 'Art. 2476 c.c. / Art. 150 CCII',
    threat: 'Azione dei creditori sociali contro l\'amministratore per "mala gestio" o ritardata dichiarazione di crisi. Il curatore fallimentare chiede il pignoramento di ogni bene del CdA.',
    shield: 'Art. 150 comma 2 CCII',
    verdict: 'Il nuovo CCII conferma: le prestazioni di previdenza complementare sono escluse dalla massa attiva fallimentare. È l\'unica "scialuppa di salvataggio" legale per l\'imprenditore.',
    strength: 92,
    advisorTip: 'Focus Imprenditore: "Il TFR in azienda è un debito che la affonda; il TFR nel fondo è un credito che la salva dal fallimento."'
  },
  {
    id: 'case-cassazione-prev',
    title: 'Natura Previdenziale vs Finanziaria',
    court: 'Cassazione Sez. Unite 11421/2021',
    reference: 'Sentenza "Pillar"',
    threat: 'Un creditore pignora una polizza sostenendo che sia un mero investimento finanziario senza rischio demografico.',
    shield: 'Garanzia Biometrica Zurich',
    verdict: 'La Cassazione stabilisce che se esiste una componente di protezione (caso morte/LTC), lo scudo dell\'Art. 1923 è valido. Zurich Smart Protection e Multinvest superano brillantemente questo test.',
    strength: 94,
    advisorTip: 'Qualità Zurich: "Non tutte le polizze sono scudi. Quelle Zurich sono progettate per resistere in tribunale."'
  }
];

const AssetProtectionView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'STRESS_TEST' | 'MATRICE' | 'GIURISPRUDENZA'>('STRESS_TEST');
  const [selectedScenario, setSelectedScenario] = useState<keyof typeof ASSET_PROTECTION_DATA.STRESS_TEST_SCENARIOS>('CIVILE_PROF');
  const [patrimonioInput, setPatrimonioInput] = useState<number>(1000000);

  const scenario = ASSET_PROTECTION_DATA.STRESS_TEST_SCENARIOS[selectedScenario];

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-fade-in pb-24">
      
      {/* 1. HERO EXECUTIVE */}
      <div className="bg-[#0a0f1d] rounded-[3.5rem] p-12 text-white shadow-2xl relative overflow-hidden border-b-8 border-emerald-500">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-emerald-600/10 to-transparent"></div>
        <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
           <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                 <div className="bg-emerald-500 p-3 rounded-2xl shadow-xl text-slate-900"><ShieldCheck size={32} /></div>
                 <span className="text-[11px] font-black uppercase tracking-[0.4em] text-emerald-400 italic">Wealth Protection Lab - Gruppo Vomero Strategy</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">Scudo <br/> <span className="text-emerald-500">Patrimoniale</span></h1>
              <p className="text-slate-400 text-xl font-medium max-w-2xl leading-relaxed">
                "Dottore, il suo patrimonio è una riserva di valore o un bersaglio per i creditori? Analizziamo la resistenza legale dei suoi asset."
              </p>
           </div>
           <div className="lg:col-span-4 bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 text-center relative group">
              <p className="text-[10px] font-black uppercase text-emerald-500 mb-2 tracking-widest italic">Asset under Analysis</p>
              <p className="text-5xl font-black text-white tracking-tighter">{formatCurrency(patrimonioInput)}</p>
              <input 
                type="range" min="100000" max="10000000" step="100000" 
                value={patrimonioInput} 
                onChange={(e) => setPatrimonioInput(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none accent-emerald-500 mt-6" 
              />
           </div>
        </div>
      </div>

      {/* 2. NAVIGATION TABS */}
      <div className="flex flex-wrap gap-2 bg-slate-100 p-1.5 rounded-2xl w-full md:w-fit mx-auto shadow-inner border border-slate-200">
         <button onClick={() => setActiveTab('STRESS_TEST')} className={`px-10 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'STRESS_TEST' ? 'bg-white text-[#0a0f1d] shadow-md border-b-2 border-emerald-500' : 'text-slate-500 hover:text-slate-800'}`}>
            <Zap size={16} /> Stress Test Rischio
         </button>
         <button onClick={() => setActiveTab('MATRICE')} className={`px-10 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'MATRICE' ? 'bg-white text-[#0a0f1d] shadow-md border-b-2 border-emerald-500' : 'text-slate-500 hover:text-slate-800'}`}>
            <Scale size={16} /> Matrice Comparativa
         </button>
         <button onClick={() => setActiveTab('GIURISPRUDENZA')} className={`px-10 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'GIURISPRUDENZA' ? 'bg-[#233D7B] text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}>
            <Gavel size={16} /> Casi Studio & Sentenze
         </button>
      </div>

      <div className="min-h-[600px]">
        
        {/* --- TAB 1: STRESS TEST --- */}
        {activeTab === 'STRESS_TEST' && (
          <div className="grid lg:grid-cols-12 gap-8 animate-fade-in">
              <div className="lg:col-span-4 space-y-4">
                  <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase flex items-center gap-2 mb-6 tracking-widest">
                        <Siren size={14} className="text-red-600" /> Seleziona Scenario di Rischio
                    </h4>
                    <div className="space-y-3">
                        {(Object.entries(ASSET_PROTECTION_DATA.STRESS_TEST_SCENARIOS) as [string, any][]).map(([key, item]) => (
                          <button 
                            key={key} 
                            onClick={() => setSelectedScenario(key as any)}
                            className={`w-full text-left p-5 rounded-2xl border-2 transition-all ${selectedScenario === key ? 'border-emerald-500 bg-emerald-50 shadow-md ring-4 ring-emerald-500/5' : 'border-slate-100 bg-white hover:bg-slate-50'}`}
                          >
                              <div className="flex justify-between items-center">
                                <h5 className={`font-black text-[12px] uppercase ${selectedScenario === key ? 'text-emerald-800' : 'text-slate-800'}`}>{item.title}</h5>
                                {selectedScenario === key && <CheckCircle2 size={16} className="text-emerald-600" />}
                              </div>
                              <div className="mt-2 flex flex-wrap gap-2">
                                 <span className="text-[8px] font-black px-2 py-0.5 rounded uppercase bg-amber-100 text-amber-700">Impatto {item.impact}</span>
                                 <span className="text-[9px] text-slate-400 italic font-bold">{item.legal_ref}</span>
                              </div>
                          </button>
                        ))}
                    </div>
                  </div>
              </div>
              <div className="lg:col-span-8 space-y-8">
                  <div className="bg-white rounded-[3rem] p-10 border border-slate-200 shadow-sm relative overflow-hidden">
                      <div className="flex justify-between items-center mb-10">
                        <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter flex items-center gap-4 italic"><ShieldAlert className="text-emerald-500" /> Resilienza dello Scudo</h3>
                        <span className="bg-rose-50 px-5 py-2 rounded-2xl text-rose-700 text-[10px] font-black uppercase border border-rose-100">Scenario: {scenario?.title}</span>
                      </div>
                      
                      <div className="mb-10 p-8 bg-slate-950 rounded-[2.5rem] text-white relative overflow-hidden group border-l-8 border-amber-500">
                         <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><Quote size={80} className="text-amber-500" /></div>
                         <div className="relative z-10">
                            <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-2 italic">Argomentazione D'Urto:</p>
                            <p className="text-lg font-medium italic leading-relaxed">"{scenario?.hook}"</p>
                         </div>
                      </div>

                      <div className="space-y-8">
                          {[
                            { label: "Conto Corrente", score: scenario?.bank || 0, icon: Landmark, color: "bg-red-500" },
                            { label: "Asset Immobiliari", score: 30, icon: Building2, color: "bg-amber-500" },
                            { label: "Zurich Multinvest (M103F)", score: scenario?.policy_90gs || 90, icon: Lock, color: "bg-indigo-600" },
                            { label: "Fondo Pensione / PIP", score: scenario?.pip || 100, icon: ShieldCheck, color: "bg-emerald-600" }
                          ].map((item, idx) => (
                            <div key={idx} className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center gap-2">
                                      <item.icon size={16} className="text-slate-400" />
                                      <span className="text-xs font-black text-slate-700 uppercase tracking-tighter">{item.label}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                     <span className="text-[10px] font-bold text-slate-400 uppercase">Indice di Protezione:</span>
                                     <span className="text-sm font-black">{item.score}%</span>
                                  </div>
                                </div>
                                <div className="h-4 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                                  <div className={`h-full ${item.color} transition-all duration-1000 shadow-lg`} style={{ width: `${item.score}%` }}></div>
                                </div>
                            </div>
                          ))}
                      </div>
                  </div>

                  <div className="bg-amber-50 p-8 rounded-[3rem] border border-amber-200 flex items-start gap-6">
                     <div className="bg-white p-4 rounded-3xl shadow-sm text-amber-600 shrink-0"><Lightbulb size={32} /></div>
                     <div className="space-y-2">
                        <h4 className="text-sm font-black text-amber-900 uppercase italic">Focus CCII (Codice della Crisi)</h4>
                        <p className="text-xs text-amber-800 leading-relaxed font-medium italic">
                           "Dottore, dal 2022 il nuovo Codice della Crisi d'Impresa ha reso molto più facile per i creditori aggredire il patrimonio dell'amministratore. L'unica 'cassaforte' certificata dallo Stato è la previdenza complementare (Art. 150 CCII)."
                        </p>
                     </div>
                  </div>
              </div>
          </div>
        )}

        {/* --- TAB 2: MATRICE --- */}
        {activeTab === 'MATRICE' && (
          <div className="animate-fade-in space-y-8">
             <div className="bg-white rounded-[3rem] border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                   <thead className="bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest">
                      <tr>
                         <th className="px-8 py-8">Asset Class / Strumento</th>
                         <th className="px-6 py-8 text-center border-l border-white/10">Grado Protezione</th>
                         <th className="px-6 py-8 text-center border-l border-white/10">Rischio Pignorabilità</th>
                         <th className="px-6 py-8 border-l border-white/10">Nota Tecnica Advisor</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100 font-bold text-xs">
                      {ASSET_PROTECTION_DATA.COMPARISON_MATRIX.map((row, idx) => (
                         <tr key={idx} className="hover:bg-slate-50 transition-colors">
                            <td className="px-8 py-6 font-black text-slate-800 text-sm uppercase italic">{row.asset}</td>
                            <td className="px-6 py-6 text-center">
                               <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                  row.shield === 'MASSIMO' ? 'bg-emerald-100 text-emerald-700' :
                                  row.shield === 'ALTO' ? 'bg-indigo-100 text-indigo-700' :
                                  row.shield === 'NULLO' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'
                               }`}>{row.shield}</span>
                            </td>
                            <td className="px-6 py-6 text-center text-rose-600 font-black text-lg">{row.risk}</td>
                            <td className="px-6 py-6 text-slate-500 font-medium italic leading-relaxed">{row.detail}</td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>
        )}

        {/* --- TAB 3: GIURISPRUDENZA & CASI STUDIO --- */}
        {activeTab === 'GIURISPRUDENZA' && (
          <div className="space-y-12 animate-fade-in">
             <div className="grid lg:grid-cols-1 gap-10">
                {LEGAL_CASES.map((legalCase) => (
                  <div key={legalCase.id} className="bg-white rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row group transition-all hover:shadow-2xl">
                     <div className="md:w-1/4 bg-[#0a0f1d] p-10 text-white flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10"><Scale size={150} /></div>
                        <div className="relative z-10">
                           <span className="bg-amber-500 text-slate-900 text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">{legalCase.court}</span>
                           <h4 className="text-2xl font-black mt-6 leading-tight text-amber-400 italic uppercase tracking-tighter">{legalCase.title}</h4>
                           <p className="text-[10px] font-bold text-slate-500 mt-4 tracking-widest uppercase">{legalCase.reference}</p>
                        </div>
                        <div className="mt-10 relative z-10">
                           <p className="text-[10px] font-black uppercase text-indigo-400 mb-2 italic">Legal Resilience Score</p>
                           <div className="flex items-center gap-3">
                              <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                                 <div className="h-full bg-emerald-500" style={{ width: `${legalCase.strength}%` }}></div>
                              </div>
                              <span className="text-xs font-black">{legalCase.strength}%</span>
                           </div>
                        </div>
                     </div>
                     <div className="flex-1 p-10 grid md:grid-cols-2 gap-10">
                        <div className="space-y-8">
                           <div>
                              <h5 className="text-[10px] font-black text-rose-500 uppercase flex items-center gap-2 mb-4 tracking-widest italic border-b border-rose-100 pb-2"><Skull size={14} /> La Minaccia Reale (Case Report)</h5>
                              <p className="text-sm text-slate-700 font-bold leading-relaxed italic">
                                "{legalCase.threat}"
                              </p>
                           </div>
                           <div className="p-6 bg-indigo-50 rounded-[2rem] border border-indigo-100 relative">
                              <ShieldHalf className="absolute top-2 right-2 text-indigo-200" size={32} />
                              <h5 className="text-[10px] font-black text-indigo-600 uppercase mb-2 tracking-widest italic">Riferimento Scudo Zurich</h5>
                              <p className="text-sm font-black text-indigo-900 leading-snug">"{legalCase.shield}"</p>
                           </div>
                        </div>
                        <div className="p-10 bg-slate-50 rounded-[3rem] border border-slate-200 flex flex-col justify-between relative overflow-hidden shadow-inner">
                           <div className="absolute -bottom-10 -right-10 opacity-[0.03]"><History size={200} /></div>
                           <div className="relative z-10">
                              <h5 className="text-[10px] font-black text-slate-400 uppercase mb-6 flex items-center gap-2 tracking-widest italic leading-none">
                                 <Gavel size={14} className="text-[#233D7B]"/> Verdetto Tecnico-Advisor
                              </h5>
                              <p className="text-base text-slate-800 font-medium italic leading-relaxed mb-6">{legalCase.verdict}</p>
                           </div>
                           <div className="mt-6 pt-6 border-t border-slate-200 relative z-10">
                              <div className="flex items-center gap-3 mb-3">
                                 <Sparkles size={16} className="text-amber-500" />
                                 <span className="text-[10px] font-black uppercase text-amber-600 tracking-widest">The Sales Closing Hook</span>
                              </div>
                              <p className="text-[12px] text-slate-600 font-black italic leading-relaxed">"{legalCase.advisorTip}"</p>
                           </div>
                        </div>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        )}
      </div>

      {/* FOOTER EXECUTIVO */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
         <div className="flex items-center gap-6">
            <div className="bg-[#0a0f1d] p-4 rounded-[1.5rem] text-white shadow-lg"><FileSignature size={32} /></div>
            <div>
               <p className="text-lg font-black text-slate-800 uppercase tracking-tighter leading-none mb-1">Asset Protection Master Certification</p>
               <p className="text-xs text-slate-500 font-bold italic">Rif: Art. 1923 c.c. | Art. 150 CCII | Art. 2117 c.c. | Cass. Sez. Un. 11421/21 | Revisione 02/2025</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AssetProtectionView;