import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import moment from "moment";
import useMyPosts from "../../../hooks/useMyPosts";
import { Link, useNavigate } from "react-router-dom";
import useTags from "../../../hooks/useTags";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddPost = () => {
  const { register, handleSubmit, reset } = useForm();
  const [myPosts] = useMyPosts();
  const [tags]=useTags();

  const { user } = useAuth();
  const navigate = useNavigate();

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const { data: userData, status: userStatus } = useQuery({
    queryKey: ["myProfile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
  });

  if (userStatus === "loading") {
    <span className="loading loading-dots loading-lg"></span>;
  }
  const badge = userData?.badge || "bronze";

  const onSubmit = async (data) => {
    // console.log(data);
    const imageFile = { image: data.image[0] };
    const onTime = moment().format("dddd, MMMM D, YYYY");

    if (badge === "bronze" && myPosts?.length >= 5) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Please update your Membership",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/membership");
      return;
    } else {
      const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      console.log(res.data);
      if (res.data.success) {
        const postData = {
          title: data.postTitle,
          tags: data.tags,
          readingTime: parseInt(data.readingTime),
          description: data.description,
          image: res.data.data.display_url,
          authorName: user?.displayName,
          authorPhoto: user?.photoURL,
          authorEmail: user?.email,
          postTime: onTime,
          upVote: 0,
          upVoteBy: [],
          downVote: 0,
          downVoteBy: [],
        };
        const postRes = await axiosSecure.post("/posts", postData);

        if (postRes.data.insertedId) {
          reset();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your post added successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    }
  };
  return (
    <>
      {badge === "bronze" && myPosts?.length >= 5 ? (
        <div className="flex flex-col justify-center items-center h-[70vh]">
          <p className="font-semibold">You have exceed your post limits</p>
          <h2 className="text-2xl">
            Become a{" "}
            <span className="text-amber-500 font-semibold text-4xl">Gold</span>{" "}
            member
          </h2>
          <h2 className="text-4xl">&</h2>
          <Link to="/membership">
          <button className="btn btn-outline rounded-full hover:bg-amber-400">
            Get Unlimited Access
          </button>
        </Link>
        </div>
      ) : (
        <div>
          <div>
            <h3 className="text-3xl text-center mb-2">Add Post</h3>
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
            <div className="flex w-full my-4 gap-4">
              <div className="form-control md:w-1/2">
                <label className="label">
                  <span className="label-text">Tag</span>
                </label>
                <select
                  defaultValue="default"
                  {...register("tags", { required: true })}
                  className="select select-bordered "
                >
                  <option disabled value="default">
                    Select a Tag
                  </option>
                  {
                    tags.map(item=><option key={item._id} value={item.name}>{item.name}</option>)
                  }
                  {/* <option value="arts">Arts</option>
                  <option value="writing">Writing</option>
                  <option value="humor">Humor</option>
                  <option value="technology">Technology</option>
                  <option value="programming">Programming</option> */}
                </select>
              </div>
              <div className="form-control md:w-1/2">
                <label className="label">
                  <span className="label-text">Reading Time</span>
                </label>
                <input
                  {...register("readingTime", { required: true })}
                  type="number"
                  placeholder="Reading Time"
                  className="input input-bordered w-full"
                />
              </div>
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
            <div className="form-control w-full my-4">
              <input
                {...register("image", { required: true })}
                type="file"
                className="file-input file-input-bordered w-full max-w-xs"
              />
            </div>
            <button className="btn bg-amber-400">Add Post</button>
          </form>
        </div>
      )}
    </>
  );
};

export default AddPost;
