import React from 'react';
import './QuizPreview.css';
import QuestionComponent from '../QuestionComponent/QuestionComponent';

const QuizPreview = () => {
  return (
    <div className="QuizPreview flex flex-col">
      <div className="head shrink-0">
        <div className="left">
          <p>Quiz</p>
        </div>
        <div className="right">
          <button>Submit</button>
        </div>
      </div>
      <div className="body">
        <QuestionComponent />
        <QuestionComponent />
        <QuestionComponent />
        <QuestionComponent />
        <QuestionComponent />
        <QuestionComponent />
        <QuestionComponent />
      </div>
    </div>
  );
};

export default QuizPreview;
