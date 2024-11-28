import React, { useEffect } from 'react';
import './QuestionBox.css';

const QuestionBox = ({ visible, onHideQuestionBox }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Escape') {
      onHideQuestionBox();
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);
  return (
    <div className={`QuestionBox ${visible ? 'qb-active' : 'qb-inactive'}`}>
      <div className="preview-qb">
        <textarea type="text" placeholder="Enter question..." />
        <button>Generate answer</button>
      </div>
      <p>
        Humanity's beauty lies in its diversity, resilience, and capacity for
        compassion. Each individual, despite their unique origins, contributes
        to a vast mosaic of cultures, ideas, and expressions that define the
        human experience. This diversity, seen in the multitude of languages,
        traditions, and perspectives, enriches our world and fosters creativity,
        innovation, and understanding. At the heart of humanity's beauty is its
        resilience. Throughout history, humans have faced immense
        challenges—wars, natural disasters, and societal upheavals—but have
        continually risen to rebuild and innovate. This unwavering spirit
        demonstrates the profound strength that resides in the human heart.
        Equally remarkable is the capacity for compassion and empathy. Humanity
        has an extraordinary ability to connect, to feel another's joy or pain,
        and to act selflessly. Acts of kindness, whether small gestures or
        monumental sacrifices, illuminate the potential for goodness within each
        of us.
      </p>
    </div>
  );
};

export default QuestionBox;
