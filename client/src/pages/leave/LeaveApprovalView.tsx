import {
    Button,
    Stack,
    Typography,
    TextField
  } from '@mui/material';
  import { ReactElement, useState } from 'react';
  
  // Define the LeaveData interface to structure the leave request data
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
  
  const LeaveApprovalView = ({ leave }: { leave: LeaveData | null }): ReactElement => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
  
    const handleApproval = async (status: string) => {
      if (!leave) return;
  
      try {
        setIsSubmitting(true);
        setError('');
  
        // Simulate API call for approval/rejection
        const response = await fetch(`/api/leave-approval/${leave.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status,
          }),
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          throw new Error(data.message || 'An error occurred');
        }
  
        alert(data.message);
      } catch (err) {
        setError(err.message || 'An error occurred');
      } finally {
        setIsSubmitting(false);
      }
    };
  
    // If the leave data is missing, display an error message
    if (!leave) {
      return <Typography color="error">No leave request found.</Typography>;
    }
  
    return (
      <Stack
        sx={{
          bgcolor: 'common.white',
          borderRadius: 5,
          width: { xs: '100%', sm: '50%', md: '30%' },
          padding: 3,
          boxShadow: (theme) => theme.shadows[4],
          margin: 'auto',
        }}
      >
        <Typography variant="h6" color="text.primary" textAlign="center" mb={2}>
          Leave Approval
        </Typography>
  
        <Stack spacing={2} width="100%">
          {/* Leave Details */}
          <TextField label="User" value={leave.user} InputProps={{ readOnly: true }} fullWidth />
          <TextField label="Role" value={leave.role} InputProps={{ readOnly: true }} fullWidth />
          <TextField label="Department" value={leave.department} InputProps={{ readOnly: true }} fullWidth />
          <TextField label="Leave Type" value={leave.leaveType} InputProps={{ readOnly: true }} fullWidth />
          <TextField label="Start Date" value={leave.startDate} InputProps={{ readOnly: true }} fullWidth InputLabelProps={{ shrink: true }} />
          <TextField label="End Date" value={leave.endDate} InputProps={{ readOnly: true }} fullWidth InputLabelProps={{ shrink: true }} />
          <TextField label="Apply Date" value={leave.applyDate} InputProps={{ readOnly: true }} fullWidth />
          <TextField label="Status" value={leave.status} InputProps={{ readOnly: true }} fullWidth />
  
          {error && <Typography color="error">{error}</Typography>}
  
          {/* Action Buttons */}
          <Stack direction="row" spacing={2} mt={2}>
            <Button
              variant="contained"
              color="success"
              fullWidth
              onClick={() => handleApproval('approved')}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Approve'}
            </Button>
            <Button
              variant="contained"
              color="error"
              fullWidth
              onClick={() => handleApproval('rejected')}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Reject'}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    );
  };
  
  // Sample leave data for testing
  const sampleLeave: LeaveData = {
    id: 1,
    user: 'John Doe',
    role: 'Software Engineer',
    department: 'Engineering',
    leaveType: 'Sick Leave',
    startDate: '2025-03-25',
    endDate: '2025-03-27',
    applyDate: '2025-03-24',
    status: 'Pending',
  };
  
  const LeaveApprovalViewSample = (): ReactElement => {
    return <LeaveApprovalView leave={sampleLeave} />;
  };
  
  export default LeaveApprovalViewSample;
  