'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTitle,
  AlertDialogDescription,
} from '@/components/ui/alert-dialog';
import { Trash2 } from 'lucide-react';

const Account = () => {
  const [prescriptions, setPrescriptions] = useState<string[]>([
    'BloodPressure_Report.pdf',
    'Prescription_March.jpg',
    'Cholesterol_Checkup.pdf',
  ]);

  const user = {
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
  };

  const deletePrescription = (fileName: string) => {
    setPrescriptions(prescriptions.filter((file) => file !== fileName));
  };

  const deleteAccount = () => {
    // Handle actual account deletion
    alert('Account deleted (mock)');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-blue-800 mb-4">👤 Account</h1>

      {/* User Info */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <p className="text-lg font-semibold text-gray-800">{user.name}</p>
          <p className="text-sm text-gray-600">{user.email}</p>
        </CardContent>
      </Card>

      {/* Uploaded Prescriptions */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold text-blue-700 mb-2">📄 Uploaded Prescriptions</h2>
          {prescriptions.length === 0 ? (
            <p className="text-sm text-gray-500">No uploaded prescriptions</p>
          ) : (
            <ul className="space-y-3">
              {prescriptions.map((file, index) => (
                <li
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-blue-50 px-3 py-2 rounded-md text-sm border"
                >
                  <span className="text-gray-700 break-all">{file}</span>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="mt-2 sm:mt-0 w-full sm:w-auto"
                    onClick={() => deletePrescription(file)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {/* Delete Account */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" className="w-full sm:w-auto">
            Delete Account
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete your account and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteAccount}>Yes, delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Account;
