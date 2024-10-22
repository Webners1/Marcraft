'use client';
import React from 'react';
import {
    Grid,
    Typography

} from '@mui/material';

import PageContainer from '@/app/components/container/PageContainer';
import styles from "./pricing.module.css"
import { ConnectButton } from '@rainbow-me/rainbowkit';

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

export default function HiringDetails() {

    const [title, setTitle] = React.useState("")
    const [price, setPrice] = React.useState("")
    const [description, setDescription] = React.useState("")
    const [socialHandles, setSocialHandles] = React.useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        // Here you would typically handle the form submission,
        // such as sending the data to an API
        console.log("Submitted:", { title, description })
        // Reset form fields after submission
        setTitle("")
        setDescription("")
    }

    return (
        <PageContainer display={'flex'} justifyContent={'center'} title="Details" description="this is Pricing">

            <Grid container spacing={3} mb={'2rem'} justifyContent="center" mt={3}>
                <Grid item xs={12} sm={10} lg={8} textAlign="center">
                    <Typography variant="h2">
                        Flexible Influincer Plans Tailored to Fit Your Community&apos;s Unique Needs!
                    </Typography>
                </Grid>
            </Grid>
            <div className={styles.formContainer}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="title" className={styles.label}>Project Title</label>
                        <input
                            id="title"
                            type="text"
                            className={styles.input}
                            placeholder="Enter project title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="price" className={styles.label}>Hiring Budget</label>
                        <input
                            id="price"
                            type="text"
                            className={styles.input}
                            placeholder="Enter Hiring Budget"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="description" className={styles.label}>Project Description</label>
                        <textarea
                            id="description"
                            className={styles.textarea}
                            placeholder="Describe your project"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="socialHandles" className={styles.label}>Social Handles</label>
                        <textarea
                            id="socialHandles"
                            className={styles.textarea}
                            placeholder="Social Handles (If Any)"
                            value={socialHandles}
                            onChange={(e) => setSocialHandles(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className={styles.button}>Hire</button>
                    <ConnectButton />
                </form>
            </div>
        </PageContainer >
    );
}
