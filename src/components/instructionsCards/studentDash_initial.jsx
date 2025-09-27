// Card 3: Student Dashboard - Initial Action Instructions
import React from 'react';

const StudentDashboardInitialAction = () => {
  return (
    <div style={{
      maxWidth: '400px',
      margin: '20px',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#F3E5F5', // Light Purple background
      borderLeft: '5px solid #9C27B0' // Purple accent
    }}>
      <h3 style={{
        color: '#6A1B9A', // Darker Purple heading color
        borderBottom: '2px solid #E1BEE7',
        paddingBottom: '10px',
        marginBottom: '15px'
      }}>
        Student Dashboard - Step 1 (Instructional Guide)
      </h3>
      <ul style={{
        listStyleType: 'disc',
        paddingLeft: '20px',
        color: '#424242' // Dark Gray text
      }}>
        <li style={{ marginBottom: '10px' }}>
          In your <b>Schedule</b>  click the <b>Check In Now</b> button for the <b>SAME LECTURE</b> that has been started on the Professor Dashboard.
        </li>
        <li>
          <b>Note</b>: The <b>skip buttons</b> in the process are for prototype testing only and <b>WILL NOT</b> be available in the final application.
        </li>
      </ul>
    </div>
  );
};

export default StudentDashboardInitialAction;