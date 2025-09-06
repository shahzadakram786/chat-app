"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ui/theme/theme-toggle";
import { TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import useConversation from "@/hooks/useConversation";
import { useNavigation } from "@/hooks/useNavigation";
import { UserButton } from "@clerk/nextjs";
import { Tooltip } from "@radix-ui/react-tooltip";
import Link from "next/link";
import React from "react";

const MobileNav = () => {
  const paths = useNavigation();
  const { isActive } = useConversation();

  if (isActive) return null;

  return (
    <Card
      className="fixed lg:hidden bottom-4 w-[calc(100vw-32px)]
    flex items-center h-16 p-2"
    >
      {/* nav */}
      <nav className="w-full">
        <ul className="flex justify-evenly items-center ">
          {paths.map((path, id) => {
            console.log("path.icon:", path.icon); // Debug the icon
            const IconComponent = path.icon; // Get the icon component

            return (
              <li key={id} className="relative">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="relative">
                      <Button
                        asChild
                        size="icon"
                        variant={path.active ? "default" : "outline"}
                        className="flex items-center justify-center"
                      >
                        <Link href={path.href} passHref>
                          <IconComponent />
                        </Link>
                      </Button>
                      
                      {path.count && (
                        <Badge className="absolute -top-2 -right-2 min-w-[20px] h-5 flex items-center justify-center p-1 bg-green-700 text-white rounded-full">
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

          <li>
            <ThemeToggle/>
          </li>
          <li>
            <UserButton />
          </li>
        </ul>
      </nav>
    </Card>
  );
};

export default MobileNav;