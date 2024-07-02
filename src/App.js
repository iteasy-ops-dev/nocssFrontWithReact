import React, { useState, useEffect } from 'react';

import Header from "./components/Header";
import Footer from "./components/Footer";
import FunctionForm from "./components/FunctionForm";

import { fetchFunctions } from "./utils/apiUtils"

const App = () => {
  const [functions, setFunctions] = useState([]);
  const [selectedFunction, setSelectedFunction] = useState(null);

  useEffect(() => {
    const loadFunctions = async () => {
      const funcs = await fetchFunctions();
      setFunctions(funcs);
    };
    loadFunctions();
  }, []);

  return (
    <div>
      <Header />
      <div>
        {selectedFunction ? (
          <FunctionForm func={selectedFunction} onBack={() => setSelectedFunction(null)} />
        ) : (
          <div>
            <h2>Functions</h2>
            <ul>
              {functions.map((func) => (
                <li key={func}>
                  <button onClick={() => setSelectedFunction(func)}>{func}</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default App;
