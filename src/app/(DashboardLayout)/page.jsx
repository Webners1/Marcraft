'use client';
import React from 'react';
import PageContainer from '@/app/components/container/PageContainer';
import Banner from '@/app/components/landingpage/banner/Banner';
import C2a2 from '@/app/components/landingpage/c2a/C2a2';
import DemoSlider from '@/app/components/landingpage/demo-slider/DemoSlider';
import Footer from '@/app/components/landingpage/footer/Footer';
import LpHeader from '@/app/components/landingpage/header/Header';
import { Grid, Box, Typography, Accordion, AccordionSummary, AccordionDetails, Stack } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IconBrain, IconCurrencyBitcoin, IconDeviceDesktop, IconUsers, IconChartBar, IconRocket } from '@tabler/icons-react';  // Corrected icon imports
import { motion } from 'framer-motion';

export default function Landingpage() {
  return (
    <PageContainer title="Marcraft" description="A Marketplace for Web3 Influencers">
      <LpHeader />
      <Banner />
      <WhatWeDoSection />
      <DemoSlider />
      <FaqSection />
      <C2a2 />
      <Footer />
    </PageContainer>
  );
}

// Section to showcase technologies used in the application


export function WhatWeDoSection() {
  return (
    <Box
      py={10}
      px={2}
      bgcolor="background.paper"
      sx={{
        textAlign: 'center',
        maxWidth: '1200px', // Limit maximum width
        mx: 'auto', // Center the content
        borderRadius: 2, // Rounded corners
        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)', // Add shadow for depth
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={6}
        sx={{
          fontSize: {
            xs: '28px',
            sm: '32px',
            md: '36px',
            lg: '42px',
          },
        }}
      >
        What We Do
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {/* Hire Top Web3 Talents */}
        <Grid item xs={12} sm={6} md={4}>
          <motion.div
            initial={{ opacity: 0, translateY: 50 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Box textAlign="center">
              <IconUsers size={48} color="#1976d2" />
              <Typography
                variant="h6"
                fontWeight={600}
                mt={2}
                sx={{ fontSize: { xs: '18px', md: '20px' } }}
              >
                Hire Top Web3 Talents
              </Typography>
              <Typography
                color="textSecondary"
                mt={1}
                sx={{
                  fontSize: { xs: '14px', sm: '16px' },
                  maxWidth: '300px',
                  mx: 'auto',
                }}
              >
                Connect with the best influencers and marketing experts to help grow your Web3 brand.
              </Typography>
            </Box>
          </motion.div>
        </Grid>

        {/* Data-Driven Insights */}
        <Grid item xs={12} sm={6} md={4}>
          <motion.div
            initial={{ opacity: 0, translateY: 50 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Box textAlign="center">
              <IconChartBar size={48} color="#1976d2" />
              <Typography
                variant="h6"
                fontWeight={600}
                mt={2}
                sx={{ fontSize: { xs: '18px', md: '20px' } }}
              >
                Data-Driven Insights
              </Typography>
              <Typography
                color="textSecondary"
                mt={1}
                sx={{
                  fontSize: { xs: '14px', sm: '16px' },
                  maxWidth: '300px',
                  mx: 'auto',
                }}
              >
                Leverage comprehensive statistics and analytics to make informed hiring decisions.
              </Typography>
            </Box>
          </motion.div>
        </Grid>

        {/* Web3 Marketplace */}
        <Grid item xs={12} sm={6} md={4}>
          <motion.div
            initial={{ opacity: 0, translateY: 50 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Box textAlign="center">
              <IconRocket size={48} color="#1976d2" />
              <Typography
                variant="h6"
                fontWeight={600}
                mt={2}
                sx={{ fontSize: { xs: '18px', md: '20px' } }}
              >
                Web3 Marketplace
              </Typography>
              <Typography
                color="textSecondary"
                mt={1}
                sx={{
                  fontSize: { xs: '14px', sm: '16px' },
                  maxWidth: '300px',
                  mx: 'auto',
                }}
              >
                The first marketplace tailored for Web3, allowing you to find the right partner for your product.
              </Typography>
            </Box>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
}



// Section for FAQs using MUI Accordion with Framer Motion for animations
import { IconKey, IconShield } from '@tabler/icons-react';

export function FaqSection() {
  return (
    <Box py={8} sx={{ bgcolor: '#f9f9f9' }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" mb={6} sx={{ letterSpacing: '0.5px' }}>
        Frequently Asked Questions
      </Typography>

      <Stack spacing={4} maxWidth="lg" mx="auto">
        <FaqItem
          question="What is Marcraft Marketplace?"
          icon={<IconQuestionCircle size={24} color="#1976d2" />}
        >
          Marcraft Marketplace connects Web3 influencers with projects, providing data-driven insights for the perfect match.
        </FaqItem>

        <FaqItem
          question="How does Marcraft use AI and NLP?"
          icon={<IconCheckCircle size={24} color="#1976d2" />}
        >
          We use AI and NLP to analyze influencer content, ensuring you find the right partner based on data and performance metrics.
        </FaqItem>

        <FaqItem
          question="What are Smart Contracts?"
          icon={<IconKey size={24} color="#1976d2" />}
        >
          Smart contracts are self-executing contracts with the terms directly written into code, facilitating secure, automated payments between influencers and projects.
        </FaqItem>

        <FaqItem
          question="Is Marcraft secure?"
          icon={<IconShield size={24} color="#1976d2" />}
        >
          Yes, we use Web3 and blockchain technologies to ensure secure and transparent transactions.
        </FaqItem>
      </Stack>
    </Box>
  );
}


export function FaqSection() {
  return (
    <Box py={8} sx={{ bgcolor: '#f9f9f9' }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" mb={6} sx={{ letterSpacing: '0.5px' }}>
        Frequently Asked Questions
      </Typography>

      <Stack spacing={4} maxWidth="lg" mx="auto">
        <FaqItem
          question="What is Marcraft Marketplace?"
          icon={<IconQuestionCircle size={24} color="#1976d2" />}
        >
          Marcraft Marketplace connects Web3 influencers with projects, providing data-driven insights for the perfect match.
        </FaqItem>

        <FaqItem
          question="How does Marcraft use AI and NLP?"
          icon={<IconCheckCircle size={24} color="#1976d2" />}
        >
          We use AI and NLP to analyze influencer content, ensuring you find the right partner based on data and performance metrics.
        </FaqItem>

        <FaqItem
          question="What are Smart Contracts?"
          icon={<IconKey size={24} color="#1976d2" />}
        >
          Smart contracts are self-executing contracts with the terms directly written into code, facilitating secure, automated payments between influencers and projects.
        </FaqItem>

        <FaqItem
          question="Is Marcraft secure?"
          icon={<IconShield size={24} color="#1976d2" />}
        >
          Yes, we use Web3 and blockchain technologies to ensure secure and transparent transactions.
        </FaqItem>
      </Stack>
    </Box>
  );
}

export function FaqItem({ question, children, icon }) {
  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Accordion sx={{ bgcolor: 'background.paper', borderRadius: '8px', boxShadow: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: '#1976d2' }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{
            padding: '16px',
            fontWeight: 'bold',
            '& .MuiAccordionSummary-content': { alignItems: 'center', gap: '8px' },
          }}
        >
          {icon}
          <Typography variant="h6" fontWeight={600}>
            {question}
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: '16px', bgcolor: 'rgba(0, 0, 0, 0.03)', borderRadius: '4px' }}>
          <Typography color="textSecondary" fontSize="16px">
            {children}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </motion.div>
  );
}



// FAQ Item component with accordion and animations
export function FaqItem({ question, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography variant="h6">{question}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography color="textSecondary">{children}</Typography>
        </AccordionDetails>
      </Accordion>
    </motion.div>
  );
}
