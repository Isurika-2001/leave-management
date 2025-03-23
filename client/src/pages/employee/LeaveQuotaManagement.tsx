import { Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TableSortLabel } from '@mui/material';
import { ReactElement, useState } from 'react';

// Mock data for employee leave quotas
const employeesLeaveQuota = [
  { id: 1, name: 'Alice Brown', sick: 8, annual: 15, casual: 10, noPay: 0, liue: 5 },
  { id: 2, name: 'Bob White', sick: 8, annual: 15, casual: 10, noPay: 0, liue: 5 },
  { id: 3, name: 'Charlie Green', sick: 8, annual: 15, casual: 10, noPay: 0, liue: 5 },
  { id: 4, name: 'David Black', sick: 8, annual: 15, casual: 10, noPay: 0, liue: 5 },
];

const ManageLeaveQuota = (): ReactElement => {
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<string>('name'); // Column to sort by

  // Sorting function
  const handleRequestSort = (property: string) => {
    const isAscending = orderBy === property && sortDirection === 'asc';
    setSortDirection(isAscending ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Sorting the leave quotas based on selected column and direction
  const sortedLeaveQuotas = [...employeesLeaveQuota].sort((a, b) => {
    if (orderBy === 'name') {
      return sortDirection === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    }
    return 0; // Sorting by name only
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
      {/* Manage Leave Quota Header and Create New Button */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="subtitle1" color="text.primary">
          Manage Leave Quota
        </Typography>
        <Button variant="contained" color="primary" sx={{ maxWidth: 200 }}>
          Create New Quota
        </Button>
      </Stack>

      {/* Table of employee leave quotas */}
      <TableContainer component={Paper} sx={{ borderRadius: 2, overflowX: 'auto', overflowY: 'hidden' }}>
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
              <TableCell align="center">Sick Leave</TableCell>
              <TableCell align="center">Annual Leave</TableCell>
              <TableCell align="center">Casual Leave</TableCell>
              <TableCell align="center">No Pay Leave</TableCell>
              <TableCell align="center">Liue Leave</TableCell>
              <TableCell align="right"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedLeaveQuotas.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.name}</TableCell>
                <TableCell align="center">{employee.sick}</TableCell>
                <TableCell align="center">{employee.annual}</TableCell>
                <TableCell align="center">{employee.casual}</TableCell>
                <TableCell align="center">{employee.noPay}</TableCell>
                <TableCell align="center">{employee.liue}</TableCell>
                <TableCell align="right">
                  <Button variant="contained" color="primary" size="small" sx={{ mr: 1 }}>
                    View
                  </Button>
                  <Button variant="contained" color="secondary" size="small" sx={{ mr: 1 }}>
                    Edit
                  </Button>
                  <Button variant="contained" color="error" size="small">
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

export default ManageLeaveQuota;
