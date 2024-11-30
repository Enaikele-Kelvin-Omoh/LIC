export let isPaused = false; // State to track if paused
let currentIndex = 0; // Track the current word index
let words = []; // Array to store words of the text
let voice = 'UK English Male'; // Example voice; change as needed
let speechInterval = null; // Interval to simulate word tracking

/**
 * Start speech from the beginning or resume from the last paused position.
 * @param {string} text - The text to be spoken.
 * @param {function} [onFinish] - Optional callback function to execute after speech ends.
 */
export const startSpeech = (text, onFinish) => {
  if (!words.length || text !== words.join(' ')) {
    // Reset if new text is provided
    words = text.split(' ');
    currentIndex = 0;
  }

  if (isPaused) {
    resumeSpeech(onFinish);
  } else {
    speakFrom(0, onFinish);
  }
};

/**
 * Speak the text from the given index.
 * @param {number} index - The index of the word to start speaking from.
 * @param {function} [onFinish] - Optional callback function to execute after speech ends.
 */
const speakFrom = (index, onFinish) => {
  currentIndex = index;
  const remainingText = words.slice(currentIndex).join(' ');
  console.log('Speaking');

  console.log(remainingText);

  if (speechInterval) clearInterval(speechInterval); // Clear any existing intervals

  responsiveVoice.speak(remainingText, voice, {
    onstart: () => {
      // Simulate tracking currentIndex
      const wordDuration = 500; // Estimated duration per word (in ms)
      speechInterval = setInterval(() => {
        if (currentIndex < words.length - 1) {
          currentIndex++;
        }
      }, wordDuration);
    },
    onend: () => {
      clearInterval(speechInterval); // Stop tracking
      speechInterval = null;
      currentIndex = 0; // Reset index after finishing
      isPaused = false; // Reset pause state
      words = []; // Clear text

      if (onFinish) {
        onFinish(); // Execute callback if provided
      }
    },
  });
};

/**
 * Pause the current speech.
 */
export const pauseSpeech = () => {
  if (responsiveVoice.isPlaying()) {
    responsiveVoice.cancel(); // Stop the current speech
    isPaused = true;
    clearInterval(speechInterval); // Stop tracking
    speechInterval = null;
  }
};

/**
 * Resume the speech from the last paused position.
 * @param {function} [onFinish] - Optional callback function to execute after speech ends.
 */
export const resumeSpeech = (onFinish) => {
  console.log(currentIndex);

  if (true) {
    console.log('jgjgj');

    speakFrom(currentIndex, onFinish); // Resume from the last spoken word
    isPaused = false;
  }
};

/**
 * End the current speech completely and reset the state.
 */
export const endSpeech = () => {
  if (responsiveVoice.isPlaying() || isPaused) {
    responsiveVoice.cancel(); // Stop the current speech
    isPaused = false; // Reset pause state
    currentIndex = 0; // Reset the word index
    words = []; // Clear the words array
    clearInterval(speechInterval); // Clear tracking interval
    speechInterval = null;
  }
};
