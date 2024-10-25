import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';

export default function FooterSubscriberInput() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [error, setError] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setIsTyping(true);
    setError('');

    // Reset success status if user starts typing again
    if (status === 'success') {
      setStatus('idle');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsTyping(false);

    // Reset states
    setError('');

    const trimmedEmail = email.trim();

    // Validate email
    if (!trimmedEmail) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      setError('Please enter a valid email address');
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: trimmedEmail }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      // Success scenario
      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setError(
        error instanceof Error
          ? error.message
          : 'Failed to subscribe. Please try again.',
      );
    }
  };

  const isDisabled = status === 'loading' || status === 'success';

  return (
    <div className="space-y-4" aria-live="polite">
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="space-y-1">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            className="bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-primary/50"
            disabled={isDisabled}
            aria-label="Email subscription"
            aria-invalid={!!error}
            aria-describedby={error ? 'error-message' : undefined}
            autoComplete="email"
          />
          {isTyping && !validateEmail(email) && email.length > 0 && (
            <p className="text-sm text-amber-600" role="alert">
              Please enter a valid email address
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-primary text-white hover:bg-primary/90 transition-colors"
          disabled={isDisabled}
        >
          {status === 'loading' ? (
            <span className="flex items-center justify-center">
              <Loader2
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
              Subscribing...
            </span>
          ) : status === 'success' ? (
            'Subscribed!'
          ) : (
            'Subscribe'
          )}
        </Button>
      </form>

      {error && (
        <Alert variant="destructive" role="alert">
          <AlertDescription id="error-message">{error}</AlertDescription>
        </Alert>
      )}

      {status === 'success' && (
        <Alert
          className="bg-green-50 text-green-800 border-green-200"
          role="status"
        >
          <AlertDescription>
            {`Thank you for subscribing! We'll keep you up to date.`}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}


