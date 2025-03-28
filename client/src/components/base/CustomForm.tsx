import { Button, Stack, TextField, MenuItem, Select, FormControl, InputLabel, Typography, Box, Divider } from '@mui/material';
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
  disabled?: boolean;
  minDate?: string; // Optional min date
  maxDate?: string; // Optional max date
}

interface Section {
  title: string;
  fields: Field[];
}

interface CustomFormProps {
  sections: Section[]; // Array of sections
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
  error: string;
  showSubmitButton?: boolean;
}

const CustomForm = ({ sections, onSubmit, isSubmitting, error, showSubmitButton = true }: CustomFormProps): ReactElement => {

  // Handle changes for text inputs (TextField, Textarea, Date)
  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: Field) => {
    field.onChange(e);
  };

  // Handle changes for Select field
  const handleSelectChange = (e: SelectChangeEvent<string | number>, field: Field) => {
    field.onChange(e);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" width="100%" p={3}>
      <Stack spacing={3} width="100%" maxWidth="600px">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            {/* Section Title */}
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                color: 'primary.dark',
                letterSpacing: 0.5,
                mb: 2,
                textTransform: 'capitalize',
              }}
            >
              {section.title}
            </Typography>

            {/* Section Fields */}
            {section.fields.map((field, index) => {
              // Handle Select field
              if (field.type === 'select') {
                return (
                  <FormControl fullWidth key={index}>
                    <InputLabel>{field.label}</InputLabel>
                    <Select
                      name={field.name}
                      value={field.value}
                      onChange={(e: SelectChangeEvent<string | number>) => handleSelectChange(e, field)}
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
                    onChange={(e) => handleTextFieldChange(e, field)}
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
                    onChange={(e) => handleTextFieldChange(e, field)}
                    fullWidth
                    inputProps={{
                      min: field.minDate || undefined,
                      max: field.maxDate || undefined,
                    }}
                    InputLabelProps={{ shrink: true }}
                  />
                );
              }

              // Handle Password field
              if (field.type === 'password') {
                return (
                  <TextField
                    name={field.name}
                    key={index}
                    label={field.label}
                    variant="outlined"
                    type="password"
                    value={field.value}
                    onChange={(e) => handleTextFieldChange(e, field)}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                );
              }

              // handle time field
              if (field.type === 'time') {
                return (
                  <TextField
                    name={field.name}
                    key={index}
                    label={field.label}
                    variant="outlined"
                    type="time"
                    value={field.value}
                    onChange={(e) => handleTextFieldChange(e, field)}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                );
              }

              // handle number field
              if (field.type === 'number') {
                return (
                  <TextField
                    name={field.name}
                    key={index}
                    label={field.label}
                    variant="outlined"
                    type="number"
                    value={field.value}
                    inputProps={{ 
                      min: 0, 
                      max: 100 
                    }}
                    onChange={(e) => handleTextFieldChange(e, field)}
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
                  onChange={(e) => handleTextFieldChange(e, field)}
                  fullWidth
                  multiline={field.multiline}
                  rows={field.rows || 1}
                  InputLabelProps={{ shrink: true }}
                  name={field.name}
                />
              );
            })}

            {/* Divider for the section */}
            {sectionIndex < sections.length - 1 && <Divider sx={{ my: 2 }} />}
          </div>
        ))}

        {error && <Typography color="error">{error}</Typography>}

        {/* Conditionally render the submit button */}
        {showSubmitButton && (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() =>
              onSubmit(sections.reduce((acc: any, section: Section) => {
                section.fields.forEach((field) => {
                  acc[field.name] = field.value;
                });
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
