export type Message = {
  author: MessageAuthor;
  content: string;
  error?: boolean;
};

export enum MessageAuthor {
  USER = 'USER',
  BOT = 'BOT',
}
