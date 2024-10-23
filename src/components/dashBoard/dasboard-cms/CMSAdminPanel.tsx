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
import DasboardContextProvider from './DashboardContext/DasboardContext';


export default function CMSAdminPanel() {
  <DasboardContextProvider>
    <Panel />
  </DasboardContextProvider>
}




 function Panel() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({
    qas: [],
    videoLinks: [],
    products: [],
    banners: [],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/cms');
      const fetchedData = await response.json();
      setData(fetchedData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
    setIsLoading(false);
  };

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
            {['dashboard', 'FAQ', 'videos', 'products', 'banners'].map((tab) => (
              <TabsTrigger key={tab} value={tab}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="dashboard">
            <Dashboard />
          </TabsContent>
          <TabsContent value="FAQ">
            <QASection qas={data.qas} fetchData={fetchData} />
          </TabsContent>
          <TabsContent value="videos">
            <VideosSection videoLinks={data.videoLinks} fetchData={fetchData} />
          </TabsContent>
          <TabsContent value="products">
            <ProductsSection products={data.products} fetchData={fetchData} />
          </TabsContent>
          <TabsContent value="banners">
            <BannersSection banners={data.banners} fetchData={fetchData} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
