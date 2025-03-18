import {
    Box,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Stack,
    Typography,
    useTheme,
  } from '@mui/material';
  import IconifyIcon from 'components/base/IconifyIcon';
  import { ReactElement, useState } from 'react';
  
  const LeaveQuotaManagement = (): ReactElement => {
    const theme = useTheme();
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
            Leave Quota Management
          </Typography>
          <IconButton
            id="leave-quota-management-button"
            aria-controls={open ? 'leave-quota-management-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
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
            id="leave-quota-management-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'leave-quota-management-button',
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleClose}>
              <Typography variant="body1" component="p">
                Edit
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Typography variant="body1" component="p" color="error.main">
                Delete
              </Typography>
            </MenuItem>
          </Menu>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          flex={1}
          gap={2}
          padding={(theme) => theme.spacing(0, 2.5, 2.5)}
        >
          {/* Content for Leave Quota Management goes here */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2,
              width: '100%',
            }}
          >
            <Typography variant="body1" color="text.secondary">
              Manage leave quotas for employees here.
            </Typography>
            <Button
              variant="contained"
              sx={{
                bgcolor: theme.palette.primary.main,
                '&:hover': {
                  bgcolor: theme.palette.primary.dark,
                },
              }}
              onClick={() => {
                // Handle action on click
              }}
            >
              Add Leave Quota
            </Button>
          </Box>
        </Stack>
      </Stack>
    );
  };
  
  export default LeaveQuotaManagement;
  
  