import { useEffect, useState } from "react";
import Link from 'next/link'
import { isEmpty } from "../../utils/Utils";
import CartListItem from "./CartListItem";

export default function Cart({cartitems,cart}) {
    const [totalPrice, setTotalPrice] = useState(0);
    useEffect(()=>{
      setTotalPrice(!isEmpty(cart[0]) && Number(cart[0].total));
      },[cart])
  return (
    <><h3 className="text-primary text-2xl font-semibold uppercase">Cart</h3>
    <div className="grid grid-rows-4 grid-flow-col gap-4">
    <div style={{maxHeight: '59vh'}} className="row-span-3 w-full overflow-y-auto flex-1">
      {isEmpty(cartitems) && <div className="h-full flex justify-center items-center">
        <h2 className="font-black text-4xl text-gray-300 drop-shadow-sm">Your cart is empty</h2>
      </div>}
    <ul className="w-full ring-1 ring-gray-200 ring-opacity-20 rounded-lg max-w-3xl lg:shadow drop-shadow-sm overflow-hidden lg:order-2">
      { 
         !isEmpty(cartitems) && cartitems?.map((item,id) => (
            <CartListItem key={id} item={item}/>
          ))   
      }
    </ul>
      </div>
      <div className="xl:right-5 bg-white ring-1 ring-gray-200 ring-opacity-20 rounded-lg flex flex-col justify-center items-center space-y-2 py-2 w-full">
        <h3 className="text-primary font-black text-xl">Total: </h3>
        <p className="text-secondary font-bold text-2xl">{totalPrice ? totalPrice : 0}DH</p>
        <Link href='/order' passHref>
          <a>
        <button 
          className="bg-primary hover:bg-secondary relative z-[999] text-white py-1 px-3 text-base rounded-md transition-all whitespace-nowrap max-w-[150px]">
          Checkout
        </button></a></Link>
      </div>
    </div></>
  )
}