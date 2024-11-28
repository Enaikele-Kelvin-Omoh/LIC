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
        explantion: 'The Explanation',
      },
      {
        type: 'text',
        outline: 'The event loop',
        explantion: 'The Explanation here too',
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
