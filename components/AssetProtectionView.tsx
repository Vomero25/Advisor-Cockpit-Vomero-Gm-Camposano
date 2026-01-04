
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
  FileText, Shield, AlertCircle, Bookmark, ExternalLink
} from 'lucide-react';

const formatCurrency = (val: number) => 
  new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);

const LEGAL_CASES = [
  {
    id: 'case-01',
    title: 'Pignoramento TFR conferito',
    court: 'Corte di Cassazione',
    reference: 'Sentenza n. 11421/2021',
    threat: 'Un fornitore tenta di pignorare il TFR di un dipendente già versato al Fondo Pensione.',
    shield: 'Art. 2117 c.c. & Art. 1923 c.c.',
    verdict: 'Il TFR versato alla previdenza complementare entra in un patrimonio separato. Non è più aggredibile dai creditori del datore né da quelli del dipendente durante la fase di accumulo.',
    strength: 100,
    advisorTip: 'Fai leva sulla parola "Separazione": una volta versato, il TFR non è più dell\'azienda ma diventa un "bene indisponibile".'
  },
  {
    id: 'case-02',
    title: 'Riqualificazione Polizza Vita',
    court: 'AdE & Cassazione Civile',
    reference: 'Circolare 19/E 2024',
    threat: 'Il fisco tenta di tassare la polizza come "investimento finanziario" ordinario per recuperare l\'imposta di successione.',
    shield: 'Art. 12 D.Lgs 346/90',
    verdict: 'Se la polizza ha un contenuto demografico reale, il capitale pagato ai beneficiari è "Iure Proprio" ed è escluso dall\'asse ereditario.',
    strength: 95,
    advisorTip: 'Mostra al cliente che la polizza Zurich rispetta i criteri 2024, evitando contestazioni sulla natura finanziaria.'
  },
  {
    id: 'case-03',
    title: 'Fallimento e Fondo Pensione',
    court: 'Codice della Crisi (CCII)',
    reference: 'Art. 150 Decreto 14/2019',
    threat: 'Un professionista fallisce. Il curatore chiede di liquidare la posizione previdenziale per pagare i debiti.',
    shield: 'Art. 150 comma 2 CCII',
    verdict: 'Le prestazioni previdenziali sono escluse dalla massa attiva fallimentare. La pensione futura non si tocca.',
    strength: 90,
    advisorTip: 'Il fondo pensione è l\'unico salvagente legale se l\'azienda affonda.'
  }
];

