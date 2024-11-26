import React from 'react';
import './PresentationPreview.css';
const PresentationPreview = ({ onShowQuestionBox }) => {
  return (
    <div className="PresentationPreview">
      <div className="heading w-full flex items-center justify-between">
        <div className="left-box flex items-center">
          <i className="fa-solid fa-brain"></i>
          <p>100%</p>
        </div>
        <div className="right-box flex gap-4">
          <button className="btn-2 rest">
            Restart Lecture <i className="fa-solid fa-rotate"></i>
          </button>
          <button className="btn-2 quest" onClick={onShowQuestionBox}>
            Ask a question <i className="fa-solid fa-question"></i>
          </button>
        </div>
      </div>
      <div className="body flex flex-col gap-4">
        <p className="title mb-4">Understanding Algorithms</p>
        <PowerPoint />
        <PowerPoint />
        <PowerPoint />
        <PowerPoint />
        <PowerPoint />
      </div>
      <div className="btn-block">
        <button>I Understand</button>
      </div>
    </div>
  );
};

const PowerPoint = () => {
  return (
    <div className="PowerPoint">
      <div className="left">
        <i className="fa-solid fa-diamond"></i>
        <p>The first point that was AI generated</p>
      </div>
      <div className="right">
        <i className="fa-solid fa-download"></i>
      </div>
    </div>
  );
};

export default PresentationPreview;
