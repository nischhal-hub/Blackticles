import axios from "axios";
const url = '/api/blog/getAll'
export const fetchAll = async()=>{
    try{
        const resp = await axios(`${url}/all`)
        return resp.data
    }catch(error){
        console.log(`Error Fetching Data: ${error}`)
        throw error
    }
}

export const fetchSingle = async(id:string)=>{
    try{
        const resp = await axios(`${url}/single/${id}`)
        return resp.data
    }catch(error){
        console.log(`Error Fetching Data: ${error}`)
        throw error
    }
}

export const postBlog = async()=>{
    try{
        const resp = await axios(`${url}/new`)
        return resp.data
    }catch(error){
        console.log(`Error Fetching Data: ${error}`)
        throw error
    }
}