import React, { useEffect, useState } from 'react';
import './LectureCoursePreview.css';
import LoadingComponent from '../LoadingComponent/LoadingComponent';

const LectureCoursePreview = ({ content }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!content) return;

    // Trigger animation by toggling the class
    setIsAnimating(true);

    // Remove animation class after the animation ends
    const timer = setTimeout(() => setIsAnimating(false), 1000); // Match animation duration
    return () => clearTimeout(timer); // Clean up timeout
  }, [content]);

  if (!content) return <LoadingComponent />;
  return (
    <div className={`LectureCoursePreview ${isAnimating ? 'fade-left' : ''}`}>
      <p>{content}</p>
    </div>
  );
};

export default LectureCoursePreview;
