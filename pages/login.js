import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClient } from "../actions/client.action";

export default function Login(){
  const router = useRouter()
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  //   Form validation state
  const [errors, setErrors] = useState({});
  // Setting success or failure messages states
  const [showFailureMessage, setShowFailureMessage] = useState(false);
  const handleValidation = () => {
    const {email,password}=values;
    let tempErrors = {};
    let isValid = true;
    if (email.length <= 0) {
      tempErrors["email"] = true;
      isValid = false;
    }
    if (password.length <= 0) {
      tempErrors["password"] = true;
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
        email:values.email,password:values.password
      }
      dispatch(getClient(data)).then(()=>{
        router.push('/')
      })
      .catch((err) => {console.log(err);setShowFailureMessage(true)});
    }
  };
  return (
    <section className="h-screen">
        <div className="px-6 h-full text-gray-800">
          <div className="flex xl:justify-center justify-center items-center flex-wrap h-full g-2">
              <div className="grow-0 shrink-1 md:shrink-0 basis-auto sm:w-full w-7/12 mb-12 md:mb-0">
            <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
              <Link href='/'>
              <img src="./images/logo.png" alt="Sample image" className="w-4/12 cursor-pointer" /></Link>
              <img src="./images/login.png" className="w-full" alt="Sample image" />
            </div></div>
            <div className="xl:w-12/12 lg:w-12/12 md:w-12/12 mb-12 md:mb-0">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-row items-center justify-center">
                  <p className="text-4xl font-bold mb-0 mr-4 text-primary">Connexion</p>
                </div>
                <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                  {/* <p className="text-center font-semibold mx-4 mb-0">Or</p> */}
                </div>
                {/* Email input */}
                <div className="mb-6">
                  <input type="text" value={values.email} onChange={handleChange} onBlur={handleValidation} name='email' className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleFormControlInput1" placeholder="Email" />
                </div>
                {errors?.email &&(<span className="text-xs text-red-400">L'email' ne peut pas être vide!</span>)}
                {/* Password input */}
                <div className="mb-6">
                  <input type="password" value={values.password} onChange={handleChange} onBlur={handleValidation} name='password' className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleFormControlInput2" placeholder="Mot de pass" />
                </div>
                {errors?.password &&(<span className="text-xs text-red-400">Le mot de pass ne peut pas être vide!</span>)}
                <div className="flex justify-between items-center mb-6">
                  <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" id="exampleCheck2" />
                    <label className="form-check-label inline-block text-gray-800" htmlFor="exampleCheck2">Remember me</label>
                  </div>
                  {/* <a href="#!" className="text-gray-800">Forgot password?</a> */}
                </div>
                <div className="text-center lg:text-left">
                  <button onClick={handleSubmit} type="button" className="bg-primary hover:bg-secondary relative z-[999] text-white inline-block px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-secondary focus:shadow-lg focus:outline-none focus:ring-0 active:bg-secondary active:shadow-lg transition duration-150 ease-in-out">
                  Connexion
                  </button>
                  {showFailureMessage &&(<span className="text-xs text-red-400">E-mail ou mot de passe incorrect, veuillez réessayer</span>)}
                  <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                    Vous n'avez pas de compte ?
                    <Link href="/register" passHref>
                    <a className="text-secondary hover:text-primary focus:text-primary transition duration-200 ease-in-out">S'inscrire</a>
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
  )
}