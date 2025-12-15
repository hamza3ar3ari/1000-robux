declare global {
  interface Window {
    og_load: () => void;
    og_block?: boolean;
  }
}

export interface ChatMessage {
  id: number;
  user: string;
  message: string;
  avatar: string;
  isSystem?: boolean;
}