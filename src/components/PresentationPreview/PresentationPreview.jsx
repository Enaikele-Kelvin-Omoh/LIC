import React, { useEffect, useRef, useState } from 'react';
import './PresentationPreview.css';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import {
  resumeSpeech,
  startSpeech,
} from '../../responsiveVoice/responsiveVoice';
import { toast } from 'react-toastify';

const PresentationPreview = ({
  onShowQuestionBox,
  lectureData,
  currentIndex,
  onNextOutline,
  onAddPoint,
}) => {
  const timersRef = useRef(null);
  const [powerPoints, setPowerPoints] = useState([]);

  const addToPowerPoints = (point) => {
    console.log(point);

    setPowerPoints([...powerPoints, point]);
  };

  useEffect(() => {
    setPowerPoints([]);
    timersRef?.current?.forEach(clearTimeout); // Clear previous timers
    timersRef.current = [];

    // Schedule new timers
    lectureData?.outline[currentIndex]?.powerPoint?.forEach((data) => {
      const timer = setTimeout(() => {
        setPowerPoints((prev) => [...prev, data.data]);
      }, data.time);
      timersRef.current.push(timer);
    });

    // Cleanup on unmount or dependency change
    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, [lectureData]);

  if (!lectureData) return <LoadingComponent />;
  return (
    <div className="PresentationPreview flex flex-col">
      <div className="heading w-full flex items-center justify-between">
        <div className="left-box flex items-center">
          <i className="fa-solid fa-brain"></i>
          <p>{lectureData?.assimilation || 0}%</p>
        </div>
        <div className="right-box flex gap-4">
          <button
            className="btn-2 rest"
            onClick={() => {
              startSpeech(lectureData?.outline[currentIndex]?.explanation);
            }}
          >
            Restart Lecture <i className="fa-solid fa-rotate"></i>
          </button>
          <button className="btn-2 quest" onClick={onShowQuestionBox}>
            Ask a question <i className="fa-solid fa-question"></i>
          </button>
          <button className="btn-2 understand" onClick={onNextOutline}>
            I understand<i className="fa-solid fa-check ml-2"></i>
          </button>
        </div>
      </div>
      <div className="body flex flex-col gap-1">
        <p className="title mb-1">{lectureData?.outline[currentIndex].title}</p>
        <div className="flex flex-col gap-3 power-point-wrapper">
          {powerPoints.map((data) => (
            <PowerPoint
              point={data}
              onClick={() => {
                toast.success('Successfully added');
                onAddPoint(data);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const PowerPoint = ({ point, onClick }) => {
  return (
    <div className="PowerPoint fade-up">
      <div className="left">
        <i className="fa-solid fa-diamond"></i>
        <p>{point || '--Empty--'}</p>
      </div>
      <div className="right">
        <i
          className="fa-solid fa-download"
          onClick={onClick}
          title="Add point to notepad"
        ></i>
      </div>
    </div>
  );
};

export default PresentationPreview;
