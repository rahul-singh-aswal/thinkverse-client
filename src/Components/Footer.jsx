import React from "react";
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitterX } from 'react-icons/bs';

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <>
      <footer className="absolute left-0 bottom-0 h-[10vh] w-[100vw] py-5 flex flex-col sm:flex-row items-center justify-between sm:px-20 text-white bg-gray-800">
        <section className='text-lg'>© {year} ThinkVerse. All rights reserved.</section>
        <section className='flex items-center justify-center gap-5 text-2xl text-white '>
          <a className='hover:text-yellow-200 transition-all ease-in-out duration-300' href="">
            <BsFacebook />
          </a>
          <a className='hover:text-yellow-200 transition-all ease-in-out duration-300' href="">
            <BsInstagram />
          </a>
          <a className='hover:text-yellow-200 transition-all ease-in-out duration-300' href="">
            <BsLinkedin />
          </a>
          <a className='hover:text-yellow-200 transition-all ease-in-out duration-300' href="">
            <BsTwitterX />
          </a>
        </section>
      </footer>
    </>
  );
};

export default Footer;
