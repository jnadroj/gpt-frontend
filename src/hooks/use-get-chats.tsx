import { clientAxios } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

export type TChatsResults = Array<{
  conversation_id: string;
  messages: Array<{
    user_message: string;
    assistant_response: string;
  }>;
}>;

export const useGetChats = () => {
  const getChats = async () => {
    return await clientAxios.get<TChatsResults>('/chat');
  };

  const { data, isPending, error, refetch } = useQuery({
    queryKey: ['chats'],
    queryFn: getChats,
    retry: 0,
  });

  return { data: data?.data || [], isPending, error, refetch };
};
