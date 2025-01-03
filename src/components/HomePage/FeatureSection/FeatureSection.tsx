'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';
import Container from '@/components/LocalUi/container/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Building2, Users, Globe, Leaf } from 'lucide-react';

type Stats = {
  id: string;
  employees: number;
  dealers: number;
  clientsServed: number;
  solutions: number;
  satiesfiedClients: number;
  lpgConversion: number;
  fuelstation: number;
  furnitureSold: number;
};

const AnimatedCard = ({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, delay: index * 0.1 },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

export default function CompanyOverview() {
  const headerControls = useAnimation();
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getStats() {
      try {
        const response = await fetch('/api/stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    }

    getStats();
  }, []);

  useEffect(() => {
    if (headerInView) {
      headerControls.start('visible');
    }
  }, [headerControls, headerInView]);

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.2 },
    },
  };

  const statsConfig = [
    {
      title: 'Employees',
      value: stats?.employees ?? 1000,
      description: 'Across the country',
      icon: Users,
    },
    {
      title: 'Dealers',
      value: stats?.dealers ?? 50,
      description: 'Across the country',
      icon: Building2,
    },
    {
      title: 'Clients Served',
      value: stats?.clientsServed ?? 1000,
      description: 'From Teknaf to Tetulia',
      icon: Globe,
    },
    {
      title: 'Solutions',
      value: stats?.solutions ?? 20,
      description: 'for a sustainable future',
      icon: Leaf,
    },
  ];

  return (
    <Container>
      <section className="bg-background py-12">
        <div className="mx-auto">
          <motion.div
            className="text-center mb-12"
            ref={headerRef}
            initial="hidden"
            animate={headerControls}
            variants={headerVariants}
          >
            <h2 className="text-3xl font-bold text-primary mb-2">
              MS Jannat Traders
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We have a nationwide network and strong connections, always open
              to new opportunities and partnerships that foster innovation and
              drive mutual success.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsConfig.map((item, index) => (
              <AnimatedCard key={item.title} index={index}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {item.title}
                    </CardTitle>
                    <item.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <>
                        <Skeleton className="h-8 w-24 mb-2" />
                        <Skeleton className="h-4 w-32" />
                      </>
                    ) : (
                      <>
                        <div className="text-2xl font-bold">{item.value}+</div>
                        <p className="text-xs text-muted-foreground">
                          {item.description}
                        </p>
                      </>
                    )}
                  </CardContent>
                </Card>
              </AnimatedCard>
            ))}
          </div>

          <AnimatedCard index={4}>
            <div className="mt-12 bg-muted rounded-lg p-6 shadow-sm dark:bg-primary/20 border-none hover:shadow-md transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
              <p className="text-muted-foreground">
                Our mission is to continuously innovate and expand our product
                offerings, bringing new solutions that enhance everyday life
                while promoting sustainability. We are dedicated to fostering
                growth, reaching more customers, and building lasting
                partnerships that drive our success and contribute to a greener
                future
              </p>
            </div>
          </AnimatedCard>
        </div>
      </section>
    </Container>
  );
}
