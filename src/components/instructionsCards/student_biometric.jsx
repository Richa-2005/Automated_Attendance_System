// Card 6: Student Dashboard - Biometric Instructions
import React from 'react';

const StudentDashboardBiometric = () => {
  return (
    <div style={{
      maxWidth: '400px',
      margin: '20px',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#FAFAFA', // Very Light Gray background
      borderLeft: '5px solid #607D8B' // Blue-Gray accent
    }}>
      <h3 style={{
        color: '#455A64', // Dark Blue-Gray heading color
        borderBottom: '2px solid #E0E0E0',
        paddingBottom: '10px',
        marginBottom: '15px'
      }}>
        Student Dashboard - Biometric Auth (Instructional Guide)
      </h3>
      <ul style={{
        listStyleType: 'disc',
        paddingLeft: '20px',
        color: '#424242' // Dark Gray text
      }}>
        <li style={{ marginBottom: '10px' }}>
          <b>First-time users</b> will be prompted to <b>register their native biometric</b>.
        </li>
        <li style={{ marginBottom: '10px' }}>
          Any subsequent visit will only require you to <b>authenticate your biometrics</b>.
        </li>
        
      </ul>
    </div>
  );
};

export default StudentDashboardBiometric;