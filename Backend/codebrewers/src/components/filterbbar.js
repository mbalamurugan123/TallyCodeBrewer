import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const FilterNav = () => {
  const [topics, setTopics] = useState([]);
  const [filters, setFilters] = useState([]);
  const [problems, setProblems] = useState([]);
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch topics
    fetch('http://localhost:3000/topics')
      .then(response => response.json())
      .then(data => {
        if (data.topics) {
          setTopics(data.topics);
        } else {
          console.error('Unexpected response format for topics:', data);
        }
      })
      .catch(error => console.error('Error fetching topics:', error));

    // Fetch filters
    fetch('http://localhost:3000/filters')
      .then(response => response.json())
      .then(data => {
        if (data.filters) {
          setFilters(data.filters);
        } else {
          console.error('Unexpected response format for filters:', data);
        }
      })
      .catch(error => console.error('Error fetching filters:', error));

    // Fetch problems
    fetch('http://localhost:3000/problems')
      .then(response => response.json())
      .then(data => {
        if (data.problems) {
          setProblems(data.problems);
        } else {
          console.error('Unexpected response format for problems:', data);
        }
      })
      .catch(error => console.error('Error fetching problems:', error));
  }, []);

  const handleDifficultyFilterChange = (event) => {
    setDifficultyFilter(event.target.textContent);
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
      <div className="d-flex flex-wrap mb-3">
        {topics.map((topic) => (
          <div key={topic.id} className="badge bg-light text-dark m-2" style={{ borderRadius: '20px', padding: '10px 15px' }}>
            {topic.name} <span className="badge bg-secondary">{topic.count}</span>
          </div>
        ))}
      </div>

      <div className="d-flex mb-3">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Search problems"
          onChange={handleSearchQueryChange}
        />
        <div className="dropdown">
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
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Difficulty</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredProblems.length > 0 ? (
            filteredProblems.map((problem) => (
              <tr key={problem.id} style={{ cursor: 'pointer' }} onClick={() => alert(`Problem: ${problem.title}`)}>
                <td>{problem.id}</td>
                <td>{problem.title}</td>
                <td>{problem.difficulty}</td>
                <td>{problem.status}</td>
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
