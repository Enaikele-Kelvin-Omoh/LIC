import { arrayUnion } from 'firebase/firestore';
import {
  addDocument,
  getDocumentById,
  isDocumentExistentWithId,
  updateDocumentById,
} from '../firebase/firebaseTools';
import { extractText, splitTextIntoChunks } from '../pdf/pdfExtractor';
import { generateOutlines } from './generation';

export const validateCourse = (uid, courseId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const doesDocumentExist = await isDocumentExistentWithId(
        'Course',
        courseId
      );

      if (!doesDocumentExist) throw new Error('document-non-existent');

      const course = await getDocumentById('Course', courseId);

      if (course.uid !== uid) throw new Error('not-user-course');

      resolve(course);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

export const updateCourse = (courseId, lectureData) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(lectureData);

      await updateDocumentById('Course', courseId, lectureData);
      resolve();
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

export const createNewCourse = (
  blob,
  courseCode,
  pdfTitle,
  uid,
  lectureId,
  notepadId
) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Extract pdf text
      console.log('hehrehreh');

      const text = await extractText(blob);

      // Generate chunks
      const chunk = splitTextIntoChunks(text);

      // generate outline for each chunk
      const outline = await generateOutlines(chunk);

      // create course document
      const courseData = {
        assimilation: 100,
        courseCode,
        notepadId,
        outline,
        pdfTitle: `${blob.name}`,
        uid,
      };

      const courseId = await addDocument('Course', { ...courseData });
      // update lecture array
      await updateDocumentById('Lecture', lectureId, {
        courses: arrayUnion({
          courseId,
          fileName: blob.name,
          fileSize: blob.size / (1024 * 1024),
        }),
      });

      resolve();
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};
