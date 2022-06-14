import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteCart } from '../actions/cart.action';
import { addOrder } from '../actions/order.action';
import Dialogue from '../components/dialogue';
import Layout from '../components/Layout'
import { isEmpty } from '../utils/Utils';


export default function order() {
  useEffect(()=>{
    const token=localStorage.getItem('new').split('||')
  if(isEmpty(token[1])){
      router.push('/login')
  }
  })
  const dispatch = useDispatch();
  const cartitems = useSelector((state) => state.cartitems);
  const [showFailureMessage, setShowFailureMessage] = useState(false);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState({header:'',text:''});
  const handleClose = () => {
    setOpen(false);
  };
  const [errors, setErrors] = useState({});
  const disablePastDate = () => {
    const today = new Date();
    const date = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth()+1).padStart(2, "0");
    const year = today.getFullYear();
    const hours = String(today.getHours()).padStart(2, "0");
    const minutes = String(today.getMinutes()).padStart(2, "0");
    return year + "-" + month + "-" + date + "T" + hours + ":" + minutes;
  }
  const[data,setData]=useState({telephone:'',adresse:'',date:disablePastDate(),message:''})
    const handleValidation = () => {
      const {telephone,adresse}=data;
      let tempErrors = {};
      let isValid = true;
      if (telephone.length <= 0) {
        tempErrors["telephone"] = true;
        isValid = false;
      }
      if (adresse.length <= 0) {
        tempErrors["adresse"] = true;
        isValid = false;
      }
      if (isEmpty(cartitems)) {
        tempErrors["empty"] = true;
        isValid = false;
        setText({header:'Le panier est vide',text:'Veuillez ajouter quelques articles au panier si vous souhaitez commander'})
        setOpen(true);
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
        const values={
          client_id:client_id[1],address:data.adresse,phone_number:data.telephone,delivery_date:data.date,message:data.message
        }
        dispatch(addOrder(values)).then(()=>{
          setData({telephone:'',adresse:'',date:disablePastDate(),message:''})
          setText({header:'Done!!',text:'Commande envoyée avec succès'})
          setOpen(true)
          dispatch(deleteCart(localStorage.getItem('cart_id'))).then(()=>{
            localStorage.setItem('cart_id','')}
          )
        }).catch((err) => {console.log(err);setShowFailureMessage(true)});
      }
    };
  return (
    <Layout title="Order Now" subtitle="Free and Fast">
      <div className="container-wrapper flex h-full items-center justify-center py-7">
        <form onSubmit={handleSubmit} className="grid grid-cols-2 md:grid-cols-1 gap-5 border border-gray-300 shadow-lg p-6 rounded-md max-w-4xl w-full">
          <div className='grid grid-cols-1 gap-2'>
          <label className="flex flex-col text-left gap-1">
            <span>Téléphone</span>
                <input 
                  name='telephone'
                  className="bg-gray-200 rounded-md py-2 px-3 outline-none focus:ring-1 focus:ring-secondary focus:ring-opacity-50" 
                  type="text"
                  value={data.telephone}
                  onChange={handleChange}
                  placeholder="Enterez votre numéro de téléphone"/>
          </label>
          {errors?.telephone &&(<span className="text-xs text-red-400">Le numero ne peut pas être vide!</span>)}
          <label className="flex flex-col text-left gap-1">
            <span>Date &amp; heure</span>
                <input 
                  name='date'
                  className="bg-gray-200 rounded-md py-2 px-3 outline-none focus:ring-1 focus:ring-secondary focus:ring-opacity-50" 
                  type="datetime-local"
                  min={data.date}
                  value={data.date}
                  onChange={handleChange}
                  placeholder="enter your number"/>
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
          <label className="flex flex-col text-left gap-1">
            <span>Message</span>
            <textarea 
            name='message'
            className="bg-gray-200 rounded-md py-2 px-3 outline-none resize-none h-24 focus:ring-1 focus:ring-secondary focus:ring-opacity-50" 
            value={data.message}
            onChange={handleChange}
            placeholder='Entez votre message'/> 
          </label>
          <button className=" bg-primary hover:bg-secondary relative z-[999] text-white py-2 px-5 text-l rounded-md transition-all whitespace-nowrap max-w-[150px]">
            Commandez
          </button>
          {showFailureMessage &&(<span className="text-xs text-red-400">Oups!! une erreur est survenue veuillez réessayer plus tard</span>)}
          <Dialogue onClick={handleClose} open={open} header={text.header} text={text.text} />
          </div>
          <div className='grid grid-cols-1 gap-2 my-2 flex-1'>
            <div>
            <h2 className="text-secondary text-xl font-semibold">Cart</h2>
            <div className=' overflow-y-auto' style={{maxHeight: '50vh'}}>
              {!isEmpty(cartitems) && cartitems?.map((item) => (
                    <div key={item.id} style={{display:'flex',alignItems:'center',marginBottom:'5px'}}>
                      <img src={item.image} className='w-20'/><div className='flex-1 text-left'>
                      <p className='text-base font-bold text-primary ml-2'>{item.title}</p>
                      <p className='text-sm text-secondary ml-2'>{item.price}DH x {item.quantity}</p>
                        </div></div>))}
            </div></div>
          </div>
        </form>
      </div>
    </Layout>
  )
}
