import {AppDispatch, AppGetState, RootState} from '..'
import * as types from './cart/constants'

// ? redux基本使用
export const toggleTodo = (key:string, status:string) => ({
    type: "DONE_TODO_LIST",
      payload: {
        key,
        status: status === "pending" ? "done" : "pending",
      },
  })

 
// ? 购物车例子

export interface ProductsType{
  id:number;
  title:string;
  price:number;
  inventory:number;
}

/**
 * 拿到异步数据，进行Store存储
 */

const receiveProducts = (products:ProductsType[]) => ({
  type: types.RECEIVE_PRODUCTS,
  products
})

/**
 * 
 *  异步获取数据
 */
export const getAllProducts = () => (dispatch:AppDispatch) => {
    const products =[
    {id: 1, title: "iPad 4 Mini", price: 500.01, inventory: 2},
    {id: 2, title: "H&M T-Shirt White", price: 10.99, inventory: 10},
    {id: 3, title: "Charli XCX - Sucker CD", price: 19.99, inventory: 5}
  ]
  dispatch(receiveProducts(products))
}

/**
 * 
 * 判断逻辑，添加购物车
 */
export const addToCart = (productId:number) => (dispatch:AppDispatch, getState:AppGetState) => {
  if (getState().product.byId[productId].inventory > 0) {
    dispatch(addToCartUnsafe(productId))
  }
}

/**
 *  添加购物车 同步action
 */
export const addToCartUnsafe = (productId:number) => ({
  type: types.ADD_TO_CART,
  productId
})

/** 
 * 
 * 拿到数据返回服务器端
 */
export const checkout = (products:ProductsType[]) => (dispatch:AppDispatch, getState:AppGetState) => {
    const { cart } = getState()
    dispatch({
      type: types.CHECKOUT_REQUEST
    })
    setTimeout(()=>{
      console.log("发送数据后端存储：", products);
      dispatch({
        type: types.CHECKOUT_SUCCESS,
        cart
      })

    },1000)
  }
  