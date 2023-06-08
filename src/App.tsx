import { Squares2X2Icon, ArrowPathIcon } from '@heroicons/react/24/outline'
import 'reactflow/dist/style.css';
import './App.css'
import { ReactNode} from 'react'
import { SidePanel, Workspace } from './features/migrations';
import { useAppStore } from './store';
import { ModelSidePanel, ModelWorkspace } from './features/models';



interface ITab{
  label:string,
  icon:ReactNode,
  sidePannel:any,
  workspace: any,
}


function App() {

  const appStore = useAppStore((state) => state);

  const tabs:Array<ITab> = [
    {
      label: "Migrations",
      sidePannel:SidePanel,
      workspace:Workspace,
      icon:<ArrowPathIcon></ArrowPathIcon>
    },
    {
      label: "Models",
      sidePannel:ModelSidePanel,
      workspace:ModelWorkspace,
      icon:<Squares2X2Icon></Squares2X2Icon>
    },
    // {
    //   label: "Controllers",
    //   sidePannel:<div></div>,
    //   workspace:<div></div>,
    //   icon:<SquaresPlusIcon></SquaresPlusIcon>
    // },
    // {
    //   label: "Endpoints",
    //   sidePannel:<div></div>,
    //   workspace:<div></div>,
    //   icon:<BoltIcon></BoltIcon>
    // },
  ];

  return (
   <div className='w-screen h-screen bg-black-200 flex text-gray-500'>
    
    <div className='w-1/4 h-full border-black-400 border-r bg-black-300 '>
      <div className='w-full min-h-[40px] max-h-[40px] bg-black-400'>
      </div>
      <div className='tree-view flex flex-col w-full h-full'>
        {tabs.map((tab)=>(tab.label == appStore.workspace ?<tab.sidePannel appStore={appStore} key={`sidepanel_${tab.label}`}></tab.sidePannel>:<></>))}
      </div>
    </div>
    <div className='w-3/4 flex flex-col'>
      <div className='w-full min-h-[40px] max-h-[40px] bg-black-400 flex pt-2'>
        {tabs.map((tab)=>(
          <button key={`tab_${tab.label}`} 
          className={`${tab.label == appStore.workspace ?'bg-black-200 bg-gradient-radial bg-radial-black-transparent bg-radial-size bg-radial-position font-bold':'bg-black-400'} px-4 flex items-center justify-between rounded-t-md `}
          onClick={()=>appStore.setWorkspace(tab.label)}
          >
          <div className='w-5 mr-2'>
            {tab.icon}
          </div>
          <p>{tab.label}</p>
        </button>
        ))}
      </div>
      <div className='workspace flex flex-col w-full h-full bg-gradient-radial bg-radial-black-transparent bg-radial-size bg-radial-position '>
      {tabs.map((tab)=>(tab.label == appStore.workspace ?<tab.workspace key={`workspace_${tab.label}`} appStore={appStore}></tab.workspace>:<></>))}
      </div>
    </div>
   </div>
  )
}

export default App
