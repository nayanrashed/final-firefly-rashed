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
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
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
    console.log('comment ID',id);
    console.log(commentRes.data);

    if (commentRes.data.modifiedCount>0) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Reported successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      setSelectedOption(null)
    }
  };

  return (
    <div>
      <div>
        <h2 className="text-3xl">This is Comment Page:{title}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}

          <tbody>
            {/* row 1 */}
            {searchedComments.map((comment, index) => (
              <tr key={comment._id}>
                <th>{index + 1}</th>
                <td>
                  <div>
                    <p className="flex items-center gap-2">
                      <FaUser></FaUser>
                      {comment.commentsBy}
                    </p>
                    <p className="flex items-center gap-2">
                      <FaComment></FaComment>
                      {comment.comments}
                    </p>
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
