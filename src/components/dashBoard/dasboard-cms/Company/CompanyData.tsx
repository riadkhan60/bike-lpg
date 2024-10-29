'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Facebook, Youtube, Instagram, Linkedin, Loader2 } from 'lucide-react';
import {
  IconBrandWhatsapp as Whatsapp,
  IconBrandTiktok as Tiktok,
} from '@tabler/icons-react';

interface ContactData {
  id?: string;
  companyId: string;
  phone?: string;
  email?: string;
  location?: string;
  facebook?: string;
  whatsapp?: string;
  tiktok?: string;
  youtube?: string;
  instagram?: string;
  linkedin?: string;
}

export default function CompanyData() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('Bike Lpg');
  const [contacts, setContacts] = useState<Record<string, ContactData>>({});
  const [loading, setLoading] = useState(true);

  const companies = [
    { id: '1', name: 'Bike Lpg' },
    { id: '2', name: 'Jannat Petroleum' },
    { id: '3', name: 'Design House' },
  ];

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch('/api/contacts');
        const data = await response.json();
        const contactsByCompany = data.reduce(
          (acc: Record<string, ContactData>, contact: ContactData) => {
            acc[contact.companyId] = contact;
            return acc;
          },
          {},
        );
        setContacts(contactsByCompany);
      } catch  {
        toast({
          title: 'Error',
          description: 'Failed to fetch contact settings',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, [toast]);

  const handleSubmit = async (event: React.FormEvent, companyId: string) => {
    event.preventDefault();
    const contact = contacts[companyId];

    try {
      const url = contact?.id ? `/api/contacts/${contact.id}` : '/api/contacts';

      const method = contact?.id ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...contact,
          companyId,
        }),
      });

      if (!response.ok) throw new Error('Failed to save contact');

      const updatedContact = await response.json();
      setContacts((prev) => ({
        ...prev,
        [companyId]: updatedContact,
      }));

      toast({
        title: 'Success',
        description: 'Contact settings saved successfully',
      });
    } catch  {
      toast({
        title: 'Error',
        description: 'Failed to save contact settings',
        variant: 'destructive',
      });
    }
  };

  const handleInputChange = (
    companyId: string,
    field: keyof ContactData,
    value: string,
  ) => {
    setContacts((prev) => ({
      ...prev,
      [companyId]: {
        ...prev[companyId],
        companyId,
        [field]: value,
      },
    }));
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
  };

  if (loading) {
     return (
       <div className="flex h-screen w-full items-center justify-center">
         <motion.div
           animate={{ rotate: 360 }}
           transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
         >
           <Loader2 className="h-12 w-12 " />
         </motion.div>
       </div>
     );
  }

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Contact Settings</CardTitle>
        <CardDescription>
          Manage your contact information for different purposes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            {companies.map((company) => (
              <TabsTrigger key={company.id} value={company.name}>
                {company.name}
              </TabsTrigger>
            ))}
          </TabsList>
          <AnimatePresence mode="wait">
            {companies.map((company) => (
              <TabsContent key={company.id} value={company.name}>
                <motion.div
                  variants={tabVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <form
                    onSubmit={(e) => handleSubmit(e, company.id)}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`phone-${company.id}`}>Phone</Label>
                        <Input
                          id={`phone-${company.id}`}
                          placeholder="Enter phone number"
                          value={contacts[company.id]?.phone || ''}
                          onChange={(e) =>
                            handleInputChange(
                              company.id,
                              'phone',
                              e.target.value,
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`email-${company.id}`}>Email</Label>
                        <Input
                          id={`email-${company.id}`}
                          type="email"
                          placeholder="Enter email address"
                          value={contacts[company.id]?.email || ''}
                          onChange={(e) =>
                            handleInputChange(
                              company.id,
                              'email',
                              e.target.value,
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`location-${company.id}`}>Location</Label>
                      <Textarea
                        id={`location-${company.id}`}
                        placeholder="Enter address"
                        value={contacts[company.id]?.location || ''}
                        onChange={(e) =>
                          handleInputChange(
                            company.id,
                            'location',
                            e.target.value,
                          )
                        }
                      />
                    </div>
                    <div className="space-y-4">
                      <Label>Social Media Links</Label>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          {
                            icon: Facebook,
                            field: 'facebook',
                            color: 'text-blue-600',
                            placeholder: 'Facebook URL',
                          },
                          {
                            icon: Whatsapp,
                            field: 'whatsapp',
                            color: 'text-green-500',
                            placeholder: 'WhatsApp number',
                          },
                          {
                            icon: Tiktok,
                            field: 'tiktok',
                            color: 'text-black',
                            placeholder: 'TikTok username',
                          },
                          {
                            icon: Youtube,
                            field: 'youtube',
                            color: 'text-red-600',
                            placeholder: 'YouTube channel URL',
                          },
                          {
                            icon: Instagram,
                            field: 'instagram',
                            color: 'text-pink-600',
                            placeholder: 'Instagram username',
                          },
                          {
                            icon: Linkedin,
                            field: 'linkedin',
                            color: 'text-blue-700',
                            placeholder: 'LinkedIn profile URL',
                          },
                        ].map(({ icon: Icon, field, color, placeholder }) => (
                          <motion.div
                            key={field}
                            className="flex items-center space-x-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Icon className={`h-5 w-5 ${color}`} />
                            <Input
                              placeholder={placeholder}
                              value={
                                contacts[company.id]?.[
                                  field as keyof ContactData
                                ] || ''
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  company.id,
                                  field as keyof ContactData,
                                  e.target.value,
                                )
                              }
                            />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    <Button type="submit" className="ml-auto">
                      Save Changes
                    </Button>
                  </form>
                </motion.div>
              </TabsContent>
            ))}
          </AnimatePresence>
        </Tabs>
      </CardContent>
    </Card>
  );
}
