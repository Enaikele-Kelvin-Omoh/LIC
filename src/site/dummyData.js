export const courseList = [
  {
    code: 'CSC201',
    createdAt: new Date(),
    title: 'Computer Science',
    pdfs: [
      {
        fileName: 'Introduction to algorithm.pdf',
        fileSize: '22.2mb',
        fileUrl: 'https://loyal.com',
        lectureId: '1233-5444-9888',
      },
      {
        fileName: 'Introduction to java.pdf',
        fileSize: '18.2mb',
        fileUrl: 'https://loyal.com',
        lectureId: '1233-5874-9888',
      },
      {
        fileName: 'Introduction to javascript.pdf',
        fileSize: '10.5mb',
        fileUrl: 'https://loyal.com',
        lectureId: '1433-5874-9888',
      },
    ],
  },
  {
    code: 'ENG401',
    createdAt: new Date(),
    title: 'Material Science',
    pdfs: [
      {
        fileName: 'Introduction to materials.pdf',
        fileSize: '22.2mb',
        fileUrl: 'https://loyal.com',
        lectureId: '1233-5444-9888',
      },
      {
        fileName: 'Introduction to sciences.pdf',
        fileSize: '18.2mb',
        fileUrl: 'https://loyal.com',
        lectureId: '1233-5874-9888',
      },
      {
        fileName: 'Introduction to love.pdf',
        fileSize: '10.5mb',
        fileUrl: 'https://loyal.com',
        lectureId: '1433-5874-9888',
      },
    ],
  },
];

export const lectureContent = {
  createdAt: new Date(),
  courseCode: 'CSC201',
  accountId: '122-777-555',
  assimilationScore: 100,
  notepadId: '1233-333-5555',
  fileName: 'Introduction to javascript',
  courseOutline: [
    [
      {
        type: 'text',
        outline: 'Promises and Asynchronous Operation',
        explantion: `In JavaScript, asynchronous operations allow tasks to run in the background without blocking the main thread. This is crucial for improving the responsiveness of applications, especially when performing time-consuming tasks such as fetching data from a server or reading files.

        A Promise is a JavaScript object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value. It provides a cleaner, more robust way to handle asynchronous tasks compared to callback functions, which can lead to "callback hell" when nested deeply.

        A Promise has three states:

        Pending: The initial state, where the operation has neither succeeded nor failed.
        Fulfilled: The operation completed successfully, and the Promise provides a resolved value.
        Rejected: The operation failed, and the Promise provides a reason for the failure.`,
      },
      {
        type: 'text',
        outline: 'The event loop',
        explantion: `The event loop is a fundamental part of JavaScript's runtime environment, enabling it to handle asynchronous operations despite being single-threaded. At its core, the event loop continuously checks for and executes tasks from various queues, ensuring non-blocking, smooth execution of JavaScript code. It plays a critical role in managing tasks such as user interactions, I/O operations, and API calls without halting the execution of other code.

        The event loop works in conjunction with the call stack, task queue, and microtask queue. When a function is invoked, it is pushed onto the call stack and executed. If this function includes an asynchronous operation (e.g., a setTimeout or a fetch), the operation is delegated to the browser or Node.js environment, and the function is removed from the stack. Once the asynchronous operation completes, its callback or Promise handler is placed in the appropriate queue—either the task queue for callbacks or the microtask queue for Promises and MutationObserver tasks. The event loop ensures that the call stack is empty before it starts processing these queued tasks.`,
      },
      {
        type: 'quiz',
        score: null,
        quiz: [
          {
            question: 'Question goes here',
            options: ['option 1', 'option 2', 'option 3', 'option 4'],
            answer: 'option 3',
            response: 'option 1',
          },
          {
            question: 'Question goes here',
            options: ['option 1', 'option 2', 'option 3', 'option 4'],
            answer: 'option 1',
            response: 'option 1',
          },
          {
            question: 'Question goes here',
            options: ['option 1', 'option 2', 'option 3', 'option 4'],
            answer: 'option 1',
            response: 'option 1',
          },
          {
            question: 'Question goes here',
            options: ['option 1', 'option 2', 'option 3', 'option 4'],
            answer: 'option 1',
            response: 'option 1',
          },
        ],
      },
    ],
    [
      {
        outline: 'Functions in Javascript',
        explantion: 'The Explanation',
      },
      {
        outline: 'Object in Javascript',
        explantion: 'The Explanation here too',
      },
    ],
  ],
  chunks: ['A very lengthy chunk', 'Another lengthy chunk'],
};

