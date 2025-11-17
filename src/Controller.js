import React from 'react';
import './Controller.css';

const DeviceCard = ({ icon, label, state, description, onClick }) => {
  return (
    <button type="button" className={`device-card ${state ? 'device-card--active' : ''}`} onClick={onClick}>
      <span className="device-card__icon">{icon}</span>
      <div className="device-card__info">
        <span className="device-card__label">{label}</span>
        <span className="device-card__description">{description}</span>
      </div>
      <span className={`device-card__toggle ${state ? 'device-card__toggle--on' : ''}`}>
        <span className="device-card__toggle-handle" />
      </span>
    </button>
  );
};

const Controller = ({
  currentView,
  currentRoom,
  soundEnabled,
  lightOn,
  fanOn,
  gateOpen,
  tvOn,
  onLight,
  onFan,
  onGate,
  onTV,
  onReset,
  onSwitchView,
  onSwitchRoom,
  onToggleSound
}) => {
  const devices = [
    {
      icon: '💡',
      label: 'Main Lights',
      state: lightOn,
      description: lightOn ? 'Illuminating' : 'Tap to brighten',
      onClick: onLight,
    },
    {
      icon: '📺',
      label: 'Entertainment',
      state: tvOn,
      description: tvOn ? 'Playing' : 'Screen off',
      onClick: onTV,
    },
    {
      icon: '🚪',
      label: 'Entrance Gate',
      state: gateOpen,
      description: gateOpen ? 'Gate open' : 'Gate closed',
      onClick: onGate,
    },
    {
      icon: '💨',
      label: 'Ceiling Fan',
      state: fanOn,
      description: fanOn ? 'Cooling' : 'Tap for breeze',
      onClick: onFan,
    },
  ];

  const viewOptions = [
    {
      icon: '🏠',
      label: 'Exterior View',
      state: currentView === 'exterior',
      description: currentView === 'exterior' ? 'Outside the house' : 'Tap to go outside',
      onClick: () => onSwitchView('exterior'),
    },
    {
      icon: '🏡',
      label: 'Interior Rooms',
      state: currentView === 'interior',
      description: currentView === 'interior' ? 'Inside the house' : 'Tap to go inside',
      onClick: () => onSwitchView('interior'),
    },
  ];

  const roomOptions = [
    {
      icon: '🛋️',
      label: 'Living Room',
      state: currentRoom === 'living',
      description: currentRoom === 'living' ? 'Current room' : 'Modern living space',
      onClick: () => onSwitchRoom('living'),
    },
    {
      icon: '👨‍🍳',
      label: 'Kitchen',
      state: currentRoom === 'kitchen',
      description: currentRoom === 'kitchen' ? 'Current room' : 'Modern kitchen',
      onClick: () => onSwitchRoom('kitchen'),
    },
    {
      icon: '🛏️',
      label: 'Bedroom',
      state: currentRoom === 'bedroom',
      description: currentRoom === 'bedroom' ? 'Current room' : 'Cozy bedroom',
      onClick: () => onSwitchRoom('bedroom'),
    },
  ];

  const soundControls = [
    {
      icon: '🔊',
      label: 'Sound Effects',
      state: soundEnabled,
      description: soundEnabled ? 'Audio enabled' : 'Audio disabled',
      onClick: onToggleSound,
    },
  ];

  return (
    <div className="controller">
      <h1 className="controller__title">3D House Controller</h1>
      <div className="controller__status">
        <span>Lights: {lightOn ? 'On' : 'Off'}</span>
        <span>TV: {tvOn ? 'Playing' : 'Off'}</span>
        <span>Gate: {gateOpen ? 'Open' : 'Closed'}</span>
        <span>Fan: {fanOn ? 'On' : 'Off'}</span>
      </div>
      <div className="controller__section">
        <h2 className="controller__section-title">Quick Controls</h2>
        <div className="device-grid">
          {devices.map((device) => (
            <DeviceCard key={device.label} {...device} />
          ))}
        </div>
      </div>
      <div className="controller__section">
        <h2 className="controller__section-title">View Options</h2>
        <div className="device-grid">
          {viewOptions.map((option) => (
            <DeviceCard key={option.label} {...option} />
          ))}
        </div>
      </div>
      {currentView === 'interior' && (
        <div className="controller__section">
          <h2 className="controller__section-title">Room Navigation</h2>
          <div className="device-grid">
            {roomOptions.map((room) => (
              <DeviceCard key={room.label} {...room} />
            ))}
          </div>
        </div>
      )}
      <div className="controller__section">
        <h2 className="controller__section-title">Settings</h2>
        <div className="device-grid">
          {soundControls.map((control) => (
            <DeviceCard key={control.label} {...control} />
          ))}
        </div>
      </div>
      <button type="button" className="controller__reset" onClick={onReset}>
        Reset All
      </button>
    </div>
  );
};

export default Controller;
