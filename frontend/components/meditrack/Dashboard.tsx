'use client';

import { useState } from 'react';
import { Pill, Clock } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

const Dashboard = () => {
  const [medications, setMedications] = useState([
    { name: 'Lisinopril', mg: '10mg', time: '08:00 AM', taken: false },
    { name: 'Warf 5', mg: '5mg', time: '00:00 AM', taken: true },
    { name: 'Cilacar 10', mg: '10mg', time: '10:00 PM', taken: false },
    { name: 'Eritel CH-40', mg: '40mg', time: '12:00 PM', taken: true },
  ]);

  const toggleTaken = (index: number) => {
    const updated = [...medications];
    updated[index].taken = !updated[index].taken;
    setMedications(updated);
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-blue-50 px-4 py-6">
      <div className="w-full max-w-2xl">
        <div className="bg-blue-600 text-white rounded-xl shadow-lg p-4 mb-4">
          <h1 className="text-xl font-bold">🩺 Medication Dashboard</h1>
          <p className="text-sm opacity-90 mt-1">Track your daily medicines</p>
        </div>

        <div className="space-y-4">
          {medications.map((med, index) => (
            <div
              key={index}
              className="bg-white shadow-sm rounded-xl px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 border border-gray-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                <p className="font-semibold text-gray-800 text-base sm:text-lg">{med.name}</p>
                <div className="flex flex-wrap items-center space-x-3 text-sm text-gray-600 mt-1 sm:mt-0">
                  <span className="flex items-center">
                    <Pill className="w-4 h-4 mr-1 text-blue-500" />
                    {med.mg}
                  </span>
                  <span className="hidden sm:block">|</span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1 text-blue-500" />
                    {med.time}
                  </span>
                </div>
              </div>

              <div className="self-start sm:self-center">
                <Switch
                  checked={med.taken}
                  onCheckedChange={() => toggleTaken(index)}
                  className={cn(
                    'transition-colors',
                    'data-[state=checked]:bg-green-500',
                    'data-[state=unchecked]:bg-amber-500'
                  )}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
