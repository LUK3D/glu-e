import { TableCellsIcon } from "@heroicons/react/20/solid";
import { MagnifyingGlassCircleIcon, FolderIcon, } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/outline";
import OutlinerItem from "./components/outlinerItem";
import { ConsoleLogTypes, IApp, IColumn, ITable } from "../../types";
import Modal from "../../components/modal";
import { useState } from "react";
import { validateTableName } from "../../utls/validator";
import NewTableForm from "./components/newTableForm";
import { getAIModels } from "../../core/ai";

import AiDialog from "./components/AIDialog";
import { consoleStore } from "../../store";


interface ISidePanel{
    appStore:IApp
}

interface IColumnComposition{
    table:string,
    column:string
}
export  function SidePanel({appStore}:ISidePanel) {

    const myConsole = consoleStore((state)=>state);
    const [creatingTable, setCreatingTable] = useState<boolean>(false);
    const [tableNameInput, setTableNameInput] = useState<string>('');
    const [creatingColumn, setCreatingColumn] = useState<boolean>(false);
    const [isGeneratingWIthAi, setIsGeneratingWIthAi] = useState<boolean>(false);
    const [columnNameInput, setColumnNameInput] = useState<IColumnComposition>({table:'', column:''});


    const [seachingWord, setSearchingWord] = useState<string>("");


    const onGenerateWithAi = async (organization:string,apiKey:string, description:string)=>{

        if(description.trim().length==0){
            myConsole.log([
                {
                    type: ConsoleLogTypes.error,
                    message:"You need to inform some ##",
                    highights:["Description"]
                }
            ]);

            return;
        }
        
        myConsole.log([
            {
                type: ConsoleLogTypes.message,
                message:"Generating Tables for ## . Please wait 😊",
                highights:[
                    description.substring(0,(description.length<100)?description.length:100)
                ]
            }
        ]);
        appStore.setAiCredencials({org:organization, key:apiKey});
        if(appStore.openAi){
           const tables = await getAIModels({key:apiKey, org:organization, description});
            appStore.setTables(tables);
            myConsole.log([
                {
                    type: ConsoleLogTypes.success,
                    message:`Done! ${tables.length} ## Created Successfully 🎉`,
                    highights:["Tables"]
                }
            ]);
        }
    }




    const cancelTableCreation = ()=>{
        setTableNameInput('');
        setCreatingTable(false);
    }
    
    const createTable = ()=>{
        if(!validateTableName(tableNameInput) ){
            console.error("You must provide a valid name for this table: ", tableNameInput);
            return;
        }
        const result = appStore.createTable(tableNameInput);

        if(!result){
            return;
        }
        cancelTableCreation();
    }

    const cancelColumnCreation = ()=>{
        setColumnNameInput({table:'', column:''});
        setCreatingColumn(false);
    }

    const createColumn = (column: IColumn)=>{

        if(!validateTableName(columnNameInput.table) ||  !validateTableName(column.name)){
            console.error("You must provide a valid Table and Column name: ", columnNameInput);
            return;
        }


        const result = appStore.createColumn(columnNameInput.table, column);

        if(!result){
            return;
        }
        cancelColumnCreation();
    }

  return (
    <>
    <Modal 
    isOpen={creatingTable} 
    onCloseDialog={()=>setCreatingTable(false)}
    tittle='🚀 New Table'
    description='A name for atable should be short and auto explain'
    body={
        <div className="w-full flex flex-col mt-10">
            <div className="w-full  flex items-center bg-black-200 bg-opacity-50 rounded-md px-2">
                <FolderIcon width={20} className="text-primary"></FolderIcon>
                <input 
                    type="text" 
                    placeholder="Table name" 
                    className=" py-2 pl-2 bg-transparent outline-none w-full placeholder:text-gray-400 text-white"
                    onChange={(e)=>setTableNameInput(e.currentTarget.value)}
                    onSubmit={createTable}
                    onKeyDown={(e)=>{
                        if(e.code == 'Enter'){
                            createTable();
                        }
                    }}
                />
            </div>

           <div className="flex justify-end mt-10">
                <button onClick={cancelTableCreation}  className="px-4 py-1 mr-4 bg-black-200 border border-black-200 bg-opacity-50 hover:bg-opacity-60 active:bg-opacity-70 transition-colors  text-gray-500 rounded-md mt-2 flex items-center justify-center">
                    <p >Cancel</p>
                </button>
                <button onClick={createTable}  className="px-4 py-1 bg-primary border border-primary bg-opacity-50 hover:bg-opacity-60 active:bg-opacity-70 transition-colors  text-gray-200 rounded-md mt-2 flex items-center justify-center">
                    <p >Save</p> 
                </button>
           </div>

        </div>
    }
    ></Modal>
    <Modal 
    isOpen={creatingColumn} 
    onCloseDialog={()=>setCreatingColumn(false)}
    tittle='🚀 New Column'
    description='A name for a column should be short and auto explain'
    body={
       <NewTableForm onCancel={cancelColumnCreation} onComplete={createColumn} ></NewTableForm>
    }
    ></Modal>
    {/* GENERATING WITH AI MODAL */}
    <Modal 
        minWidth={'600px'}
        isOpen={isGeneratingWIthAi} 
        onCloseDialog={()=>setIsGeneratingWIthAi(false)}
        tittle='Generate Database with GPT'
        description='To use GPT-3.5 you need to provide the credentials. No information is stored. You are safe 😉'
        body={
        <AiDialog onCancel={()=>setIsGeneratingWIthAi(false)} onComplete={onGenerateWithAi} ></AiDialog>
        }
    ></Modal>

    <div className="flex flex-col h-full w-full">
        <div className="w-full   p-5   flex flex-col">
            <div className="w-full  flex items-center bg-black-100 bg-opacity-25 rounded-md px-2">
                <input 
                    onChange={(e)=>setSearchingWord(e.target.value)}
                    type="text" 
                    placeholder="Search here" 
                    className=" py-1 bg-transparent outline-none w-full placeholder:text-gray-600 "
                />
                <MagnifyingGlassCircleIcon width={20}></MagnifyingGlassCircleIcon>
            </div>
            <div className="flex items-center">
                <button 
                    onClick={()=>setCreatingTable(true)} 
                    className="text-sm px-2 py-2 bg-primary border border-primary bg-opacity-25 hover:bg-opacity-50 active:bg-opacity-60 transition-colors  text-gray-200 rounded-md mt-2 flex items-center justify-center">
                    <p className="mr-2">New Table</p> <PlusIcon width={20}></PlusIcon>
                </button>
                <button 
                    onClick={()=>setIsGeneratingWIthAi(true)} 
                    className=" text-sm px-2 py-2 ml-4 bg-green-500 border border-green-500 bg-opacity-25 hover:bg-opacity-50 active:bg-opacity-60 transition-colors  text-gray-200 rounded-md mt-2 flex items-center justify-center">
                   <div className="w-6 h-6">
                   <svg width="100%" height="100%" viewBox="140 140 520 520"><path d="m617.24 354a126.36 126.36 0 0 0 -10.86-103.79 127.8 127.8 0 0 0 -137.65-61.32 126.36 126.36 0 0 0 -95.31-42.49 127.81 127.81 0 0 0 -121.92 88.49 126.4 126.4 0 0 0 -84.5 61.3 127.82 127.82 0 0 0 15.72 149.86 126.36 126.36 0 0 0 10.86 103.79 127.81 127.81 0 0 0 137.65 61.32 126.36 126.36 0 0 0 95.31 42.49 127.81 127.81 0 0 0 121.96-88.54 126.4 126.4 0 0 0 84.5-61.3 127.82 127.82 0 0 0 -15.76-149.81zm-190.66 266.49a94.79 94.79 0 0 1 -60.85-22c.77-.42 2.12-1.16 3-1.7l101-58.34a16.42 16.42 0 0 0 8.3-14.37v-142.39l42.69 24.65a1.52 1.52 0 0 1 .83 1.17v117.92a95.18 95.18 0 0 1 -94.97 95.06zm-204.24-87.23a94.74 94.74 0 0 1 -11.34-63.7c.75.45 2.06 1.25 3 1.79l101 58.34a16.44 16.44 0 0 0 16.59 0l123.31-71.2v49.3a1.53 1.53 0 0 1 -.61 1.31l-102.1 58.95a95.16 95.16 0 0 1 -129.85-34.79zm-26.57-220.49a94.71 94.71 0 0 1 49.48-41.68c0 .87-.05 2.41-.05 3.48v116.68a16.41 16.41 0 0 0 8.29 14.36l123.31 71.19-42.69 24.65a1.53 1.53 0 0 1 -1.44.13l-102.11-59a95.16 95.16 0 0 1 -34.79-129.81zm350.74 81.62-123.31-71.2 42.69-24.64a1.53 1.53 0 0 1 1.44-.13l102.11 58.95a95.08 95.08 0 0 1 -14.69 171.55c0-.88 0-2.42 0-3.49v-116.68a16.4 16.4 0 0 0 -8.24-14.36zm42.49-63.95c-.75-.46-2.06-1.25-3-1.79l-101-58.34a16.46 16.46 0 0 0 -16.59 0l-123.31 71.2v-49.3a1.53 1.53 0 0 1 .61-1.31l102.1-58.9a95.07 95.07 0 0 1 141.19 98.44zm-267.11 87.87-42.7-24.65a1.52 1.52 0 0 1 -.83-1.17v-117.92a95.07 95.07 0 0 1 155.9-73c-.77.42-2.11 1.16-3 1.7l-101 58.34a16.41 16.41 0 0 0 -8.3 14.36zm23.19-50 54.92-31.72 54.92 31.7v63.42l-54.92 31.7-54.92-31.7z" fill="#ffffff"></path></svg>
                   </div>
                   <p className="ml-2">Generate With AI</p>
                </button>
            </div>
        </div>
        <div className="flex items-center px-4 py-2 text-lg">
            <TableCellsIcon width={20}></TableCellsIcon>
            <h1 className="ml-2 font-bold">Tables</h1>
        </div>
        <div className="w-full h-[70vh] overflow-y-auto bg-black-200 bg-gradient-radial bg-radial-black-transparent bg-radial-size bg-radial-position">
            <ul>
                {appStore.tables.length==0 && <li className="p-5 text-4xl opacity-50 font-bold"><span className="text-6xl">No tables 😅 </span><br/>Create a table or Generate with AI</li>}
                {appStore.tables.map((table)=>
                <OutlinerItem 
                    onAddColumnClick={()=>{
                        setColumnNameInput({...columnNameInput, table:table.name});
                        setCreatingColumn(true);
                    }} 
                    onRemoveColumn={(table,column)=>{
                        myConsole.log([{
                            message:`✅ Column ## from Table ## removed successfuly! `,
                            type:ConsoleLogTypes.message,
                            highights:[column.name, table.name]
                        }]);
                        appStore.removeColumn(table,column);
                    }}
                    onRemoveTable={(table)=>{
                        myConsole.log([{
                            message:`✅ Table ${table.name} removed successfuly! `,
                            type:ConsoleLogTypes.message,
                        }]);
                        appStore.removeTable(table);
                    }}
                    searchingWord={seachingWord}
                    key={`table_${table.name}`} 
                    table={table} 
                    onTableClick={(t:ITable)=>appStore.toggleTable(t.name)}
                ></OutlinerItem>)}
               
            </ul>
        </div>
    </div>
    </>
  )
}
