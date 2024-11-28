import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomHR from "../CustomHR";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { motion } from "framer-motion";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

const classesForInput = "border-[1px] rounded h-10 px-0 placeholder:text-black pl-[14px] placeholder:opacity-50";

const PasswordReset = () => {
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
      await sendPasswordResetEmail(auth, data.email);
      alert("Password reset email sent. Please check your inbox.");
      navigate("/e-commerce/login")
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setError("email", { message: "No account found with this email" });
      } else {
        setError("root", { message: "An unexpected error occurred" });
      }
    }
  };

  return (
    <motion.div className="flex flex-col items-center justify-center"
    initial={{opacity: 0 }}
    animate={{opacity: 1}}
    >
      <h1 className="text-4xl mt-10 font-medium">Password Reset</h1>
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

        <div className="flex items-center justify-center mt-5">
          <button
            disabled={isSubmitting}
            type="submit"
            className="hover:cursor-pointer border-2 bg-[#5b5e61] px-5 py-2 rounded-lg outline-none border-none text-white"
          >
            Send
          </button>
        </div>
        {errors.root && <div className="text-red-500">{errors.root.message}</div>}
      </form>
      <div className="mt-5">
      <Link to="/e-commerce/login" key="register">
            <span className="underline text-[#0dcaf0]">Login    </span>
          </Link>
      </div>
    </motion.div>
  );
};

export default PasswordReset;