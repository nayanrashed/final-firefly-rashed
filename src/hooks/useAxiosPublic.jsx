import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://y-gray-iota.vercel.app',
})
const useAxiosPublic = () => {
    return axiosPublic;   
};

export default useAxiosPublic;