import { Box, Button, Card, CardActions, Chip } from '@mui/material';

type Props = {
  activity: Activity;
  selectActivity?: (id: string) => void;
  deleteActivity: (id: string) => void;
};
export default function ActivityCard({ activity, selectActivity, deleteActivity }: Props) {
  // This component will display the details of a single activity
  console.log('Rendering ActivityCard for:', activity.title);
  return (
    <Card
      sx={{
        marginBottom: 2,
        padding: 2,
        backgroundColor: '#f5f5f5',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
      <h2>{activity.title}</h2>
      <p>{activity.description}</p>
      <p>Date: {new Date(activity.date).toLocaleDateString()}</p>
      <p>Category: {activity.category}</p>
      <p>City: {activity.city}</p>
      <p>Venue: {activity.venue}</p>

      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Chip label={activity.category} variant="outlined" />
        <Box gap={3} sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            size="medium"
            variant="contained"
            color="error"
            onClick={() => deleteActivity(activity.id)}>
            Delete
          </Button>
          <Button
            size="medium"
            variant="contained"
            color="primary"
            onClick={() => selectActivity?.(activity.id)}>
            View
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
}
