export interface Window {
  og_load: () => void;
}

declare global {
  interface Window {
    og_load: () => void;
  }
}

export interface ChatMessage {
  id: number;
  user: string;
  message: string;
  avatar: string;
  isSystem?: boolean;
}
