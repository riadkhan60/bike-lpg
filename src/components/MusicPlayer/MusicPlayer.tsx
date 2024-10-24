'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AudioPlayerProps {
  audioFile?: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audioFile = '/music.mp3', // Default value
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [initialPlayComplete, setInitialPlayComplete] =
    useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  

  const startInitialPlayback = async (): Promise<void> => {
    if (!audioRef.current) return;

    try {
      await audioRef.current.play();
      setIsPlaying(true);

      // Start fade out after 10 seconds
      setTimeout(() => {
        let volume = 1;
        fadeIntervalRef.current = setInterval(() => {
          if (!audioRef.current) return;

          if (volume <= 0) {
            if (fadeIntervalRef.current) {
              clearInterval(fadeIntervalRef.current);
            }
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            audioRef.current.volume = 1;
            setIsPlaying(false);
            setInitialPlayComplete(true);
            return;
          }

          volume -= 0.1;
          audioRef.current.volume = Math.max(0, volume);
        }, 200);
      }, 5000);
    } catch (error) {
      console.error('Error playing audio:', error);
      setIsPlaying(false);
      setInitialPlayComplete(true);
    }
  };

  const toggleAudio = (): void => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current.volume = 1;
      audioRef.current
        .play()
        .catch((error) => console.error('Error playing audio:', error));
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const initializeAudio = (): void => {
      if (!audioRef.current) {
        const audio = new Audio(audioFile);
        audio.volume = 1;
        audio.loop = true;
        audioRef.current = audio;

        audio.addEventListener('ended', () => {
          if (!initialPlayComplete) {
            setIsPlaying(false);
          }
        });
      }
    };
    initializeAudio();
    startInitialPlayback();

    return () => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [audioFile, initialPlayComplete]); // Added audioFile to dependency array

  if (!initialPlayComplete) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={toggleAudio}
        className="flex items-center gap-2"
        variant={isPlaying ? 'default' : 'outline'}
        type="button"
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-4 h-4" />
            <span>Playing</span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4" />
            <span>Play Music</span>
          </>
        )}
      </Button>
    </div>
  );
};

export default AudioPlayer;
