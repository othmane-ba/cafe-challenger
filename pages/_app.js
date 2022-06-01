// import 'tailwindcss/tailwind.css'
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { getCarousel } from '../actions/carousel.action';
import { getCart } from '../actions/cart.action';
import { getCartItems } from '../actions/cartItems.action';
import { getCategorie } from '../actions/categorie.action';
import { getMenu } from '../actions/menu.action';
import { getReview } from '../actions/reviews.action';
import { store } from '../app/store';
import Loading from '../components/Loading';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [cart_id, setcart_id] = useState();

  useEffect(() => {
    router.events.on("routeChangeStart", () => setLoading(true));
    router.events.on("routeChangeComplete", () => setLoading(false));
    if(localStorage.getItem('new')){
      axios.get(`http://192.168.100.65:8080/cart/session_id/${localStorage.getItem('new')}`).then(res =>{
        if(!res.data.length==0){
          localStorage.setItem('cart_id',res.data[0].id)
          store.dispatch(getCart(localStorage.getItem('cart_id'))).then(()=>{
            store.dispatch(getCartItems(localStorage.getItem('cart_id')))
          })
          setcart_id(localStorage.getItem('cart_id'))
        }else{
          var cart={session_id:localStorage.getItem('new')};
          axios.post('http://192.168.100.65:8080/cart/',cart).then(res=>{
            localStorage.setItem('cart_id',res.data[0].id)
            store.dispatch(getCart(localStorage.getItem('cart_id'))).then(()=>{
              store.dispatch(getCartItems(localStorage.getItem('cart_id')))
            })
            setcart_id(localStorage.getItem('cart_id'))
          })
        }
      })
    }else{
      console.log('token not found');
      axios.get('http://192.168.100.65:8080/session/new').then(res =>{
        localStorage.setItem('new',res.data)
      }
      )
    }
  }, []);
  store.dispatch(getCategorie());
  store.dispatch(getCarousel());
  store.dispatch(getMenu());
  store.dispatch(getReview());

  return (
    <Provider store={store}>
      {
        loading ? (
          <Loading/>
        ) : (
          <Component {...pageProps} />
        )
      }
    </Provider>
  )
}

export default MyApp
