import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUserContext } from '../../userContext';
import { Button } from '../../components/Button/Button.component';
import './Reset.styles.css';

function Reset() {
  const { user, loading, sendPasswordReset } = useUserContext();
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (user) navigate('/dashboard');
  }, [user, loading, navigate]);
  return (
    <div className="register-container">
      <div className="register">
        <h1>Reset your password</h1>
        <input
          type="text"
          className="reset__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <Button
          primary
          onClick={() => sendPasswordReset(email)}
          backgroundColor="#000"
          label="Send password reset email"
        />
        <div className="form-additional-text">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="form-additional-link">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Reset;
