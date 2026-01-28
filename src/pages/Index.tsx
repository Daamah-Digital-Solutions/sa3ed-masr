import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { StatsSection } from '@/components/home/StatsSection';
import { QuoteSection } from '@/components/home/QuoteSection';
import { ExpertiseSection } from '@/components/home/ExpertiseSection';

export default function Index() {
  return (
    <Layout>
      <HeroSection />
      <StatsSection />
      <QuoteSection />
      <ExpertiseSection />
    </Layout>
  );
}
