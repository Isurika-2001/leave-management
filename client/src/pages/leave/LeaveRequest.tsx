import { ReactElement, useState } from 'react';
import { Button, Stack, Typography, Box } from '@mui/material';
import CustomForm from 'components/base/CustomForm';
import { SelectChangeEvent } from '@mui/material';

interface LeaveRequestData {
  leaveType: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  reason: string;
}

const LeaveRequest = (): ReactElement => {
  const [leaveRequest, setLeaveRequest] = useState<LeaveRequestData>({
    leaveType: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
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
    { label: 'Half Day Leave', value: 'half-day' },
    { label: 'Short Leave', value: 'short' },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string | number>
  ) => {
    const { name, value } = e.target;
    setLeaveRequest((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(''); // Clear error when user changes input
  };

  // Validate time difference for Short Leave and Half Day Leave
  const validateLeaveTimes = () => {
    if (leaveRequest.leaveType === 'short' || leaveRequest.leaveType === 'half-day') {
      const startTime = new Date(`1970-01-01T${leaveRequest.startTime}:00`);
      const endTime = new Date(`1970-01-01T${leaveRequest.endTime}:00`);
      const timeDiff = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60); // Convert to hours

      if (leaveRequest.leaveType === 'short' && timeDiff > 2) {
        setError('Short Leave cannot exceed 2 hours.');
        return false;
      }

      if (leaveRequest.leaveType === 'half-day' && timeDiff > 4) {
        setError('Half Day Leave cannot exceed 4 hours.');
        return false;
      }
    }
    setError('');
    return true;
  };

  const handleLeaveRequest = async () => {
    if (!leaveRequest.leaveType || !leaveRequest.startDate || !leaveRequest.reason) {
      setError('Please fill in all fields');
      return;
    }

    if (!validateLeaveTimes()) {
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
        startTime: '',
        endTime: '',
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
      fields: [
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
          minDate: leaveRequest.leaveType === 'sick' || leaveRequest.leaveType === 'half-day' || leaveRequest.leaveType === 'short' 
            ? new Date().toISOString().split('T')[0] 
            : new Date(new Date().setDate(new Date().getDate() + 2)).toISOString().split('T')[0],
        },
        ...(leaveRequest.leaveType === 'half-day' || leaveRequest.leaveType === 'short' 
          ? [
            {
              name: 'startTime',
              label: 'Start Time',
              type: 'time',
              value: leaveRequest.startTime,
              onChange: handleChange,
              fullWidth: true,
            },
            {
              name: 'endTime',
              label: 'End Time',
              type: 'time',
              value: leaveRequest.endTime,
              onChange: handleChange,
              fullWidth: true,
            },
          ] 
          : [
            {
              name: 'endDate',
              label: 'End Date',
              type: 'date',
              value: leaveRequest.endDate,
              onChange: handleChange,
              fullWidth: true,
              minDate: leaveRequest.startDate,
              maxDate: leaveRequest.leaveType === 'sick' ? new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0] : new Date(new Date().setDate(new Date().getDate() + 14)).toISOString().split('T')[0],
            },
          ]),
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
