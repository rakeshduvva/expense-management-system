import React from 'react';
import { Typography, Container, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const Reports = () => {
  const reports = [
    { id: 1, month: 'January', totalExpenses: 1200 },
    { id: 2, month: 'February', totalExpenses: 1500 },
    { id: 3, month: 'March', totalExpenses: 900 },
  ];

  return (
    <div
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
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
            Reports
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Month</TableCell>
                  <TableCell align="right">Total Expenses</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>{report.month}</TableCell>
                    <TableCell align="right">${report.totalExpenses}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </div>
  );
};

export default Reports;