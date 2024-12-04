import { explanation } from '../site/dummyData';

export const generateExplanation = (outlineTitle, chunk) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('Generating explantion');

      setTimeout(() => {
        resolve(`A system is a set of interconnected components that work together to achieve a specific goal. Systems can be found in various domains, including technology, biology, and management, where they organize and coordinate different elements for efficient functioning. In computing, a system often refers to a combination of hardware, software, and processes that collectively handle tasks, solve problems, or provide services.

        The components of a system interact in a structured manner, with defined inputs, processes, and outputs. A well-designed system is efficient, scalable, and reliable, ensuring smooth operations and adaptability to changing requirements. Systems can be simple or complex, depending on the number of interacting components and their relationships.`);
      }, 500);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

export const generatePowerpoint = (explanation) => {
  return new Promise((resolve, reject) => {
    try {
      console.log('generatePowerpoint');

      setTimeout(() => {
        resolve([
          {
            data: 'A system is a set of interconnected components that work together to achieve a specific goal.',
            time: 1000,
          },
          {
            data: 'Systems are found in various fields, including technology, biology, and management, to coordinate and organize elements.',
            time: 2000,
          },
          {
            data: 'In computing, a system combines hardware, software, and processes to perform tasks or provide services.',
            time: 3000,
          },
          {
            data: 'Key elements of a system include inputs, processes, and outputs, ensuring structured and efficient operation.',
            time: 4000,
          },
          {
            data: 'Well-designed systems are efficient, scalable, and reliable, adapting to changing requirements and demands.',
            time: 5000,
          },
        ]);
      }, 500);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

export const generateQuiz = (chunk) => {
  return new Promise((resolve, reject) => {
    try {
      console.log('generating quiz');

      setTimeout(() => {
        resolve([
          {
            question:
              'France is a country in Western Europe that is famous for its culture, art, and history. Among its many cities, one serves as the capital and is also known as the "City of Light." What is the name of the capital city of France?',
            options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
            answer: 'Paris',
            response: null,
          },
          {
            question:
              'In our solar system, there is a planet characterized by its reddish appearance due to iron oxide on its surface. This planet is often referred to as the "Red Planet" and is the fourth planet from the Sun. Which planet is this?',
            options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
            answer: 'Mars',
            response: null,
          },
          {
            question:
              'One of the most famous plays in literature tells the tragic story of two young lovers whose families are bitter rivals. This work was written by a celebrated English playwright of the late 16th century. What is the name of the author of "Romeo and Juliet"?',
            options: [
              'William Wordsworth',
              'William Shakespeare',
              'Charles Dickens',
              'Jane Austen',
            ],
            answer: 'William Shakespeare',
            response: null,
          },
          {
            question:
              'The largest animal on Earth is a marine mammal known for its enormous size and ability to produce loud, low-pitched sounds. This animal can grow up to 100 feet in length and weighs more than 150 tons. What is the name of this mammal?',
            options: ['Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus'],
            answer: 'Blue Whale',
            response: null,
          },
        ]);
      }, 500);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

export const generateOutline = (segment) => {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve([
          {
            isQuiz: false,
            title: 'What is Algorithm?',
            explanation: ``,
            covered: false,
            completed: false,
            powerPoint: [],
          },
          {
            isQuiz: false,
            title: 'What is a system?',
            explanation: ``,
            covered: false,
            completed: false,
            powerPoint: [],
          },
          {
            isQuiz: true,
            title: 'A quiz on algorithms',
            graded: false,
            score: null,
            quiz: [],
          },
        ]);
      }, 500);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

export const generateOutlines = (chunks) => {
  return new Promise(async (resolve, reject) => {
    try {
      const outlinePromise = chunks.map((data) => generateOutline(data));
      const outlines = await Promise.all(outlinePromise);
      const flattenedOutlines = outlines.flat(1);
      resolve(flattenedOutlines);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};
