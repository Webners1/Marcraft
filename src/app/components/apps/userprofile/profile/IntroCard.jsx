import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ChildCard from '../../../../components/shared/ChildCard';
import { IconBriefcase, IconDeviceDesktop, IconMail, IconMapPin } from '@tabler/icons-react';

const IntroCard = ({ name, bio, job, email, website, location }) => (
  <ChildCard>
    <Typography fontWeight={600} variant="h4" mb={2}>
      About
    </Typography>
    <Typography color="textSecondary" variant="subtitle2" mb={2}>
      {bio}
    </Typography>
    <Stack direction="row" gap={2} alignItems="center" mb={3}>
      <IconBriefcase size="21" />
      <Typography variant="h6">{job}</Typography>
    </Stack>
    <Stack direction="row" gap={2} alignItems="center" mb={3}>
      <IconMail size="21" />
      <Typography variant="h6">{email}</Typography>
    </Stack>
    <Stack direction="row" gap={2} alignItems="center" mb={3}>
      <IconDeviceDesktop size="21" />
      <Typography variant="h6">{website}</Typography>
    </Stack>
    <Stack direction="row" gap={2} alignItems="center" mb={1}>
      <IconMapPin size="21" />
      <Typography variant="h6">{location}</Typography>
    </Stack>
  </ChildCard>
);

export default IntroCard;
