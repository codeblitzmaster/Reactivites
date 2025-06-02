import { Container, CssBaseline } from '@mui/material';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/Activities/dashboard/ActivityDashboard';
import { act, useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [activites, setActivites] = useState<Activity[]>([]);

  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios
      .get<Activity[]>('https://localhost:5001/api/activities')
      .then((response) => setActivites(response.data))
      .catch((error) => console.error('Error fetching activities:', error));
  }, []);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activites.find((activity) => activity.id === id) || null);
  };

  const handleCancelActivity = () => {
    setSelectedActivity(null);
  };

  const handleOpenForm = (id?: string) => {
    if (id) handleSelectActivity(id);
    else handleCancelActivity();
    setEditMode(!editMode);
  };

  const handleFormClose = () => {
    setEditMode(false);
    setSelectedActivity(null);
  };

  const handleSubmitForm = (activity: Activity) => {
    if (activity.id) {
      setActivites(activites.map((x) => (x.id === activity.id ? activity : x)));
    } else {
      setActivites([...activites, { ...activity, id: (activites.length + 1).toString() }]);
    }
  };

  const handleDelete = (id: string) => {
    setActivites(activites.filter((activity) => activity.id !== id));
  };
  return (
    <>
      <CssBaseline />
      <NavBar openForm={handleOpenForm} />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <ActivityDashboard
          activites={activites}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelActivity}
          selectedActivity={selectedActivity}
          editMode={editMode}
          openForm={handleOpenForm}
          closeForm={handleFormClose}
          submitForm={handleSubmitForm}
          deleteActivity={handleDelete}
        />
      </Container>
    </>
  );
}

export default App;
