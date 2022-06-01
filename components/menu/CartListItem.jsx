import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { deleteCartItems, editCartItems, getCartItems } from '../../actions/cartItems.action';

export default function CartListItem({item}) {
  const cart_id=localStorage.getItem('cart_id')
  const dispatch = useDispatch();

  const adjustQuantityHandler = (value) => {
    if(item.quantity==1 && value==-1){
      dispatch(deleteCartItems(item.id))
    }else{
    const data={
      id:item.id,cart_id:item.cart_id,product_id:item.product_id,title:item.title,image:item.image,price:item.price,quantity:item.quantity+value,total:item.price*(item.quantity+value)
    }
    dispatch(editCartItems(data)).then(()=>{
      dispatch(getCartItems(cart_id))
    })}
  }
  return (
    <li className="flex sm:flex-col items-center p-5 border-b border-gray-300 border-opacity-30 gap-3">
      <div className="sm:self-end ring-1 ring-gray-300 ring-opacity-30 shadow-md drop-shadow-md rounded-full p-1 text-gray-400 hover:bg-gray-200 hover:text-red-500 hover:scale-105 transition-all">
        <CloseIcon 
          fontSize="medium" 
          onClick={() => dispatch(deleteCartItems(item.id))} />
      </div>
      <div className="max-w-[150px] min-w-[100px] h-30 rounded-lg overflow-hidden ">
        <img className="object-contain h-full" src={item.image} alt="" />
      </div>
      <p className="text-base font-bold text-primary flex-1 text-left md:text-center">{item.title}</p>
      <div className="flex sm:flex-col gap-3 items-center">

        <div className="flex gap-3 items-center">
          <div 
            onClick={() => adjustQuantityHandler(1)}
            className="menu-counter-btn">
            <AddIcon />
          </div>
          <span className="text-xl text-bold">{item.quantity}</span>
          <div 
            onClick={() => adjustQuantityHandler(-1)}
            className="menu-counter-btn">
            <RemoveIcon />
          </div>
        </div>
      </div>
      
    </li>
  )
}
