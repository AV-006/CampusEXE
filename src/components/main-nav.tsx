'use client';

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import * as lucideIcons from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const navItems = [
  { href: '/', label: 'Dashboard', icon: 'LayoutDashboard' },
  { href: '/resources', label: 'Resources', icon: 'BookCopy' },
  { href: '/interaction', label: 'Interaction', icon: 'Users' },
  { href: '/feedback', label: 'Feedback', icon: 'MessageSquareQuote' },
  { href: '/services', label: 'Services', icon: 'ConciergeBell' },
  { href: '/events', label: 'Events', icon: 'Calendar' },
];

type IconName = keyof typeof lucideIcons;

export function MainNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => {
        const Icon = lucideIcons[item.icon as IconName] as React.ElementType;
        const isActive =
          item.href === '/'
            ? pathname === item.href
            : pathname.startsWith(item.href);
        return (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton
              asChild
              isActive={isActive}
              tooltip={item.label}
              as={Link}
              href={item.href}
            >
              <>
                <Icon />
                <span>{item.label}</span>
              </>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
