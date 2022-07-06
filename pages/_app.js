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
  const [data, setData] = useState('');
  const getcart = async () => {
    axios.get(`http://localhost:8080/cart/session_id/${localStorage.getItem('new')}`).then(res =>{
        if(!res.data.length==0){
          localStorage.setItem('cart_id',res.data[0].id)
          store.dispatch(getCart(localStorage.getItem('cart_id'))).then(()=>{
            store.dispatch(getCartItems(localStorage.getItem('cart_id')))
          })
        }else{
          var token={session_id:localStorage.getItem('new')};
          axios.post('http://localhost:8080/cart/',token).then((res)=>{
            axios.get(`http://localhost:8080/cart/session_id/${res.data.session_id}`).then((res)=>{
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
      let data={}
      if(!isEmpty(token[1])){
        axios.get(`http://localhost:8080/get-data?token=${token[0]}`).then(res =>{
        setData(res.data);
      }
      )
        store.dispatch(findClient(token[1]));
        store.dispatch(getOrder());
      }else{
        axios.get(`http://localhost:8080/get-data?token=${token[0]}`).then(res =>{
          setData(res.data);
      }
      )
      }
    }else{
      axios.get('http://localhost:8080/get-data').then(res =>{
        localStorage.setItem('new',res.data.token)
        getcart()
        setData(res.data);
      }
      )
    }
  }, []);
  !isEmpty(data) && (
      store.dispatch(getCarousel(data.carousel)),
      store.dispatch(getCategorie(data.categories)),
      store.dispatch(getMenu(data.products)),
      store.dispatch(getReview(data.reviews))
      )

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
