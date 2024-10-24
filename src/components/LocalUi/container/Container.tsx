import { cn } from '@/lib/utils';

interface props {
  children: React.ReactNode;
  className?: string;
}
export default function Container({ children, className }: props) {
  return (
    <div
      className={cn(
        ' mx-auto custom-container max-md:w-container-phone max-lg:w-container-768 max-2xl:w-container-1440 w-container-big',
        className,
      )}
    >
      {children}
    </div>
  );
}
