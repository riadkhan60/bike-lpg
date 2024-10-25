import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { motion } from 'framer-motion';

export default function StatsItem({
  id,
  field,
  initialValue,
  label,
  icon,
}: {
  id: string;
  field: string;
  initialValue: number;
  label: string;
  icon: React.ReactNode;
}) {
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

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      toast({
        title: 'Success',
        description: `${label}: ${value} updated successfully`,
      });
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
      setValue(initialValue);
      toast({
        title: 'Error',
        description: 'Failed to update value',
        variant: 'destructive',
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-50 rounded-lg">{icon}</div>
          <label htmlFor={field} className="font-medium text-gray-700">
            {label}
          </label>
        </div>
        <input
          id={field}
          type="number"
          value={value}
          onChange={(e) => setValue(parseInt(e.target.value) || 0)}
          onBlur={handleBlur}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
        />
      </div>
    </motion.div>
  );
}
