import { Button, Stack, Typography } from '@mui/material';
import { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomTable from 'components/base/CustomTable';

// Mock data for departments
const departments = [
  { id: 1, name: 'Marketing', description: 'Handles marketing and promotions' },
  { id: 2, name: 'Academic', description: 'Manages academic activities' },
  { id: 3, name: 'HR', description: 'Handles human resources' },
  { id: 4, name: 'Finance', description: 'Manages financials and accounts' },
];

const DepartmentManagement = (): ReactElement => {
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc'); // Sorting direction
  const [orderBy, setOrderBy] = useState<string>('name'); // Column to sort by
  const [departmentList, setDepartmentList] = useState(departments); // Department list state
  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page

  // Sorting function
  const handleRequestSort = (property: string) => {
    const isAscending = orderBy === property && sortDirection === 'asc';
    setSortDirection(isAscending ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Sorting the departments based on selected column and direction
  const sortedDepartments = [...departmentList].sort((a, b) => {
    if (orderBy === 'name') {
      return sortDirection === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    }
    if (orderBy === 'description') {
      return sortDirection === 'asc' ? a.description.localeCompare(b.description) : b.description.localeCompare(a.description);
    }
    return 0;
  });

  // Handle delete department
  const handleDelete = (id: number) => {
    const updatedDepartments = departmentList.filter((department) => department.id !== id);
    setDepartmentList(updatedDepartments);
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

  // Navigate to create department page
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/department/create-department`); // This will navigate to /create-department page
  };

  const columns = [
    { id: 'name', label: 'Department Name', sortable: true },
    { id: 'description', label: 'Description', sortable: true },
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
      {/* Department Management Header and Create New Button */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="subtitle1" color="text.primary">
          Department Management
        </Typography>
        <Button onClick={handleNavigate} variant="contained" color="primary" sx={{ maxWidth: 200 }}>
          Create New Department
        </Button>
      </Stack>

      {/* Custom Table for Departments */}
      <CustomTable
        columns={columns}
        data={sortedDepartments}
        sortDirection={sortDirection}
        orderBy={orderBy}
        handleRequestSort={handleRequestSort}
        onDelete={handleDelete}
        // on edit by id
        onEdit={(id => {
          navigate(`/department/update-department/${id}`); // This will navigate to /:id page
        })}
        rowsPerPage={rowsPerPage}
        page={page}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Stack>
  );
};

export default DepartmentManagement;
