import Head  from "next/head";
import Footer from "./Footer";
import Link from 'next/link'
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";
import { isEmpty } from "../../utils/Utils";
import Products from "../../components/Products";
import { useSelector } from "react-redux";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Cart from "./cart";
import CartDrawer from "./cartDrawer";

export default function Layout() {
  const cart = useSelector((state) => state.cart);
  const categories = useSelector((state) => state.categories);
  const data = useSelector((state) => state.menu);
  const [menu,setMenu]=useState()
  const [open, setOpen] = useState(false)
  const [parent1,setParent1]=useState(0)
  const [parent2,setParent2]=useState(0)
  const [active,setActive]=useState({parent:'',child:'',second:''})
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(()=>{
    setMenu(data)
  },[data])
  const changeCategorie=(id)=>{
    setMenu(data.filter(item=>item.category_id===id));
    setParent1(id)
    setActive({parent:id,child:'',second:''})
    setParent2("")
  }
  const changeChildCategorie=(id)=>{
    setMenu(data.filter(item=>item.category_id===id));
    setParent2(id)
    setActive({...active,child:id,second:''})
  }
  const FinalCategorie=(id)=>{
    setMenu(data.filter(item=>item.category_id===id));
    setActive({...active,second:id})
  };
  console.log(cart)
  return (
    <div className="relative max-w-screen h-screen w-full flex flex-col">
      <Head>
        <title>Cafe challenger</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="fixed inset-x-0 z-50 h-20 flex items-center justify-between my-2 bg-white">
        <div className="container-wrapper flex justify-between items-center">

          <Link href="/">
            <div className="flex items-center gap-1 cursor-pointer">
              <img className="w-[140px]" src="./images/logo.png" alt="logo" />
            </div>
          </Link>
    
          <nav className= "nav">
          <div className="grid grid-cols-8 lg:grid-cols-8 md:grid-cols-2 flex flex-wrap place-items-center justify-center">
                {!isEmpty(categories) && categories.filter(item=>item.level===0)?.map((categorie) => (
                  <div
                    key={categorie.id}
                    className={`cursor-pointer relative flex flex-col items-center ${active.parent==categorie.id? "bg-yellow-500" :"bg-white"} max-w-xs w-3/4 h-full rounded-md hover:bg-yellow-500 transition-all duration-300`}
                    onClick={()=>changeCategorie(categorie.id)}
                  >

                    <div className="h-10">
                      <img
                        className="w-full h-full object-contain rounded-md"
                        src={categorie.image}
                        alt="product-img"
                      />
                    </div>

                    <div className="flex-1 flex flex-col items-center px-4">
                      <h3 className={`text-sm text-center font-semibold ${active.parent==categorie.id? "text-white" :"text-primary"} hover:text-white`}>
                        {categorie.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
          </nav>
    
          <div className="flex gap-2">
              <div className="relative">
              <div className="header-icon hidden md:block" onClick={()=>setOpen(true)}>
                <ShoppingCartIcon/>
              </div>
              {
                !isEmpty(cart) && (
                  <div className="absolute -top-2 -right-2 text-center w-6 h-6 rounded-full bg-red-400 flex item-center justify-center hidden md:block">
                    <span className="text-white">{cart.length}</span>
                  </div>
                )
              }
            </div>
            <Link href="/" >
              <div className="relative">
                <div className="header-icon">
                  <CloseIcon/>
                </div>
              </div>
            </Link>
          </div>

        </div>
        <CartDrawer open={open} onClick={handleClose} cartitems={cart}/>
      </header>

      <main className="mt-[80px] md:relative z-40 flex-1">
        <div className="text-center flex flex-col h-full">
          <div className=" flex-1">
            <div className="grid grid-cols-12 py-3 justify-items-center">
              <div className="sm:col-span-12 col-span-9 grid grid-cols-12 w-full">
                  <div className="sm:hidden ml-3">
                    <div className="grid grid-cols-1 lg:grid-cols-1 md:grid-cols-1 flex flex-wrap gap-2 place-items-center justify-center">
                            {!isEmpty(categories) && categories.filter(item=>item.level>0 && item.parent==parent1)?.map((categorie) => (
                              <div key={categorie.key} onClick={()=>changeChildCategorie(categorie.id)} className={`cursor-pointer relative flex flex-col gap-2 items-center py-6 ${active.child==categorie.id? "bg-yellow-500" :"bg-white"} max-w-xs w-full h-full rounded-md drop-shadow-md hover:scale-105 transition-all duration-300`}>
                              <div className="flex-1 flex flex-col items-center px-5">
                                <h3 className={`text-l font-semibold ${active.child==categorie.id? "text-white" :"text-primary"}`}>{categorie.title}</h3>
                              </div>
                            </div>
                            ))}
                    </div>
                  </div>
                  <div className="sm:col-span-12 col-span-11">
                      <div className="max-h-[80vh] text-center flex flex-col h-full">
                        <div>
                        </div>
                        <div className="sm:hidden grid grid-cols-3 mx-8 lg:grid-cols-4 md:grid-cols-2 flex flex-wrap gap-5 place-items-center justify-center">
                          {!isEmpty(categories) && categories.filter(item=>item.level==2 && item.parent==parent2)?.map((categorie) => (
                            <div key={categorie.key} onClick={()=>FinalCategorie(categorie.id)} className={`cursor-pointer relative flex flex-col gap-2 items-center py-6 ${active.second==categorie.id? "bg-yellow-500" :"bg-white"} max-w-xs w-full h-full rounded-md drop-shadow-md hover:scale-105 transition-all duration-300`}>
                            <div className="flex-1 flex flex-col items-center px-5">
                              <h3 className={`text-l font-semibold ${active.second==categorie.id? "text-white" :"text-primary"}`}>{categorie.title}</h3>
                            </div>
                          </div>
                          ))}
                        </div>
                        <div className="flex flex-col justify-center hidden sm:block">
                        <select name="cars" id="cars" onChange={(e)=>changeCategorie(parseInt(e.target.value))} className="my-2 relative w-8/12 cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                          <option value="" selected disabled hidden>Catégories</option>
                          {!isEmpty(categories) && categories.filter(item=>item.level===0)?.map((categorie) => (
                          <option key={categorie.id} value={categorie.id}>{categorie.title}</option>
                          ))}
                        </select>
                        { !isEmpty(categories) && !isEmpty(categories.filter(item=>item.level>0 && item.parent==parent1)) && <select name="cars" id="cars" onChange={(e)=>changeChildCategorie(parseInt(e.target.value))} className="my-2 relative w-8/12 cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                          <option value="" selected disabled hidden>Catégories</option>
                          {!isEmpty(categories) && categories.filter(item=>item.level>0 && item.parent==parent1)?.map((categorie) => (
                          <option key={categorie.id} value={categorie.id}>{categorie.title}</option>
                          ))}
                        </select>}
                        { !isEmpty(categories) && !isEmpty(categories.filter(item=>item.level==2 && item.parent==parent2)) && <select name="cars" id="cars" onChange={(e)=>FinalCategorie(parseInt(e.target.value))} className="my-2 relative w-8/12 cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                          <option value="" selected disabled hidden>Catégories</option>
                          {!isEmpty(categories) && categories.filter(item=>item.level==2 && item.parent==parent2)?.map((categorie) => (
                          <option key={categorie.id} value={categorie.id}>{categorie.title}</option>
                          ))}
                        </select>}
                        </div>
                        <div className="max-h-fit sm:my-0 my-8 overflow-y-auto flex-1">
                          <Products items={menu} categorie={active}/>
                        </div>
                      </div>
                  </div>
                </div>
                <div className="sm:hidden col-span-3">
                  <Cart cartitems={cart}/>
                </div>
            </div>
          </div>
        </div>
      </main>

      <Footer/>
    </div>
  )
}
