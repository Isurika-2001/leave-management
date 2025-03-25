import { Button, Stack, TextField, MenuItem, Select, FormControl, InputLabel, Typography } from '@mui/material';
import { ReactElement } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';

interface Field {
  name: string;
  label: string;
  type: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | { value: unknown }> | SelectChangeEvent<string | number>) => void;
  options?: { label: string; value: string }[]; // Options for select fields
  multiline?: boolean;
  rows?: number;
}

interface CustomFormProps {
  fields: Field[];
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
  error: string;
}

const CustomForm = ({ fields, onSubmit, isSubmitting, error }: CustomFormProps): ReactElement => {

  // Handle the change event for TextField
  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement | { value: unknown }>, field: Field) => {
    field.onChange(e); // Call the field's onChange handler
  };

  // Handle the change event for Select
  const handleSelectChange = (e: SelectChangeEvent<string | number>, field: Field) => {
    field.onChange(e); // Call the field's onChange handler
  };

  return (
    <Stack spacing={2} width="100%">
      {fields.map((field, index) => {
        if (field.type === 'select') {
          return (
            <FormControl fullWidth key={index}>
              <InputLabel>{field.label}</InputLabel>
              <Select
                value={field.value}
                onChange={(e: SelectChangeEvent<string | number>) => handleSelectChange(e, field)} // Correct type for SelectChangeEvent
                label={field.label}
                fullWidth
              >
                {field.options?.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          );
        }

        return (
          <TextField
            key={index}
            label={field.label}
            variant="outlined"
            type={field.type}
            value={field.value}
            onChange={(e) => handleTextFieldChange(e, field)}  // Correct type for ChangeEvent
            fullWidth
            multiline={field.multiline}
            rows={field.rows || 1}
            InputLabelProps={{ shrink: true }}
          />
        );
      })}

      {error && <Typography color="error">{error}</Typography>}

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={() =>
          onSubmit(fields.reduce((acc: any, field: any) => {
            acc[field.name] = field.value;
            return acc;
          }, {}))
        }
        disabled={isSubmitting}
        sx={{
          borderRadius: 2,
          boxShadow: (theme) => theme.shadows[2],
          '&:hover': {
            bgcolor: 'primary.dark',
          },
        }}
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Button>
    </Stack>
  );
};

export default CustomForm;
