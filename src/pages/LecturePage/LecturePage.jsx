import React, { useEffect, useRef, useState } from 'react';
import './LecturePage.css';
import CourseOutline from '../../components/CourseOutline/CourseOutline';
import PresentationPreview from '../../components/PresentationPreview/PresentationPreview';
import CoursePreview from '../../components/CoursePreview/CoursePreview';
import NotepadPreview from '../../components/NotepadPreview/NotepadPreview';
import QuestionBox from '../../components/QuestionBox/QuestionBox';
import QuizPreview from '../../components/QuizPreview/QuizPreview';
import { toast } from 'react-toastify';
import { hideLoader, showLoader } from '../../utils/loader';
import { fetchDummyLectures } from '../../site/dummyMethods';
import {
  endSpeech,
  pauseSpeech,
  resumeSpeech,
  startSpeech,
} from '../../responsiveVoice/responsiveVoice';
import { gradeQuiz } from '../../utils/quiGrader';

const LecturePage = () => {
  const notepadRef = useRef(null);
  const [questionVisible, setQuestionVisible] = useState(false);
  const [quizMode, setQuizMode] = useState(false);
  const [maxNotepad, setMaxNotepad] = useState(false);
  const [lectureData, setLectureData] = useState(null);
  const [currentLectureIndex, setCurrentLectureIndex] = useState(null);
  const [notepad, setNotepad] = useState([
    'Point required to excerise freedom',
    'Some shenanigans',
  ]);

  // Methods
  const loadState = async () => {
    try {
      const data = await fetchDummyLectures();
      console.log(data);
      setLectureData(data);
      setCurrentLectureIndex(0);
    } catch (error) {
      console.error(error);
      toast.error('Error loading data');
    } finally {
    }
  };

  const handleDeletePoint = (pIndex) => {
    setNotepad((p) => p.filter((_, index) => index !== pIndex));
  };

  const handleAddPoint = (point) => {
    setNotepad((p) => [...p, point]);
  };
  const handleCourseSelection = (index) => {
    // if (index === currentLectureIndex) return;

    const tempLectureData = { ...lectureData };
    tempLectureData.outline[index].covered = true;
    setLectureData(tempLectureData);
    setCurrentLectureIndex(index);

    if (tempLectureData.outline[index].isQuiz) {
      endSpeech();
      return;
    }
    startSpeech(tempLectureData?.outline[index]?.explanation, () => {
      handleOutlineCompletion();
    });
  };

  const handleOptionSelect = (index, data) => {
    const tempLectureData = { ...lectureData };
    tempLectureData.outline[currentLectureIndex].quiz[index].response = data;

    console.log(tempLectureData.outline[currentLectureIndex].quiz[index]);

    setLectureData(tempLectureData);
  };

  const handleSubmitQuiz = () => {
    const newQuiz = gradeQuiz({ ...lectureData.outline[currentLectureIndex] });

    const tempLectureData = { ...lectureData };
    tempLectureData.outline[currentLectureIndex] = newQuiz;

    setLectureData(tempLectureData);
    console.log(newQuiz);
  };

  const handleOutlineCompletion = () => {
    return;
    const tempLectureData = { ...lectureData };
    tempLectureData.outline[currentLectureIndex].completed = true;

    setLectureData(tempLectureData);
  };

  const handleNextOutline = () => {
    endSpeech();

    setCurrentLectureIndex((p) => {
      const activeLectureData = lectureData?.outline[p + 1];
      const tempLectureData = { ...lectureData };
      tempLectureData.outline[p + 1].covered = true;
      if (activeLectureData.isQuiz) return p + 1;
      startSpeech(activeLectureData?.explanation, () => {
        handleOutlineCompletion();
      });

      return p + 1;
    });
  };

  const handleOulineCovered = () => {
    if (currentLectureIndex === null) return;

    const tempLectureData = { ...lectureData };
    tempLectureData.outline[currentLectureIndex].covered = true;

    setLectureData(tempLectureData);
  };

  // When Component mounts
  useEffect(() => {
    loadState();
  }, []);

  // Monitor Lecture Data Change
  useEffect(() => {
    if (!lectureData || currentLectureIndex === null) showLoader('lecture');
    else {
      if (lectureData.outline[currentLectureIndex].covered === false) {
        handleOulineCovered();
      }
      hideLoader('lecture');
    }
  }, [lectureData]);
  return (
    <div className="LecturePage ">
      <div className="location-block flex items-center">
        <p className="course-code">CSC201</p>
        <i className="fa-light fa-chevron-right"></i>
        <p className="file-name">Introduction to computer programing.pdf</p>
      </div>
      <div className="explanation-block">
        <div className="outline-block fade-right">
          <CourseOutline
            lecture={lectureData}
            onSelectLectureIndex={handleCourseSelection}
          />
        </div>

        <div className="presentation-block intro-anim-fade">
          {lectureData?.outline[currentLectureIndex]?.isQuiz ? (
            <QuizPreview
              currentLectureData={lectureData.outline[currentLectureIndex]}
              onSelectOption={handleOptionSelect}
              onSubmitQuiz={handleSubmitQuiz}
            />
          ) : (
            <PresentationPreview
              lectureData={lectureData}
              currentIndex={currentLectureIndex}
              onShowQuestionBox={() => {
                pauseSpeech();
                setQuestionVisible(true);
              }}
              onNextOutline={handleNextOutline}
              onAddPoint={handleAddPoint}
            />
          )}
        </div>
        <div className="preview-block fade-left">
          {!lectureData?.outline[currentLectureIndex]?.isQuiz && (
            <CoursePreview
              content={lectureData?.outline[currentLectureIndex]?.explanation}
            />
          )}
        </div>
      </div>
      {!lectureData?.outline[currentLectureIndex]?.isQuiz && (
        <div
          className={`notepad-block fade-up ${
            maxNotepad ? 'full-note' : 'small-note'
          } `}
        >
          <NotepadPreview
            maxNotepad={maxNotepad}
            setMaxNotepad={setMaxNotepad}
            notepad={notepad}
            onAddPoint={handleAddPoint}
            onDeletePoint={handleDeletePoint}
          />
        </div>
      )}
      <QuestionBox
        visible={questionVisible}
        onHideQuestionBox={() => {
          resumeSpeech();
          setQuestionVisible(false);
        }}
      />
    </div>
  );
};

export default LecturePage;
