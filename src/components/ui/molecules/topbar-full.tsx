"use client";

import { Button } from "@/components/ui/core/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/core/dropdown-menu";
import { Logo } from "@/components/ui/core/logo";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/core/tooltip";
import { Inbox, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/core/avatar";
import { Separator } from "../core/separator";
import { useAuth } from "@/context/authContext";
import { useRealTimeDb } from "@/context/realTimeDbContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/core/popover";
import { NotificationsCrud } from "./crud/notifications-crud";
import { CreateAdminNotification } from "@/typings/data";

export const TopbarFull = () => {
  const { theme, setTheme } = useTheme();
  const { user } = useAuth();
  const { notifications } = useRealTimeDb();
  const router = useRouter();

  return (
    <div className="w-full flex items-center justify-between py-[16px] px-[24px] border">
      <Logo />
      <div className="flex items-center justify-end max-w-fit gap-[16px]">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="bg-muted/10">
                  <Button variant="outline" size="icon">
                    {theme === "light" && (
                      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0" />
                    )}
                    {theme === "dark" && (
                      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-0" />
                    )}
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TooltipTrigger>
            <TooltipContent>
              <p className="">Change mode</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Popover>
          <PopoverTrigger>
            <Button variant="outline" size="icon" className="bg-muted/10">
              <Inbox className="h-[1.2rem] w-[1.2rem]" />
              {notifications.length > 0 && (
                <>
                  <div className="relative">
                    <div className="w-[10px] h-[10px] bg-primary absolute top-[-10px] right-[-2px] rounded-full flex items-center justify-center">
                      {/* <span className="text-[12px]">{notifications.length}</span> */}
                    </div>
                  </div>
                </>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="min-w-[640px]">
            <NotificationsCrud
              notifications={notifications}
              onDelete={(notification: CreateAdminNotification) => {
                console.log(notification);
              }}
            />
          </PopoverContent>
        </Popover>
        <div className="h-[40px] max-w-fit">
          <Separator orientation="vertical" />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild className="bg-muted/10">
            <Avatar className="cursor-pointer">
              <AvatarImage src={user?.photoURL as string} alt="@shadcn" />
              <AvatarFallback>
                {user?.email?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                signOut(auth);
                router.replace("/sign-in");
              }}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
