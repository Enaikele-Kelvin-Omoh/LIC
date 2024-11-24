import React from "react";
import "./Modal.css";

const Modal = () => {
  return (
    <div className="Modal">
      {/* <SuccessModal /> */}
      {/* <ErrorModal /> */}
      {/* <WarningModal /> */}
      <InputModal />
    </div>
  );
};

const SuccessModal = ({ onHide, onOkay, message }) => {
  return (
    <div className="SuccessModal modal-container">
      <div className="cancel-block">
        <i className="fa-solid fa-xmark"></i>
      </div>
      <div className="icon-block flex justify-center">
        <i className="fa-solid fa-circle-check"></i>
      </div>

      <div className="message-block flex justify-center w-full">
        <p>
          I just want to alert you take more care when you go outside. Because
          the sun is hot and people aren't nice with other people
        </p>
      </div>
      <div className="button-block w-full ">
        <button>Okay</button>
      </div>
    </div>
  );
};

const ErrorModal = ({ onHide, onOkay, message }) => {
  return (
    <div className="ErrorModal modal-container">
      <div className="cancel-block">
        <i className="fa-solid fa-xmark"></i>
      </div>
      <div className="icon-block flex justify-center">
        <i className="fa-solid fa-circle-exclamation"></i>
      </div>

      <div className="message-block flex justify-center w-full">
        <p>
          I just want to alert you take more care when you go outside. Because
          the sun is hot and people aren't nice with other people
        </p>
      </div>
      <div className="button-block w-full ">
        <button>Okay</button>
      </div>
    </div>
  );
};

const WarningModal = ({ onHide, onOkay, message }) => {
  return (
    <div className="WarningModal modal-container">
      <div className="cancel-block">
        <i className="fa-solid fa-xmark"></i>
      </div>
      <div className="icon-block flex justify-center">
        <i className="fa-solid fa-triangle-exclamation"></i>
      </div>

      <div className="message-block flex justify-center w-full">
        <p>
          I just want to alert you take more care when you go outside. Because
          the sun is hot and people aren't nice with other people
        </p>
      </div>
      <div className="button-block w-full ">
        <button>Okay</button>
      </div>
    </div>
  );
};

const InputModal = () => {
  return (
    <div className="InputModal modal-container">
      <div className="cancel-block">
        <i className="fa-solid fa-xmark"></i>
      </div>
      <div className="icon-block flex justify-center">
        <i className="fa-solid fa-circle-keyboard"></i>
      </div>

      <div className="message-block flex justify-center w-full">
        <p>
          I just want to alert you take more care when you go outside. Because
          the sun is hot and people aren't nice with other people
        </p>
      </div>
      <div className="button-block w-full ">
        <button>Okay</button>
      </div>
    </div>
  );
};

export default Modal;
