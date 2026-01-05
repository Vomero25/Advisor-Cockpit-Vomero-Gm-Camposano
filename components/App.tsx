
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import BenefitsView from './BenefitsView';
import SimulatorView from './SimulatorView';
import CorporateSimulatorView from './CorporateSimulatorView';
import TfmSimulatorView from './TfmSimulatorView';
import NegotiationView from './NegotiationView';
import ChatInterface from './ChatInterface';
import MultInvestAnalysisView from './MultInvestAnalysisView';
import AssetProtectionView from './AssetProtectionView'; 
import FiscalCalculatorView from './FiscalCalculatorView';
import SnowballEffectView from './SnowballEffectView';
import LtcAnalysisView from './LtcAnalysisView';
import SuccessionView from './SuccessionView';
import RealEstateSuccessionView from './RealEstateSuccessionView';
import RealEstateTaxView from './RealEstateTaxView';
import InterviewView from './InterviewView';
import PacComparisonView from './PacComparisonView';
import CovipBenchmarkView from './CovipBenchmarkView';
import ProtectionParadoxView from './ProtectionParadoxView';
import WealthProtectionHubView from './WealthProtectionHubView';
import ComparatoreView from './ComparatoreView';
import MarketDimensionsView from './MarketDimensionsView';
import BehavioralFinanceView from './BehavioralFinanceView';
import PensionErosionView from './PensionErosionView';
import PensionGeographyView from './PensionGeographyView';
import Budget2026View from './Budget2026View';
import CovipAnalytics2024View from './CovipAnalytics2024View';
import CovipIntelligence2024View from './CovipIntelligence2024View';
import MethodologyView from './MethodologyView';
import RitaSimulatorView from './RitaSimulatorView';
import ExtraDeductibilityView from './ExtraDeductibilityView';
import SpazioPrevidenzaView from './SpazioPrevidenzaView';
import ZurichSmartProtectionView from './ZurichSmartProtectionView';
import FiscalArbitrageView from './FiscalArbitrageView';
import RegulationsFondiView from './RegulationsFondiView';
import { PageView } from '../types';
import { Menu } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<PageView>(PageView.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (currentView) {
      case PageView.DASHBOARD:
        return <Dashboard onChangeView={setCurrentView} />;
      case PageView.BUDGET_2026:
        return <Budget2026View />;
      case PageView.COVIP_INTELLIGENCE_2024:
        return <CovipIntelligence2024View />;
      case PageView.COVIP_ANALYTICS_2024:
        return <CovipAnalytics2024View />;
      case PageView.INTERVIEW:
        return <InterviewView onChangeView={setCurrentView} />;
      case PageView.PENSION_EROSION:
        return <PensionErosionView />;
      case PageView.BEHAVIORAL_FINANCE:
        return <BehavioralFinanceView />;
      case PageView.COVIP_BENCHMARK:
        return <CovipBenchmarkView />;
      case PageView.MULTINVEST_ANALYSIS:
        return <MultInvestAnalysisView />;
      case PageView.ASSET_PROTECTION: 
        return <AssetProtectionView />;
      case PageView.VANTAGGI_LAVORATORI:
        return <BenefitsView type="WORKER" onChangeView={setCurrentView} />;
      case PageView.VANTAGGI_AZIENDE:
        return <BenefitsView type="COMPANY" onChangeView={setCurrentView} />;
      case PageView.SIMULATOR:
        return <SimulatorView />;
      case PageView.RITA_SIMULATOR:
        return <RitaSimulatorView />;
      case PageView.PAC_SIMULATOR:
        return <PacComparisonView />;
      case PageView.CORPORATE_SIMULATOR:
        return <CorporateSimulatorView />;
      case PageView.LTC_ANALYSIS:
        return <LtcAnalysisView />;
      case PageView.SUCCESSION_ANALYSIS:
        return <SuccessionView />;
      case PageView.REAL_ESTATE_SUCCESSION:
        return <RealEstateSuccessionView />;
      case PageView.REAL_ESTATE_TAX:
        return <RealEstateTaxView />;
      case PageView.TFM_SIMULATOR:
        return <TfmSimulatorView />;
      case PageView.FISCAL_CALCULATOR:
        return <FiscalCalculatorView />;
      case PageView.NEGOTIATION:
        return <NegotiationView />;
      case PageView.AI_ASSISTANT:
        return <ChatInterface />;
      case PageView.PROTECTION_PARADOX:
        return <ProtectionParadoxView />;
      case PageView.WEALTH_PROTECTION_MASTERCLASS:
        return <WealthProtectionHubView />;
      case PageView.COMPARATORE:
        return <ComparatoreView />;
      case PageView.MARKET_DIMENSIONS:
        return <MarketDimensionsView />;
      case PageView.PENSION_GEOGRAPHY:
        return <PensionGeographyView />;
      case PageView.METHODOLOGY:
        return <MethodologyView />;
      case PageView.EXTRA_DEDUCTIBILITY:
        return <ExtraDeductibilityView />;
      case PageView.ZURICH_SPAZIO_PREVIDENZA:
        return <SpazioPrevidenzaView />;
      case PageView.ZURICH_SMART_PROTECTION:
        return <ZurichSmartProtectionView />;
      case PageView.FISCAL_ARBITRAGE:
        return <FiscalArbitrageView />;
      case PageView.REGULATIONS_FONDI:
        return <RegulationsFondiView />;
      default:
        return <Dashboard onChangeView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      <Sidebar 
        currentView={currentView} 
        onChangeView={setCurrentView} 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <div className="lg:hidden bg-white border-b border-slate-200 p-4 flex justify-between items-center z-10 no-print">
          <h1 className="font-bold text-slate-900 uppercase tracking-tighter">GRUPPO VOMERO</h1>
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-slate-600 hover:bg-slate-100 rounded">
            <Menu size={24} />
          </button>
        </div>
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
