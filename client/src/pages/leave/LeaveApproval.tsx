import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import { ReactElement, useState } from 'react';

const LeaveApproval = (): ReactElement => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.target);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack
      sx={{
        bgcolor: 'common.white',
        borderRadius: 5,
        height: 1,
        flex: '1 1 auto',
        width: { xs: 'auto', sm: 0.5, lg: 'auto' },
        boxShadow: (theme) => theme.shadows[4],
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" padding={2.5}>
        <Typography variant="subtitle1" color="text.primary">
          Leave Approval
        </Typography>
        <IconButton
          aria-controls={open ? 'leave-approval-menu' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
          sx={{
            bgcolor: open ? 'action.active' : 'transparent',
            p: 1,
            width: 36,
            height: 36,
            '&:hover': {
              bgcolor: 'action.active',
            },
          }}
        >
          <IconifyIcon icon="ph:dots-three-outline-fill" color="text.secondary" />
        </IconButton>
        <Menu
          id="leave-approval-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'leave-approval-button',
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={handleClose}>
            <Typography variant="body1" component="p">
              Approve
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Typography variant="body1" component="p" color="error.main">
              Reject
            </Typography>
          </MenuItem>
        </Menu>
      </Stack>
      <Stack spacing={2} padding={2.5}>
        <Button variant="contained" color="primary" fullWidth>
          Approve Leave
        </Button>
      </Stack>
    </Stack>
  );
};

export default LeaveApproval;
