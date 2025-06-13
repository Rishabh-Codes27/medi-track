// 'use client';

// import React, { useState } from 'react';
// import { Calendar } from '@/components/ui/calendar';
// import { Card, CardContent } from '@/components/ui/card';
// import { Switch } from '@/components/ui/switch';
// import { Pill, Clock } from 'lucide-react';
// import { cn } from '@/lib/utils';

// type Medication = {
//   name: string;
//   mg: string;
//   time: string;
//   taken: boolean;
// };

// type DailyMeds = {
//   [date: string]: Medication[];
// };

// const initialData: DailyMeds = {
//   '2025-05-17': [
//     { name: 'Lisinopril', mg: '10mg', time: '08:00 AM', taken: true },
//     { name: 'Cilacar 10', mg: '10mg', time: '08:00 PM', taken: false },
//   ],
//   '2025-05-18': [
//     { name: 'Warf 5', mg: '5mg', time: '07:00 AM', taken: true },
//     { name: 'Vitamin D3', mg: '1000 IU', time: '12:00 PM', taken: false },
//     { name: 'Calcium', mg: '500mg', time: '08:00 PM', taken: true },
//   ],
//   '2025-05-19': [
//     { name: 'Paracetamol', mg: '500mg', time: '09:00 AM', taken: false },
//     { name: 'Ibuprofen', mg: '400mg', time: '01:00 PM', taken: false },
//     { name: 'Metformin', mg: '500mg', time: '06:00 PM', taken: true },
//     { name: 'Magnesium', mg: '250mg', time: '09:00 PM', taken: true },
//   ],
// };

// const formatDateKey = (date: Date) => date.toISOString().split('T')[0];

// const CalendarView = () => {
//   const [selectedDate, setSelectedDate] = useState<Date>(new Date());
//   const [medData, setMedData] = useState<DailyMeds>(initialData);

//   const dateKey = formatDateKey(selectedDate);
//   const medsForDate = medData[dateKey] || [];

//   const toggleTaken = (index: number) => {
//     const updatedMeds = [...medsForDate];
//     updatedMeds[index].taken = !updatedMeds[index].taken;
//     setMedData({ ...medData, [dateKey]: updatedMeds });
//   };

//   return (
//     <div className="p-4 max-w-5xl mx-auto">
//       <h1 className="text-2xl font-bold text-blue-800 mb-4">📅 Calendar View</h1>

//       <div className="flex flex-col md:flex-row gap-6">
//         {/* Calendar */}
//         <div className="bg-white rounded-xl p-4 shadow border max-w-sm">
//           <Calendar
//             mode="single"
//             selected={selectedDate}
//             onSelect={(date) => date && setSelectedDate(date)}
//             className="rounded-md border"
//           />
//         </div>

//         {/* Medication Card */}
//         <div className="flex-1">
//           <Card className="bg-blue-600 text-white mb-4">
//             <CardContent className="py-3 px-5">
//               <h2 className="text-lg font-semibold">
//                 Medications on {selectedDate.toDateString()}
//               </h2>
//               <p className="text-sm opacity-80">Total: {medsForDate.length}</p>
//             </CardContent>
//           </Card>

//           {medsForDate.length === 0 ? (
//             <p className="text-gray-500">No medication for this date</p>
//           ) : (
//             medsForDate.map((med, idx) => (
//               <Card key={idx} className="mb-3 border">
//                 <CardContent className="py-4 px-5 flex justify-between items-center">
//                   <div>
//                     <p className="text-lg font-semibold text-gray-800">{med.name}</p>
//                     <div className="flex text-sm text-gray-600 mt-1">
//                       <div className="flex items-center mr-4">
//                         <Pill className="w-4 h-4 mr-1 text-blue-500" />
//                         {med.mg}
//                       </div>
//                       <div className="flex items-center">
//                         <Clock className="w-4 h-4 mr-1 text-blue-500" />
//                         {med.time}
//                       </div>
//                     </div>
//                   </div>

//                   <Switch
//                     checked={med.taken}
//                     onCheckedChange={() => toggleTaken(idx)}
//                     className={cn(
//                       'ml-4 transition-colors',
//                       'data-[state=checked]:bg-green-500',
//                       'data-[state=unchecked]:bg-amber-500'
//                     )}
//                   />
//                 </CardContent>
//               </Card>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CalendarView;


// updated code with API functions

'use client';

import React, { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Pill, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const API_BASE = 'http://localhost:5000/api';
const USER_ID = '6828f7c6792fd21f10b742c0';

type Medication = {
  _id: string;
  user_id: string;
  med_name: string;
  dosage: string;
  time: string;
  frequency: string;
  start_date: string;
  end_date: string;
  notes?: string;
  taken?: boolean; // optional field if you're tracking it locally
};

const CalendarView = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(true);

  const formattedDate = format(selectedDate, 'yyyy-MM-dd');

  const fetchMedsForDate = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/medications?user_id=${USER_ID}&date=${formattedDate}`);
      const data = await res.json();
      if (data.success) {
        setMedications(data.data.map((med: Medication) => ({ ...med, taken: false })));
      }
    } catch (error) {
      console.error('Failed to fetch medications:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleTaken = async (index: number) => {
    const updated = [...medications];
    updated[index].taken = !updated[index].taken;
    setMedications(updated);

    try {
      await fetch(`${API_BASE}/medications/${updated[index]._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          time: updated[index].time,
          dosage: updated[index].dosage,
        }),
      });
    } catch (error) {
      console.error('Failed to update medication:', error);
    }
  };

  useEffect(() => {
    fetchMedsForDate();
  }, [selectedDate]);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-blue-800 mb-4">📅 Calendar View</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Calendar */}
        <div className="bg-white rounded-xl p-4 shadow border max-w-sm">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            className="rounded-md border"
          />
        </div>

        {/* Medication List */}
        <div className="flex-1">
          <Card className="bg-blue-600 text-white mb-4">
            <CardContent className="py-3 px-5">
              <h2 className="text-lg font-semibold">
                Medications on {selectedDate.toDateString()}
              </h2>
              <p className="text-sm opacity-80">Total: {medications.length}</p>
            </CardContent>
          </Card>

          {loading ? (
            <p className="text-gray-500">Loading medications...</p>
          ) : medications.length === 0 ? (
            <p className="text-gray-500">No medications for this date.</p>
          ) : (
            medications.map((med, idx) => (
              <Card key={med._id} className="mb-3 border">
                <CardContent className="py-4 px-5 flex justify-between items-center">
                  <div>
                    <p className="text-lg font-semibold text-gray-800">{med.med_name}</p>
                    <div className="flex text-sm text-gray-600 mt-1">
                      <div className="flex items-center mr-4">
                        <Pill className="w-4 h-4 mr-1 text-blue-500" />
                        {med.dosage}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1 text-blue-500" />
                        {med.time}
                      </div>
                    </div>
                    {med.notes && <p className="text-xs mt-1 text-gray-500">💬 {med.notes}</p>}
                  </div>

                  <Switch
                    checked={med.taken}
                    onCheckedChange={() => toggleTaken(idx)}
                    className={cn(
                      'ml-4 transition-colors',
                      'data-[state=checked]:bg-green-500',
                      'data-[state=unchecked]:bg-amber-500'
                    )}
                  />
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
