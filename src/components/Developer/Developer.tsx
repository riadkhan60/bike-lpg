'use client';

import React from 'react';
import { Dev } from './Dev';
import Image from 'next/image';
import {
  IconMail,
  IconWorld,
  IconBrandX,
  IconBrandFacebook,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
    },
  },
};

const glowVariants = {
  initial: { opacity: 0.5 },
  animate: {
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

const linkVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10,
    },
  },
};

export function Developer() {
  return (
    <motion.div
      className="h-dvh w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div>
        <Dev className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      </div>

      <motion.div
        className="p-4 max-w-7xl flex flex-col justify-center items-center gap-5 mx-auto relative z-10 w-full pt-20 md:pt-0"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <Image
            className="mx-auto w-[200px] h-[80px]"
            src={'https://qbexel.com/Data/BrandLogo/LogoDark.svg'}
            width={500}
            height={500}
            alt="Qbexel"
          />
        </motion.div>

        <motion.h1
          className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50"
          variants={itemVariants}
        >
          Developed by Qbexel
        </motion.h1>

        <motion.div
          className="mt-6 backdrop-blur-[6px] bg-gradient-to-r from-[rgba(53,53,53,0.5)] to-[rgba(31,31,31,0.4)] border border-[#383838] p-8 rounded-xl shadow-lg"
          variants={glowVariants}
          initial="initial"
          animate="animate"
        >
          <motion.p
            className="text-white text-center text-lg mb-6"
            variants={itemVariants}
          >
            Visit for awesomeness
          </motion.p>

          <motion.div
            className="grid grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-6"
            variants={containerVariants}
          >
            {[
              {
                icon: IconWorld,
                text: 'qbexel.com',
                href: 'https://qbexel.com',
              },
              {
                icon: IconMail,
                text: 'qbexel@gmail.com',
                href: 'mailto:qbexel@gmail.com',
              },
              {
                icon: IconBrandX,
                text: '@qbexel',
                href: 'https://x.com/qbexel',
              },
              {
                icon: IconBrandFacebook,
                text: 'qbexel',
                href: 'https://www.facebook.com/qbexel',
              },
            ].map((item, index) => (
              <motion.a
                key={index}
                className="border-[#383838] border p-3 rounded-lg bg-[rgba(241,241,241,0.1)] text-white text-center flex justify-center gap-4 items-center hover:bg-[rgba(241,241,241,0.15)] transition-colors"
                href={item.href}
                variants={linkVariants}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
              >
                <item.icon className="" />
                <span>{item.text}</span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
