import { SendHorizonal } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageAuthor } from '@/types/message';

import { Message } from './components';

import { useOpenAIStream } from '@/hooks/use-open-ai-stream';
import { useRouter } from 'next/router';
import { TChatsResults } from '@/hooks/use-get-chats';

type HomeProps = {
  conversations: TChatsResults;
  getConversation?: () => void;
};
const Home: React.FC<HomeProps> = ({ conversations, getConversation }) => {
  const chatRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const { messages, currentMessage, sendMessage, isPending, setMessages } =
    useOpenAIStream();
  const { query } = useRouter();
  const currentConversationId = query.conversation_id as string;

  const handleSubmit = async (message: string) => {
    await sendMessage({
      message,
      conversation_id: currentConversationId ?? undefined,
    });
    getConversation?.();
  };

  const handleOnClick = () => {
    if (inputValue.trim() === '') return;
    handleSubmit(inputValue);
    setInputValue('');
  };

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      handleSubmit(inputValue);
      setInputValue('');
    }
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!currentConversationId) {
      setMessages([]);
      return;
    }
    if (conversations.length > 0 && currentConversationId) {
      const conversation = conversations.find(
        (conversation) =>
          conversation.conversation_id === currentConversationId,
      );
      if (conversation) {
        const messagesFormatted = conversation.messages.flatMap((message) => [
          {
            author: MessageAuthor.USER,
            content: message.user_message,
          },
          {
            author: MessageAuthor.BOT,
            content: message.assistant_response,
          },
        ]);
        setMessages([...messagesFormatted]);
      }
    }
  }, [conversations, currentConversationId]);

  return (
    <div className='h-full flex flex-col justify-between'>
      <div className='max-w-[650px] w-full mx-auto h-full flex flex-col justify-end'>
        <div
          ref={chatRef}
          className='flex-1 flex justify-start flex-col space-y-4 overflow-y-auto max-h-[600px]'
        >
          {messages.map((message, index) => (
            <Message
              key={index}
              author={message.author}
              content={message.content}
              error={message.error || false}
            />
          ))}

          {isPending && currentMessage && (
            <Message
              author={MessageAuthor.BOT}
              content={currentMessage}
              error={false}
            />
          )}
        </div>
        <div className='mt-8'>
          <div className='w-full border rounded-lg flex items-center p-0.5'>
            <Input
              value={inputValue}
              disabled={isPending}
              onKeyDown={handleKeyDown}
              placeholder='Message ...'
              onChange={(e) => setInputValue(e.target.value)}
              className='!border-0 !shadow-none focus:!ring-0 focus-visible:!ring-0 focus-visible:!ring-offset-0'
            />
            <Button
              size='sm'
              onClick={handleOnClick}
              className='flex-none box-border mr-0.5'
            >
              {isPending ? (
                <ThreeDots width={20} height={20} color='white' />
              ) : (
                <SendHorizonal className='h-4 w-4' />
              )}
            </Button>
          </div>
          <p className='text-center text-gray-600 text-xs md:text-sm mt-2 mb-2'>
            Chatgpt is a large language model trained by OpenAI.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
