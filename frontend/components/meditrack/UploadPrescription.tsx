// 'use client';

// import React, { useState, useCallback } from 'react';
// import { useDropzone } from 'react-dropzone';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Button } from '@/components/ui/button';
// import { Textarea } from '@/components/ui/textarea';
// import { Card, CardContent } from '@/components/ui/card';
// import { Calendar } from '@/components/ui/calendar';
// import { Switch } from '@/components/ui/switch';
// import { format } from 'date-fns';

// type MedEntry = {
//   name: string;
//   dosage: string;
//   intakeTime: string;
//   notes: string;
//   date: Date;
//   afterFood: boolean;
// };

// const API_BASE  = 'https://your-api-url.com'

// const UploadPrescription = () => {
//   const [files, setFiles] = useState<File[]>([]);
//   const [meds, setMeds] = useState<MedEntry[]>([]);
//   const [form, setForm] = useState<MedEntry>({
//     name: '',
//     dosage: '',
//     intakeTime: '',
//     notes: '',
//     date: new Date(),
//     afterFood: false,
//   });

//   const onDrop = useCallback((acceptedFiles: File[]) => {
//     setFiles((prev) => [...prev, ...acceptedFiles]);
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     accept: {
//       'image/*': [],
//       'application/pdf': [],
//     },
//     onDrop,
//   });

//   const handleAddMed = () => {
//     if (!form.name || !form.dosage || !form.intakeTime) return;
//     setMeds([...meds, form]);
//     setForm({
//       name: '',
//       dosage: '',
//       intakeTime: '',
//       notes: '',
//       date: new Date(),
//       afterFood: false,
//     });
//   };

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-6">
//       <h1 className="text-2xl font-bold text-blue-800 mb-4">📤 Upload Prescription</h1>

//       {/* Upload Box */}
//       <div
//         {...getRootProps()}
//         className="w-full border-dashed border-2 border-blue-400 bg-blue-50 p-6 rounded-lg text-center cursor-pointer mb-6"
//       >
//         <input {...getInputProps()} />
//         {isDragActive ? (
//           <p className="text-blue-700">Drop the files here ...</p>
//         ) : (
//           <p className="text-blue-600">Drag & drop prescription here, or click to browse (PDF/Image)</p>
//         )}
//       </div>

//       {/* File List */}
//       {files.length > 0 && (
//         <div className="mb-6">
//           <h2 className="text-lg font-semibold text-blue-700 mb-2">Uploaded Files</h2>
//           <ul className="list-disc list-inside text-gray-700">
//             {files.map((file, idx) => (
//               <li key={idx}>{file.name}</li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Manual Med Entry */}
//       <Card className="mb-6">
//         <CardContent className="p-4 space-y-4">
//           <h2 className="text-lg font-semibold text-blue-700">Enter Medicine Manually</h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <Label>Medicine Name</Label>
//               <Input
//                 value={form.name}
//                 onChange={(e) => setForm({ ...form, name: e.target.value })}
//                 placeholder="e.g. Amoxicillin"
//               />
//             </div>
//             <div>
//               <Label>Dosage</Label>
//               <Input
//                 value={form.dosage}
//                 onChange={(e) => setForm({ ...form, dosage: e.target.value })}
//                 placeholder="e.g. 500mg"
//               />
//             </div>
//             <div>
//               <Label>Time to Take</Label>
//               <Input
//                 value={form.intakeTime}
//                 onChange={(e) => setForm({ ...form, intakeTime: e.target.value })}
//                 placeholder="e.g. 08:00 AM"
//               />
//             </div>
//             <div>
//               <Label>Date to Start</Label>
//               <Calendar
//                 mode="single"
//                 selected={form.date}
//                 onSelect={(date) => date && setForm({ ...form, date })}
//               />
//             </div>
//             <div className="col-span-1 md:col-span-2">
//               <Label>Notes</Label>
//               <Textarea
//                 value={form.notes}
//                 onChange={(e) => setForm({ ...form, notes: e.target.value })}
//                 placeholder="e.g. Take with food, before bedtime..."
//               />
//             </div>
//             <div className="flex items-center space-x-2">
//               <Switch
//                 checked={form.afterFood}
//                 onCheckedChange={(val) => setForm({ ...form, afterFood: val })}
//                 className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-amber-500"
//               />
//               <Label>{form.afterFood ? 'After food' : 'Before food'}</Label>
//             </div>
//           </div>

//           <Button onClick={handleAddMed} className="bg-blue-600 text-white hover:bg-blue-700">
//             Add Medicine
//           </Button>
//         </CardContent>
//       </Card>

//       {/* Preview */}
//       {meds.length > 0 && (
//         <div className="space-y-4">
//           <h2 className="text-lg font-semibold text-blue-700 mb-2">Medication Preview</h2>
//           {meds.map((med, idx) => (
//             <Card key={idx} className="border">
//               <CardContent className="p-4 space-y-1">
//                 <p><strong>Name:</strong> {med.name}</p>
//                 <p><strong>Dosage:</strong> {med.dosage}</p>
//                 <p><strong>Time:</strong> {med.intakeTime}</p>
//                 <p><strong>Date:</strong> {format(med.date, 'PPP')}</p>
//                 <p><strong>Notes:</strong> {med.notes || '—'}</p>
//                 <p><strong>Intake:</strong> {med.afterFood ? 'After food' : 'Before food'}</p>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default UploadPrescription;

'use client';

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Switch } from '@/components/ui/switch';
import { format } from 'date-fns';
import { Trash2 } from 'lucide-react';

