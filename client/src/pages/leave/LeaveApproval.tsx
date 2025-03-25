import {
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import CustomTable from 'components/base/CustomTable';

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

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [sortConfig, setSortConfig] = useState<{ key: keyof LeaveData; direction: 'asc' | 'desc' }>({
    key: 'applyDate',
    direction: 'asc',
  });

  const handleRequestSort = (key: keyof LeaveData) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const sortedData = [...dummyData]
    .filter((row) => row.status === 'Pending')
    .sort((a, b) => {
      const valueA = a[sortConfig.key];
      const valueB = b[sortConfig.key];

      if (['applyDate', 'startDate', 'endDate'].includes(sortConfig.key)) {
        return sortConfig.direction === 'asc'
          ? new Date(valueA).getTime() - new Date(valueB).getTime()
          : new Date(valueB).getTime() - new Date(valueA).getTime();
      }

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return sortConfig.direction === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      return sortConfig.direction === 'asc'
        ? (valueA as number) - (valueB as number)
        : (valueB as number) - (valueA as number);
    });

  const handleApprove = (id: number) => {
    console.log(`Approved leave request ID: ${id}`);
  };

  const handleDecline = (id: number) => {
    console.log(`Declined leave request ID: ${id}`);
  };

  // Columns definition
  interface TableColumn {
    id: string;
    label: string;
    sortable: boolean;
    align: 'left' | 'center' | 'right';
  }

  const columns: TableColumn[] = [
    { id: 'user', label: 'User', sortable: true, align: 'left' },
    { id: 'role', label: 'Role', sortable: true, align: 'center' },
    { id: 'department', label: 'Department', sortable: true, align: 'center' },
    { id: 'leaveType', label: 'Leave Type', sortable: true, align: 'center' },
    { id: 'applyDate', label: 'Apply Date', sortable: true, align: 'center' },
    { id: 'startDate', label: 'Start Date', sortable: true, align: 'center' },
    { id: 'endDate', label: 'End Date', sortable: true, align: 'center' },
  ];

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };  

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when rows per page change
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
        flexWrap: 'wrap',
      }}
    >
      <Typography variant="subtitle1" color="text.primary" sx={{ mb: 2 }}>
        Pending Leave Requests
      </Typography>

      <CustomTable
        columns={columns}
        data={sortedData}
        sortDirection={sortConfig.direction}
        orderBy={sortConfig.key}
        handleRequestSort={(key) => handleRequestSort(key as keyof LeaveData)}
        onDecline={handleDecline}
        onApprove={handleApprove}
        onView={(id) => console.log(`View leave request ID: ${id}`)}
        rowsPerPage={rowsPerPage}
        page={page}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Stack>
  );
};

export default PendingLeaveRequests;
