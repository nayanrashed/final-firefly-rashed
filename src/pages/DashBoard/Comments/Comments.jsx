/* eslint-disable no-unused-vars */
import { useLoaderData } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useSearchedComments from "../../../hooks/useSearchedComments";
import { FaUser } from "react-icons/fa";
import { FaComment } from "react-icons/fa6";

import Select from "react-select";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const options = [
  { value: "irrelevant", label: "Irrelevant" },
  { value: "offensive", label: "Offensive" },
  { value: "violent", label: "Violent" },
];

const Comments = () => {
  const [selectedOption, setSelectedOption] = useState(null);

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
  const [searchedComments] = useSearchedComments(_id);
  //   console.log(searchedComments);

  const handleReport = async (id) => {
    const report = selectedOption.value;
    const reportData = { report };
    const commentRes = await axiosSecure.patch(`/comments/${id}`, reportData);
    console.log("comment ID", id);
    console.log(commentRes.data);

    if (commentRes.data.modifiedCount > 0) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Reported successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      setSelectedOption(null);
    }
  };
  const [state, setState] = useState(false);
  // console.log(state);

  return (
    <div>
      <div>
        <h2 className="text-3xl text-center">{title}</h2>
        <h2 className="text-xl text-center my-4">All Comments</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Comments</th>
              <th>Feedback</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {/* row 1 */}
            {searchedComments.map((comment, index) => (
              <tr key={comment._id}>
                <th>{index + 1}</th>
                <td>
                  <div>
                    <p className="flex items-center gap-2">
                      <FaUser></FaUser>
                      <span className="font-semibold">
                        {" "}
                        {comment.commentsBy}
                      </span>
                    </p>
                    <div className="flex items-center gap-2">
                      <FaComment></FaComment>
                      {state ? (
                        <p> {comment.comments}</p>
                      ) : (
                        <p>{comment.comments.slice(0, 20)}</p>
                      )}
                      <p
                        className="btn btn-ghost btn-xs font-semibold"
                        onClick={() => setState(!state)}
                      >
                        {state ? (
                          <span>Read Less</span>
                        ) : (
                          <span>Read More</span>
                        )}
                      </p>
                    </div>
                  </div>
                </td>
                <td>
                  <Select
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={options}
                  />
                </td>

                <td>
                  <button
                    onClick={() => handleReport(comment._id)}
                    disabled={selectedOption === null}
                    className="btn btn-ghost btn-sm"
                  >
                    Report
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Comments;
