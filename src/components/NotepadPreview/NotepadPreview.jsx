import React from 'react';
import './NotepadPreview.css';

const NotepadPreview = () => {
  return (
    <div className="NotepadPreview">
      <div className="heading flex items-center justify-between">
        <p>Notes</p>
        <i className="fa-light fa-chevron-up"></i>
      </div>
      <div className="body mt-4">
        <NotepadPoint />
      </div>
      <div className="input">
        <textarea name="" id=""></textarea>
        <i className="fa-solid fa-circle-arrow-up"></i>
      </div>
    </div>
  );
};

const NotepadPoint = () => {
  return (
    <div className="NotepadPoint">
      <div className="left">
        <i className="fa-solid fa-diamond"></i>
        <div className="text-block">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima ea
            veniam necessitatibus nihil reiciendis numquam ad quae repellendus
            dolores eaque voluptates dolorem, expedita quo optio quas velit
            inventore error, vitae facilis neque nemo debitis odit. Nam corporis
            excepturi debitis ipsum sed at deserunt omnis vero, nulla saepe
            cupiditate, quis nesciunt, quam ut fugit et dicta dolor! Blanditiis,
            ea! Inventore, dolores.
          </p>
        </div>
      </div>
      <div className="right">
        <i className="fa-solid fa-pen"></i>
        <i className="fa-solid fa-trash"></i>
      </div>
    </div>
  );
};

export default NotepadPreview;
