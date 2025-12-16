import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <div className="logo">LM</div>
          <div className="brand-text">
            <h1>Library Manager</h1>
            <p>React + Vite Frontend + Friendly UI</p>
          </div>
        </div>
        <div className="navbar-links">
          <Link to="/" className="nav-link">Books</Link>
          <Link to="/add" className="nav-link nav-link-button">Add Book</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

