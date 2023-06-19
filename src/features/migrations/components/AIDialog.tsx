import {   ChevronUpIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import { Disclosure } from "@headlessui/react";
import { useState } from "react";
import OpenAiIcon from "../../../components/openAiIcon";

export default function AiDialog({onCancel,onComplete}:{onComplete:Function,  onCancel:Function}) {


    const [organization, setOrganization] = useState<string>("");
    const [apiKey, setApiKey] = useState<string>("");
    const [description, setDescription] = useState<string>("");


   

  return (
    <div className="w-full flex flex-col mt-10">
           <div className="w-full flex">
                <div className=" w-full  rounded-2xl bg-transparent p-2">
                    <Disclosure as="div" className="mt-2">
                    {({ open }) => (
                        <>
                        <Disclosure.Button className="flex w-full justify-between rounded-lg bg-black-400 bg-opacity-80 px-4 py-2 text-left text-sm font-medium text-white hover:bg-opacity-100 focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-opacity-75">
                            <span>Open Ai Credentials (Api Key)</span>
                            <ChevronUpIcon
                            className={`${
                                open ? 'rotate-180 transform' : ''
                            } h-5 w-5 text-primary`}
                            />
                        </Disclosure.Button>
                        <Disclosure.Panel className="flex flex-col p-4  bg-black-400 rounded-md bg-opacity-60">
                            <div className="w-full  flex items-center bg-black-200 bg-opacity-50 rounded-md px-2">
                                <DocumentTextIcon width={20} className="text-primary"></DocumentTextIcon>
                                <input 
                                    type="text" 
                                    placeholder="Organization" 
                                    className=" py-2 pl-2 bg-transparent outline-none w-full placeholder:text-gray-400 text-white"
                                    onChange={(e)=>{
                                        setOrganization(e.target.value);
                                    }}
                                    onSubmit={()=>{
                                        // onComplete(columnItem);
                                    }}
                                    onKeyDown={(e)=>{
                                        if(e.code == 'Enter'){
                                            // onComplete(columnItem);
                                        }
                                    }}
                                />
                            </div>
                            <div className="w-full  flex items-center bg-black-200 bg-opacity-50 rounded-md px-2 mt-2">
                                <DocumentTextIcon width={20} className="text-primary"></DocumentTextIcon>
                                <input 
                                    type="text" 
                                    placeholder="APi Key" 
                                    className=" py-2 pl-2 bg-transparent outline-none w-full placeholder:text-gray-400 text-white"
                                    onChange={(e)=>{
                                        setApiKey(e.target.value);
                                    }}
                                    onSubmit={()=>{
                                        // onComplete(columnItem);
                                    }}
                                    onKeyDown={(e)=>{
                                        if(e.code == 'Enter'){
                                            // onComplete(columnItem);
                                        }
                                    }}
                                />
                            </div>
                        </Disclosure.Panel>
                        </>
                    )}
                    </Disclosure>

                    <div className="w-full  flex items-start bg-black-200 bg-opacity-50 rounded-md px-2 mt-4">
                                <DocumentTextIcon width={20} className="text-primary mt-2"></DocumentTextIcon>
                                <textarea 
                                    placeholder="Project Description" 
                                    className=" py-2 pl-2 bg-transparent outline-none w-full placeholder:text-gray-400 text-white"
                                    maxLength={200}
                                    onChange={(e)=>{
                                        setDescription(e.target.value);
                                    }}
                                    onSubmit={()=>{
                                        // onComplete(columnItem);
                                    }}
                                    onKeyDown={(e)=>{
                                        if(e.code == 'Enter'){
                                            // onComplete(columnItem);
                                        }
                                    }}
                                ></textarea>
                            </div>
                </div>
                </div>
           <div className="flex justify-end mt-10">
                <button onClick={()=>onCancel()}  className="px-4 py-1 mr-4 bg-black-200 border border-black-200 bg-opacity-50 hover:bg-opacity-60 active:bg-opacity-70 transition-colors  text-gray-500 rounded-md mt-2 flex items-center justify-center">
                    <p >Cancel</p>
                </button>
                <button onClick={()=>onComplete(organization,apiKey, description)}  className="px-4 py-1 bg-primary border border-primary bg-opacity-50 hover:bg-opacity-60 active:bg-opacity-70 transition-colors  text-gray-200 rounded-md mt-2 flex items-center justify-center">
                    <div className="w-6 h-6 mr-1"><OpenAiIcon></OpenAiIcon></div>
                    <p >Generate</p> 
                </button>
           </div>

        </div>
  )
}
