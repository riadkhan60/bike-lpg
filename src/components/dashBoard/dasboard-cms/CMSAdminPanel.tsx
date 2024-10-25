'use client';
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import QASection from './QASection';
import VideosSection from './VideosSection';
import ProductsSection from './ProductsSection';
import BannersSection from './BannersSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DasboardContextProvider, {
  useDashboardContext,
} from './DashboardContext/DasboardContext';
import DynamicStatsSection from './Stats/Stats';
import CustomerReviewsSection from './Reviews/CustomerReviews';
import GallerySection from './Galley/Galley';
import EmailLists from './EmailLists/EmailLists';
import FormResponseList from './FormResponseList/FormResponseList';
import Company from './Company/Company';
import TeamMembers from './TeamMembers/TeamMembers';

export default function CMSAdminPanel() {
  return (
    <DasboardContextProvider>
      <Panel />
    </DasboardContextProvider>
  );
}

function Panel() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const { fetchedInitialData } = useDashboardContext();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/cms');
        const fetchedData = await response.json();
        fetchedInitialData(fetchedData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [fetchedInitialData]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="mr-2 h-10 w-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-8 overflow-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            {[
              'dashboard',
              'Company',
              'FAQ',
              'videos',
              'products',
              'Reviews',
              'banners',
              'Gallery',
              'Stats',
              'Emails',
              'Form Responses',
              "Team Members",
              
            ].map((tab) => (
              <TabsTrigger key={tab} value={tab}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="dashboard">
            <Dashboard />
          </TabsContent>
          <TabsContent value="FAQ">
            <QASection />
          </TabsContent>
          <TabsContent value="videos">
            <VideosSection />
          </TabsContent>
          <TabsContent value="products">
            <ProductsSection />
          </TabsContent>
          <TabsContent value="banners">
            <BannersSection />
          </TabsContent>
          <TabsContent value="Reviews">
            <CustomerReviewsSection />
          </TabsContent>
          <TabsContent value="Gallery">
            <GallerySection />
          </TabsContent>
          <TabsContent value="Stats">
            <DynamicStatsSection />
          </TabsContent>
          <TabsContent value="Emails">
            <EmailLists />
          </TabsContent>
          <TabsContent value="Form Responses">
            <FormResponseList />
          </TabsContent>
          <TabsContent value="Company">
            <Company />
          </TabsContent>
          <TabsContent value="Team Members">
            <TeamMembers />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
