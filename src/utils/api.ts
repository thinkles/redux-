import {PostDelayDataParam} from "./api.type";
import {request} from "./http";
export const getList = () => request.get("/list");

export const getDelayList =()=>request.get("/delay/list");

export const getDelayData =()=>request.get("/delay/data");

export const postDelayData =(data:PostDelayDataParam)=>request.post("/data",{data})
