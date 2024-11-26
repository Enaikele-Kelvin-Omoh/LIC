import React, { useState } from 'react';
import './DashboardPage.css';
import CourseFolder from '../../components/CourseFolder/CourseFolder';
const DashboardPage = () => {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <div className="DashboardPage">
      <h2 className="dashboard-title">Registered Courses</h2>
      <div className="all-courses">
        <CourseFolder />
        <CourseFolder />
        <CourseFolder />
        <CourseFolder />
        <CourseFolder />
        <CourseFolder />
        <CourseFolder />
        <CourseFolder />
        <CourseFolder />
        <CourseFolder />
        <CourseFolder />
        <CourseFolder />
        <CourseFolder />
        <CourseFolder />
        <CourseFolder />
        <CourseFolder />
        <CourseFolder />
        <CourseFolder />
        <CourseFolder />
        <CourseFolder />
        <CourseFolder />
        <CourseFolder />
        <CourseFolder />
        <CourseFolder />
        <CourseFolder />
        <CourseFolder />
        <CourseFolder />
        <CourseFolder />
        <CourseFolder />
        <CourseFolder />
        <CourseFolder />
        <CourseFolder />
        <CourseFolder />
        <CourseFolder />
        <CourseFolder />
        <CourseFolder />
        <CourseFolder />
        <CourseFolder />
        <CourseFolder />
        <CourseFolder />

        <div className="btn-create-course">
          <i className="fa-solid fa-plus create-course-icon"></i>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
