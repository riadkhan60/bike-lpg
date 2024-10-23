import { Button } from '@/components/ui/button';
import { SignedIn, UserButton } from '@clerk/nextjs';
import {
  LayoutDashboard,
  FileQuestion,
  Video,
  Package,
  Image as ImageIcon,
  ChartColumnBig,
  Star,
  ImageUpIcon
} from 'lucide-react';

export default function Sidebar({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'FAQ', label: 'FAQ', icon: FileQuestion },
    { id: 'videos', label: 'Videos', icon: Video },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'banners', label: 'Banners', icon: ImageIcon },
    { id: 'Reviews', label: 'Reviews', icon: Star },
    { id: 'Gallery', label: 'Gallery', icon: ImageUpIcon },
    { id: 'Stats', label: 'Stats', icon: ChartColumnBig },
  ];

  return (
    <aside className="w-64 bg-white p-4">
      <h1 className="text-2xl font-bold mb-6">Hello, Admin 👋</h1>
      <div className="bg-gray-200 mb-5 flex items-center justify-center rounded-full w-10 h-10">
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
      <nav>
        {sidebarItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            className={`w-full justify-start mb-2 ${
              activeTab === item.id ? 'bg-gray-100' : ''
            }`}
            onClick={() => setActiveTab(item.id)}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.label}
          </Button>
        ))}
      </nav>
    </aside>
  );
}
