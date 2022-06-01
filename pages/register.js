import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addClient } from "../actions/client.action";

export default function Register() {
  const router = useRouter()
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    confirm: ''
  });
  //   Form validation state
  const [errors, setErrors] = useState({});
  // Setting success or failure messages states
  const [showFailureMessage, setShowFailureMessage] = useState(false);
  const handleValidation = () => {
    const {nom,prenom,email,password,confirm}=values;
    let tempErrors = {};
    let isValid = true;
    const passregex = new RegExp('^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$');
    if (nom.length <= 0) {
      tempErrors["nom"] = true;
      isValid = false;
    }
    if (prenom.length <= 0) {
      tempErrors["prenom"] = true;
      isValid = false;
    }
    if (email.length <= 0) {
      tempErrors["email"] = true;
      isValid = false;
    }
    if (!passregex.test(password)) {
      tempErrors["password"] = true;
      isValid = false;
    }
    if (confirm !=password) {
      tempErrors["confirm"] = true;
      isValid = false;
    }
    setErrors({ ...tempErrors });
    return isValid;
  };
  function handleChange(e){
    e.preventDefault();
    const {name,value}=e.target;
    setValues((prev)=>{
      return {...prev,[name]:value};
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    let isValidForm = handleValidation();
    if (isValidForm) {
      const data={
        first_name:values.prenom,last_name:values.nom,email:values.email,password:values.password
      }
      dispatch(addClient(data)).then((res)=>{
        setValues({nom:'',prenom:'',email:'',password:'',confirm:''})
        router.push('/login')
      })
      .catch((err) => {console.log(err);setShowFailureMessage(true)});
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="px-8 py-6 mx-4 mt-4 text-left bg-white shadow-lg sm:w-full w-1/3">
          <div className="flex justify-center">
            {/* <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
            </svg> */}
            <Link href='/'>
            <img src='./images/logo.png'  className="w-40 mb-5 cursor-pointer" alt='logo'/></Link>
          </div>
          <h3 className="text-2xl font-bold text-center text-primary">S'inscrire</h3>
          <form  onSubmit={handleSubmit}>
            <div className="mt-4">
                  <div>
                {/* <label className="block" htmlFor="familly_name">Nom</label> */}
                    <input type="text" value={values.nom} onChange={handleChange} onBlur={handleValidation} name='nom' placeholder="Nom" className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                  </div>
                  {errors?.nom &&(<span className="text-xs text-red-400">Le nom ne peut pas être vide!</span>)}
                  <div>
                {/* <label className="block" htmlFor="first_name">Prenom</label> */}
                    <input type="text" placeholder="Prenom" value={values.prenom} name='prenom' onBlur={handleValidation} onChange={handleChange} className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                  </div>
                  {errors?.prenom &&(<span className="text-xs text-red-400">Le prenom ne peut pas être vide!</span>)}
              <div className="mt-4">
                {/* <label className="block" htmlFor="email">Email</label> */}
                    <input type="email" placeholder="Email" value={values.email} name='email' onBlur={handleValidation} onChange={handleChange} className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                  </div>
                  {errors?.email &&(<span className="text-xs text-red-400">L'Email ne peut pas être vide!</span>)}
              <div className="mt-4">
                {/* <label className="block">Password</label> */}
                    <input type="password" placeholder="Mot de passe" value={values.password} onBlur={handleValidation} name='password' onChange={handleChange} className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                  </div>
                  {errors?.password &&(<span className="text-xs text-red-400">Le mot de passe doit être composé de 8 à 20 caractères et inclure au moins 1 lettre, 1 chiffre et 1 caractère spécial !</span>)}
              <div className="mt-4">
                {/* <label className="block">Confirm Password</label> */}
                    <input type="password" placeholder="Confirm" value={values.confirm} onBlur={handleValidation} name='confirm' onChange={handleChange} className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                  </div>
                  {errors?.confirm &&(<span className="text-xs text-red-400">Le mot de passe doit être le même !</span>)}
              <div className="flex">
                <button className="w-full px-6 py-2 mt-4 text-white bg-primary rounded-lg hover:bg-secondary">Créer un compte</button>
              </div>
              {showFailureMessage &&(<span className="text-xs text-red-400">Oups!! une erreur est survenue veuillez réessayer plus tard</span>)}
              <div className="mt-6 text-grey-dark">
                Vous avez déjà un compte?
                <Link href="/login" passHref>
                <a className="text-secondary hover:underline">
                Connexion
                </a></Link>
              </div>
            </div>
          </form>
        </div>
      </div>
  )
}