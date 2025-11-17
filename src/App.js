import React, { useState } from 'react';
import './App.css';
import InteriorScene from './InteriorScene';
import Exterior from './Exterior';
import Controller from './Controller';

// Audio context for sound effects
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function createSound(frequency, duration, type = 'sine') {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
  oscillator.type = type;

  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

  return { oscillator, gainNode };
}

function playClickSound() {
  const { oscillator } = createSound(800, 0.1, 'square');
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.1);
}

function playToggleSound(on) {
  const freq = on ? 600 : 400;
  const { oscillator } = createSound(freq, 0.2);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.2);
}

function playNavigationSound() {
  const { oscillator } = createSound(1000, 0.15);
  oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.15);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.15);
}

function App() {
  const [lightOn, setLightOn] = useState(false);
  const [fanOn, setFanOn] = useState(false);
  const [gateOpen, setGateOpen] = useState(false);
  const [tvOn, setTvOn] = useState(false);
  const [currentView, setCurrentView] = useState('exterior');
  const [currentRoom, setCurrentRoom] = useState('living');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);

  const toggleLight = () => {
    setLightOn(!lightOn);
    if (soundEnabled) playToggleSound(!lightOn);
  };

  const toggleFan = () => {
    setFanOn(!fanOn);
    if (soundEnabled) playToggleSound(!fanOn);
  };

  const toggleGate = () => {
    setGateOpen(!gateOpen);
    if (soundEnabled) playToggleSound(!gateOpen);
  };

  const toggleTV = () => {
    setTvOn(!tvOn);
    if (soundEnabled) playToggleSound(!tvOn);
  };

  const resetAll = () => {
    setLightOn(false);
    setFanOn(false);
    setGateOpen(false);
    setTvOn(false);
    if (soundEnabled) playClickSound();
  };

  const switchView = (view) => {
    setCurrentView(view);
    if (soundEnabled) playNavigationSound();
  };

  const switchRoom = (room) => {
    setCurrentRoom(room);
    if (soundEnabled) playNavigationSound();
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    playClickSound();
  };

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen);
    playNavigationSound();
  };

  return (
    <div className={`app ${fullscreen ? 'app--fullscreen' : ''}`}>
      {!fullscreen && (
        <div className="app__panel">
          <div className="app__panel-content">
            <h1 className="panel-title">3D House Controller</h1>
            <Controller
              lightOn={lightOn}
              fanOn={fanOn}
              gateOpen={gateOpen}
              tvOn={tvOn}
              currentView={currentView}
              currentRoom={currentRoom}
              soundEnabled={soundEnabled}
              onLight={toggleLight}
              onFan={toggleFan}
              onGate={toggleGate}
              onTV={toggleTV}
              onReset={resetAll}
              onSwitchView={switchView}
              onSwitchRoom={switchRoom}
              onToggleSound={toggleSound}
            />
          </div>
        </div>
      )}
      <div className="app__canvas">
        {currentView === 'exterior' ? (
          <Exterior gateOpen={gateOpen} />
        ) : (
          <InteriorScene lightOn={lightOn} fanOn={fanOn} tvOn={tvOn} currentRoom={currentRoom} />
        )}
        {fullscreen && (
          <button
            className="fullscreen-exit-btn"
            onClick={toggleFullscreen}
            title="Exit Fullscreen"
          >
            ⛶
          </button>
        )}
      </div>
      {!fullscreen && (
        <button
          className="fullscreen-btn"
          onClick={toggleFullscreen}
          title="Enter Fullscreen"
        >
          ⛶
        </button>
      )}
    </div>
  );
}

export default App;
