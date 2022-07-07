import ReactStars from "react-rating-stars-component";
import {MajCartItems} from "../actions/cartItems.action"


export default function ProductsItem({item}) {
  const token=localStorage.getItem('token')
  const addToCartHandler = async() => {
    const data={
      product_id:item.id,
      token: token,
      price:item.price,
      quantity:1
    }
    await MajCartItems('add',data)
  }

  return (
    <div className=" relative flex flex-col gap-2 items-center py-6 bg-white max-w-xs w-full h-full rounded-md shadow-lg hover:scale-105 transition-all duration-300">
      <div className="px-4 ">
        <div className="h-36">
          <img className="w-full h-full object-contain rounded-md" src={item.image} alt="product-img"/>
        </div>

        {/* <div className="header-icon absolute top-6 right-6">
          <FavoriteIcon />
        </div> */}
      </div>
      <div className="flex-1 flex flex-col items-center">
        <h3 className="text-l font-semibold text-primary">{item.title}</h3>
        <ReactStars
          count={5}
          value={item.rating}
          size={25}
          activeColor="#ffd700"
        />
      </div>
      <div className="flex items-center gap-2">
        <p className="text-xl text-secondary font-semibold">{item.price}DH</p>
        <div onClick={() => addToCartHandler()} >
            <button 
      className="bg-primary hover:bg-secondary relative z-[999] text-white py-2 px-5 text-l rounded-md transition-all whitespace-nowrap max-w-[150px]">
      Add To Cart
    </button>
        </div>
      </div>
    </div>
  )
}
