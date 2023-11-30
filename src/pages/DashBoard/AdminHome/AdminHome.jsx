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
import Swal from "sweetalert2";

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
  // console.log(userData);
  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });
  // console.log(user);
  const handleAddTags=async(e)=>{
    e.preventDefault();
    const name = e.target.tagName.value;
    const description = e.target.description.value;
    // console.log(name,description);
    const tagData={name,description}
    const tagRes = await axiosSecure.post("/tags", tagData);

        if (tagRes.data.insertedId) {
          
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Tag added successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
  }
  return (
    <div>
      <h2 className="text-2xl text-center"> Admin Home</h2>
      <div className="flex w-full justify-center items-center my-4">
        <div className="bg-amber-400 rounded-full p-1 mr-6 ">
          <img className="rounded-full" src={user?.photoURL} alt="" />
        </div>
        <div>
          <p>
            Name: <span className="font-semibold">{user?.displayName}</span>
          </p>
          <p>
            Email: <span className="font-semibold">{user?.email}</span>
          </p>
          <p>
            Membership Status:{" "}
            <span className="uppercase">{userData?.badge}</span>
          </p>
          <p>Admin</p>
        </div>
      </div>
      <div className="md:stats shadow">
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
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaComments />
          </div>
          <div className="stat-title">Comments</div>
          <div className="stat-value">{stats?.commentsCount}</div>
        </div>
        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaBook></FaBook>
          </div>
          <div className="stat-title">Orders</div>
          <div className="stat-value">{stats?.paymentsCount}</div>
        </div>
        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaDollarSign />
          </div>
          <div className="stat-title">Revenue</div>
          <div className="stat-value">{stats?.revenue?.toFixed(2)}</div>
        </div>
      </div>
      <div>
      
        <form onSubmit={handleAddTags} className="card-body">
        <h2 className="text-2xl text-center"> Add Tag Item</h2>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Tag Name</span>
            </label>
            <input
              type="text"
              name="tagName"
              placeholder="EnterTag Name"
              className="input input-bordered"
              required
            />
          </div>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text">Tag Details</span>
            </label>
            <input
              type="text"
              name="description"
              placeholder="Tag Description"
              className="input input-bordered"
              required
            />
           
          </div>
          
          <div className="form-control mt-6">
            <input
              
              className="btn bg-amber-400"
              type="submit"
              value="Add Tag"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminHome;
