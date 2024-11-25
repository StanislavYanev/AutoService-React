import React from "react";
import "../css/home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <div className="top-left-logo">
        <img
          src="/image/car_logo_updated2.png"
          alt="Logo"
          className="logo-img"
        />
      </div>
      <h1 className="text-center my-4">Service Management Area</h1>
      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container">
          <div className="collapse navbar-collapse justify-content-center">
            <ul className="nav">
              <li className="nav-item">
                <Link className="btn btn-custom mx-2 btn-custom-text" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="btn btn-custom mx-2 btn-custom-text"
                  to="/invoices"
                >
                  Invoices
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="btn btn-custom mx-2 btn-custom-text"
                  to="/customers"
                >
                  Customers
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="btn btn-custom mx-2 btn-custom-text"
                  to="/service-mans"
                >
                  Service Mans
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="btn btn-custom dropdown-toggle mx-2 btn-custom-text"
                  to="#"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Service Menu
                </Link>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <li className="nav-item">
                    <Link
                      className="dropdown-item"
                      to="/work-orders/work-order-list"
                    >
                      Work Order List
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/work-orders/add-workorder"
                    >
                      Create Work Order
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/work-orders/work-orders-search"
                    >
                      Edit Work Order
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link
                  className="btn btn-custom mx-2 btn-custom-text"
                  to="/spare-parts-inventory"
                >
                  Spare Parts Inventory
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
