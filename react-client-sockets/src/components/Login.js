import { useState } from 'react';

// LoginForm Component
function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage('Login successful!');
        if (onLogin) {
          onLogin(data);
        }
      } else {
        setMessage(`Login failed: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl mb-4">Login Form</h2>
      
      <div className="mb-4">
        <label className="block mb-1">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full border p-2"
            placeholder="user@example.com"
          />
        </label>
      </div>
      
      <div className="mb-4">
        <label className="block mb-1">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full border p-2"
          />
        </label>
      </div>
      
      <button 
        onClick={handleLogin} 
        disabled={isLoading}
        className="bg-blue-500 text-white p-2 rounded"
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
      
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}

export default LoginForm;