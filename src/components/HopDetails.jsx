import React from 'react';
import { Information } from '@carbon/icons-react';
import './HopDetails.scss';

const HopDetails = ({ hop, hopIndex }) => {
  if (!hop) {
    return (
      <div className="hop-details empty">
        <div className="empty-state">
          <Information size={32} />
          <p>Click "Start Simulation" to begin the I/O journey</p>
        </div>
      </div>
    );
  }

  return (
    <div className="hop-details">
      <div className="hop-details-header">
        <div className="hop-badge">Hop {hopIndex + 1}</div>
        <h3>{hop.title}</h3>
      </div>

      <div className="hop-details-content">
        <div className="detail-section">
          <label>Component Path</label>
          <div className="detail-value component-path">{hop.component}</div>
        </div>

        <div className="detail-section">
          <label>Description</label>
          <div className="detail-value">{hop.description}</div>
        </div>

        <div className="detail-grid">
          <div className="detail-section">
            <label>Operation</label>
            <div className="detail-value operation">{hop.operation}</div>
          </div>

          <div className="detail-section">
            <label>Latency</label>
            <div className="detail-value latency">{hop.latency_ms}ms</div>
          </div>
        </div>

        <div className="detail-section reasoning">
          <label>Technical Reasoning</label>
          <div className="detail-value reasoning-text">
            <Information size={16} />
            <span>{hop.reasoning}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HopDetails;

// Made with Bob
