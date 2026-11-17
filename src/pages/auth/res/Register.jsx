import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router"; // Fixed import
import useAuth from "../../../hooks/useAuth";
import UploadImage from "../../../utils/UploadImage";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const axiosSecure = useAxiosSecure();
  const { registerUser, UpdateProfile, googleSignIn } = useAuth();
  const useNavigateInstance = useNavigate(); // or keep as navigate

  const onSubmit = async (data) => {
    try {
      const imageFile = data.photo[0];
      const imageUrl = await UploadImage(imageFile);

      await registerUser(data.email, data.password);

      await UpdateProfile({
        displayName: data.name,
        photoURL: imageUrl,
      });

      const userInfo = {
        email: data.email,
        displayName: data.name,
        photoURL: imageUrl,
      };

      const res = await axiosSecure.post("/users", userInfo);

      if (res.data.insertedId || res.data.exists || res.status === 200) {
        useNavigateInstance("/");
      }
    } catch (err) {
      console.error("User registration process failed:", err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn();
      const user = result.user;

      const userInfo = {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };

      const res = await axiosSecure.post("/users", userInfo);

      if (res.data.insertedId || res.data.exists || res.status === 200) {
        useNavigateInstance("/");
      }
    } catch (err) {
      console.error("Google Sign-In process failed:", err.message);
    }
  };

  return (
    <div className="mt-7 py-6 card bg-base-100 rounded shrink-0 mx-auto max-w-sm w-full shadow-2xl">
      <h2 className="text-4xl font-extrabold text-center">Create an Account</h2>
      <p className="text-gray-400 text-center">Register with ZapShift</p>
      <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset">
          {/* name field */}
          <label className="label font-bold">Name</label>
          <input
            type="text"
            className="input"
            placeholder="name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="text-red-700">{errors.name.message}</p>}

          {/* photo field */}
          <label className="label font-bold">Photo</label>
          <input
            type="file"
            className="file-input"
            {...register("photo", { required: "Photo is required" })}
          />
          {errors.photo && (
            <p className="text-red-700">{errors.photo.message}</p>
          )}

          <label className="label font-bold">Email</label>
          <input
            type="email"
            className="input"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
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
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be 8 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-700">{errors.password.message}</p>
          )}

          <button type="submit" className="btn bg-primary mt-4">
            Register
          </button>
        </fieldset>

        <p className="my-1">
          Already have an account?{" "}
          <Link to={"/login"} className="text-primary">
            Login
          </Link>
        </p>
        <p className="my-2 text-gray-300 text-center">or</p>

        {/* Added type="button" to prevent form submission collision */}
        <button
          type="button"
          className="btn w-full bg-white text-black border-[#e5e5e5]"
          onClick={handleGoogleSignIn}
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
          Register with Google
        </button>
      </form>
    </div>
  );
};

export default Register;
