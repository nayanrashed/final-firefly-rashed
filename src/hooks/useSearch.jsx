import { useQuery } from "@tanstack/react-query";

import useAxiosPublic from "./useAxiosPublic";


const useSearch = (search) => {
    const axiosPublic = useAxiosPublic();
  
  const {data: searchedPosts = [],refetch, isPending: loading } = useQuery({
    queryKey: ["searchPost", search],
    queryFn: async () => {
      const res = await axiosPublic.get(`/posts/${search}`);      
      return res.data.reverse();
    },    
  });
  return [searchedPosts,refetch,loading];
};

export default useSearch;