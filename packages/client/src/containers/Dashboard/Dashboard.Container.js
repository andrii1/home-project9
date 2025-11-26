import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../userContext';
import './Dashboard.Style.css';
import { Button } from '../../components/Button/Button.component';

export const Dashboard = () => {
  const { user, name, loading, logout } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate('/');
  }, [user, loading, navigate]);
  return (
    <div className="dashboard">
      <div className="dashboard__container">
        Logged in as
        <div>{name}</div>
        <div>{user?.email}</div>
        <Button onClick={logout} label="logout" />
      </div>
    </div>
  );
};
