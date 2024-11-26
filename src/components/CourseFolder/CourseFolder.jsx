import folder from '/src/assets/folder.png';
import './CourseFolder.css';

const CourseFolder = () => {
  return (
    <div className="course-folder">
      <img src={folder} alt="Folder" className="course-icon" />
      <p className="course-code">CSC 201</p>
      <p className="course-title">Computer Science</p>
    </div>
  );
};

export default CourseFolder;
