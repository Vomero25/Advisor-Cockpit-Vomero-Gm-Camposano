
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import BenefitsView from './components/BenefitsView';
import SimulatorView from './components/SimulatorView';
import CorporateSimulatorView from './components/CorporateSimulatorView';
import TfmSimulatorView from './components/TfmSimulatorView';
import NegotiationView from './components/NegotiationView';
import ChatInterface from './components/ChatInterface';
import MultInvestAnalysisView from './components/MultInvestAnalysisView';
import AssetProtectionView from './components/AssetProtectionView'; 
import FiscalCalculatorView from './components/FiscalCalculatorView';
import SnowballEffectView from './components/SnowballEffectView';
import LtcAnalysisView from './components/LtcAnalysisView';
import SuccessionView from './components/SuccessionView';
import RealEstateSuccessionView from './components/RealEstateSuccessionView';
import RealEstateTaxView from './components/RealEstateTaxView';
import InterviewView from './components/InterviewView';
import PacComparisonView from './components/PacComparisonView';
import CovipBenchmarkView from './components/CovipBenchmarkView';
import ProtectionParadoxView from './components/ProtectionParadoxView';
import WealthProtectionHubView from './components/WealthProtectionHubView';
import ComparatoreView from './components/ComparatoreView';
import MarketDimensionsView from './components/MarketDimensionsView';
import BehavioralFinanceView from './components/BehavioralFinanceView';
import PensionErosionView from './components/PensionErosionView';
import PensionGeographyView from './components/PensionGeographyView';
import Budget2026View from './components/Budget2026View';
import CovipAnalytics2024View from './components/CovipAnalytics2024View';
import CovipIntelligence2024View from './components/CovipIntelligence2024View';
import MethodologyView from './components/MethodologyView';
import RitaSimulatorView from './components/RitaSimulatorView';
import { PageView } from './types';
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
        <div className="lg:hidden bg-white border-b border-slate-200 p-4 flex justify-between items-center z-10">
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
