"use client"
import { useState, useEffect } from 'react';

// Define TypeScript interfaces for our data
interface Prescription {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: Date;
  endDate: Date;
  timeOfDay: string[];
  notes: string;
}

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  prescriptions: Prescription[];
}

// Sample prescription data
const SAMPLE_PRESCRIPTIONS: Prescription[] = [
  {
    id: '1',
    name: 'Amoxicillin',
    dosage: '500mg',
    frequency: 'daily',
    startDate: new Date(2025, 4, 15), // May 15, 2025
    endDate: new Date(2025, 4, 25),   // May 25, 2025
    timeOfDay: ['Morning', 'Evening'],
    notes: 'Take with food'
  },
  {
    id: '2',
    name: 'Lisinopril',
    dosage: '10mg',
    frequency: 'daily',
    startDate: new Date(2025, 4, 10), // May 10, 2025
    endDate: new Date(2025, 5, 10),   // June 10, 2025
    timeOfDay: ['Morning'],
    notes: 'Monitor blood pressure'
  },
  {
    id: '3',
    name: 'Vitamin D',
    dosage: '1000 IU',
    frequency: 'daily',
    startDate: new Date(2025, 4, 1),  // May 1, 2025
    endDate: new Date(2025, 6, 31),   // July 31, 2025
    timeOfDay: ['Morning'],
    notes: 'Take with breakfast'
  }
];

// Set current date to May 17, 2025 to match the sample data
const TODAY = new Date(2025, 4, 17);
const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

