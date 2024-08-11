import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

const ContestCreationForm = ({ onCreateContest }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [participantName, setParticipantName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newContest = {
      title,
      description,
      date,
      participantName,
      startTime,
      endTime
    };

    const authToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbjEyM0BnbWFpbC5jb20iLCJpYXQiOjE3MjMzNDY1NDIsImV4cCI6MTcyMzQ5MDU0Mn0.tsTtpTcenH_zpi2gBl_iWAnP8qUyvlQfwXBMkuuQ9pk";

    try {
      const response = await axios.post('http://localhost:8181/api/connect/contest', newContest, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      onCreateContest(response.data); // Add the newly created contest to the list
      setTitle('');
      setDescription('');
      setDate('');
      setParticipantName('');
      setStartTime('');
      setEndTime('');
      alert('Contest created successfully!');
    } catch (error) {
      console.error('There was an error creating the contest!', error);
      alert('Failed to create contest. Please try again.');
    }
  };

  return (
    <div className="creation-form">
      <h2>Create a New Contest</h2>
      <p>Fill out the form below to register a new contest.</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Contest Title</label>
          <input
            id="title"
            type="text"
            placeholder="Enter contest title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Contest Description</label>
          <textarea
            id="description"
            placeholder="Enter contest description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Contest Date</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="participantName">Participant Name</label>
          <input
            id="participantName"
            type="text"
            placeholder="Enter participant's name"
            value={participantName}
            onChange={(e) => setParticipantName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="startTime">Start Time</label>
          <input
            id="startTime"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="endTime">End Time</label>
          <input
            id="endTime"
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default ContestCreationForm;
