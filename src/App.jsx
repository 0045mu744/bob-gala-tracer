import React, { useState, useEffect } from 'react';
import { Grid, Column, Button, Loading } from '@carbon/react';
import { PlayFilled, Reset, Download } from '@carbon/icons-react';
import { generateSimulation, getSimulationJSON } from './engine/simulationEngine';
import TopologyVisualization from './components/TopologyVisualization';
import HopDetails from './components/HopDetails';
import LatencyBreakdown from './components/LatencyBreakdown';
import AIInsights from './components/AIInsights';
import FinalNarrative from './components/FinalNarrative';
import './App.scss';

function App() {
  const [simulation, setSimulation] = useState(null);
  const [currentHop, setCurrentHop] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const buildTime = new Date().toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Calcutta'
  });

  useEffect(() => {
    // Initialize simulation data
    const simData = generateSimulation();
    setSimulation(simData);
  }, []);

  const startSimulation = () => {
    setIsAnimating(true);
    setShowResults(false);
    setCurrentHop(-1);

    // Animate through each hop
    let hopIndex = 0;
    const interval = setInterval(() => {
      if (hopIndex < simulation.hops.length) {
        setCurrentHop(hopIndex);
        hopIndex++;
      } else {
        clearInterval(interval);
        setIsAnimating(false);
        setShowResults(true);
      }
    }, 1500); // 1.5 seconds per hop
  };

  const resetSimulation = () => {
    setCurrentHop(-1);
    setIsAnimating(false);
    setShowResults(false);
  };

  const downloadJSON = () => {
    const json = getSimulationJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'byte-tracer-simulation.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!simulation) {
    return (
      <div className="app-loading">
        <Loading description="Loading Byte Tracer..." withOverlay={false} />
      </div>
    );
  }

  return (
    <div className="app">
      {/* Header Section - Separate Grid */}
      <Grid className="app-header">
        <Column sm={4} md={8} lg={16}>
          <div className="header-content">
            <h1>Byte Tracer</h1>
            <p className="subtitle">IBM FlashSystem I/O Journey Simulator</p>
            <p className="build-time">Build: {buildTime}</p>
          </div>
          <div className="header-actions">
            <Button
              kind="primary"
              renderIcon={PlayFilled}
              onClick={startSimulation}
              disabled={isAnimating}
            >
              {isAnimating ? 'Simulating...' : 'Start Simulation'}
            </Button>
            <Button
              kind="secondary"
              renderIcon={Reset}
              onClick={resetSimulation}
              disabled={isAnimating}
            >
              Reset
            </Button>
            <Button
              kind="tertiary"
              renderIcon={Download}
              onClick={downloadJSON}
            >
              Export JSON
            </Button>
          </div>
        </Column>
      </Grid>

      {/* Main Content - Separate Grid */}
      <Grid className="app-main">
        <Column sm={4} md={8} lg={16}>
          <TopologyVisualization
            hops={simulation.hops}
            currentHop={currentHop}
            isAnimating={isAnimating}
          />

          {currentHop >= 0 && (
            <HopDetails
              hop={simulation.hops[currentHop]}
              hopIndex={currentHop}
            />
          )}

          {!isAnimating && currentHop === -1 && (
            <HopDetails hop={null} hopIndex={-1} />
          )}
        </Column>
      </Grid>

      {/* Results Section - Separate Grid */}
      {showResults && (
        <Grid className="app-results">
          <Column sm={4} md={8} lg={16}>
            <LatencyBreakdown
              latencyBreakdown={simulation.latency_breakdown}
              totalLatency={simulation.total_latency_ms}
            />

            <AIInsights insights={simulation.ai_insights} />

            <FinalNarrative narrative={simulation.final_narrative} />
          </Column>
        </Grid>
      )}

      {/* Footer Section - Separate Grid */}
      <Grid className="app-footer">
        <Column sm={4} md={8} lg={16}>
          <p>
            Powered by IBM Bob AI Reasoning Engine | 
            Simulating {simulation.topology.length} components across {simulation.hops.length} hops
          </p>
        </Column>
      </Grid>
    </div>
  );
}

export default App;

// Made with Bob
