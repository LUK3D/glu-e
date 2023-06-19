import {   ChevronUpIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import { Disclosure } from "@headlessui/react";
import { useState } from "react";

export default function AiDialog({onCancel,onComplete}:{onComplete:Function,  onCancel:Function}) {


    const [organization, setOrganization] = useState<string>("");
    const [apiKey, setApiKey] = useState<string>("");
    const [description, setDescription] = useState<string>("");


   

  return (
    <div className="w-full flex flex-col mt-2">
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
                                    placeholder="Organization ID                                    " 
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

                    <p className="text-xs text-gray-500 mt-4">What kind of project are you trying to create? Eg: Social network</p>

                    <div className="w-full  flex items-start bg-black-200 bg-opacity-50 rounded-md px-2 mt-2">
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
                    <div className="w-6 h-6 mr-1">
                     <svg width="100%" height="100%" viewBox="140 140 520 520"><path d="m617.24 354a126.36 126.36 0 0 0 -10.86-103.79 127.8 127.8 0 0 0 -137.65-61.32 126.36 126.36 0 0 0 -95.31-42.49 127.81 127.81 0 0 0 -121.92 88.49 126.4 126.4 0 0 0 -84.5 61.3 127.82 127.82 0 0 0 15.72 149.86 126.36 126.36 0 0 0 10.86 103.79 127.81 127.81 0 0 0 137.65 61.32 126.36 126.36 0 0 0 95.31 42.49 127.81 127.81 0 0 0 121.96-88.54 126.4 126.4 0 0 0 84.5-61.3 127.82 127.82 0 0 0 -15.76-149.81zm-190.66 266.49a94.79 94.79 0 0 1 -60.85-22c.77-.42 2.12-1.16 3-1.7l101-58.34a16.42 16.42 0 0 0 8.3-14.37v-142.39l42.69 24.65a1.52 1.52 0 0 1 .83 1.17v117.92a95.18 95.18 0 0 1 -94.97 95.06zm-204.24-87.23a94.74 94.74 0 0 1 -11.34-63.7c.75.45 2.06 1.25 3 1.79l101 58.34a16.44 16.44 0 0 0 16.59 0l123.31-71.2v49.3a1.53 1.53 0 0 1 -.61 1.31l-102.1 58.95a95.16 95.16 0 0 1 -129.85-34.79zm-26.57-220.49a94.71 94.71 0 0 1 49.48-41.68c0 .87-.05 2.41-.05 3.48v116.68a16.41 16.41 0 0 0 8.29 14.36l123.31 71.19-42.69 24.65a1.53 1.53 0 0 1 -1.44.13l-102.11-59a95.16 95.16 0 0 1 -34.79-129.81zm350.74 81.62-123.31-71.2 42.69-24.64a1.53 1.53 0 0 1 1.44-.13l102.11 58.95a95.08 95.08 0 0 1 -14.69 171.55c0-.88 0-2.42 0-3.49v-116.68a16.4 16.4 0 0 0 -8.24-14.36zm42.49-63.95c-.75-.46-2.06-1.25-3-1.79l-101-58.34a16.46 16.46 0 0 0 -16.59 0l-123.31 71.2v-49.3a1.53 1.53 0 0 1 .61-1.31l102.1-58.9a95.07 95.07 0 0 1 141.19 98.44zm-267.11 87.87-42.7-24.65a1.52 1.52 0 0 1 -.83-1.17v-117.92a95.07 95.07 0 0 1 155.9-73c-.77.42-2.11 1.16-3 1.7l-101 58.34a16.41 16.41 0 0 0 -8.3 14.36zm23.19-50 54.92-31.72 54.92 31.7v63.42l-54.92 31.7-54.92-31.7z" fill="#ffffff"></path></svg>
                    </div>
                    <p >Generate</p> 
                </button>
           </div>

        </div>
  )
}
