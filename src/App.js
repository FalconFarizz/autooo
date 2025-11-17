import React, { useState } from 'react';
import './App.css';
import InteriorScene from './InteriorScene';
import Exterior from './Exterior';
import Controller from './Controller';

function App() {
  const [lightOn, setLightOn] = useState(false);
  const [fanOn, setFanOn] = useState(false);
  const [gateOpen, setGateOpen] = useState(false);
  const [tvOn, setTvOn] = useState(false);
  const [currentView, setCurrentView] = useState('exterior');

  const toggleLight = () => setLightOn(!lightOn);
  const toggleFan = () => setFanOn(!fanOn);
  const toggleGate = () => setGateOpen(!gateOpen);
  const toggleTV = () => setTvOn(!tvOn);

  const resetAll = () => {
    setLightOn(false);
    setFanOn(false);
    setGateOpen(false);
    setTvOn(false);
  };

  const switchView = (view) => setCurrentView(view);

  return (
    <div className="app">
      <div className="app__panel">
        <div className="app__panel-content">
          <h1 className="panel-title">3D House Controller</h1>
          <Controller
            lightOn={lightOn}
            fanOn={fanOn}
            gateOpen={gateOpen}
            tvOn={tvOn}
            currentView={currentView}
            onLight={toggleLight}
            onFan={toggleFan}
            onGate={toggleGate}
            onTV={toggleTV}
            onReset={resetAll}
            onSwitchView={switchView}
          />
        </div>
      </div>
      <div className="app__canvas">
        {currentView === 'exterior' ? (
          <Exterior gateOpen={gateOpen} />
        ) : (
          <InteriorScene lightOn={lightOn} fanOn={fanOn} tvOn={tvOn} />
        )}
      </div>
    </div>
  );
}

export default App;
