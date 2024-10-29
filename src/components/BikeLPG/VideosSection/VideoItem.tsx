'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Video {
  id: number;
  title: string;
  thumbnail: string;
  url: string;
}

export default function VideoShowcaseClient({ videos }: { videos: Video[] }) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
        {videos.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer"
            onClick={() => setSelectedVideo(video)}
          >
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative w-full h-[250px]">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">
                  {video.title}
                </h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </>
  );
}

function VideoModal({ video, onClose }: { video: Video; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="bg-white rounded-lg p-4 max-w-3xl w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4">{video.title}</h2>
        <div className="aspect-w-16 aspect-h-9 mb-4">
          <video
            src={video.url}
            controls
            className="w-full h-full object-cover rounded"
          />
        </div>
        <button
          onClick={onClose}
          className=" hover:bg-[#FF9900] bg-black text-white font-bold py-2 px-4 transition-all duration-300 rounded-md"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
}
