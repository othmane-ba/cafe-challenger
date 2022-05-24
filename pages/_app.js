// import 'tailwindcss/tailwind.css'
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { getCarousel } from '../actions/carousel.action';
import { getCategorie } from '../actions/categorie.action';
import { getMenu } from '../actions/menu.action';
import { getReview } from '../actions/reviews.action';
import { store } from '../app/store';
import Loading from '../components/Loading';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    router.events.on("routeChangeStart", () => setLoading(true));
    router.events.on("routeChangeComplete", () => setLoading(false));
  }, [router]);

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
