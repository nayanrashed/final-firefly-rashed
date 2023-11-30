import { useEffect, useState } from "react";
import useSearch from "../../../hooks/useSearch";
import Banner from "../Banner/Banner";
// import usePosts from "../../../hooks/usePosts";
import PostCard from "../PostCard/PostCard";
import Announcement from "../Announcement/Announcement";
import useTags from "../../../hooks/useTags";

const Home = () => {
  // const [posts] = usePosts();

  const [displayPosts, setDisplayPosts] = useState([]);

  const [searchData, setSearchData] = useState("");
  const [tags] = useTags();

  const [searchedPosts] = useSearch(searchData);
  // console.log(searchData);
  //Codes for Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [itemPerPage, setItemPerPage] = useState(5);
  const [count, setCount] = useState(0);

  const numberOfPages = Math.ceil(count / itemPerPage);
  const pages = [...Array(numberOfPages).keys()];

  useEffect(() => {
    setDisplayPosts(searchedPosts);
  }, [searchedPosts]);

  //code for Pagination
  useEffect(() => {
    fetch("/postsCount")
      .then((res) => res.json())
      .then((data) => {
        setCount(data.count);
      });
  }, []);

  useEffect(() => {
    fetch(`https://y-gray-iota.vercel.app/posts?page=${currentPage}&size=${itemPerPage}`)
      .then((res) => res.json())
      .then((data) => setDisplayPosts(data.reverse()));
  }, [currentPage, itemPerPage]);

  const handleSearch = (e, value) => {
    e.preventDefault();
    setSearchData(value.toLowerCase());
  };

  const handleTags = (tagName) => {
    console.log(tagName);
    setSearchData(tagName);
  };

  const handleItemsPerPage = (e) => {
    const val = parseInt(e.target.value);
    setItemPerPage(val);
    setCurrentPage(0);
  };
  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <>
      <Banner handleSearch={handleSearch}></Banner>
      <Announcement></Announcement>
      <div className="lg:flex w-full  ">
        <div className=" lg:w-1/3 ">
          <p className="text-center text-2xl my-2">Tags</p>
          <div className="grid grid-cols-3 lg:grid-cols-2 px-8 py-6">
            {tags.map((tag) => (
              <button
                key={tag._id}
                onClick={() => handleTags(tag.name)}
                className="btn btn-md btn-ghost bg-slate-100 m-2 rounded-full"
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>
        <div className="w-full lg:w-2/3">
          {/* Posts: {displayPosts?.length} */}
          <div className="w-full">
            {displayPosts?.map((post) => (
              <PostCard key={post._id} post={post}></PostCard>
            ))}
          </div>
          {/* Pagination */}
          <div className="text-center mb-8">
            <p className="my-2 btn btn-sm">Current Page: {currentPage}</p>
            <button className="btn btn-sm mx-2" onClick={handlePreviousPage}>Prev</button>
            {pages.map((page) => (
              <button 
                className={currentPage === page ? "selected bg-yellow-400 btn btn-sm mx-2" : undefined}
                onClick={() => setCurrentPage(page)}
                key={page}
              >
                {page}
              </button>
            ))}
            <button className="btn btn-sm mx-2" onClick={handleNextPage}>Next</button>
            <select
              value={itemPerPage}
              onChange={handleItemsPerPage}
              name=""
              id=""
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
