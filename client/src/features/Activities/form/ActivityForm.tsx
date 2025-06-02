import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import type { FormEvent } from 'react';
type Props = {
  closeForm: () => void;
  activity?: Activity | null;
  submitForm: (activity: Activity) => void;
};
export default function ActivityForm({ activity, closeForm, submitForm }: Props) {
  // This component will display the form to create or edit an activity

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // Handle form submission logic here
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const data: { [key: string]: FormDataEntryValue } = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    if (activity) data.id = activity.id; // Preserve the ID if editing an existing activity
    // Convert FormData to Activity type
    submitForm(data as unknown as Activity);
  };
  return (
    <Paper sx={{ borderRadius: 3, padding: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        Create Activity
      </Typography>

      <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={3}>
        <TextField name="title" label="Title" defaultValue={activity?.title} />
        <TextField
          name="description"
          label="Description"
          multiline
          rows={3}
          defaultValue={activity?.description}
        />
        <TextField name="category" label="Category" defaultValue={activity?.category} />
        <TextField name="date" label="Date" type="date" defaultValue={activity?.date} />
        <TextField name="city" label="City" defaultValue={activity?.city} />
        <TextField name="venue" label="Venue" defaultValue={activity?.venue} />

        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button color="inherit" onClick={closeForm}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
