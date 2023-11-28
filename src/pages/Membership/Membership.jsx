import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const Membership = () => {
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
        <div className="flex flex-col justify-center items-center h-[70vh]">
            <h2 className="text-2xl">Become a <span className="text-amber-500 font-semibold text-4xl">Gold</span> member</h2>
            <h2 className="text-4xl">&</h2>
            <Link to='/payment'><button className="btn btn-outline rounded-full hover:bg-amber-400">Get Unlimited Access</button></Link>
            <p>for only <span className="font-semibold text-xl">$29.90</span></p>
        </div>
    );
};

export default Membership;