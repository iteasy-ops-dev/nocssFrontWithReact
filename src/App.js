import React, { useState, useEffect } from 'react';

import Header from "./components/Header";
import Footer from "./components/Footer";
import Get from "./components/Get";
import FunctionForm from "./components/Function/Index";
import Login from "./components/Login";
import Signup from "./components/Signup";

import { fetchFunctions, logout } from "./utils/apiUtils";

const App = () => {
  const [functions, setFunctions] = useState([]);
  const [selectedFunction, setSelectedFunction] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [showFunctions, setShowFunctions] = useState(true);
  const [showGet, setShowGet] = useState(false);

  useEffect(() => {
    const loadFunctions = async () => {
      const funcs = await fetchFunctions();
      setFunctions(funcs);
    };

    if (isLoggedIn) {
      loadFunctions();
    }
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleSignup = () => {
    setIsSignup(false);
  };

  const toggleAuthMode = () => {
    setIsSignup(!isSignup);
  };

  const handleFunctionSelect = (func) => {
    setSelectedFunction(func);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setSelectedFunction(null);
    setShowFunctions(true);
    setShowGet(false);
    logout()
  };

  const toggleView = (view) => {
    if (view === 'functions') {
      setShowFunctions(true);
      setShowGet(false);
    } else if (view === 'get') {
      setShowFunctions(false);
      setShowGet(true);
    }
  };

  return (
    <div>
      <Header />
      <div>
        {!isLoggedIn ? (
          <div>
            {isSignup ? (
              <Signup onSignup={handleSignup} />
            ) : (
              <Login onLogin={handleLogin} />
            )}
            <button onClick={toggleAuthMode}>
              {isSignup ? '로그인으로 전환' : '회원가입으로 전환'}
            </button>
          </div>
        ) : (
          <div>
            {!selectedFunction && (
              <div>
                <button onClick={() => toggleView('functions')}>
                  {showFunctions ? 'Functions 숨기기' : 'Functions 보기'}
                </button>
                <button onClick={() => toggleView('get')}>
                  {showGet ? 'Get 숨기기' : 'Get 보기'}
                </button>
              </div>
            )}

            {showFunctions && !selectedFunction && (
              <div>
                <h2>Functions</h2>
                <ul>
                  {functions.map((func) => (
                    <li key={func}>
                      <button onClick={() => handleFunctionSelect(func)}>{func}</button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {selectedFunction && (
              <FunctionForm func={selectedFunction} onBack={() => setSelectedFunction(null)} />
            )}

            {showGet && (
              <div>
                <Get func={functions} />
              </div>
            )}
            <br />
            <button onClick={handleLogout}>로그아웃</button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default App;