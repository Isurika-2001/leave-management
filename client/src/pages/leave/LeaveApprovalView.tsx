import { ReactElement, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CustomForm from 'components/base/CustomForm'; // Import CustomForm component
import { Button, Box, Typography, Stack } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

interface LeaveData {
  id: number;
  user: string;
  role: string;
  department: string;
  leaveType: string;
  description: string;
  startDate: string;
  endDate: string;
  applyDate: string;
  status: string;
}

const LeaveApprovalView = (): ReactElement => {
  const { id } = useParams<{ id: string }>();
  const [leave, setLeave] = useState<LeaveData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Sample leave data for testing
  const sampleLeaveData: LeaveData = {
    id: 1,
    user: 'John Doe',
    role: 'Software Engineer',
    department: 'Engineering',
    leaveType: 'Sick Leave',
    description: 'Not feeling well',
    startDate: '2025-03-25',
    endDate: '2025-03-27',
    applyDate: '2025-03-24',
    status: 'Pending',
  };

  useEffect(() => {
    // Simulating fetching leave data (using sample data for now)
    if (id) {
      setLeave(sampleLeaveData); // Set the sample leave data for testing
    }
  }, [id]);

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

  // If leave data is not available, display an error message
  if (!leave) {
    return <Typography color="error">No leave request found or loading...</Typography>;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string | number>
  ) => {
    const { name, value } = e.target;
  
    // Update the leave state based on the name of the field
    setLeave((prev) => {
      if (!prev) return prev;
  
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // Define the fields for the form
  const fields = [
    {
      name: 'user',
      label: 'User',
      type: 'text',
      value: leave.user,
      onChange: handleChange,
    },
    {
      name: 'role',
      label: 'Role',
      type: 'text',
      value: leave.role,
      onChange: handleChange,
    },
    {
      name: 'department',
      label: 'Department',
      type: 'text',
      value: leave.department,
      onChange: handleChange,
    },
    {
      name: 'leaveType',
      label: 'Leave Type',
      type: 'text',
      value: leave.leaveType,
      onChange: handleChange,
    },
    {
      name: 'startDate',
      label: 'Start Date',
      type: 'date',
      value: leave.startDate,
      onChange: handleChange,
    },
    {
      name: 'endDate',
      label: 'End Date',
      type: 'date',
      value: leave.endDate,
      onChange: handleChange,
    },
    {
      name: 'applyDate',
      label: 'Apply Date',
      type: 'date',
      value: leave.applyDate,
      onChange: handleChange,
    },
    {
      name: 'status',
      label: 'Status',
      type: 'text',
      value: leave.status,
      onChange: handleChange,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      value: leave.description,
      onChange: handleChange,
    },
  ];

  return (
    <Box display="flex" justifyContent="center" width="100%" p={3}>
      <Stack sx={{ width: '100%', maxWidth: '380px', boxShadow: 3, bgcolor: 'white', borderRadius: 2, p: 3 }}>
        <Typography variant="h6" textAlign="center" mb={2}>
          Leave Approval
        </Typography>

        {/* Render CustomForm with the fields and handlers, without the submit button */}
        <CustomForm
          onSubmit={(data) => console.log('Form submitted with data:', data)}
          fields={fields}
          isSubmitting={isSubmitting}
          error={error}
          showSubmitButton={false}
        />

        {/* Approval / Rejection buttons */}
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
            onClick={() => handleApproval('declined')}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Decline'}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default LeaveApprovalView;
