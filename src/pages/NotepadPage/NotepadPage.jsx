import React from 'react';
import './NotepadPage.css';

const NotepadPage = () => {
  return (
    <div className="NotepadPage">
      <div className="notepad-title">Notes for CSC 201</div>
      <ul className="notepad-list">
        {Array.from({ length: 7 }, (_, i) => (
          <li className="notepad-point" key={i}>
            Computer Programming is defined as the process of writing computer
            programs.
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotepadPage;
