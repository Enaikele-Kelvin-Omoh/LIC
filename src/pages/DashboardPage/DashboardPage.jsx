import React, { useState } from 'react';
import './DashboardPage.css';
import CourseFolder from '../../components/CourseFolder/CourseFolder';
import { inputModal } from '../../utils/modal';
const DashboardPage = () => {
  // const [isSelected, setIsSelected] = useState(false);
  // const [createCourse, setCreateCourse] = useState(false);

  const handleCreateCourse = () => {
    inputModal(
      'Create Course', // title
      [
        {
          label: 'Enter Course Code',
          placeholder: 'E.g. CSC 201',
          value: '',
        },
        {
          label: 'Enter Course Title',
          placeholder: 'E.g. Computer Science',
          value: '',
        },
      ],
      'Create Course',
      (data) => {
        console.log('Course Created:', data);
      }, // onButtonClick
      true, // canHide
      () => console.log('Modal Closed'), // onClose
    );
  };
  return (
    <div className="DashboardPage">
      <h2 className="dashboard-title">Registered Courses</h2>
      <div className="all-courses">
        {Array.from({ length: 40 }, (_, i) => (
          <CourseFolder key={i} />
        ))}

        <div className="btn-create-course" onClick={handleCreateCourse}>
          <i className="fa-solid fa-plus create-course-icon"></i>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
