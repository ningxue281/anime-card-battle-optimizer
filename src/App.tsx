import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '@pages/Dashboard';
import Characters from '@pages/Characters';
import Supports from '@pages/Supports';
import Traits from '@pages/Traits';
import TeamBuilder from '@pages/TeamBuilder';
import TeamOptimizer from '@pages/TeamOptimizer';
import BattleSimulator from '@pages/BattleSimulator';
import Statistics from '@pages/Statistics';
import Settings from '@pages/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/supports" element={<Supports />} />
        <Route path="/traits" element={<Traits />} />
        <Route path="/team-builder" element={<TeamBuilder />} />
        <Route path="/team-optimizer" element={<TeamOptimizer />} />
        <Route path="/battle-simulator" element={<BattleSimulator />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
