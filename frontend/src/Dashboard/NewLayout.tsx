import { Link, Outlet } from "react-router-dom";
import { useState, useRef } from 'react';
import { Separator } from '@/components/ui/separator';
import {
  CreditCard,
  LogOut,
  Plus,
  Radio,
  TvMinimal,
  User2,
  Wallet,
  Menu,
  X
} from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import { useIsMobileOrTablet } from '@/hooks/use-mobile';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import SearchBar from "./Search/SearchBar";

import { UseAuth } from "@/hooks/useAuth";


const NewLayout = () => {

  const {user, logout} =UseAuth()
  const isMobileOrTablet = useIsMobileOrTablet();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const mainRef = useRef<HTMLDivElement | null>(null)
  const navItems = [
    { icon: TvMinimal, label: 'Movies', path: '/movie-app/movies' },
    { icon: Radio, label: 'Live Streams', path: '/movie-app/live-streams' },
    { icon: Plus, label: 'Playlist', path: '/movie-app/playlist' },
    { icon: Wallet, label: 'Subscriptions', path: '/movie-app/subscriptions' },
  ];

  return (
    <div className="flex h-screen bg-[#0F161F]">
      {/* Mobile/Tablet sidebar overlay */}
      {isMobileOrTablet && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#0A1D37] text-white
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:z-auto
        `}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <div className="flex items-center space-x-2">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-orange-500 text-white">
                <TvMinimal className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold">CineStream</span>
            </div>
            {(isMobileOrTablet || !sidebarOpen) && (
              <button 
                onClick={() => setSidebarOpen(false)}
                className="p-1 rounded-md hover:bg-gray-700 lg:hidden"
              >
                <X className="h-6 w-6" />
              </button>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="space-y-1 px-2">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                  onClick={() => isMobileOrTablet && setSidebarOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex items-center space-x-3">
              <Avatar className="rounded-2xl">
                <AvatarImage src={''} alt={user?.fullName} />
                <AvatarFallback className="rounded-2xl">
                  {user?.fullName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.fullName}</p>
                <p className="text-xs text-gray-400 truncate">{user?.email}</p>
              </div>
              <button className="p-1 rounded-md hover:bg-gray-700">
                
              </button>
            </div>
            
            {/* User dropdown menu */}
            <div className="mt-2 space-y-1">
              <button className="flex items-center space-x-2 w-full px-3 py-2 rounded-md hover:bg-gray-700 text-sm">
                <User2 className="h-4 w-4" />
                <span>Account</span>
              </button>
              <button className="flex items-center space-x-2 w-full px-3 py-2 rounded-md hover:bg-gray-700 text-sm">
                <CreditCard className="h-4 w-4" />
                <span>Billing</span>
              </button>
              <button onClick={logout} className="flex items-center space-x-2 w-full px-3 py-2 rounded-md hover:bg-red-500 text-sm">
                <LogOut className="h-4 w-4" />
                <span>Sign out</span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-[#0A1D37] text-gray-100 border-b border-gray-700 flex h-16 shrink-0 items-center gap-2 fixed top-0 left-0 right-0 z-30 lg:left-64">
          <div className="flex items-center gap-2 w-full px-4">
            {/* Mobile/Tablet menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-1 rounded-md hover:bg-gray-700 lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            <Separator orientation="vertical" className="h-6 lg:hidden" />
            
            {/* search */}
            <div className='flex justify-between items-center w-full'>
              <SearchBar/>
              
              <div className="flex items-center gap-2 ml-auto">
                {/* User info with truncated name in avatar for small screens */}
                <div className="hidden lg:flex items-center gap-2">
                  <span className="text-sm font-medium truncate max-w-[120px]">
                    {user?.fullName}
                  </span>
                </div>
                
                {/* Avatar with tooltip for small screens */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Avatar className="rounded-2xl cursor-pointer">
                        <AvatarImage
                          src={''}
                          alt={user?.fullName}
                        />
                        <AvatarFallback className="rounded-2xl text-xl font-semibold text-black">
                          {user?.fullName.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="lg:hidden">
                      <p>{user?.fullName}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main  ref={mainRef}  className="flex-1 overflow-y-auto pt-16 pb-6  lg:left-64">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default NewLayout;