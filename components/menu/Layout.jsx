import Head  from "next/head";
import Footer from "./Footer";
import Link from 'next/link'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";
import { isEmpty } from "../../utils/Utils";
import Products from "../../components/Products";
import { useSelector } from "react-redux";
import CartListItem from "./CartListItem";
import Cart from "./cart";

export default function Layout() {
  const [menuActive, setMenuActive] = useState(false);
  const cartitems = useSelector((state) => state.cartitems);
  const cart = useSelector((state) => state.cart);
  const categories = useSelector((state) => state.categories);
  const data = useSelector((state) => state.menu);
  const [menu,setMenu]=useState()
  const [parent1,setParent1]=useState(0)
  const [parent2,setParent2]=useState(0)
  const [active,setActive]=useState({parent:'',child:'',second:''})
  
  useEffect(()=>{
    setMenu(data)
  },[data])
  const [categorieTitle,setCategorieTitle]=useState('toutes les catégories')
  const changeCategorie=(title,id)=>{
    setCategorieTitle(title)
    setMenu(data.filter(item=>item.category_id===id));
    setParent1(id)
    setActive({parent:id,child:'',second:''})
    setParent2("")
  }
  const changeChildCategorie=(title,id)=>{
    setCategorieTitle(title)
    setMenu(data.filter(item=>item.category_id===id));
    setParent2(id)
    setActive({...active,child:id,second:''})
  }
  const FinalCategorie=(title,id)=>{
    setCategorieTitle(title)
    setMenu(data.filter(item=>item.category_id===id));
    setActive({...active,second:id})
  }
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
    
          <nav className={menuActive ? "nav nav_active" :"nav"}>
          <div className="grid grid-cols-8 lg:grid-cols-8 md:grid-cols-2 flex flex-wrap place-items-center justify-center">
                {!isEmpty(categories) && categories.filter(item=>item.level===0)?.map((categorie) => (
                  <div
                    key={categorie.id}
                    className={`cursor-pointer relative flex flex-col items-center ${active.parent==categorie.id? "bg-yellow-500" :"bg-white"} max-w-xs w-3/4 h-full rounded-md hover:bg-yellow-500 transition-all duration-300`}
                    onClick={()=>changeCategorie(categorie.title,categorie.id)}
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
            <div 
              className="header-icon hidden md:block"
              onClick={() => setMenuActive(!menuActive)}>
              { menuActive ? <ArrowForwardRoundedIcon /> : <MenuIcon/> }
            </div>
            {/* <div className="header-icon">
              <SearchIcon />
            </div>
            <div className="header-icon">
              <FavoriteIcon />
            </div> */}
            <Link href="/" >
              <div className="relative">
                <div className="header-icon">
                  <CloseIcon/>
                </div>
              </div>
            </Link>
          </div>

        </div>
      </header>

      <main className="mt-[80px] md:relative z-40 flex-1">
        <div className="text-center flex flex-col h-full">
          <div className=" flex-1">
            <div className="grid grid-cols-12 py-3 justify-items-center">
              <div className="col-span-9 grid grid-cols-12 w-full">
              <div className="ml-3">
              <div className="grid grid-cols-1 lg:grid-cols-1 md:grid-cols-1 flex flex-wrap gap-2 place-items-center justify-center">
                      {!isEmpty(categories) && categories.filter(item=>item.level>0 && item.parent==parent1)?.map((categorie) => (
                        <div key={categorie.key} onClick={()=>changeChildCategorie(categorie.title,categorie.id)} className={`cursor-pointer relative flex flex-col gap-2 items-center py-6 ${active.child==categorie.id? "bg-yellow-500" :"bg-white"} max-w-xs w-full h-full rounded-md drop-shadow-md hover:scale-105 transition-all duration-300`}>
                        <div className="flex-1 flex flex-col items-center px-5">
                          <h3 className={`text-l font-semibold ${active.child==categorie.id? "text-white" :"text-primary"}`}>{categorie.title}</h3>
                        </div>
                      </div>
                      ))}
                    </div>
              </div>
              <div className="col-span-11">
                  <div className="text-center flex flex-col h-full">
                    <div>
                    </div>
                    <div className="grid grid-cols-3 mx-8 lg:grid-cols-4 md:grid-cols-2 flex flex-wrap gap-5 place-items-center justify-center">
                      {!isEmpty(categories) && categories.filter(item=>item.level==2 && item.parent==parent2)?.map((categorie) => (
                        <div key={categorie.key} onClick={()=>FinalCategorie(categorie.title,categorie.id)} className={`cursor-pointer relative flex flex-col gap-2 items-center py-6 ${active.second==categorie.id? "bg-yellow-500" :"bg-white"} max-w-xs w-full h-full rounded-md drop-shadow-md hover:scale-105 transition-all duration-300`}>
                        <div className="flex-1 flex flex-col items-center px-5">
                          <h3 className={`text-l font-semibold ${active.second==categorie.id? "text-white" :"text-primary"}`}>{categorie.title}</h3>
                        </div>
                      </div>
                      ))}
                    </div>
                    <div style={{maxHeight: '69vh'}} className="my-8 overflow-y-auto flex-1">
                      <Products items={menu} categorie={active}/>
                    </div>
                  </div>
                  </div>
                </div>
                <div className="col-span-3">
                  <Cart cartitems={cartitems} cart={cart}/>
                </div>
            </div>
          </div>
        </div>
      </main>

      <Footer/>
    </div>
  )
}
