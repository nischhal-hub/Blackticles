import axios from "axios";
const url = 'http://localhost:5002/api/blogs'
export const fetchAll = async()=>{
    try{
        const resp = await axios(`${url}/all`)
        return resp.data
    }catch(error){
        console.log(`Error Fetching Data: ${error}`)
        throw error
    }
}

export const fetchSingle = async(title:string|undefined)=>{
    try{
        const resp = await axios(`${url}/single/${title}`)
        return resp.data
    }catch(error){
        console.log(`Error Fetching single blog data: ${error}`)
        throw error
    }
}

export const postBlog = async(blogData:FormData)=>{
    try{
        const resp = await axios.post(`${url}/new`,blogData,{
            headers:{
                'Content-type':'multipart/form-data'
            }
        })
        return resp.data
    }catch(error){
        console.log(`Error posting blog: ${error}`)
        throw error
    }
}

export const editBlog = async(formData:FormData,editId:string)=>{
    try{
        const resp = await axios.put(`${url}/edit/${editId}`,formData,{
            headers:{
                'Content-type':'multipart/form-data'
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