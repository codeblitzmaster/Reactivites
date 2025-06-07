import { Box, Button, Card, CardActions, Chip } from '@mui/material';
import { useActivities } from '../../../lib/hooks/useActivities';
import { Link } from 'react-router';

type Props = {
  activity: Activity;
};
export default function ActivityCard({ activity }: Props) {
  // This component will display the details of a single activity
  const { deleteActivity } = useActivities();

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
            onClick={() => deleteActivity.mutate(activity.id)}
            disabled={deleteActivity.isPending}>
            Delete
          </Button>
          <Button
            component={Link}
            to={`/activities/${activity.id}`}
            size="medium"
            variant="contained"
            color="primary"
            onClick={() => {}}>
            View
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
}
