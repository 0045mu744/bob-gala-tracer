import React from 'react';
import { DocumentView } from '@carbon/icons-react';
import './FinalNarrative.scss';

const FinalNarrative = ({ narrative }) => {
  return (
    <div className="final-narrative">
      <div className="narrative-header">
        <DocumentView size={24} />
        <h3>Complete Journey Narrative</h3>
      </div>

      <div className="narrative-content">
        <div className="narrative-text">
          {narrative.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>

      <div className="narrative-footer">
        <p>This narrative provides a comprehensive, human-readable story of the byte's complete journey through the IBM FlashSystem infrastructure.</p>
      </div>
    </div>
  );
};

export default FinalNarrative;

// Made with Bob
