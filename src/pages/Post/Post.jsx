import { FaComments, FaRegThumbsDown, FaRegThumbsUp, FaShare } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";

const Post = () => {
  const {
    _id,
    title,
    tags,
    readingTime,
    authorPhoto,
    authorName,
    postTime,
    image,
    upVote,
    downVote,
    description,
  } = useLoaderData();
  console.log(title);
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
            {upVote}
          </button>
          <button className="btn btn-sm btn-ghost flex items-center">
            <FaRegThumbsDown /> {downVote}
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
        <p className="my-6"><span className="text-3xl">{description.slice(0,1)}</span>{description}</p>
      </div>
      <div className="flex flex-row-reverse justify-between border-y-2 py-2 ">
        <div className="flex">
          <button className="btn btn-sm btn-ghost flex items-center px-6">
            <FaRegThumbsUp />
            
          </button>
          <button className="btn btn-sm btn-ghost flex items-center px-6">
            <FaRegThumbsDown />
          </button>
        </div>
        <div className="flex">
          <button className="flex btn btn-sm btn-ghost items-center gap-2 border-r-2 pr-2">
            Make Comments <FaComments />
          </button>
          <button className="flex btn btn-sm btn-ghost items-center gap-2 border-r-2 pr-2">
            Share <FaShare />
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default Post;
