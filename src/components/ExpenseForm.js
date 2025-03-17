import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const ExpenseForm = () => {
  const [expense, setExpense] = useState({
    description: '',
    amount: '',
    category: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Expense Submitted:', expense);
  };

  return (
    <div
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="sm">
        <Box
          p={4}
          bgcolor="background.paper"
          borderRadius={2}
          boxShadow={3}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Add Expense
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Description"
              fullWidth
              margin="normal"
              value={expense.description}
              onChange={(e) => setExpense({ ...expense, description: e.target.value })}
            />
            <TextField
              label="Amount"
              fullWidth
              margin="normal"
              value={expense.amount}
              onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
            />
            <TextField
              label="Category"
              fullWidth
              margin="normal"
              value={expense.category}
              onChange={(e) => setExpense({ ...expense, category: e.target.value })}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default ExpenseForm;