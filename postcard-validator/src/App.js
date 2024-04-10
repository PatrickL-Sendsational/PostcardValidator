// App.js
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import SignIn from './components/auth/SignIn';
import AuthenticatedApp from './AuthenticatedApp';
import './App.css';


function App() {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setAuthUser(user);
    });

    return () => unsubscribe();
  }, []);

  // Authenticated State
  if (authUser) {
    return <AuthenticatedApp />;
  }

  // Non-authenticated State
  return (
    <div className="App">
      <SignIn />
    </div>
  );
}

export default App;
