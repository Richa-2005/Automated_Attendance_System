// Card 5: Student Dashboard - QR Code Instructions
import React from 'react';

const StudentDashboardQRCode = () => {
  return (
    <div style={{
      maxWidth: '400px',
      margin: '20px',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#FBE8E5', // Light Red/Orange background
      borderLeft: '5px solid #F44336' // Red accent
    }}>
      <h3 style={{
        color: '#C62828', // Darker Red heading color
        borderBottom: '2px solid #FFCDD2',
        paddingBottom: '10px',
        marginBottom: '15px'
      }}>
        Student Dashboard - QR Scan (Instructional Guide)
      </h3>
      <ul style={{
        listStyleType: 'disc',
        paddingLeft: '20px',
        color: '#424242' // Dark Gray text
      }}>
        <li style={{ marginBottom: '10px' }}>
          <b>Scan the QR code</b> generated on the <b>Professor Dashboard</b>.
        </li>
        <li>
          Alternatively, you can click <b>skip to biometric</b> to move to the next step.
        </li>
      </ul>
    </div>
  );
};

export default StudentDashboardQRCode;