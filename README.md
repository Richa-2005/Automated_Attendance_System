**ClassSync - Modern University Attendance Management** <br />
ClassSync is a comprehensive, secure, and modern attendance management platform designed for universities. It streamlines attendance tracking for both in-person and online classes through a robust multi-factor verification system, providing actionable insights for faculty and administrators.

🔴 Live Demo <br />
Check out the live prototype deployed on Vercel:

<u>https://class-sync-pawzt37es-richa-guptas-projects-1d230eb9.vercel.app/</u>


**✨ Key Features**<br />
ClassSync offers a tailored experience for every user role within the university ecosystem.

**For Administrators:**<br />
Centralized Dashboard: Get a high-level overview of university-wide attendance trends.

Department & Program Management: Easily manage faculty, courses, and student rosters.

Geofence Configuration: Interactively draw and manage campus boundaries for GPS verification.

Security Auditing: Access detailed reports on flagged proxy attempts.

In-depth Analytics: Identify at-risk students and track engagement patterns across departments.

**For Professors:**<br />
Hybrid Attendance: Seamlessly manage attendance for both offline (in-person) and online classes.

Live Attendance Sessions: Launch secure, real-time attendance sessions with a single click.

Dynamic QR Codes: Generate time-sensitive QR codes that refresh every 10 seconds to prevent sharing.

Proxy Detection: Receive instant alerts if multiple students check in from the same device.

Manual Override & CSV Upload: Easily upload participant lists from online classes or manually adjust attendance records.

Class Analytics: Track attendance percentages for each student in every class.

**For Students:**<br />
Simple Check-in: A guided, multi-step process to securely mark attendance.

Personal Dashboard: View personal details and overall attendance percentage.

Weekly Schedule: A clear view of their class schedule.

Attendance Tracking: See a subject-wise breakdown of their attendance record with visual graphs.

**🔐 The 5-Step Secure Verification Flow**<br />
Our core innovation is a multi-layered verification process that makes proxy attendance impractical and easily detectable.

📍**GPS Geofence**: The student's app first verifies they are within the designated campus boundary. The check-in process cannot start otherwise.

🔳 **Dynamic QR Code**: The professor displays a QR code that refreshes every 10 seconds. This ensures the student is physically in the room and looking at the screen.

👆 **Biometric Confirmation**: The app prompts for a native fingerprint or face scan. This confirms that an authorized user of the phone is actively approving the check-in.

🕵️ **Browser Fingerprint/Device ID**: We generate a unique and stable identifier for the student's device.

🚩 **Server-Side Duplicate Check**: Our backend cross-references the Device ID. If the same device is used for another student in the same session, both check-ins are flagged for administrative review.

🛠️ **Tech Stack**<br />
This prototype was built with a modern web stack, with a clear roadmap to a native application.

Category

Technology

Frontend (Prototype)

React.js, Vite, Tailwind CSS

Frontend (Final App)

React Native, NativeWind (for Tailwind)

Web Dashboards

Next.js, Shadcn/UI, Recharts

Backend

Node.js, Express.js

Database

MongoDB with MongoDB Atlas

Real-time Engine

Socket.IO

Authentication

JWT (JSON Web Tokens), bcrypt.js

Geospatial

Browser Geolocation API, Turf.js, Mongo GeoJSON

Deployment

Vercel

🚀 How to Run This Project Locally
Clone the repository:

git clone https://github.com/Richa-2005/Automated_Attendance_System.git

Navigate to the project directory:

cd class-sync-app

Install dependencies:

npm install

Run the development server:

npm run dev
