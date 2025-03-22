import { Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TableSortLabel } from '@mui/material';
import { ReactElement, useState } from 'react';

// Mock data for employees, based on the user schema
const employees = [
  { id: 1, name: 'Alice Brown', email: 'alice@example.com', department: 'Marketing', role: 'user' },
  { id: 2, name: 'Bob White', email: 'bob@example.com', department: 'Academic', role: 'supervisor' },
  { id: 3, name: 'Charlie Green', email: 'charlie@example.com', department: 'Marketing', role: 'admin' },
  { id: 4, name: 'David Black', email: 'david@example.com', department: 'Academic', role: 'superAdmin' },
];

const EmployeeManagement = (): ReactElement => {
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc'); // Sorting direction
  const [orderBy, setOrderBy] = useState<string>('name'); // Column to sort by
  const [employeeList, setEmployeeList] = useState(employees); // Employee list state

  // Sorting function
  const handleRequestSort = (property: string) => {
    const isAscending = orderBy === property && sortDirection === 'asc';
    setSortDirection(isAscending ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Sorting the employees based on selected column and direction
  const sortedEmployees = [...employeeList].sort((a, b) => {
    if (orderBy === 'name') {
      return sortDirection === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    }
    if (orderBy === 'email') {
      return sortDirection === 'asc' ? a.email.localeCompare(b.email) : b.email.localeCompare(a.email);
    }
    if (orderBy === 'department') {
      return sortDirection === 'asc' ? a.department.localeCompare(b.department) : b.department.localeCompare(a.department);
    }
    if (orderBy === 'role') {
      return sortDirection === 'asc' ? a.role.localeCompare(b.role) : b.role.localeCompare(a.role);
    }
    return 0;
  });

  // Handle delete employee
  const handleDelete = (id: number) => {
    const updatedEmployees = employeeList.filter((employee) => employee.id !== id);
    setEmployeeList(updatedEmployees);
  };

  return (
    <Stack
      sx={{
        bgcolor: 'common.white',
        borderRadius: 5,
        flex: '1 1 auto',
        width: '100%',
        mx: 'auto',
        boxShadow: (theme) => theme.shadows[4],
        padding: 2.5,
        marginRight: 3,
      }}
    >
      {/* Employee Management Header and Create New Button */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="subtitle1" color="text.primary">
          Employee Management
        </Typography>
        <Button variant="contained" color="primary" sx={{ maxWidth: 200 }}>
          Create New Employee
        </Button>
      </Stack>

      {/* Table of current employees */}
      <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Table>
          <TableHead sx={{ bgcolor: 'grey.200' }}>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? sortDirection : 'asc'}
                  onClick={() => handleRequestSort('name')}
                >
                  Employee Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'email'}
                  direction={orderBy === 'email' ? sortDirection : 'asc'}
                  onClick={() => handleRequestSort('email')}
                >
                  Email
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'department'}
                  direction={orderBy === 'department' ? sortDirection : 'asc'}
                  onClick={() => handleRequestSort('department')}
                >
                  Department
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'role'}
                  direction={orderBy === 'role' ? sortDirection : 'asc'}
                  onClick={() => handleRequestSort('role')}
                >
                  Role
                </TableSortLabel>
              </TableCell>
              <TableCell align="right"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedEmployees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{employee.role}</TableCell>
                <TableCell align="right">
                  <Button variant="contained" color="primary" size="small" sx={{ mr: 1 }}>
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(employee.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default EmployeeManagement;
