import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { FaFire, FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#232b2b', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" style={{ color: '#fff' }}>
          <img src="https://cdn3d.iconscout.com/3d/premium/thumb/coding-8915627-7322720.png" alt="Logo" style={{ height: '50px', marginRight: '10px', borderRadius: '4px' }} />
          TECHCODE
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" style={{ color: '#fff' }}></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/" style={{ color: '#fff' }}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/" style={{ color: '#fff' }}>Problems</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/" style={{ color: '#fff' }}>Contests</Link>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            <Link to="/" className="btn btn-outline-secondary me-2" style={{ borderRadius: '60%', borderColor: '#fff', color: '#fff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
              <FaFire size={20} style={{ color: 'red' }} /> {/* Fire icon */}
            </Link>
            <DropdownButton
              align="end"
              title={<FaUserCircle size={30} />}
              id="dropdown-menu-align-end"
              variant="outline-secondary"
              style={{ borderRadius: '50%', borderColor: '#fff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', color: '#fff' }}
            >
              <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
              <Dropdown.Item as={Link} to="/settings">Settings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="/">Logout</Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
