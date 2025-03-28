import { Button, Stack, Typography } from '@mui/material';
import { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomTable from 'components/base/CustomTable';

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
  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page

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

  // Handle change of page
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };  

  // Handle change of rows per page
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when rows per page change
  };
  
  // navigate to /create-employee
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/employee/create-employee`); // This will navigate to /:id page
  };

  const columns = [
    { id: 'name', label: 'Employee Name', sortable: true },
    { id: 'email', label: 'Email', sortable: true },
    { id: 'department', label: 'Department', sortable: true },
    { id: 'role', label: 'Role', sortable: true },
  ];

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
        <Button onClick={handleNavigate} variant="contained" color="primary" sx={{ maxWidth: 200 }}>
          Create New Employee
        </Button>
      </Stack>

      {/* Custom Table for Employees */}
      <CustomTable
        columns={columns}
        data={sortedEmployees}
        sortDirection={sortDirection}
        orderBy={orderBy}
        handleRequestSort={handleRequestSort}
        onDelete={handleDelete}
        // on edit by id
        onEdit={(id) => console.log(`Editing employee with id: ${id}`)}
        rowsPerPage={rowsPerPage}
        page={page}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Stack>
  );
};

export default EmployeeManagement;
