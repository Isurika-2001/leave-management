import {
  Button,
  Stack,
  Typography,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { ReactElement, useState } from 'react';

const LeaveRequest = (): ReactElement => {
  const [leaveType, setLeaveType] = useState<string | number>(''); // Fixed state type
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const leaveOptions = [
    { label: 'Sick Leave', value: 'sick' },
    { label: 'Casual Leave', value: 'casual' },
    { label: 'Vacation Leave', value: 'vacation' },
    { label: 'Maternity Leave', value: 'maternity' },
    { label: 'Paternity Leave', value: 'paternity' },
  ];

  const handleLeaveRequest = async () => {
    if (!leaveType || !startDate || !endDate || !reason) {
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
        body: JSON.stringify({
          leaveType,
          startDate,
          endDate,
          reason,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'An error occurred');
      }

      alert(data.message);
      setLeaveType('');
      setStartDate('');
      setEndDate('');
      setReason('');
    } catch (err) {
      setError((err as Error).message || 'An error occurred'); // Type assertion for error
    } finally {
      setIsSubmitting(false);
    }
  };

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
        Leave Request
      </Typography>

      <Stack spacing={2} width="100%">
        {/* Leave Type (Select Box) */}
        <FormControl fullWidth>
          <InputLabel>Leave Type</InputLabel>
          <Select
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            label="Leave Type"
            fullWidth
          >
            {leaveOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Start Date */}
        <TextField
          label="Start Date"
          variant="outlined"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />

        {/* End Date */}
        <TextField
          label="End Date"
          variant="outlined"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />

        {/* Reason */}
        <TextField
          label="Reason"
          variant="outlined"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          fullWidth
          multiline
          rows={4}
        />

        {error && <Typography color="error">{error}</Typography>}

        {/* Submit Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLeaveRequest}
          disabled={isSubmitting}
          sx={{
            borderRadius: 10,
            boxShadow: (theme) => theme.shadows[2],
            '&:hover': {
              bgcolor: 'primary.dark',
            },
          }}
        >
          {isSubmitting ? 'Submitting...' : 'Request Leave'}
        </Button>
      </Stack>
    </Stack>
  );
};

export default LeaveRequest;
