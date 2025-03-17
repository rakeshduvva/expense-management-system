import React from 'react';
import { Typography, Container, Box, List, ListItem, ListItemText, Button } from '@mui/material';

const Approval = () => {
  const pendingApprovals = [
    { id: 1, description: 'Office Supplies', amount: 200, submittedBy: 'John Doe' },
    { id: 2, description: 'Travel Expenses', amount: 500, submittedBy: 'Jane Smith' },
  ];

  return (
    <div
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
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
            Pending Approvals
          </Typography>
          <List>
            {pendingApprovals.map((approval) => (
              <ListItem key={approval.id} divider>
                <ListItemText
                  primary={approval.description}
                  secondary={`Amount: $${approval.amount} | Submitted By: ${approval.submittedBy}`}
                />
                <Button variant="contained" color="primary">
                  Approve
                </Button>
                <Button variant="contained" color="error" style={{ marginLeft: '10px' }}>
                  Reject
                </Button>
              </ListItem>
            ))}
          </List>
        </Box>
      </Container>
    </div>
  );
};

export default Approval;