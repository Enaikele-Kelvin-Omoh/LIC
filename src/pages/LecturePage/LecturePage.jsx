import React, { useDebugValue, useEffect, useRef, useState } from 'react';
import './LecturePage.css';
import CourseOutline from '../../components/CourseOutline/CourseOutline';
import PresentationPreview from '../../components/PresentationPreview/PresentationPreview';

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
import LectureCoursePreview from '../../components/LectureCoursePreview/LectureCoursePreview';
import useAuth from '../../hooks/useAuth';
import { useNavigate, useParams } from 'react-router-dom';
import { updateCourse, validateCourse } from '../../controllers/course';
import {
  generateExplanation,
  generatePowerpoint,
  generateQuiz,
} from '../../controllers/generation';
import { fetchNotepad, updateNotepad } from '../../controllers/notepad';

const LecturePage = () => {
  const notepadRef = useRef(null);
  const { userCredential } = useAuth();
  const params = useParams();
  const navigate = useNavigate();
  const [quizMode, setQuizMode] = useState(false);
  const [maxNotepad, setMaxNotepad] = useState(false);
  const [lectureData, setLectureData] = useState(null);
  const [currentLectureIndex, setCurrentLectureIndex] = useState(0);
  const [questionVisible, setQuestionVisible] = useState(false);
  const [notepad, setNotepad] = useState([]);
  const [beginAction, setBeginAction] = useState(false);
  const [notepadId, setNotepadId] = useState(null);
  const [lectureId, setLectureId] = useState(params.lectureId);

  // Methods
  const handleDeletePoint = (pIndex) => {
    setNotepad((p) => p.filter((_, index) => index !== pIndex));
  };

  const handleAddPoint = (point) => {
    setNotepad((p) => [...p, point]);
  };
  const handleCourseSelection = async (index) => {
    // if (index === currentLectureIndex) return;

    const tempLectureData = { ...lectureData };
    tempLectureData.outline[index].covered = true;
    setLectureData(tempLectureData);
    setCurrentLectureIndex(index);

    setTimeout(() => {
      handleOutlineFilling(tempLectureData);
    }, 300);
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

    const quizData = tempLectureData.outline.filter((data) => data.isQuiz);
    const quiz = quizData.map((data) => data.score);

    const score = quiz.reduce((prevValue, currentValue) => {
      if (currentValue === null) {
        return (prevValue += 100);
      } else {
        return (prevValue += currentValue);
      }
    });

    const assimilationRate = score / quiz.length;
    tempLectureData.assimilation = assimilationRate;

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

  const handleOutlineFilling = async (localLectureData) => {
    try {
      const currentLectureData = localLectureData
        ? { ...localLectureData.outline[currentLectureIndex] }
        : {
            ...lectureData.outline[currentLectureIndex],
          };
      console.log(currentLectureData);

      if (currentLectureData.explanation === '' && !currentLectureData.isQuiz) {
        console.log('FIlling up sir');
        currentLectureData.explanation = await generateExplanation('', '');
        currentLectureData.powerPoint = await generatePowerpoint();

        const tempLectureData = { ...localLectureData };
        console.log(tempLectureData, currentLectureIndex);
        (tempLectureData.outline[currentLectureIndex || 0] =
          currentLectureData),
          startSpeech(currentLectureData.explanation);
        setLectureData(tempLectureData);
      } else if (currentLectureData.isQuiz) {
        console.log('FIlling up sir');
        currentLectureData.quiz = await generateQuiz('');

        const tempLectureData = { ...lectureData };
        (tempLectureData.outline[currentLectureIndex] = currentLectureData),
          console.log(tempLectureData);

        setLectureData(tempLectureData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onLoadDocument = async () => {
    try {
      const lecture = await validateCourse(
        userCredential.uid,
        params.lectureId
      );
      console.log(lecture);

      const nPad = await fetchNotepad(lecture.notepadId);

      setLectureData(lecture);
      setNotepadId(lecture.notepadId);

      setNotepad(nPad.notes);

      handleOutlineFilling(lecture);
      setBeginAction(true);
    } catch (error) {
      console.error(error);
      if (error.message.includes('document-non-existent')) {
        toast.error('Wrong document id');
        navigate('/');
        return;
      }

      if (error.message.includes('not-user-course')) {
        toast.error("Course doesn't belong to you");
        navigate('/');
        return;
      }

      toast.error('Error occurred');
    }
  };

  useEffect(() => {
    if (!beginAction) return;

    updateNotepad(notepadId, notepad);
  }, [notepad]);

  // When document loads
  useEffect(() => {
    if (!userCredential) return;
    console.log(userCredential);

    onLoadDocument();
  }, [userCredential]);

  // Database update
  useEffect(() => {
    if (!beginAction) return;
    console.log(lectureData);

    updateCourse(params.lectureId, { ...lectureData })
      .then(() => {
        console.log('Data updated');
      })
      .catch((e) => console.log(e));
  }, [lectureData]);

  // Monitor Lecture Data Change
  useEffect(() => {
    if (
      lectureData === null ||
      currentLectureIndex === null ||
      notepadId === null ||
      lectureId === null
    )
      showLoader('lecture');
    else {
      if (lectureData.outline[currentLectureIndex].covered === false) {
        handleOulineCovered();
      }
      hideLoader('lecture');
    }
  }, [lectureData]);

  useEffect(() => {}, [currentLectureIndex]);
  return (
    <div className="LecturePage ">
      <div className="location-block flex items-center">
        <p className="course-code">{lectureData?.courseCode}</p>
        <i className="fa-light fa-chevron-right"></i>
        <p className="file-name">{lectureData?.pdfTitle}</p>
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
            <LectureCoursePreview
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
