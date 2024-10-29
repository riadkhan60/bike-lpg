'use client';
import { useEffect, useState } from 'react';
import VideoShowcaseClient from './VideoItem';
import Container from '@/components/LocalUi/container/Container';
import { Skeleton } from '@/components/ui/skeleton';

interface Video {
  id: number;
  title: string;
  thumbnailUrl: string;
  url: string;
}
export default function VideoShowcase() {
  return (
    <section
      id="videos"
      className="py-16 bg-gradient-to-b from-gray-50 to-white"
    >
      <Container>
        <div className=" mx-auto ">
          <h2 className="text-4xl font-bold text-center mb-12">
            Our Video Showcase
          </h2>

          <VideoShowcaseContent />
        </div>
      </Container>
    </section>
  );
}

function VideoShowcaseContent() {
  const [videos, setVideos] = useState<Video[]>([]);
  useEffect(() => {
    async function getVideos() {
      const response = await fetch('/api/cms');
      const data = await response.json();
      setVideos(data.videoLinks);
    }

    getVideos();
  }, []);

  if (videos.length === 0) {
    return <VideoShowcaseSkeleton />;
  }
  return <VideoShowcaseClient videos={videos} />;
}

function VideoShowcaseSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md">
          {/* Thumbnail skeleton */}
          <div className="relative w-full h-[250px]">
            <Skeleton className="absolute inset-0" />
          </div>

          {/* Title skeleton */}
          <div className="p-4">
            <Skeleton className="h-6 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
}
