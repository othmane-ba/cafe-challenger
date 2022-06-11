// import 'tailwindcss/tailwind.css'
import { LocalSee } from '@mui/icons-material';
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { getCarousel } from '../actions/carousel.action';
import { getCart } from '../actions/cart.action';
import { getCartItems } from '../actions/cartItems.action';
import { getCategorie } from '../actions/categorie.action';
import { findClient, getClient } from '../actions/client.action';
import { getMenu } from '../actions/menu.action';
import { getOrder } from '../actions/order.action';
import { getReview } from '../actions/reviews.action';
import { store } from '../app/store';
import Loading from '../components/Loading';
import '../styles/globals.css';
import { isEmpty } from '../utils/Utils';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const getcart = async () => {
    axios.get(`https://cafe-challenger-backend.herokuapp.com/cart/session_id/${localStorage.getItem('new')}`).then(res =>{
        if(!res.data.length==0){
          localStorage.setItem('cart_id',res.data[0].id)
          store.dispatch(getCart(localStorage.getItem('cart_id'))).then(()=>{
            store.dispatch(getCartItems(localStorage.getItem('cart_id')))
          })
        }else{
          var token={session_id:localStorage.getItem('new')};
          axios.post('https://cafe-challenger-backend.herokuapp.com/cart/',token).then((res)=>{
            axios.get(`https://cafe-challenger-backend.herokuapp.com/cart/session_id/${res.data.session_id}`).then((res)=>{
              localStorage.setItem('cart_id',res.data[0].id)
            })
            store.dispatch(getCart(localStorage.getItem('cart_id'))).then(()=>{
              store.dispatch(getCartItems(localStorage.getItem('cart_id')))
            })
          })
        }
      })
  };
  useEffect(() => {
    router.events.on("routeChangeStart", () => setLoading(true));
    router.events.on("routeChangeComplete", () => setLoading(false));
    const token=!isEmpty(localStorage.getItem('new')) && localStorage.getItem('new').split('||')
    if(!isEmpty(token[0])){
      getcart()
      if(!isEmpty(token[1])){
        store.dispatch(findClient(token[1]));
        store.dispatch(getOrder());
      }
    }else{
      console.log('token not found');
      axios.get('https://cafe-challenger-backend.herokuapp.com/session/new').then(res =>{
        localStorage.setItem('new',res.data)
        getcart()
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
