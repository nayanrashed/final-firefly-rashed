import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useSearchedComments = (postId) => {
    const axiosPublic = useAxiosPublic();
  
  const {data: searchedComments = [], } = useQuery({
    queryKey: ["searchPost", ],
    queryFn: async () => {
      const res = await axiosPublic.get(`/comments/${postId}`);      
      return res.data.reverse();
    },    
  });
    return [searchedComments]
};

export default useSearchedComments;