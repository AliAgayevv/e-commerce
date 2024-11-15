import React from 'react'
import { FaGithub } from "react-icons/fa";


export default function Footer() {
  return (
    <div className='text-center gap-2 flex text-2xl flex-col items-center justify-center mt-24'>
        <p>Made by <a className='underline' href='https://github.com/AliAgayevv'>Ali</a>
        </p>
        <a href='https://github.com/AliAgayevv'>
        <FaGithub size={"20px"}/>
        </a>
    </div>
  )
}
