import React, { useEffect, useState } from 'react';
import './DashboardPage.css';
import CourseFolder from '../../components/CourseFolder/CourseFolder';
import CoursePreview from '../../components/CoursePreview/CoursePreview';
import { inputModal } from '../../utils/modal';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { hideLoader, showLoader } from '../../utils/loader';
import { createNewLecture, fetchAllLectures } from '../../controllers/lecture';
import { fetchPDF } from '../../utils/localFiles';
import { uploadToCloudinary } from '../../cloudinary/cloudinary';
import { getFile, storeFile } from '../../utils/indexDb';
import { createNewCourse } from '../../controllers/course';
const DashboardPage = () => {
  // const [isSelected, setIsSelected] = useState(false);
  const [coursePreviewData, setCoursPreviewData] = useState(null);
  const [courses, setCourses] = useState([]);
  const [reset, setReset] = useState(false);
  const { userCredential } = useAuth();

  const handleAddDocument = async () => {
    try {
      const pdfBlob = await fetchPDF();
      console.log(pdfBlob);
      const id = await storeFile(pdfBlob);
      console.log(id);
      const blob = await getFile(id);

      showLoader('cccc');
      await createNewCourse(
        pdfBlob,
        coursePreviewData.courseCode,
        coursePreviewData.courseTitle,
        userCredential.uid,
        coursePreviewData.docId,
        coursePreviewData.notepadId
      );

      window.location.reload();
    } catch (error) {
      console.error(error);
      toast.error('Could not add document');
    } finally {
      hideLoader('cccc');
    }
  };

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
      async (data) => {
        try {
          if (!data[0] || !data[1]) return;
          await createNewLecture(data[0], data[1], userCredential.uid);
          setReset((p) => !p);
        } catch (error) {
          console.error(error);
          toast.error("Couldn't create lecture");
        } finally {
        }
      }, // onButtonClick
      true, // canHide
      () => console.log('Modal Closed') // onClose
    );
  };

  const onDocumentLoaded = async () => {
    try {
      showLoader('courses');
      const courses = await fetchAllLectures(userCredential.uid);
      setCourses(courses);

      console.log(courses);

      hideLoader('courses');
    } catch (error) {
      console.error();
      toast.error("Couldn't load registered courses");
    }
  };
  useEffect(() => {
    if (!userCredential) return;
    onDocumentLoaded();
  }, [userCredential, reset]);
  return (
    <div className="DashboardPage">
      <h2 className="dashboard-title fade-down">Registered Courses</h2>
      <div className="all-courses fade-up">
        {courses.map((data, i) => (
          <CourseFolder
            courseData={data}
            key={i}
            onClick={() => setCoursPreviewData(data)}
          />
        ))}

        {coursePreviewData && (
          <CoursePreview
            coursePreviewData={coursePreviewData}
            onClick={() => setCoursPreviewData(null)}
            onAddDocument={handleAddDocument}
          />
        )}
        <div className="btn-create-course" onClick={handleCreateCourse}>
          <i className="fa-light fa-plus create-course-icon"></i>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
