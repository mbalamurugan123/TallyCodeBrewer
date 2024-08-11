// src/App.js
import React, { useState } from 'react';
import '../App.css';
import ContestDashboard from './ContestDashboard';
import ContestLeaderboard from './ContestLeaderboard';
import ContestCreationForm from './ContestCF';

const CodingBattlefield = () => {
  const [contests, setContests] = useState([
    { id: 1, title: 'Code Sprint', description: 'A 24-hour coding marathon.', date: '2024-08-10', participantName: 'Alice', startTime: '10:00', endTime: '16:00' },
    { id: 2, title: 'Hackathon 2024', description: 'An intense 48-hour hackathon event.', date: '2024-08-15', participantName: 'Bob', startTime: '09:00', endTime: '17:00' },
    { id: 3, title: 'Algorithm Challenge', description: 'Solve algorithmic problems to win prizes.', date: '2024-08-20', participantName: 'Charlie', startTime: '11:00', endTime: '15:00' }
  ]);

  const handleCreateContest = (newContest) => {
    setContests((prevContests) => [...prevContests, newContest]);
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Contest Platform</h1>
      </header>
      <div className="dashboard-container">
        <ContestDashboard contests={contests} />
      </div>
      <main className="main-content">
        <div className="content-left">
          <ContestCreationForm onCreateContest={handleCreateContest} />
        </div>
        <div className="content-right">
          <ContestLeaderboard />
        </div>
      </main>
    </div>
  );
};

export default CodingBattlefield;
