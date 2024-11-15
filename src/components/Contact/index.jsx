import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomHR from "../CustomHR";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  name: z.string().min(1, { message: "Name required" }),
  message: z.string().min(1,{message: "Message is required"})
});

const classesForInput = "border-[1px] rounded h-10 px-0 placeholder:text-black pl-[14px] placeholder:opacity-50";

const Contact = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    const infos = `Name: ${data.name}\nEmail: ${data.email}\nMessage: ${data.message}`
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
        alert(infos)
    } catch (error) {
      setError("root", {
        message: "This email is already taken",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl mt-10 font-medium">Contact Us</h1>
      <CustomHR />

      <form className="flex w-[420px] flex-col mt-10 gap-2" onSubmit={handleSubmit(onSubmit)}>
        <p>Name</p>
        <input
          {...register("name")}
          type="text"
          className={classesForInput}
          placeholder="Enter your name"
        />
        {errors.name && <div className="text-red-500">{errors.name.message}</div>}

        <p>Email</p>
        <input
          {...register("email")}
          type="text"
          className={classesForInput}
          placeholder="name@example.com"
        />
        {errors.email && <div className="text-red-500">{errors.email.message}</div>}

        <p>Message</p>
        <textarea
          {...register("message")}
          className="border-[1px] rounded h-36 pl-[14px] pt-[10px]"
          placeholder="Enter your message"
        />
        {errors.message && <div className="text-red-500">{errors.message.message}</div>}

        <div className="flex items-center justify-center mt-5">
          <button
            disabled={isSubmitting}
            type="submit"
            className="hover:cursor-pointer border-2 bg-[#5b5e61] px-5 py-2 rounded-lg outline-none border-none text-white"
          >
            {isSubmitting ? "Loading..." : "Send"}
          </button>
        </div>
        {errors.root && <div className="text-red-500">{errors.root.message}</div>}
      </form>
    </div>
  );
};

export default Contact;