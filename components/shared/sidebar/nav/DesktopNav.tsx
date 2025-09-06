'use client'

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ThemeToggle } from '@/components/ui/theme/theme-toggle';
import { TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useNavigation } from '@/hooks/useNavigation';
import { UserButton } from '@clerk/nextjs';
import { Tooltip } from '@radix-ui/react-tooltip';
import Link from 'next/link';
import React from 'react';

const DesktopNav = () => {
  const paths = useNavigation();

  return (
    <Card className='hidden lg:h-full min-h-[300px] lg:flex lg:flex-col lg:justify-between lg:items-center  lg:w-16 lg:px-2 lg:py-4'>
      
      {/* nav */}
      <nav>
        <ul className='flex flex-col gap-4'>
        {paths.map((path, id) => {
  console.log('path.icon:', path.icon);
  const IconComponent = path.icon; // Get the icon component
  console.log('Navigation path:', path.href); // Check what href is being used

  return (
    <li key={id} className="relative">
      <Link href={path.href}>
        <Tooltip>
          <TooltipTrigger asChild>
               {/* Wrap Button and Badge in a div */}
               <div className="relative">
                      <Link href={path.href}>
                        <Button 
                          size="icon"
                          variant={path.active ? 'secondary' : 'outline'}
                          className={path.active ? "bg-blue-400 text-primary-foreground" : ""}
                        >
                          <IconComponent />
                        </Button>
                      </Link>
                      
                      {path.count && (
                        <Badge className='absolute left-6 bottom-6 bg-green-700 text-white  rounded-full'>
                          {path.count}
                        </Badge>
                      )}
                    </div>
        
          </TooltipTrigger>
          <TooltipContent>
            <p>{path.name}</p>
          </TooltipContent>
        </Tooltip>
      </Link>
    </li>
  );
})}
        </ul>
      </nav>
      <div className='flex flex-col gap-4 items-center'>
        <ThemeToggle/>
        <UserButton />
      </div>
    </Card>
  );
};

export default DesktopNav;