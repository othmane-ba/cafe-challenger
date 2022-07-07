// import 'tailwindcss/tailwind.css'
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { store } from "../app/store";
import { Provider } from "react-redux";
import { getCarousel } from "../actions/carousel.action";
import { getCart } from "../actions/cart.action";
import { getCategorie } from "../actions/categorie.action";
import { getMenu } from "../actions/menu.action";
import { getReview } from "../actions/reviews.action";
import { getClient } from "../actions/client.action";
import { getOrder } from "../actions/order.action";
import Loading from "../components/Loading";
import "../styles/globals.css";
import { Api_get } from "./api_calls";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(async () => {
    router.events.on("routeChangeStart", () => setLoading(true));
    router.events.on("routeChangeComplete", () => setLoading(false));
    const data = await Api_get("get-all-data");
    localStorage.setItem("token", data.token);
    const result = data.output.dl;
    store.dispatch(getCarousel(result.carousel));
    store.dispatch(getCategorie(result.categories));
    store.dispatch(getMenu(result.products));
    store.dispatch(getCart(result.cart));
    store.dispatch(getReview(result.reviews));
    store.dispatch(getClient(result.client));
    store.dispatch(getOrder(result.orders));
  }, []);
  return (
    <Provider store={store}>
      {loading ? <Loading /> : <Component {...pageProps} />}
    </Provider>
  );
}

export default MyApp;
