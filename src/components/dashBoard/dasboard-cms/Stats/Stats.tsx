'use client';

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
  { key: 'employees', label: 'Number of Employees', icon: <Users size={16} /> },
  { key: 'dealers', label: 'Number of Dealers', icon: <Building size={16} /> },
  { key: 'clientsServed', label: 'Clients Served', icon: <Globe size={16} /> },
  { key: 'solutions', label: 'Solutions Provided', icon: <Leaf size={16} /> },
  {
    key: 'satiesfiedClients',
    label: 'Satisfied Clients',
    icon: <Heart size={16} />,
  },
  {
    key: 'lpgConversion',
    label: 'LPG Conversions',
    icon: <Settings size={16} />,
  },
  { key: 'fuelstation', label: 'Fuel Stations', icon: <Fuel size={16} /> },
  {
    key: 'furnitureSold',
    label: 'Furniture Sold',
    icon: <HomeIcon size={16} />,
  },
];

export default function StatsPage() {
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
  }, []); // Empty dependency array means this effect runs once on mount

  if (loading) {
    return (
      <div className="p-6">
        <Loader2 className="mr-2 h-10 w-10 animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  if (!stats) {
    return <div className="p-6">No stats available</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Stats Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fields.map(({ key, label, icon }) => (
          <StatsInput
            key={key}
            id={stats.id}
            field={key}
            initialValue={stats[key as keyof Stats] as number}
            label={label}
            icon={icon}
          />
        ))}
      </div>
    </div>
  );
}
