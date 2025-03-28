import { Stack, Typography } from '@mui/material';
import { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomTable from 'components/base/CustomTable';

// Mock data for employee leave quotas
const employeesLeaveQuota = [
  { id: 1, name: 'Alice Brown', sick: 8, annual: 15, casual: 10, noPay: 0, liue: 5 },
  { id: 2, name: 'Bob White', sick: 8, annual: 15, casual: 10, noPay: 0, liue: 5 },
  { id: 3, name: 'Charlie Green', sick: 8, annual: 15, casual: 10, noPay: 0, liue: 5 },
  { id: 4, name: 'David Black', sick: 8, annual: 15, casual: 10, noPay: 0, liue: 5 },
];

const ManageLeaveQuota = (): ReactElement => {
  const [page, setPage] = useState(0); // Correct placement of useState
  const [rowsPerPage, setRowsPerPage] = useState(5); // Correct placement of useState
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

  // Columns definition
  interface TableColumn {
    id: string;
    label: string;
    sortable: boolean;
    align: 'left' | 'center' | 'right';
  }
  
  const columns: TableColumn[] = [
    { id: 'name', label: 'Employee Name', sortable: true, align: 'left' },
    { id: 'sick', label: 'Sick Leave', sortable: true, align: 'center' },
    { id: 'annual', label: 'Annual Leave', sortable: true, align: 'center' },
    { id: 'casual', label: 'Casual Leave', sortable: true, align: 'center' },
    { id: 'noPay', label: 'No Pay Leave', sortable: true, align: 'center' },
    { id: 'liue', label: 'Liue Leave', sortable: true, align: 'center' },
  ];  
  
  const navigate = useNavigate();
  const handleEdit = (id: number) => {
    navigate(`/employee/leave-quota/${id}`); 
  };

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
      }}
    >
      {/* Manage Leave Quota Header and Create New Button */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="subtitle1" color="text.primary">
          Manage Leave Quota
        </Typography>
      </Stack>

      {/* Table of employee leave quotas */}
      <CustomTable
        columns={columns}
        data={sortedLeaveQuotas}
        sortDirection={sortDirection}
        orderBy={orderBy}
        handleRequestSort={handleRequestSort}
        onEdit={handleEdit}
        rowsPerPage={rowsPerPage}
        page={page}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Stack>
  );
};

export default ManageLeaveQuota;
