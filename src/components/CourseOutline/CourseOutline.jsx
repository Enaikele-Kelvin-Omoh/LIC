import React from 'react';
import './CourseOutline.css';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import { endSpeech } from '../../responsiveVoice/responsiveVoice';

const CourseOutline = ({
  lecture,
  onSelectLectureIndex,
  selectedLectureIndex,
}) => {
  if (!lecture) return <LoadingComponent />;
  return (
    <div className="CourseOutline fade-right">
      <div className="heading flex justify-between items-center">
        <p>Course outline</p>
        <i className="fa-regular fa-face-shush" onClick={() => endSpeech()}></i>
      </div>
      <div className="outline-list">
        {lecture.outline.map((data, index) => (
          <div
            className={
              'outline-item ' +
              (data.covered && 'covered-item ') +
              (selectedLectureIndex === index && 'selected-item')
            }
            onClick={() => onSelectLectureIndex(index)}
          >
            <i className="fa-solid fa-caret-right"></i>
            <p>{data?.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseOutline;
