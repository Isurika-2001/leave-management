import {
  Stack,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  TableSortLabel
} from '@mui/material';
import { useState } from 'react';

// Define the type for Leave Data
interface LeaveData {
  id: number;
  user: string;
  role: string;
  department: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  applyDate: string;
  status: string;
}

const PendingLeaveRequests = () => {
  const dummyData: LeaveData[] = [
    { id: 1, user: 'Jane Smith', role: 'Employee', department: 'Academic', leaveType: 'Casual Leave', startDate: '2024-03-05', endDate: '2024-03-06', applyDate: '2024-02-25', status: 'Pending' },
    { id: 2, user: 'Alice Brown', role: 'Supervisor', department: 'HR', leaveType: 'Sick Leave', startDate: '2024-04-01', endDate: '2024-04-03', applyDate: '2024-03-10', status: 'Pending' },
  ];

  const [sortConfig, setSortConfig] = useState<{ key: keyof LeaveData; direction: 'asc' | 'desc' }>({
    key: 'applyDate',
    direction: 'asc',
  });

  // Function to handle sorting
  const handleSort = (key: keyof LeaveData) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  // Sorting function
// Sorting function
const sortedData = [...dummyData]
  .filter((row) => row.status === 'Pending') // Only Pending Requests
  .sort((a, b) => {
    const valueA = a[sortConfig.key];
    const valueB = b[sortConfig.key];

    // Convert to date if sorting by date
    if (['applyDate', 'startDate', 'endDate'].includes(sortConfig.key)) {
      return sortConfig.direction === 'asc'
        ? new Date(valueA).getTime() - new Date(valueB).getTime()
        : new Date(valueB).getTime() - new Date(valueA).getTime();
    }

    // Sort alphabetically for other columns (ensure values are strings)
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return sortConfig.direction === 'asc'
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }

    // If not string, just compare numerically
    return sortConfig.direction === 'asc'
      ? (valueA as number) - (valueB as number)
      : (valueB as number) - (valueA as number);
  });

  // Approve/Decline Handlers
  const handleApprove = (id: number) => {
    console.log(`Approved leave request ID: ${id}`);
  };

  const handleDecline = (id: number) => {
    console.log(`Declined leave request ID: ${id}`);
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
      <Typography variant="subtitle1" color="text.primary" sx={{ mb: 2 }}>
        Pending Leave Requests
      </Typography>

      {/* Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Table>
          <TableHead sx={{ bgcolor: 'grey.200' }}>
            <TableRow>
              {[
                { label: 'User', key: 'user' },
                { label: 'Role', key: 'role' },
                { label: 'Department', key: 'department' },
                { label: 'Leave Type', key: 'leaveType' },
                { label: 'Apply Date', key: 'applyDate' },
                { label: 'Start Date', key: 'startDate' },
                { label: 'End Date', key: 'endDate' },
                { label: 'Status', key: 'status' },
              ].map(({ label, key }) => (
                <TableCell key={key}>
                  <TableSortLabel
                    active={sortConfig.key === key}
                    direction={sortConfig.direction}
                    onClick={() => handleSort(key as keyof LeaveData)}
                  >
                    <strong>{label}</strong>
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.length > 0 ? (
              sortedData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.user}</TableCell>
                  <TableCell>{row.role}</TableCell>
                  <TableCell>{row.department}</TableCell>
                  <TableCell>{row.leaveType}</TableCell>
                  <TableCell>{row.applyDate}</TableCell>
                  <TableCell>{row.startDate}</TableCell>
                  <TableCell>{row.endDate}</TableCell>
                  <TableCell>
                    <Chip label="Pending" color="warning" sx={{ fontWeight: 600 }} />
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" color="success" size="small" sx={{ mr: 1 }} onClick={() => handleApprove(row.id)}>
                      Approve
                    </Button>
                    <Button variant="contained" color="error" size="small" onClick={() => handleDecline(row.id)}>
                      Decline
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  No pending requests found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default PendingLeaveRequests;
