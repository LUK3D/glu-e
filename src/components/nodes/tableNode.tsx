import { DocumentTextIcon,  PlusIcon, ExclamationTriangleIcon} from "@heroicons/react/24/outline";
import { } from "@heroicons/react/24/solid";
import { NodeProps, Handle, Position } from "reactflow";



export default function TableNode(props:NodeProps) {
  return (
    <div 
        className={`
         
        bg-opacity-50 border-2 ${props.data['invalid']?'border-dashed':''}
        border-primary bg-primary rounded-lg min-w-[200px]  
        p-4 flex flex-col text-gray-300 relative
        
        `}
    >


      {props.data['invalid'] &&  
        <div className="rounded-full fixed  top-1 left-1 1 flex justify-center items-center">
            <div className="rounded-full absolute bg-red-500  p-1 animate-ping w-5 h-5">
            </div>
            <div className="rounded-full absolute bg-red-500  p-1 w-6 h-6 ">
                <ExclamationTriangleIcon ></ExclamationTriangleIcon>
            </div>
        </div>
        }



        <div className="w-full  flex items-center ">
        <DocumentTextIcon width={20}></DocumentTextIcon>
            <p className="ml-2 font-bold">{props.data.label.split('.')[0]}.<span className="text-yellow-500">{props.data.label.split('.')[1]}</span></p>
        </div>

        <button 
        onClick={()=>{
            if(props.data.event){
                props.data.event(props);
            }
        }}
        className="absolute w-[20px] h-[20px] bg-white -right-3 rounded-md border-2 border-primary z-10 flex justify-center items-center ">
            <PlusIcon className="text-primary" strokeWidth={4}></PlusIcon>
        </button>
        <Handle id="right" type="source" position={Position.Right}   />
        <Handle id="left" type="target" position={Position.Left} className="w-3 h-3 -left-2 border-2 bg-white border-primary"  />
        
    </div>
  )
}
