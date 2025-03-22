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
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
  TableSortLabel,
} from '@mui/material';
import { useState } from 'react';
import { SelectChangeEvent } from '@mui/material';

// Define the type for Leave Data
interface LeaveData {
  id: number;
  user: string;
  role: string;
  department: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  status: string;
}

const LeaveHistory = () => {
  const dummyData: LeaveData[] = [
    { id: 1, user: 'John Doe', role: 'Supervisor', department: 'Marketing', leaveType: 'Sick Leave', startDate: '2024-03-01', endDate: '2024-03-03', status: 'Approved' },
    { id: 2, user: 'Jane Smith', role: 'Employee', department: 'Academic', leaveType: 'Casual Leave', startDate: '2024-03-05', endDate: '2024-03-06', status: 'Pending' },
    { id: 3, user: 'Mike Johnson', role: 'Supervisor', department: 'Marketing', leaveType: 'Vacation Leave', startDate: '2024-04-10', endDate: '2024-04-20', status: 'Rejected' },
  ];

  const [filters, setFilters] = useState({
    fromDate: '',
    toDate: '',
    status: '',
    role: '',
    department: '',
    leaveType: '',
  });

  const [sortConfig, setSortConfig] = useState<{ key: keyof LeaveData; direction: 'asc' | 'desc' }>({
    key: 'user',
    direction: 'asc',
  });

  // Separate event handler for TextField (Date fields or input fields)
  const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Separate event handler for Select component
  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Function to check if a date is in range
  const isDateInRange = (dateStr: string, fromDate: string, toDate: string): boolean => {
    const date = new Date(dateStr);
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    if (from && date < from) return false;
    if (to && date > to) return false;
    return true;
  };

  // Filtered Data
  const filteredData = dummyData.filter((row) => {
    return (
      isDateInRange(row.startDate, filters.fromDate, filters.toDate) &&
      isDateInRange(row.endDate, filters.fromDate, filters.toDate) &&
      (!filters.status || row.status === filters.status) &&
      (!filters.role || row.role === filters.role) &&
      (!filters.department || row.department === filters.department) &&
      (!filters.leaveType || row.leaveType === filters.leaveType)
    );
  });

  // Function to get colored status chip
  const getStatusChip = (status: string) => {
    const statusColors: Record<string, { label: string; color: 'success' | 'warning' | 'error' }> = {
      Approved: { label: 'Approved', color: 'success' },
      Pending: { label: 'Pending', color: 'warning' },
      Rejected: { label: 'Rejected', color: 'error' },
    };

    return (
      <Chip
        label={statusColors[status]?.label || status}
        color={statusColors[status]?.color}
        sx={{ fontWeight: 600 }}
      />
    );
  };

  // Function to handle sorting
  const handleSortRequest = (key: keyof LeaveData) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
  };

  // Sort filtered data
  const sortedData = filteredData.sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
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
      <Typography variant="subtitle1" color="text.primary" sx={{ mb: 2 }}>
        Leave History
      </Typography>

      {/* Filters */}
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 3 }}>
        <TextField
          label="From Date"
          type="date"
          name="fromDate"
          InputLabelProps={{ shrink: true }}
          value={filters.fromDate}
          onChange={handleTextFieldChange}
          fullWidth
        />
        <TextField
          label="To Date"
          type="date"
          name="toDate"
          InputLabelProps={{ shrink: true }}
          value={filters.toDate}
          onChange={handleTextFieldChange}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select name="status" value={filters.status} onChange={handleSelectChange}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Approved">Approved</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 3 }}>
        <FormControl fullWidth>
          <InputLabel>Role</InputLabel>
          <Select name="role" value={filters.role} onChange={handleSelectChange}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Supervisor">Supervisor</MenuItem>
            <MenuItem value="Employee">Employee</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Department</InputLabel>
          <Select name="department" value={filters.department} onChange={handleSelectChange}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Marketing">Marketing</MenuItem>
            <MenuItem value="Academic">Academic</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Leave Type</InputLabel>
          <Select name="leaveType" value={filters.leaveType} onChange={handleSelectChange}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Sick Leave">Sick Leave</MenuItem>
            <MenuItem value="Casual Leave">Casual Leave</MenuItem>
            <MenuItem value="Vacation Leave">Vacation Leave</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {/* Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Table>
          <TableHead sx={{ bgcolor: 'grey.200' }}>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === 'user'}
                  direction={sortConfig.direction}
                  onClick={() => handleSortRequest('user')}
                >
                  User
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === 'role'}
                  direction={sortConfig.direction}
                  onClick={() => handleSortRequest('role')}
                >
                  Role
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === 'department'}
                  direction={sortConfig.direction}
                  onClick={() => handleSortRequest('department')}
                >
                  Department
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === 'leaveType'}
                  direction={sortConfig.direction}
                  onClick={() => handleSortRequest('leaveType')}
                >
                  Leave Type
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === 'startDate'}
                  direction={sortConfig.direction}
                  onClick={() => handleSortRequest('startDate')}
                >
                  Start Date
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === 'endDate'}
                  direction={sortConfig.direction}
                  onClick={() => handleSortRequest('endDate')}
                >
                  End Date
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === 'status'}
                  direction={sortConfig.direction}
                  onClick={() => handleSortRequest('status')}
                >
                  Status
                </TableSortLabel>
              </TableCell>
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
                  <TableCell>{row.startDate}</TableCell>
                  <TableCell>{row.endDate}</TableCell>
                  <TableCell>{getStatusChip(row.status)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No records found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default LeaveHistory;
