import { TableCellsIcon } from "@heroicons/react/20/solid";
import { MagnifyingGlassCircleIcon, FolderIcon, } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/outline";
import OutlinerItem from "./components/outlinerItem";
import { IApp, IColumn, ITable } from "../../types";
import Modal from "../../components/modal";
import { useState } from "react";
import { validateTableName } from "../../utls/validator";
import NewTableForm from "./components/newTableForm";
import { getAIModels } from "../../core/ai";
import OpenAiIcon from "../../components/openAiIcon";
import AiDialog from "./components/AIDialog";


interface ISidePanel{
    appStore:IApp
}

interface IColumnComposition{
    table:string,
    column:string
}
export  function SidePanel({appStore}:ISidePanel) {

    const [creatingTable, setCreatingTable] = useState<boolean>(false);
    const [tableNameInput, setTableNameInput] = useState<string>('');
    const [creatingColumn, setCreatingColumn] = useState<boolean>(false);
    const [isGeneratingWIthAi, setIsGeneratingWIthAi] = useState<boolean>(false);
    const [columnNameInput, setColumnNameInput] = useState<IColumnComposition>({table:'', column:''});


    const [seachingWord, setSearchingWord] = useState<string>("");


    const onGenerateWithAi = async (organization:string,apiKey:string, description:string)=>{
        console.log(organization,apiKey, description);
        appStore.setAiCredencials({org:organization, key:apiKey});
        if(appStore.openAi){
           const tables = await getAIModels({key:apiKey, org:organization, description});
            appStore.setTables(tables);
           console.log(tables);
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
        description='Follow the steps to generate the base of your project'
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
                    <OpenAiIcon></OpenAiIcon> 
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
