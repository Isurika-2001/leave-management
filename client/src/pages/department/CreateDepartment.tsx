import { ReactElement, useState } from 'react';
import { Button, Stack, Typography, Box } from '@mui/material';
import CustomForm from 'components/base/CustomForm';
import { SelectChangeEvent } from '@mui/material';

interface DepartmentData {
  departmentName: string;
  supervisor: string;
}

const CreateDepartment = (): ReactElement => {
  const [department, setDepartment] = useState<DepartmentData>({
    departmentName: '',
    supervisor: '',
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

  const handleCreateDepartment = async () => {
    if (!department.departmentName || !department.supervisor) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');

      const response = await fetch('/api/departments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(department),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'An error occurred');
      }

      alert(data.message);
      setDepartment({ departmentName: '', supervisor: '' });
    } catch (err) {
      setError((err as Error).message || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const sections = [
    {
      title: 'Department Details',
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
          Create New Department
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
          onClick={handleCreateDepartment}
          disabled={isSubmitting}
          sx={{ mt: 2 }}
        >
          {isSubmitting ? 'Submitting...' : 'Create Department'}
        </Button>
      </Stack>
    </Box>
  );
};

export default CreateDepartment;
