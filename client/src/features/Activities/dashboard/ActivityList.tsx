import { Box } from '@mui/material';
import ActivityCard from './ActivityCard';
type Props = {
  activites: Activity[];
  selectActivity?: (id: string) => void;
  deleteActivity: (id: string) => void;
};

export default function ActivityList({ activites, selectActivity, deleteActivity }: Props) {
  // This component will display a list of activities
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {activites.map((activity) => (
        <ActivityCard
          key={activity.id}
          activity={activity}
          selectActivity={selectActivity}
          deleteActivity={deleteActivity}
        />
      ))}
    </Box>
  );
}
