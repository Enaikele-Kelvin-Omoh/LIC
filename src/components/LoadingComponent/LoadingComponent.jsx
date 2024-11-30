import React from 'react';
import './LoadingComponent.css';
import Loading from '../../assets/loading.gif';

const LoadingComponent = () => {
  return (
    <div className="LoadingComponent">
      <img src={Loading} alt="" />
    </div>
  );
};

export default LoadingComponent;
