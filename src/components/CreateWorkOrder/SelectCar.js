import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/customer-search.css";

function SelectCar({ selectedClient,onSelectCar }) {
  const url = "http://127.0.0.1:8000/api/work-orders/search-car/";
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCar, setSelectedCar] = useState(null);

  const handleSearch = async () => {
    if (!selectedClient || !selectedClient.id) return; 
    setLoading(true);
    try {
      const response = await axios.get(url, { params: { customerId: selectedClient.id } });
      setCars(response.data); 
      setError("");
    } catch (err) {
      setCars([]);
      setError(err.response?.data?.message || "No cars found for this customer");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedClient && selectedClient.id) {
      handleSearch();
    } else {
      setCars([]); // Нулира списъка с автомобили
      setSelectedCar(null); // Нулира избраната кола
    }
  }, [selectedClient]);

  const handleSelectCar = (car) => {
    setSelectedCar(car);
    onSelectCar(car); 
  };

  const handleChangeCar = () => {
    setSelectedCar(null); 
  };

  if (!selectedClient) {
    // Ако няма избран клиент, показваме съобщение или празен изглед
    return (
      <div className="search-customer-box">
        <p className="no-results">No customer selected. Please select a customer</p>
      </div>
    );
  }

  return (
    <div className="search-customer-box">
      {!selectedCar && (
        <p className="selected-client">
          Select Cars from {selectedClient ? selectedClient.name : "Unknown Customer"} park
        </p>
      )}
      {selectedCar ? (
        <div className="selected-client">
          <p>Car: {selectedCar.color} {selectedCar.make} {selectedCar.model}</p>
          <button className="client-action-button" onClick={handleChangeCar}>
            Change
          </button>
        </div>
      ) : (
        <div>
          {loading ? (
            <p className="no-results">Loading cars...</p>
          ) : (
            <>
              {error && <p className="error-message">{error}</p>}
              <ul className="client-list">
                {cars.map((car) => (
                  <li className="client-item" key={car.id}>
                    <span>{car.color} {car.make} {car.model} </span>
                    <button
                      className="select-client-button"
                      onClick={() => handleSelectCar(car)}
                    >
                      Select
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default SelectCar;
