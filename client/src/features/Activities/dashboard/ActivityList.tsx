import { Box, Typography } from '@mui/material';
import ActivityCard from './ActivityCard';
import { useActivities } from '../../../lib/hooks/useActivities';

export default function ActivityList() {
  // This component will display a list of activities
  const { activites, isPending } = useActivities();

  if (!activites || isPending) {
    return (
      <Typography variant="h4" align="center" sx={{ mt: 5 }}>
        Loading activities...
      </Typography>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {activites.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </Box>
  );
}
