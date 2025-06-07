import { createBrowserRouter } from 'react-router';
import App from '../layout/App';
import HomePage from '../../features/home/HomePage';
import ActivityDashboard from '../../features/Activities/dashboard/ActivityDashboard';
import ActivityForm from '../../features/Activities/form/ActivityForm';
import ActivityDetail from '../../features/Activities/details/ActivityDetail';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <HomePage /> },
      { path: 'activities', element: <ActivityDashboard /> },
      { path: 'activities/:id', element: <ActivityDetail /> },
      { path: 'createActivity', element: <ActivityForm key="create" /> },
      { path: 'manage/:id', element: <ActivityForm /> }
    ]
  }
]);
