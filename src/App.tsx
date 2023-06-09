import { Squares2X2Icon, ArrowPathIcon, ExclamationTriangleIcon, CloudArrowUpIcon, ArrowPathRoundedSquareIcon } from '@heroicons/react/24/outline'
import 'reactflow/dist/style.css';
import './App.css'
import { ReactNode} from 'react'
import { SidePanel, Workspace } from './features/migrations';
import { consoleStore, useAppStore } from './store';
import { ModelSidePanel, ModelWorkspace } from './features/models';
import Console from './features/console/Console';
import generateUniqueKey from './utls/generator';
import { useLocalStorage } from 'react-use';
import { ConsoleLogTypes, IApp } from './types';
import { CodeBracketIcon } from '@heroicons/react/24/solid';

interface ITab{
  label:string,
  icon:ReactNode,
  sidePannel:any,
  workspace: any,
}


function App() {

  const appStore = useAppStore((state) => state);

  const myConsole = consoleStore((state)=>state);

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

  
  const [savedValue, setValue] = useLocalStorage('glue-e', JSON.stringify(appStore));


  const saveProject = ()=>{
    setValue(JSON.stringify(appStore));
  }

  const loadProject = ()=>{
    if(!savedValue){
      return;
    }
      const val = JSON.parse(savedValue) as IApp;

      
      appStore.loadSave(val);
  }

  return (
   <div className='w-screen h-screen bg-black-200 flex flex-col text-gray-500'>
    <div className='w-full h-full flex '>
      <div className='w-1/4 h-full border-black-400 border-r bg-black-300 '>
        <div className='w-full min-h-[40px] max-h-[40px] bg-black-400 flex items-center'>
            <p className='text-white font-bold px-2'>Glu-e</p>
            <button onClick={saveProject} className='border-primary border bg-primary bg-opacity-25 text-white px-2 rounded-md mx-3' title='Save'>
              <CloudArrowUpIcon className='w-6 h-6'></CloudArrowUpIcon>
            </button>
            <button onClick={loadProject} className='border-orange-500 border bg-orange-500 bg-opacity-25 text-white px-2 rounded-md mx-3' title='Load from disk'>
              <ArrowPathRoundedSquareIcon className='w-6 h-6'></ArrowPathRoundedSquareIcon>
            </button>
            <button onClick={()=>{
              myConsole.log([{
                    type:ConsoleLogTypes.warning,
                    message:JSON.stringify(appStore.tables)
                  }]
                
                )
              // console.log(appStore.tables)
            }} className='border-blue-500 border bg-blue-500 bg-opacity-25 text-white px-2 rounded-md mx-3' title='Load from disk'>
              <CodeBracketIcon className='w-6 h-6'></CodeBracketIcon>
            </button>
        </div>
        <div className='tree-view flex flex-col w-full h-full'>
          {tabs.map((tab)=>(tab.label == appStore.workspace && <tab.sidePannel appStore={appStore} key={`sidepanel_${generateUniqueKey()}`}></tab.sidePannel>))}
        </div>
      </div>
      <div className='w-3/4 flex flex-col'>
        <div className='w-full min-h-[40px] max-h-[40px] bg-black-400 flex pt-2'>
          {tabs.map((tab)=>(
            <button key={`tab_${generateUniqueKey()}`} 
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
        {tabs.map((tab)=>(tab.label == appStore.workspace && <tab.workspace key={`workspace_${tab.label}`} appStore={appStore}></tab.workspace>))}
        </div>
        <Console myConsole={myConsole}></Console>
      </div>
    </div>
    <div className='footer w-full h-[30px] border-t border-black-400 bg-black-400 flex justify-between items-center'>
            <div className='flex items-center px-2'>
              
              <button className={`
              flex items-center
              ${myConsole.errors.length>0?'text-red-500 animate-pulse':''}
              `}>
                <ExclamationTriangleIcon className='w-5 h-5'></ExclamationTriangleIcon>
                <p>{myConsole.errors.length}</p>
              </button>
            </div>
            <div></div>
            <div></div>
    </div>

   </div>
  )
}

export default App
