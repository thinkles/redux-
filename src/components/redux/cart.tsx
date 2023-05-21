import { useSelector } from "react-redux";
import { RootState } from "../..";
import { useMemo } from "react";
import { getVisibleProducts } from "../../store/cart/product";
import { getCartProducts } from "../../store/cart";
import { addToCart, checkout } from "../../store/todo/action";

interface CartProps {}

const Cart = (props: CartProps) => {
  const products = useMemo(() => {
    const product = useSelector((state: RootState) => state.product);
    return getVisibleProducts(product);
  }, []);
  const state = useSelector((state: RootState) => state);

  const cartProduct = useMemo(() => {
    return getCartProducts(state);
  }, []);

  return (
    <>
      <h3>Shopping Cart</h3>
      <hr />
      <div>
        <h4>Products</h4>
        {products.map((it) => (
          <div key={it.id}>
            <p>{it.title}</p>
            <button onClick={() => addToCart(it.id)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <hr />
      <div>
        <h4>Your Cart</h4>
        {cartProduct.map((it) => (
          <div key={it.id}>
            {it.title} - &#36;{it.price}
            {it.quantity ? ` x ${it.quantity}` : null}
          </div>
        ))}
        {/* <button onClick={() => checkout(products)}></button> */}
      </div>
    </>
  );
};

export default Cart;