export const notepadContent = {
  createdAt: new Date(),
  acccountId: '1223-44-555',
  notes: ['Point 1', 'Point 2', 'Point 3', 'Point 4', 'Point 5'],
};

export const explanation = {
  assimilation: 60,
  courseCode: 'CSC102',
  pdfTitle: 'Introduction.pdf',
  notepadId: '12344556677',
  outline: [
    {
      isQuiz: false,
      title: 'What is Algorithm?',
      explanation: `An algorithm is a finite sequence of well-defined steps or instructions designed to solve a specific problem or accomplish a task. It serves as the foundation for computational problem-solving, enabling machines to process data, make decisions, and execute tasks efficiently. Algorithms are not limited to programming; they are also used in everyday life, such as following a recipe or navigating a map.

      In computer science, algorithms are fundamental because they dictate how problems are approached and solved programmatically. They can be designed to handle a wide range of tasks, such as sorting data, searching for information, encrypting data, or optimizing processes. An algorithm's efficiency is often measured in terms of time complexity (how fast it runs) and space complexity (how much memory it uses), which are crucial considerations when designing scalable solutions.

      Algorithms can be categorized into various types, including:

      Sorting algorithms (e.g., Bubble Sort, Merge Sort) for organizing data.
      Search algorithms (e.g., Binary Search, Depth-First Search) for finding specific elements.
      Optimization algorithms (e.g., Dynamic Programming) for maximizing or minimizing objectives.
      Effective algorithms are clear, concise, and optimized for the task they perform. A good understanding of algorithms helps developers and engineers build robust and efficient software, making them essential in the field of computing.`,
      covered: false,
      completed: false,
      powerPoint: [
        {
          data: 'An algorithm is a finite, step-by-step procedure to solve a problem or complete a task.',
          time: 1000,
        },
        {
          data: 'In computer science, algorithms are the foundation for processing data, making decisions, and solving problems efficiently.',
          time: 2000,
        },
        {
          data: 'They are evaluated by time complexity (speed) and space complexity (memory usage) for scalability and optimization.',
          time: 3000,
        },
        {
          data: 'Common types include sorting (Bubble Sort), searching (Binary Search), and optimization (Dynamic Programming).',
          time: 4000,
        },
        {
          data: 'Well-designed algorithms are vital for building robust, efficient, and scalable software solutions.',
          time: 5000,
        },
      ],
    },
    {
      isQuiz: false,
      title: 'What is a system?',
      explanation: `A system is a set of interconnected components that work together to achieve a specific goal. Systems can be found in various domains, including technology, biology, and management, where they organize and coordinate different elements for efficient functioning. In computing, a system often refers to a combination of hardware, software, and processes that collectively handle tasks, solve problems, or provide services.

      The components of a system interact in a structured manner, with defined inputs, processes, and outputs. A well-designed system is efficient, scalable, and reliable, ensuring smooth operations and adaptability to changing requirements. Systems can be simple or complex, depending on the number of interacting components and their relationships.`,
      covered: false,
      completed: false,
      powerPoint: [
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
          time: 5000,
        },
        {
          data: 'Key elements of a system include inputs, processes, and outputs, ensuring structured and efficient operation.',
          time: 8000,
        },
        {
          data: 'Well-designed systems are efficient, scalable, and reliable, adapting to changing requirements and demands.',
          time: 9000,
        },
      ],
    },
    {
      isQuiz: true,
      title: 'A quiz on algorithms',
      graded: false,
      score: null,
      quiz: [
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
      ],
    },
  ],
};

export const getExplanationSample = () => explanation;
