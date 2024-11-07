import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send, Check, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import 'react-phone-number-input/style.css';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';

// Zod schema for form validation
const formSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must not exceed 50 characters')
    .regex(
      /^[a-zA-Z\s]*$/,
      'First name should only contain letters and spaces',
    ),
  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must not exceed 50 characters')
    .regex(/^[a-zA-Z\s]*$/, 'Last name should only contain letters and spaces'),
  email: z
    .string()
    .email('Invalid email format')
    .min(5, 'Email must be at least 5 characters')
    .max(100, 'Email must not exceed 100 characters'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .refine((value) => isValidPhoneNumber(value), {
      message: 'Invalid phone number format',
    }),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must not exceed 1000 characters')
    .refine((value) => value.trim().length > 0, 'Message cannot be empty'),
});

type FormInputs = z.infer<typeof formSchema>;

export default function ContactUsForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(
    null,
  );
  const [hasSubmittedInSession, setHasSubmittedInSession] = useState(false);

  // Check for previous submission in session storage
  useEffect(() => {
    const sessionSubmitted = sessionStorage.getItem('formSubmitted');
    if (sessionSubmitted === 'true') {
      setHasSubmittedInSession(true);
    }
  }, []);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  async function handlePost(data: FormInputs) {
    console.log(data);
    try {
       await fetch('/api/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({data: data}),
       });
      
      return true;
    } catch {
      throw new Error('Failed to submit form');
    }
  }
  const onSubmit = async (data: FormInputs) => {
    if (hasSubmittedInSession) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call
      await handlePost(data);

      // Store submission status in session storage
      sessionStorage.setItem('formSubmitted', 'true');
      setHasSubmittedInSession(true);

      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">First Name</label>
            <Input
              {...register('firstName')}
              placeholder="John"
              className={errors.firstName ? 'border-red-500' : ''}
              disabled={hasSubmittedInSession}
            />
            {errors.firstName && (
              <p className="text-sm text-red-500">{errors.firstName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Last Name</label>
            <Input
              {...register('lastName')}
              placeholder="Doe"
              className={errors.lastName ? 'border-red-500' : ''}
              disabled={hasSubmittedInSession}
            />
            {errors.lastName && (
              <p className="text-sm text-red-500">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <Input
            {...register('email')}
            type="email"
            placeholder="john@example.com"
            className={errors.email ? 'border-red-500' : ''}
            disabled={hasSubmittedInSession}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Phone Number</label>
          <Controller
            name="phone"
            control={control}
            render={({ field: { onChange, value } }) => (
              <PhoneInput
                value={value}
                onChange={onChange}
                defaultCountry="BD"
                international
                countryCallingCodeEditable={false}
                className={`w-full ${errors.phone ? 'border-red-500' : ''}`}
                inputComponent={Input}
                disabled={hasSubmittedInSession}
              />
            )}
          />
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Message</label>
          <Textarea
            {...register('message')}
            placeholder="How can we help you?"
            className={`min-h-[150px] ${
              errors.message ? 'border-red-500' : ''
            }`}
            disabled={hasSubmittedInSession}
          />
          {errors.message && (
            <p className="text-sm text-red-500">{errors.message.message}</p>
          )}
        </div>

        {submitStatus === 'success' && (
          <Alert className="bg-green-50">
            <Check className="h-4 w-4" />
            <AlertDescription>
              Thank you! Your message has been sent successfully. You can submit
              another message in a new session.
            </AlertDescription>
          </Alert>
        )}

        {submitStatus === 'error' && (
          <Alert className="bg-red-50">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {hasSubmittedInSession
                ? 'You have already submitted a message in this session. Please try again in a new session.'
                : 'There was an error sending your message. Please try again.'}
            </AlertDescription>
          </Alert>
        )}

        <Button
          type="submit"
          className="w-full bg-brand hover:bg-brand/80"
          disabled={isSubmitting || hasSubmittedInSession}
        >
          {isSubmitting ? (
            'Sending...'
          ) : hasSubmittedInSession ? (
            'Already Submitted'
          ) : (
            <>
              Send Message
              <Send className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
