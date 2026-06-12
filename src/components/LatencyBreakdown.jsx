import React from 'react';
import { Tile, ProgressBar } from '@carbon/react';
import { ChartBar } from '@carbon/icons-react';
import './LatencyBreakdown.scss';

const LatencyBreakdown = ({ latencyBreakdown, totalLatency }) => {
  const layers = [
    { key: 'host', label: 'Host Layer', color: 'blue' },
    { key: 'fabric', label: 'Fabric Layer', color: 'purple' },
    { key: 'frontend', label: 'Front-End Layer', color: 'cyan' },
    { key: 'cache', label: 'Cache Layer', color: 'green' },
    { key: 'backend', label: 'Back-End Layer', color: 'red' }
  ];

  const getPercentage = (value) => {
    return ((value / totalLatency) * 100).toFixed(1);
  };

  return (
    <Tile className="latency-breakdown">
      <div className="breakdown-header">
        <ChartBar size={24} />
        <h3>Latency Breakdown</h3>
      </div>

      <div className="total-latency">
        <span className="label">Total Journey Time</span>
        <span className="value">{totalLatency.toFixed(1)}ms</span>
      </div>

      <div className="breakdown-chart">
        {layers.map(layer => {
          const value = latencyBreakdown[layer.key];
          const percentage = getPercentage(value);
          
          return (
            <div key={layer.key} className="breakdown-item">
              <div className="item-header">
                <span className="item-label">{layer.layer}</span>
                <span className="item-value">{value}ms ({percentage}%)</span>
              </div>
              <ProgressBar 
                label={layer.label}
                value={parseFloat(percentage)}
                max={100}
                hideLabel
                className={`progress-${layer.color}`}
              />
            </div>
          );
        })}
      </div>

      <Tile className="breakdown-insights">
        <h4>Key Observations</h4>
        <ul>
          <li>Backend layer contributes the highest latency due to RAID5 parity calculations</li>
          <li>Fabric layer shows moderate latency from network forwarding</li>
          <li>Cache layer has minimal impact with fast lookup operations</li>
        </ul>
      </Tile>
    </Tile>
  );
};

export default LatencyBreakdown;

// Made with Bob
