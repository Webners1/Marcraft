'use client';
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/app/components/container/PageContainer';
import ChildCard from '@/app/components/shared/ChildCard';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Tickets',
  },
];

const TicketList = () => {
  return (
    <PageContainer title="Ticket App" description="this is Ticket App">
      <Breadcrumb title="Tickets app" items={BCrumb} />
      <ChildCard>
      </ChildCard>
    </PageContainer>
  );
};

export default TicketList;
