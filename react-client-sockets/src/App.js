import { useState, useEffect } from 'react';
import logo from './logo.svg';
import UserList from './components/UserList';
import LoginForm from './components/Login';
import { io } from 'socket.io-client';

import './App.css';

function App() {

  const [users, setUsers] = useState([]);
  const [chatUsers, setChatUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);


  const handleLogin = (data) => {
    console.log('Login successful:', data);
    localStorage.setItem("bearer_token", data.bearer_token);
    fetchUsers();
  };
  const handleUserSelect = (user) => {
    setSelectedUser(user);
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

  const sendPrivateMessage = () => {
    if (!selectedUser || !message.trim()) {
      alert('Please select a user and enter a message');
      return;
    }

    // Emit message to server with target user ID
    socket.emit('private-message', {
      to: selectedUser.id,
      message: message.trim()
    });

    setMessage('');
  };

  const sendMessage = () => {
    if (input.trim() && socket) {
      socket.emit('message', input);
      setInput('');
    }
  };

  useEffect(() => {
    fetchUsers();

    // Get JWT token from localStorage
    const token = localStorage.getItem('bearer_token'); // Adjust key name as needed

    if (!token) {
      setError('No authentication token found. Please login.');
      return;
    }     

    const newSocket = io('http://localhost:5000', {
      auth: {
        token: token
      }
    });

    newSocket.on('connect', () => {
      setIsConnected(true);
      setError('');
    });

    newSocket.on('users', (usersChatList) => {
      console.log('Received users:', usersChatList);
      setChatUsers(usersChatList);
    });

    newSocket.on('user connected', (info) => {
      console.log('user connected:', info);
    });

    newSocket.on('connect_error', (err) => {
      setIsConnected(false);
      if (err.message === 'Invalid token' || err.message === 'No token provided') {
        setError('Authentication failed. Please login again.');
        // Optionally redirect to login or clear invalid token
        localStorage.removeItem('bearer_token');
      } else {
        setError('Connection failed: ' + err.message);
      }
    });

    newSocket.on('message', (data) => {
      console.log(data);
      let msg = data.first_name + ": " + data.text;
      setMessages(prev => [...prev, msg]);
    });

    newSocket.on('private-message', (data) => {
      console.log('private-message');
      console.log(data);

      let msg = data.from + ": " + data.message;

      setMessages(prev => [...prev, msg]);
    });

    setSocket(newSocket);

    return () => newSocket.close();

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

        <section>
          <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Online Users</h2>
              <div className={`ml-3 w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            </div>

            {!isConnected && (
              <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 rounded">
                <p className="text-yellow-700">Connecting to server...</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Users List */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-700">Select a User</h3>
                {chatUsers.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No users online</p>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {chatUsers.map((user) => (
                      <div
                        key={user.id}
                        onClick={() => handleUserSelect(user)}
                        className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${selectedUser?.id === user.id
                          ? 'bg-blue-100 border-2 border-blue-500'
                          : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                          }`}
                      >

                        <div>
                          <p className="font-medium text-gray-800">{user.id + ": " + user.first_name}</p>
                        </div>
                        {selectedUser?.id === user.id && (
                          <div className="ml-auto">
                            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-4 text-sm text-gray-500 text-center">
                  {chatUsers.length} user {chatUsers.length !== 1 ? 's' : ''} online
                </div>
              </div>

              {/* Message Section */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-700">Send Message</h3>

                {selectedUser ? (
                  <div className="space-y-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-600">Sending to:</p>
                      <p className="font-semibold text-blue-800">{selectedUser.username}</p>
                    </div>

                    <div>
                      <input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message here..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        rows="4"
                      />
                    </div>

                    <button
                      onClick={sendPrivateMessage}
                      disabled={!message.trim() || !isConnected}
                      className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      Send Message
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>Select a user to send a message</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="max-w-md mx-auto mt-8 p-4 border rounded">
            <div className="h-64 overflow-y-auto border p-2 mb-4">
              {messages.map((msg, i) => (
                <div key={i} className="mb-1">{msg}</div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type message..."
                className="flex-1 p-2 border rounded"
              />
              <button
                onClick={sendMessage}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Send
              </button>
            </div>
          </div>
        </section>

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
