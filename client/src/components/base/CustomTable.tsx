import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, 
  Button, TablePagination, Typography, Stack 
} from '@mui/material';
import { FC } from 'react';

interface TableColumn {
  id: string;
  label: string;
  align?: 'center' | 'right' | 'left';
  sortable?: boolean;
}

interface TableProps {
  columns: TableColumn[];
  data: any[];
  sortDirection: 'asc' | 'desc';
  orderBy: string;
  handleRequestSort: (property: string) => void;
  onApprove?: (id: number) => void;
  onDecline?: (id: number) => void;
  onDelete?: (id: number) => void;
  onView?: (id: number) => void;
  onEdit?: (id: number) => void;
  rowsPerPage: number;
  page: number;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomTable: FC<TableProps> = ({ 
  columns, 
  data, 
  sortDirection, 
  orderBy, 
  handleRequestSort, 
  onDelete, 
  onDecline, 
  onApprove, 
  onView, 
  onEdit, 
  rowsPerPage, 
  page, 
  handleChangePage, 
  handleChangeRowsPerPage 
}) => {
  // Check if any action handlers exist
  const hasActions = onView || onEdit || onDelete || onApprove || onDecline;

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2, overflowX: 'auto', overflowY: 'hidden' }}>
      <Table>
        <TableHead sx={{ bgcolor: 'lightGray' }}>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id} align={column.align}>
                {column.sortable ? (
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? sortDirection : 'asc'}
                    onClick={() => handleRequestSort(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                ) : (
                  <strong>{column.label}</strong>
                )}
              </TableCell>
            ))}
            {hasActions && <TableCell align="right"><strong>Actions</strong></TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
            <TableRow key={row.id} sx={{ bgcolor: index % 2 === 0 ? 'white' : 'grey.200' }}>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align}>
                  {row[column.id]}
                </TableCell>
              ))}
              {hasActions && (
                <TableCell align="right">
                  {onView && (
                    <Button variant="contained" color="primary" size="small" sx={{ mr: 1 }} onClick={() => onView(row.id)}>
                      View
                    </Button>
                  )}
                  {onEdit && (
                    <Button variant="contained" color="info" size="small" sx={{ mr: 1 }} onClick={() => onEdit(row.id)}>
                      Edit
                    </Button>
                  )}
                  {onDelete && (
                    <Button variant="contained" color="error" size="small" sx={{ mr: 1 }} onClick={() => onDelete(row.id)}>
                      Delete
                    </Button>
                  )}
                  {onDecline && (
                    <Button variant="contained" color="error" size="small" sx={{ mr: 1 }} onClick={() => onDecline(row.id)}>
                      Decline
                    </Button>
                  )}
                  {onApprove && (
                    <Button variant="contained" color="secondary" size="small" sx={{ mr: 1 }} onClick={() => onApprove(row.id)}>
                      Approve
                    </Button>
                  )}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {/* Pagination Controls and Page Number */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2, bgcolor: 'lightGray' }}>
        {/* Display Page Number */}
        <Typography variant="body2" sx={{ width: '200px', mx: 2 }}>
          Page {page + 1} of {Math.ceil(data.length / rowsPerPage)}
        </Typography>
        
        {/* Table Pagination Controls */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Stack>
    </TableContainer>
  );
};

export default CustomTable;
