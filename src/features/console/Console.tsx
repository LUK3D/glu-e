
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { IConsoleStore,IRelationError } from '../../types'
import { ReactNode } from 'react';
import generateUniqueKey from '../../utls/generator';

export default function Console({myConsole}:{myConsole:IConsoleStore}) {

    const getMessage = (error: IRelationError) =>{
       let erros =  error.message.split('##');
       let result:ReactNode[] = [];

       if(!error.highights){
        return [error.message];
       }

       for (let i = 0; i < erros.length; i++) {
        result.push(<><span>{erros[i]}</span> <span className='bg-black-100 italic font-bold bg-opacity-25 mx-1 px-2 rounded-md'>{error.highights[i]}</span></>)
       }

       return result;
    }
    return (
        <div className="w-full h-[300px] flex flex-col border-t border-black-400">
            <div className='w-full h-[30px] bg-black-400 flex items-center justify-between'>
                <p className='flex'> <ExclamationTriangleIcon className='w-6 h-6 mr-2'></ExclamationTriangleIcon> Problems <span className='w-6 h-6 flex items-center justify-center  ml-2 bg-primary bg-opacity-40 text-white rounded-full'>{myConsole.errors.length}</span></p>
            </div>
            <ul className='w-full h-full overflow-y-auto flex flex-col text-sm'>
                {myConsole.errors.map((error, index)=>
                <li key={generateUniqueKey()} className='w-full flex items-center text-grey-500 '><p className='py-2 w-10 flex items-center justify-center border-r border-black-400'>{index+1}</p>{getMessage(error)}</li>
                )}
            </ul>
         
        </div>
      )
}
