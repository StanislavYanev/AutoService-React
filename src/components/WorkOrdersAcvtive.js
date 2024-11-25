import axios from "axios";
import React, { useEffect, useState } from "react";
import SearchWorkOrder from "./CreateWorkOrder/SearchWorkOrder";
import WorkOrderDetails from "./CreateWorkOrder/DetailWorkOrder"
import "../css/work-order-list.css";

function WorkOrderActive() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/work-orders/work-order-list/"
        );
        setData(response.data);
      } catch (err) {
        setError("Неуспешно зареждане на данните");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDetailsClick = (id) => {};



  if (loading) return <p className="loading">Зареждане на данните...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="work-order-active">
      <h2 className="title">Active Work Orders</h2>
      <SearchWorkOrder />
      <div className="grid">
        {data.map((WorkOrder) => (
          <div className="card" key={WorkOrder.id}>
            <div className="card-content">
              <div className="card-text">
                <h3>Work Order No: {WorkOrder.id}</h3>
                <p>
                  Customer: {WorkOrder.customer?.name || "No customer info"}
                </p>
                <p>Total: {WorkOrder.total_price || 0} BGN</p>
                <button
              className="details-button"
              onClick={() => handleDetailsClick(WorkOrder.id)}
            >
              View Work Order
            </button>
              </div>
              <img
                src={WorkOrder.image || "/image/car_logo_updated2.png"}
                alt={`Work Order ${WorkOrder.id}`}
                className="work-order-image"
              />
            </div>
            <div className="segments">
              {WorkOrder.segments && WorkOrder.segments.length > 0 ? (
                WorkOrder.segments.map((segment, index) => (
                  <div className="segment" key={index}>
                    <p>
                      Segment:{" "}
                      {segment.description_work || "No description available"}
                    </p>
                    <p>Total Price: {segment.total_price || 0} BGN</p>
                  </div>
                ))
              ) : (
                <p className="no-segments">No segments available</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkOrderActive;
