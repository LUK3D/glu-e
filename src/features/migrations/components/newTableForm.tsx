import { useState } from "react";
import Select from "../../../components/select";
import { DataTypesItems,DataTypes } from "../../../store/constants";
import {  DocumentTextIcon, CheckIcon } from "@heroicons/react/24/outline";
import { IColumn, ISelectItem } from "../../../types";

export default function NewTableForm({onCancel,onComplete}:{onComplete:Function,  onCancel:Function}) {
    const [columnItem, setColumnItem] = useState<IColumn>({
        name:'',
        type:DataTypes.VARCHAR,
    });

  return (
    <div className="w-full flex flex-col mt-10">
            <div className="w-full  flex items-center bg-black-200 bg-opacity-50 rounded-md px-2">
                <DocumentTextIcon width={20} className="text-primary"></DocumentTextIcon>
                <input 
                    type="text" 
                    placeholder="Column name" 
                    className=" py-2 pl-2 bg-transparent outline-none w-full placeholder:text-gray-400 text-white"
                    onChange={(e)=>{
                        setColumnItem({...columnItem, name: e.currentTarget.value});
                    }}
                    onSubmit={()=>{
                        onComplete(columnItem);
                    }}
                    onKeyDown={(e)=>{
                        if(e.code == 'Enter'){
                            onComplete(columnItem);
                        }
                    }}
                />
            </div>
            <div className="w-full  flex items-center bg-black-200 bg-opacity-50 rounded-md px-2 mt-4">
                <DocumentTextIcon width={20} className="text-primary"></DocumentTextIcon>
                <div className="w-full">
                <Select elements={DataTypesItems} onChange={(val:ISelectItem)=>{
                    setColumnItem({...columnItem, type:val.value});
                }}></Select>
                </div>
            </div>
            <div className="w-full  flex items-center bg-black-200 bg-opacity-50 rounded-md px-2 mt-4">
                <DocumentTextIcon width={20} className="text-primary"></DocumentTextIcon>
                <input 
                    type="number" 
                    placeholder="Length" 
                    className=" py-2 pl-2 bg-transparent outline-none w-full placeholder:text-gray-400 text-white"
                    // value={columnItem.length}
                    onChange={(e)=>{
                        if(e.currentTarget.value.toString().length<=0){
                            return;
                        }
                        setColumnItem({...columnItem, length: parseInt(e.currentTarget.value?.toString()??'255')});
                    }}
                    onSubmit={()=>{
                        onComplete(columnItem);
                    }}
                    onKeyDown={(e)=>{
                        if(e.code == 'Enter'){
                            onComplete(columnItem);
                        }
                    }}
                />
            </div>

            <button

            onClick={()=>{
                setColumnItem({...columnItem, nullable:(!columnItem.nullable)??false});
            }}
            
            className="text-gray-400  px-2 py-2 flex items-center active:text-white mt-2">
                <div className={`p-[1px] ${columnItem.nullable?'bg-primary':'bg-transparent'} border border-primary rounded-md mr-2 text-white`}>
                    {columnItem.nullable?<CheckIcon width={20}></CheckIcon>:<div className="w-[20px] h-[20px]"></div>}
                </div>  
                <p>Allow null</p>
            </button>

            <div className="w-full  flex items-center bg-black-200 bg-opacity-50 rounded-md px-2 mt-4">
                <DocumentTextIcon width={20} className="text-primary"></DocumentTextIcon>
                <input 
                    type="text" 
                    placeholder="Default Value" 
                    className=" py-2 pl-2 bg-transparent outline-none w-full placeholder:text-gray-400 text-white"
                    onChange={(e)=>{
                        if(e.currentTarget.value.toString().length<=0){
                            return;
                        }
                        setColumnItem({...columnItem, defaultValue: e.currentTarget.value});
                    }}
                    onSubmit={()=>{
                        onComplete(columnItem);
                    }}
                    onKeyDown={(e)=>{
                        if(e.code == 'Enter'){
                            onComplete(columnItem);
                        }
                    }}
                />
            </div>

            <button 
            
            onClick={()=>{
                setColumnItem({...columnItem, primaryKey:(!columnItem.primaryKey)??false});
            }}

            className="text-gray-400  px-2 py-2 flex items-center active:text-white mt-2">
                <div className={`p-[1px] ${columnItem.primaryKey?'bg-primary':'bg-transparent'} border border-primary rounded-md mr-2 text-white`}>
                    {columnItem.primaryKey?<CheckIcon width={20}></CheckIcon>:<div className="w-[20px] h-[20px]"></div>}
                </div>  
                <p>Is PrimaryKey</p>
            </button>

            <button 
                onClick={()=>{
                    setColumnItem({...columnItem, autoIncrement:(!columnItem.autoIncrement)??false});
                }}
                className="text-gray-400  px-2 py-2 flex items-center active:text-white mt-2">
                <div className={`p-[1px] ${columnItem.autoIncrement?'bg-primary':'bg-transparent'} border border-primary rounded-md mr-2 text-white`}>
                    {columnItem.autoIncrement?<CheckIcon width={20}></CheckIcon>:<div className="w-[20px] h-[20px]"></div>}
                </div>   
                <p>AutoIncrement</p>
            </button>

            <button 
                onClick={()=>{
                    setColumnItem({...columnItem, unique:(!columnItem.unique)??false});
                }}
            className="text-gray-400  px-2 py-2 flex items-center active:text-white mt-2">
                <div className={`p-[1px] ${columnItem.unique?'bg-primary':'bg-transparent'} border border-primary rounded-md mr-2 text-white`}>
                    {columnItem.unique?<CheckIcon width={20}></CheckIcon>:<div className="w-[20px] h-[20px]"></div>}
                </div>   
                <p>Unique</p>
            </button>

           <div className="flex justify-end mt-10">
                <button onClick={()=>onCancel()}  className="px-4 py-1 mr-4 bg-black-200 border border-black-200 bg-opacity-50 hover:bg-opacity-60 active:bg-opacity-70 transition-colors  text-gray-500 rounded-md mt-2 flex items-center justify-center">
                    <p >Cancel</p>
                </button>
                <button onClick={()=>onComplete(columnItem)}  className="px-4 py-1 bg-primary border border-primary bg-opacity-50 hover:bg-opacity-60 active:bg-opacity-70 transition-colors  text-gray-200 rounded-md mt-2 flex items-center justify-center">
                    <p >Save</p> 
                </button>
           </div>

        </div>
  )
}
