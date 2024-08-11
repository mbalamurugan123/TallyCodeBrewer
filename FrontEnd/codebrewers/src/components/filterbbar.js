import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const FilterNav = () => {
  const [topics, setTopics] = useState([]);
  const [filters, setFilters] = useState([]);
  const [problems, setProblems] = useState([]);
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [topicFilter, setTopicFilter] = useState('All');
  useEffect(() => {
    // Fetch topics
    fetch('http://localhost:5000/topics')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setTopics(data);
        } else {
          console.error('Unexpected response format for topics:', data);
        }
      })
      .catch(error => console.error('Error fetching topics:', error));
    // Fetch filters
    fetch('http://localhost:5000/filters')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setFilters(data);
        } else {
          console.error('Unexpected response format for filters:', data);
        }
      })
      .catch(error => console.error('Error fetching filters:', error));

    // Fetch problems
    fetch('http://localhost:5000/problems')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProblems(data);
        } else {
          console.error('Unexpected response format for problems:', data);
        }
      })
      .catch(error => console.error('Error fetching problems:', error));
  }, []);

  const handleDifficultyFilterChange = (event) => {
    setDifficultyFilter(event.target.textContent);
  };

  const handleTopicFilterChange = (event) => {
    setTopicFilter(event.target.textContent);
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  // Filter problems based on difficulty and search query
  const filteredProblems = problems
    .filter(problem => difficultyFilter === 'All' || problem.difficulty === difficultyFilter)
    .filter(problem => problem.title.toLowerCase().includes(searchQuery));

  return (
    <div className="container mt-4">
      {/* Display topics */}
      <div className="d-flex flex-wrap mb-3">
        {topics.map((topic) => (
          <div key={topic.id} className="badge bg-light text-dark m-2" style={{ borderRadius: '20px', padding: '10px 15px' }}>
            {topic.name} <span className="badge bg-secondary">{topic.count}</span>
          </div>
        ))}
      </div>

      {/* Search and Filter by Difficulty */}
      {/* Search and Filter by Difficulty */}
      <div className="d-flex mb-3">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Search problems"
          onChange={handleSearchQueryChange}
        />
        {/* <div className="dropdown">
          <button className="btn btn-outline-secondary dropdown-toggle" type="button" id="difficultyDropdown" data-bs-toggle="dropdown">
            {difficultyFilter === 'All' ? 'Filter by Difficulty' : difficultyFilter}
          </button>
          <ul className="dropdown-menu" aria-labelledby="difficultyDropdown">
            <li><a className="dropdown-item" href="#" onClick={handleDifficultyFilterChange}>All</a></li>
            <li><a className="dropdown-item" href="#" onClick={handleDifficultyFilterChange}>Easy</a></li>
            <li><a className="dropdown-item" href="#" onClick={handleDifficultyFilterChange}>Medium</a></li>
            <li><a className="dropdown-item" href="#" onClick={handleDifficultyFilterChange}>Hard</a></li>
          </ul>
        </div>
        <div className="dropdown">
          <button className="btn btn-outline-secondary dropdown-toggle" type="button" id="topicDropdown" data-bs-toggle="dropdown">
            {topicFilter === 'All' ? 'Filter by Topic' : topicFilter}
          </button>
          <ul className="dropdown-menu" aria-labelledby="topicDropdown">
            <li><a className="dropdown-item" href="#" onClick={handleTopicFilterChange}>All</a></li>
            {topics.map((topic) => (
              <li key={topic.id}><a className="dropdown-item" href="#" onClick={handleTopicFilterChange}>{topic.name}</a></li>
            ))}
          </ul>
        </div> */}
      </div>

      {/* Display problems in a table */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Difficulty</th>
            <th>tags</th>
            <th>Solved</th>
          </tr>
        </thead>
        <tbody>
          {filteredProblems.length > 0 ? (
            filteredProblems.map((problem) => (
              <tr key={problem.id} style={{ cursor: 'pointer' }} onClick={() => alert(`Problem: ${problem.title}`)}>
                <td>{problem.id}</td>
                <td>{problem.title}</td>
                <td>{problem.difficulty}</td>
                <td>{problem.tags}</td>
                <td>{problem.solved ? 'Solved' : 'Unsolved'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No problems found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FilterNav;
