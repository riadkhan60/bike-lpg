'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Loader2, LockIcon, ShieldAlertIcon, InfoIcon } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const email = 'khanriad60@gmail';

export default function SecureDownloadForm() {
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [isVeryfying, setIsVeryfying] = useState(false);
  const [isPinSending, setIsPinSending] = useState(false);
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleRequestPin = async () => {
    setLoading(true);
    setError('');
    setIsPinSending(true);

    try {
      const res = await fetch('/api/generate-pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) throw new Error('Failed to generate PIN');

      setIsOpen(true);
    } catch {
      setError('Error sending PIN. Please try again.');
    } finally {
      setLoading(false);
      setIsPinSending(false);
    }
  };

  const handleVerifyPin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setIsVeryfying(true);
    setError('');

    try {
      const res = await fetch('/api/verify-pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin }),
      });

      if (!res.ok) throw new Error('Invalid PIN');

      const { downloadUrl } = await res.json();
      window.location.href = downloadUrl;
    } catch {
      setError('Invalid PIN. Please try again.');
    } finally {
      setLoading(false);
      setIsVeryfying(false);
    }
  };

  const lastFourChars = email?.slice(-10);

  return (
    <Card className="w-full  ">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LockIcon className="h-5 w-5" />
          Secure Admin Credentials
        </CardTitle>
        <CardDescription>
          This feature provides secure access to all sensitive website
          credentials and configuration details.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <ShieldAlertIcon className="h-4 w-4" />
          <AlertTitle>Security Notice</AlertTitle>
          <AlertDescription>
            For security reasons, this feature is restricted to authorized admin
            users only. Unauthorized access attempts will be logged and may
            result in account suspension.
          </AlertDescription>
        </Alert>
        <div className="space-y-2">
          <h3 className="text-sm font-medium">{"What's"} included:</h3>
          <ul className="list-disc list-inside text-sm text-muted-foreground">
            <li>Database connection strings</li>
            <li>API keys and secrets</li>
            <li>Server configuration details</li>
            <li>Admin account information</li>
          </ul>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={handleRequestPin}
              disabled={loading}
              className="w-full"
            >
              {isPinSending ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <LockIcon className="mr-2 h-4 w-4" /> Download Credentials
                </span>
              )}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Verify PIN</DialogTitle>
              <DialogDescription>
                Enter the PIN sent to your email ending with ...{lastFourChars}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleVerifyPin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pin">PIN</Label>
                <Input
                  id="pin"
                  type="text"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Enter PIN"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {isPinSending ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                  </span>
                ) : isVeryfying ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />{' '}
                    Verifying...
                  </span>
                ) : (
                  <span>Verify</span>
                )}
              </Button>
            </form>
            {error && <p className="text-destructive mt-2">{error}</p>}
          </DialogContent>
        </Dialog>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground flex items-start gap-2">
          <InfoIcon className="h-4 w-4 mt-0.5 flex-shrink-0" />
          After verification, {"you'll"} receive a temporary download link. For
          security, this link will expire in 15 minutes.
        </p>
      </CardFooter>
    </Card>
  );
}
