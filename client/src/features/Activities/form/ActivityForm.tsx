import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { type FormEvent } from 'react';
import { useActivities } from '../../../lib/hooks/useActivities';
import { useNavigate, useParams } from 'react-router';

export default function ActivityForm() {
  // This component will display the form to create or edit an
  const { id } = useParams();
  const { updateActivity, createActivity, activity, isLoadingActivity } = useActivities(id);
  const navigate = useNavigate();

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
      navigate(`/activities/${activity.id}`); // Navigate to the activity detail page after updating
    } else {
      createActivity.mutate(data as unknown as Activity, {
        onSuccess: (id) => {
          navigate(`/activities/${id}`); // Navigate to the new activity detail page after creation
        }
      }); // Use the updateActivity mutation to submit the form data
    }
  };

  if (isLoadingActivity) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  return (
    <Paper sx={{ borderRadius: 3, padding: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        {activity ? 'Edit Activity' : 'Create Activity'}
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
          <Button color="inherit">Cancel</Button>
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
