import { useForm } from "react-hook-form";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { signIn, googleSignIn } = useAuth();

  const onSubmit = (data) => {
    console.log(data);
    const email = data.email;
    const password = data.password;
    signIn(email, password)
      .then((res) => console.log(res.user))
      .catch((err) => console.log(err.message));
  };

  const GoogleSignIn = () => {
    googleSignIn()
      .then((res) => {
        console.log(res.user);
        alert("Your SignIn Is Complete");
      })
      .catch((err) => {
        console.log(err.message);
        alert("You cannot sign In");
      });
  };

  // console.log(watch()); // watch input value by passing the name of it

  return (
    <div className="mt-7 pt-2 card bg-base-100 rounded shrink-0 mx-auto max-w-sm w-full shadow-2xl  ">
      <h2 className="text-4xl  text-center font-extrabold  ">Welcome back </h2>
      <p className="text-gray-400 text-center  ">login with zapship</p>
      <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <fieldset className="fieldset">
          <label className="label font-bold  ">Email</label>
          <input
            type="email"
            className="input"
            placeholder="Email"
            {...register("email", { required: "Email is require" })}
          />
          {errors.email && (
            <p className="text-red-700">{errors.email.message}</p>
          )}
          <label className="label font-bold">Password</label>
          <input
            type="password"
            className="input"
            placeholder="Password"
            {...register("password", {
              required: "Password is requird ",
              minLength: {
                value: 8,
                message: "password must be 8 cherectoer",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-700">{errors.password.message}</p>
          )}
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn bg-primary mt-4">Login</button>
        </fieldset>

        <p className="my-1  ">
          Don’t have any account?{" "}
          <Link to={"/register"} className="text-primary">
            Register
          </Link>
        </p>

        <p className=" text-center text-gray-300">or</p>

        <button
          onClick={GoogleSignIn}
          className="btn w-full bg-white text-black border-[#e5e5e5]"
        >
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login with Google
        </button>
      </form>
    </div>
  );
};

export default Login;
