'use client';

import {motion} from "framer-motion"
import { Link } from "react-router-dom";
import { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/animate-ui/components/radix/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/animate-ui/primitives/radix/dropdown-menu';
import {
  ChevronUp,
  CreditCard,
  LogOut,
  Plus,
  Radio,
  Search,
  TvMinimal,
  User2,
  Wallet,
} from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,} from '@/components/ui/avatar'
import { useIsMobile } from '@/hooks/use-mobile';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Outlet } from "react-router-dom";

const DATA = {
  user: {
    name: 'Skyleen',
    email: 'skyleen@example.com',
    avatar:
      'https://pbs.twimg.com/profile_images/1909615404789506048/MTqvRsjo_400x400.jpg',
  }
};

export const RadixSidebar = () => {
  const isMobile = useIsMobile();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search submission here
    console.log('Searching for:', searchQuery);
    // You can add your search logic here
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <SidebarProvider>
      <Sidebar  collapsible="icon">
        <SidebarHeader>
          {/* Team Switcher */}
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground w-full h-14 rounded-lg transition-colors group hover:text-orange-500"
                  >
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    
                    </div>
                    <div className="grid flex-1 text-left text-2xl leading-tight">
                      <span className="truncate font-semibold">
                       <h5>CineStream</h5>
                      </span>
                      <span className="truncate text-xs">
                        
                      </span>
                    </div>
                   
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="bottom"
                  align="start"
                  className="w-[--radix-popper-anchor-width] z-50 bg-[#0A1D37] border border-gray-700 rounded-lg shadow-lg mt-1 p-1"
                >
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
          {/* Team Switcher */}
        </SidebarHeader>
        <SidebarContent>
          {/* Nav Main */}
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className='h-12 hover:text-orange-500 text-sm focus:bg-white focus:text-orange-500 transition-colors duration-200 rounded-lg' asChild>
                  <Link to={'/movie-app/movies'}>
                    <TvMinimal className="h-5 w-5" />
                    <span>Movies</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className='h-12 hover:text-orange-500 text-sm focus:bg-white focus:text-orange-500 transition-colors duration-200 rounded-lg' asChild>
                  <Link to={'/movie-app/live-streams'}>
                    <Radio className="h-5 w-5" />
                    <span>Live Streams</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className='h-12 hover:text-orange-500 focus:bg-white focus:text-orange-500 text-sm transition-colors duration-200 rounded-lg' asChild>
                  <Link to={'/movie-app/playlist'}>
                    <Plus className="h-5 w-5" />
                    <span>Playlist</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className='h-12 hover:text-orange-500 text-sm focus:bg-white focus:text-orange-500 transition-colors duration-200 rounded-lg' asChild>
                  <Link to={'/movie-app/subscriptions'}>
                    <Wallet className="h-5 w-5" />
                    <span>Subscriptions</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        <SidebarContent>
          {/* Nav Main */}
          <SidebarGroup>
            <SidebarGroupLabel></SidebarGroupLabel>
            <SidebarMenu>
             

            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>

          {/* Nav User */}
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className="w-full h-12 rounded-lg transition-colors duration-200 hover:text-black">
                    <User2 className="h-5 w-5" />
                    <span>Username</span>
                    <ChevronUp className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  align="end"
                  className="w-66 md:w-50 z-50 bg-[#fcfdff] border border-gray-200 rounded-lg shadow-lg p-1"
                >
                  <DropdownMenuItem className="cursor-pointer hover:bg-gray-200 focus:bg-gray-200 py-2 px-3 rounded-md">
                    <User2 className="mr-2 h-4 w-4" />
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer hover:bg-gray-200 focus:bg-gray-200 py-2 px-3 rounded-md">
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-200 my-1" />
                  <DropdownMenuItem className="cursor-pointer hover:bg-orange-100 focus:bg-red-200 py-2 px-3 rounded-md text-red-400">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
          {/* Nav User */}
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      {/* This is where I'll build the ui for the app */}

      <SidebarInset className='bg-[#0F161F]'>
        <header className="bg-[#0A1D37]  text-gray-100 border-gray-400 border-b-2 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 w-full m-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />

            <div className='flex justify-between items-center w-full'>
              {isMobile ? (
                <motion.div
                  initial={{ width: "2rem" }}
                  animate={isSearchFocused ? { width: "100%" } : { width: "3rem" }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="flex-1 max-w-md mx-4"
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                >
                  <form onSubmit={handleSearchSubmit} className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800 w-4 h-4" />
                    <Input
                      ref={searchInputRef}
                      className="bg-white rounded-2xl p-2 max-w-full md:min-w-100 pl-10 text-[#0A1D37]"
                      type="search"
                      placeholder="Search movies..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => setIsSearchFocused(false)}
                    />
                    {searchQuery && (
                      <Button 
                        type="submit"
                        size="icon"
                        variant="ghost"
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 rounded-full bg-orange-500 hover:bg-orange-600 text-white"
                      >
                        <Search className="h-3 w-3" />
                      </Button>
                    )}
                  </form>
                </motion.div>
              ) : (
                <div className="flex-1 max-w-md mx-4">
                  <form onSubmit={handleSearchSubmit} className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800 w-4 h-4" />
                    <Input
                      ref={searchInputRef}
                      className='bg-white rounded-2xl p-2 min-w-40 md:min-w-100 pl-10 text-[#0A1D37]'
                      type="search"
                      placeholder='Search movies, shows...'
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                    {searchQuery && (
                      <Button 
                        type="submit"
                        size="icon"
                        variant="ghost"
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 rounded-full bg-orange-500 hover:bg-orange-600 text-white"
                      >
                        <Search className="h-3 w-3" />
                      </Button>
                    )}
                  </form>
                </div>
              )}
              
              <div className="flex items-center gap-2 ml-auto">
                {/* User info with truncated name in avatar for small screens */}
                <div className="hidden md:flex items-center gap-2">
                  <span className="text-sm font-medium truncate max-w-[120px]">
                    {DATA.user.name}
                  </span>
                </div>
                
                {/* Avatar with tooltip for small screens */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Avatar className="rounded-2xl cursor-pointer">
                        <AvatarImage
                          src={DATA.user.avatar}
                          alt={DATA.user.name}
                        />
                        <AvatarFallback className="rounded-2xl">
                          {DATA.user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="md:hidden">
                      <p>{DATA.user.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 mt-10">
          <Outlet/>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default RadixSidebar