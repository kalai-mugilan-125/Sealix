import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { authService } from '../services/authService';

export default function Home() {
  const [selectedRole, setSelectedRole] = useState('');
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleInputChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!selectedRole) {
      alert('Please select a role');
      return;
    }

    if (!credentials.username || !credentials.password) {
      alert('Please enter username and password');
      return;
    }

    setLoading(true);
    
    try {
      const response = await authService.login(credentials.username, credentials.password, selectedRole);
      
      if (response.success) {
        // Store user role for navbar
        localStorage.setItem('userRole', selectedRole);
        localStorage.setItem('authToken', response.token);
        
        // Redirect to appropriate dashboard
        router.push(`/dashboard/${selectedRole}`);
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Sealix - Secure Document Verification</title>
        <meta name="description" content="Secure blockchain-based document verification system" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="login-container">
        <div className="login-card">
          <h1>Welcome to Sealix</h1>
          <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#6b7280' }}>
            Secure Document Verification Platform
          </p>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="role">Select Role:</label>
              <select 
                id="role"
                value={selectedRole} 
                onChange={handleRoleChange}
                required
              >
                <option value="">Choose your role...</option>
                <option value="issuer">Document Issuer</option>
                <option value="user">Document Holder</option>
                <option value="verifier">Document Verifier</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={credentials.username}
                onChange={handleInputChange}
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                required
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <h3>Role Descriptions:</h3>
            <div style={{ textAlign: 'left', marginTop: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
              <p><strong>Document Issuer:</strong> Organizations that create and issue verified documents</p>
              <p><strong>Document Holder:</strong> Individuals who own and manage their documents</p>
              <p><strong>Document Verifier:</strong> Entities that need to verify document authenticity</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}