import {  PuzzlePieceIcon} from "@heroicons/react/24/solid";
import { Handle, Position } from "reactflow";

export default function RelationNode() {
  return (
    <div 
        className="bg-yellow-500 bg-opacity-50 border-2 border-yellow-500 rounded-lg  px-4 py-2 flex flex-col text-gray-300 relative"
    >
        <div className="w-full  flex items-center ">
        <PuzzlePieceIcon width={20} className="text-yellow-500"></PuzzlePieceIcon>
            <p className="ml-2 font-bold"><span className="text-yellow-500">Foreign on</span></p>
        </div>
        <Handle id="left" type="target" position={Position.Left}  />
        <Handle id="right" type="source" position={Position.Right}  />
        
    </div>
  )
}
