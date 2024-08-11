import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Navbar from "./Navbar";
import 'react-calendar/dist/Calendar.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import FilterNav from "./filterbbar";
const ProblemSet = () => {
  const [topics, setTopics] = useState([]);
  const [problems, setProblems] = useState([]);
  const [solvedCount, setSolvedCount] = useState(0);
  const [percentage, setPercentage] = useState(0); // State for percentage

  useEffect(() => {
    fetch('http://localhost:3000/problems')
      .then((response) => response.json())
      .then((data) => {
        setProblems(data);
        const count = data.filter(problem => problem.solved).length;
        setSolvedCount(count);
        const totalProblems = data.length;
        const solvedPercentage = totalProblems > 0 ? (count / totalProblems) * 100 : 0;
        setPercentage(solvedPercentage.toFixed(2));
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/topics')
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
                  className="mb-2"
                  style={{
                    backgroundImage: `url('https://tse4.mm.bing.net/th?id=OIP.9MM6X42MisR5xciTuH1_IQHaEK&pid=Api&P=0&h=180')`,
                    backgroundSize: 'cover',
                    height: '150px',
                  }}
                >
                  <Card.Body className="text-white d-flex flex-column justify-content-between">
                    <Card.Title className="font-weight-bold">C++ Course</Card.Title>
                    <Card.Text>This is a C++ course with 10 problems.</Card.Text>
                    <Button variant="light" size="sm">Button 1</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card
                  className="mb-2"
                  style={{
                    backgroundImage: `url('https://tse4.mm.bing.net/th?id=OIP.JMM9gpniI-9KFN2Zj38SVgHaEs&pid=Api&P=0&h=180')`,
                    backgroundSize: 'cover',
                    height: '150px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  <Card.Body className="text-white d-flex flex-column justify-content-between">
                    <Card.Title className="font-weight-bold">Python Problems</Card.Title>
                    <Card.Text>This is a Python course with 10 problems.</Card.Text>
                    <Button variant="light" size="sm">Button 1</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card
                  className="mb-2"
                  style={{
                    backgroundImage: `url('https://wallpapercave.com/wp/wp6151456.jpg')`,
                    backgroundSize: 'cover',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    height: '150px',
                  }}
                >
                  <Card.Body className="text-white d-flex flex-column justify-content-between">
                    <Card.Title className="font-weight-bold">Java Problems</Card.Title>
                    <Card.Text>This is a Java course with 10 problems.</Card.Text>
                    <Button variant="light" size="sm">Button 1</Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Card
                  className="mb-2"
                  style={{
                    backgroundImage: `url('https://tse4.mm.bing.net/th?id=OIP.9MM6X42MisR5xciTuH1_IQHaEK&pid=Api&P=0&h=180')`,
                    backgroundSize: 'cover',
                    height: '150px',
                  }}
                >
                  <Card.Body className="text-white d-flex flex-column justify-content-between">
                    <Card.Title className="font-weight-bold">C# Course</Card.Title>
                    <Card.Text>This is a C# course with 10 problems.</Card.Text>
                    <Button variant="light" size="sm">Button 1</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card
                  className="mb-2"
                  style={{
                    backgroundImage: `url('https://tse4.mm.bing.net/th?id=OIP.JMM9gpniI-9KFN2Zj38SVgHaEs&pid=Api&P=0&h=180')`,
                    backgroundSize: 'cover',
                    height: '150px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  <Card.Body className="text-white d-flex flex-column justify-content-between">
                    <Card.Title className="font-weight-bold">JavaScript Problems</Card.Title>
                    <Card.Text>This is a JavaScript course with 10 problems.</Card.Text>
                    <Button variant="light" size="sm">Button 1</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card
                  className="mb-2"
                  style={{
                    backgroundImage: `url('https://wallpapercave.com/wp/wp6151456.jpg')`,
                    backgroundSize: 'cover',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    height: '150px',
                  }}
                >
                  <Card.Body className="text-white d-flex flex-column justify-content-between">
                    <Card.Title className="font-weight-bold">Ruby Problems</Card.Title>
                    <Card.Text>This is a Ruby course with 10 problems.</Card.Text>
                    <Button variant="light" size="sm">Button 1</Button>
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
      <FilterNav/>
    </>
  );
};

export default ProblemSet;
