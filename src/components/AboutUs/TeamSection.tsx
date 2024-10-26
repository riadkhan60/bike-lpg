'use client';
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import {  ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type TeamMemberData = {
  id: number;
  image: string;
  name: string;
  position: string;
  phone: string;
  email: string;
};

const TeamMemberSkeleton = () => (
  <div className="p-6 bg-white rounded-lg shadow-sm w-full h-full">
    <div className="flex flex-col items-center space-y-4">
      <div className="w-[200px] h-[200px] relative">
        <Skeleton className="w-full h-full rounded-full" />
      </div>
      <div className="space-y-2 w-full text-center">
        <Skeleton className="h-6 w-3/4 mx-auto" />
        <Skeleton className="h-4 w-1/2 mx-auto" />
      </div>
    </div>
  </div>
);

const TeamMember = ({
  name,
  role,
  image,
}: {
  name: string;
  role: string;
  image: string;
  phone: string;
  email: string;
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    whileHover={{ y: -5 }}
    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    className="p-6 bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 w-full h-full"
  >
    <div className="flex flex-col items-center h-full">
      <div className="relative w-[200px] h-[200px]">
        {
          !image && <div className="w-full h-full bg-[#f5f5f5] rounded-full" />
        }

        {image && <Image
          src={image}
          alt={name}
          fill
          className="rounded-full object-cover border-4 border-primary/10 group-hover:border-primary/20 transition-all duration-300"
          sizes="200px"
          priority
        />}
        <div>
       </div>
      </div>
      <div className="mt-4 text-center flex-grow flex flex-col justify-center">
        <h3 className="text-xl font-semibold mb-1 text-primary">{name}</h3>
        <p className="text-muted-foreground">{role}</p>
      </div>
    </div>
  </motion.div>
);

const MobileCarousel = ({ members }: { members: TeamMemberData[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="relative w-full px-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          <TeamMember
            name={members[currentIndex].name}
            role={members[currentIndex].position}
            image={members[currentIndex].image}
            phone={members[currentIndex].phone}
            email={members[currentIndex].email}
          />
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center items-center mt-4 gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
          disabled={currentIndex === 0}
          className="rounded-full"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <span className="text-sm text-muted-foreground">
          {currentIndex + 1} / {members.length}
        </span>

        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentIndex((prev) => Math.min(members.length - 1, prev + 1))
          }
          disabled={currentIndex === members.length - 1}
          className="rounded-full"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

const DesktopGrid = ({ members }: { members: TeamMemberData[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(4);
  const [rows, setRows] = useState<TeamMemberData[][]>([]);

  useEffect(() => {
    const handleResize = () => {
      const width = containerRef.current?.offsetWidth || 0;
      let newColumns = 4;
      if (width < 1024) newColumns = 2;
      if (width < 768) newColumns = 1;
      setColumns(newColumns);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const newRows: TeamMemberData[][] = [];
    for (let i = 0; i < members.length; i += columns) {
      newRows.push(members.slice(i, i + columns));
    }
    setRows(newRows);
  }, [members, columns]);

  return (
    <div ref={containerRef} className="w-full">
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={cn(
            'grid gap-8 mb-8 last:mb-0',
            columns === 4 && 'grid-cols-4',
            columns === 2 && 'grid-cols-2',
            columns === 1 && 'grid-cols-1',
          )}
        >
          {row.map((member) => (
            <div
              key={member.id}
              className={cn(
                'flex justify-center',
                row.length < columns && 'col-span-1',
              )}
            >
              <TeamMember
                name={member.name}
                role={member.position}
                image={member.image}
                phone={member.phone}
                email={member.email}
              />
            </div>
          ))}
          {row.length < columns &&
            Array(columns - row.length)
              .fill(0)
              .map((_, index) => (
                <div key={`empty-${index}`} className="col-span-1" />
              ))}
        </div>
      ))}
    </div>
  );
};

const TeamSection = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMemberData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch('/api/team-members');
        const data = await response.json();
        // Add artificial delay to ensure smooth transition
        await new Promise((resolve) => setTimeout(resolve, 300));
        setTeamMembers(data);
      } catch (error) {
        console.error('Error fetching team members:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeamMembers();
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-12"
    >
      <h2 className="text-3xl max-md:text-2xl font-bold text-center text-primary">
        Meet Our Team
      </h2>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="flex justify-center">
                  <TeamMemberSkeleton />
                </div>
              ))}
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {isMobile ? (
              <MobileCarousel members={teamMembers} />
            ) : (
              <DesktopGrid members={teamMembers} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TeamSection;
