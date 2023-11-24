import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaGoogle } from "react-icons/fa";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const handleGoogleSignIn = () => {
    googleSignIn().then((result) => {
      console.log(result.user);
      const userInfo={
        name: result.user?.displayName,
        email:result.user?.email,        
        badge: 'bronze',
        photo: result.user?.photoURL,
      }
      axiosPublic.post('/users',userInfo)
      .then(res=>{
        console.log(res.data);
      })
      navigate('/')
    });
  };
  return (
    <div>
      <div>
        <button onClick={handleGoogleSignIn}>
          <FaGoogle className="mr-3"></FaGoogle>
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
