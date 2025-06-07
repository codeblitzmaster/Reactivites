import { Group } from '@mui/icons-material';
import { Box, AppBar, Toolbar, Typography, Button, Container, MenuItem } from '@mui/material';
import { NavLink } from 'react-router';
import MenuItemLink from '../shared/components/MenuItemLink';

export default function NavBar() {
  // This component will display the navigation bar for the application
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundImage: 'linear-gradient(135deg , #182a73 0%, #218AAE 69%, #20a7ac 89%)' }}>
        <Container maxWidth="xl">
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <MenuItem component={NavLink} to="/" sx={{ display: 'flex', gap: 2 }}>
                <Group fontSize="large" />
                <Typography variant="h4" fontWeight="bold" sx={{ flexGrow: 1 }}>
                  Reactivities
                </Typography>
              </MenuItem>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <MenuItemLink to="/activities">Activities</MenuItemLink>
              <MenuItemLink to="/createActivity">Create Activity</MenuItemLink>
            </Box>
            <MenuItem>User Menu</MenuItem>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
