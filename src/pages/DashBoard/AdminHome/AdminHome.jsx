import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  FaBook,
  FaComments,
  FaDollarSign,
  FaPodcast,
  FaUsers,
} from "react-icons/fa";

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: userData } = useQuery({
    queryKey: ["myProfile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
  });
  console.log(userData);
  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });
  console.log(user);
  return (
    <div>
      <h2 className="text-2xl text-center"> Admin Home</h2>
      <div className="flex w-full justify-center items-center">
        <div className="bg-amber-400 rounded-full p-2 mr-6 ">
          <img className="rounded-full" src={user.photoURL} alt="" />
        </div>
        <div>
          <p>Name: <span className="font-semibold">{user.displayName}</span></p>
          <p>Email: <span className="font-semibold">{user.email}</span></p>
          <p>Membership Status: <span className="uppercase">{userData?.badge}</span></p>
          <p>Admin</p>
        </div>
      </div>
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaUsers></FaUsers>
          </div>
          <div className="stat-title">Users</div>
          <div className="stat-value">{stats?.users}</div>
        </div>
        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaPodcast />
          </div>
          <div className="stat-title">Posts</div>
          <div className="stat-value">{stats?.totalPosts}</div>
          <div className="stat-desc">Jan 1st - Feb 1st</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaComments />
          </div>
          <div className="stat-title">Comments</div>
          <div className="stat-value">{stats?.commentsCount}</div>
          <div className="stat-desc">Jan 1st - Feb 1st</div>
        </div>
        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaBook></FaBook>
          </div>
          <div className="stat-title">Orders</div>
          <div className="stat-value">{stats?.paymentsCount}</div>
          <div className="stat-desc">Jan 1st - Feb 1st</div>
        </div>
        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaDollarSign />
          </div>
          <div className="stat-title">Revenue</div>
          <div className="stat-value">{stats?.revenue.toFixed(2)}</div>
          <div className="stat-desc">Jan 1st - Feb 1st</div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
