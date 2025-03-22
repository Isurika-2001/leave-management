import { Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TableSortLabel } from '@mui/material';
import { ReactElement, useState } from 'react';

// Mock data for departments with supervisor name
const departments = [
  { id: 1, name: 'HR', supervisor: 'John Doe' },
  { id: 2, name: 'Finance', supervisor: 'Jane Smith' },
  { id: 3, name: 'Engineering', supervisor: 'Mark Wilson' },
  { id: 4, name: 'Sales', supervisor: 'Lisa Brown' },
];

const DepartmentManagement = (): ReactElement => {
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc'); // Sorting direction
  const [orderBy, setOrderBy] = useState<string>('name'); // Column to sort by

  // Sorting function
  const handleRequestSort = (property: string) => {
    const isAscending = orderBy === property && sortDirection === 'asc';
    setSortDirection(isAscending ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Sorting the departments based on selected column and direction
  const sortedDepartments = [...departments].sort((a, b) => {
    if (orderBy === 'name') {
      return sortDirection === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    }
    if (orderBy === 'supervisor') {
      return sortDirection === 'asc' ? a.supervisor.localeCompare(b.supervisor) : b.supervisor.localeCompare(a.supervisor);
    }
    return 0;
  });

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
      {/* Department Management Header and Create New Button */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="subtitle1" color="text.primary">
          Department Management
        </Typography>
        <Button variant="contained" color="primary" sx={{ maxWidth: 200 }}>
          Create New Department
        </Button>
      </Stack>

      {/* Table of current departments */}
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
                  Department Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'supervisor'}
                  direction={orderBy === 'supervisor' ? sortDirection : 'asc'}
                  onClick={() => handleRequestSort('supervisor')}
                >
                  Supervisor
                </TableSortLabel>
              </TableCell>
              <TableCell align="right"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedDepartments.map((department) => (
              <TableRow key={department.id}>
                <TableCell>{department.name}</TableCell>
                <TableCell>{department.supervisor}</TableCell>
                <TableCell align="right">
                  {/* You can add buttons here for future actions */}
                  <Button variant="contained" color="primary" size="small">
                    Edit
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

export default DepartmentManagement;
