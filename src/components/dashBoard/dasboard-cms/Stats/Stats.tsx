'use client';
import { motion } from 'framer-motion';

import { useEffect, useState } from 'react';
import StatsInput from './StatsItems';
import {
  Building,
  Fuel,
  Globe,
  Heart,
  HomeIcon,
  Leaf,
  Loader2,
  Settings,
  Users,
  
} from 'lucide-react';
import { Card } from '@/components/ui/card';


type Stats = {
  id: string;
  employees: number;
  dealers: number;
  clientsServed: number;
  solutions: number;
  satiesfiedClients: number;
  lpgConversion: number;
  fuelstation: number;
  furnitureSold: number;
};

const fields = [
  {
    key: 'employees',
    label: 'Number of Employees',
    icon: <Users className="text-blue-600" size={20} />,
  },
  {
    key: 'dealers',
    label: 'Number of Dealers',
    icon: <Building className="text-purple-600" size={20} />,
  },
  {
    key: 'clientsServed',
    label: 'Clients Served',
    icon: <Globe className="text-green-600" size={20} />,
  },
  {
    key: 'solutions',
    label: 'Solutions Provided',
    icon: <Leaf className="text-emerald-600" size={20} />,
  },
  {
    key: 'satiesfiedClients',
    label: 'Satisfied Clients',
    icon: <Heart className="text-red-600" size={20} />,
  },
  {
    key: 'lpgConversion',
    label: 'LPG Conversions',
    icon: <Settings className="text-gray-600" size={20} />,
  },
  {
    key: 'fuelstation',
    label: 'Fuel Stations',
    icon: <Fuel className="text-orange-600" size={20} />,
  },
  {
    key: 'furnitureSold',
    label: 'Furniture Sold',
    icon: <HomeIcon className="text-indigo-600" size={20} />,
  },
];

export default function Stats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  

  useEffect(() => {
    async function getStats() {
      try {
        setLoading(true);
        const response = await fetch('/api/stats');
        if (!response.ok) {
          throw new Error('Failed to fetch stats');
        }
        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    }

    getStats();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 flex items-center justify-center"
      >
        <Card className="bg-red-50 border-red-200 p-6">
          <div className="text-red-600 font-medium">Error: {error}</div>
        </Card>
      </motion.div>
    );
  }

  if (!stats) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 flex items-center justify-center"
      >
        <Card className="bg-gray-50 p-6">
          <div className="text-gray-500 font-medium">No stats available</div>
        </Card>
      </motion.div>
    );
  }

  return (
    <div

      className=" max-w-7xl "
    >
      <Card className="p-6">
        <h1
          className="text-2xl font-bold mb-8 text-gray-800  pb-4"
        >
          Stats Dashboard
        </h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {fields.map(({ key, label, icon }, index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <StatsInput
                id={stats.id}
                field={key}
                initialValue={stats[key as keyof Stats] as number}
                label={label}
                icon={icon}
              />
            </motion.div>
          ))}
        </motion.div>
      </Card>
    </div>
  );
}

