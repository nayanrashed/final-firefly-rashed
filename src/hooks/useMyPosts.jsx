import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useMyPosts = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  console.log(user?.email);
  const {refetch, data: myPosts = [] ,isLoading:loadingMyPosts } = useQuery({
    queryKey: ["myPosts", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts?email=${user?.email}`);      
      return res.data.reverse();
    },    
  });
  return [myPosts,refetch,loadingMyPosts];
};

export default useMyPosts;
