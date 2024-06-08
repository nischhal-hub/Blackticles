import axios from "axios";

const server = axios.create({
    baseURL: "http://localhost:5003/api/blogs",
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});

export default server