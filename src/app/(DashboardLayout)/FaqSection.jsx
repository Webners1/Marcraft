import { Accordion, AccordionDetails, AccordionSummary, Box, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import {
    IconKey,
    IconShield,
    IconQuestionCircle,
    IconUsers,
    IconChartBar,
    IconRocket,
} from '@tabler/icons-react';

export function FaqItem({ question, children, icon }) {
  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Accordion sx={{ bgcolor: 'background.paper', borderRadius: '8px', boxShadow: 2 }}>
        <AccordionSummary
          expandIcon={<IconRocket size={24} color="#1976d2" />}  // Updated this
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{
            padding: '16px',
            fontWeight: 'bold',
            '& .MuiAccordionSummary-content': { alignItems: 'center', gap: '8px' },
          }}
        >
          {icon && icon} {/* Only render the icon if it's provided */}
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

export default function FaqSection() {
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
          icon={<IconKey size={24} color="#1976d2" />}
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
