import axios, {AxiosRequestConfig} from 'axios'

const apiUrl = process.env.REACT_APP_API_URL;


export const httpInstance = (config?:AxiosRequestConfig ) =>{

    const instance =axios.create({
        baseURL:apiUrl,
        timeout:1000,
        withCredentials:true,
        ...config
    })
    instance.interceptors.request.use((config)=>{
    
        return config
    
    },(error)=>{
        console.log("fitst",error);
    })

} 
