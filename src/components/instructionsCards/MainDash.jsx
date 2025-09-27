// Card 1: Main Dashboard Instructions
import React from 'react';

const MainDashboardInstructions = () => {
  return (
    <div style={{
      maxWidth: '400px',
      margin: '20px',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#E3F2FD', // Light Blue background
      borderLeft: '5px solid #2196F3' // Blue accent
    }}>
      <h3 style={{
        color: '#1565C0', // Darker Blue heading color
        borderBottom: '2px solid #BBDEFB',
        paddingBottom: '10px',
        marginBottom: '15px'
      }}>
        Main Dashboard (Instructional Guide)
      </h3>
      <ul style={{
        listStyleType: 'disc',
        paddingLeft: '20px',
        color: '#424242' // Dark Gray text
      }}>
        
        <li>
          Log in as <b>Admin (University)</b>, <b>Student</b>, or <b>Professor</b> using the mock credentials provided.
        </li>
      </ul>
    </div>
  );
};

export default MainDashboardInstructions;