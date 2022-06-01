import Link from 'next/link'
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { isEmpty } from "../utils/Utils";
import { useSelector } from 'react-redux';
export default function Header() {
  const [token,setToken]=useState('')
  useEffect(()=>{
    setToken(localStorage.getItem('new').split("-"))
  },[])
  const [menuActive, setMenuActive] = useState(false);
  const cart = useSelector((state) => state.cartitems);

  return (
    <header className="fixed inset-x-0 z-50 h-20 flex items-center justify-between shadow-md bg-white">
      <div className="container-wrapper flex justify-between items-center">

        <Link href="/">
          <div className="flex items-center gap-1 cursor-pointer">
            <img className="w-[140px]" src="./images/logo.png" alt="logo" />
          </div>
        </Link>
  
        <nav className={menuActive ? "nav nav_active" :"nav"}>
          <Link href='/'>
            <a className="nav-link">Acceuil</a>
          </Link>
          <Link href='/about'>
            <a className="nav-link">A propos</a>
          </Link>
          <Link href='/menu'>
            <a className="nav-link">Menu</a>
          </Link>
          <Link href='/review'>
            <a className="nav-link">Commentaires</a>
          </Link>
          <Link href='/order'>
            <a className="nav-link">Commande</a>
          </Link>
          {token && token[1] && (<Link href='/profile'>
            <a className="nav-link">Profile</a>
          </Link>)}
          
        </nav>
  
        <div className="flex gap-2">
          <div 
            className="header-icon hidden md:block"
            onClick={() => setMenuActive(!menuActive)}>
            { menuActive ? <CloseIcon /> : <MenuIcon/> }
          </div>
          {/* <div className="header-icon">
            <SearchIcon />
          </div>
          <div className="header-icon">
            <FavoriteIcon />
          </div> */}
          <Link href="/cart" >
            <div className="relative">
              <div className="header-icon">
                <ShoppingCartIcon/>
              </div>
              {
                !isEmpty(cart) && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-400 flex item-center justify-center">
                    <span className="text-white">{cart.length}</span>
                  </div>
                )
              }
            </div>
          </Link>
        </div>

      </div>
    </header>
  )
}
