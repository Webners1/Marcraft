'use client';
import React from 'react';
import {
    Grid,
    Box,
    Typography,
    FormControl,
    MenuItem,
    RadioGroup,
    FormControlLabel,
    Button,
    SliderValueLabelProps,
    Paper,
} from '@mui/material';

import { SliderThumb } from '@mui/material/Slider';

import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/app/components/container/PageContainer';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import CustomTextField from '@/app/components/forms/theme-elements/CustomTextField';
import CustomSelect from '@/app/components/forms/theme-elements/CustomSelect';
import CustomSlider from '@/app/components/forms/theme-elements/CustomSlider';
import CustomRangeSlider from '@/app/components/forms/theme-elements/CustomRangeSlider';
import CustomSwitch from '@/app/components/forms/theme-elements/CustomSwitch';
import CustomDisabledButton from '@/app/components/forms/theme-elements/CustomDisabledButton';
import CustomOutlinedButton from '@/app/components/forms/theme-elements/CustomOutlinedButton';
import CustomFormLabel from '@/app/components/forms/theme-elements/CustomFormLabel';
import CustomCheckbox from '@/app/components/forms/theme-elements/CustomCheckbox';
import CustomRadio from '@/app/components/forms/theme-elements/CustomRadio';
import ParentCard from '@/app/components/shared/ParentCard';
import { IconVolume, IconVolume2 } from '@tabler/icons-react';
import { Stack } from '@mui/material';
// import ReactQuill from 'react-quill';
import { useTheme } from '@emotion/react';

import './Quill.css';

import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
const ReactQuill = dynamic(
    async () => {
        const { default: RQ } = await import('react-quill');
        // eslint-disable-next-line react/display-name
        return ({ ...props }) => <RQ {...props} />;
    },
    {
        ssr: false,
    },
);

export default function PricingPage() {
    const [age, setAge] = React.useState('1');
    const [select1, setSelect] = React.useState('1');
    const [select2, setSelect2] = React.useState('1');
    const [text, setText] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const handleChange4 = (event2) => {
        setSelect(event2.target.value);
    };
    const theme = useTheme();

    const handleChange5 = (event3) => {
        setSelect2(event3.target.value);
    };

    const [value, setValue] = React.useState(null);
    const [value2, setValue2] = React.useState(null);

    const [value3, setValue3] = React.useState(30);
    const handleChange6 = (event, newValue) => {
        setValue3(newValue);
    };

    return (
        <PageContainer display={'flex'} justifyContent={'center'} title="Pay" description="this is Pricing">
            {/* breadcrumb */}
            <Breadcrumb title="Pay" />
            {/* end breadcrumb */}

            <Grid container spacing={3} mb={'2rem'} justifyContent="center" mt={3}>
                <Grid item xs={12} sm={10} lg={8} textAlign="center">
                    <Typography variant="h2">
                        Flexible Influincer Plans Tailored to Fit Your Community&apos;s Unique Needs!
                    </Typography>
                </Grid>
            </Grid>
            <Grid padding={'0vw 10vw 0vw 10vw'} container spacing={3}>
                {/* <Grid item xs={12} sm={12} lg={12}> */}
                <CustomFormLabel htmlFor="name">Product Name</CustomFormLabel>
                <CustomTextField id="name" placeholder="Enter text" variant="outlined" fullWidth />

                {/* </Grid> */}
                <PageContainer>
                        {/* YEH RHA MAI */}
                {/* <Paper sx={{ border: `1px solid ${theme.palette.divider}` }} variant="outlined" fullWidth> */}
                    <ReactQuill 
                        value={text}
                        onChange={(value) => {
                            setText(value);
                        }}
                        placeholder="Type here..."
                        />
                {/* </Paper> */}
                        </PageContainer>
            </Grid>
        </PageContainer >
    );
}
