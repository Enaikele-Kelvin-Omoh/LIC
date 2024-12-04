import folder from '/src/assets/folder.png';
import './CourseFolder.css';
import PropTypes from 'prop-types';

const CourseFolder = ({ onClick, courseData }) => {
  return (
    <div className="course-folder" onClick={onClick}>
      <img src={folder} alt="Folder" className="course-icon" />
      <p className="course-code">{courseData?.courseCode}</p>
      <p className="course-title">{courseData?.courseTitle}</p>
    </div>
  );
};

CourseFolder.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default CourseFolder;
