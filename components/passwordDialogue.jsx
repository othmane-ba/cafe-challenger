/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Dialogue from './dialogue';
import { useDispatch } from 'react-redux';
import { editClient, findClient } from '../actions/client.action';
import ErrorDialogue from './errordialogue';

export default function PasswordDialogue({open,onClick,data}) {
  const dispatch = useDispatch();
  const [open2, setOpen2] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const cancelButtonRef = useRef(null)
  const [text, setText] = useState({header:'',text:''});
  const handleClose = () => {
    setOpen2(false);
  };
  const handleErrorClose = () => {
    setOpenError(false);
  };
  const handleSubmit=()=>{
    if(password==data.password){
      dispatch(editClient(data)).then(()=>{
        setText({header:'Done!!',text:'Compte modifié avec succès'})
        var client_id=localStorage.getItem('new').split('||')
        dispatch(findClient(client_id[1]))
        setOpen2(true)
        setPassword('')
        setError(false)
        onClick()
      }).catch((err) => {console.log(err);setText({header:'Error!!',text:"Une erreur c'est produite"});setOpenError(true)});
    }else{
      setError(true)
    }
  }
  return (
      <>
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={onClick}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-0 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl w-5/12 transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                      <CheckCircleIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                      Veuillez entrer votr mot de pass !! 
                      </Dialog.Title>
                      <div className="mt-2">
                      <label className="flex flex-col text-left gap-1">
                        <span>Mot de pass</span>
                            <input  
                              name='Password'
                              className="bg-gray-200 rounded-md py-2 px-3 outline-none focus:ring-1 focus:ring-secondary focus:ring-opacity-50" 
                              type="text"
                              value={password}
                              onChange={(e)=>setPassword(e.target.value)}
                              placeholder="Entez votre Mot de pass"/>
                      </label>
                      {error==true &&(<span className="text-xs text-red-400">Mot de passe erroné</span>)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleSubmit}
                  >
                    Accepter
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={onClick}
                    ref={cancelButtonRef}
                  >
                    Fermer
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
    <Dialogue onClick={handleClose} open={open2} header={text.header} text={text.text} />
    <ErrorDialogue onClick={handleErrorClose} open={openError} header={text.header} text={text.text} />
    </>
  )
}
