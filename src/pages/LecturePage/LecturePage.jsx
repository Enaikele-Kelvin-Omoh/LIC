import React, { useState } from 'react';
import './LecturePage.css';
import CourseOutline from '../../components/CourseOutline/CourseOutline';
import PresentationPreview from '../../components/PresentationPreview/PresentationPreview';
import CoursePreview from '../../components/CoursePreview/CoursePreview';
import NotepadPreview from '../../components/NotepadPreview/NotepadPreview';
import QuestionBox from '../../components/QuestionBox/QuestionBox';
import QuizPreview from '../../components/QuizPreview/QuizPreview';

const LecturePage = () => {
  const [questionVisible, setQuestionVisible] = useState(false);
  const [quizMode, setQuizMode] = useState(false);
  return (
    <div className="LecturePage ">
      <div className="location-block flex items-center">
        <p className="course-code">CSC201</p>
        <i className="fa-light fa-chevron-right"></i>
        <p className="file-name">Introduction to computer programing.pdf</p>
      </div>
      <div className="explanation-block">
        <div className="outline-block fade-right">
          <CourseOutline />
        </div>

        <div className="presentation-block intro-anim-fade">
          {quizMode ? (
            <QuizPreview />
          ) : (
            <PresentationPreview
              onShowQuestionBox={() => setQuestionVisible(true)}
            />
          )}
        </div>
        <div className="preview-block fade-left">
          {!quizMode && <CoursePreview />}
        </div>
      </div>
      {!quizMode && (
        <div className="notepad-block fade-up">
          <NotepadPreview />
        </div>
      )}
      <QuestionBox
        visible={questionVisible}
        onHideQuestionBox={() => setQuestionVisible(false)}
      />
    </div>
  );
};

export default LecturePage;
