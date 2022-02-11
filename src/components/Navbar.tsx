import React from 'react'
import logo from '../answer-logo.png'

const Navbar: React.FC = () => {
  return <nav className="navbar is-primary">
    <div className="container is-fluid">
      <div className="navbar-brand">
        <a href="/" className="navbar-item">
          <img src={logo} />
        </a>
      </div>
    </div>
  </nav>
}

export default Navbar
