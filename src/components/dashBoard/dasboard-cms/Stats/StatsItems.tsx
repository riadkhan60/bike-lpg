'use client';

import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

interface StatsInputProps {
  id: string;
  field: string;
  initialValue: number;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
}

export default function StatsInput({
  id,
  field,
  initialValue,
  label,
  icon,
}: StatsInputProps) {
  const [value, setValue] = useState(initialValue);
  const { toast } = useToast();

  const handleBlur = async () => {
    try {
      const response = await fetch('/api/stats', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          field,
          value,
        }),
      });

      toast({
        title: 'Success',
        description: `Stats ${label} : ${value} updated successfully`,
      })
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
      // Revert to initial value on error
      setValue(initialValue);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={field} className="text-sm inline-flex items-center gap-2 font-medium">
        <span>{icon}</span>
        <span>{label}</span>
      </label>
      <input
        id={field}
        type="number"
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value))}
        onBlur={handleBlur}
        className="border rounded-md p-2"
      />
    </div>
  );
}
