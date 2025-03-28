import { ReactElement, useState } from 'react';
import CustomForm from 'components/base/CustomForm';
import { SelectChangeEvent } from '@mui/material'; 
import { Button, Stack, Typography, Box } from '@mui/material';

const LeaveQuotaPage = (): ReactElement => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [leaveQuota, setLeaveQuota] = useState({
    sick: 0,
    annual: 0,
    casual: 0,
    noPay: 0,
    liue: 0,
    halfDay: 0,
    shortLeave: 0,
  });

  // Dummy employee data
  const employeeData = {
    employeeName: 'John Doe',
    email: 'john.doe@example.com',
    department: 'Sales',
    accountType: 'User',
  };

  // Handle changes for the leave quota input fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string | number>
  ) => {
    const { name, value } = e.target;
    setLeaveQuota((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (data: any) => {
    try {
      setIsSubmitting(true); // Set submitting state to true
      setError(''); // Clear any previous errors

      // Simulate an API call for form submission
      console.log('Form submitted with data:', data);

      // Simulate success or error
      // If there's an error, set it here:
      // setError('There was an error submitting the form');

      // If submission is successful, you can reset the form or navigate
    } catch (err) {
      setError('An unexpected error occurred'); // Set error if something fails
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  // Sections for the form
  const sections = [
    {
      title: 'Employee Details',
      fields: [
        { name: 'employeeName', label: 'Employee Name', type: 'text', value: employeeData.employeeName, onChange: () => {}, disabled: true, },
        { name: 'email', label: 'Email', type: 'text', value: employeeData.email, onChange: () => {}, disabled: true, },
        { name: 'department', label: 'Department', type: 'text', value: employeeData.department, onChange: () => {}, disabled: true, },
        { name: 'accountype', label: 'Account Type', type: 'text', value: employeeData.accountType, onChange: () => {}, disabled: true, },
      ],
    },
    {
      title: 'Leave Quota',
      fields: Object.keys(leaveQuota).map((leaveType) => ({
        name: leaveType,
        label: `${leaveType.charAt(0).toUpperCase() + leaveType.slice(1)} Leave`,
        type: 'number',
        value: leaveQuota[leaveType as keyof typeof leaveQuota],  
        onChange: handleChange,
      })),
    },
  ];

  return (
    <Box display="flex" justifyContent="center" width="100%" p={3}>
        <Stack sx={{ width: '100%', maxWidth: '380px', boxShadow: 3, bgcolor: 'white', borderRadius: 2, p: 3 }}>
            <Typography variant="h6" textAlign="center" mb={2}>
                Leave Request
            </Typography>
            <CustomForm
                onSubmit={handleSubmit}  // Use the handleSubmit function
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
              disabled={isSubmitting}
              sx={{ mt: 2 }}
              onClick={() => handleSubmit(leaveQuota)}  // Trigger the submit logic
            >
              {isSubmitting ? 'Submitting...' : 'Request Leave'}
            </Button>
        </Stack>
    </Box>
  );
};

export default LeaveQuotaPage;
