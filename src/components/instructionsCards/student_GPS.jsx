// Card 4: Student Dashboard - GPS Verification Instructions
import React from 'react';

const StudentDashboardGPS = () => {
  return (
    <div style={{
      maxWidth: '400px',
      margin: '20px',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#E8F5E9', // Light Green background
      borderLeft: '5px solid #4CAF50' // Green accent
    }}>
      <h3 style={{
        color: '#2E7D32', // Darker Green heading color
        borderBottom: '2px solid #C8E6C9',
        paddingBottom: '10px',
        marginBottom: '15px'
      }}>
        Student Dashboard - GPS Check (Instructional Guide)
      </h3>
      <ul style={{
        listStyleType: 'disc',
        paddingLeft: '20px',
        color: '#424242' // Dark Gray text
      }}>
        <li style={{ marginBottom: '10px' }}>
          The <b>GPS verification</b> will confirm you are on the <b>Adani University campus</b>.
        </li>
        <li>
          <b>FOR NOW</b>, to check the further steps, you can click the <b>skip location</b> button to move to the next step.
        </li>
      </ul>
    </div>
  );
};

export default StudentDashboardGPS;