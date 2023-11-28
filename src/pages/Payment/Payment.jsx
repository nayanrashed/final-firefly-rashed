import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const Payment = () => {
    const { user } = useAuth();    
    const axiosSecure = useAxiosSecure();
    
    const { data:userData } = useQuery({
      queryKey: ["myProfile", user?.email],
      queryFn: async () => {
        // const res = await axiosSecure.get(`/users?email=${user?.email}`);
        const res = await axiosSecure.get(`/users/${user?.email}`);
        return res.data;
      },
    });
    console.log(userData);
    return (
        <div>
            <h3 className="text-2xl">Payment</h3>
        </div>
    );
};

export default Payment;