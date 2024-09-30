import {
  Bot,
  ChevronDown,
  CirclePlus,
  Cloud,
  Folder,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Menu,
  Settings,
  User,
} from 'lucide-react';
import { ThreeDots } from 'react-loader-spinner';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { TChatsResults } from '@/hooks/use-get-chats';
import { useRouter } from 'next/router';

export interface ChatLayoutProps {
  children: React.ReactNode;
  data: TChatsResults;
  isLoading: boolean;
}

function ChatLayout({ children, data, isLoading }: ChatLayoutProps) {
  const router = useRouter();
  return (
    <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr]'>
      <div className='hidden border-r bg-muted/40 md:block'>
        <div className='flex h-full max-h-screen flex-col gap-2'>
          <div className='flex h-14 items-center border-b px-4 lg:h-[60px]'>
            <Link href='/' className='flex items-center gap-2 font-semibold'>
              <Bot className='h-6 w-6' />
              <span className=''>Test</span>
            </Link>
          </div>
          <div className='flex-1 flex flex-col'>
            <div className='mx-3 mb-4 flex flex-col gap-2'>
              <Button
                className='w-full'
                onClick={() => {
                  router.push('/');
                }}
              >
                <CirclePlus className='h-4 mr-1 w-4' />
                New Chat
              </Button>
            </div>
            <nav className='grid items-start px-2 text-sm font-medium max-h-[calc(100vh-14rem)] overflow-y-auto'>
              {isLoading && (
                <div className='flex items-center justify-center h-10'>
                  <ThreeDots width={30} height={30} color='gray' />
                </div>
              )}
              {data.map((chat, index) => (
                <Link
                  key={index}
                  href={`/?conversation_id=${chat.conversation_id}`}
                  className='bg-muted flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary mb-3'
                >
                  {chat.conversation_id}
                </Link>
              ))}
            </nav>
            <nav className='flex flex-1 items-end px-2 py-5'>
              <div className='flex items-center gap-2 cursor-pointer w-full hover:bg-gray-200 hover:bg-opacity-50 py-2 rounded-lg transition-all ease-in-out duration-200'>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant='ghost'
                      className='w-fit flex mx-auto gap-2 focus:!ring-0 focus-visible:!ring-0 focus-visible:!ring-offset-0 overflow-hidden'
                    >
                      <div className='h-10 w-10 bg-gray-200 border border-gray-300 flex justify-center items-center rounded-full'>
                        <User className='h-6 w-6' />
                      </div>
                      <div className='flex flex-col items-start'>
                        <p className='text-xs font-semibold'>jnadroj</p>
                        <p className='text-xs'>rjaramilloby@gmail.com</p>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className='w-56'>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <User className='mr-2 h-4 w-4' />
                        <span>Profile</span>
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className='mr-2 h-4 w-4' />
                        <span>Settings</span>
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Keyboard className='mr-2 h-4 w-4' />
                        <span>Keyboard shortcuts</span>
                        <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Github className='mr-2 h-4 w-4' />
                      <span>GitHub</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <LifeBuoy className='mr-2 h-4 w-4' />
                      <span>Support</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled>
                      <Cloud className='mr-2 h-4 w-4' />
                      <span>API</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link
                        href='/api/auth/logout'
                        className='flex items-center justify-between w-full'
                      >
                        <LogOut className='mr-2 h-4 w-4' />
                        <span>Log out</span>
                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <div className='flex flex-col'>
        <header className='flex h-14 items-center gap-4 border-b bg-muted/40 px-4 md:hidden'>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant='outline'
                size='icon'
                className='shrink-0 md:hidden'
              >
                <Menu className='h-5 w-5' />
                <span className='sr-only'>Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side='left' className='flex flex-col'>
              <nav className='grid gap-2 text-lg font-medium'>
                <Link
                  href='#'
                  className='flex items-center gap-2 text-lg font-semibold'
                >
                  <Bot className='h-6 w-6' />
                  <span className='sr-only'>Test</span>
                </Link>
                <Link
                  href='#'
                  className='mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground'
                >
                  <Folder className='h-5 w-5' />
                  Study
                </Link>
                <Link
                  href='#'
                  className='mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground'
                >
                  <Folder className='h-5 w-5' />
                  Work
                  <ChevronDown className='h-4 w-4 ml-auto' />
                </Link>
                <Link
                  href='#'
                  className='bg-muted flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary'
                >
                  New Chat
                </Link>
                <Link
                  href='#'
                  className='mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground'
                >
                  <Folder className='h-5 w-5' />
                  Social media
                </Link>
                <Link
                  href='#'
                  className='mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground'
                >
                  <Folder className='h-5 w-5' />
                  Main
                </Link>
                <Link
                  href='#'
                  className='mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground'
                >
                  <Folder className='h-5 w-5' />
                  Analytics
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </header>
        <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-4'>
          <div className='flex items-center'>
            <h1 className='text-lg font-semibold md:text-2xl'>Gpt 1.1</h1>
          </div>
          <div className='w-full flex flex-col flex-1'>{children}</div>
        </main>
      </div>
    </div>
  );
}

ChatLayout.displayName = 'ChatLayout';

export { ChatLayout };
