import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Typography, Button, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="md">
        <Box
          p={4}
          bgcolor="background.paper"
          borderRadius={2}
          boxShadow={3}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Welcome, {user?.username}
          </Typography>
          <Box mt={3} display="flex" justifyContent="center" gap={2}>
            <Button variant="contained" color="primary" onClick={() => navigate('/expense')}>
              Add Expense
            </Button>
            <Button variant="contained" color="secondary" onClick={() => navigate('/approval')}>
              Approvals
            </Button>
            <Button variant="contained" onClick={() => navigate('/reports')}>
              Reports
            </Button>
            <Button variant="contained" color="error" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Dashboard;