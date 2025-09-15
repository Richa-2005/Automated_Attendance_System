import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Users, 
  BarChart3, 
  Calendar, 
  GraduationCap, 
  QrCode, 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  ChevronLeft, 
  ChevronRight, 
  User, 
  Building2, 
  BookOpen, 
  Activity,
  Eye,
  Camera,
  Fingerprint,
  Navigation,
  Award,
  MapPin as Location,
  Phone,
  Mail
} from 'lucide-react';
import QRCodeScanner from './components/QRCodeGenerator.jsx'; // Assuming it's in the same folder
import BiometricAuth from './components/BiometricAuth.jsx'; // Assuming it's in the same folder

// --- QR Code Generator Component ---
// This can also be moved to its own file if you like
const QRCodeGenerator = ({ classInfo, refreshRate = 5000 }) => {
  const [qrValue, setQrValue] = useState('');
  const qrRef = useRef(null);

  useEffect(() => {
    const generateQrValue = () => {
      const timestamp = Date.now();
      const data = JSON.stringify({
        classId: classInfo?.id || 'default-class-id',
        subject: classInfo?.subject || 'default-subject',
        timestamp: timestamp,
      });
      setQrValue(data);
    };
    generateQrValue();
    const intervalId = setInterval(generateQrValue, refreshRate);
    return () => clearInterval(intervalId);
  }, [classInfo, refreshRate]);

  useEffect(() => {
    if (qrValue && qrRef.current && typeof QRCode !== 'undefined') {
        qrRef.current.innerHTML = '';
        new QRCode(qrRef.current, {
            text: qrValue,
            width: 192,
            height: 192,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });
    }
  }, [qrValue]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-inner flex items-center justify-center w-[224px] h-[224px]">
      <div ref={qrRef} />
    </div>
  );
};

// Mock Data
const mockUniversity = {
  name: "Stanford University",
  dean: "Dr. Sarah Johnson",
  established: 1885,
  location: "California, USA",
  address: "450 Serra Mall, Stanford, CA 94305",
  accreditation: "WASC Senior College and University Commission",
  totalStudents: 17249,
  totalFaculty: 2240,
  phone: "+1 (650) 723-2300",
  email: "info@stanford.edu",
  website: "www.stanford.edu"
};

const mockDepartments = [
  { id: 1, name: "Computer Science", faculty: 12, students: 450 },
  { id: 2, name: "Electrical Engineering", faculty: 8, students: 320 },
  { id: 3, name: "Mechanical Engineering", faculty: 10, students: 380 },
  { id: 4, name: "Business Administration", faculty: 15, students: 600 }
];

