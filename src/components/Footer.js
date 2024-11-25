import React from "react";
import "../css/home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";


function Footer() {
    return (
        <footer className="text-white text-center py-3 custom-footer mt-auto">
          <div className="container">
            <div className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
              <p className="col-md-4 mb-0 text-custom">© 2024 Company, Inc</p>
              <ul className="nav col-md-4 justify-content-end">
                <li className="nav-item">
                  <Link to="/" className="nav-link px-2 text-custom">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/features" className="nav-link px-2 text-custom">
                    Features
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/faqs" className="nav-link px-2 text-custom">
                    FAQs
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/about" className="nav-link px-2 text-custom">
                    About
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </footer>
    )
}

export default Footer;