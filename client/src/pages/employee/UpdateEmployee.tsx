import { ReactElement, useState } from 'react';
import { Button, Stack, Typography, Box } from '@mui/material';
import CustomForm from 'components/base/CustomForm';
import { SelectChangeEvent } from '@mui/material';

interface EmployeeData {
  employeeName: string;
  email: string;
  department: string;
  accountType: string;
  password: string;
  confirmPassword: string;
}

const EditEmployee = (): ReactElement => {
  const [employee, setEmployee] = useState<EmployeeData>({
    employeeName: 'John Doe', 
    email: 'john.doe@example.com',
    department: 'engineering',  
    accountType: 'admin',     
    password: '',  
    confirmPassword: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const departmentOptions = [
    { label: 'HR', value: 'hr' },
    { label: 'Engineering', value: 'engineering' },
    { label: 'Marketing', value: 'marketing' },
    { label: 'Sales', value: 'sales' },
  ];

  const accountTypeOptions = [
    { label: 'User', value: 'user' },
    { label: 'Supervisor', value: 'supervisor' },
    { label: 'Admin', value: 'admin' },
    { label: 'Super Admin', value: 'superAdmin' },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string | number>
  ) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(''); // Clear error when user changes input
  };

  const handleUpdateEmployee = async () => {
    try {
      setIsSubmitting(true);
      setError('');

      const response = await fetch('/api/employees', {
        method: 'PUT', // Assuming the API supports PUT for updates
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'An error occurred');
      }

      alert(data.message);
    } catch (err) {
      setError((err as Error).message || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const sections = [
    {
      title: 'Employee Details',
      fields: [
        {
          name: 'employeeName',
          label: 'Employee Name',
          type: 'text',
          value: employee.employeeName,
          onChange: handleChange,
          fullWidth: true,
        },
        {
          name: 'email',
          label: 'Email',
          type: 'email',
          value: employee.email,
          onChange: handleChange,
          fullWidth: true,
        },
        {
          name: 'department',
          label: 'Department',
          type: 'select',
          value: employee.department,
          onChange: handleChange,
          options: departmentOptions,
          fullWidth: true,
        },
        {
          name: 'accountType',
          label: 'Account Type',
          type: 'select',
          value: employee.accountType,
          onChange: handleChange,
          options: accountTypeOptions,
          fullWidth: true,
        },
      ],
    },
    {
      title: 'Password Manager',
      fields: [
        {
          name: 'password',
          label: 'Create New Password',
          type: 'password',
          value: employee.password,
          onChange: handleChange,
          fullWidth: true,
        },
        {
          name: 'confirmPassword',
          label: 'Confirm Password',
          type: 'password',
          value: employee.confirmPassword,
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
          Edit Employee Details
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
          onClick={handleUpdateEmployee}
          disabled={isSubmitting}
          sx={{ mt: 2 }}
        >
          {isSubmitting ? 'Saving Changes...' : 'Save Changes'}
        </Button>
      </Stack>
    </Box>
  );
};

export default EditEmployee;
