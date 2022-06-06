import { useState } from "react";
import { useDispatch } from "react-redux";
import { editPassword, findClient } from "../actions/client.action";
import Dialogue from "./dialogue";
import ErrorDialogue from "./errordialogue";
export default function Edit_Password({info}) {
  const dispatch = useDispatch();
  var client_id=localStorage.getItem('new').split('||')
  const[data,setData]=useState({password:'',new_password:''})
  const [text, setText] = useState({header:'',text:''});
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({id:parseInt(client_id[1]),password:data.new_password});
  const [openError, setOpenError] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleErrorClose = () => {
    setOpenError(false);
  };
  const [errors, setErrors] = useState({});
    const handleValidation = () => {
      const {new_password,password}=data;
      let tempErrors = {};
      let isValid = true;
      if (password.length <= 0) {
        tempErrors["password"] = true;
        isValid = false;
      }
      if (new_password.length <= 0) {
        tempErrors["new_password"] = true;
        isValid = false;
      }
      setErrors({ ...tempErrors });
      return isValid;
    };
    function handleChange(e){
      e.preventDefault();
      const {name,value}=e.target;
      setData((prev)=>{
        return {...prev,[name]:value};
      })
    }
    const handleSubmit = (e) => {
      e.preventDefault();
      const {password,new_password}=data;
      setValues({id:parseInt(client_id[1]),password:new_password})
      let isValidForm = handleValidation();
      if (isValidForm) {
        if(password==info.password){
          dispatch(editPassword(values)).then(()=>{
            setText({header:'Done!!',text:'Compte modifié avec succès'})
            setOpen(true)
            setData({password:'',new_password:''})
            dispatch(findClient(client_id[1]))
          }).catch((err) => {console.log(err);setText({header:'Error!!',text:"Une erreur c'est produite"});setOpenError(true)});
        }else{
          setText({header:'Error!!',text:"Mot de passe erroné"});setOpenError(true)
        }
      }
    };
  return (
    <>
    <div className="container-wrapper flex h-full items-center justify-center">
        <form onSubmit={handleSubmit} className="grid grid-cols-2 md:grid-cols-1 sm:gap-1 gap-5  rounded-md w-full">
          <div className='grid grid-cols-1 gap-2'>
          <label className="flex flex-col text-left gap-1">
            <span>Ancien mot de passe</span>
                <input  
                  autoComplete="off"
                  name='password'
                  className="bg-gray-200 rounded-md py-2 px-3 outline-none focus:ring-1 focus:ring-secondary focus:ring-opacity-50" 
                  type="password"
                  value={data.password}
                  onChange={handleChange}
                  placeholder="Entez votre ancien mot de passe"/>
          </label>
          {errors?.password &&(<span className="text-xs text-red-400">Le mot de passe ne peut pas être vide!</span>)}
          
          </div>
          <div className='grid grid-cols-1 gap-2 flex-1'>
          <div className="h-full">
          <label className="flex flex-col text-left gap-1 mb-2">
            <span>Nouveau mot de passe</span>
                <input 
                  autoComplete="off"
                  name='new_password'
                  className="bg-gray-200 rounded-md py-2 px-3 outline-none focus:ring-1 focus:ring-secondary focus:ring-opacity-50" 
                  type="password"
                  value={data.new_password}
                  onChange={(e)=>(handleChange(e),setValues({id:parseInt(client_id[1]),password:e.target.value}))}
                  placeholder="Enterez votre nouveau mot de passe"/>
          </label>
          {errors?.new_password &&(<span className="text-xs text-red-400">Le mot de passe ne peut pas être vide!</span>)}
          </div>
          </div>
          <button className=" bg-primary hover:bg-secondary relative z-[999] text-white py-2 px-5 text-l rounded-md transition-all whitespace-nowrap max-w-[150px]">
            Enregistrer
          </button>
          <Dialogue onClick={handleClose} open={open}  header={text.header} text={text.text} />
          <ErrorDialogue onClick={handleErrorClose} open={openError}  header={text.header} text={text.text} />
        </form>
      </div>
    </>
  )
}