import Banner from "../Banner/Banner";


const Home = () => {
    return (
        <>
        <Banner></Banner>
        <div className="flex w-full border-2 border-red-600 ">
            <div className=" w-1/3 border border-green-600"> Tags</div>
            <div className=" w-2/3 border border-green-600"> Posts</div>
            
        </div>
        </>
    );
};

export default Home;