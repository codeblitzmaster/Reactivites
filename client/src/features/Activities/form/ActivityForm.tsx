import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { act, type FormEvent } from 'react';
import { useActivities } from '../../../lib/hooks/useActivities';
type Props = {
  closeForm: () => void;
  activity?: Activity | null;
};
export default function ActivityForm({ activity, closeForm }: Props) {
  // This component will display the form to create or edit an activity
  const { updateActivity, createActivity } = useActivities();
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    // Handle form submission logic here
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const data: { [key: string]: FormDataEntryValue } = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    if (activity) {
      data.id = activity.id; // Preserve the ID if editing an existing activity
      await updateActivity.mutate(data as unknown as Activity); // Use the updateActivity mutation to submit the form data
    } else {
      await createActivity.mutate(data as unknown as Activity); // Use the updateActivity mutation to submit the form data
    }
    closeForm(); // Close the form after submission
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
        <TextField
          name="date"
          label="Date"
          type="date"
          defaultValue={
            activity?.date
              ? new Date(activity.date).toISOString().split('T')[0]
              : new Date().toISOString().split('T')[0]
          }
        />
        <TextField name="city" label="City" defaultValue={activity?.city} />
        <TextField name="venue" label="Venue" defaultValue={activity?.venue} />

        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button color="inherit" onClick={closeForm}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={updateActivity.isPending || createActivity.isPending}>
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
