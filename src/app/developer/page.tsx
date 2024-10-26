'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, Globe, Github, Twitter, Linkedin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Component() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <section className="min-h-screen   py-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <div className="relative inline-block mb-8">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-xl opacity-20"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
            <Image
              src="/placeholder.svg?height=120&width=120"
              alt="Company Logo"
              width={120}
              height={120}
              className="relative mx-auto rounded-full shadow-lg"
            />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Contact Support
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
           { "We're"} here to help you succeed. Reach out through any channel and
            {"we'll"} respond within 24 hours.
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <motion.div
            className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
              <Phone className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              Phone Support
            </h3>
            <p className="text-gray-600 text-lg">+1 (555) 123-4567</p>
            <p className="text-sm text-gray-500 mt-2">
              Available 24/7 for urgent issues
            </p>
          </motion.div>

          <motion.div
            className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="bg-green-100 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
              <Mail className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              Email Support
            </h3>
            <a
              href="mailto:support@example.com"
              className="text-gray-600 text-lg hover:text-blue-600 transition-colors"
            >
              support@example.com
            </a>
            <p className="text-sm text-gray-500 mt-2">
              Usually respond within 2 hours
            </p>
          </motion.div>

          <motion.div
            className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="bg-purple-100 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
              <Globe className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              Help Center
            </h3>
            <a
              href="https://www.example.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 text-lg hover:text-blue-600 transition-colors"
            >
              www.example.com
            </a>
            <p className="text-sm text-gray-500 mt-2">
              Browse our knowledge base
            </p>
          </motion.div>

          <motion.div
            className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="bg-gray-100 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
              <Linkedin className="w-6 h-6 text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Connect With Us
            </h3>
            <div className="flex justify-start space-x-6">
              <Link
                href="https://github.com"
                className="text-gray-600 hover:text-gray-900 transition-colors p-2 hover:bg-gray-100 rounded-lg"
              >
                <span className="sr-only">GitHub</span>
                <Github className="w-6 h-6" />
              </Link>
              <Link
                href="https://twitter.com"
                className="text-gray-600 hover:text-gray-900 transition-colors p-2 hover:bg-gray-100 rounded-lg"
              >
                <span className="sr-only">Twitter</span>
                <Twitter className="w-6 h-6" />
              </Link>
              <Link
                href="https://linkedin.com"
                className="text-gray-600 hover:text-gray-900 transition-colors p-2 hover:bg-gray-100 rounded-lg"
              >
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="w-6 h-6" />
              </Link>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Follow us for updates and tips
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
