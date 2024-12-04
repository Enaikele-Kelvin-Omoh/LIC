import {
  addDocument,
  getDocumentById,
  updateDocumentById,
} from '../firebase/firebaseTools';

export const createNewNotepad = (lectureId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const id = await addDocument('Notepad', { lectureId, notes: [] });
      resolve(id);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

export const updateNotepad = (notepadId, notepad) => {
  return new Promise(async (resolve, reject) => {
    try {
      await updateDocumentById('Notepad', notepadId, { notes: notepad });
      resolve();
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

export const fetchNotepad = (notepadId) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(notepadId);

      const notepad = await getDocumentById('Notepad', notepadId);
      resolve(notepad);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};
