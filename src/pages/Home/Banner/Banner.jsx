import { FaSearch } from "react-icons/fa";
// eslint-disable-next-line react/prop-types
const Banner = ({handleSearch}) => {
  return (
    <div
      className="hero h-[80vh]"
      style={{
        backgroundImage: "url(https://i.ibb.co/C9Dd5n6/6.jpg)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Share & Care</h1>
          <p className="mb-5">
          firefly – Where Ideas Spark and Conversations Glow.
          </p>
          <form onSubmit={(e)=>handleSearch(e,e.target.searchField.value)} className="join">
            <input
              className="input input-bordered join-item"
              name="searchField"
              placeholder="Search by tags..."
            />
            <button className="btn join-item"><FaSearch /></button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Banner;
