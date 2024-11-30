import folder from '/src/assets/folder.png';
import './CourseFolder.css';
import PropTypes from 'prop-types';

const CourseFolder = ({ onClick }) => {
  return (
    <div className="course-folder" onClick={onClick}>
      <img src={folder} alt="Folder" className="course-icon" />
      <p className="course-code">CSC 201</p>
      <p className="course-title">Computer Science</p>
    </div>
  );
};

CourseFolder.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default CourseFolder;
