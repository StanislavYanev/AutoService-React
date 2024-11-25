import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../css/home.css";
import WorkOrderActive from "./WorkOrdersAcvtive";
import CreateWorkOrderForm from "./CreateWorkOrderForm"
import Header from "./Header";
import Footer from "./Footer";

function ServiceManagement() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header/>
        <main className="flex-grow-1">
          <div className="container mt-5">
            {/* Добавяне на маршрутите */}
        <Routes>
          <Route path="/work-orders/work-order-list" element={<WorkOrderActive />} />
          <Route path="/work-orders/add-workorder" element={<CreateWorkOrderForm/>} />
          {/* Можете да добавите други маршрути тук */}
        </Routes>
          </div>
        </main>
        <Footer/>
        

        
      </div>
    </Router>
  );
}

export default ServiceManagement;
