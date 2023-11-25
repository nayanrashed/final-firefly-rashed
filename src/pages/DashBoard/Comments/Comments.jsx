
import { useLoaderData } from "react-router-dom";


const Comments = () => {
    const {title,_id}=useLoaderData();
    console.log(title,_id);
    return (
        <div>
            <h2 className="text-3xl">This is Comment Page</h2>
        </div>
    );
};

export default Comments;