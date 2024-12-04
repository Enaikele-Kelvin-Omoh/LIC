import React, { useEffect, useState } from 'react';
import './QuestionBox.css';
import { resumeSpeech } from '../../responsiveVoice/responsiveVoice';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import { toast } from 'react-toastify';
import { generateAnswer } from '../../controllers/generation';

const QuestionBox = ({ visible, onHideQuestionBox, courseSummary }) => {
  const [response, setResponse] = useState(null);
  const [text, setText] = useState('');
  const handleKeyPress = (e) => {
    if (e.key === 'Escape') {
      setResponse(null);
      onHideQuestionBox();
      resumeSpeech();
    }
  };

  const handleGenerateAnswer = async () => {
    try {
      setResponse(undefined);
      const answer = await generateAnswer(courseSummary, text);
      setResponse(answer);
      setText('');
    } catch (error) {
      console.error(error);
      setResponse(null);
      toast.error('An error came up');
    } finally {
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div
      className={`QuestionBox ${visible ? 'qb-active' : 'qb-inactive'}  ${
        response === null ? 'h-ht' : 'f-ht'
      } `}
    >
      <div className={`preview-qb`}>
        <textarea
          type="text"
          placeholder="Enter question..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={handleGenerateAnswer}>Generate answer</button>
      </div>
      <div className="res-box">
        {response === undefined ? <LoadingComponent /> : <p>{response}</p>}
      </div>
    </div>
  );
};

export default QuestionBox;
