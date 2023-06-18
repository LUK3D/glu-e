import { Dialog, Transition } from '@headlessui/react'
import { Fragment, ReactNode} from 'react'


interface IModel{
    buttonClass?:string,
    isOpen:boolean,
    onCloseDialog:Function,
    tittle?:ReactNode|string,
    body:ReactNode,
    description?:ReactNode|string
}

export default function Modal( {isOpen, buttonClass, body, onCloseDialog,description, tittle}: IModel ) {


  return (
    <>
    
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={()=>onCloseDialog()}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black-100 bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-black-300 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-200"
                  >
                    {tittle}
                  </Dialog.Title>
                  <div className="mt-2 flex flex-col">
                    <p className="text-sm text-gray-500">
                     {description}
                    </p>
                    {body}
                  </div>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
