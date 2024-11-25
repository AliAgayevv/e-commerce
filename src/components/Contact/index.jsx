import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomHR from "../CustomHR";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { motion } from "framer-motion";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  name: z.string().min(1, { message: "Name required" }),
  message: z.string().min(1, { message: "Message is required" }),
});

const classesForInput =
  "border-[1px] rounded h-10 px-0 placeholder:text-black pl-[14px] placeholder:opacity-50";

const Contact = () => {
  const [user, isLoading] = useAuthState(auth);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    const infos = `Name: ${data.name}\nEmail: ${data.email}\nMessage: ${data.message}`;
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      alert(infos);
    } catch (error) {
      setError("root", {
        message: "This email is already taken",
      });
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center px-4 md:px-10 lg:px-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-3xl md:text-4xl lg:text-5xl mt-10 font-medium text-center">
        Contact Us
      </h1>
      <CustomHR mtop={"mt-5"} w={"w-full"} />

      <form
        className="flex flex-col w-full max-w-lg mt-10 gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {user === null ? (
          <div className="flex flex-col gap-2">
            <p className="text-sm md:text-base">Name</p>
            <input
              {...register("name")}
              type="text"
              className={classesForInput}
              placeholder="Enter your name"
            />
            {errors.name && (
              <div className="text-red-500 text-sm">{errors.name.message}</div>
            )}

            <p className="text-sm md:text-base">Email</p>
            <input
              {...register("email")}
              type="text"
              className={classesForInput}
              placeholder="name@example.com"
            />
            {errors.email && (
              <div className="text-red-500 text-sm">{errors.email.message}</div>
            )}
          </div>
        ) : (
          <></>
        )}
        <p className="text-sm md:text-base">Message</p>
        <textarea
          {...register("message")}
          className="border-[1px] rounded h-36 pl-[14px] pt-[10px] placeholder:opacity-50 text-sm md:text-base"
          placeholder="Enter your message"
        />
        {errors.message && (
          <div className="text-red-500 text-sm">{errors.message.message}</div>
        )}

        <div className="flex items-center justify-center mt-5">
          <button
            disabled={isSubmitting}
            type="submit"
            className="hover:cursor-pointer border-2 bg-[#5b5e61] px-5 py-2 rounded-lg outline-none border-none text-white transition-transform duration-200 hover:scale-105"
          >
            {isSubmitting ? "Loading..." : "Send"}
          </button>
        </div>
        {errors.root && (
          <div className="text-red-500 text-center">{errors.root.message}</div>
        )}
      </form>
    </motion.div>
  );
};

export default Contact;