const mockFaculty = {
  1: [
    { id: 1, name: "Dr. John Smith", joined: 2018, photo: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150", qualification: "Ph.D. in Computer Science", role: "Associate Professor", subjects: ["Data Structures", "Algorithms", "Database Systems"] },
    { id: 2, name: "Dr. Emily Davis", joined: 2020, photo: "https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=150", qualification: "Ph.D. in Software Engineering", role: "Assistant Professor", subjects: ["Web Development", "Software Engineering", "Mobile App Development"] },
    { id: 3, name: "Prof. Michael Chen", joined: 2019, photo: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150", qualification: "Ph.D. in Artificial Intelligence", role: "Professor & HOD", subjects: ["Machine Learning", "Artificial Intelligence", "Deep Learning"] }
  ]
};

const mockPrograms = [
  { id: 1, name: "B.Tech Computer Science", sections: ["A", "B", "C"], totalStudents: 180 },
  { id: 2, name: "M.Tech Software Engineering", sections: ["A", "B"], totalStudents: 80 },
  { id: 3, name: "MBA Technology Management", sections: ["A"], totalStudents: 40 }
];

const mockStudents = {
  "1-A": [ { id: 1, name: "Alex Johnson", rollNo: "CS001", attendance: 85, photo: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150", admissionNo: "ADM2023001", admissionYear: 2023, degree: "B.Tech", department: "Computer Science", semester: "6th Semester", courseName: "Computer Science and Engineering", college: "Stanford University", curriculumPlan: "2023-2027 Curriculum", studentStatus: "Active", subjectAttendance: { "Data Structures": 88, "Algorithms": 82, "Database Systems": 90, "Web Development": 80 } }, { id: 2, name: "Sarah Wilson", rollNo: "CS002", attendance: 92, photo: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150", admissionNo: "ADM2023002", admissionYear: 2023, degree: "B.Tech", department: "Computer Science", semester: "6th Semester", courseName: "Computer Science and Engineering", college: "Stanford University", curriculumPlan: "2023-2027 Curriculum", studentStatus: "Active", subjectAttendance: { "Data Structures": 95, "Algorithms": 90, "Database Systems": 94, "Web Development": 89 } }, { id: 3, name: "David Brown", rollNo: "CS003", attendance: 68, photo: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150", admissionNo: "ADM2023003", admissionYear: 2023, degree: "B.Tech", department: "Computer Science", semester: "6th Semester", courseName: "Computer Science and Engineering", college: "Stanford University", curriculumPlan: "2023-2027 Curriculum", studentStatus: "Active", subjectAttendance: { "Data Structures": 70, "Algorithms": 65, "Database Systems": 72, "Web Development": 66 } } ],
  "1-B": [ { id: 4, name: "Emma Davis", rollNo: "CS004", attendance: 78, photo: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150", admissionNo: "ADM2023004", admissionYear: 2023, degree: "B.Tech", department: "Computer Science", semester: "6th Semester", courseName: "Computer Science and Engineering", college: "Stanford University", curriculumPlan: "2023-2027 Curriculum", studentStatus: "Active", subjectAttendance: { "Web Development": 80, "Software Engineering": 76, "Mobile App Development": 78, "Computer Networks": 77 } }, { id: 5, name: "James Wilson", rollNo: "CS005", attendance: 72, photo: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150", admissionNo: "ADM2023005", admissionYear: 2023, degree: "B.Tech", department: "Computer Science", semester: "6th Semester", courseName: "Computer Science and Engineering", college: "Stanford University", curriculumPlan: "2023-2027 Curriculum", studentStatus: "Active", subjectAttendance: { "Web Development": 74, "Software Engineering": 70, "Mobile App Development": 73, "Computer Networks": 71 } } ],
  "1-C": [ { id: 6, name: "Lisa Chen", rollNo: "CS006", attendance: 89, photo: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150", admissionNo: "ADM2023006", admissionYear: 2023, degree: "B.Tech", department: "Computer Science", semester: "6th Semester", courseName: "Computer Science and Engineering", college: "Stanford University", curriculumPlan: "2023-2027 Curriculum", studentStatus: "Active", subjectAttendance: { "Machine Learning": 92, "Artificial Intelligence": 87, "Deep Learning": 90, "Data Mining": 88 } } ]
};

const generateWeeklySchedule = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = ['09:00-10:00', '10:00-11:00', '11:00-12:00', '14:00-15:00'];
  const subjects = ['Data Structures', 'Algorithms', 'Database Systems', 'Web Development'];
  const schedule = {};
  days.forEach(day => {
    schedule[day] = timeSlots.map((time, index) => ({ id: `${day}-${index}`, subject: subjects[index], time: time, room: `Room ${101 + index}`, professor: 'Dr. John Smith' }));
  });
  return schedule;
};

const mockSchedule = generateWeeklySchedule();

const colors = { primaryBlue: 'bg-[#647FBC]', secondaryBlue: 'bg-[#91ADC8]', lightTeal: 'bg-[#AED6CF]', lightYellow: 'bg-[#FAFDD6]', primaryBlueBorder: 'border-[#647FBC]', primaryBlueText: 'text-[#647FBC]', primaryBlueHover: 'hover:bg-[#647FBC]' };

// Login Page Component
const LoginPage = ({ onLogin, showSignup, toggleSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Student');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(role, email);
  };

  const features = [
    { icon: Users, title: "User Management", desc: "Comprehensive role-based access control" },
    { icon: QrCode, title: "Smart Attendance", desc: "QR code and biometric verification" },
    { icon: BarChart3, title: "Analytics Dashboard", desc: "Real-time attendance insights" },
    { icon: BookOpen, title: "Course Integration", desc: "Seamless academic management" }
  ];

  if (showSignup) {
    return (
      <div className="min-h-screen flex">
        <div className={`flex-1 ${colors.lightTeal} p-12 flex flex-col justify-center`}>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Join ClassSync</h1>
          <p className="text-gray-600 mb-8">Create your account to get started with modern attendance management.</p>
          
          <div className="grid grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <feature.icon className={`w-8 h-8 ${colors.primaryBlueText} mb-3`} />
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-8">
          <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
            <h2 className="text-3xl font-bold text-center mb-8">Create Account</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <input type="text" placeholder="Full Name" className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#647FBC]" required />
              <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#647FBC]" required />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#647FBC]" required />
              <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#647FBC]">
                <option>Student</option>
                <option>Professor</option>
                <option>Admin</option>
              </select>
              <button type="submit" className={`w-full ${colors.primaryBlue} text-white p-4 rounded-lg font-semibold hover:bg-[#5a73a8] transition-colors`}> Create Account </button>
            </form>

            <p className="text-center mt-6 text-gray-600">
              Already have an account?{' '}
              <button onClick={toggleSignup} className={`${colors.primaryBlueText} hover:underline font-semibold`}> Sign In </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      <div className={`flex-1 ${colors.lightTeal} p-12 flex flex-col justify-center`}>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Modern University Attendance Management</h1>
        <p className="text-gray-600 mb-8">Streamline your educational experience with intelligent attendance tracking and comprehensive analytics.</p>
        <div className="grid grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <feature.icon className={`w-8 h-8 ${colors.primaryBlueText} mb-3`} />
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-8">Welcome Back</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#647FBC]" required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#647FBC]" required />
            <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#647FBC]">
              <option>Student</option>
              <option>Professor</option>
              <option>Admin</option>
            </select>
            <button type="submit" className={`w-full ${colors.primaryBlue} text-white p-4 rounded-lg font-semibold hover:bg-[#5a73a8] transition-colors`}> Sign In </button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Don't have an account?{' '}
            <button onClick={toggleSignup} className={`${colors.primaryBlueText} hover:underline font-semibold`}> Sign Up </button>
          </p>
        </div>
      </div>
    </div>
  );
};

// Sidebar Component
const Sidebar = ({ activeView, setActiveView, items, userRole }) => {
  return (
    <div className={`w-64 ${colors.primaryBlue} text-white p-6 min-h-screen`}>
      <div className="mb-8">
        <h2 className="text-xl font-bold">ClassSync</h2>
        <p className="text-sm opacity-75">{userRole}</p>
      </div>
      <nav className="space-y-2">
        {items.map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveView(item.key)}
            className={`w-full text-left p-3 rounded-lg flex items-center space-x-3 transition-colors ${
              activeView === item.key ? 'bg-white/20' : 'hover:bg-white/10'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

// Bar Chart Component
const BarChart = ({ data, title }) => {
  const maxValue = data.length > 0 ? Math.max(...data.map(d => d.value)) : 0;
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="w-32 text-sm truncate">{item.label}</div>
            <div className="flex-1 bg-gray-200 rounded-full h-4 relative">
              <div
                className={`${colors.primaryBlue} h-4 rounded-full transition-all duration-500`}
                style={{ width: `${maxValue > 0 ? (item.value / maxValue) * 100 : 0}%` }}
              />
            </div>
            <div className="w-12 text-sm text-gray-600">{item.value}%</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// QR Modal Component for Professor
const QRModal = ({ isOpen, onClose, onEndSession, classInfo }) => {
  const [timeLeft, setTimeLeft] = useState(300);
  useEffect(() => {
    if (!isOpen) { setTimeLeft(300); return; }
    if (timeLeft === 0) { onEndSession(); return; }
    const timerId = setInterval(() => { setTimeLeft((prevTime) => prevTime - 1); }, 1000);
    return () => clearInterval(timerId);
  }, [isOpen, timeLeft, onEndSession]);

  if (!isOpen) return null;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-center mb-6">Attendance QR Code</h2>
        <div className="flex justify-center mb-6"> <QRCodeGenerator classInfo={classInfo} /> </div>
        <div className="text-center mb-6">
          <p className="text-gray-600 mb-2">Session ends in: {minutes}:{seconds.toString().padStart(2, '0')}</p>
          <p className="text-sm text-gray-500">QR code refreshes every 5 seconds</p>
        </div>
        <div className="flex space-x-3">
          <button onClick={onEndSession} className="flex-1 bg-green-600 text-white p-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"> End Session </button>
          <button onClick={onClose} className="flex-1 bg-gray-600 text-white p-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"> Cancel </button>
        </div>
      </div>
    </div>
  );
};
//for going to next step only
// Check-in Modal for Students
const CheckInModal = ({ isOpen, onClose, className }) => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [scanError, setScanError] = useState(null);

  const advanceStep = useCallback((nextStep) => {
    setIsLoading(true);
    setScanError(null); // Clear previous errors
    setTimeout(() => {
      setIsLoading(false);
      setStep(nextStep);
    }, 500); // Shortened delay for smoother transition
  }, []);

  const handleScanSuccess = useCallback((data) => {
    console.log("QR Scan Attempt:", data);
    try {
      const qrData = JSON.parse(data);
      const now = Date.now();
      if (qrData.subject === className && (now - qrData.timestamp < 15000)) {
        console.log("QR Validation Successful!");
        advanceStep(3);
      } else {
        setScanError("Invalid or expired QR code. Please try again.");
      }
    } catch (e) {
      setScanError("Not a valid class QR code.");
    }
  }, [advanceStep, className]);
  
  const handleBiometricSuccess = useCallback(() => {
    console.log("Biometric validation successful!");
    advanceStep(4);
  }, [advanceStep]);

  const handleClose = () => {
    setStep(1);
    setScanError(null);
    onClose();
  };

  if (!isOpen) return null;

  const steps = [
    { title: "Location Verification", icon: Navigation, content: <p className="text-center text-gray-600">Verifying your location to ensure you are on campus.</p>, actionText: "Verify Location", action: () => advanceStep(2) },
    { 
      title: "QR Code Scanning", 
      icon: QrCode, 
      content: ( 
        <div> 
          <QRCodeScanner onScanSuccess={handleScanSuccess} onScanError={(err) => setScanError("Could not start camera.")} /> 
          {scanError && <p className="text-red-500 text-center mt-3 text-sm font-semibold">{scanError}</p>}
          {/* --- TEMPORARY BUTTON FOR TESTING --- */}
          <button
              onClick={() => advanceStep(3)}
              className="w-full mt-4 bg-yellow-500 text-white p-2 rounded-lg font-semibold hover:bg-yellow-600 transition-colors text-sm"
          >
              (Test) Skip to Biometrics
          </button>
        </div> 
      ), 
      actionText: null 
    },
    { title: "Biometric Verification", icon: Fingerprint, content: <BiometricAuth onSuccess={handleBiometricSuccess} />, actionText: null },
    { title: "Success", icon: CheckCircle, content: <p className="text-center text-green-700">You have been successfully marked present!</p>, actionText: "Complete", action: handleClose }
  ];

  const currentStep = steps[step - 1];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full mx-4 transform transition-all">
        <h2 className="text-2xl font-bold text-center mb-2">Check-in: {className}</h2>
        <p className="text-center text-gray-600 mb-6">Step {step} of {steps.length}</p>
        <div className="flex justify-center mb-6 min-h-[120px] items-center">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center transition-colors duration-300 ${ step === 4 ? 'bg-green-100' : colors.lightTeal }`}>
              <currentStep.icon className={`w-12 h-12 transition-colors duration-300 ${ step === 4 ? 'text-green-600' : colors.primaryBlueText }`} />
            </div>
        </div>
        <h3 className="text-lg font-semibold text-center mb-2">{currentStep.title}</h3>
        <div className="mb-6">{currentStep.content}</div>
        {isLoading && ( <div className="flex justify-center my-4"> <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#647FBC]"></div> </div> )}
        <div className="flex flex-col space-y-3">
          {currentStep.actionText && !isLoading && ( <button onClick={currentStep.action} className={`w-full text-white p-3 rounded-lg font-semibold transition-colors ${ step === 4 ? 'bg-green-600 hover:bg-green-700' : `${colors.primaryBlue} hover:bg-[#5a73a8]` }`}> {currentStep.actionText} </button> )}
          {step < 4 && ( <button onClick={handleClose} disabled={isLoading} className="w-full bg-gray-200 text-gray-700 p-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors disabled:opacity-50"> Cancel </button> )}
        </div>
      </div>
    </div>
  );
};


//REAL CODE 
// // Check-in Modal for Students - MERGED VERSION
// const CheckInModal = ({ isOpen, onClose, className }) => {
//   const [step, setStep] = useState(1);
//   const [isLoading, setIsLoading] = useState(false);
//   const [scanError, setScanError] = useState(null);

//   const advanceStep = useCallback((nextStep) => {
//     setIsLoading(true);
//     setScanError(null);
//     setTimeout(() => {
//       setIsLoading(false);
//       setStep(nextStep);
//     }, 500); // Shortened delay for smoother transition
//   }, []);

//   const handleScanSuccess = useCallback((data) => {
//     console.log("QR Scan Attempt:", data);
//     try {
//       const qrData = JSON.parse(data);
//       const now = Date.now();
//       if (qrData.subject === className && (now - qrData.timestamp < 15000)) {
//         console.log("QR Validation Successful!");
//         advanceStep(3);
//       } else {
//         setScanError("Invalid or expired QR code. Please try again.");
//       }
//     } catch (e) {
//       setScanError("Not a valid class QR code.");
//     }
//   }, [advanceStep, className]);
  
//   const handleBiometricSuccess = useCallback(() => {
//     console.log("Biometric validation successful!");
//     advanceStep(4);
//   }, [advanceStep]);

//   const handleClose = () => {
//     setStep(1);
//     setScanError(null);
//     onClose();
//   };

//   if (!isOpen) return null;

//   const steps = [
//     { title: "Location Verification", icon: Navigation, content: <p className="text-center text-gray-600">Verifying your location to ensure you are on campus.</p>, actionText: "Verify Location", action: () => advanceStep(2) },
//     { title: "QR Code Scanning", icon: QrCode, content: ( <div> <QRCodeScanner onScanSuccess={handleScanSuccess} onScanError={(err) => setScanError("Could not start camera.")} /> {scanError && <p className="text-red-500 text-center mt-3 text-sm font-semibold">{scanError}</p>} </div> ), actionText: null },
//     { title: "Biometric Verification", icon: Fingerprint, content: <BiometricAuth onSuccess={handleBiometricSuccess} />, actionText: null },
//     { title: "Success", icon: CheckCircle, content: <p className="text-center text-green-700">You have been successfully marked present!</p>, actionText: "Complete", action: handleClose }
//   ];

//   const currentStep = steps[step - 1];

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full mx-4 transform transition-all">
//         <h2 className="text-2xl font-bold text-center mb-2">Check-in: {className}</h2>
//         <p className="text-center text-gray-600 mb-6">Step {step} of {steps.length}</p>
//         <div className="flex justify-center mb-6 min-h-[120px] items-center">
//             <div className={`w-24 h-24 rounded-full flex items-center justify-center transition-colors duration-300 ${ step === 4 ? 'bg-green-100' : colors.lightTeal }`}>
//               <currentStep.icon className={`w-12 h-12 transition-colors duration-300 ${ step === 4 ? 'text-green-600' : colors.primaryBlueText }`} />
//             </div>
//         </div>
//         <h3 className="text-lg font-semibold text-center mb-2">{currentStep.title}</h3>
//         <div className="mb-6">{currentStep.content}</div>
//         {isLoading && ( <div className="flex justify-center my-4"> <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#647FBC]"></div> </div> )}
//         <div className="flex flex-col space-y-3">
//           {currentStep.actionText && !isLoading && ( <button onClick={currentStep.action} className={`w-full text-white p-3 rounded-lg font-semibold transition-colors ${ step === 4 ? 'bg-green-600 hover:bg-green-700' : `${colors.primaryBlue} hover:bg-[#5a73a8]` }`}> {currentStep.actionText} </button> )}
//           {step < 4 && ( <button onClick={handleClose} disabled={isLoading} className="w-full bg-gray-200 text-gray-700 p-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors disabled:opacity-50"> Cancel </button> )}
//         </div>
//       </div>
//     </div>
//   );
// };

// Date Navigation Component
const DateNavigation = ({ currentDate, onDateChange }) => {
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };
  const goToPreviousDay = () => { const newDate = new Date(currentDate); newDate.setDate(newDate.getDate() - 1); onDateChange(newDate); };
  const goToNextDay = () => { const newDate = new Date(currentDate); newDate.setDate(newDate.getDate() + 1); onDateChange(newDate); };
  return (
    <div className="flex items-center justify-between mb-6">
      <button onClick={goToPreviousDay} className="p-2 hover:bg-gray-200 rounded-lg transition-colors"> <ChevronLeft className="w-5 h-5" /> </button>
      <h2 className="text-xl font-semibold">{formatDate(currentDate)}</h2>
      <button onClick={goToNextDay} className="p-2 hover:bg-gray-200 rounded-lg transition-colors"> <ChevronRight className="w-5 h-5" /> </button>
    </div>
  );
};

// Admin Dashboard
const AdminDashboard = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  const sidebarItems = [
    { key: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { key: 'departments', label: 'Departments', icon: Building2 },
    { key: 'programs', label: 'Programs', icon: GraduationCap }
  ];

  const renderDashboard = () => (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">{mockUniversity.name}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <User className={`w-8 h-8 ${colors.primaryBlueText} mb-3`} />
            <h3 className="font-semibold text-gray-600 mb-2">Dean</h3>
            <p className="text-lg font-bold">{mockUniversity.dean}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <Calendar className={`w-8 h-8 ${colors.primaryBlueText} mb-3`} />
            <h3 className="font-semibold text-gray-600 mb-2">Established</h3>
            <p className="text-lg font-bold">{mockUniversity.established}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <Location className={`w-8 h-8 ${colors.primaryBlueText} mb-3`} />
            <h3 className="font-semibold text-gray-600 mb-2">Location</h3>
            <p className="text-lg font-bold">{mockUniversity.location}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <Building2 className={`w-8 h-8 ${colors.primaryBlueText} mb-3`} />
            <h3 className="font-semibold text-gray-600 mb-2">Address</h3>
            <p className="text-sm">{mockUniversity.address}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <Award className={`w-8 h-8 ${colors.primaryBlueText} mb-3`} />
            <h3 className="font-semibold text-gray-600 mb-2">Accreditation</h3>
            <p className="text-sm">{mockUniversity.accreditation}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <Users className={`w-8 h-8 ${colors.primaryBlueText} mb-3`} />
            <h3 className="font-semibold text-gray-600 mb-2">Total Students</h3>
            <p className="text-lg font-bold">{mockUniversity.totalStudents.toLocaleString()}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <GraduationCap className={`w-8 h-8 ${colors.primaryBlueText} mb-3`} />
            <h3 className="font-semibold text-gray-600 mb-2">Total Faculty</h3>
            <p className="text-lg font-bold">{mockUniversity.totalFaculty.toLocaleString()}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <Phone className={`w-8 h-8 ${colors.primaryBlueText} mb-3`} />
            <h3 className="font-semibold text-gray-600 mb-2">Phone</h3>
            <p className="text-sm">{mockUniversity.phone}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <Mail className={`w-8 h-8 ${colors.primaryBlueText} mb-3`} />
            <h3 className="font-semibold text-gray-600 mb-2">Email</h3>
            <p className="text-sm">{mockUniversity.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockDepartments.map(dept => (
            <div key={dept.id} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <Building2 className={`w-8 h-8 ${colors.primaryBlueText} mb-3`} />
              <h3 className="font-semibold mb-2">{dept.name}</h3>
              <p className="text-sm text-gray-600 mb-1">{dept.faculty} Faculty</p>
              <p className="text-sm text-gray-600">{dept.students} Students</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const getTodaysSchedule = () => {
    const dayName = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
    return mockSchedule[dayName] || [];
  };

  const renderFacultyProfile = () => {
    const faculty = selectedFaculty;
    const todaysSchedule = getTodaysSchedule();
    
    return (
      <div className="p-8">
        <button
          onClick={() => setSelectedFaculty(null)}
          className="mb-6 flex items-center space-x-2 text-gray-600 hover:text-gray-800"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Faculty</span>
        </button>

        <div className="bg-white p-8 rounded-xl shadow-sm mb-8">
          <div className="flex items-center space-x-6 mb-8">
            <img
              src={faculty.photo}
              alt={faculty.name}
              className="w-24 h-24 rounded-full object-cover"
            />
            <div>
              <h1 className="text-3xl font-bold">{faculty.name}</h1>
              <p className="text-gray-600">{faculty.role}</p>
              <p className="text-gray-600">Joined: {faculty.joined}</p>
              <p className="text-gray-600">{faculty.qualification}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="font-semibold mb-4">Subjects Taught</h3>
              <div className="space-y-2">
                {faculty.subjects.map((subject, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-gray-500" />
                    <span>{subject}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <DateNavigation currentDate={currentDate} onDateChange={setCurrentDate} />
              <h3 className="font-semibold mb-4">Today's Schedule</h3>
              <div className="space-y-3">
                {todaysSchedule.map(cls => (
                  <div key={cls.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{cls.subject}</p>
                      <p className="text-sm text-gray-600">{cls.room}</p>
                    </div>
                    <p className="text-sm text-gray-600">{cls.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <BarChart
            title="Subject-wise Class Attendance"
            data={faculty.subjects.map(subject => ({
              label: subject,
              value: Math.floor(Math.random() * 20) + 80
            }))}
          />
          <BarChart
            title="Class-wise Attendance Comparison"
            data={[
              { label: "Section A", value: 92 },
              { label: "Section B", value: 88 },
              { label: "Section C", value: 95 }
            ]}
          />
        </div>
      </div>
    );
  };

  const renderStudentProfile = () => {
    const student = selectedStudent;
    
    return (
      <div className="p-8">
        <button
          onClick={() => setSelectedStudent(null)}
          className="mb-6 flex items-center space-x-2 text-gray-600 hover:text-gray-800"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Students</span>
        </button>

        <div className="bg-white p-8 rounded-xl shadow-sm mb-8">
          <div className="flex items-center space-x-6 mb-8">
            <img
              src={student.photo}
              alt={student.name}
              className="w-24 h-24 rounded-full object-cover"
            />
            <div>
              <h1 className="text-3xl font-bold">{student.name}</h1>
              <p className="text-gray-600">Roll No: {student.rollNo}</p>
              <p className="text-gray-600">Overall Attendance: {student.attendance}%</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-600">Student Status</h4>
              <p className="font-medium">{student.studentStatus}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-600">Admission No</h4>
              <p className="font-medium">{student.admissionNo}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-600">Admission Year</h4>
              <p className="font-medium">{student.admissionYear}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-600">Degree</h4>
              <p className="font-medium">{student.degree}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-600">Department</h4>
              <p className="font-medium">{student.department}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-600">Semester</h4>
              <p className="font-medium">{student.semester}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <BarChart
              title="Subject-wise Attendance (Current Month)"
              data={Object.entries(student.subjectAttendance).map(([subject, attendance]) => ({
                label: subject,
                value: attendance
              }))}
            />
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="font-semibold mb-4">Academic Details</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Course Name</p>
                  <p className="font-medium">{student.courseName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">College</p>
                  <p className="font-medium">{student.college}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Curriculum Plan</p>
                  <p className="font-medium">{student.curriculumPlan}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDepartments = () => {
    if (selectedStudent) {
      return renderStudentProfile();
    }

    if (selectedFaculty) {
      return renderFacultyProfile();
    }

    if (selectedDepartment) {
      const department = mockDepartments.find(d => d.id === selectedDepartment);
      const faculty = mockFaculty[selectedDepartment] || [];

      return (
        <div className="p-8">
          <button
            onClick={() => setSelectedDepartment(null)}
            className="mb-6 flex items-center space-x-2 text-gray-600 hover:text-gray-800"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Departments</span>
          </button>

          <h1 className="text-3xl font-bold mb-8">{department.name} Faculty</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {faculty.map(member => (
              <div
                key={member.id}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedFaculty(member)}
              >
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
                />
                <h3 className="font-semibold text-center mb-2">{member.name}</h3>
                <p className="text-sm text-gray-600 text-center mb-1">{member.role}</p>
                <p className="text-sm text-gray-600 text-center">Joined: {member.joined}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8">Departments</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockDepartments.map(dept => (
            <div
              key={dept.id}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedDepartment(dept.id)}
            >
              <Building2 className={`w-10 h-10 ${colors.primaryBlueText} mb-4`} />
              <h3 className="text-xl font-semibold mb-2">{dept.name}</h3>
              <p className="text-gray-600 mb-1">{dept.faculty} Faculty Members</p>
              <p className="text-gray-600">{dept.students} Students</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderPrograms = () => {
    if (selectedStudent) {
      return renderStudentProfile();
    }

    if (selectedSection) {
      const program = mockPrograms.find(p => p.id === selectedProgram);
      const students = mockStudents[`${selectedProgram}-${selectedSection}`] || [];

      return (
        <div className="p-8">
          <button
            onClick={() => setSelectedSection(null)}
            className="mb-6 flex items-center space-x-2 text-gray-600 hover:text-gray-800"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Sections</span>
          </button>

          <h1 className="text-3xl font-bold mb-8">{program.name} - Section {selectedSection}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {students.map(student => (
              <div
                key={student.id}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedStudent(student)}
              >
                <img
                  src={student.photo}
                  alt={student.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
                />
                <h3 className="font-semibold text-center mb-2">{student.name}</h3>
                <p className="text-sm text-gray-600 text-center mb-1">Roll: {student.rollNo}</p>
                <p className="text-sm text-center">
                  <span className={`font-semibold ${student.attendance >= 85 ? 'text-green-600' : student.attendance >= 75 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {student.attendance}% Attendance
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (selectedProgram) {
      const program = mockPrograms.find(p => p.id === selectedProgram);

      return (
        <div className="p-8">
          <button
            onClick={() => setSelectedProgram(null)}
            className="mb-6 flex items-center space-x-2 text-gray-600 hover:text-gray-800"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Programs</span>
          </button>

          <h1 className="text-3xl font-bold mb-8">{program.name}</h1>

          <div className="mb-8">
            <BarChart
              title="Section-wise Attendance Comparison"
              data={program.sections.map((section, index) => ({
                label: `Section ${section}`,
                value: 85 + (index * 5) - 2
              }))}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {program.sections.map(section => (
              <div
                key={section}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedSection(section)}
              >
                <h3 className="text-xl font-semibold mb-4">Section {section}</h3>
                <div className="space-y-2">
                  <p className="text-gray-600">Students: 60</p>
                  <p className="text-gray-600">Average Attendance: {85 + (program.sections.indexOf(section) * 5) - 2}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8">Academic Programs</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockPrograms.map(program => (
            <div
              key={program.id}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedProgram(program.id)}
            >
              <GraduationCap className={`w-10 h-10 ${colors.primaryBlueText} mb-4`} />
              <h3 className="text-xl font-semibold mb-2">{program.name}</h3>
              <p className="text-gray-600 mb-1">{program.sections.length} Sections</p>
              <p className="text-gray-600">{program.totalStudents} Students</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex">
      <Sidebar 
        activeView={activeView}
        setActiveView={setActiveView}
        items={sidebarItems}
        userRole="University Admin"
      />
      <div className="flex-1 bg-gray-50">
        {activeView === 'dashboard' && renderDashboard()}
        {activeView === 'departments' && renderDepartments()}
        {activeView === 'programs' && renderPrograms()}
      </div>
    </div>
  );
};

// Professor Dashboard
const ProfessorDashboard = () => {
  const [activeView, setActiveView] = useState('profile');
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [attendanceSession, setAttendanceSession] = useState(null);
  const [duplicateFlags, setDuplicateFlags] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const sidebarItems = [
    { key: 'profile', label: 'Profile', icon: User },
    { key: 'schedule', label: 'Schedule', icon: Calendar },
    { key: 'attendance', label: 'Attendance', icon: Activity }
  ];

  const professorData = {
    name: "Dr. John Smith",
    photo: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150",
    department: "Computer Science",
    role: "Associate Professor",
    qualification: "Ph.D. in Computer Science",
    yearJoined: 2018,
    subjects: ["Data Structures", "Algorithms", "Database Systems", "Web Development"]
  };

  const professorClasses = [
    {
      id: 1,
      className: "Section A",
      semester: "6th Semester",
      program: "B.Tech Computer Science",
      subject: "Data Structures",
      students: mockStudents["1-A"] || []
    },
    {
      id: 2,
      className: "Section B", 
      semester: "6th Semester",
      program: "B.Tech Computer Science",
      subject: "Web Development",
      students: mockStudents["1-B"] || []
    },
    {
      id: 3,
      className: "Section C",
      semester: "6th Semester", 
      program: "B.Tech Computer Science",
      subject: "Machine Learning",
      students: mockStudents["1-C"] || []
    },
     {
      id: 4,
      className: "Section A",
      semester: "6th Semester",
      program: "B.Tech Computer Science",
      subject: "Algorithms",
      students: mockStudents["1-A"] || []
    },
    {
      id: 5,
      className: "Section A",
      semester: "6th Semester",
      program: "B.Tech Computer Science",
      subject: "Database Systems",
      students: mockStudents["1-A"] || []
    }
  ];

  const handleStartQR = (classInfo) => {
    setSelectedClass(classInfo);
    setShowQRModal(true);
  };

  const handleEndSession = () => {
    setShowQRModal(false);

    // Find the full class information from `professorClasses` using the subject
    // from the `selectedClass` state. The schedule item in `selectedClass` 
    // does not contain the list of students, so we look it up here.
    const fullClassInfo = professorClasses.find(
      (p) => p.subject === selectedClass.subject
    );

    // If the class is found and has a students array, update the session state.
    if (fullClassInfo && fullClassInfo.students) {
      setDuplicateFlags(['Alex Johnson', 'David Brown']);
      setAttendanceSession({
        class: fullClassInfo,
        students: fullClassInfo.students,
      });
    } else {
      // Log an error if the class details couldn't be found, to help with debugging.
      console.error("Error: Could not find student list for the selected class.", selectedClass);
      setAttendanceSession(null); // Clear session to prevent further errors
    }
  };

  const getTodaysSchedule = () => {
    const dayName = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
    return mockSchedule[dayName] || [];
  };

  const renderProfile = () => (
    <div className="p-8">
      <div className="bg-white p-8 rounded-xl shadow-sm mb-8">
        <div className="flex items-center space-x-6 mb-8">
          <img
            src={professorData.photo}
            alt={professorData.name}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h1 className="text-3xl font-bold">{professorData.name}</h1>
            <p className="text-gray-600">{professorData.role}</p>
            <p className="text-gray-600">{professorData.department} Department</p>
            <p className="text-gray-600">Joined: {professorData.yearJoined}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="font-semibold mb-4">Qualification</h3>
            <p className="text-gray-700">{professorData.qualification}</p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="font-semibold mb-4">Subjects Taught</h3>
            <div className="space-y-2">
              {professorData.subjects.map((subject, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-gray-500" />
                  <span>{subject}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSchedule = () => {
    const todaysSchedule = getTodaysSchedule() || [];
    
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8">My Schedule</h1>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <DateNavigation currentDate={currentDate} onDateChange={setCurrentDate} />
          
          <div className="space-y-4">
            {todaysSchedule.length > 0 ? (
              todaysSchedule.map(cls => (
                <div key={cls.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-semibold">{cls.subject}</h3>
                    <p className="text-sm text-gray-600">{cls.time} • {cls.room}</p>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleStartQR(cls)}
                      className={`${colors.primaryBlue} text-white px-4 py-2 rounded-lg font-medium hover:bg-[#5a73a8] transition-colors`}
                    >
                      Offline Attendance
                    </button>
                    <button className={`${colors.secondaryBlue} text-white px-4 py-2 rounded-lg font-medium hover:bg-[#7d9abd] transition-colors`}>
                      Online Attendance
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No classes scheduled for this day.</p>
              </div>
            )}
          </div>
        </div>

        {attendanceSession && (
          <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Attendance Session: {attendanceSession.class.subject}</h2>
            
            {duplicateFlags.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <h3 className="font-semibold text-red-800">Duplicate Browser Fingerprints Detected</h3>
                </div>
                <p className="text-red-700 mb-2">The following students have suspicious activity:</p>
                <ul className="list-disc list-inside text-red-700">
                  {duplicateFlags.map(student => (
                    <li key={student}>{student}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-3">
              {attendanceSession.students.map(student => (
                <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <img
                      src={student.photo}
                      alt={student.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-gray-600">{student.rollNo}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="form-checkbox" />
                      <span className="text-sm">Present</span>
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex space-x-3">
              <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
                Submit Attendance
              </button>
              <button
                onClick={() => setAttendanceSession(null)}
                className="bg-gray-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <QRModal
          isOpen={showQRModal}
          onClose={() => setShowQRModal(false)}
          onEndSession={handleEndSession}
          classInfo={selectedClass}
        />
      </div>
    );
  };



  const renderAttendance = () => (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Class Attendance Management</h1>

      <div className="space-y-8">
        {professorClasses.map(classData => (
          <div key={classData.id} className="bg-white p-6 rounded-xl shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">{classData.subject}</h2>
              <div className="flex space-x-6 text-sm text-gray-600">
                <span>Class: {classData.className}</span>
                <span>Semester: {classData.semester}</span>
                <span>Program: {classData.program}</span>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold">Students</h3>
              {classData.students.map(student => (
                <div key={student.id} className={`flex items-center justify-between p-3 border rounded-lg ${
                  student.attendance < 75 ? 'border-red-300 bg-red-50' : 'border-gray-200'
                }`}>
                  <div className="flex items-center space-x-3">
                    <img
                      src={student.photo}
                      alt={student.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className={`font-medium ${student.attendance < 75 ? 'text-red-700' : ''}`}>
                        {student.name}
                      </p>
                      <p className="text-sm text-gray-600">{student.rollNo}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      student.attendance >= 85 ? 'text-green-600' : 
                      student.attendance >= 75 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {student.attendance}%
                    </p>
                    {student.attendance < 75 && (
                      <p className="text-xs text-red-600">At Risk</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex">
      <Sidebar 
        activeView={activeView}
        setActiveView={setActiveView}
        items={sidebarItems}
        userRole="Professor"
      />
      <div className="flex-1 bg-gray-50">
        {activeView === 'profile' && renderProfile()}
        {activeView === 'schedule' && renderSchedule()}
        {activeView === 'attendance' && renderAttendance()}
      </div>
    </div>
  );
};

// Student Dashboard
const StudentDashboard = () => {
  const [activeView, setActiveView] = useState('profile');
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [checkInClass, setCheckInClass] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  const sidebarItems = [
    { key: 'profile', label: 'Profile', icon: User },
    { key: 'schedule', label: 'Schedule', icon: Calendar },
    { key: 'attendance', label: 'Attendance', icon: CheckCircle }
  ];

  const studentData = mockStudents["1-A"][0]; // Alex Johnson

  const handleCheckIn = (classInfo) => {
    setCheckInClass(classInfo);
    setShowCheckInModal(true);
  };

  const getTodaysSchedule = () => {
    const dayName = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
    return mockSchedule[dayName] || [];
  };

  const renderProfile = () => (
    <div className="p-8">
      <div className="bg-white p-8 rounded-xl shadow-sm mb-8">
        <div className="flex items-center space-x-6 mb-8">
          <img
            src={studentData.photo}
            alt={studentData.name}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h1 className="text-3xl font-bold">{studentData.name}</h1>
            <p className="text-gray-600">{studentData.degree} {studentData.department}</p>
            <p className="text-gray-600">Roll No: {studentData.rollNo}</p>
            <p className="text-gray-600">{studentData.semester}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-600 mb-2">Student Status</h4>
            <p className="font-medium">{studentData.studentStatus}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-600 mb-2">Admission No</h4>
            <p className="font-medium">{studentData.admissionNo}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-600 mb-2">Admission Year</h4>
            <p className="font-medium">{studentData.admissionYear}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-600 mb-2">Roll No</h4>
            <p className="font-medium">{studentData.rollNo}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-600 mb-2">Degree</h4>
            <p className="font-medium">{studentData.degree}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-600 mb-2">Department</h4>
            <p className="font-medium">{studentData.department}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-600 mb-2">Semester</h4>
            <p className="font-medium">{studentData.semester}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-600 mb-2">Course Name</h4>
            <p className="font-medium">{studentData.courseName}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-600 mb-2">College</h4>
            <p className="font-medium">{studentData.college}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg col-span-full">
            <h4 className="font-semibold text-gray-600 mb-2">Curriculum Plan</h4>
            <p className="font-medium">{studentData.curriculumPlan}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSchedule = () => {
    const todaysSchedule = getTodaysSchedule();
    
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8">My Schedule</h1>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <DateNavigation currentDate={currentDate} onDateChange={setCurrentDate} />
          
          <div className="space-y-4">
            {todaysSchedule.map(cls => (
              <div key={cls.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-semibold">{cls.subject}</h3>
                  <p className="text-sm text-gray-600">{cls.time} • {cls.room}</p>
                  <p className="text-sm text-gray-600">Prof: {cls.professor}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600 font-medium">Session Active</span>
                  </div>
                  <button
                    onClick={() => handleCheckIn(cls)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                  >
                    Check-In Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <CheckInModal
          isOpen={showCheckInModal}
          onClose={() => setShowCheckInModal(false)}
          className={checkInClass?.subject}
        />
      </div>
    );
  };

  const renderAttendance = () => (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">My Attendance</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-8 rounded-xl shadow-sm text-center">
          <h2 className="text-lg font-semibold text-gray-600 mb-2">Current Month Attendance</h2>
          <p className="text-4xl font-bold text-blue-600 mb-4">88%</p>
          <p className="text-gray-600">22 out of 25 classes attended</p>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-sm text-center">
          <h2 className="text-lg font-semibold text-gray-600 mb-2">Overall Semester Attendance</h2>
          <p className="text-4xl font-bold text-green-600 mb-4">{studentData.attendance}%</p>
          <p className="text-gray-600">68 out of 80 classes attended</p>
        </div>
      </div>

      <BarChart
        title="Subject-wise Attendance"
        data={Object.entries(studentData.subjectAttendance).map(([subject, attendance]) => ({
          label: subject,
          value: attendance
        }))}
      />
    </div>
  );

  return (
    <div className="flex">
      <Sidebar 
        activeView={activeView}
        setActiveView={setActiveView}
        items={sidebarItems}
        userRole="Student"
      />
      <div className="flex-1 bg-gray-50">
        {activeView === 'profile' && renderProfile()}
        {activeView === 'schedule' && renderSchedule()}
        {activeView === 'attendance' && renderAttendance()}
      </div>
    </div>
  );
};

// Main App Component
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [showSignup, setShowSignup] = useState(false);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);

  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
            resolve();
            return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        document.head.appendChild(script);
      });
    };

    Promise.all([
      loadScript("https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js"),
      loadScript("https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js")
    ]).then(() => {
      console.log("All scripts loaded successfully");
      setScriptsLoaded(true);
    }).catch(error => {
      console.error(error);
      // You could set an error state here to show a message to the user
    });
  }, []);


  const handleLogin = (role, email) => {
    setUserRole(role);
    setUserEmail(email);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setUserEmail('');
  };

  const toggleSignup = () => {
    setShowSignup(!showSignup);
  };
  
  if (!scriptsLoaded) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#647FBC] mx-auto mb-4"></div>
                <p className="text-lg text-gray-600">Loading essential components...</p>
            </div>
        </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <LoginPage 
        onLogin={handleLogin}
        showSignup={showSignup}
        toggleSignup={toggleSignup}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {userRole === 'Admin' && <AdminDashboard />}
      {userRole === 'Professor' && <ProfessorDashboard />}
      {userRole === 'Student' && <StudentDashboard />}
      
      <button
        onClick={handleLogout}
        className="fixed top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors z-10"
      >
        Logout
      </button>
    </div>
  );
}

export default App;

