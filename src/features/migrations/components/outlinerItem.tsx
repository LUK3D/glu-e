import { CubeIcon, ChevronDownIcon, CubeTransparentIcon, KeyIcon } from "@heroicons/react/24/solid";
import { Itable } from "../../../types";

export default function OutlinerItem(args:{table:Itable, onTableClick:Function}) {
  return (
    <li className="pl-10 pr-4 py-2 flex flex-col group">
        <button onClick={()=>{
            args.onTableClick(args.table);
        }}  className="flex items-center justify-between group-hover:text-primary group-hover:cursor-pointer selection:bg-transparent active:group-hover:text-blue-50">
            <div className="flex"><CubeIcon width={20}></CubeIcon> <p className="ml-2">{args.table.name}</p></div>
            <ChevronDownIcon width={15}></ChevronDownIcon>
        </button>
        <ul className={`pl-4 ${args.table.expanded == true?' flex flex-col':'hidden'}`}>
            {args.table.columns.map((column)=>(
                <li className="pl-1  py-2 flex flex-col border-l border-black-300">
                    <div className="flex items-center ">
                        {column.primaryKey?<KeyIcon width={15} className="text-yellow-500"></KeyIcon> : <CubeTransparentIcon width={20}></CubeTransparentIcon> }
                            <p className="ml-2">{column.name} <span className="text-xs text-yellow-500 text-opacity-50">({column.type})</span></p>
                    </div>
                </li>
            ))}
            
        </ul>
    </li>
  )
}
