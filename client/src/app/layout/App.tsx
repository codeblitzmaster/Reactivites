import { Box, Container, CssBaseline, Typography } from '@mui/material';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/Activities/dashboard/ActivityDashboard';
import { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useActivities } from '../../lib/hooks/useActivities';

function App() {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [editMode, setEditMode] = useState(false);

  const { activites, isPending } = useActivities();

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activites!.find((activity) => activity.id === id) || null);
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
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <CssBaseline />
      <NavBar openForm={handleOpenForm} />
      {!activites && isPending ? (
        <Typography variant="h4" align="center" sx={{ mt: 5 }}>
          Loading activities...
        </Typography>
      ) : (
        <Container maxWidth="xl" sx={{ mt: 3 }}>
          <ActivityDashboard
            activites={activites || []}
            selectActivity={handleSelectActivity}
            cancelSelectActivity={handleCancelActivity}
            selectedActivity={selectedActivity}
            editMode={editMode}
            openForm={handleOpenForm}
            closeForm={handleFormClose}
          />
        </Container>
      )}
    </Box>
  );
}

export default App;
