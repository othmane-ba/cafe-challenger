import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import {adjustQuantity, removeFromCart } from '../features/cartSlice';

export default function CartListItem({item}) {
  const dispatch = useDispatch();

  const adjustQuantityHandler = (id, value, price) => {
    dispatch(adjustQuantity({id, value, price}))
  }

  const removeFromCartHandler = (id, value, price) => {
    dispatch(removeFromCart({id, value, price}))
  }

  let productTotalPrice = item.price * item.quantity;

  return (
    <li className="flex sm:flex-col items-center p-5 border-b border-gray-300 border-opacity-30 gap-3">
      <div className="sm:self-end ring-1 ring-gray-300 ring-opacity-30 shadow-md drop-shadow-md rounded-full p-2 text-gray-400 hover:bg-gray-200 hover:text-red-500 hover:scale-105 transition-all">
        <CloseIcon 
          fontSize="medium" 
          onClick={() => removeFromCartHandler(item.id, item.quantity, -productTotalPrice)} />
      </div>
      <div className="max-w-[200px] min-w-[100px] h-40 rounded-lg overflow-hidden ">
        <img className="object-contain h-full" src={item.image} alt="" />
      </div>
      <p className="text-xl font-bold text-primary flex-1 text-left md:text-center">{item.title}</p>
      <div className="flex sm:flex-col gap-5 items-center">

        <div className="flex gap-3 items-center">
          <div 
            onClick={() => adjustQuantityHandler(item.id, 1, item.price)}
            className="counter-btn">
            <AddIcon />
          </div>
          <span className="text-2xl text-bold">{item.quantity}</span>
          <div 
            onClick={() => adjustQuantityHandler(item.id, -1, -item.price)}
            className="counter-btn">
            <RemoveIcon />
          </div>
        </div>

        <div className="text-secondary font-semibold text-xl drop-shadow-md">
          ${productTotalPrice.toFixed(2)}
        </div>
      </div>
      
    </li>
  )
}
