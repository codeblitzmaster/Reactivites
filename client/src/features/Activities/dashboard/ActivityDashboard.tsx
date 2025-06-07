import { Grid, Typography } from '@mui/material';
// import ActivityCard from "./ActivityCard";
import ActivityList from './ActivityList';
import ActivityDetail from '../details/ActivityDetail';
import ActivityForm from '../form/ActivityForm';
import { useActivities } from '../../../lib/hooks/useActivities';

export default function ActivityDashboard() {
  // This component will display the dashboard for activities
  // It will show a list of activities and the details of the selected activity
  // It will also handle the selection and cancellation of activities

  return (
    <Grid container spacing={3}>
      <Grid size={7}>
        <ActivityList />
      </Grid>
      <Grid size={5}>Activity Filter Goes Here</Grid>
    </Grid>
  );
}
