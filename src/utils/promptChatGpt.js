const promptChatGpt = (system, prompt) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!import.meta.env.VITE_OPENAI_API_KEY) {
        throw new Error('OpenAI API key is not configured');
      }

      const systemMessage = { role: 'system', content: system };
      const apiMessages = [{ role: 'user', content: prompt }];

      const apiRequestBody = {
        model: 'gpt-4o-mini',
        messages: [systemMessage, ...apiMessages],
      };

      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

      const requestAction = async () => {
        const response = await fetch(
          'https://api.openai.com/v1/chat/completions',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify(apiRequestBody),
          }
        );

        if (!response.ok) {
          throw new Error('OpenAI API request failed');
        }

        const responseData = await response.json();
        resolve(responseData.choices[0].message.content);
      };

      setTimeout(requestAction, 20);
    } catch (error) {
      console.error('ChatGPT API Error:', error);
      reject(error);
    }
  });
};

export default promptChatGpt;
