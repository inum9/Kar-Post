import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";
import { ApiError } from "./ApiError.js";
const apikey = process.env.GOOGLE_API_KEY;
if (!apikey || apikey == undefined) {
  throw new ApiError(401, "api key is either invalid or  undefined!!");
}
console.log(apikey);

// initialize the gemini model
const aiModel = new ChatGoogleGenerativeAI({
  apiKey: apikey,
  modelName: "gemini-pro",
  temperature: 0.7,
});
if (!aiModel) {
  throw new ApiError(401, "ai model  cannot  be created");
}
// prompt for  ai  to guide the  model;
const postGenerationTemplate = `
You are a world-class LinkedIn content strategist. Your task is to write an engaging, professional post based on a given topic.

Follow these instructions strictly:
- **Hook:** Start with a strong, attention-grabbing first sentence.
- **Body:** Use short, easy-to-read paragraphs or bullet points. Provide a valuable insight or a fresh perspective on the topic.
- **Call to Action:** End with a question to encourage comments and engagement.
- **Hashtags:** Include exactly 3 to 5 relevant hashtags at the end.

Topic: "{topic}"

Generated LinkedIn Post:
`;
if (!postGenerationTemplate) {
  throw new ApiError(401, "prompt cannot  be created");
}
const promptTemplate = PromptTemplate.fromTemplate(postGenerationTemplate);
if (!PromptTemplate) {
  throw new ApiError(401, "prompt template is already defaulted!");
}
console.log(promptTemplate);
const  generatePostContent=async(topic)=>
{
    if(!apikey)
    {
        throw new ApiError(401,"please insert the api key for ai  !")
    }
    // Create a chain that pipes the formatted prompt into the AI model
  const promptPipe=  promptTemplate.pipe(aiModel);
  const result= await promptPipe.invoke({topic});
  if(!result)
  {
    throw new ApiError(401,"result not found  !");
  }
}
export{generatePostContent};