const API_BASE = 'http://localhost:5000/api';
const USER_ID = '6828f7c6792fd21f10b742c0'; // ✅ Your updated user ID

type MedEntry = {
  name: string;
  dosage: string;
  intakeTime: string;
  notes: string;
  date: Date;
  afterFood: boolean;
};

// 🔧 API FUNCTIONS

// Upload PDF/Image prescription
const uploadFiles = async (files: File[]) => {
  const formData = new FormData();
  formData.append('userId', USER_ID);

  files.forEach((file) => {
    formData.append('prescription', file);
  });

  const res = await fetch(`${API_BASE}/prescriptions`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) throw new Error('Failed to upload prescriptions');
  return res.json();
};

// Upload manually entered medication
const saveMedication = async (med: MedEntry) => {
  const payload = {
    userId: USER_ID,
    med_name: med.name,
    dosage: med.dosage,
    time: med.intakeTime,
    frequency: 'daily',
    start_date: med.date.toISOString().split('T')[0],
    end_date: med.date.toISOString().split('T')[0],
    notes: med.notes,
  };

  const res = await fetch(`${API_BASE}/medications`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error('Failed to save manual prescription');
  return res.json();
};

const UploadPrescription = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [meds, setMeds] = useState<MedEntry[]>([]);
  const [form, setForm] = useState<MedEntry>({
    name: '',
    dosage: '',
    intakeTime: '',
    notes: '',
    date: new Date(),
    afterFood: false,
  });

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);

    try {
      await uploadFiles(acceptedFiles);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': [],
      'application/pdf': [],
    },
    onDrop,
  });

  const handleAddMed = async () => {
    if (!form.name || !form.dosage || !form.intakeTime) return;

    const newMed = { ...form };
    setMeds([...meds, newMed]);

    try {
      await saveMedication(newMed);
    } catch (error) {
      console.error(error);
    }

    setForm({
      name: '',
      dosage: '',
      intakeTime: '',
      notes: '',
      date: new Date(),
      afterFood: false,
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-blue-800 mb-4">📤 Upload Prescription</h1>

      {/* Upload Box */}
      <div
        {...getRootProps()}
        className="w-full border-dashed border-2 border-blue-400 bg-blue-50 p-6 rounded-lg text-center cursor-pointer mb-6"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-blue-700">Drop the files here ...</p>
        ) : (
          <p className="text-blue-600">Drag & drop prescription here, or click to browse (PDF/Image)</p>
        )}
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-blue-700 mb-2">Uploaded Files</h2>
          <ul className="list-disc list-inside text-gray-700">
            {files.map((file, idx) => (
              <li key={idx}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Manual Med Entry */}
      <Card className="mb-6">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-blue-700">Enter Medicine Manually</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Medicine Name</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Amoxicillin"
              />
            </div>
            <div>
              <Label>Dosage</Label>
              <Input
                value={form.dosage}
                onChange={(e) => setForm({ ...form, dosage: e.target.value })}
                placeholder="e.g. 500mg"
              />
            </div>
            <div>
              <Label>Time to Take</Label>
              <Input
                value={form.intakeTime}
                onChange={(e) => setForm({ ...form, intakeTime: e.target.value })}
                placeholder="e.g. 08:00"
              />
            </div>
            <div>
              <Label>Date to Start</Label>
              <Calendar
                mode="single"
                selected={form.date}
                onSelect={(date) => date && setForm({ ...form, date })}
              />
            </div>
            <div className="col-span-1 md:col-span-2">
              <Label>Notes</Label>
              <Textarea
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="e.g. Take with food, before bedtime..."
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={form.afterFood}
                onCheckedChange={(val) => setForm({ ...form, afterFood: val })}
                className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-amber-500"
              />
              <Label>{form.afterFood ? 'After food' : 'Before food'}</Label>
            </div>
          </div>

          <Button onClick={handleAddMed} className="bg-blue-600 text-white hover:bg-blue-700">
            Add Medicine
          </Button>
        </CardContent>
      </Card>

      {/* Preview */}
      {meds.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-blue-700 mb-2">Medication Preview</h2>
          {meds.map((med, idx) => (
            <Card key={idx} className="border">
              <CardContent className="p-4 space-y-1">
                <p><strong>Name:</strong> {med.name}</p>
                <p><strong>Dosage:</strong> {med.dosage}</p>
                <p><strong>Time:</strong> {med.intakeTime}</p>
                <p><strong>Date:</strong> {format(med.date, 'PPP')}</p>
                <p><strong>Notes:</strong> {med.notes || '—'}</p>
                <p><strong>Intake:</strong> {med.afterFood ? 'After food' : 'Before food'}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadPrescription;