export default function PrescriptionCalendarDemo() {
  // Use useState but initialize with null/undefined first to avoid hydration mismatch
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [isClient, setIsClient] = useState<boolean>(false);
  
  // Initialize state after component mounts on client
  useEffect(() => {
    setIsClient(true);
    setCurrentDate(TODAY);
    setSelectedDate(TODAY);
    setPrescriptions(SAMPLE_PRESCRIPTIONS);
  }, []);

  const isToday = (date: Date): boolean => {
    if (!date) return false;
    return date.getDate() === TODAY.getDate() && 
           date.getMonth() === TODAY.getMonth() && 
           date.getFullYear() === TODAY.getFullYear();
  };

  const isSameDay = (date1: Date | null, date2: Date | null): boolean => {
    if (!date1 || !date2) return false;
    return date1.getDate() === date2.getDate() && 
           date1.getMonth() === date2.getMonth() && 
           date1.getFullYear() === date2.getFullYear();
  };

  const getPrescriptionsForDate = (date: Date | null): Prescription[] => {
    if (!date || !prescriptions) return [];
    return prescriptions.filter(prescription => {
      if (!prescription.startDate || !prescription.endDate) return false;
      
      const prescriptionDate = new Date(date);
      prescriptionDate.setHours(0, 0, 0, 0);
      
      const startDate = new Date(prescription.startDate);
      startDate.setHours(0, 0, 0, 0);
      
      const endDate = new Date(prescription.endDate);
      endDate.setHours(0, 0, 0, 0);
      
      return prescriptionDate >= startDate && prescriptionDate <= endDate;
    });
  };

  const getCalendarDays = (): CalendarDay[] => {
    if (!currentDate) return [];
    
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    
    const daysFromPrevMonth = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    
    const days: CalendarDay[] = [];
    
    // Previous month days
    for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
      const date = new Date(firstDay);
      date.setDate(date.getDate() - (i + 1));
      days.push({
        date,
        isCurrentMonth: false,
        prescriptions: getPrescriptionsForDate(date)
      });
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      days.push({
        date,
        isCurrentMonth: true,
        prescriptions: getPrescriptionsForDate(date)
      });
    }
    
    // Fill remaining spots in the grid
    const remainingDays = 42 - days.length; // 6 rows * 7 columns
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(lastDay);
      date.setDate(date.getDate() + i);
      days.push({
        date,
        isCurrentMonth: false,
        prescriptions: getPrescriptionsForDate(date)
      });
    }
    
    return days;
  };

  const handleDeletePrescription = (id: string): void => {
    setPrescriptions(prescriptions.filter(p => p.id !== id));
  };

  const selectedDayPrescriptions = selectedDate ? getPrescriptionsForDate(selectedDate) : [];

  // Avoid rendering calendar content until client-side hydration is complete
  if (!isClient) {
    return <div className="bg-white p-6 max-w-6xl mx-auto">Loading calendar...</div>;
  }

  return (
    <div className="bg-white p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">Prescription Calendar</h1>
      
      {/* Calendar Navigation */}
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={() => currentDate && setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
          className="px-3 py-1 border rounded hover:bg-gray-100"
        >
          &larr; Prev
        </button>
        
        <div className="text-xl font-semibold">
          {currentDate ? `${MONTH_NAMES[currentDate.getMonth()]} ${currentDate.getFullYear()}` : ''}
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={() => {
              setCurrentDate(new Date(TODAY.getFullYear(), TODAY.getMonth(), 1));
              setSelectedDate(TODAY);
            }}
            className="px-3 py-1 border rounded hover:bg-gray-100"
          >
            Today
          </button>
          <button 
            onClick={() => currentDate && setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
            className="px-3 py-1 border rounded hover:bg-gray-100"
          >
            Next &rarr;
          </button>
        </div>
      </div>
      
      {/* Calendar Grid */}
      <div className="mb-6">
        {/* Day names header */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {DAY_NAMES.map(day => (
            <div key={day} className="text-center font-semibold py-2 bg-gray-50">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar days grid */}
        <div className="grid grid-cols-7 gap-2">
          {getCalendarDays().map((day, index) => (
            <div 
              key={index}
              onClick={() => setSelectedDate(day.date)}
              className={`
                border rounded-lg p-1 h-24 overflow-hidden cursor-pointer
                ${isToday(day.date) ? 'bg-blue-100 border-blue-500' : ''}
                ${isSameDay(day.date, selectedDate) ? 'bg-blue-200' : ''}
                ${!day.isCurrentMonth ? 'text-gray-400 bg-gray-50' : ''}
              `}
            >
              <div className="text-right font-medium">{day.date.getDate()}</div>
              <div className="mt-1">
                {day.prescriptions.slice(0, 2).map(prescription => (
                  <div key={prescription.id} className="text-xs truncate bg-blue-500 text-white rounded px-1 mb-1">
                    {prescription.name}
                  </div>
                ))}
                {day.prescriptions.length > 2 && (
                  <div className="text-xs text-gray-600">
                    +{day.prescriptions.length - 2} more
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Prescription Details Section */}
      <div className="border rounded-lg p-4 bg-gray-50">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Prescriptions for {selectedDate ? selectedDate.toLocaleDateString() : ''}
          </h2>
          <button 
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Prescription
          </button>
        </div>
        
        {selectedDayPrescriptions.length === 0 ? (
          <p className="text-gray-500">No prescriptions for this date</p>
        ) : (
          <div>
            {selectedDayPrescriptions.map(prescription => (
              <div key={prescription.id} className="mb-4 p-4 border rounded-lg bg-white">
                <div className="flex justify-between">
                  <h3 className="text-lg font-semibold">{prescription.name}</h3>
                  <button 
                    onClick={() => handleDeletePrescription(prescription.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
                <p><strong>Dosage:</strong> {prescription.dosage}</p>
                <p><strong>Frequency:</strong> {prescription.frequency}</p>
                <p><strong>Time of Day:</strong> {prescription.timeOfDay.join(', ')}</p>
                <p><strong>Start Date:</strong> {prescription.startDate ? prescription.startDate.toLocaleDateString() : 'N/A'}</p>
                <p><strong>End Date:</strong> {prescription.endDate ? prescription.endDate.toLocaleDateString() : 'N/A'}</p>
                {prescription.notes && (
                  <p><strong>Notes:</strong> {prescription.notes}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Add Prescription Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add New Prescription</h2>
            
            <div className="mb-4">
              <label className="block mb-1">Medication Name</label>
              <input 
                type="text" 
                className="w-full border rounded p-2"
                placeholder="Enter medication name"
              />
            </div>
            
            <div className="mb-4">
              <label className="block mb-1">Dosage</label>
              <input 
                type="text" 
                className="w-full border rounded p-2"
                placeholder="e.g. 500mg"
              />
            </div>
            
            <div className="mb-4">
              <label className="block mb-1">Frequency</label>
              <select className="w-full border rounded p-2">
                <option value="">Select Frequency</option>
                <option value="daily">Daily</option>
                <option value="twice daily">Twice Daily</option>
                <option value="three times daily">Three Times Daily</option>
                <option value="weekly">Weekly</option>
                <option value="as needed">As Needed</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block mb-1">Time of Day</label>
              <div className="flex flex-wrap gap-2">
                {['Morning', 'Afternoon', 'Evening', 'Bedtime'].map(time => (
                  <label key={time} className="flex items-center">
                    <input type="checkbox" className="mr-1" />
                    {time}
                  </label>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block mb-1">Start Date</label>
              <input type="date" className="w-full border rounded p-2" />
            </div>
            
            <div className="mb-4">
              <label className="block mb-1">End Date</label>
              <input type="date" className="w-full border rounded p-2" />
            </div>
            
            <div className="mb-4">
              <label className="block mb-1">Notes (optional)</label>
              <textarea className="w-full border rounded p-2" rows={3} />
            </div>
            
            <div className="flex justify-end gap-2">
              <button 
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button 
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}