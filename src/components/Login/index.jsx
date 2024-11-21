import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomHR from "../CustomHR";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8),
});

const classesForInput = "border-[1px] rounded h-10 px-0 placeholder:text-black pl-[14px] placeholder:opacity-50";

const Login = () => {
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
      await signInWithEmailAndPassword(auth, data.email, data.password)
      alert("logined")
    } catch (error) {
      setError("root", {
        message: "This email is already taken",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl mt-10 font-medium">Login</h1>
      <CustomHR mtop={"mt-5"} w={"w-11/12"} />

      <form className="flex w-[420px] flex-col mt-10 gap-2" onSubmit={handleSubmit(onSubmit)}>
        <p>Email address</p>
        <input
          {...register("email")}
          type="email"
          className={classesForInput}
          placeholder="name@example.com"
        />
        {errors.email && <div className="text-red-500">{errors.email.message}</div>}

        <p>Password</p>
        <input
          {...register("password")}
          type="password"
          className={classesForInput}
          placeholder="Password"
        />
        {errors.password && <div className="text-red-500">{errors.password.message}</div>}

        <span className="ml-1 mt-1">New here?  <Link to="/register" key="register">
            <span className="underline text-[#0dcaf0]">
                Register
                </span>
        </Link></span>
        

        <div className="flex items-center justify-center mt-5">
          <button
            disabled={isSubmitting}
            type="submit"
            className="hover:cursor-pointer border-2 bg-[#5b5e61] px-5 py-2 rounded-lg outline-none border-none text-white"
          >
            {isSubmitting ? "Loading..." : "Login"}
          </button>
        </div>
        {errors.root && <div className="text-red-500">{errors.root.message}</div>}
      </form>
    </div>
  );
};

export default Login;