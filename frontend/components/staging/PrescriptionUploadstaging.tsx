'use client'
import { JSX, useState } from 'react';
import { 
  Bell, 
  Calendar, 
  FileText, 
  Settings, 
  Clock, 
  Upload, 
  Check, 
  Home,
  Menu,
  LogOut,
  X
} from 'lucide-react';

// Define TypeScript interfaces
interface User {
  name: string;
  email: string;
  avatar: string;
}

interface Medication {
  id: number;
  name: string;
  dosage: string;
  schedule: string;
  timeOfDay: string;
}

interface FileWithPreview extends File {
  preview?: string;
}

export default function PrescriptionUploadStaging(): JSX.Element {
  const [uploadedFile, setUploadedFile] = useState<FileWithPreview | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  
  // Mock user data
  const user: User = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: '/api/placeholder/40/40'
  };
  
  // Mock medications
  const medications: Medication[] = [
    { id: 1, name: 'Lisinopril', dosage: '10mg', schedule: 'Once daily', timeOfDay: 'Morning' },
    { id: 2, name: 'Metformin', dosage: '500mg', schedule: 'Twice daily', timeOfDay: 'Morning and Evening' },
  ];
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0] as FileWithPreview;
      setUploadedFile(file);
    }
  };
  
  const handleUpload = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (!uploadedFile) return;
    
    setIsUploading(true);
    
    // Simulate API upload
    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccess(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setUploadSuccess(false);
      }, 3000);
    }, 1500);
  };
  
  const toggleMobileMenu = (): void => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-blue-700">
          <div className="flex items-center h-16 flex-shrink-0 px-4 bg-blue-800">
            <h1 className="text-xl font-bold text-white">MedRemind</h1>
          </div>
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <nav className="mt-5 flex-1 px-2 space-y-1">
              <a className="bg-blue-800 text-white group flex items-center px-2 py-2 text-base font-medium rounded-md">
                <Home className="mr-3 h-6 w-6" />
                Dashboard
              </a>
              <a className="text-blue-100 hover:bg-blue-600 group flex items-center px-2 py-2 text-base font-medium rounded-md">
                <Calendar className="mr-3 h-6 w-6" />
                Schedule
              </a>
              <a className="text-blue-100 hover:bg-blue-600 group flex items-center px-2 py-2 text-base font-medium rounded-md">
                <Bell className="mr-3 h-6 w-6" />
                Reminders
              </a>
              <a className="text-blue-100 hover:bg-blue-600 group flex items-center px-2 py-2 text-base font-medium rounded-md">
                <FileText className="mr-3 h-6 w-6" />
                Prescriptions
              </a>
              <a className="text-blue-100 hover:bg-blue-600 group flex items-center px-2 py-2 text-base font-medium rounded-md">
                <Settings className="mr-3 h-6 w-6" />
                Settings
              </a>
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-blue-800 p-4">
            <div className="flex items-center">
              <div>
                <img className="inline-block h-9 w-9 rounded-full" src={user.avatar} alt="" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">{user.name}</p>
                <a className="text-xs text-blue-200 group flex items-center">
                  <LogOut className="mr-1 h-4 w-4" />
                  Sign out
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-10 flex items-center h-16 bg-blue-800 px-4">
        <button onClick={toggleMobileMenu} className="text-white">
          <Menu className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-bold text-white ml-4">MedRemind</h1>
      </div>
      
      {/* Mobile sidebar */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 flex z-40 md:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={toggleMobileMenu}></div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-blue-700">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button onClick={toggleMobileMenu} className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex-shrink-0 flex items-center px-4">
                <h1 className="text-xl font-bold text-white">MedRemind</h1>
              </div>
              <nav className="mt-5 px-2 space-y-1">
                <a className="bg-blue-800 text-white group flex items-center px-2 py-2 text-base font-medium rounded-md">
                  <Home className="mr-3 h-6 w-6" />
                  Dashboard
                </a>
                <a className="text-blue-100 hover:bg-blue-600 group flex items-center px-2 py-2 text-base font-medium rounded-md">
                  <Calendar className="mr-3 h-6 w-6" />
                  Schedule
                </a>
                <a className="text-blue-100 hover:bg-blue-600 group flex items-center px-2 py-2 text-base font-medium rounded-md">
                  <Bell className="mr-3 h-6 w-6" />
                  Reminders
                </a>
                <a className="text-blue-100 hover:bg-blue-600 group flex items-center px-2 py-2 text-base font-medium rounded-md">
                  <FileText className="mr-3 h-6 w-6" />
                  Prescriptions
                </a>
                <a className="text-blue-100 hover:bg-blue-600 group flex items-center px-2 py-2 text-base font-medium rounded-md">
                  <Settings className="mr-3 h-6 w-6" />
                  Settings
                </a>
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-blue-800 p-4">
              <div className="flex items-center">
                <div>
                  <img className="inline-block h-10 w-10 rounded-full" src={user.avatar} alt="" />
                </div>
                <div className="ml-3">
                  <p className="text-base font-medium text-white">{user.name}</p>
                  <a className="text-sm text-blue-200 group flex items-center">
                    <LogOut className="mr-1 h-4 w-4" />
                    Sign out
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 w-14"></div>
        </div>
      )}
      
      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1 pt-16 md:pt-0">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <h1 className="text-2xl font-semibold text-gray-900">Prescription Upload</h1>
            </div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="py-4">
                {/* Upload Prescription Section */}
                <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Upload Prescription</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Upload your doctor's prescription to manage your medications
                    </p>
                  </div>
                  <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                    <div className="space-y-4">
                      <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                              <span>Upload a file</span>
                              <input 
                                id="file-upload" 
                                name="file-upload" 
                                type="file" 
                                className="sr-only" 
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={handleFileChange}
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PDF, PNG, JPG up to 10MB
                          </p>
                        </div>
                      </div>
                      
                      {uploadedFile && (
                        <div className="flex items-center text-sm text-gray-500">
                          <FileText className="h-5 w-5 mr-1 text-gray-400" />
                          <span>{uploadedFile.name}</span>
                        </div>
                      )}
                      
                      {uploadSuccess && (
                        <div className="rounded-md bg-green-50 p-4">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <Check className="h-5 w-5 text-green-400" />
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-green-800">
                                Prescription uploaded successfully!
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <button
                        onClick={handleUpload}
                        disabled={!uploadedFile || isUploading}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                      >
                        {isUploading ? 'Uploading...' : 'Upload Prescription'}
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Current Medications Section */}
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Current Medications</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Your active medication schedule
                    </p>
                  </div>
                  <div className="border-t border-gray-200">
                    <ul className="divide-y divide-gray-200">
                      {medications.map((medication) => (
                        <li key={medication.id} className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                <Clock className="h-6 w-6 text-blue-600" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{medication.name}</div>
                                <div className="text-sm text-gray-500">{medication.dosage} - {medication.schedule}</div>
                              </div>
                            </div>
                            <div className="ml-2 flex-shrink-0 flex">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                {medication.timeOfDay}
                              </span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}