import OpenAI from 'openai';

console.log(`myAPIKey: ${import.meta.env.VITE_OPENAI_API_KEY}`);
const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

// const response = await client.responses.create({
//   model: 'gpt-5',
//   input: 'Write a short bedtime story about a unicorn.',
// });

// console.log(response.output_text);

export const sendMessageToOpenAi = async (input) => {
  const response = await client.responses.create({
    model: 'gpt-5-nano-2025-08-07',
    input: input,
    // temperature: 0.7,
    // max_output_tokens: 256,
    top_p: 1,
  });

  return response.output_text;
};
