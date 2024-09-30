import { ChatLayout } from '@/components/chat-layout';
import { RootLayout } from '@/components/root-layout';
import { useGetChats } from '@/hooks/use-get-chats';
import { Home } from '@/views';

const HomePage = () => {
  const { data, isPending, refetch } = useGetChats();

  return (
    <>
      <RootLayout
        title='Home'
        description='Home page'
        head={
          <>
            <meta
              name='viewport'
              content='width=device-width, initial-scale=1'
            />
            <link rel='icon' href='/favicon.ico' />
          </>
        }
      >
        <ChatLayout data={data} isLoading={isPending}>
          <Home conversations={data} getConversation={refetch} />
        </ChatLayout>
      </RootLayout>
    </>
  );
};

export default HomePage;
