'use client';
import CMSAdminPanel from '@/components/dashBoard/dasboard-cms/CMSAdminPanel';
import { Protect } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, LogIn } from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';

export default function page() {
  return (
    <Protect fallback={<FallBack />}>
      <div>
        <CMSAdminPanel />
      </div>
      <Toaster  />
    </Protect>
  );
}

const FallBack = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="text-center space-y-8 max-w-md">
        {/* Robot Image */}
        <div className="relative w-full h-[300px] mb-8">
          <Image 
            src="/data/robot.png"
            alt="Access Denied Robot"
            fill
            className="object-contain"
            priority
          />
        </div>
        
        {/* Error Message */}
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold tracking-tight">
            Access Restricted
          </h2>
          <p className="text-xl text-muted-foreground">
            {"You can't access this page"}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto  text-white"
          >
            <Link href="/auth/sign-in">
              <LogIn className="mr-2 h-4 w-4" />
              Login to Access
            </Link>
          </Button>

          <Button
            onClick={() => window.history.back()}
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>

      </div>
    </div>
  );
};

// {/* Additional Help */}
        // <div className="text-sm text-muted-foreground pt-8">
        //   <p>Need assistance? Our support team is here to help.</p>
        //   <div className="flex gap-2 justify-center mt-2">
        //     <Button variant="link" asChild>
        //       <Link href="/support">Contact Support</Link>
        //     </Button>
        //     <span className="text-muted-foreground">•</span>
        //     <Button variant="link" asChild>
        //       <Link href="/help">Help Center</Link>
        //     </Button>
        //   </div>
        // </div>