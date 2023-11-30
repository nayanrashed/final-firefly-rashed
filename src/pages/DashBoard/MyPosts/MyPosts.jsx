import { FaComment, FaTrash } from "react-icons/fa6";
import useMyPosts from "../../../hooks/useMyPosts";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { Link } from "react-router-dom";

const MyPosts = () => {
  const [myPosts, refetch] = useMyPosts();
  const axiosSecure = useAxiosSecure();
  
  console.log(myPosts);
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/posts/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <>
      <div>
        <h3 className="text-3xl">My Posts:{myPosts.length}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Post Title</th>
              <th>Number of Votes</th>
              <th>Comments</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {myPosts.map((post, index) => (
              <tr key={post._id}>
                <th>{index + 1}</th>
                <td>{post.title}</td>
                <td>
                  <button className="btn btn-sm">
                    <FaThumbsUp></FaThumbsUp>
                    {post.upVote}
                  </button>{" "}
                  <button className="btn btn-sm">
                    <FaThumbsDown></FaThumbsDown>
                    {post.downVote}
                  </button>
                </td>
                <td>
                  <Link to={`/dashboard/comments/${post._id}`}><button className="btn btn-sm">
                    <FaComment></FaComment>Comments
                  </button></Link>
                </td>
                <td>
                  <button
                    onClick={() => {
                      handleDelete(post._id);
                    }}
                    className="btn btn-ghost btn-md "
                  >
                    <FaTrash className="text-red-500"></FaTrash>{" "}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MyPosts;
