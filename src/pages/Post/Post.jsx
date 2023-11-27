import {
  FaComments,
  FaRegThumbsDown,
  FaRegThumbsUp,
  FaShare,
} from "react-icons/fa";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";

const Post = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const {
    // eslint-disable-next-line no-unused-vars
    _id,
    title,
    tags,
    readingTime,
    authorPhoto,
    authorName,
    postTime,
    image,
    upVote,
    upVoteBy,
    downVote,
    downVoteBy,
    description,
  } = useLoaderData();
  const [upVoteCount, setUpVoteCount] = useState(upVote);
  const [downVoteCount, setDownVoteCount] = useState(downVote);

  const handleUpVote = async () => {
    if (!user) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Please, Login First",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/login");
      return;
    }
    if (!upVoteBy.includes(user?.email) && !downVoteBy.includes(user?.email)) {
      const newUpVoteBy = [...upVoteBy, user?.email];
      const newUpVote = upVote + 1;
      const newDownVoteBy = downVoteBy;
      const newDownVote = downVote;
      const updateItem = {
        upVote: newUpVote,
        upVoteBy: newUpVoteBy,
        downVote: newDownVote,
        downVoteBy: newDownVoteBy,
      };
      const res = await axiosSecure.patch(`/posts/${_id}`, updateItem);
      console.log(res.data);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Thank you for your feedback",
        showConfirmButton: false,
        timer: 1500,
      });
      setUpVoteCount(newUpVote);
    } else if (
      upVoteBy.includes(user?.email) &&
      !downVoteBy.includes(user?.email)
    ) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: " You Have Already Given Your Vote",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    } else if (
      !upVoteBy.includes(user?.email) &&
      downVoteBy.includes(user?.email)
    ) {
      const newUpVoteBy = [...upVoteBy, user?.email];
      const newUpVote = upVote + 1;
      const newDownVoteBy = downVoteBy.filter((item) => item === !user?.email);
      const newDownVote = downVote - 1;
      const updateItem = {
        upVote: newUpVote,
        upVoteBy: newUpVoteBy,
        downVote: newDownVote,
        downVoteBy: newDownVoteBy,
      };
      const res = await axiosSecure.patch(`/posts/${_id}`, updateItem);
      console.log(res.data);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Changing Your Thoughts",
        showConfirmButton: false,
        timer: 1500,
      });
      setDownVoteCount(newDownVote);
      setUpVoteCount(newUpVote);
    }
  };

  const handleDownVote = async () => {
    if (!user) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Please, Login First",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/login");
      return;
    }
    if (!upVoteBy.includes(user?.email) && !downVoteBy.includes(user?.email)) {
      //  console.log('upVote button clicked');
      const newUpVoteBy = upVoteBy;
      const newUpVote = upVote;
      const newDownVoteBy = [...downVoteBy, user?.email];
      const newDownVote = downVote + 1;
      const updateItem = {
        upVote: newUpVote,
        upVoteBy: newUpVoteBy,
        downVote: newDownVote,
        downVoteBy: newDownVoteBy,
      };
      const res = await axiosSecure.patch(`/posts/${_id}`, updateItem);
      console.log(res.data);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Thank you for your feedback",
        showConfirmButton: false,
        timer: 1500,
      });
      setDownVoteCount(newDownVote);
    } else if (
      !upVoteBy.includes(user?.email) &&
      downVoteBy.includes(user?.email)
    ) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: " You Have Already Given Your Vote",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    } else if (
      upVoteBy.includes(user?.email) &&
      !downVoteBy.includes(user?.email)
    ) {
      const newUpVoteBy = upVoteBy.filter((item) => item === !user?.email);
      const newUpVote = upVote - 1;
      const newDownVoteBy = [...downVoteBy, user?.email];
      const newDownVote = downVote + 1;
      const updateItem = {
        upVote: newUpVote,
        upVoteBy: newUpVoteBy,
        downVote: newDownVote,
        downVoteBy: newDownVoteBy,
      };
      const res = await axiosSecure.patch(`/posts/${_id}`, updateItem);
      console.log(res.data);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Changing Your Thoughts",
        showConfirmButton: false,
        timer: 1500,
      });
      setDownVoteCount(newDownVote);
      setUpVoteCount(newUpVote);
    }
  };
  const handleGiveComments = async(e) => {
    e.preventDefault();
    const comments = e.target.comments.value;
    console.log(comments);
    if (!user) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Please, Login First",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/login");
      return;
    }
    const commentData={ comments,title,postId:_id,commentsBy:user?.email};
    // console.log(commentData);
    const commentRes = await axiosSecure.post("/comments", commentData);
  
      if (commentRes.data.insertedId) {
        
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your thoughts added successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  
  return (
    <div className="w-3/5 mx-auto ">
      <h2 className="text-3xl font-semibold border-r-2">{title}</h2>
      <div className="flex items-center">
        <img className="w-12 h-12 rounded-full" src={authorPhoto} alt="" />
        <div className="pl-4 my-6">
          <p className="">{authorName}</p>
          <div className="flex ">
            <p className="border-r-2 pr-2">{postTime}</p>
            <p className="pl-2">{readingTime} min read</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between border-y-2 py-2 ">
        <div className="flex">
          <button className="btn btn-sm btn-ghost flex items-center">
            <FaRegThumbsUp />
            {upVoteCount}
          </button>
          <button className="btn btn-sm btn-ghost flex items-center">
            <FaRegThumbsDown /> {downVoteCount}
          </button>
        </div>
        <div className="flex">
          <p className="flex items-center gap-2 border-r-2 pr-2">
            Comments <FaComments />
          </p>
          <p className="btn btn-sm btn-ghost uppercase">{tags}</p>
        </div>
      </div>
      <div className="my-6">
        <img className="w-full h-[70vh]" src={image} alt="" />
        <p className="my-6">
          <span className="text-3xl">{description.slice(0, 1)}</span>
          {description}
        </p>
      </div>
      <div className="flex flex-row-reverse justify-between border-y-2 py-2 ">
        <div className="flex">
          <button
            onClick={handleUpVote}
            className="btn btn-sm btn-ghost flex items-center px-6"
          >
            <FaRegThumbsUp />
          </button>
          <button
            onClick={handleDownVote}
            className="btn btn-sm btn-ghost flex items-center px-6"
          >
            <FaRegThumbsDown />
          </button>
        </div>
        <div className="flex">
          {/* =====Comment MODAL===== */}

          <button
            className="flex btn btn-sm btn-ghost items-center gap-2 pr-2"
            onClick={() => document.getElementById("my_modal_5").showModal()}
          >
            Make Comments <FaComments />
          </button>
          <dialog
            id="my_modal_5"
            className="modal modal-bottom sm:modal-middle"
          >
            <form onSubmit={handleGiveComments} className="modal-box">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Comments</span>
                </label>
                <textarea
                  className="textarea textarea-bordered"
                  placeholder="Give your thoughts"
                  name="comments"
                ></textarea>
              </div>
              <p className="mt-4">
                Pres <span className="font-semibold">ESC</span> to cancel
              </p>
              <div className="modal-action">
                <div method="dialog w-full">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Submit</button>
                </div>
              </div>
            </form>
          </dialog>
          <button className="flex btn btn-sm btn-ghost items-center gap-2 border-r-2 pr-2">
            Share <FaShare />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
