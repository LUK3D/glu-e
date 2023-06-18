import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    organization: "org-xZXZCHKchEwPhkIWlaWnev04",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);


export async function getAIModels (){
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{"role": "system", "content": "You are a helpful assistant."}, {role: "user", content: "Hello world"}],
      });
    console.log(completion.data.choices[0].message);
}





