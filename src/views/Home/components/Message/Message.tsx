import clsx from 'clsx';
import { Bot, User } from 'lucide-react';

import { MessageAuthor, Message as TMessage } from '@/types/message';

const Message: React.FC<TMessage> = ({ author, content, error }) => {
  return (
    <div className='flex justify-start w-full gap-4'>
      {author === MessageAuthor.BOT && (
        <div className='w-10 h-10 flex-none rounded-full bg-gray-300 flex items-center justify-center'>
          <Bot />
        </div>
      )}

      {author === MessageAuthor.USER && (
        <div className='w-10 h-10 flex-none rounded-full bg-gray-300 flex items-center justify-center'>
          <User />
        </div>
      )}
      <div className='text-gray-800 rounded-lg w-full h-fit'>
        {author === MessageAuthor.BOT && (
          <div className='text-sm font-bold'>Chatgpt</div>
        )}

        {author === MessageAuthor.USER && (
          <div className='text-sm font-bold'>You</div>
        )}

        <span
          className={clsx(
            author === MessageAuthor.BOT && error && 'text-red-500',
          )}
        >
          {content}
        </span>
      </div>
    </div>
  );
};

export default Message;
