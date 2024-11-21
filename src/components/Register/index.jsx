import { zodResolver } from "@hookform/resolvers/zod";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase"; 
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomHR from "../CustomHR";
import { Link, useNavigate } from "react-router-dom";

// Form doğrulama için Zod şeması
const schema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
});

const classesForInput = "border-[1px] rounded h-10 px-0 placeholder:text-black pl-[14px] placeholder:opacity-50";

const Register = () => {
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
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: data.name,
      });

      // Create document from users collection and add empty bucket
      await setDoc(doc(db, "users", user.uid), {
        cart: [], 
        displayName: data.name,
        email: data.email,
      });

      navigate("/e-commerce/");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("email", { message: "This email is already in use" });
      } else {
        setError("root", { message: "An unexpected error occurred" });
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl mt-10 font-medium">Register</h1>
      <CustomHR mtop={"mt-5"} w={"w-11/12"} />


      <form className="flex w-[420px] flex-col mt-10 gap-2" onSubmit={handleSubmit(onSubmit)}>
        <p>Full name</p>
        <input
          {...register("name")}
          type="text"
          className={classesForInput}
          placeholder="Enter your name"
        />
        {errors.name && <div className="text-red-500">{errors.name.message}</div>}

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

        <span className="ml-1 mt-1">Already has an account?  <Link to="/e-commerce/login" key="register">
            <span className="underline text-[#0dcaf0]">
                Login
                </span>
        </Link></span>
        

        <div className="flex items-center justify-center mt-5">
          <button
            disabled={isSubmitting}
            type="submit"
            className="hover:cursor-pointer border-2 bg-[#5b5e61] px-5 py-2 rounded-lg outline-none border-none text-white"
          >
            {isSubmitting ? "Loading..." : "Register"}
          </button>
        </div>
        {errors.root && <div className="text-red-500">{errors.root.message}</div>}
      </form>
    </div>
  );
};

export default Register;