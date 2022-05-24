import { useSelector } from "react-redux";
import CartListItem from "./CartListItem";
import MyButton from "./MyButton";


export default function CartList({cart}) {
  const totalPrice = useSelector(state => state.cart.totalPrice);

  if(cart.length < 1) {
    return (
      <div className="h-full flex justify-center items-center">
        <h2 className="font-black text-4xl text-gray-300 drop-shadow-sm">Your cart is empty</h2>
      </div>
    )
  }

  return (
    <div className="container-wrapper flex gap-5 py-8 relative lg:flex-col">
        <ul className="w-full ring-1 ring-gray-200 ring-opacity-20 rounded-lg max-w-3xl shadow-xl lg:shadow drop-shadow-sm overflow-hidden lg:order-2">
          { 
              cart?.map(item => (
                <CartListItem key={item.id} item={item}/>
              ))   
          }
        </ul>
        <div className="lg:static fixed top-[18%] right-[15%] xl:right-5 bg-white ring-1 ring-gray-200 ring-opacity-20 rounded-lg  shadow-xl drop-shadow-sm lg:shadow max-w-[250px] xl:max-w-[200px] lg:max-w-full w-full h-[200px] flex flex-col justify-center items-center space-y-3">
          <h3 className="text-primary font-black text-2xl">Total: </h3>
          <p className="text-secondary font-bold text-3xl">${totalPrice}</p>
          <MyButton text="Checkout"/>
        </div>
    </div>
  )
}
