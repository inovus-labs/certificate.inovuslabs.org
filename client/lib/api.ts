
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// axiosInstance.interceptors.request.use((config) => {
//   const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });



// Get certificate by Certificate ID
export const getCertificateById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/certificate/${id}`);
    return {
      ...response.data,
      image: "https://pub-3a2122f918a54d1492e444aef28f38d7.r2.dev/Sreelakshmi%20Anilkumar.jpg"
    };
  } catch (error) {
    console.error("Error fetching certificate:", error);
    return null;
  }
}



// search certificates by name or certificate ID
export const searchCertificates = async (query: string) => {
  try {
    return [];
  } catch (error) {
    console.error("Error searching certificates:", error);
    return [];
  }
}

export default axiosInstance;
