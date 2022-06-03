import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, Input, InputAdornment } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editClient, findClient, getClient } from "../actions/client.action";
import Errordialog from "../components/errordialog";
import { isEmpty } from "../utils/Utils";
export default function Profile_details() {
  const client = useSelector((state) => state.client);
  const[data,setData]=useState('')
  const [showPassword, setShowPassword] = useState(false);
  useEffect(()=>{
      if(!isEmpty(client)){
        const adresse=isEmpty(client[0].address)?'':client[0].address
        const telephone=isEmpty(client[0].phone_number)?'':client[0].phone_number
        setData({nom:client[0].last_name,prenom:client[0].first_name,email:client[0].email,password:client[0].password,adresse:adresse,telephone:telephone})
        }
        console.log(client)  },[client])
  const dispatch = useDispatch();
  const [showFailureMessage, setShowFailureMessage] = useState(false);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState({header:'',text:''});
  const handleClose = () => {
    setOpen(false);
  };
  const [errors, setErrors] = useState({});
    const handleValidation = () => {
      const {nom,prenom,telephone,password,adresse}=data;
      let tempErrors = {};
      let isValid = true;
      if (nom.length <= 0) {
        tempErrors["nom"] = true;
        isValid = false;
      }
      if (prenom.length <= 0) {
        tempErrors["prenom"] = true;
        isValid = false;
      }
      if (password.length <= 0) {
        tempErrors["password"] = true;
        isValid = false;
      }
      if (telephone.length <= 0) {
        tempErrors["telephone"] = true;
        isValid = false;
      }
      if (adresse.length <= 0) {
        tempErrors["adresse"] = true;
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
      let isValidForm = handleValidation();
      if (isValidForm) {
        var client_id=localStorage.getItem('new').split('||')
        const {nom,prenom,email,password,adresse,telephone}=data;
        const values={
          id:client_id[1],first_name:prenom,last_name:nom,email:email,password:password,address:adresse,phone_number:telephone
        }
        dispatch(editClient(values)).then((res)=>{
          setData({nom:client[0].last_name,prenom:client[0].first_name,email:client[0].email,password:client[0].password,adresse:adresse,telephone:telephone})
          setText({header:'Done!!',text:'Compte modifié avec succès'})
          setOpen(true)
          dispatch(findClient(client_id[1]))
          // router.push('/login')
        }).catch((err) => {console.log(err);setShowFailureMessage(true)});
      }
    };
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
      };
  return (
    <>
    <div className="container-wrapper flex h-full items-center justify-center py-7">
        <form onSubmit={handleSubmit} className="grid grid-cols-2 md:grid-cols-1 gap-5 border border-gray-300 shadow-lg p-6 rounded-md max-w-4xl w-full">
          <div className='grid grid-cols-1 gap-2'>
          <label className="flex flex-col text-left gap-1">
            <span>Nom</span>
                <input 
                  name='nom'
                  className="bg-gray-200 rounded-md py-2 px-3 outline-none focus:ring-1 focus:ring-secondary focus:ring-opacity-50" 
                  type="text"
                  value={data.nom}
                  onChange={handleChange}
                  placeholder="Enterez votre Nom"/>
          </label>
          {errors?.nom &&(<span className="text-xs text-red-400">Le nom ne peut pas être vide!</span>)}
          <label className="flex flex-col text-left gap-1">
            <span>Email</span>
                <input 
                  name='email'
                  disabled
                  className="bg-gray-200 rounded-md py-2 px-3 outline-none focus:ring-1 focus:ring-secondary focus:ring-opacity-50" 
                  type="email"
                  value={data.email}
                  placeholder="Enterez votre Email"/>
          </label>
          <label className="flex flex-col text-left gap-1">
            <span>Adresse</span>
                <input  
                  name='adresse'
                  className="bg-gray-200 rounded-md py-2 px-3 outline-none focus:ring-1 focus:ring-secondary focus:ring-opacity-50" 
                  type="text"
                  value={data.adresse}
                  onChange={handleChange}
                  placeholder="Entez votre adresse"/>
          </label>
          {errors?.adresse &&(<span className="text-xs text-red-400">L'Adresse ne peut pas être vide!</span>)}
          
          </div>
          <div className='grid grid-cols-1 gap-2 flex-1'>
          <label className="flex flex-col text-left gap-1">
            <span>Prenom</span>
                <input 
                  name='prenom'
                  className="bg-gray-200 rounded-md py-2 px-3 outline-none focus:ring-1 focus:ring-secondary focus:ring-opacity-50" 
                  type="text"
                  value={data.prenom}
                  onChange={handleChange}
                  placeholder="Enterez votre Prenom"/>
          </label>
          {errors?.prenom &&(<span className="text-xs text-red-400">Le prenom ne peut pas être vide!</span>)}
          <label className="flex flex-col text-left gap-1">
            <span>Password</span>
                  <Input
                        name='password'
                        placeholder="Enterez votre mot de pass"
                        className="bg-gray-200 rounded-md py-1 px-3 outline-none focus:ring-1 focus:ring-secondary focus:ring-opacity-50" 
                        type={showPassword ? "text" : "password"}
                        onChange={handleChange}
                        value={data.password}
                        disableUnderline
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            onClick={handleClickShowPassword}
                            >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                        }
                    />
          </label>
          {errors?.password &&(<span className="text-xs text-red-400">Le mot de passe ne peut pas être vide!</span>)}
          <label className="flex flex-col text-left gap-1">
            <span>Téléphone</span>
                <input 
                  name='telephone'
                  className="bg-gray-200 rounded-md py-2 px-3 outline-none focus:ring-1 focus:ring-secondary focus:ring-opacity-50" 
                  type="text"
                  value={data.telephone}
                  onChange={handleChange}
                  placeholder="Enterez votre Prenom"/>
          </label>
          {errors?.telephone &&(<span className="text-xs text-red-400">Le numero ne peut pas être vide!</span>)}
          </div>
          <button className=" bg-primary hover:bg-secondary relative z-[999] text-white py-2 px-5 text-l rounded-md transition-all whitespace-nowrap max-w-[150px]">
            Enregistrer
          </button>
          {showFailureMessage &&(<span className="text-xs text-red-400">Oups!! une erreur est survenue veuillez réessayer plus tard</span>)}
          <Errordialog onClick={handleClose} open={open} header={text.header} text={text.text} />
        </form>
      </div>
    </>
  )
}