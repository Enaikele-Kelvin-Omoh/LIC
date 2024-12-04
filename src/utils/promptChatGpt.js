const promptChatGpt = (system, prompt) => {
  return new Promise(async (resolve, reject) => {
    try {
      const systemMessage = {
        role: 'system',
        content: system,
      };

      const apiMessages = [
        {
          role: 'user',
          content: prompt,
        },
      ];

      const apiRequestBody = {
        model: 'gpt-4o-mini',
        messages: [systemMessage, ...apiMessages],
      };

      const requestAction = async () => {
        const response = await fetch(
          'https://api.openai.com/v1/chat/completions',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization:
                'Bearer ' +
                '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',
            },
            body: JSON.stringify(apiRequestBody),
          }
        );

        const responseData = await response.json();

        const payload = responseData.choices[0].message.content;

        resolve(payload);
      };

      setTimeout(requestAction, 20);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

export default promptChatGpt;
