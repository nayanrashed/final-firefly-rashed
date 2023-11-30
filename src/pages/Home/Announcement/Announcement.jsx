import useAnnouncements from "../../../hooks/useAnnouncements";
import { FaBullhorn } from "react-icons/fa";

const Announcement = () => {
  const [announcements] = useAnnouncements();
  //   console.log(announcements);
  return (
    <div>
      {announcements.length === 0 ? (
        <></>
      ) : (
        <>
          <p className="text-center text-2xl border-b-2 flex items-center justify-center my-5">
            <FaBullhorn className="mr-3 text-3xl" /> Announcements
          </p>
          {announcements.map((item) => (
            <div key={item._id}>
              <div className="flex justify-start mb-2 border-b-2 pb-4">
                <img className="w-12 h-12 rounded-full mr-4 " src={item?.authorPhoto} alt="" />
                <div className="border-l-2 pl-3">
                    <p>
                    {item?.description} 
                    </p>
                    <p className="font-semibold">
                    {item?.authorName}  
                    </p>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Announcement;