const AssetProtectionView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'STRESS_TEST' | 'MATRICE' | 'GIURISPRUDENZA'>('STRESS_TEST');
  const [selectedScenario, setSelectedScenario] = useState<keyof typeof ASSET_PROTECTION_DATA.STRESS_TEST_SCENARIOS>('CIVILE_PROF');
  const [patrimonioInput, setPatrimonioInput] = useState<number>(500000);

  const scenario = ASSET_PROTECTION_DATA.STRESS_TEST_SCENARIOS[selectedScenario];

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-fade-in pb-24">
      <div className="bg-[#0a0f1d] rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden border-b-8 border-emerald-500">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-emerald-600/10 to-transparent"></div>
        <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
           <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                 <div className="bg-emerald-500 p-3 rounded-2xl shadow-xl text-slate-900"><ShieldCheck size={32} /></div>
                 <span className="text-[11px] font-black uppercase tracking-[0.4em] text-emerald-400">Wealth Shield Diagnostics - Gruppo Vomero</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">Asset Protection Lab</h1>
              <p className="text-slate-400 text-xl font-medium max-w-2xl leading-relaxed">
                Analisi della resilienza patrimoniale sotto stress contro aggressioni civili e fallimentari.
              </p>
           </div>
           <div className="lg:col-span-4 bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 text-center relative overflow-hidden">
              <p className="text-[10px] font-black uppercase text-emerald-500 mb-2 tracking-widest italic">Patrimonio in Analisi</p>
              <p className="text-6xl font-black text-white tracking-tighter">{formatCurrency(patrimonioInput)}</p>
              <input 
                type="range" min="100000" max="5000000" step="100000" 
                value={patrimonioInput} 
                onChange={(e) => setPatrimonioInput(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none accent-emerald-500 mt-6" 
              />
           </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 bg-slate-100 p-1.5 rounded-2xl w-full md:w-fit mx-auto shadow-inner border border-slate-200">
         <button onClick={() => setActiveTab('STRESS_TEST')} className={`px-10 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'STRESS_TEST' ? 'bg-white text-[#0a0f1d] shadow-md' : 'text-slate-500 hover:text-slate-800'}`}>
            <Zap size={16} /> Configura Minaccia
         </button>
         <button onClick={() => setActiveTab('MATRICE')} className={`px-10 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'MATRICE' ? 'bg-white text-[#0a0f1d] shadow-md' : 'text-slate-500 hover:text-slate-800'}`}>
            <Scale size={16} /> Matrice Comparativa
         </button>
         <button onClick={() => setActiveTab('GIURISPRUDENZA')} className={`px-10 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'GIURISPRUDENZA' ? 'bg-[#233D7B] text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}>
            <Gavel size={16} /> Casi Studio
         </button>
      </div>

      <div className="min-h-[600px]">
        {activeTab === 'GIURISPRUDENZA' && (
          <div className="space-y-12 animate-fade-in">
             <div className="grid lg:grid-cols-1 gap-8">
                {LEGAL_CASES.map((legalCase) => (
                  <div key={legalCase.id} className="bg-white rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row group">
                     <div className="md:w-1/4 bg-slate-950 p-10 text-white flex flex-col justify-between">
                        <div>
                           <span className="bg-amber-500 text-slate-900 text-[9px] font-black px-3 py-1 rounded-full uppercase">{legalCase.court}</span>
                           <h4 className="text-xl font-black mt-4 leading-tight text-amber-400 italic uppercase">{legalCase.title}</h4>
                           <p className="text-[10px] font-bold text-slate-400 mt-2">{legalCase.reference}</p>
                        </div>
                        <div className="mt-10">
                           <p className="text-[10px] font-black uppercase text-indigo-400 mb-2">Legal Shield Score</p>
                           <div className="flex items-center gap-3">
                              <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                                 <div className="h-full bg-emerald-500" style={{ width: `${legalCase.strength}%` }}></div>
                              </div>
                              <span className="text-xs font-black">{legalCase.strength}%</span>
                           </div>
                        </div>
                     </div>
                     <div className="flex-1 p-10 grid md:grid-cols-2 gap-10">
                        <div className="space-y-6">
                           <div>
                              <h5 className="text-[10px] font-black text-rose-500 uppercase flex items-center gap-2 mb-3"><Siren size={14} /> La Minaccia</h5>
                              <p className="text-sm text-slate-600 font-medium italic">"{legalCase.threat}"</p>
                           </div>
                           <div className="p-5 bg-indigo-50 rounded-2xl border border-indigo-100">
                              <h5 className="text-[10px] font-black text-indigo-600 uppercase flex items-center gap-2 mb-2"><Scale size={14} /> Lo Scudo</h5>
                              <p className="text-sm font-black text-indigo-900">{legalCase.shield}</p>
                           </div>
                        </div>
                        <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-200 flex flex-col justify-between">
                           <div>
                              <h5 className="text-[10px] font-black text-slate-400 uppercase mb-4">Verdetto & Giurisprudenza</h5>
                              <p className="text-sm text-slate-800 font-bold">{legalCase.verdict}</p>
                           </div>
                           <div className="mt-6 pt-4 border-t border-slate-200">
                              <div className="flex items-center gap-3 mb-2">
                                 <Lightbulb size={16} className="text-amber-500" />
                                 <span className="text-[10px] font-black uppercase text-amber-600">The Advisor Secret</span>
                              </div>
                              <p className="text-[11px] text-slate-500 font-medium italic">{legalCase.advisorTip}</p>
                           </div>
                        </div>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        )}

        {activeTab === 'STRESS_TEST' && (
          <div className="grid lg:grid-cols-12 gap-8 animate-fade-in">
              <div className="lg:col-span-4 space-y-4">
                  <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase flex items-center gap-2 mb-6">
                        <Siren size={14} className="text-red-600" /> Profilo di Rischio
                    </h4>
                    <div className="space-y-3">
                        {(Object.entries(ASSET_PROTECTION_DATA.STRESS_TEST_SCENARIOS) as [string, any][]).map(([key, val]) => (
                          <button 
                            key={key} 
                            onClick={() => setSelectedScenario(key as any)}
                            className={`w-full text-left p-5 rounded-2xl border-2 transition-all ${selectedScenario === key ? 'border-emerald-500 bg-emerald-50' : 'border-slate-100 bg-white'}`}
                          >
                              <div className="flex justify-between items-center">
                                <h5 className={`font-black text-[12px] uppercase ${selectedScenario === key ? 'text-emerald-800' : 'text-slate-800'}`}>{val.title}</h5>
                                {selectedScenario === key && <CheckCircle2 size={16} className="text-emerald-600" />}
                              </div>
                              <div className="mt-2 flex gap-2">
                                 <span className="text-[8px] font-black px-2 py-0.5 rounded uppercase bg-amber-100 text-amber-700">Impatto {val.impact}</span>
                                 <span className="text-[9px] text-slate-400 italic">{val.legal_ref}</span>
                              </div>
                          </button>
                        ))}
                    </div>
                  </div>
              </div>
              <div className="lg:col-span-8 bg-white rounded-[3rem] p-10 border border-slate-200 shadow-sm relative overflow-hidden">
                  <div className="flex justify-between items-center mb-10">
                     <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter flex items-center gap-4"><ShieldAlert className="text-emerald-500" /> Analisi Resilienza</h3>
                     <span className="bg-rose-50 px-5 py-2 rounded-2xl text-rose-700 text-[10px] font-black uppercase border border-rose-100">{scenario.title}</span>
                  </div>
                  <div className="space-y-8">
                      {[
                        { label: "Conto Corrente", score: scenario.bank, icon: Landmark, color: "bg-red-500" },
                        { label: "Polizza Standard", score: scenario.policy_standard, icon: ShieldPlus, color: "bg-amber-500" },
                        { label: "MultInvest 90/10", score: scenario.policy_90gs, icon: Lock, color: "bg-indigo-600" },
                        { label: "Fondo Pensione / PIP", score: scenario.pip, icon: ShieldCheck, color: "bg-emerald-600" }
                      ].map((item, idx) => (
                        <div key={idx} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                  <item.icon size={16} className="text-slate-400" />
                                  <span className="text-xs font-black text-slate-700 uppercase">{item.label}</span>
                              </div>
                              <span className="text-sm font-black">{item.score}%</span>
                            </div>
                            <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                              <div className={`h-full ${item.color} transition-all duration-1000`} style={{ width: `${item.score}%` }}></div>
                            </div>
                        </div>
                      ))}
                  </div>
              </div>
          </div>
        )}

        {activeTab === 'MATRICE' && (
          <div className="animate-fade-in bg-white rounded-[3rem] border border-slate-200 overflow-hidden shadow-sm">
             <table className="w-full text-left border-collapse">
                <thead className="bg-slate-900 text-white text-[10px] font-black uppercase">
                   <tr>
                      <th className="px-8 py-8">Asset / Strumento</th>
                      <th className="px-6 py-8 text-center border-l border-white/10">Protezione</th>
                      <th className="px-6 py-8 text-center border-l border-white/10">Pignorabilità</th>
                      <th className="px-6 py-8 border-l border-white/10">Nota Advisor</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-bold text-xs">
                   {ASSET_PROTECTION_DATA.COMPARISON_MATRIX.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                         <td className="px-8 py-6 font-black text-slate-800 text-sm uppercase italic">{row.asset}</td>
                         <td className="px-6 py-6 text-center">
                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase ${
                               row.shield === 'MASSIMO' ? 'bg-emerald-100 text-emerald-700' :
                               row.shield === 'ALTO' ? 'bg-indigo-100 text-indigo-700' :
                               row.shield === 'NULLO' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'
                            }`}>{row.shield}</span>
                         </td>
                         <td className="px-6 py-6 text-center text-rose-600 font-black text-lg">{row.risk}</td>
                         <td className="px-6 py-6 text-slate-500 font-medium italic">{row.detail}</td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
        )}
      </div>

      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
         <div className="flex items-center gap-6">
            <div className="bg-[#0a0f1d] p-4 rounded-[1.5rem] text-white shadow-lg"><ShieldPlus size={32} /></div>
            <div>
               <p className="text-lg font-black text-slate-800 uppercase tracking-tighter leading-none mb-1">Asset Protection Certificate - Gruppo Vomero</p>
               <p className="text-xs text-slate-500 font-bold italic">Rif. Tecnico: Art. 1923 c.c. | Art. 11 D.Lgs 252/05 | Revisione 2025</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AssetProtectionView;
