import axios from "axios";
const url = "http://localhost:5003/api/blogs";
import server from "../axios/index";
export const fetchAll = async () => {
  try {
    const resp = await server(`/`);
    return resp.data;
  } catch (error) {
    console.log(`Error Fetching Data: ${error}`);
    throw error;
  }
};

export const fetchSingle = async (title: string | undefined) => {
  try {
    const resp = await server(`/${title}`);
    return resp.data;
  } catch (error) {
    console.log(`Error Fetching single blog data: ${error}`);
    throw error;
  }
};

export const postBlog = async (blogData: FormData) => {
  try {
    const resp = await server.post(`/`, blogData, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    });
    return resp.data;
  } catch (error) {
    console.log(`Error posting blog: ${error}`);
    throw error;
  }
};

export const editBlog = async (formData: FormData, editId: string) => {
  console.log(formData);
  try {
    const resp = await server.put(`/${editId}`, formData, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    });
    return resp.data;
  } catch (error) {
    console.log(`Error editing Data: ${error}`);
    throw error;
  }
};

export const deleteBlog = async (id: string) => {
  try {
    const resp = await server.delete(`/${id}`, {
      headers: {
        "Content-type": "application/json",
      },
    });
    return resp;
  } catch (error) {
    console.log(`Error Fetching Data: ${error}`);
    throw error;
  }
};

export const search = async (title: string | undefined) => {
  console.log(title);
  try {
    const resp = await server(`/search?title=${title}`);
    console.log(resp.data);
    return resp.data;
  } catch (error) {
    console.log(`Error Fetching single blog data: ${error}`);
    throw error;
  }
};

export const filter = async (startDate: string, endDate: string) => {
  try {
    const resp = await server(
      `/filter?startDate=${startDate}&endDate=${endDate}`
    );
    console.log(resp);
    return resp.data;
  } catch (error) {
    console.log(`Error Fetching blogs:${error}`);
    throw error;
  }
};
