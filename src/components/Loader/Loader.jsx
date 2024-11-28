import React, { useEffect, useState } from 'react';
import './Loader.css';
import Logo from '../../assets/logo.png';
import emitter from '../../emitter/emitter';

const Loader = () => {
  const [loaderData, setLoaderData] = useState([]);

  const addLoader = (data) => {
    var prevLoaderData = [...loaderData];
    prevLoaderData.push(data);
    setLoaderData(prevLoaderData);
  };

  const removeLoader = (id) => {
    var prevLoaderData = [...loaderData];
    const newLoaderData = prevLoaderData.filter((loaderId) => id !== loaderId);

    setLoaderData(newLoaderData);
  };

  useEffect(() => {
    emitter.on('loader', (data) => addLoader(data));
    emitter.on('hide-loader', (data) => removeLoader(data));

    return () => {
      emitter.off('loader', (data) => addLoader(data));
      emitter.off('hide-loader', (data) => removeLoader(data));
    };
  }, []);
  return (
    <>
      {loaderData.map((data) => (
        <div className="Loader">
          <img src={Logo} alt="" className="anim-infinite-scale" />
          <p>{data.message}</p>
        </div>
      ))}
    </>
  );
};

export default Loader;
