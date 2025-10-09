import { Link, Outlet } from "react-router-dom";
import { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
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
  Menu,
  X
} from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import { useIsMobile } from '@/hooks/use-mobile';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { motion } from "framer-motion";

const DATA = {
  user: {
    name: 'Skyleen',
    email: 'skyleen@example.com',
    avatar:
      'https://pbs.twimg.com/profile_images/1909615404789506048/MTqvRsjo_400x400.jpg',
  }
};

const NewLayout = () => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
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

  const navItems = [
    { icon: TvMinimal, label: 'Movies', path: '/movie-app/movies' },
    { icon: Radio, label: 'Live Streams', path: '/movie-app/live-streams' },
    { icon: Plus, label: 'Playlist', path: '/movie-app/playlist' },
    { icon: Wallet, label: 'Subscriptions', path: '/movie-app/subscriptions' },
  ];

  return (
    <div className="flex h-screen bg-[#0F161F]">
      {/* Mobile sidebar overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed md:static inset-y-0 left-0 z-50 w-64 bg-[#0A1D37] text-white
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:z-auto
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
            {(isMobile || !sidebarOpen) && (
              <button 
                onClick={() => setSidebarOpen(false)}
                className="p-1 rounded-md hover:bg-gray-700 md:hidden"
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
                  onClick={() => isMobile && setSidebarOpen(false)}
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
                <AvatarImage src={DATA.user.avatar} alt={DATA.user.name} />
                <AvatarFallback className="rounded-2xl">
                  {DATA.user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{DATA.user.name}</p>
                <p className="text-xs text-gray-400 truncate">{DATA.user.email}</p>
              </div>
              <button className="p-1 rounded-md hover:bg-gray-700">
                <ChevronUp className="h-4 w-4" />
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
              <button className="flex items-center space-x-2 w-full px-3 py-2 rounded-md hover:bg-red-500 text-sm">
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
        <header className="bg-[#0A1D37] text-gray-100 border-b border-gray-700 flex h-16 shrink-0 items-center gap-2 fixed top-0 left-0 right-0 z-30 md:left-64">
          <div className="flex items-center gap-2 w-full px-4">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-1 rounded-md hover:bg-gray-700 md:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            <Separator orientation="vertical" className="h-6 md:hidden" />

            <div className='flex justify-between items-center w-full'>
              {isMobile ? (
                <motion.div
                  initial={{ width: "2rem" }}
                  animate={isSearchFocused ? { width: "80%" } : { width: "3rem" }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="flex-1 max-w-md"
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                >
                  <form onSubmit={handleSearchSubmit} className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800 w-4 h-4" />
                    <Input
                      ref={searchInputRef}
                      className="bg-white rounded-2xl p-2 max-w-[85%] md:min-w-100 pl-10 text-[#0A1D37]"
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
                <div className="flex-1 max-w-md">
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

        {/* Page content */}
        <main className="flex-1 overflow-y-auto pt-16 mt-6 pb-6 px-4 md:px-6 md:left-64">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default NewLayout;