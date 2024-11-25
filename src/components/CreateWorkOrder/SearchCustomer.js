import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "../../css/customer-search.css";

const SearchCustomer = ({ onSelectClient }) => {
  const url = "http://127.0.0.1:8000/api/work-orders/search-customer/";

  const [name, setName] = useState("");
  const [clients, setClients] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showSearchForm, setShowSearchForm] = useState(true);

  // Debounced search function
  const handleSearch = useCallback(async () => {
    if (!name.trim()) {
      setClients([]);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(url, {
        params: { name },
      });
      setClients(response.data);
      setError("");
    } catch (err) {
      setClients([]);
      setError(
        err.response?.data?.message || "Wrong customer or customer number"
      );
    } finally {
      setLoading(false);
    }
  }, [name, url]);

  // Debounce logic
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch();
    }, 500); // 500ms debounce interval

    return () => clearTimeout(timeoutId); // Cleanup on unmount or when `name` changes
  }, [name, handleSearch]);

  const handleSelectClient = (client) => {
    onSelectClient(client);
    setSelectedClient(client);
    setShowSearchForm(false);
    console.log("Selected client:", client);
  };

  const handleResetSearchForm = () => {
    setName("");
    setClients([]);
    setError("");
    setLoading(false);
    setShowSearchForm(true);
    setSelectedClient(null);
    onSelectClient(null);
  };

  return (
    <div className="search-customer-box">
      <div className="search-customer">
        {showSearchForm && (
          <div>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Cust Name or number"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {loading && <span className="loading-indicator">Loading...</span>}
            </div>

            {error && <p className="error-message">{error}</p>}
            {!loading && clients.length === 0 && name && (
              <p className="no-results">No customers found</p>
            )}

            <ul className="client-list">
              {clients.map((client) => (
                <li key={client.id} className="client-item">
                  <span>
                    {client.name},{client.country},{client.city}{" "}
                  </span>
                  <button
                    className="select-client-button"
                    onClick={() => handleSelectClient(client)}
                  >
                    Select
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {selectedClient && !showSearchForm && (
          <div className="selected-client">
            <p>Client: {selectedClient.name} </p>
            <button
              className="client-action-button"
              onClick={handleResetSearchForm}
            >
              Change
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchCustomer;
