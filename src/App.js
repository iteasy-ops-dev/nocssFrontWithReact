// import React, { useState, useEffect } from 'react';

// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import FunctionForm from "./components/FunctionForm";
// import Login from "./components/Login";
// import Signup from "./components/Signup";

// import { fetchFunctions } from "./utils/apiUtils";

// const App = () => {
//   const [functions, setFunctions] = useState([]);
//   const [selectedFunction, setSelectedFunction] = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isSignup, setIsSignup] = useState(false);

//   useEffect(() => {
//     const loadFunctions = async () => {
//       const funcs = await fetchFunctions();
//       setFunctions(funcs);
//     };
//     loadFunctions();
//   }, []);

//   const handleLogin = () => {
//     setIsLoggedIn(true);
//   };

//   const handleSignup = () => {
//     setIsSignup(false);
//   };

//   const toggleAuthMode = () => {
//     setIsSignup(!isSignup);
//   };

//   const handleFunctionSelect = (func) => {
//     setSelectedFunction(func);
//   };

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     setSelectedFunction(null);
//   };

//   return (
//     <div>
//       <Header />
//       <div>
//         {!isLoggedIn ? (
//           <div>
//             {isSignup ? (
//               <Signup onSignup={handleSignup} />
//             ) : (
//               <Login onLogin={handleLogin} />
//             )}
//             <button onClick={toggleAuthMode}>
//               {isSignup ? '로그인으로 전환' : '회원가입으로 전환'}
//             </button>
//           </div>
//         ) : (
//           <div>
//             {selectedFunction ? (
//               <FunctionForm func={selectedFunction} onBack={() => setSelectedFunction(null)} />
//             ) : (
//               <div>
//                 <h2>Functions</h2>
//                 <ul>
//                   {functions.map((func) => (
//                     <li key={func}>
//                       <button onClick={() => handleFunctionSelect(func)}>{func}</button>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//             <button onClick={handleLogout}>로그아웃</button>
//           </div>
//         )}
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default App;

import React, { useState, useEffect } from 'react';

import Header from "./components/Header";
import Footer from "./components/Footer";
import FunctionForm from "./components/FunctionForm";
import Login from "./components/Login";
import Signup from "./components/Signup";

import { fetchFunctions } from "./utils/apiUtils";

const App = () => {
  const [functions, setFunctions] = useState([]);
  const [selectedFunction, setSelectedFunction] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  useEffect(() => {
    const loadFunctions = async () => {
      const funcs = await fetchFunctions();
      setFunctions(funcs);
    };

    if (isLoggedIn) {
      loadFunctions();
    }
  }, [isLoggedIn]);

  const handleLogin = (token) => {
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
            {selectedFunction ? (
              <FunctionForm func={selectedFunction} onBack={() => setSelectedFunction(null)} />
            ) : (
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
            <button onClick={handleLogout}>로그아웃</button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default App;
