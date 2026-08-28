import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import LandingPage from '@/pages/LandingPage';
import DashboardPage from '@/pages/DashboardPage';
import MarineIntelligencePage from '@/pages/MarineIntelligencePage';
import MapExplorerPage from '@/pages/MapExplorerPage';
import AlertsPage from '@/pages/AlertsPage';
import DataSourcesPage from '@/pages/DataSourcesPage';
import AIAgentsPage from '@/pages/AIAgentsPage';
import ChatPage from '@/pages/ChatPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/marine-intelligence" element={<MarineIntelligencePage />} />
          <Route path="/map" element={<MapExplorerPage />} />
          <Route path="/alerts" element={<AlertsPage />} />
          <Route path="/data-sources" element={<DataSourcesPage />} />
          <Route path="/ai-agents" element={<AIAgentsPage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
