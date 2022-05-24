export const setTotalPrice = (totalPrice, payload) => {
  const res = +totalPrice + +payload.price;
  return res.toFixed(2)
};