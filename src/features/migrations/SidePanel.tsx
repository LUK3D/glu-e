import { TableCellsIcon } from "@heroicons/react/20/solid";
import { MagnifyingGlassCircleIcon, FolderIcon, } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/outline";
import OutlinerItem from "./components/outlinerItem";
import { IApp, IColumn, ITable } from "../../types";
import Modal from "../../components/modal";
import { useState } from "react";
import { validateTableName } from "../../utls/validator";
import NewTableForm from "./components/newTableForm";


interface ISidePanel{
    appStore:IApp
}

interface IColumnComposition{
    table:string,
    column:string
}
export  function SidePanel(args:ISidePanel) {

    const [creatingTable, setCreatingTable] = useState<boolean>(false);
    const [tableNameInput, setTableNameInput] = useState<string>('');
    const [creatingColumn, setCreatingColumn] = useState<boolean>(false);
    const [columnNameInput, setColumnNameInput] = useState<IColumnComposition>({table:'', column:''});




    const cancelTableCreation = ()=>{
        setTableNameInput('');
        setCreatingTable(false);
    }
    
    const createTable = ()=>{
        if(!validateTableName(tableNameInput) ){
            console.error("You must provide a valid name for this table: ", tableNameInput);
            return;
        }
        const result = args.appStore.createTable(tableNameInput);

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


        const result = args.appStore.createColumn(columnNameInput.table, column);

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
    <div className="flex flex-col h-full w-full">
        <div className="w-full   p-5   flex flex-col">
            <div className="w-full  flex items-center bg-black-100 bg-opacity-25 rounded-md px-2">
                <input 
                    type="text" 
                    placeholder="Search here" 
                    className=" py-1 bg-transparent outline-none w-full placeholder:text-gray-600 "
                />
                <MagnifyingGlassCircleIcon width={20}></MagnifyingGlassCircleIcon>
            </div>
            <button onClick={()=>setCreatingTable(true)} className="px-2 py-2 bg-primary border border-primary bg-opacity-25 hover:bg-opacity-50 active:bg-opacity-60 transition-colors  text-gray-200 rounded-md mt-2 flex items-center justify-center">
                <p className="mr-2">New Table</p> <PlusIcon width={20}></PlusIcon>
            </button>
        </div>
        <div className="flex items-center px-4 py-2 text-lg">
            <TableCellsIcon width={20}></TableCellsIcon>
            <h1 className="ml-2 font-bold">Tables</h1>
        </div>
        <div className="w-full h-full overflow-y-auto bg-black-200 bg-gradient-radial bg-radial-black-transparent bg-radial-size bg-radial-position">
            <ul>
                {args.appStore.tables.map((table)=><OutlinerItem onAddColumnClick={()=>{
                    setColumnNameInput({...columnNameInput, table:table.name});
                    setCreatingColumn(true);
                }} key={`table_${table.name}`} table={table} onTableClick={(t:ITable)=>args.appStore.toggleTable(t.name)}></OutlinerItem>)}
               
            </ul>
        </div>
    </div>
    </>
  )
}
