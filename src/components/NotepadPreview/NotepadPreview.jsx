import React, { useEffect, useRef, useState } from 'react';
import './NotepadPreview.css';
import LoadingComponent from '../LoadingComponent/LoadingComponent';

const NotepadPreview = ({
  notepad,
  onAddPoint,
  onMaxNotes,
  maxNotepad,
  setMaxNotepad,
  notepadRef,
  onDeletePoint,
}) => {
  const [text, setText] = useState('');
  const divRef = useRef(null);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  }, [notepad]);
  if (!notepad) return <LoadingComponent />;
  return (
    <div className="NotepadPreview">
      <div className="heading flex items-center justify-between">
        <p>Notes</p>
        {maxNotepad ? (
          <i
            className="fa-light fa-chevron-down"
            onClick={() => setMaxNotepad(false)}
          ></i>
        ) : (
          <i
            className="fa-light fa-chevron-up"
            onClick={() => setMaxNotepad(true)}
          ></i>
        )}
      </div>
      <div className="body mt-2" ref={divRef}>
        {notepad?.map((data, index) => (
          <NotepadPoint
            point={data}
            onDeletePoint={() => onDeletePoint(index)}
            onEditPoint={() => {
              setText(data);
              onDeletePoint(index);
            }}
          />
        ))}
      </div>
      <div className="input">
        <textarea
          name=""
          id=""
          placeholder="Enter note here"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            console.log(e);

            if (e.ctrlKey && e.key === 'Enter') {
              console.log(divRef);

              // Add a new point
              onAddPoint(text);

              // Clear the input field
              setText('');

              // Scroll the div to the bottom dynamically
              if (divRef.current) {
                setTimeout(() => {
                  divRef.current.scrollTop = divRef.current.scrollHeight;
                }, 100);
              } else {
                console.warn('divRef is not attached to a DOM element');
              }
            }
          }}
        ></textarea>
        <i
          className="fa-solid fa-circle-arrow-up"
          onClick={() => {
            console.log(divRef);

            // Add a new point
            onAddPoint(text);

            // Clear the input field
            setText('');

            // Scroll the div to the bottom dynamically
            if (divRef.current) {
              setTimeout(() => {
                divRef.current.scrollTop = divRef.current.scrollHeight;
              }, 100);
            } else {
              console.warn('divRef is not attached to a DOM element');
            }
          }}
        ></i>
      </div>
    </div>
  );
};

const NotepadPoint = ({ point, onDeletePoint, onEditPoint }) => {
  return (
    <div className="NotepadPoint">
      <div className="left">
        <i className="fa-solid fa-diamond"></i>
        <div className="text-block">
          <p>{point}</p>
        </div>
      </div>
      <div className="right">
        <i className="fa-solid fa-pen" onClick={onEditPoint}></i>
        <i className="fa-solid fa-trash" onClick={onDeletePoint}></i>
      </div>
    </div>
  );
};

export default NotepadPreview;
