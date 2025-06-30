import { useState, useEffect } from 'react';
import logo from './logo.svg';
import UserList from './components/UserList';
import LoginForm from './components/Login';
import './App.css';
import { io } from 'socket.io-client';

function App() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLogin = (data) => {
    console.log('Login successful:', data);
    localStorage.setItem("bearer_token", data.bearer_token);
    fetchUsers();
  };


  const fetchUsers = async () => {
    try {

      const token = localStorage.getItem('bearer_token');

      if (!token) {
        setError('Authentication required');
        setLoading(false);
        return;
      }

      setLoading(true);
      const response = await fetch('http://localhost:5000/users',
        {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        });
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();

    const newSocket = io('http://localhost:5000');
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>


      <main className="App-main">
        {error && <div className="error-message">{error}</div>}

        <section className="list-section">
          <LoginForm onLogin={handleLogin} />
        </section>

        <section className="list-section">
          <h2>Users</h2>
          {loading ? (
            <p>Loading users...</p>
          ) : (
            <UserList
              users={users}
            />
          )}
        </section>
      </main>

    </div>
  );
}

export default App;
