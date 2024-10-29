import { Suspense } from 'react';
import VideoShowcaseClient from './VideoItem';
import Container from '@/components/LocalUi/container/Container';

async function getVideos() {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    title: `Video ${i + 1}`,
    thumbnail: `https://i.imgur.com/paARHcQ.png`,
    url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  }));
}

export default function VideoShowcase() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <Container>
        <div className=" mx-auto ">
          <h2 className="text-4xl font-bold text-center mb-12">
            Our Video Showcase
          </h2>
          <Suspense fallback={<VideoShowcaseSkeleton />}>
            <VideoShowcaseContent />
          </Suspense>
        </div>
      </Container>
    </section>
  );
}

async function VideoShowcaseContent() {
  const videos = await getVideos();
  return <VideoShowcaseClient videos={videos} />;
}

function VideoShowcaseSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="bg-gray-200 rounded-lg overflow-hidden aspect-video animate-pulse"
        />
      ))}
    </div>
  );
}
