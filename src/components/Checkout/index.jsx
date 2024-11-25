import React from "react";
import OrderSum from "../OrderSum";
import CustomHR from "../CustomHR";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion } from "framer-motion";

const schema = z.object({
  name: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email({ message: "Invalid email address" }),
  address: z.string().min(1),
  address_2: z.string().optional(),
  country: z.string().min(1),
  state: z.string().min(1),
  zip: z.string().min(1),
  card__name: z.string().min(1),
  card__number: z.string().min(16),
});

const classesForInput =
  "border-[1px] rounded h-10 px-0 w-[100%] placeholder:text-black pl-[14px] placeholder:opacity-50";

export default function Checkout() {
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
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      setError("root", {
        message: "This email is already taken",
      });
    }
  };

  return (
    <motion.div
      className="mt-5 px-4 sm:px-8 lg:px-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-center text-3xl sm:text-4xl lg:text-5xl">Checkout</h1>
      <CustomHR mtop={"mt-5"} w={"w-full"} />

      <div className="flex flex-col lg:flex-row mt-10 lg:mt-24 gap-10">
        <div className="flex flex-col border-[1.5px] rounded-lg w-full lg:w-8/12">
          <h2 className="text-xl lg:text-2xl border-b bg-[#f6f6f6] p-3">
            Billing address
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-4 flex flex-col gap-4 w-full"
          >
            {/* Name and Last Name */}
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="w-full sm:w-6/12">
                <p className="mb-3">First name</p>
                <input
                  {...register("name")}
                  type="text"
                  className={classesForInput}
                />
              </div>
              <div className="w-full sm:w-6/12">
                <p className="mb-3">Last name</p>
                <input
                  {...register("lastName")}
                  type="text"
                  className={classesForInput}
                />
              </div>
            </div>

            {/* Email */}
            <div className="w-full">
              <p className="mb-3">Email</p>
              <input
                {...register("email")}
                type="text"
                className={classesForInput}
                placeholder="you@example.com"
              />
            </div>

            {/* Address */}
            <div className="w-full">
              <p className="mb-3">Address</p>
              <input
                {...register("address")}
                type="text"
                className={classesForInput}
                placeholder="1234 Main st"
              />
            </div>

            <div className="w-full">
              <p className="mb-3">Address 2 (Optional)</p>
              <input
                {...register("address_2")}
                type="text"
                className={classesForInput}
                placeholder="Apartment or suite"
              />
            </div>

            {/* Country, State, and Zip */}
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="w-full sm:w-4/12">
                <p className="mb-3">Country</p>
                <input
                  {...register("country")}
                  type="text"
                  className={classesForInput}
                  placeholder="Country..."
                />
              </div>
              <div className="w-full sm:w-4/12">
                <p className="mb-3">State</p>
                <input
                  {...register("state")}
                  type="text"
                  className={classesForInput}
                />
              </div>
              <div className="w-full sm:w-4/12">
                <p className="mb-3">Zip</p>
                <input
                  {...register("zip")}
                  type="text"
                  className={classesForInput}
                />
              </div>
            </div>

            <CustomHR mtop={"mt-5"} w={"w-full"} />

            <h1 className="text-xl lg:text-2xl">Payment</h1>

            {/* Payment Section */}
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="w-full sm:w-6/12">
                <p className="mb-3">Name on Card</p>
                <input
                  {...register("card__name")}
                  type="text"
                  className={classesForInput}
                />
                <div className="text-sm mt-2 opacity-60">
                  Full name as displayed on card
                </div>
              </div>
              <div className="w-full sm:w-6/12">
                <p className="mb-3">Credit card number</p>
                <input
                  {...register("card__number")}
                  type="number"
                  className={classesForInput}
                />
              </div>
            </div>

            {/* Expiration and CVV */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-6/12">
                <p className="mb-1">Expiration</p>
                <input
                  {...register("card__name")}
                  type="text"
                  className={classesForInput}
                />
              </div>
              <div className="w-full sm:w-6/12">
                <p className="mb-1">CVV</p>
                <input
                  {...register("card__name")}
                  type="text"
                  className={classesForInput}
                />
              </div>
            </div>

            <div className="mt-10 w-full">
              <button
                className="w-full bg-[#0d6efd] text-white py-2 rounded-lg hover:bg-[#0c5cba] transition"
                type="submit"
              >
                Continue to checkout
              </button>
            </div>
          </form>
        </div>

        <OrderSum />
      </div>
    </motion.div>
  );
}