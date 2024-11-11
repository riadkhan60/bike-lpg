import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Mail, MessageSquare, Phone, Clock, Globe } from 'lucide-react';

export default function HelplineCard() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-6">
        <div className="flex items-center justify-between">
          <Image
            src="https://qbexel.com/Data/BrandLogo/LogoLight.svg"
            alt="qbexel logo"
            width={120}
            height={40}
            className="h-10 w-auto"
          />
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Globe className="h-4 w-4" />
            <Link href="https://qbexel.com" className="hover:underline">
              qbexel.com
            </Link>
          </div>
        </div>
        <Separator />
        <div>
          <CardTitle className="text-2xl font-bold">
            Developer Helpline
          </CardTitle>
          <CardDescription>
            Need assistance? Our expert team is here to help.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src="https://qbexel.com/Data/BrandLogo/faviconRaw.png"
              alt="Developer Team"
            />
            <AvatarFallback>DT</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold">Dev Support Team</h3>
            <p className="text-sm text-muted-foreground">
              Full-stack expertise
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>Available Sat-Thu, 9PM - 11PM BST</span>
        </div>
        <div className="grid gap-4">
          <div className="flex items-center space-x-4 rounded-md border p-4">
            <Mail className="h-6 w-6" />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">Email Support</p>
              <p className="text-sm text-muted-foreground">
                Get a response within 24 hours
              </p>
            </div>
            <a href="mailto:qbexel@gmail.com">
              <Button variant="secondary">Contact</Button>
            </a>
          </div>
          <div className="flex items-center space-x-4 rounded-md border p-4">
            <MessageSquare className="h-6 w-6" />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">Live Chat</p>
              <p className="text-sm text-muted-foreground">
                Quick answers to simple questions
              </p>
            </div>
            <a href="https://wa.link/yak50m">
              <Button variant="secondary">Start Chat</Button>
            </a>
          </div>
          <div className="flex items-center space-x-4 rounded-md border p-4">
            <Phone className="h-6 w-6" />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">Phone Support</p>
              <p className="text-sm text-muted-foreground">
                For urgent or complex issues
              </p>
            </div>
            <a href="tel:+8801795024751">
              <Button variant="secondary">Call Now</Button>
            </a>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          Our experienced team specializes in React, Node.js, and database
          technologies. {"We're"} committed to resolving your issues promptly
          and efficiently.
        </p>
      </CardFooter>
    </Card>
  );
}
