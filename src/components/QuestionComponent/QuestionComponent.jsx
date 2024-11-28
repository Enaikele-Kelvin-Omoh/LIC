import React from 'react';
import './QuestionComponent.css';

const QuestionComponent = () => {
  return (
    <div className="QuestionComponent">
      <div className="left">
        <p>1.</p>
      </div>
      <div className="right">
        <p className="question">
          How does humanity's beauty manifest in its diversity, resilience, and
          compassion? In what ways do acts of kindness, the pursuit of meaning
          through art and science, and the ability to overcome challenges
          highlight the profound strength and interconnectedness of the human
          experience despite its imperfections?
        </p>
        <div className="options">
          <Option />
          <Option />
          <Option />
          <Option />
        </div>
      </div>
    </div>
  );
};

const Option = () => {
  return (
    <div className="Option">
      <i className="fa-regular fa-circle-dot"></i>
      <p>Option I thought of</p>
    </div>
  );
};

export default QuestionComponent;
