import { arrayUnion } from 'firebase/firestore';
import {
  addDocument,
  getCollectionByField,
  updateDocumentById,
} from '../firebase/firebaseTools';
import { createNewNotepad } from './notepad';

export const fetchAllLectures = (uid) => {
  return new Promise(async (resolve, reject) => {
    try {
      const lectures = await getCollectionByField('Lecture', 'uid', uid);

      resolve(lectures);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

export const createNewLecture = (courseCode, courseTitle, uid) => {
  return new Promise(async (resolve, reject) => {
    try {
      const docID = await addDocument('Lecture', {
        courseCode,
        courseTitle,
        uid,
        createdAt: new Date(),
        courses: [],
      });
      const notepadId = await createNewNotepad(docID);

      updateDocumentById('Lecture', docID, { notepadId });
      resolve();
    } catch (error) {
      console.error(error);
    }
  });
};

export const updateLectureArray = (lectureId, fileName, fileSize, courseId) => {
  return new Promise(async (resolve, reject) => {
    try {
      await updateDocumentById('Lecture', lectureId, {
        courses: arrayUnion({ fileName, fileSize, courseId }),
      });
      resolve();
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};
