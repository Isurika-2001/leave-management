import { ReactElement, useState } from 'react';
import { Button, Stack, Typography, Box } from '@mui/material';
import CustomForm from 'components/base/CustomForm';
import { SelectChangeEvent } from '@mui/material';

interface DepartmentData {
  departmentName: string;
  supervisor: string;
}

const EditDepartment = (): ReactElement => {
  const [department, setDepartment] = useState<DepartmentData>({
    departmentName: 'Marketing', // Set dummy initial department name
    supervisor: '1', // Set dummy initial supervisor ID
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Hardcoded supervisors list
  const [supervisors] = useState([
    { label: 'John Doe', value: '1' },
    { label: 'Jane Smith', value: '2' },
    { label: 'Alice Johnson', value: '3' },
  ]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string | number>
  ) => {
    const { name, value } = e.target;
    setDepartment((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(''); // Clear error when user changes input
  };

  const handleUpdateDepartment = async () => {
    if (!department.departmentName || !department.supervisor) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');

      // Simulating a dummy response with setTimeout to mimic API call delay
      setTimeout(() => {
        // Simulating a successful response
        alert('Department updated successfully!');
        setIsSubmitting(false);
      }, 1000);

      // You can simulate a failure by uncommenting the next line
      // throw new Error('Failed to update department.');

    } catch (err) {
      setError((err as Error).message || 'An error occurred');
      setIsSubmitting(false);
    }
  };

  const sections = [
    {
      title: 'Edit Department',
      fields: [
        {
          name: 'departmentName',
          label: 'Department Name',
          type: 'text',
          value: department.departmentName,
          onChange: handleChange,
          fullWidth: true,
        },
        {
          name: 'supervisor',
          label: 'Supervisor',
          type: 'select',
          value: department.supervisor,
          onChange: handleChange,
          options: supervisors,
          fullWidth: true,
        },
      ],
    },
  ];

  return (
    <Box display="flex" justifyContent="center" width="100%" p={3}>
      <Stack sx={{ width: '100%', maxWidth: '380px', boxShadow: 3, bgcolor: 'white', borderRadius: 2, p: 3 }}>
        <Typography variant="h6" textAlign="center" mb={2}>
          Edit Department
        </Typography>

        <CustomForm
          onSubmit={(data) => console.log('Form submitted with data:', data)}
          sections={sections}
          isSubmitting={isSubmitting}
          error={error}
          showSubmitButton={false}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleUpdateDepartment}
          disabled={isSubmitting}
          sx={{ mt: 2 }}
        >
          {isSubmitting ? 'Updating...' : 'Update Department'}
        </Button>
      </Stack>
    </Box>
  );
};

export default EditDepartment;
