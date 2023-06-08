import { DocumentTextIcon, PlusIcon} from "@heroicons/react/24/outline";
import { NodeProps, Handle, Position } from "reactflow";



export default function TableNode(props:NodeProps) {
  return (
    <div 
        className="bg-primary bg-opacity-50 border-2 border-primary rounded-lg min-w-[200px]  p-4 flex flex-col text-gray-300 relative"
    >
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
        <Handle id="right" type="source" position={Position.Right}  />
        <Handle id="left" type="target" position={Position.Left}  />
        
    </div>
  )
}
