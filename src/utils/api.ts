import {request} from "./http";
export const getList = () => request.get("/list");

export const getDelayList =()=>request.get("/delay/list");
