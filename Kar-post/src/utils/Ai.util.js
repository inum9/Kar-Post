import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";

const llm= new ChatGoogleGenerativeAI({
    apiKey:process.env.GOOGLE_API_KEY,
    model:"gemini-pro",
    temperature: 0.7,
});
const postGenerationTemplate = `
You are an expert LinkedIn content strategist. Your goal is to write an engaging and professional post based on a given topic.

Instructions:
1.  **Tone:** Write in a professional, yet approachable and slightly informal tone.
2.  **Structure:** Start with a strong hook to grab attention. Use short paragraphs and bullet points for readability. End with a question or a call-to-action to encourage engagement.
3.  **Hashtags:** Include 3-5 relevant and popular hashtags at the end. Do not use more than 5.
4.  **Content:** Elaborate on the topic provided, offering a fresh perspective or valuable insight.

Topic to write about: "{topic}"

Generated LinkedIn Post:
`;
const promptTemplate = PromptTemplate.fromTemplate(postGenerationTemplate);
export const generatePostContent = async (topic) => {
    const chain = promptTemplate.pipe(llm);
    const result = await chain.invoke({ topic });
    return result.content;
};
