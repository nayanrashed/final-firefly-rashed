import { useEffect, useState } from "react";
import useSearch from "../../../hooks/useSearch";
import Banner from "../Banner/Banner";
import usePosts from "../../../hooks/usePosts";

const Home = () => {
  const [posts] = usePosts();
  const [displayPosts, setDisplayPosts] = useState(posts);
  const [searchData, setSearchData] = useState("");

  const [searchedPosts] = useSearch(searchData);
  
  useEffect(() => {
    setDisplayPosts(searchedPosts);
  }, [searchedPosts]);

  console.log(posts);
  const handleSearch = (e, value) => {
    e.preventDefault();
    setSearchData(value);
    // setDisplayPosts(searchedPosts);
  };
  return (
    <>
      <Banner handleSearch={handleSearch}></Banner>
      <div className="flex w-full border-2 border-red-600 ">
        <div className=" w-1/3 border border-green-600"> Tags</div>
        <div className=" w-2/3 border border-green-600">
          Posts: {displayPosts.length}
        </div>
      </div>
    </>
  );
};

export default Home;
