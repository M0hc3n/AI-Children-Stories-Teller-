import { promptTemplate } from "../constants";

export const llamaConfig = (quoteInfo: string) => ({
  stream: false,
  input: {
    top_p: 0.9,
    prompt: `${quoteInfo}. Start telling the story directly without introduction, break it into 3 paragraphs at least, and seperate paragraphs with two backslash, and do not add follow ups after the story`,
    min_tokens: 0,
    temperature: 0.6,
    prompt_template: promptTemplate,
    presence_penalty: 1.15,
  },
});
