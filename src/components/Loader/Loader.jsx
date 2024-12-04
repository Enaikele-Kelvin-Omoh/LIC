import React, { useEffect, useState } from 'react';
import './Loader.css';
import Logo from '../../assets/logo.png';
import emitter from '../../emitter/emitter';
import { useFetcher } from 'react-router-dom';

const Loader = () => {
  const [loaderData, setLoaderData] = useState([]);

  const addLoader = (data) => {
    console.log('Adding loader:', data);
    setLoaderData((prev) => [...prev, data]);
  };

  const removeLoader = (id) => {
    console.log('Removing loader with id:', id);
    setLoaderData((prev) => prev.filter((loader) => loader.id !== id));
  };

  useEffect(() => {
    const onAddLoader = (data) => addLoader(data);
    const onRemoveLoader = (id) => removeLoader(id);

    emitter.on('loader', onAddLoader);
    emitter.on('hide-loader', onRemoveLoader);

    return () => {
      emitter.off('loader', onAddLoader);
      emitter.off('hide-loader', onRemoveLoader);
    };
  }, []);

  useEffect(() => {
    // console.log('change');

    setLoaderData(loaderData);
  }, [loaderData]);

  return (
    <>
      {loaderData.map((data) => (
        <div key={data.id} className="Loader">
          <img src={Logo} alt="Loader logo" className="anim-infinite-scale" />
          <p>{data.message}</p>
        </div>
      ))}
    </>
  );
};

export default Loader;
