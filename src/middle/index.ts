import {Dispatch, Middleware} from "redux"
type Action = {
    type: string,
    payload?: any
  };
export const middle: Middleware<{}, any, Dispatch<Action>> = store =>next =>action =>{
  
    console.log("发送后:",action,store.getState())
    return next(action)
}
