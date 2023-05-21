import store from '..'
import {AppDispatch, AppGetState, RootState} from '../..'
import * as types from './constants'

export const toggleTodo = (key:string, status:string) => ({
    type: "DONE_TODO_LIST",
      payload: {
        key,
        status: status === "pending" ? "done" : "pending",
      },
  })

// 购物车

export interface ProductsType{
  id:number;
  title:string;
  price:number;
  inventory:number;
}

const receiveProducts = (products:ProductsType[]) => ({
  type: types.RECEIVE_PRODUCTS,
  products
})

export const getAllProducts = () => (dispatch:AppDispatch) => {
  // 获取 首批
  const products =[
    {id: 1, title: "iPad 4 Mini", price: 500.01, inventory: 2},
    {id: 2, title: "H&M T-Shirt White", price: 10.99, inventory: 10},
    {id: 3, title: "Charli XCX - Sucker CD", price: 19.99, inventory: 5}
  ]
  dispatch(receiveProducts(products))
}

export const addToCartUnsafe = (productId:number) => ({
    type: types.ADD_TO_CART,
    productId
  })

  export const addToCart = (productId:number) => (dispatch:AppDispatch, getState:AppGetState) => {
    if (getState().product.byId[productId].inventory > 0) {
      dispatch(addToCartUnsafe(productId))
    }
  }

  export const checkout = (products:RootState["product"]) => (dispatch:AppDispatch, getState:AppGetState) => {
    const { cart } = getState()
  
    dispatch({
      type: types.CHECKOUT_REQUEST
    })
    /* 
     * 拿到数据像后端返回 ，然后 dispatch
     */
    dispatch({
      type: types.CHECKOUT_SUCCESS,
      cart
    })
  
  }
  