import React, { useState } from 'react';
import './DashboardPage.css';
import CourseFolder from '../../components/CourseFolder/CourseFolder';
import CoursePreview from '../../components/CoursePreview/CoursePreview';
import { inputModal } from '../../utils/modal';
const DashboardPage = () => {
  // const [isSelected, setIsSelected] = useState(false);
  const [createCourse, setCreateCourse] = useState(false);

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
      <h2 className="dashboard-title fade-down">Registered Courses</h2>
      <div className="all-courses fade-up">
        {Array.from({ length: 40 }, (_, i) => (
          <CourseFolder key={i} onClick={() => setCreateCourse(true)} />
        ))}

        {createCourse && (
          <CoursePreview onClick={() => setCreateCourse(false)} />
        )}
        <div className="btn-create-course" onClick={handleCreateCourse}>
          <i className="fa-light fa-plus create-course-icon"></i>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
