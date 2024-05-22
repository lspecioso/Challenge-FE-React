import React, { useState } from "react";
import "./App.css";

const transportOptions = {
  data: {
    car: { amount: 100, description: "Car" },
    bus: { amount: 50, description: "Bus" },
    bike: { amount: 10, description: "Bicycle" },
    airplane: { amount: 500, description: "Airplane" },
    helicopter: { amount: 200, description: "Helicopter" },
    boat: { amount: 200, description: "Boat" },
    ship: { amount: 400, description: "Ship" },
    yacht: { amount: 1000, description: "Yacht" },
  },
  transportType: {
    car: "land",
    bus: "land",
    bike: "land",
    airplane: "air",
    helicopter: "air",
    boat: "maritime",
    ship: "maritime",
    yacht: "maritime",
  },
};

// Formatea opciones de transporte utilizando Object.entries y reduce como hablamos
const transportOptionsFormatted = {
  data: Object.entries(transportOptions.data).reduce((acc, [key, value]) => {
    const type = transportOptions.transportType[key];
    return { ...acc, [key]: { ...value, type } };
  }, {}),
  keys: Object.keys(transportOptions.data),
  transportType: new Set(
    Object.values(transportOptions.transportType).map((type) =>
      type.toUpperCase()
    )
  ),
};

function App() {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleClear = () => {
    setSelectedOption(null);
  };

  return (
    <div className="App">
      <p>
        Tipos de medio de transporte:{" "}
        <span>{[...transportOptionsFormatted.transportType].join(" - ")}</span>
      </p>
      <div className="select-container">
        <label>Selecciona un medio de transporte</label>
        <select value={selectedOption} onChange={handleChange}>
          <option value="">Selecciona un transporte</option>
          {transportOptionsFormatted.keys.map((key) => (
            <option key={key} value={key}>
               {`${transportOptionsFormatted.data[key].description} - ${transportOptionsFormatted.data[key].type}`}
            </option>
          ))}
        </select>

        <button onClick={handleClear}>Limpiar</button>
      </div>
      {selectedOption && (
        <div>
          <h3>{selectedOption}</h3>
          <p>
            Description: {transportOptionsFormatted.data[selectedOption].description}
          </p>
          <p>
            Amount: {transportOptionsFormatted.data[selectedOption].amount}
          </p>
          <p>
            Type: {transportOptionsFormatted.data[selectedOption].type}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
