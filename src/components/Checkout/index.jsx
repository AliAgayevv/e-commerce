import React from 'react'
import OrderSum from '../OrderSum'
import CustomHR from '../CustomHR';
import { useLocation } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";



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
    card__number: z.string().min(16) 
});


const classesForInput = "border-[1px] rounded h-10 px-0 w-[100%] placeholder:text-black pl-[14px] placeholder:opacity-50";


export default function Checkout() {

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(schema),
    });
    location.pathname === "/checkout"

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
        <motion.div className='mt-5'
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        >
            <h1 className="text-center text-5xl">Checkout</h1>
            <CustomHR mtop={"mt-5"} w={"w-11/12"} />

            <div className="flex mt-24 gap-10 ">
                <div className="flex flex-col border-[1.5px] h-screen ml-32 w-6/12">
                    <h2 className="text-2xl border-[1px] bg-[#f6f6f6] p-3">Billing address
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="p-4 flex  h-screen flex-col gap-4 w-[100%]">
                        <div className='flex justify-around gap-10 -mb-2'>
                            <div className='w-6/12'>
                                <p className='mb-3'>First name</p>
                                <input {...register("name")}
                                    type='text'
                                    className={classesForInput}
                                />
                            </div>
                            <div className='w-6/12'>
                                <p className='mb-3'>Last name</p>
                                <input {...register("lastName")}
                                    type='text'
                                    className={classesForInput}
                                />
                            </div>

                        </div>
                        

                        <div className='w-[100%]'>
                            <p className='mb-3'>Email</p>
                            <input {...register("email")}
                                type='text'
                                className={classesForInput}
                                placeholder='you@example.com'
                            />
                        </div>
                        <div className='w-[100%]'>
                            <p className='mb-3'>Address</p>
                            <input {...register("address")}
                                type='text'
                                className={classesForInput}
                                placeholder='1234 Main st'
                            />
                        </div>
                        <div className='w-[100%]'>
                            <p className='mb-3'>Address 2 (Optional)</p>
                            <input {...register("address_2")}
                                type='text'
                                className={classesForInput}
                                placeholder="Apartment or suite"
                            />
                        </div>


                        <div className='w-[100%] flex h-20 justify-between mt-2 gap-10'>
                            <div className='w-4/12 h-screen'>
                                <p className='mb-3'>Country</p>
                                <input {...register("country")}
                                    type='text'
                                    className={classesForInput}
                                    placeholder="Country..."
                                />
                            </div>
                            <div className='w-4/12 h-screen'>
                                <p className='mb-3'>State</p>
                                <input {...register("state")}
                                    type='text'
                                    className={classesForInput}
                                />

                            </div>
                            <div className='w-4/12 h-screen'>
                                <p className='mb-3'>Zip</p>
                                <input {...register("zip")}
                                    type='text'
                                    className={classesForInput}
                                />
                            </div>

                        </div>

                    <CustomHR mtop={"mt-0"} w={"w-[100%]"}/>

                    <h1 className='text-2xl'>
                        Payment
                    </h1>
                    <div className='flex justify-around gap-10 -mb-2'>
                            <div className='w-6/12'>
                                <p className='mb-3'>Name on Card</p>
                                <input {...register("card__name")}
                                    type='text'
                                    className={classesForInput}
                                />
                                <div className='text-sm mt-2 ml-1 opacity-60'>
                                Full name as displayed on card

                                </div>
                            </div>
                            <div className='w-6/12'>
                                <p className='mb-3'>Credit cart number</p>
                                <input {...register("card__number")}
                                    type="number"
                                    className={classesForInput}
                                />
                            </div>

                        </div>

                        <div className='flex w-6/12 gap-10'>
                            <div className='w-6/12'>
                            <p className='mb-1'>Expiration</p>
                                <input {...register("card__name")}
                                    type='text'
                                    className={classesForInput}
                                /></div>
                            <div className='w-6/12'>
                            <p className='mb-1'>CVV</p>
                                <input {...register("card__name")}
                                    type='text'
                                    className={classesForInput}
                                /></div>
                        </div>


                    <div className= 'mt-10 w-[100%] h-10 bg-[#0d6efd] text-white p-2 rounded-lg bg-opacity-65 text-center'>
                        <button>
                            Continue to checkout
                        </button>
                    </div>

                    </form>
                    
                </div>

                <OrderSum />
            </div>

        </motion.div>
    )
}
