import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import WebsitePreviewCard from '../WebsitePreviewCard';
import HelplineCard from './HelpLine/Helpline';
import SecureDownloadForm from '@/components/DownloadPdf/SecureDownloadForm';

export default function Dashboard() {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col  gap-4 w-full">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Welcome to your CMS Dashboard</CardTitle>
            <CardDescription>Manage your content from here.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-5">
              Select a tab to manage your content & database.
            </p>
            <div className="border-2 w-fit p-2 border-gray-200 rounded-md ">
              <Link href={'/'}>
                <WebsitePreviewCard />
              </Link>
            </div>
            <Button className="mt-5">
              <Link href={'/'}>Go Home</Link>
            </Button>
          </CardContent>
        </Card>

        <SecureDownloadForm />
      </div>
      <HelplineCard />
    </div>
  );
}
