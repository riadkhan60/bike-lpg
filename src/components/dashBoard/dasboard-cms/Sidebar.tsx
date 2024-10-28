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
  ImageUpIcon,
  Mails,
  Book,
  Building,
  UsersRound,
} from 'lucide-react';
import { SquareArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function Sidebar({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'Company', label: 'Company', icon: Building },
    { id: 'FAQ', label: 'FAQ', icon: FileQuestion },
    { id: 'videos', label: 'Videos', icon: Video },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'Reviews', label: 'Reviews', icon: Star },
    { id: 'banners', label: 'Banners', icon: ImageIcon },
    { id: 'Gallery', label: 'Gallery', icon: ImageUpIcon },
    { id: 'Stats', label: 'Stats', icon: ChartColumnBig },
    { id: 'Emails', label: 'Emails', icon: Mails },
    { id: 'Form Responses', label: 'Responses', icon: Book },
    { id: 'Team Members', label: 'Team', icon: UsersRound },
  ];

  return (
    <aside className="w-64 h-screen flex flex-col bg-white p-4">
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
      <div className="mt-auto">
        <Link className="" href={'/'}>
          <Button variant="secondary" className={`w-full justify-start mb-2`}>
            <SquareArrowLeft className="mr-2 h-4 w-4" />
            Go Home
          </Button>
        </Link>
      </div>
    </aside>
  );
}
