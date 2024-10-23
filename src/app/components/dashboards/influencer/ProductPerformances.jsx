import React from 'react';
import dynamic from "next/dynamic";
import { useRouter } from 'next/navigation'; // Importing useRouter for navigation
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from '@mui/material/styles';
import DashboardCard from '../../shared/DashboardCard';
import CustomSelect from '../../forms/theme-elements/CustomSelect';
import {
  MenuItem,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Avatar,
  TableContainer,
  Stack,
  Chip,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ProductPerformances = ({ products }) => {
  const router = useRouter(); // Initialize the router

  // for select
  const [month, setMonth] = React.useState('1');

  const handleChange = (event) => {
    setMonth(event.target.value);
  };

  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const grey = theme.palette.grey[300];
  const primarylight = theme.palette.primary.light;
  const greylight = theme.palette.grey[100];

  const optionsrow1chart = {
    chart: {
      type: 'area',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 35,
      width: 100,
      sparkline: {
        enabled: true,
      },
      group: 'sparklines',
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    fill: {
      colors: [primarylight],
      type: 'solid',
      opacity: 0.05,
    },
    markers: {
      size: 0,
    },
    tooltip: {
      enabled: false,
    },
  };

  // Helper function to determine the color of the status chip
  const getStatusColor = (status) => {
    switch (status) {
      case 'In Progress':
        return { color: theme.palette.info.main, backgroundColor: theme.palette.info.light };
      case 'Completed':
        return { color: theme.palette.success.main, backgroundColor: theme.palette.success.light };
      case 'Dispute':
        return { color: theme.palette.error.main, backgroundColor: theme.palette.error.light };
      case 'Offer':
        return { color: theme.palette.warning.main, backgroundColor: theme.palette.warning.light };
      default:
        return { color: theme.palette.text.primary, backgroundColor: theme.palette.grey[200] };
    }
  };

  // Handle navigation to offer details page
  const handleViewOffer = (id) => {
    router.push(`/offer/${id}`); // Navigate to the offer page with the unique offer ID
  };

  return (
    <DashboardCard
      title="Product Performance"
      action={
        <CustomSelect
          labelId="month-dd"
          id="month-dd"
          size="small"
          value={month}
          onChange={handleChange}
        >
          <MenuItem value={1}>March 2023</MenuItem>
          <MenuItem value={2}>April 2023</MenuItem>
          <MenuItem value={3}>May 2023</MenuItem>
        </CustomSelect>
      }
    >
      <TableContainer>
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: 'nowrap',
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ pl: 0 }}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Product
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Status
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Budget
                </Typography>
              </TableCell>
              <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                  Offer
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <React.Fragment key={index}>
                <TableRow>
                  <TableCell sx={{ pl: 0 }}>
                    <Stack direction="row" spacing={2}>
                      <Avatar src={product.image} variant="rounded" alt={product.name} sx={{ width: 48, height: 48 }} />
                      <Box>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {product.name}
                        </Typography>
                        <Typography color="textSecondary" fontSize="12px" variant="subtitle2">
                          {product.category}
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={product.status}
                      sx={{
                        color: getStatusColor(product.status).color,
                        backgroundColor: getStatusColor(product.status).backgroundColor,
                        fontWeight: 500,
                      }}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">{product.budget}</Typography>
                  </TableCell>
                  <TableCell>
                    {product.status === 'Offer' && (
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleViewOffer(product.id)} // Pass the unique offer ID for navigation
                      >
                        View Offer
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
                {product.status === 'Offer' && (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography>Offer Details</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography><strong>Description:</strong> {product.description}</Typography>
                          <Typography><strong>Budget/Amount:</strong> {product.budget}</Typography>
                          <Typography><strong>Clients/By Whom:</strong> {product.clients}</Typography>
                        </AccordionDetails>
                      </Accordion>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DashboardCard>
  );
};

export default ProductPerformances;
