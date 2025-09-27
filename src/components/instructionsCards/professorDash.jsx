// Card 2: Professor Dashboard Instructions
import React from 'react';

const ProfessorDashboardInstructions = () => {
  return (
    <div style={{
      maxWidth: '400px',
      margin: '20px',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#FFFDE7', // Light Yellow background
      borderLeft: '5px solid #FFC107' // Amber accent
    }}>
      <h3 style={{
        color: '#FF8F00', // Darker Amber heading color
        borderBottom: '2px solid #FFEE58',
        paddingBottom: '10px',
        marginBottom: '15px'
      }}>
        Professor Dashboard (Instructional Guide)
      </h3>
      <ul style={{
        listStyleType: 'disc',
        paddingLeft: '20px',
        color: '#424242' // Dark Gray text
      }}>
       
        <li style={{ marginBottom: '10px' }}>
          <b>Offline Attendance</b>: Click to start the attendance process, which will generate a <b>dynamic QR code</b>.
        </li>
        <li style={{ marginBottom: '10px' }}>
          <b>Offline Session Clicked</b>: If students use the same device for attendance, an <b>ERROR</b> will show to prevent marking attendance for more than one student.
        </li>
        <li>
          <b>Online Attendance</b>: Click <b>DOWNLOAD</b> the Google Meet / Zoom extension. Then, click any of the dropdowns. This will take you to the new session page. Later, download the <b>.CSV file</b> through the extension and then upload it.
        </li>
      </ul>
    </div>
  );
};

export default ProfessorDashboardInstructions;