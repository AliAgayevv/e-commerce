import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomHR from "../CustomHR";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

const classesForInput =
  "border-[1px] rounded h-10 px-0 placeholder:text-black pl-[14px] placeholder:opacity-50";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate("/e-commerce/");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setError("root", { message: "No account found with this email" });
      } else if (error.code === "auth/wrong-password") {
        setError("root", { message: "Incorrect password" });
      } else {
        setError("root", { message: "An unexpected error occurred" });
      }
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center px-4 md:px-10 lg:px-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-3xl md:text-4xl lg:text-5xl mt-10 font-medium text-center">
        Login
      </h1>
      <CustomHR mtop={"mt-5"} w={"w-full"} />
 
      <form
        className="flex flex-col w-full max-w-lg mt-10 gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <p className="text-sm md:text-base">Email address</p>
          <input
            {...register("email")}
            type="email"
            className={`${classesForInput} w-full`}
            placeholder="name@example.com"
          />
          {errors.email && (
            <div className="text-red-500 text-sm">{errors.email.message}</div>
          )}
        </div>

        <div>
          <p className="text-sm md:text-base">Password</p>
          <input
            {...register("password")}
            type="password"
            className={`${classesForInput} w-full`}
            placeholder="Password"
          />
          {errors.password && (
            <div className="text-red-500 text-sm">{errors.password.message}</div>
          )}
        </div>


        <Link to="/e-commerce/forgot-password">
          <p className="text-sm underline italic text-[#1cb600] mt-1 text-right">
            Forgot Password?
          </p>
        </Link>


        <p className="text-sm mt-1">
          New here?{" "}
          <Link to="/e-commerce/register" key="register">
            <span className="underline text-[#0dcaf0]">Register</span>
          </Link>
        </p>


        <div className="flex items-center justify-center mt-5">
          <button
            disabled={isSubmitting}
            type="submit"
            className="hover:cursor-pointer border-2 bg-[#5b5e61] px-5 py-2 rounded-lg outline-none border-none text-white transition-transform duration-200 hover:scale-105"
          >
            {isSubmitting ? "Loading..." : "Login"}
          </button>
        </div>
        {errors.root && (
          <div className="text-red-500 text-center">{errors.root.message}</div>
        )}
      </form>
    </motion.div>
  );
};

export default Login;