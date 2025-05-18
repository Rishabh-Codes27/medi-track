"use client"
import { JSX, useState } from 'react';
import { 
  Camera, X, CheckCircle, AlertCircle, Clock, Calendar, Settings, 
  ChevronRight, Bell, History, User, PlusCircle, Pill, ArrowLeft
} from 'lucide-react';

// Define TypeScript interfaces for our data structures
interface Medication {
  id: number;
  name: string;
  dosage: string;
  time: string;
  taken: boolean;
  image: string;
}

interface AdherenceData {
  day: string;
  percentage: number;
}

interface NewMedicationForm {
  name: string;
  dosage: string;
  frequency: string;
  time: string;
}

export default function MedicationVerificationSystem(): JSX.Element {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [medications, setMedications] = useState<Medication[]>([
    { id: 1, name: 'Lisinopril', dosage: '10mg', time: '8:00 AM', taken: false, image: '/api/placeholder/80/80' },
    { id: 2, name: 'Metformin', dosage: '500mg', time: '1:00 PM', taken: true, image: '/api/placeholder/80/80' },
    { id: 3, name: 'Atorvastatin', dosage: '20mg', time: '8:00 PM', taken: false, image: '/api/placeholder/80/80' }
  ]);
  
  const [adherenceData, setAdherenceData] = useState<AdherenceData[]>([
    { day: 'Mon', percentage: 100 },
    { day: 'Tue', percentage: 100 },
    { day: 'Wed', percentage: 67 },
    { day: 'Thu', percentage: 100 },
    { day: 'Fri', percentage: 67 },
    { day: 'Sat', percentage: 33 },
    { day: 'Sun', percentage: 67 }
  ]);

  const [newMedication, setNewMedication] = useState<NewMedicationForm>({
    name: '',
    dosage: '',
    frequency: 'Once a day',
    time: '08:00'
  });

  const [verifying, setVerifying] = useState<boolean>(false);
  const [verified, setVerified] = useState<boolean>(false);
  const [activeMed, setActiveMed] = useState<number | null>(null);

  const markAsTaken = (id: number): void => {
    setMedications(meds => meds.map(med => 
      med.id === id ? {...med, taken: true} : med
    ));
  };

  const handleVerification = (medId: number): void => {
    setActiveMed(medId);
    setCameraActive(true);
  };

  const captureImage = (): void => {
    setVerifying(true);
    
    // Simulate verification process
    setTimeout(() => {
      setVerifying(false);
      setVerified(true);
      
      setTimeout(() => {
        setCameraActive(false);
        setVerified(false);
        if (activeMed !== null) {
          markAsTaken(activeMed);
        }
      }, 1500);
    }, 2000);
  };

  const handleInputChange = (field: keyof NewMedicationForm, value: string): void => {
    setNewMedication({
      ...newMedication,
      [field]: value
    });
  };

  const addMedication = (): void => {
    if (!newMedication.name || !newMedication.dosage) return;
    
    const newMed: Medication = {
      id: medications.length + 1,
      name: newMedication.name,
      dosage: newMedication.dosage,
      time: new Date(`2025-05-17T${newMedication.time}`).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      }),
      taken: false,
      image: '/api/placeholder/80/80'
    };
    
    setMedications([...medications, newMed]);
    setActiveTab('home');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        {activeTab !== 'home' ? (
          <button 
            className="p-1 rounded-full" 
            onClick={() => setActiveTab('home')}
          >
            <ArrowLeft size={24} />
          </button>
        ) : (
          <div className="font-bold text-xl">MedTrack</div>
        )}
        
        <div className="flex items-center space-x-2">
          <button className="p-1 rounded-full">
            <Bell size={24} />
          </button>
          <button 
            className="p-1 rounded-full"
            onClick={() => setActiveTab('settings')}
          >
            <Settings size={24} />
          </button>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {activeTab === 'home' && (
          <div className="p-4">
            {/* Today's medications */}
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-3 text-gray-800">Today's Medications</h2>
              <div className="space-y-3">
                {medications.map(med => (
                  <div 
                    key={med.id} 
                    className={`bg-white rounded-lg p-4 shadow flex items-center justify-between ${med.taken ? 'border-l-4 border-green-500' : 'border-l-4 border-yellow-500'}`}
                  >
                    <div className="flex items-center">
                      <img src={med.image} alt={med.name} className="w-12 h-12 rounded-md object-cover mr-4" />
                      <div>
                        <h3 className="font-semibold text-gray-800">{med.name}</h3>
                        <div className="flex items-center text-sm text-gray-600">
                          <Pill size={14} className="mr-1" />
                          <span>{med.dosage}</span>
                          <span className="mx-2">•</span>
                          <Clock size={14} className="mr-1" />
                          <span>{med.time}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      {med.taken ? (
                        <div className="bg-green-100 text-green-800 py-1 px-3 rounded-full flex items-center">
                          <CheckCircle size={16} className="mr-1" />
                          <span>Taken</span>
                        </div>
                      ) : (
                        <button 
                          className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                          onClick={() => handleVerification(med.id)}
                        >
                          Verify
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Weekly adherence */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-bold text-gray-800">Weekly Adherence</h2>
                <button 
                  className="text-blue-600 flex items-center"
                  onClick={() => setActiveTab('history')}
                >
                  View all <ChevronRight size={16} />
                </button>
              </div>
              
              <div className="bg-white rounded-lg p-4 shadow">
                <div className="flex justify-between items-end h-32">
                  {adherenceData.map((day, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="flex-1 w-8 flex items-end">
                        <div 
                          className={`w-full rounded-t-sm ${day.percentage === 100 ? 'bg-green-500' : day.percentage >= 67 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                          style={{ height: `${day.percentage}%` }}
                        />
                      </div>
                      <div className="mt-2 text-gray-600 text-sm">{day.day}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Quick actions */}
            <div>
              <h2 className="text-xl font-bold mb-3 text-gray-800">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  className="bg-white p-4 rounded-lg shadow flex items-center justify-center text-blue-600"
                  onClick={() => setActiveTab('add')}
                >
                  <PlusCircle size={20} className="mr-2" />
                  Add Medication
                </button>
                <button 
                  className="bg-white p-4 rounded-lg shadow flex items-center justify-center text-blue-600"
                  onClick={() => setActiveTab('profile')}
                >
                  <User size={20} className="mr-2" />
                  My Profile
                </button>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'history' && (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Medication History</h2>
            
            <div className="space-y-4">
              {['May 16', 'May 15', 'May 14', 'May 13'].map((date, index) => (
                <div key={index} className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="p-3 bg-gray-100 font-medium">{date}</div>
                  <div className="p-3 space-y-2">
                    {medications.map((med, idx) => (
                      <div key={`${index}-${idx}`} className="flex items-center justify-between py-2 border-b last:border-0">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-2 ${(index === 0 && idx === 2) || (index === 1 && idx === 0) ? 'bg-red-500' : 'bg-green-500'}`}></div>
                          <span>{med.name} - {med.time}</span>
                        </div>
                        <div className={`text-sm ${(index === 0 && idx === 2) || (index === 1 && idx === 0) ? 'text-red-500' : 'text-green-500'}`}>
                          {(index === 0 && idx === 2) || (index === 1 && idx === 0) ? 'Missed' : 'Taken'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Settings</h2>
            
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="divide-y">
                <div className="p-4 flex justify-between items-center">
                  <div>Notifications</div>
                  <div className="w-12 h-6 bg-blue-500 rounded-full relative cursor-pointer">
                    <div className="w-5 h-5 bg-white rounded-full absolute right-1 top-0.5"></div>
                  </div>
                </div>
                
                <div className="p-4 flex justify-between items-center">
                  <div>Face verification</div>
                  <div className="w-12 h-6 bg-blue-500 rounded-full relative cursor-pointer">
                    <div className="w-5 h-5 bg-white rounded-full absolute right-1 top-0.5"></div>
                  </div>
                </div>
                
                <div className="p-4 flex justify-between items-center">
                  <div>Share data with doctor</div>
                  <div className="w-12 h-6 bg-gray-300 rounded-full relative cursor-pointer">
                    <div className="w-5 h-5 bg-white rounded-full absolute left-1 top-0.5"></div>
                  </div>
                </div>
                
                <div className="p-4 flex justify-between items-center">
                  <div>Dark Mode</div>
                  <div className="w-12 h-6 bg-gray-300 rounded-full relative cursor-pointer">
                    <div className="w-5 h-5 bg-white rounded-full absolute left-1 top-0.5"></div>
                  </div>
                </div>
                
                <div className="p-4">
                  <button className="text-red-500">Log out</button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'profile' && (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4 text-gray-800">My Profile</h2>
            
            <div className="bg-white rounded-lg shadow p-4 mb-4">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <User size={32} className="text-blue-600" />
                </div>
                <div className="ml-3">
                  <h3 className="font-bold">John Smith</h3>
                  <p className="text-gray-600 text-sm">Patient ID: 12345678</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Email:</span>
                  <span>john.smith@example.com</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Phone:</span>
                  <span>(555) 123-4567</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Date of Birth:</span>
                  <span>Jun 12, 1978</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-bold mb-3">Emergency Contacts</h3>
              
              <div className="space-y-3">
                <div className="border-b pb-2">
                  <div className="font-medium">Sarah Smith (Spouse)</div>
                  <div className="text-gray-600 text-sm">(555) 987-6543</div>
                </div>
                
                <div>
                  <div className="font-medium">Dr. Michael Johnson</div>
                  <div className="text-gray-600 text-sm">(555) 246-8101</div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'add' && (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Add New Medication</h2>
            
            <div className="bg-white rounded-lg shadow p-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-1 text-sm font-medium">Medication Name</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    placeholder="Enter medication name"
                    value={newMedication.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-1 text-sm font-medium">Dosage</label>
                  <input 
                    type="text"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    placeholder="e.g. 10mg"
                    value={newMedication.dosage}
                    onChange={(e) => handleInputChange('dosage', e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-1 text-sm font-medium">Frequency</label>
                  <select 
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newMedication.frequency}
                    onChange={(e) => handleInputChange('frequency', e.target.value)}
                  >
                    <option>Once a day</option>
                    <option>Twice a day</option>
                    <option>Three times a day</option>
                    <option>Every other day</option>
                    <option>Weekly</option>
                    <option>As needed</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-1 text-sm font-medium">Time</label>
                  <input 
                    type="time" 
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newMedication.time}
                    onChange={(e) => handleInputChange('time', e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-1 text-sm font-medium">Add Photo of Medication</label>
                  <button type="button" className="w-full p-8 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500">
                    <Camera size={32} className="mb-2" />
                    <span>Take or upload photo</span>
                  </button>
                </div>
                
                <div className="pt-4">
                  <button 
                    type="button" 
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium"
                    onClick={addMedication}
                  >
                    Add Medication
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      {/* Camera overlay */}
      {cameraActive && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          <div className="p-4 flex justify-between items-center">
            <button 
              className="p-2 rounded-full bg-black/50 text-white"
              onClick={() => {
                setCameraActive(false);
                setVerifying(false);
                setVerified(false);
              }}
            >
              <X size={24} />
            </button>
            
            <div className="text-white font-medium">Verify Medication</div>
            
            <div className="w-8"></div>
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="relative flex-1 w-full">
              <img 
                src="/api/placeholder/375/400" 
                alt="Camera feed" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              {!verifying && !verified && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 border-2 border-white rounded-lg opacity-70"></div>
                </div>
              )}
              
              {verifying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                  <div className="text-white flex flex-col items-center">
                    <div className="animate-spin h-10 w-10 border-4 border-white border-t-transparent rounded-full mb-4"></div>
                    <div>Verifying medication...</div>
                  </div>
                </div>
              )}
              
              {verified && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                  <div className="text-white flex flex-col items-center">
                    <CheckCircle size={48} className="text-green-500 mb-4" />
                    <div className="text-xl font-bold mb-1">Verified!</div>
                    <div>Medication intake confirmed</div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="p-8 flex justify-center">
            {!verifying && !verified && (
              <button 
                className="w-16 h-16 bg-white rounded-full flex items-center justify-center"
                onClick={captureImage}
              >
                <div className="w-14 h-14 bg-white border-2 border-gray-300 rounded-full"></div>
              </button>
            )}
          </div>
        </div>
      )}
      
      {/* Navigation */}
      <nav className="bg-white border-t border-gray-200">
        <div className="flex justify-around p-3">
          <button 
            className={`flex flex-col items-center ${activeTab === 'home' ? 'text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('home')}
          >
            <Pill size={24} />
            <span className="text-xs mt-1">Home</span>
          </button>
          
          <button 
            className={`flex flex-col items-center ${activeTab === 'history' ? 'text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('history')}
          >
            <History size={24} />
            <span className="text-xs mt-1">History</span>
          </button>
          
          <button 
            className={`flex flex-col items-center ${activeTab === 'profile' ? 'text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('profile')}
          >
            <User size={24} />
            <span className="text-xs mt-1">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
}