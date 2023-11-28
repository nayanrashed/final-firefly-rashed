import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useTags = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: tags = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const res = await axiosPublic.get("/tags");
      return res.data;
    },
  });
  return [tags, loading, refetch];
};

export default useTags;
