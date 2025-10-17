export interface Message {
  id: string;
  created_at: string;
  text: string;
  sender: 'user' | 'ai';
}
