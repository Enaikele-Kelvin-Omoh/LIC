import React from 'react';
import './QuestionComponent.css';

const QuestionComponent = ({
  index,
  question,
  options,
  answer,
  response,
  isGraded,
  onSelectOption,
}) => {
  return (
    <div className="QuestionComponent">
      <div className="left">
        <p>{index + 1}.</p>
      </div>
      <div className="right">
        <p className="question">{question}</p>
        <div className="options">
          {isGraded ? (
            <>
              {options?.map((data) => (
                <OptionReviewed
                  option={data}
                  isCorrect={data === answer}
                  isSelected={data === response}
                />
              ))}
            </>
          ) : (
            <>
              {options?.map((data) => (
                <Option
                  option={data}
                  onClick={() => onSelectOption(index, data)}
                  isSelected={data === response}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const Option = ({ option, onClick, isSelected }) => {
  return (
    <div
      className={`Option ${isSelected ? 'selected-option ' : ''}`}
      onClick={onClick}
    >
      <i className="fa-regular fa-circle-dot"></i>
      <p>{option}</p>
    </div>
  );
};

const OptionReviewed = ({ option, isSelected, isCorrect }) => {
  return (
    <div
      className={`Option ${
        isCorrect
          ? 'correct-option '
          : isSelected && !isCorrect
          ? 'wrong-option'
          : ''
      }`}
    >
      <i className="fa-regular fa-circle-dot"></i>
      <p>{option}</p>
    </div>
  );
};

export default QuestionComponent;
