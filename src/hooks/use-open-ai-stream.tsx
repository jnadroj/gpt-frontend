import { useState } from 'react';

import { MessageAuthor, Message as TMessage } from '@/types/message';
import { useRouter } from 'next/router';

interface ChatRequest {
  message: string;
  conversation_id?: string;
}

export const useOpenAIStream = () => {
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [messages, setMessages] = useState<TMessage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);

  const { query, push } = useRouter();
  const currentConversationId = query.conversation_id as string;

  const cleanData = (data: string) => {
    const cleaned = data.replace(/data: /g, '');

    return cleaned.trim();
  };

  const extractConversationId = (chunkValue: string) => {
    const match = /"conversation_id":\s*"([^"]+)"/.exec(chunkValue);
    return match ? match[1] : null;
  };

  const sendMessage = async (data: ChatRequest) => {
    setMessages((prev) => [
      ...prev,
      {
        author: MessageAuthor.USER,
        content: data.message,
      },
    ]);
    setCurrentMessage('');
    setIsPending(true);
    try {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      if (reader) {
        let done = false;
        let fullMessage = '';
        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          const chunkValue = decoder.decode(value, { stream: true });
          fullMessage += cleanData(chunkValue);
          setCurrentMessage((prev) => prev + cleanData(chunkValue));
        }
        setIsPending(false);
        setMessages((prev) => [
          ...prev,
          {
            author: MessageAuthor.BOT,
            content: fullMessage,
          },
        ]);
        const conversationId = extractConversationId(fullMessage);

        if (!currentConversationId) {
          push(`/?conversation_id=${conversationId}`);
        }
      }
    } catch (err) {
      setIsPending(false);
      setError('Error al consumir el stream');
    }
  };

  return {
    currentMessage,
    messages,
    error,
    sendMessage,
    isPending,
    setMessages,
  };
};
