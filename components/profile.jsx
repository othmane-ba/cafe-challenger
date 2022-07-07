import { useState } from "react";
import { useSelector } from "react-redux";
import PasswordDialogue from "./passwordDialogue";
export default function Profile_details({info}) {
  const client = useSelector((state) => state.client);
  const[data,setData]=useState(info)
  const [showPassword, setShowPassword] = useState(false);
  const [showFailureMessage, setShowFailureMessage] = useState(false);
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState();
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
        const {nom,prenom,email,password,adresse,telephone}=data;
        setValues({
          id:client.id,first_name:prenom,last_name:nom,email:email,password:password,address:adresse,phone_number:telephone
        })
        setOpen(true)
      }
    };
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
      };
  return (
    <>
    <div className="container-wrapper flex h-full items-center justify-center">
        <form onSubmit={handleSubmit} className="grid grid-cols-2 md:grid-cols-1 sm:gap-1 gap-5  rounded-md w-full">
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
          <div className="h-full">
          <label className="flex flex-col text-left gap-1 mb-2">
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
          </div>
          <button className=" bg-primary hover:bg-secondary relative z-[999] text-white py-2 px-5 text-l rounded-md transition-all whitespace-nowrap max-w-[150px]">
            Enregistrer
          </button>
          {showFailureMessage &&(<span className="text-xs text-red-400">Oups!! une erreur est survenue veuillez réessayer plus tard</span>)}
          <PasswordDialogue onClick={handleClose} open={open} data={values} />
        </form>
      </div>
    </>
  )
}