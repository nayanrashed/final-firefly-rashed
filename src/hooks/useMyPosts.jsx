import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useMyPosts = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: myPosts = [], refetch } = useQuery({
    queryKey: ["myPosts", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts?email=${user?.email}`);
      return res.data.reverse();
    },
  });
  return [myPosts,refetch];
};

export default useMyPosts;
