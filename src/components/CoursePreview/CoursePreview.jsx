import React from 'react';
import './CoursePreview.css';
import editpdf from '/src/assets/edit-pdf.svg';
import addpdf from '/src/assets/add-pdf.svg';
import pdficon from '/src/assets/pdficon.png';
import PropTypes from 'prop-types';

const CoursePreview = ({ onClick }) => {
  return (
    <div className="CoursePreview" onClick={onClick}>
      <div className="course-preview-container">
        <div className="course-header">
          <div className="course-details">
            <h2 className="course-preview-code">CSC 201: Computer Science</h2>
            <p className="course-date">12th November, 2024</p>
          </div>
          <div className="course-icons">
            <img src={editpdf} alt="Edit pdf icon" />
            <img src={addpdf} alt="Add pdf icon" />
          </div>
        </div>
        {Array.from({ length: 5 }, (_, i) => (
          <div className="course-preview-pdfs" key={i}>
            <img src={pdficon} alt="pdf" />
            <div className="course-pdf-details">
              <p className="course-preview-title">
                Introduction to Computer Programming.pdf
              </p>
              <p className="course-pdf-size">12.2Mb</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

CoursePreview.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default CoursePreview;
