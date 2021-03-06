import Link from 'next/link'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import LoginIcon from '@mui/icons-material/Login';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { isEmpty } from "../utils/Utils";
import { useSelector } from 'react-redux';
import Header_dropdown from './header_dropdown';
import { Button } from '@mui/material';
export default function Header() {
  const [token,setToken]=useState('')
  useEffect(()=>{
    localStorage.getItem('token') && setToken(localStorage.getItem('token').split("x336m"))
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
          {token && token[1] ?<Header_dropdown/>: <div className='gap-1 flex'>
            <Link href='/login' passHref><a>
          <Button variant="outlined" style={{color:'#84cc16',border: '1px solid #84cc16'}} startIcon={<LoginIcon />}>Login</Button></a></Link>
          <Link href='/register' passHref><a>
          <Button variant="outlined" style={{color:'#84cc16',border: '1px solid #84cc16'}} startIcon={<PersonAddAltIcon />}>Sign up</Button></a></Link></div>
          }
        </nav>
  
        <div className="flex gap-2">
          <div 
            className="header-icon hidden md:block"
            onClick={() => setMenuActive(!menuActive)}>
            { menuActive ? <CloseIcon /> : <MenuIcon/> }
          </div>
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
