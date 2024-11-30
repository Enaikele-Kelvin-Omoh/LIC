import React from 'react';
import './QuizPreview.css';
import QuestionComponent from '../QuestionComponent/QuestionComponent';

const QuizPreview = ({ currentLectureData, onSelectOption, onSubmitQuiz }) => {
  return (
    <div className="QuizPreview flex flex-col fade-up">
      <div className="head shrink-0">
        <div className="left">
          <p>{currentLectureData.title}</p>
        </div>
        <div className="right">
          {currentLectureData.graded ? (
            <p className="score-box">
              <span>Score: </span>
              <span
                className={`score ${
                  currentLectureData.score < 40
                    ? 'red'
                    : currentLectureData.score < 60
                    ? 'yellow'
                    : 'green'
                }`}
              >
                {currentLectureData.score}%
              </span>
            </p>
          ) : (
            <button onClick={onSubmitQuiz}>Submit</button>
          )}
        </div>
      </div>
      <div className="body">
        {currentLectureData?.quiz?.map((data, index) => (
          <QuestionComponent
            index={index}
            question={data?.question}
            options={data?.options}
            answer={data?.answer}
            response={data?.response}
            isGraded={currentLectureData?.graded}
            onSelectOption={onSelectOption}
          />
        ))}
      </div>
    </div>
  );
};

export default QuizPreview;
