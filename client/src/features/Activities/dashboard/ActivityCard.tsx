import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Typography
} from '@mui/material';
import { Link } from 'react-router';
import { AccessTime, Place } from '@mui/icons-material';

type Props = {
  activity: Activity;
};
export default function ActivityCard({ activity }: Props) {
  // This component will display the details of a single activity
  const isHost = false;
  const isGoing = false;
  const label = isHost ? 'You are hosting this activity' : 'You are going to this activity';

  const isCancelled = false;
  const color = isHost ? 'secondary' : isGoing ? 'warning' : 'default';

  console.log('Rendering ActivityCard for:', activity.title);
  return (
    <Card elevation={3} sx={{ borderRadius: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
        <CardHeader
          avatar={<Avatar sx={{ height: 80, width: 80 }} />}
          title={activity.title}
          slotProps={{
            title: {
              fontWeight: 'bold',
              fontSize: '1.5rem'
            }
          }}
          subheader={
            <>
              Hosted by <Link to={`/profiles/bob`}>Bob</Link>
            </>
          }
        />
        <Box display="flex" flexDirection="column" gap={2} mr={2}>
          {(isHost || isGoing) && <Chip label={label} color={color} sx={{ borderRadius: 2 }} />}
          {isCancelled && (
            <Chip
              label="This activity has been cancelled"
              color="error"
              sx={{ borderRadius: 2, fontWeight: 'bold' }}
            />
          )}
        </Box>
      </Box>
      <Divider sx={{ mb: 3 }} />
      <CardContent sx={{ p: 0 }}>
        <Box display="flex" alignItems="center" mb={2} px={2}>
          <AccessTime sx={{ mr: 1 }} />
          <Typography variant="body2">{activity.date}</Typography>
          <Place sx={{ ml: 2, mr: 1 }} />
          <Typography variant="body2">
            {activity.city}, {activity.venue}
          </Typography>
        </Box>
        <Divider />
        <Box display="flex" gap={2} sx={{ backgroundColor: 'grey.200', py: 3, pl: 3 }}>
          Attendees go here
        </Box>
      </CardContent>

      <CardContent sx={{ pb: 2 }}>
        <Typography variant="body2">{activity.description}</Typography>
        <Button
          component={Link}
          to={`/activities/${activity.id}`}
          size="medium"
          variant="contained"
          color="primary"
          sx={{ display: 'flex', justifySelf: 'self-end' }}
          onClick={() => {}}>
          View
        </Button>
      </CardContent>
    </Card>
  );
}
