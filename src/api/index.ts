import {request} from "../utils/api"

export const appList = (params:any):Promise<any> => request.get("/app");
