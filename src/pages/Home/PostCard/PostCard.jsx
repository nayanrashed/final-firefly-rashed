/* eslint-disable react/prop-types */
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";
// eslint-disable-next-line react/prop-types
const PostCard = ({ post }) => {
  const {
    title,
    tags,
    readingTime,
    authorPhoto,
    authorName,
    postTime,
    image,
    upVote,
    downVote,
  } = post;
  return (
    <div className="md:flex w-full md:h-40 border">
      <div className="w-1/3">
        <img className="w-full h-full" src={image} alt="image" />
      </div>
      <div className="w-2/3 px-6 pt-4">
        <p className="text-xl font-semibold">{title}</p>
        <div className="flex items-center">
          <img className="w-9 h-9 rounded-full mr-3" src={authorPhoto} alt="" />
          <p className="font-semibold">{authorName}</p>
        </div>
        <div className="flex space-x-4 justify-evenly">
          <p>comments</p>{" "}
          <div className="flex">
            <button className="btn btn-sm btn-ghost flex items-center">
              <FaRegThumbsUp />
              {upVote}
            </button>
            <button className="btn btn-sm btn-ghost flex items-center">
              <FaRegThumbsDown /> {downVote}
            </button>
          </div>
        </div>
        <div className="flex space-x-4 justify-between">
          <p>{postTime}</p>
          <p>
            {readingTime}
            <span> minute read</span>
          </p>
          <p className="btn btn-sm btn-ghost">{tags}</p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
