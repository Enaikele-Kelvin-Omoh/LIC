import { getExplanationSample } from './dummyData';

export const fetchDummyLectures = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(getExplanationSample());
    }, 2000);
  });
