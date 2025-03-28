import { ReactElement, useState } from 'react';
import { Button, Stack, Typography, Box } from '@mui/material';
import CustomForm from 'components/base/CustomForm';
import { SelectChangeEvent } from '@mui/material';

interface LeaveRequestData {
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
}

const LeaveRequest = (): ReactElement => {
  const [leaveRequest, setLeaveRequest] = useState<LeaveRequestData>({
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const leaveOptions = [
    { label: 'Sick Leave', value: 'sick' },
    { label: 'Casual Leave', value: 'casual' },
    { label: 'Vacation Leave', value: 'vacation' },
    { label: 'Maternity Leave', value: 'maternity' },
    { label: 'Paternity Leave', value: 'paternity' },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string | number>
  ) => {
    const { name, value } = e.target;
    setLeaveRequest((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLeaveRequest = async () => {
    if (!leaveRequest.leaveType || !leaveRequest.startDate || !leaveRequest.endDate || !leaveRequest.reason) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');

      const response = await fetch('/api/leave-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leaveRequest),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'An error occurred');
      }

      alert(data.message);
      setLeaveRequest({
        leaveType: '',
        startDate: '',
        endDate: '',
        reason: '',
      });
    } catch (err) {
      setError((err as Error).message || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Define the fields for the form
  const sections = [
    {
      title: 'Leave Request Details',
      fields : [
        {
          name: 'leaveType',
          label: 'Leave Type',
          type: 'select',
          value: leaveRequest.leaveType,
          onChange: handleChange,
          options: leaveOptions,
          fullWidth: true,
        },
        {
          name: 'startDate',
          label: 'Start Date',
          type: 'date',
          value: leaveRequest.startDate,
          onChange: handleChange,
          fullWidth: true,
        },
        {
          name: 'endDate',
          label: 'End Date',
          type: 'date',
          value: leaveRequest.endDate,
          onChange: handleChange,
          fullWidth: true,
        },
        {
          name: 'reason',
          label: 'Reason',
          type: 'textarea',
          value: leaveRequest.reason,
          onChange: handleChange,
          fullWidth: true,
        },
      ],
    }, 
  ];

  return (
    <Box display="flex" justifyContent="center" width="100%" p={3}>
      <Stack sx={{ width: '100%', maxWidth: '380px', boxShadow: 3, bgcolor: 'white', borderRadius: 2, p: 3 }}>
        <Typography variant="h6" textAlign="center" mb={2}>
          Leave Request
        </Typography>

        {/* Render CustomForm with the fields and handlers, without the submit button */}
        <CustomForm
          onSubmit={(data) => console.log('Form submitted with data:', data)}
          sections={sections}
          isSubmitting={isSubmitting}
          error={error}
          showSubmitButton={false}
        />

        {/* Submit Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLeaveRequest}
          disabled={isSubmitting}
          sx={{ mt: 2 }}
        >
          {isSubmitting ? 'Submitting...' : 'Request Leave'}
        </Button>
      </Stack>
    </Box>
  );
};

export default LeaveRequest;
