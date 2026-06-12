import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckmarkFilled } from '@carbon/icons-react';
import './TopologyVisualization.scss';

const TopologyVisualization = ({ hops, currentHop, isAnimating }) => {
  const [completedHops, setCompletedHops] = useState([]);

  useEffect(() => {
    if (currentHop >= 0) {
      setCompletedHops(prev => {
        if (!prev.includes(currentHop)) {
          return [...prev, currentHop];
        }
        return prev;
      });
    }
  }, [currentHop]);

  useEffect(() => {
    if (!isAnimating) {
      setCompletedHops([]);
    }
  }, [isAnimating]);

  const getHopStatus = (index) => {
    if (completedHops.includes(index)) return 'completed';
    if (index === currentHop) return 'active';
    return 'pending';
  };

  return (
    <div className="topology-visualization">
      <div className="topology-header">
        <h3>I/O Journey Path</h3>
        <p className="topology-subtitle">FlashSystem Write Request Flow</p>
      </div>
      
      <div className="topology-flow">
        {hops.map((hop, index) => (
          <React.Fragment key={index}>
            <div className={`hop-node ${getHopStatus(index)}`}>
              <div className="hop-icon">
                {completedHops.includes(index) ? (
                  <CheckmarkFilled size={20} />
                ) : (
                  <span className="hop-number">{index + 1}</span>
                )}
              </div>
              <div className="hop-content">
                <div className="hop-component">{hop.component}</div>
                <div className="hop-title">{hop.title}</div>
                <div className="hop-latency">{hop.latency_ms}ms</div>
              </div>
            </div>
            
            {index < hops.length - 1 && (
              <div className={`hop-connector ${getHopStatus(index)}`}>
                <ArrowRight size={24} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default TopologyVisualization;

// Made with Bob
