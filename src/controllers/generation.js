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
  return new Promise(async (resolve, reject) => {
    try {
      console.log('generating quiz');
      const prompt = `
      for an outline from a pdf generate me quiz like this:

      [
          {
            question:"question here",
            options: ["wrong option", "wrong option","wrong option"],
            answer: 'right answer',
            response: null,
          },
           {
            question:"question here",
            options: ["wrong option", "wrong option","wrong option"],
            answer: 'right answer',
            response: null,
          },
           {
            question:"question here",
            options: ["wrong option", "wrong option","wrong option"],
            answer: 'right answer',
            response: null,
          },
           {
            question:"question here",
            options: ["wrong option", "wrong option","wrong option"],
            answer: 'right answer',
            response: null,
          },
        ]

       leave response as null,  only write three options. Generate questions from this:

        ${chunk}.

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
  return new Promise(async (resolve, reject) => {
    try {
      const prompt = `
      A student asked the following question "${question}". Using information from this summary "${summary}", generate a response that answers his/her question comprehensively but within 50 - 300 words.
      `;
      const resp = await promptChatGpt(
        'Do not include heading or markdown formatting. Respond with paragraphs. Respond like a friendly lecturer',
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
