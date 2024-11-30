import React, { useEffect, useState } from 'react';
import './Modal.css';
import emitter from '../../emitter/emitter';

const Modal = () => {
  const [modalData, setModalData] = useState([]);

  console.log(modalData);

  const addModal = (data) => {
    console.log(modalData);

    var prevModal = [...modalData];
    console.log(prevModal);
    console.log('adding', data);

    prevModal.push(data);
    console.log(prevModal);
    setModalData(null);
    setModalData(prevModal);
  };

  const removeModal = (modalId) => {
    let prevModal = [...modalData];
    prevModal = prevModal.filter((data) => data.id !== modalId);
    setModalData(prevModal);
  };

  useEffect(() => {
    emitter.on('modal', (data) => addModal(data));

    return () => {
      emitter.off('modal', (data) => addModal(data));
    };
  }, [addModal]);
  return (
    <>
      {modalData.map((data) => {
        if (data.type === 'success') {
          return (
            <div className="Modal" key="success">
              <SuccessModal
                fieldData={data?.fieldData}
                message={data?.message}
                buttonText={data?.buttonText}
                onClickButton={data?.onButtonClick}
                onHide={(bypass) => {
                  if (data.canHide || bypass) {
                    removeModal(data.id);
                    data?.onClose();
                  }
                }}
              />
            </div>
          );
        } else if (data.type === 'error') {
          return (
            <div className="Modal" key="error">
              <ErrorModal
                fieldData={data?.fieldData}
                message={data?.message}
                buttonText={data?.buttonText}
                onClickButton={data?.onButtonClick}
                onHide={(bypass) => {
                  if (data.canHide || bypass) {
                    removeModal(data.id || bypass);
                    data?.onClose();
                  }
                }}
              />
            </div>
          );
        } else if (data.type === 'warning') {
          return (
            <div className="Modal" key="warning">
              <WarningModal
                fieldData={data?.fieldData}
                message={data?.message}
                buttonText={data?.buttonText}
                onClickButton={data?.onButtonClick}
                onHide={(bypass) => {
                  if (data.canHide || bypass) {
                    removeModal(data.id);
                    data?.onClose();
                  }
                }}
              />
            </div>
          );
        } else if (data.type === 'input') {
          return (
            <div className="Modal" key="input">
              <InputModal
                title={data.title}
                fieldData={data?.fieldData}
                buttonText={data?.buttonText}
                onClickButton={data?.onButtonClick}
                onHide={(bypass) => {
                  if (data.canHide || bypass) {
                    removeModal(data.id);
                    data?.onClose();
                  }
                }}
              />
            </div>
          );
        } else {
          return <></>;
        }
      })}
    </>
  );
};

const SuccessModal = ({ onHide, onClickButton, message, buttonText }) => {
  return (
    <div className="SuccessModal modal-container fade">
      <div className="cancel-block">
        <i className="fa-solid fa-xmark" onClick={() => onHide(false)}></i>
      </div>
      <div className="icon-block flex justify-center">
        <i className="fa-solid fa-circle-check"></i>
      </div>

      <div className="message-block flex justify-center w-full">
        <p>{message}</p>
      </div>
      <div className="button-block w-full ">
        <button
          onClick={() => {
            onClickButton();
            onHide(true);
          }}
        >
          {buttonText || 'Okay'}
        </button>
      </div>
    </div>
  );
};

const ErrorModal = ({ onHide, onClickButton, message, buttonText }) => {
  return (
    <div className="ErrorModal modal-container fade">
      <div className="cancel-block">
        <i className="fa-solid fa-xmark" onClick={() => onHide(false)}></i>
      </div>
      <div className="icon-block flex justify-center">
        <i className="fa-solid fa-circle-exclamation"></i>
      </div>

      <div className="message-block flex justify-center w-full">
        <p>{message}</p>
      </div>
      <div className="button-block w-full ">
        <button
          onClick={() => {
            onClickButton();
            onHide(true);
          }}
        >
          {buttonText || 'Okay'}
        </button>
      </div>
    </div>
  );
};

const WarningModal = ({ onHide, onClickButton, message, buttonText }) => {
  return (
    <div className="WarningModal modal-container fade">
      <div className="cancel-block">
        <i className="fa-solid fa-xmark" onClick={() => onHide(false)}></i>
      </div>
      <div className="icon-block flex justify-center">
        <i className="fa-solid fa-triangle-exclamation"></i>
      </div>

      <div className="message-block flex justify-center w-full">
        <p>{message}</p>
      </div>
      <div className="button-block w-full ">
        <button
          onClick={() => {
            onClickButton();
            onHide(true);
          }}
        >
          {buttonText || 'Okay'}
        </button>
      </div>
    </div>
  );
};

const InputModal = ({
  title,
  fieldData,
  buttonText,
  onClickButton,
  onHide,
}) => {
  const [text, setText] = useState(['']);

  useEffect(() => {
    setText(new Array(fieldData.length).fill(''));
  }, [fieldData]);

  const handleResetText = () => {
    setText((p) => new Array(p.length).fill(''));
  };

  const changeTextAtIndex = (index, value) => {
    let prevText = [...text];
    prevText[index] = value;
    setText(prevText);
  };
  return (
    <div className="InputModal modal-container fade">
      <div className="cancel-block">
        <i className="fa-solid fa-xmark" onClick={() => onHide(false)}></i>
      </div>
      <div className="title-block flex justify-center  ">
        <p>{title || ''}</p>
      </div>

      <div className="input-block w-full mt-6 flex flex-col gap-3">
        {fieldData.map((data, index) => (
          <div className="field-block w-full flex flex-col gap-2">
            <p>{data.label}</p>
            <input
              type="text"
              placeholder={data.placeholder || 'Value here'}
              value={text[index]}
              onChange={(e) => changeTextAtIndex(index, e.target.value)}
            />
          </div>
        ))}
      </div>
      <div className="button-block w-full ">
        <button
          onClick={() => {
            onClickButton(text);
            handleResetText();
            onHide(true);
          }}
        >
          {buttonText || 'Okay'}
        </button>
      </div>
    </div>
  );
};

export default Modal;
