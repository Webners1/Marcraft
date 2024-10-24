import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { IconChevronDown } from '@tabler/icons-react';
import AppLinks from '@/app/(DashboardLayout)/layout/vertical/header/AppLinks';
import QuickLinks from '@/app/(DashboardLayout)/layout/vertical/header/QuickLinks';
import DemosDD from './DemosDD';

const Navigations = () => {

    const StyledButton = styled(Button)(({ theme }) => ({
        fontSize: '16px',
        color: theme.palette.text.secondary
    }));

    // demos
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // pages

    const [open2, setOpen2] = useState(false);

    const handleOpen2 = () => {
        setOpen2(true);
    };

    const handleClose2 = () => {
        setOpen2(false);
    };



    return (
        <>
            <StyledButton color="inherit" variant="text" href="/">
                Documentation
            </StyledButton>
            <Button color="primary" variant="contained" href="/auth/auth1/login">
                Login
            </Button>
        </>
    );
};

export default Navigations;
