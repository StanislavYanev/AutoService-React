import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/detail-work-order.css"


const WorkOrderDetails = ({ workOrderId }) => {
  const [workOrder, setWorkOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkOrder = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/work-orders/${workOrderId}`);
        setWorkOrder(response.data); // Данните са достъпни директно чрез response.data
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch work order details");
      } finally {
        setLoading(false);
      }
    };

    if (workOrderId) {
      fetchWorkOrder();
    }
  }, [workOrderId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!workOrder) {
    return <div>No work order details available.</div>;
  }

  return (
    <div className="work-order-details">
      <h2>Work Order Details</h2>
      <p><strong>ID:</strong> {workOrder.id}</p>
      <p><strong>Title:</strong> {workOrder.title}</p>
      <p><strong>Description:</strong> {workOrder.description}</p>
      <p><strong>Status:</strong> {workOrder.status}</p>
      <p><strong>Assigned To:</strong> {workOrder.assignedTo}</p>
      <p><strong>Created At:</strong> {new Date(workOrder.createdAt).toLocaleString()}</p>
      <p><strong>Due Date:</strong> {new Date(workOrder.dueDate).toLocaleString()}</p>
    </div>
  );
};

export default WorkOrderDetails;
