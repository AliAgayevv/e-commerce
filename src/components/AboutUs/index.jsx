import React from 'react'
import CustomHR from '../CustomHR'
import AboutUsCart from "../AboutUsCart"

const aboutUsData = [
    {
        id: 1,
        photoPath: "./src/assets/imgs/manclot.jpeg",
        title: "Men's Clothing"
    },
    {
        id: 2,
        photoPath: "./src/assets/imgs/womencloth.jpeg",
        title: "Women's Clothing"
    },
    {
        id: 3,
        photoPath: "./src/assets/imgs/jewelery.webp",
        title: "Jewelery"
    },
    {
        id: 4,
        photoPath: "./src/assets/imgs/electronics.jpeg",
        title: "Electronics"
    }]

export default function AboutUs() {
    return (
        <div className='flex flex-col mt-10'>
            <h1 className='text-center text-4xl'>
                About Us
            </h1>
            <CustomHR mtop={"mt-5"} w={"w-11/12"}/>

            <div className='w-11/12 mx-auto mt-5'>
                <p className='text-xl font-light text-center'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum facere doloremque veritatis odit similique sequi. Odit amet fuga nam quam quasi facilis sed doloremque saepe sint perspiciatis explicabo totam vero quas provident ipsam, veritatis nostrum velit quos recusandae est mollitia esse fugit dolore laudantium. Ex vel explicabo earum unde eligendi autem praesentium, doloremque distinctio nesciunt porro tempore quis eaque labore voluptatibus ea necessitatibus exercitationem tempora molestias. Ad consequuntur veniam sequi ullam tempore vel tenetur soluta dolore sunt maxime aliquam corporis est, quo saepe dolorem optio minus sint nemo totam dolorum! Reprehenderit delectus expedita a alias nam recusandae illo debitis repellat libero, quasi explicabo molestiae saepe, dolorem tempore itaque eveniet quam dignissimos blanditiis excepturi harum numquam vel nihil? Ipsum


                </p>

                <h2 className='text-center mt-20 text-3xl'>
                    Our Products
                </h2>

                <div className='flex items-center justify-center gap-6 mt-8'>
                    {
                        aboutUsData.map((item) => {
                            return <AboutUsCart name={item.title} imgPath={item.photoPath} />
                        })

                    }
                </div>
            </div>


        </div>
    )
}
