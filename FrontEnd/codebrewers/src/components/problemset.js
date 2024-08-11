import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Navbar from "./Navbar";
import 'react-calendar/dist/Calendar.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import FilterNav from "./filterbbar";
import { FaFire } from 'react-icons/fa';

const ProblemSet = () => {
  const [topics, setTopics] = useState([]);
  const [problems, setProblems] = useState([]);
  const [solvedCount, setSolvedCount] = useState(0);
  const [percentage, setPercentage] = useState(0); // State for percentage
  const [streakTotal, setStreakTotal] = useState(0); // State for streak total

  useEffect(() => {
    fetch('http://localhost:5000/problems')
      .then((response) => response.json())
      .then((data) => {
        setProblems(data);
        const count = data.filter(problem => problem.solved).length;
        setSolvedCount(count);
        const totalProblems = data.length;
        const solvedPercentage = totalProblems > 0 ? (count / totalProblems) * 100 : 0;
        setPercentage(solvedPercentage.toFixed(2));
        // Update streakTotal based on your logic
        const streak = data.filter(problem => problem.streak).length; // Example logic
        setStreakTotal(streak);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/topics')
      .then((response) => response.json())
      .then((data) => setTopics(data));
  }, []);

  return (
    <>
      <Container fluid>
        <Navbar />
        <Row className="my-4 justify-content-between">
          <Col md={9}>
            <Row>
              <Col md={4}>
                <Card
                  className="mb-3 text-center"
                  style={{
                    height: '300px', // Adjusted height to accommodate new content
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    backgroundColor: '#232b2b',
                    color: 'white'
                  }}
                >
                  <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                    {/* Card Title */}
                    <Card.Title className="mb-4">Coding PlayGround</Card.Title>

                    {/* User-defined Image */}
                    <img src='https://static.vecteezy.com/system/resources/previews/013/368/321/original/coding-3d-render-icon-illustration-png.png' alt="User Image" style={{ width: '100px', height: '100px', backgroundSize: 'fit' }} />



                    {/* Button with link to another page */}
                    <Button variant="primary" className="mt-4" href=''>
                      Learn More
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card
                  className="mb-3 text-center"
                  style={{
                    height: '300px', // Adjusted height to accommodate new content
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    backgroundColor: '#232b2b',
                    color: 'white'
                  }}
                >
                  <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                    {/* Card Title */}
                    <Card.Title className="mb-4">Coding BattleFeilds</Card.Title>

                    {/* User-defined Image */}
                    <img src='https://www.pngkey.com/png/full/898-8989988_crossed-swords-crossed-swords-emoji.png' alt="User Image" style={{ width: '100px', height: '100px', backgroundSize: 'fit' }} />



                    {/* Button with link to another page */}
                    <Button variant="primary" className="mt-4" href=''>
                      Learn More
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card
                  className="mb-3 text-center"
                  style={{
                    height: '300px', // Adjusted height to accommodate new content
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    backgroundColor: '#232b2b',
                    color: 'white'
                  }}
                >
                  <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                    {/* Streak Icon and Total */}
                    <div className="mt-4">
                      <FaFire size={150} color="#ff4500" />
                      <Card.Text className="mt-4" style={{ fontStyle: '-moz-initial' }}>Streak: {streakTotal}</Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col md={3}>
            <Card className="mb-3 text-center" style={{ height: '300px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', backgroundColor: '#232b2b', color: 'white' }}>
              <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <div style={{ position: 'relative', height: '150px', width: '150px' }}>
                  {/* Outer Semi-Circle */}
                  <CircularProgressbar
                    value={percentage}
                    styles={buildStyles({
                      rotation: 0.75, // Rotate to make it semi-circle
                      strokeLinecap: 'round',
                      trailColor: '#d6d6d6',
                      pathColor: '#007bff',
                      textColor: 'white', // Hide the percentage text
                    })}
                  />
                  {/* Inner Circle with Total Problems Solved */}
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    color: 'white',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '16px',
                    fontWeight: 'bold',
                  }}>
                    {solvedCount} / {problems.length}
                  </div>
                </div>
                <Card.Text className="mt-3">Progress</Card.Text>
                <Card.Text className="mt-3">Total Problems Solved: {solvedCount}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <FilterNav />
    </>
  );
};

export default ProblemSet;
