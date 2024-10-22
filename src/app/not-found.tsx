'use client';
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HomeIcon, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="text-center space-y-8 max-w-md">
        {/* 404 Text */}
        <h1 className="text-9xl font-bold text-primary">404</h1>

        {/* Error Message */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            Oops! Page not found
          </h2>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist or has been moved. Let's
            get you back on track.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            asChild
            variant="default"
            size="lg"
            className="w-full sm:w-auto"
          >
            <Link href="/">
              <HomeIcon className="mr-2 h-4 w-4" />
              Go to Homepage
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

export default NotFound;

        // {/* Additional Help */}
        // <div className="text-sm text-muted-foreground pt-8">
        //   <p>Need help? Contact our support team or visit our help center.</p>
        //   <div className="flex gap-2 justify-center mt-2">
        //     <Button variant="link" asChild>
        //       <Link href="/support">Support</Link>
        //     </Button>
        //     <span className="text-muted-foreground">•</span>
        //     <Button variant="link" asChild>
        //       <Link href="/help">Help Center</Link>
        //     </Button>
        //   </div>
        // </div>