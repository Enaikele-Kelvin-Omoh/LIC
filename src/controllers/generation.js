import { explanation } from '../site/dummyData';
import promptChatGpt from '../utils/promptChatGpt';

export const generateExplanation = (outlineTitle, summaries) => {
  return new Promise(async (resolve, reject) => {
    try {
      const prompt = `
      Generate me a comprehensive but yet brief explanation on "${outlineTitle}", using relevant information from ${JSON.stringify(
        summaries
      )}. Neglect all information that does not involve the topic .write up to 200 words explanation
      `;
      console.log('Generating explantion');
      console.log(prompt);

      const res = await promptChatGpt(
        'generate response like a lecturer. Do not use mark down formatting. Write in paragraphs',
        prompt
      );

      console.log(res);

      resolve(res);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

export const generatePowerpoint = (explanation) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('generatePowerpoint');
      const prompt = `
      Generate me an array of major points that looks like this:
      [
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
        ]

        from the following explanation:"${explanation}"
      `;
      console.log(prompt);

      const resp = await promptChatGpt(
        'Generate a javascript array. Do not include heading or markdown formatting. Make your response suitable for JSON parsing.',
        prompt
      );

      const ans = JSON.parse(resp);
      console.log(ans);
      resolve(ans);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

export const generateQuiz = (chunk, index) => {
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

export const generateSummary = (chunk) => {
  return new Promise(async (resolve, reject) => {
    try {
      const prompt = `
      Generate me a summary that encapsulate the whole information stated within this portion of a document

      ${chunk}
      `;
      const resp = await promptChatGpt(
        'generate a prose without a heading or markdown structure. Just paragraph',
        prompt
      );
      console.log(resp);

      resolve(resp);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

export const generateSummaries = (chunks) => {
  return new Promise(async (resolve, reject) => {
    try {
      const summaryPromise = chunks.map((chunk) => generateSummary(chunk));
      const summaries = await Promise.all(summaryPromise);

      resolve(summaries);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

export const generateOutline = (segment) => {
  return new Promise(async (resolve, reject) => {
    try {
      const prompt = `
      for an outline from a pdf generate me data like this:

      [
          {
            isQuiz: false,
            title: 'What is Algorithm?',
            explanation: "",
            covered: false,
            completed: false,
            powerPoint: [],
          },
          {
            isQuiz: false,
            title: 'What is a system?',
            explanation: "",
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
        ]

        Leave every field except title blank, Populate this array by modifying the value of title to suit the following information:

        ${segment}.

        Generate an array for me
      `;
      const resp = await promptChatGpt(
        'Generate a javascript array. Do not include heading or markdown formatting. Make your response suitable for JSON parsing.',
        prompt
      );

      console.log(resp);

      const ans = JSON.parse(resp);
      console.log(ans);
      resolve(ans);
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

export const generateAnswer = (summary, question) => {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve(`  Humanity's beauty lies in its diversity, resilience, and capacity for
        compassion. Each individual, despite their unique origins, contributes
        to a vast mosaic of cultures, ideas, and expressions that define the
        human experience. This diversity, seen in the multitude of languages,
        traditions, and perspectives, enriches our world and fosters creativity,
        innovation, and understanding. At the heart of humanity's beauty is its
        resilience. Throughout history, humans have faced immense
        challenges—wars, natural disasters, and societal upheavals—but have
        continually risen to rebuild and innovate. This unwavering spirit
        demonstrates the profound strength that resides in the human heart.
        Equally remarkable is the capacity for compassion and empathy. Humanity
        has an extraordinary ability to connect, to feel another's joy or pain,
        and to act selflessly. Acts of kindness, whether small gestures or
        monumental sacrifices, illuminate the potential for goodness within each
        of us.`);
      }, 1000);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};
