import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import { useForm } from "react-hook-form";

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [error,setError]=useState();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    console.log(data);
    const email = data.email;
    const password = data.password;

    signIn(email, password).then((result) => {
      const user = result.user;
      console.log(user);
      Swal.fire({
        title: "Login Successful.",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
      navigate(from, { replace: true });
    })
    .catch(error=>{
      console.error(error);
        setError(error.message);
        Swal.fire({
          title: 'Error!!!',
          text: 'Wrong Email or Password',
          icon: 'error',
          confirmButtonText: 'Close'
        })
    })
  };
  return (
    <div>
      <Helmet>
        <title>firefly | Login</title>
      </Helmet>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col md:flex-row-reverse">
          <div className="text-center md:w-1/2 lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6"></p>
          </div>
          <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                  })}
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                />
                {errors.password?.type === "required" && (
                  <p className="text-red-600">Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-600">Password must be 6 characters</p>
                )}
                {errors.password?.type === "maxLength" && (
                  <p className="text-red-600">
                    Password must be less than 20 characters
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-600">
                    Password must have one Uppercase one lower case, one number
                    and one special character.
                  </p>
                )}
                {
                  error&&<p className="text-red-600">{error}</p>
                }
              </div>

              <div className="form-control mt-6">
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Login"
                />
              </div>
            </form>
            <p className="px-8">
              <small>
                New Here? <Link to="/joinUs">Create an account</Link>{" "}
              </small>
            </p>
            <div className="divider px-8">
              <SocialLogin></SocialLogin>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
