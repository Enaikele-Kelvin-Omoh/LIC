import React from 'react';
import './CoursePreview.css';
import editpdf from '/src/assets/edit-pdf.svg';
import addpdf from '/src/assets/add-pdf.svg';
import pdficon from '/src/assets/pdficon.png';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { pageLinks } from '../../site/pageLinks';
import { formatDateWithTime } from '../../utils/date';

const CoursePreview = ({ onClick, coursePreviewData, onAddDocument }) => {
  const navigate = useNavigate();
  return (
    <div className="CoursePreview" onClick={onClick}>
      <div
        className="course-preview-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="course-header">
          <div className="course-details">
            <h2 className="course-preview-code">
              {coursePreviewData?.courseCode}: {coursePreviewData?.courseTitle}
            </h2>
            <p className="course-date">
              {formatDateWithTime(coursePreviewData?.createdAt?.seconds)}
            </p>
          </div>
          <div className="course-icons">
            <img
              src={editpdf}
              alt="Edit pdf icon"
              className="pointer"
              onClick={() =>
                navigate(
                  pageLinks.notepadPage.baseUrl +
                    '/' +
                    coursePreviewData?.notepadId
                )
              }
            />
            <img
              src={addpdf}
              alt="Add pdf icon"
              onClick={onAddDocument}
              className="pointer"
            />
          </div>
        </div>
        {coursePreviewData.courses.length === 0 && (
          <p>No Document Uploaded yet</p>
        )}
        {coursePreviewData?.courses.map((data, i) => (
          <div
            className="course-preview-pdfs"
            key={i}
            onClick={(e) =>
              navigate(pageLinks.lecturePage.baseUrl + '/' + data.courseId)
            }
          >
            <img src={pdficon} alt="pdf" />
            <div className="course-pdf-details">
              <p className="course-preview-title">{data?.fileName}</p>
              <p className="course-pdf-size">{data?.fileSize?.toFixed(2)}Mb</p>
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
