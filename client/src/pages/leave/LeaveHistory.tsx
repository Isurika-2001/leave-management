import {
  Stack,
  Typography,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
} from '@mui/material';
import { useState } from 'react';
import { SelectChangeEvent } from '@mui/material';
import CustomTable from 'components/base/CustomTable';

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

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  // Columns definition
  interface TableColumn {
    id: string;
    label: string;
    sortable?: boolean;
    align: 'left' | 'right' | 'center';
    render?: (row: any) => JSX.Element;
  }
  
  const columns: TableColumn[] = [
    { id: 'user', label: 'User', sortable: true, align: 'left' },
    { id: 'role', label: 'Role', sortable: true, align: 'left' },
    { id: 'department', label: 'Department', sortable: true, align: 'left' },
    { id: 'leaveType', label: 'Leave Type', sortable: true, align: 'left' },
    { id: 'startDate', label: 'Start Date', sortable: true, align: 'left' },
    { id: 'endDate', label: 'End Date', sortable: true, align: 'left' },
    { 
      id: 'status', 
      label: 'Status', 
      sortable: false, 
      align: 'left',
      render: (row: LeaveData) => {
        console.log("Rendering Chip for:", row.status);
        return (
          <Chip
            label={row.status}
            sx={{
              backgroundColor: getStatusChip(row.status),
              color: 'white',
              fontWeight: 'bold',
            }}
          />
        );
      }      
    },    
  ];

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when rows per page change
  };

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

  // Function to get color code for status chip
  const getStatusChip = (status: string): string => {
    switch (status.toLowerCase()) { // Convert status to lowercase to ensure matching
      case 'approved':
        return '#4CAF50';  // Green for approved
      case 'pending':
        return '#FFC107';  // Yellow for pending
      case 'rejected':
        return '#F44336';  // Red for rejected
      default:
        return '#9E9E9E';  // Grey for other statuses
    }
  };

  const handleRequestSort = (key: keyof LeaveData) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
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

      <CustomTable
        columns={columns}
        data={sortedData}
        sortDirection={sortConfig.direction}
        orderBy={sortConfig.key}
        handleRequestSort={(key) => handleRequestSort(key as keyof LeaveData)}
        rowsPerPage={rowsPerPage}
        page={page}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Stack>
  );
};

export default LeaveHistory;
