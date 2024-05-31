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
        console.log(`Error Fetching single blog data: ${error}`)
        throw error
    }
}

export const postBlog = async(blogData:string)=>{
    try{
        const resp = await axios.post(`${url}/new`,blogData,{
            headers:{
                'Content-type':'application/json'
            }
        })
        return resp.data
    }catch(error){
        console.log(`Error posting blog: ${error}`)
        throw error
    }
}

export const editBlog = async(blogData:string,id:string)=>{
    try{
        const resp = await axios.put(`${url}/edit/${id}`,blogData,{
            headers:{
                'Content-type':'application/json'
            }
        })
        return resp.data
    }catch(error){
        console.log(`Error editing Data: ${error}`)
        throw error
    }
}

export const deleteBlog = async(id:string)=>{
    try{
        const resp = await axios.delete(`${url}/delete/${id}`,{
            headers:{
                'Content-type':'application/json'
            }
        })
        return resp
    }catch(error){
        console.log(`Error Fetching Data: ${error}`)
        throw error
    }
}