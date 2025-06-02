import { Group } from '@mui/icons-material';
import { Box, AppBar, Toolbar, Typography, Button, Container, MenuItem } from '@mui/material';

type Props = {
  openForm: () => void;
};

export default function NavBar({ openForm }: Props) {
  // This component will display the navigation bar for the application
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundImage: 'linear-gradient(135deg , #182a73 0%, #218AAE 69%, #20a7ac 89%)' }}>
        <Container maxWidth="xl">
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <MenuItem sx={{ display: 'flex', gap: 2 }}>
                <Group fontSize="large" />
                <Typography variant="h4" fontWeight="bold" sx={{ flexGrow: 1 }}>
                  Reactivities
                </Typography>
              </MenuItem>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <MenuItem sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white' }}>
                Activities
              </MenuItem>
              <MenuItem sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white' }}>
                About
              </MenuItem>
              <MenuItem sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white' }}>
                Contact
              </MenuItem>
            </Box>
            <Button onClick={openForm} size="large" variant="contained" color="warning">
              Create Activity
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
