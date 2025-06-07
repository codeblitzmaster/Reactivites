import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { useActivities } from '../../../lib/hooks/useActivities';

type Props = {
  selectedActivity: Activity;
  cancelSelectActivity: () => void;
  openForm: (id: string) => void;
};

export default function ActivityDetail({
  selectedActivity,
  cancelSelectActivity,
  openForm
}: Props) {
  // This component will display the details of a single activity
  const { activites } = useActivities();
  const activity = activites?.find((activity) => activity.id === selectedActivity.id);

  if (!activity) return <Typography variant="h6">Loading...</Typography>;

  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardMedia component="img" src={`/images/categoryImages/${activity.category}.jpg`} />

      <CardContent>
        <Typography variant="h5">{activity.title}</Typography>
        <Typography variant="subtitle1" fontWeight="light">
          {activity.date}
        </Typography>
        <Typography variant="body1">{activity.description}</Typography>
      </CardContent>
      <CardActions>
        <Button color="primary" onClick={() => openForm(activity.id)}>
          Edit
        </Button>
        <Button color="inherit" onClick={cancelSelectActivity}>
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
}
