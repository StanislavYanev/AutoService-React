import React, { useState } from "react";
import axios from "axios";
import "../../css/search-work-order.css"; // Импортиране на стиловете

const SearchWorkOrder = () => {
  const [query, setQuery] = useState(""); // Едно поле за вход
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError(""); // Изчистване на грешките
    setResults([]); // Изчистване на старите резултати

    if (!query) {
      setError("Please enter a search query.");
      return;
    }

    try {
      // Изпращане на заявката към API
      const response = await axios.get(
        "http://localhost:8000/api/work-orders/search-work-order/",
        {
          params: { query },
        }
      );
      setResults(response.data); // Задаване на резултатите
    } catch (err) {
      if (err.response) {
        setError(
          err.response.data.error ||
            err.response.data.message ||
            "An error occurred."
        );
      } else {
        setError("Unable to connect to the server.");
      }
    }
  };

  return (
    <div className="search-container">
      <div className="search-input-container">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter WO number or customer name"
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="results-container">
        <ul className="results-list">
          {results.map((order) => (
            <li key={order.id} className="result-item">
              <div className="result-info">
                <p>
                  <strong>Number:</strong> {order.id}
                </p>
                <p>
                  <strong>Customer Name:</strong> {order.customer.name}
                </p>
                <p>
                  <strong>Description:</strong> {order.description_work}
                </p>
              </div>
              <button
                className="details-button"
                onClick={() => console.log(`Details for ${order.id}`)}
              >
                Details
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchWorkOrder;
