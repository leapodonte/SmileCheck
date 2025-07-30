// Footer.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="bg-cover bg-center text-white pt-16 pb-6"
      style={{ backgroundImage: "url('/images/background.png')" }}
    >
      {/* Call-to-Action Section */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-black rounded-xl px-8 lg:px-12 flex flex-col lg:flex-row items-center justify-between py-10 lg:py-12 mb-12">
          {/* Text Section */}
          <div className="text-left mb-8 lg:mb-0 lg:w-1/2">
            <h2 className="text-5xl font-medium mb-4 leading-tight text-white">
              Ready To Check Your Smile?
            </h2>
            <p className="text-lg text-white mb-6">
              See what your teeth are telling you — fast, accurate, and
              AI-powered.
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full flex items-center gap-2 transition">
              Start Now for Free <span className="text-lg">➔</span>
            </button>
          </div>

          {/* Image Section */}
          <div className="lg:w-1/2 flex justify-center">
            <img
              src="/images/girl2.png"
              alt="Smiling woman"
              width={400}
              height={350}
              className="rounded-xl object-cover"
            />
          </div>
        </div>

        {/* Top Footer Row */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
          {/* Logo */}
          <div className="flex justify-center md:justify-start">
            <Image
              src="/icons/smilecheck-white.png"
              alt="Logo"
              width={150}
              height={40}
              className="object-contain"
            />
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap text-gray-700 md:justify-end gap-x-6 gap-y-2 text-sm font-medium">
            <Link href="/">Features</Link>
            <Link href="/">About us</Link>
            <Link href="/">Terms of use</Link>
            <Link href="/">Privacy policy</Link>
            <Link href="/">Contact us</Link>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-4 border-black" />

        {/* Bottom Footer Row */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 text-sm">
          {/* Copyright */}
          <p className="text-black text-center md:text-left">
            All rights reserved © SmileCheck.ai  | Terms and conditions apply.
          </p>

          {/* Social Icons */}
          <div className="flex justify-center md:justify-end items-center gap-4 text-black text-lg">
            <Link href="#" aria-label="Facebook">
              <FaFacebookF className="hover:text-black transition" />
            </Link>
            <Link href="#" aria-label="Instagram">
              <FaInstagram className="hover:text-black transition" />
            </Link>
            <Link href="#" aria-label="YouTube">
              <FaYoutube className="hover:text-black transition" />
            </Link>
            <Link href="#" aria-label="LinkedIn">
              <FaLinkedinIn className="hover:text-black transition" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
