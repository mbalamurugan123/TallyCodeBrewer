import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import ContestDashboard from './ContestDashboard';
import ContestLeaderboard from './ContestLeaderboard';
import ContestCreationForm from './ContestCF';

const CodingBattlefield = () => {
  const [contests, setContests] = useState([]);

  useEffect(() => {
    // Fetch contests from the API when the component mounts
    const authToken="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbjEyM0BnbWFpbC5jb20iLCJpYXQiOjE3MjMzNDY1NDIsImV4cCI6MTcyMzQ5MDU0Mn0.tsTtpTcenH_zpi2gBl_iWAnP8qUyvlQfwXBMkuuQ9pk"
    axios.get('http://localhost:8181/api/connect/contest/contestList', {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
      .then(response => {
        setContests(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the contests!", error);
      });
  }, []);

  const handleCreateContest = (newContest) => {
    // Add the new contest to the existing list of contests
    setContests((prevContests) => [...prevContests, newContest]);
  };

  return (
    <div className="app-container" style={{ backgroundColor: '#232b2b' }}>
      <header className="header" style={{ backgroundColor: '#232b2b' }}>
        <h1 style={{ color: '#fff' }}>Contest Platform</h1>
      </header>
      <div className="dashboard-container" style={{ width: '100%', float: 'left', backgroundColor: '#232b2b' }}>
        <ContestDashboard contests={contests} />
      </div>
      <main className="main-content" style={{ backgroundColor: '#232b2b' }}>
        <div className="content-left" style={{ width: '100%', float: 'left', backgroundColor: '#232b2b' }}>
          <ContestCreationForm onCreateContest={handleCreateContest} />
        </div>
        <div className="content-right" style={{ width: '60%', float: 'right', backgroundColor: '#232b2b' }}>
          <ContestLeaderboard />
        </div>
      </main>
    </div>
  );
};

export default CodingBattlefield;
