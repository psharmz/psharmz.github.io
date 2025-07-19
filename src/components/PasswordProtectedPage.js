import React, { useState } from 'react';

function PasswordProtectedPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const correctPassword = "cl1ppy2025!";

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (password === correctPassword) {
      setShowError(false);
      setShowSuccess(true);
      setTimeout(() => {
        setIsAuthenticated(true);
      }, 1000);
    } else {
      setShowSuccess(false);
      setShowError(true);
      setPassword('');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setPassword('');
    setShowError(false);
    setShowSuccess(false);
  };

  const loginFormStyle = {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    background: '#d0d0d0',
    backgroundImage: `radial-gradient(circle at 20% 30%, rgba(220, 70, 50, 0.6) 0%, rgba(220, 70, 50, 0.3) 30%, transparent 50%),
                     radial-gradient(circle at 80% 70%, rgba(255, 140, 70, 0.6) 0%, rgba(255, 140, 70, 0.3) 30%, transparent 50%)`,
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
  };

  const containerStyle = {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '40px',
    maxWidth: '400px',
    width: '100%',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    textAlign: 'center',
    animation: isShaking ? 'shake 0.4s ease-in-out both' : 'none'
  };

  const protectedContentStyle = {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '40px',
    maxWidth: '800px',
    width: '100%',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    position: 'relative'
  };

  const buttonStyle = {
    background: 'linear-gradient(135deg, #2a2a2a 0%, #4a4a4a 50%, #6a6a6a 100%)',
    color: 'white',
    border: 'none',
    padding: '12px 30px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.1s ease',
    width: '100%',
    outline: 'none',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    border: '2px solid transparent'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    border: '2px solid #e1e5e9',
    borderRadius: '8px',
    fontSize: '16px',
    transition: 'border-color 0.3s ease',
    background: 'rgba(255, 255, 255, 0.8)',
    marginBottom: '20px'
  };

  if (!isAuthenticated) {
    return (
      <div style={loginFormStyle}>
        <div style={containerStyle}>
          <h1 style={{ color: '#333', marginBottom: '30px', fontSize: '2rem' }}>
            🔐 Password, please.
          </h1>
          <p style={{ color: '#666', marginBottom: '30px' }}>
            Please reach out about accessing this content.
          </p>
          
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px', textAlign: 'left' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#555', fontWeight: '500' }}>
                Password:
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={inputStyle}
              />
            </div>
            <button type="submit" style={buttonStyle}>
              Login
            </button>
          </form>
          
          {showError && (
            <div style={{
              color: '#e74c3c',
              marginTop: '15px',
              padding: '10px',
              background: 'rgba(231, 76, 60, 0.1)',
              borderRadius: '6px'
            }}>
              Wrong password
            </div>
          )}
          
          {showSuccess && (
            <div style={{
              color: '#27ae60',
              marginTop: '15px',
              padding: '10px',
              background: 'rgba(39, 174, 96, 0.1)',
              borderRadius: '6px'
            }}>
              Access granted! Loading content...
            </div>
          )}
        </div>
        
        <style jsx>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-4px); }
            75% { transform: translateX(4px); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={loginFormStyle}>
      <div style={protectedContentStyle}>
        <button
          onClick={logout}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.2)',
            color: '#333',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Logout
        </button>
        
        <h1 style={{ color: '#333', marginBottom: '30px' }}>🎉 Welcome to Protected Content</h1>
        
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ color: '#444', marginBottom: '20px' }}>Microsoft Design Portfolio</h2>
          <p style={{ lineHeight: '1.6', color: '#555', marginBottom: '15px' }}>
            This is your protected content area. You can put any sensitive information, portfolio details, or private projects here.
          </p>
          
          <div style={{
            background: 'linear-gradient(135deg, #8a8a8a 0%, #dc4632 50%, #ff8c46 100%)',
            color: 'white',
            padding: '20px',
            borderRadius: '10px',
            margin: '20px 0'
          }}>
            <h3>Featured Projects</h3>
            <p>Here you could showcase your confidential work, client projects, or any content that requires authentication to view.</p>
          </div>
          
          <p style={{ lineHeight: '1.6', color: '#555', marginBottom: '15px' }}>
            This content is only visible after successful authentication. You can customize this page to show whatever protected information you need.
          </p>
        </div>
        
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ color: '#444', marginBottom: '20px' }}>Project Details</h2>
          <p style={{ lineHeight: '1.6', color: '#555', marginBottom: '15px' }}>
            Add your actual portfolio content, project descriptions, images, or any other protected information here.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PasswordProtectedPage;