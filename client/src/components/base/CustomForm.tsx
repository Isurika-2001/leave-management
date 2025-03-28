import { Button, Stack, TextField, MenuItem, Select, FormControl, InputLabel, Typography, Box } from '@mui/material';
import { ReactElement } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';

interface Field {
  name: string;
  label: string;
  type: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string | number>) => void;
  options?: { label: string; value: string | number }[]; // Options for select fields
  multiline?: boolean;
  rows?: number;
}

interface CustomFormProps {
  fields: Field[];
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
  error: string;
  showSubmitButton?: boolean;  // Add this prop to control button visibility
}

const CustomForm = ({ fields, onSubmit, isSubmitting, error, showSubmitButton = true }: CustomFormProps): ReactElement => {

  // Handle changes for text inputs (TextField, Textarea, Date)
  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: Field) => {
    // Directly call onChange with the event object
    field.onChange(e);
  };

  // Handle changes for Select field
  const handleSelectChange = (e: SelectChangeEvent<string | number>, field: Field) => {
    // React already provides the event object correctly structured, so pass it as is
    field.onChange(e); // Directly call onChange with the event object
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Stack spacing={2} width="100%">
        {fields.map((field, index) => {
          // Handle Select field
          if (field.type === 'select') {
            return (
              <FormControl fullWidth key={index}>
                <InputLabel>{field.label}</InputLabel>
                <Select
                  name={field.name} // Fix this: Pass the name dynamically from the field
                  value={field.value}
                  onChange={(e: SelectChangeEvent<string | number>) => handleSelectChange(e, field)} // Pass event here
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

          // Handle Textarea (Multiline input)
          if (field.type === 'textarea') {
            return (
              <TextField
                name={field.name}
                key={index}
                label={field.label}
                variant="outlined"
                value={field.value}
                onChange={(e) => handleTextFieldChange(e, field)} // Pass event here to handle text area input
                fullWidth
                multiline
                rows={field.rows || 4}
                InputLabelProps={{ shrink: true }}
              />
            );
          }

          // Handle Date field
          if (field.type === 'date') {
            return (
              <TextField
                name={field.name}
                key={index}
                label={field.label}
                variant="outlined"
                type="date"
                value={field.value}
                onChange={(e) => handleTextFieldChange(e, field)} // Handle date change correctly
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            );
          }

          // Handle Text field (input)
          return (
            <TextField
              key={index}
              label={field.label}
              variant="outlined"
              type={field.type}
              value={field.value}
              onChange={(e) => handleTextFieldChange(e, field)} // Handle input change properly
              fullWidth
              multiline={field.multiline}
              rows={field.rows || 1}
              InputLabelProps={{ shrink: true }}
              name={field.name} // Ensure proper handling of name attribute
            />
          );
        })}

        {error && <Typography color="error">{error}</Typography>}

        {/* Conditionally render the submit button */}
        {showSubmitButton && (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() =>
              onSubmit(fields.reduce((acc: any, field: Field) => {
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
        )}
      </Stack>
    </Box>
  );
};

export default CustomForm;
