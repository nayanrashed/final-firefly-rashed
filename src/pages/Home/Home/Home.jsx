import { useEffect, useState } from "react";
import useSearch from "../../../hooks/useSearch";
import Banner from "../Banner/Banner";
import usePosts from "../../../hooks/usePosts";
import PostCard from "../PostCard/PostCard";
import Announcement from "../Announcement/Announcement";
import useTags from "../../../hooks/useTags";

const Home = () => {
  const [posts] = usePosts();
  const [displayPosts, setDisplayPosts] = useState(posts);
  const [searchData, setSearchData] = useState("");
  const [tags] = useTags();

  const [searchedPosts] = useSearch(searchData);
  // console.log(searchData);

  useEffect(() => {
    setDisplayPosts(searchedPosts);
  }, [searchedPosts]);

  const handleSearch = (e, value) => {
    e.preventDefault();
    setSearchData(value);
  };

  const handleTags =(tagName)=>{
    console.log(tagName);
    setSearchData(tagName)
  }

  return (
    <>
      <Banner handleSearch={handleSearch}></Banner>
      <Announcement></Announcement>
      <div className="flex w-full border-2 border-red-600 ">
        <div className=" w-1/3 border border-green-600">
          
          <div className="grid md:grid-cols-2 px-8">
          {tags.map((tag) => (
            <button key={tag._id} onClick={()=>handleTags(tag.name)} className="btn btn-ghost">{tag.name}</button>
          ))}
          </div>
        </div>
        <div className=" w-2/3 border border-green-600">
          Posts: {displayPosts.length}
          <div className="">
            {displayPosts.map((post) => (
              <PostCard key={post._id} post={post}></PostCard>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
