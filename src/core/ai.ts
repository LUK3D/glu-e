import { Configuration, OpenAIApi } from "openai";
import { ITable } from "../types";
let configuration:Configuration;
let openai:OpenAIApi;





export async function getAIModels ({key, org, description}:{key:string, org:string, description:string}):Promise<ITable[]>{
    let tables: ITable[] =[];
    if(!configuration){
        configuration  = new Configuration({
            organization: org ,
            apiKey: key,
        });
        openai = new OpenAIApi(configuration);
    }
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: `Generate a list of tables and their columns for this type of system:  ${description}

        Do not include any explanations, only provide a  RFC8259 compliant JSON response  following this format without deviation.

       [{
            "name":"TRhe name of the table",
            "expanded":true,
            "columns":[
                {
                    "name": "The name of the column",
                    "type": "The data type of the column",
                    "length": "(Optional) The length or size of the column.",
                    "nullable": "(Optional) It's a boolean that Indicates whether the column allows null values. ",
                    "defaultValue": "(Optional) Indicates The default value of the column.",
                    "primaryKey": "(Optional) It's a boolean that Indicates whether the column is a primary key",
                    "isForeign": "(Optional) It's a boolean that Indicates whether the column is a foreign key.",
                    "autoIncrement": "(Optional) It's a boolean that Indicates whether the column auto-increments.",
                    "unique": "(Optional) It's a boolean that Indicates whether the column has a unique constraint.",
                    "comment": "(Optional) Additional comment or description for the column.",
                  }
            ],
            "comment":"a simple comment explaining the role of this table"
        }]

        The datatypes of the columns needs to be one of this: "VARCHAR", "CHAR", "TEXT", "LONGTEXT", "INT", "BIGINT", "FLOAT", "DOUBLE", "DECIMAL", "DATE", "DATETIME", "TIMESTAMP", "TIME", "BOOLEAN", "ENUM", "SET",
        
        `}],
      });


      if(completion.data.choices.length>0){
        
        try {
            tables = JSON.parse(completion.data.choices[0].message?.content??'[]') as Array<ITable> ;
        } catch (error) {
            console.warn(error);
        }
      }


   

    return tables;
}





