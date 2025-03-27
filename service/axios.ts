import axios from "axios";
// import Cookies from "js-cookie"

// Axios instance oluşturma
const axiosInstance = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_URL, // Base URL
});

// GET
export const getReq = async <T>(url: string): Promise<T> => {
  const response = await axiosInstance.get(url);
  return response.data;
};

// POST
export const postReq = async <T>(url: string, data?: unknown): Promise<T> => {
  const response = await axiosInstance.postForm<T>(url, data);
  return response.data;
};

// PUT
export const putReq = async <T>(url: string, data?: unknown): Promise<T> => {
  const response = await axiosInstance.put(url, data);
  return response.data;
};

// DELETE
export const deleteReq = async <T>(url: string): Promise<T> => {
  const response = await axiosInstance.delete<T>(url);
  return response.data;
};
