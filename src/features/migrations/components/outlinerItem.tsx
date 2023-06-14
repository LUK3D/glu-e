import { ChevronDownIcon,  KeyIcon,  } from "@heroicons/react/24/solid";
import {  PlusCircleIcon, FolderIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import { IColumn, Itable } from "../../../types";

export default function OutlinerItem(args:{table:Itable, onTableClick:Function, onAddColumnClick:Function}) {

    const onDragStart = (event:any, nodeType:string, column:IColumn) => {
        event.dataTransfer.setData('application/reactflow', JSON.stringify({table:args.table, type:nodeType, column:column}));
        event.dataTransfer.effectAllowed = 'move';
      };

  return (
    <li className="pl-10 pr-4 py-2 flex flex-col group">
        <div role="button" onClick={()=>{
            args.onTableClick(args.table);
        }}  className="flex items-center justify-between group-hover:text-primary group-hover:cursor-pointer selection:bg-transparent active:group-hover:text-blue-50">
            <div className="flex"><FolderIcon width={20}></FolderIcon> <p className="ml-2">{args.table.name}</p></div>
            <div className="flex">
                <button
                onClick={(e)=>{
                    e.stopPropagation();
                    args.onAddColumnClick();
                }}
                 className="group-hover:flex hidden items-center text-primary bg-primary bg-opacity-25 border border-primary px-2 mr-2 text-sm rounded-md active:group-hover:text-blue-50"><p className="mr-2">column</p> <PlusCircleIcon width={20}></PlusCircleIcon></button>
                <ChevronDownIcon width={15}></ChevronDownIcon>
            </div>
        </div>
        <ul className={`pl-4 ${args.table.expanded == true?' flex flex-col':'hidden'}`}>
            {args.table.columns.map((column)=>(
                <li key={column.name} className="pl-1  py-2 flex flex-col border-l border-black-300" onDragStart={(event) => onDragStart(event, 'table', column)} draggable>
                    <div className="flex items-center ">
                        {column.primaryKey?<KeyIcon width={15} className="text-yellow-500"></KeyIcon> : (column.isForeign ? <KeyIcon width={15} className="text-primary"></KeyIcon>: <DocumentTextIcon width={20}></DocumentTextIcon>) }
                        <p className="ml-2">{column.name} <span className="text-xs text-yellow-500 text-opacity-50">({column.type})</span></p>
                    </div>
                </li>
            ))}
            
        </ul>
    </li>
  )
}
