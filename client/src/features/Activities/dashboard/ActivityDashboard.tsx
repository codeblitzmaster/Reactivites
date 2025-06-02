import { Grid } from '@mui/material';
// import ActivityCard from "./ActivityCard";
import ActivityList from './ActivityList';
import ActivityDetail from '../details/ActivityDetail';
import ActivityForm from '../form/ActivityForm';

type AcitivyDashboardProps = {
  activites: Activity[];
  selectActivity: (id: string) => void;
  cancelSelectActivity: () => void;
  selectedActivity: Activity | null;
  openForm: (id?: string) => void;
  closeForm: () => void;
  editMode: boolean;
  submitForm: (activity: Activity) => void;
  deleteActivity: (id: string) => void;
};

export default function ActivityDashboard({
  activites,
  selectActivity,
  cancelSelectActivity,
  selectedActivity,
  openForm,
  closeForm,
  editMode,
  submitForm,
  deleteActivity
}: AcitivyDashboardProps) {
  // This component will display the dashboard for activities
  // It will show a list of activities and the details of the selected activity
  // It will also handle the selection and cancellation of activities

  return (
    <Grid container spacing={3}>
      <Grid size={7}>
        <ActivityList
          activites={activites}
          selectActivity={selectActivity}
          deleteActivity={deleteActivity}
        />
      </Grid>
      <Grid size={5}>
        {selectedActivity && !editMode && (
          <ActivityDetail
            activity={selectedActivity}
            cancelSelectActivity={cancelSelectActivity}
            openForm={openForm}
          />
        )}
        {editMode && (
          <ActivityForm closeForm={closeForm} activity={selectedActivity} submitForm={submitForm} />
        )}
      </Grid>
    </Grid>
  );
}
