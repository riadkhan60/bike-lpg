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

export default function Dashboard() {
  return (
    <Card>
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
  );
}
