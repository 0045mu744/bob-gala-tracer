import React from 'react';
import { Tile, Tag } from '@carbon/react';
import { Information } from '@carbon/icons-react';
import './HopDetails.scss';

const HopDetails = ({ hop, hopIndex }) => {
  if (!hop) {
    return (
      <Tile className="hop-details empty">
        <div className="empty-state">
          <Information size={32} />
          <p>Click "Start Simulation" to begin the I/O journey</p>
        </div>
      </Tile>
    );
  }

  return (
    <Tile className="hop-details">
      <div className="hop-details-header">
        <Tag type="blue" size="md">Hop {hopIndex + 1}</Tag>
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
            <Tag type="cyan" size="md" className="operation-tag">{hop.operation}</Tag>
          </div>

          <div className="detail-section">
            <label>Latency</label>
            <Tag type="green" size="md" className="latency-tag">{hop.latency_ms}ms</Tag>
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
    </Tile>
  );
};

export default HopDetails;

// Made with Bob
