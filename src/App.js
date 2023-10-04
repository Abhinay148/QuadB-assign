import React, { useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom'; // Import useHistory from react-router-dom

function App() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  // Get the history object from React Router
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignIn) {
      // Handle sign-in logic
      // If successful, redirect to select.js
      const savedEmail = sessionStorage.getItem('email');
      const savedPassword = sessionStorage.getItem('password');
      
      if (email === savedEmail && password === savedPassword) {
        navigate('/select');
      } else {
        alert('Invalid credentials');
      }
    } else {
      // Handle sign-up logic
      sessionStorage.setItem('email', email);
      sessionStorage.setItem('password', password);
      localStorage.setItem('username', username);
      alert('Account created');
    }

    setEmail('');
    setPassword('');
    setUsername('');
  };

  const toggleSignInSignUp = () => {
    setIsSignIn(!isSignIn);
    setEmail('');
    setPassword('');
    setUsername('');
  };

  return (
    <div className="App">
      <header className="App-header">
        {isSignIn ? <h2>Sign In</h2> : <h2>Sign Up</h2>}
        <form onSubmit={handleSubmit}>
          {!isSignIn && (
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          )}
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="button-container">
            <button type="submit">{isSignIn ? 'Sign In' : 'Sign Up'}</button>
          </div>
        </form>
        <p>
          {isSignIn ? "Don't have an account?" : "Already have an account?"}{' '}
          <span className="toggle-link" onClick={toggleSignInSignUp}>
            {isSignIn ? 'Sign Up' : 'Sign In'}
          </span>
        </p>
      </header>
    </div>
  );
}

export default App;
