import { School } from 'lucide-react';
import Link from 'next/link';
import type { FC } from 'react';

export const Logo: FC = () => {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="CampusConnect Home">
      <div className="p-2 bg-primary rounded-lg">
        <School className="h-6 w-6 text-primary-foreground" />
      </div>
      <span className="text-xl font-bold text-foreground font-headline">
        CampusConnect
      </span>
    </Link>
  );
};
