import { Configuration, OpenAIApi } from "openai";
let configuration:Configuration;
let openai:OpenAIApi;



export async function getAIModels ({apiKey, orgName}:{apiKey:string, orgName:string}){

    if(!configuration){
        configuration  = new Configuration({
            organization: orgName ,
            apiKey: apiKey,
        });
        openai = new OpenAIApi(configuration);
    }
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{"role": "system", "content": "You are a helpful assistant."}, {role: "user", content: "Hello world"}],
      });
    console.log(completion.data.choices[0].message);
}





