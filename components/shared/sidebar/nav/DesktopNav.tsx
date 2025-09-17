'use client'

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ThemeToggle } from '@/components/ui/theme/theme-toggle';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useNavigation } from '@/hooks/useNavigation';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const DesktopNav = () => {
  const paths = useNavigation();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Card className='hidden lg:h-full min-h-[300px] lg:flex lg:flex-col lg:justify-between lg:items-center lg:w-16 lg:px-2 lg:py-4'>
      
      {/* nav */}
      <nav>
        <ul className='flex flex-col gap-4'>
          {paths.map((path, id) => {
            const IconComponent = path.icon;

            return (
              <li key={id} className="relative">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="relative">
                      <Button 
                        size="icon"
                        variant={path.active ? 'secondary' : 'outline'}
                        className={path.active ? "bg-blue-400 text-primary-foreground" : ""}
                        asChild
                      >
                        <Link href={path.href}>
                          <IconComponent />
                        </Link>
                      </Button>
                      
                      {path.count && (
                        <Badge className='absolute left-6 bottom-6 bg-green-700 text-white rounded-full'>
                          {path.count}
                        </Badge>
                      )}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{path.name}</p>
                  </TooltipContent>
                </Tooltip>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className='flex flex-col gap-4 items-center'>
        <ThemeToggle/>
        {isMounted && <UserButton />}
      </div>
    </Card>
  );
};

export default DesktopNav;