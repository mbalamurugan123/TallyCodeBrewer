// src/ContestDashboard.js
import React from 'react';

import '../App.css';

const ContestDashboard = ({ contests }) => {
  return (
    <div className="dashboard" style={{backgroundColor: '#232b2b', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',color:'white'}}>
      <h3>Ongoing Contests ({contests.length})</h3>
      <div className="contest-cards">
        {contests.length > 0 ? (
          contests.map(contest => (
            <div className="contest-card" key={contest.id}>
              <div className="contest-header">
                <h4>{contest.contestTitle}</h4>
                <span className="contest-date">
                  {new Date(contest.contestDate).toLocaleDateString()}
                </span>
              </div>
              <p>{contest.contestDescription}</p>
              <div className="contest-details">
                <p><strong>Participant:</strong> {contest.participantName}</p>
                <p><strong>Start Time:</strong> {contest.startTime}</p>
                <p><strong>End Time:</strong> {contest.endTime}</p>
              </div>
              <div className="contest-actions">
                <a href="#" className="view-details">View Details</a>
                <button type="button" className="join-now">Join Now</button>
              </div>
            </div>
          ))
        ) : (
          <p>No ongoing contests at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default ContestDashboard;