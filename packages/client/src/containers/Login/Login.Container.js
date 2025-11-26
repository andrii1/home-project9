import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../../userContext';
import { Button } from '../../components/Button/Button.component';
import './Login.Style.css';
import { addUserToDb } from '../../utils/addUserToDb';

function Login() {
  const { logInWithEmailAndPassword, signInWithGoogle, loading, user } =
    useUserContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) {
      const nameToDb = user.displayName || '';
      addUserToDb(user, nameToDb);
      navigate('/');
    }
  }, [user, loading, navigate]);
  return (
    <div className="form-container signup-container">
      <div className="form-box signup-box">
        <h1>Log in</h1>
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <Button
          primary
          onClick={() => logInWithEmailAndPassword(email, password)}
          backgroundColor="#000"
          label="Log in"
        />
        <Button
          primary
          onClick={signInWithGoogle}
          backgroundColor="#4285f4"
          label="Sign in with Google"
        />
        <div>
          <Link className="form-additional-link" to="/reset">
            Forgot my password
          </Link>
        </div>
        <div className="form-additional-text">
          Don&apos;t have an account?{' '}
          <Link className="form-additional-link" to="/signup">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Login;
