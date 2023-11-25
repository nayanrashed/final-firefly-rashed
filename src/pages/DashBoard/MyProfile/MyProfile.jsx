import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useMyPosts from "../../../hooks/useMyPosts";
import { RiVerifiedBadgeFill } from "react-icons/ri";

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa6";
// import { useEffect } from "react";

const MyProfile = () => {
  const { user } = useAuth();
  const [myPosts] = useMyPosts();
  const axiosSecure = useAxiosSecure();
  const { data:userData } = useQuery({
    queryKey: ["myProfile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user?.email}`);
      return res.data;
    },
  });
  console.log(userData);

// useEffect(()=>{
//         axiosSecure.get('/users')
//         .then(res=>{
//             console.log(res.data);
//         })
// },[axiosSecure])
  
  return (
    <div>
      <div className="flex items-center justify-center flex-col">
        <div className="avatar">
          <div className=" w-24 md:w-36 rounded-full">
            <img src={user?.photoURL} />
            {userData?.badge==='gold'?<RiVerifiedBadgeFill className="absolute bottom-2 left-28 text-4xl text-yellow-400" />:<RiVerifiedBadgeFill className="absolute bottom-2 left-28 text-4xl text-amber-700" />}
          </div>
        </div>
        <div className="my-6">
            <p className="text-center">{user?.displayName}</p>
            <p className="text-center">{user?.email}</p>
        </div>
        
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Post Title</th>
              <th>Popularity</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {myPosts.slice(0, 3).map((post, index) => (
              <tr key={post._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={post.image}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </td>
                <td>{post.title}</td>
                <td>
                  <button className="btn btn-sm">
                    <FaThumbsUp></FaThumbsUp>
                    {post.upVote}
                  </button>{" "}
                  <button className="btn btn-sm">
                    <FaThumbsDown></FaThumbsDown>
                    {post.upVote}
                  </button>
                </td>
                <td>
                  <button className="btn btn-ghost btn-md">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProfile;
