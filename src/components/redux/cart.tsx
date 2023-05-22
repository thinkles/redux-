import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../..";
import { useCallback, useEffect, useMemo } from "react";
import { getVisibleProducts } from "../../store/cart/product";
import { getCartProducts, getTotal } from "../../store/cart";
import { addToCart, checkout, getAllProducts } from "../../store/action";

interface CartProps {}

const Cart = (props: CartProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const product = useSelector((state: RootState) => state.product);
  const state = useSelector((state: RootState) => state);

  const products = useMemo(() => {
    const s = getVisibleProducts(product);
    return s;
  }, [product]);

  const cartProduct = useMemo(() => {
    return getCartProducts(state);
  }, [state]);

  /**
   * 获取产品数据
   */
  const getCarProduct = useCallback(() => {
    dispatch(getAllProducts());
  }, []);

  useEffect(() => {
    getCarProduct();
  }, []);

  return (
    <>
      <h3>Shopping Cart</h3>
      <hr />
      <div>
        <h4>Products</h4>
        {products.map((it) => (
          <div key={it.id}>
            <p>{`${it.title}-${it.price} x ${it.inventory}`}</p>
            <button
              disabled={it.inventory === 0}
              onClick={() => dispatch(addToCart(it.id))}
            >
              {it.inventory > 0 ? "Add to cart" : "Sold Out"}
            </button>
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
        <p>please add some products</p>
        <p>Total: &#36;{getTotal(state)}</p>

        <button onClick={() => dispatch(checkout(products))}>结算</button>
      </div>
    </>
  );
};

export default Cart;
