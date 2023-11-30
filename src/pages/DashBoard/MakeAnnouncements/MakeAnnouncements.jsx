import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import moment from "moment";
import Swal from "sweetalert2";

const MakeAnnouncements = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();
  //   console.log(user);

  const axiosSecure = useAxiosSecure();
  const onSubmit = async (data) => {
    // console.log(data);

    const onTime = moment().format("dddd, MMMM D, YYYY");

    const announcementData = {
      title: data.postTitle,
      description: data.description,
      authorName: user?.displayName,
      authorPhoto: user?.photoURL,
      authorEmail: user?.email,
      postTime: onTime,
    };
    const postRes = await axiosSecure.post("/announcements", announcementData);
    //   console.log(postRes);
    if (postRes.data.insertedId) {
      reset();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Announcement posted successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <>
      <div>
        <h3 className="text-3xl text-center mb-2">Make Announcement</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            {...register("postTitle", { required: true })}
            type="text"
            placeholder="Post Title"
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            {...register("description", { required: true })}
            className="textarea textarea-bordered h-24"
            placeholder="Description"
          ></textarea>
        </div>
        <button className="btn my-2 bg-amber-400">Add Post</button>
      </form>
    </>
  );
};

export default MakeAnnouncements;
