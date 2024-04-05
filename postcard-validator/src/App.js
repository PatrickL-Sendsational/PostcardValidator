// App.js
import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import './App.css';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';

import { auth } from './firebase'; // Adjust the path as necessary


function App() {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setAuthUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth).catch(error => console.error(error));
  };

  // Authenticated State
  if (authUser) {
    return (
      <div className="App">
        <header className="App-header">
          <p>Do what you do Jeff</p>
          <button onClick={handleSignOut}>Log Out</button>
        </header>
      </div>
    );
  }

  // Non-authenticated State
  return (
    <div className="App">
      <SignIn />
      <SignUp />
    </div>
  );
}

export default App;
