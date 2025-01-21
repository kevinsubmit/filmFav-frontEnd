import { createContext, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import SignupForm from './components/SignUpForm/SignUpForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SigninForm from './components/SignInForm/SigninForm';
import * as authService from '../src/services/authService';
import { getUser } from '../src/services/authService';


export const AuthedUserContext = createContext(null); // set the initial value of the context to null

const App = () => {
  const [user, setUser] = useState(authService.getUser()); // using the method from authservice

  useEffect(() => {
    const loggedInUser = authService.getUser();
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);


  const handleSignout = () => {
    authService.signout()
    setUser(null)
  }
  

  return (
    <AuthedUserContext.Provider value={user}>
      <NavBar handleSignout={handleSignout} />
      <Routes>
        {user ? (
          <Route path="/" element={<Dashboard />} />
        ) : (
          <Route path="/" element={<Landing />} />
        )}
        <Route path="/signup" element={<SignupForm setUser={setUser} />} />
        <Route path="/signin" element={<SigninForm setUser={setUser} />} />
      </Routes>
    </AuthedUserContext.Provider>
  );
};

export default App;