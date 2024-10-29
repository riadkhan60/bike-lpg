'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ReactPlayer from 'react-player';
import { Play } from 'lucide-react';

interface Video {
  id: number;
  title: string;
  thumbnailUrl: string;
  url: string;
}

export default function VideoShowcaseClient({ videos }: { videos: Video[] }) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  return (
    <>
      <div  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
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
                  src={video.thumbnailUrl}
                  alt={video.title}
                  fill
                  className="object-cover"
                />
                <div className=" rounded-full bg-black p-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Play className="text-white" size={30} />
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">{video.title}</h3>
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

const VideoModal = ({
  video,
  onClose,
}: {
  video: Video;
  onClose: () => void;
}) => {
  return (
    <motion.div
      
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 sm:p-6 md:p-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="bg-white rounded-lg w-full max-w-3xl mx-auto overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b">
          <h2 className="text-xl sm:text-2xl font-bold pr-8 break-words">
            {video.title}
          </h2>
        </div>

        {/* Video Container */}
        <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
          <div className="absolute inset-0 left-[2%] p-4 sm:p-6">
            <ReactPlayer
              url={video.url}
              controls
              width="98%"
              height="100%"
              style={{ position: 'absolute', top: 0, left: 0 }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto hover:bg-[#FF9900] bg-black text-white font-bold py-2 px-6 transition-all duration-300 rounded-md text-sm sm:text-base"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
